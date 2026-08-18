import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import CursorEffect from "@/components/CursorEffect";

export default function PageShell({
  eyebrow,
  title,
  description,
  primaryAction = "Back to Home",
}) {
  return (
    <>
      <CursorEffect />
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-background px-6 py-32 text-foreground sm:px-10 lg:px-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bloom absolute left-1/2 top-1/4 size-[56rem] -translate-x-1/2 rounded-full opacity-55 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage:
                "radial-gradient(color-mix(in oklab, var(--electric) 28%, transparent) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "radial-gradient(circle at 50% 28%, black, transparent 70%)",
            }}
          />
        </div>

        <section className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-5xl flex-col justify-center">
          <span className="hero-badge inline-flex w-fit items-center rounded-full px-4 py-2 text-[0.7rem] font-semibold tracking-[0.2em] text-primary uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[0.96] font-semibold sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <a
            href="/"
            className="lift arrow-shift mt-10 flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-soft"
          >
            {primaryAction}
            <ArrowRight className="arrow size-4" />
          </a>
        </section>
      </main>
    </>
  );
}
