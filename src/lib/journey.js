/** Frame-loop shared state. Mutated imperatively - never triggers React renders. */
export const journey = {
  /** master scroll progress 0..1 driven by one GSAP ScrollTrigger */
  progress: 0,
  /** normalized pointer, -1..1 */
  mouseX: 0,
  mouseY: 0,
  reducedMotion: false,
};
