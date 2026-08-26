import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import logo from "@/assets/knora-logo-transparent.png";

const COLUMN_COUNT = 12;
const PARTICLES_PER_COLUMN = 34;

const variants = ["cascade", "lift", "spark"];

function buildParticles() {
  return Array.from({ length: COLUMN_COUNT }, (_, column) =>
    Array.from({ length: PARTICLES_PER_COLUMN }, (_, particle) => {
      const seed = column * 37 + particle * 19;
      const direction = column % 2 === 0 ? -1 : 1;
      const edgeOffset = (seed * 13) % 34;
      const edgeTop = direction < 0 ? -8 + edgeOffset : 74 + ((seed * 17) % 34);
      return {
        left: 4 + ((seed * 11) % 92),
        top: edgeTop,
        size: 1 + (seed % 3),
        delay: particle * 0.0025,
        drift: (seed % 2 === 0 ? 1 : -1) * (4 + (seed % 26)),
        spray: direction * (60 + ((seed * 7) % 160)),
        spin: (seed % 2 === 0 ? 1 : -1) * (90 + (seed % 220)),
        opacity: 0.28 + (seed % 58) / 100,
      };
    }),
  );
}

export default function SplashScreen({
  transitionKey,
  routeTitle,
  onCovered,
  onComplete,
}) {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const columnsRef = useRef([]);
  const particlesRef = useRef([]);
  const didMountRef = useRef(false);
  const timelineRef = useRef(null);
  const particles = useMemo(buildParticles, []);
  const variant = variants[Math.abs(transitionKey) % variants.length];

  useEffect(() => {
    const root = rootRef.current;
    const contentEl = contentRef.current;
    const columns = columnsRef.current.filter(Boolean);
    const particleGroups = particlesRef.current.filter(Boolean);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!root || !contentEl || !columns.length) return undefined;

    timelineRef.current?.kill();

    if (reduceMotion) {
      gsap.set(root, {
        autoAlpha: 1,
        display: "block",
        pointerEvents: "auto",
      });
      onCovered?.();
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.18,
        ease: "none",
        onComplete: () => {
          gsap.set(root, { display: "none", pointerEvents: "none" });
          onComplete?.();
        },
      });
      return undefined;
    }

    const isInitial = !didMountRef.current;
    didMountRef.current = true;
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(root, { display: "none", pointerEvents: "none" });
        onComplete?.();
      },
    });
    timelineRef.current = tl;

    gsap.set(root, {
      autoAlpha: 1,
      display: "block",
      pointerEvents: "auto",
    });
    gsap.set(columns, {
      yPercent: 0,
      scaleY: 1,
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
    });
    gsap.set(contentEl, {
      y: isInitial ? 0 : 4,
      autoAlpha: isInitial ? 1 : 0,
      scale: isInitial ? 1 : 0.98,
    });
    gsap.set(particleGroups, {
      x: 0,
      y: 0,
      scale: 0.4,
      autoAlpha: 0,
      rotate: 0,
    });

    tl.to(contentEl, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      duration: isInitial ? 0.18 : 0.22,
      ease: "power3.out",
    })
      .to(
        contentEl,
        {
          y: isInitial ? 0 : -4,
          scale: 1,
          duration: isInitial ? 0.36 : 0.18,
          ease: "sine.inOut",
        },
        ">-0.04",
      )
      .add(() => onCovered?.())
      .to(
        contentEl,
        {
          y: -34,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.22,
          ease: "power2.in",
        },
        "+=0.02",
      )
      .to(
        particleGroups,
        {
          autoAlpha: (_, target) => Number(target.dataset.opacity),
          scale: (_, target) => 0.72 + (Number(target.dataset.row) % 5) * 0.12,
          y: (_, target) => Number(target.dataset.spray),
          x: (_, target) =>
            Number(target.dataset.drift) *
            (1 + (Number(target.dataset.row) % 7) * 0.22),
          rotate: (_, target) => Number(target.dataset.spin),
          duration: variant === "spark" ? 0.96 : 0.86,
          stagger: {
            each: 0.0015,
            from: variant === "lift" ? "center" : "start",
            grid: "auto",
          },
          ease: "power3.out",
        },
        "<0.02",
      )
      .to(
        particleGroups,
        {
          autoAlpha: 0,
          scale: 0.02,
          duration: 0.42,
          stagger: { each: 0.0012, from: "start" },
          ease: "power2.in",
        },
        "<0.38",
      )
      .to(
        columns,
        {
          yPercent: (_, target) => Number(target.dataset.direction) * 106,
          scaleY: variant === "lift" ? 0.98 : 1,
          opacity: 0,
          clipPath: (_, target) =>
            Number(target.dataset.direction) < 0
              ? "inset(100% 0% 0% 0%)"
              : "inset(0% 0% 100% 0%)",
          duration: variant === "spark" ? 0.92 : 0.82,
          stagger: {
            each: variant === "cascade" ? 0.022 : 0.018,
            from: variant === "lift" ? "center" : "start",
          },
          ease: "power4.inOut",
        },
        "<0.02",
      )
      .to(
        root,
        {
          autoAlpha: 0,
          duration: 0.16,
          ease: "none",
        },
        ">-0.04",
      );

    return () => {
      tl.kill();
      if (timelineRef.current === tl) {
        timelineRef.current = null;
      }
    };
  }, [transitionKey, onCovered, onComplete, variant]);

  const isRouteTransition = Boolean(routeTitle);

  return (
    <div
      ref={rootRef}
      className="splash-screen"
      aria-hidden="true"
      data-variant={variant}
      data-mode={isRouteTransition ? "route" : "initial"}
    >
      <div className="splash-stage">
        <div className="splash-columns">
          {Array.from({ length: COLUMN_COUNT }, (_, index) => (
            <div
              key={index}
              ref={(el) => {
                columnsRef.current[index] = el;
              }}
              className="splash-column"
              data-direction={index % 2 === 0 ? -1 : 1}
              style={{ "--column": index }}
            >
              {particles[index].map((particle, particleIndex) => (
                <span
                  key={particleIndex}
                  ref={(el) => {
                    particlesRef.current[
                      index * PARTICLES_PER_COLUMN + particleIndex
                    ] = el;
                  }}
                  className="splash-particle"
                  data-row={particleIndex}
                  data-drift={particle.drift}
                  data-spray={particle.spray}
                  data-spin={particle.spin}
                  data-opacity={particle.opacity}
                  data-direction={index % 2 === 0 ? -1 : 1}
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div ref={contentRef} className="splash-content">
          {isRouteTransition ? (
            <div className="splash-route-copy">
              <span className="splash-route-kicker">Navigating to</span>
              <span className="splash-route-title">{routeTitle}</span>
            </div>
          ) : (
            <div className="splash-logo-card">
              <img
                src={logo}
                alt=""
                className="splash-logo"
                draggable="false"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
