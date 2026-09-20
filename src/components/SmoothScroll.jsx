import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 0.82,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
      anchors: true,
      autoRaf: true,
    });

    const syncScrollTrigger = () => ScrollTrigger.update();
    const resetScroll = () => {
      lenis.scrollTo(0, { immediate: true, force: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    lenis.on("scroll", syncScrollTrigger);
    window.addEventListener("knora:navigation", resetScroll);

    return () => {
      window.removeEventListener("knora:navigation", resetScroll);
      lenis.off("scroll", syncScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return null;
}
