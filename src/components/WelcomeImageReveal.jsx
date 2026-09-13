import { useEffect, useRef } from "react";
import campusImage from "@/assets/welcome-architecture.jpg";
import revealImage from "@/assets/welcome-architecture-reveal.jpg";

export default function WelcomeImageReveal() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.closest(".ai-entry-welcome");
    const ctx = canvas?.getContext("2d");
    if (!parent || !ctx) return;
    const mask = document.createElement("canvas");
    const maskContext = mask.getContext("2d");
    if (!maskContext) return;
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const image = new Image();
    image.src = revealImage;
    let width = 0,
      height = 0,
      frame = 0,
      disposed = false;
    const tiles = new Map();
    const cell = 28;

    const paint = (now) => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      if (!image.complete || !image.naturalWidth) return;
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const dw = image.naturalWidth * scale,
        dh = image.naturalHeight * scale;
      const live = [];
      for (const [key, tile] of tiles) {
        const age = now - tile.time;
        if (age > 650) {
          tiles.delete(key);
          continue;
        }
        live.push({ ...tile, alpha: Math.max(0, 1 - age / 650) });
      }
      // One image draw per frame; a tiled mask reveals the layer underneath.
      ctx.save();
      ctx.beginPath();
      live.forEach((tile) => ctx.rect(tile.x, tile.y, cell, cell));
      ctx.clip();
      ctx.drawImage(image, (width - dw) / 2, (height - dh) / 2, dw, dh);
      ctx.restore();
      maskContext.clearRect(0, 0, width, height);
      live.forEach((tile) => {
        maskContext.fillStyle = `rgba(0,0,0,${tile.alpha})`;
        maskContext.fillRect(tile.x, tile.y, cell, cell);
      });
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      if (tiles.size && !disposed) frame = requestAnimationFrame(paint);
    };
    const move = (event) => {
      if (!media.matches || event.pointerType === "touch" || !image.complete)
        return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left,
        y = event.clientY - rect.top;
      const now = performance.now();
      for (let row = -5; row <= 5; row++)
        for (let col = -5; col <= 5; col++) {
          const distance = Math.hypot(row, col);
          if (distance > 5) continue;
          const tx = (Math.floor(x / cell) + col) * cell,
            ty = (Math.floor(y / cell) + row) * cell;
          tiles.set(`${tx}:${ty}`, {
            x: tx,
            y: ty,
            time: now,
          });
        }
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mask.width = canvas.width;
      mask.height = canvas.height;
      maskContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      tiles.clear();
    };
    const reset = () => {
      tiles.clear();
      ctx.clearRect(0, 0, width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    parent.addEventListener("pointermove", move, { passive: true });
    media.addEventListener("change", reset);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      parent.removeEventListener("pointermove", move);
      media.removeEventListener("change", reset);
    };
  }, []);
  return (
    <div className="ai-entry-image-background" aria-hidden="true">
      <img src={campusImage} alt="" />
      <canvas ref={canvasRef} />
    </div>
  );
}
