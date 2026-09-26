import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { lockPageScroll } from "@/lib/scrollLock";
import navigationVideo from "@/assets/navigate.mp4";
import "./NavigationVideo.css";

const NAVIGATION_VIDEO_SPEED = 1.5;
const MAX_TRANSITION_MS = 900;

export default function SplashScreen({
  transitionKey,
  routeTitle,
  onCovered,
  onComplete,
}) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const onCoveredRef = useRef(onCovered);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCoveredRef.current = onCovered;
    onCompleteRef.current = onComplete;
  }, [onCovered, onComplete]);

  useEffect(() => {
    if (!transitionKey || !routeTitle) return;
    const root = rootRef.current;
    const video = videoRef.current;
    const release = lockPageScroll();
    let finished = false;
    let disposed = false;
    let fadeTimer;
    let lastTime = 0;
    let lastProgress = performance.now();
    const startedAt = lastProgress;
    document.documentElement.classList.add("navigation-video-active");
    root.style.display = "grid";
    root.style.opacity = "1";
    const finish = () => {
      if (finished || disposed) return;
      finished = true;
      clearInterval(watchdog);
      clearTimeout(transitionDeadline);
      video.pause();
      // Mount the next page after playback, not while the browser decodes video.
      try {
        onCoveredRef.current?.();
      } finally {
        root.style.opacity = "0";
        fadeTimer = setTimeout(() => {
          root.style.display = "none";
          release();
          document.documentElement.classList.remove("navigation-video-active");
          onCompleteRef.current?.();
        }, 250);
      }
    };

    const watchdog = setInterval(() => {
      const now = performance.now();
      if (video.currentTime > lastTime + 0.01) {
        lastTime = video.currentTime;
        lastProgress = now;
      }
      const deadline = Number.isFinite(video.duration)
        ? Math.min(video.duration * 1000 + 2500, 20000)
        : 10000;
      if (now - lastProgress > 2000 || now - startedAt > deadline) finish();
    }, 250);
    const transitionDeadline = setTimeout(finish, MAX_TRANSITION_MS);
    const key = (e) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", key);
    video.addEventListener("ended", finish);
    video.addEventListener("error", finish);
    video.currentTime = 0;
    video.defaultPlaybackRate = NAVIGATION_VIDEO_SPEED;
    video.playbackRate = NAVIGATION_VIDEO_SPEED;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else video.play().catch(finish);
    return () => {
      disposed = true;
      clearInterval(watchdog);
      clearTimeout(transitionDeadline);
      clearTimeout(fadeTimer);
      video.pause();
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", finish);
      window.removeEventListener("keydown", key);
      root.style.display = "none";
      release();
      document.documentElement.classList.remove("navigation-video-active");
    };
  }, [transitionKey, routeTitle]);
  return createPortal(
    <div
      ref={rootRef}
      className="navigation-video-overlay"
      aria-label="Page transition"
    >
      <video
        ref={videoRef}
        src={navigationVideo}
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
      />
    </div>,
    document.body,
  );
}
