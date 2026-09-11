import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, AudioLines } from "lucide-react";
import gsap from "gsap";
import splashVideo from "@/assets/splash.mp4";
import knoraLogo from "@/assets/knora-logo-transparent.png";
import "./OpeningVideoSplash.css";

export default function OpeningVideoSplash() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("welcome");
  const [error, setError] = useState("");
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const startRef = useRef(null);
  const skipRef = useRef(null);
  const finishRef = useRef(() => {});
  const activeRef = useRef(false);
  const pendingRef = useRef(false);
  const timerRef = useRef(null);
  const transitionRef = useRef(null);
  const exitingRef = useRef(false);

  useEffect(() => {
    if (!visible) return;
    activeRef.current = true;
    exitingRef.current = false;
    let finished = false;
    let exitTween;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    startRef.current?.focus({ preventScroll: true });
    finishRef.current = () => {
      if (finished || !activeRef.current) return;
      finished = true;
      exitingRef.current = true;
      transitionRef.current?.kill();
      clearTimeout(timerRef.current);
      videoRef.current?.pause();
      exitTween = gsap.to(rootRef.current, {
        autoAlpha: 0,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : 2.2,
        ease: "power2.inOut",
        onComplete: () => setVisible(false),
      });
    };
    const video = videoRef.current;
    return () => {
      activeRef.current = false;
      clearTimeout(timerRef.current);
      exitTween?.kill();
      transitionRef.current?.kill();
      video?.pause();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, [visible]);

  const start = async () => {
    const video = videoRef.current;
    if (!video || pendingRef.current) return;
    pendingRef.current = true;
    setError("");
    setPhase("loading");
    video.muted = false;
    video.volume = 1;
    timerRef.current = setTimeout(() => finishRef.current(), 15000);
    try {
      // Keep play directly inside the click gesture to enable audible playback.
      await video.play();
      if (!activeRef.current || exitingRef.current) return;
      clearTimeout(timerRef.current);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const welcome = rootRef.current.querySelector(".ai-entry-welcome");
      transitionRef.current = gsap
        .timeline({
          onComplete: () => {
            setPhase("playing");
            skipRef.current?.focus({ preventScroll: true });
          },
        })
        .to(welcome, {
          scale: reducedMotion ? 1 : 1.22,
          autoAlpha: 0,
          duration: reducedMotion ? 0 : 0.85,
          ease: "power3.inOut",
        })
        .to(
          video,
          {
            autoAlpha: 1,
            duration: reducedMotion ? 0 : 0.85,
            ease: "power2.out",
          },
          reducedMotion ? 0 : "+=0.12",
        );
    } catch {
      if (!activeRef.current || exitingRef.current) return;
      clearTimeout(timerRef.current);
      pendingRef.current = false;
      setPhase("welcome");
      setError("The intro couldn’t play. Try again or explore the website.");
    }
  };

  const handleKeys = (event) => {
    if (event.key === "Escape") finishRef.current();
    if (event.key !== "Tab") return;
    const buttons = [
      ...rootRef.current.querySelectorAll("button:not(:disabled)"),
    ];
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="opening-video-splash ai-entry"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to KNORA"
      onKeyDown={handleKeys}
      data-phase={phase}
    >
      <video
        ref={videoRef}
        className="opening-video-splash-media ai-entry-video"
        src={splashVideo}
        playsInline
        preload="auto"
        onEnded={() => finishRef.current()}
        onError={() => finishRef.current()}
      />
      {phase !== "playing" && (
        <div className="ai-entry-welcome">
          <div className="ai-entry-grid" aria-hidden="true" />
          <header className="ai-entry-header">
            <span className="ai-entry-edition">KNORA EDU ACADEMY</span>
            <span className="ai-entry-edition">LEARNING, WITH DIRECTION.</span>
          </header>
          <div className="ai-entry-content">
            <div className="ai-entry-brand">
              <img
                src={knoraLogo}
                alt="KNORA Edu Academy"
                className="ai-entry-logo"
              />
            </div>
            <div className="ai-entry-eyebrow">
              <span />
              WELCOME TO KNORA
            </div>
            <h1>
              A new way to learn.
              <br />
              <span>A better way forward.</span>
            </h1>
            <p>
              Build practical skills in AI, Python, and beyond.
              <br className="ai-entry-mobile-break" /> Your journey begins here.
            </p>
            <button
              ref={startRef}
              type="button"
              className="ai-entry-start"
              onClick={start}
              disabled={phase === "loading"}
            >
              <span>
                {phase === "loading"
                  ? "Opening your experience…"
                  : "Start Your Experience"}
              </span>
              <ArrowUpRight size={21} />
            </button>
            <span className="ai-entry-audio">
              <AudioLines size={15} /> Intro plays with sound
            </span>
            {error && (
              <p className="ai-entry-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <footer className="ai-entry-footer">
            <span>BUILT AROUND YOUR NEXT STEP.</span>
            <span>
              AI <i /> PYTHON <i /> GEN AI
            </span>
          </footer>
        </div>
      )}
      <button
        ref={skipRef}
        type="button"
        className="ai-entry-skip"
        onClick={() => finishRef.current()}
      >
        {phase === "playing" ? "Skip intro" : "Explore website"}
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
