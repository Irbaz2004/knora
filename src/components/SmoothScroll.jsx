import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        allowNestedScroll: true,
      });
      const tick = (time) => lenis.raf(time * 1000);
      const syncLock = () => {
        if (document.documentElement.classList.contains("page-scroll-locked"))
          lenis.stop();
        else lenis.start();
      };
      let frame;
      const reset = () => {
        lenis.scrollTo(0, { immediate: true, force: true });
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        });
      };
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      window.addEventListener("knora:scroll-lock", syncLock);
      window.addEventListener("knora:navigation", reset);
      syncLock();
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("knora:scroll-lock", syncLock);
        window.removeEventListener("knora:navigation", reset);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
