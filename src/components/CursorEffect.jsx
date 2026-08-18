import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [mode, setMode] = useState("default");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const follow = { x: pos.x, y: pos.y };
    let raf = 0;

    const setCursorMode = (target) => {
      if (target.closest("header, nav, a, button, [role='button']")) {
        setMode("nav");
        return;
      }
      if (
        target.closest(
          "h1, h2, h3, h4, p, dd, dt, li, .hero-badge, .hero-learn",
        )
      ) {
        setMode("text");
        return;
      }
      setMode("default");
    };

    const onMove = (event) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      setCursorMode(event.target);
    };

    const render = () => {
      follow.x += (pos.x - follow.x) * 0.18;
      follow.y += (pos.y - follow.y) * 0.18;
      ring.style.transform = `translate3d(${follow.x}px, ${follow.y}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    const onLeave = () => setMode("hidden");
    const onEnter = () => setMode("default");
    const onDown = () => document.documentElement.classList.add("cursor-down");
    const onUp = () => document.documentElement.classList.remove("cursor-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("cursor-down");
    };
  }, []);

  return (
    <div className="custom-cursor" data-cursor-mode={mode} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
