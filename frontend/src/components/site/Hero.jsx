import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function useCountUp(target, duration = 2200, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const count = useCountUp(42817, 2600, ready);
  const wrap = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 60, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 18 });

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const onMove = (e) => {
    const r = wrap.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const lines = ["THE DENIM", "ARCHIVE."];

  return (
    <section
      ref={wrap}
      onMouseMove={onMove}
      className="relative min-h-[100svh] w-full overflow-hidden grain-strong persp"
      style={{ background: "var(--navy)" }}
      data-testid="hero-section"
    >
      {/* background video (drop-in ready) + denim fallback */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay muted loop playsInline
          poster=""
          data-testid="hero-bg-video"
        >
          <source src="/hero-film.mp4" type="video/mp4" />
        </video>
        <motion.div
          className="absolute inset-0 denim-weave opacity-30"
          style={{ rotateX: rx, rotateY: ry, scale: 1.15 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,24,31,0.55), rgba(20,24,31,0.85))" }} />
      </div>

      {/* placeholder note for the video slot */}
      <div className="absolute top-24 right-6 z-10 font-mono text-[10px] tracking-wider2 text-[color:var(--grey)] hidden md:block">
        [ VIDEO SLOT: hero-film.mp4 · 1920x1080 · muted loop ]
      </div>

      {/* headline */}
      <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 md:px-16 max-w-[1500px] mx-auto">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--denim-2)] mb-6 overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={ready ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            EVIDENCE OF LIVING — thedenimarchive.com
          </motion.span>
        </div>

        <h1 className="font-serif-display tracking-display text-[color:var(--kraft)] leading-[0.92] text-6xl sm:text-7xl lg:text-[8.5rem]">
          {lines.map((ln, i) => (
            <span key={ln} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "115%" }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.14 }}
              >
                {ln}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 font-serif-display italic text-xl md:text-2xl text-[color:var(--kraft)]/80 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          A living collection of everyday evidence.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a href="#archive" className="btn-stamp" data-cursor="open" data-testid="hero-explore-btn">
            Explore the Archive
          </a>
          <a href="#upload" className="btn-ghost-kraft" data-cursor="upload" data-testid="hero-submit-link">
            Submit Your Denim
          </a>
        </motion.div>
      </div>

      {/* running counter */}
      <div className="absolute bottom-6 left-6 md:left-16 z-10 font-mono text-[11px] tracking-wider2 text-[color:var(--kraft)]/70" data-testid="hero-counter">
        {count.toLocaleString()} entries and counting
      </div>
      <div className="absolute bottom-6 right-6 z-10 font-mono text-[11px] tracking-wider2 text-[color:var(--kraft)]/50 hidden md:block">
        SCROLL ↓
      </div>
    </section>
  );
}
