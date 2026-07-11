import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import { Tape, WaxSeal, CollectedStamp, Pin } from "./Stickers";

function useCountUp(target, duration, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step); else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

export default function Hero({ started }) {
  const [ready, setReady] = useState(false);
  const count = useCountUp(42817, 2600, ready);
  const wrap = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 50, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 50, damping: 16 });

  useEffect(() => { if (started) { const t = setTimeout(() => setReady(true), 200); return () => clearTimeout(t); } }, [started]);

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
      {/* background layers */}
      <div className="absolute inset-0">
        <AssetImage asset={ASSETS.heroBg} className="absolute inset-0 w-full h-full opacity-25" imgClassName="grayscale" />
        <video className="absolute inset-0 w-full h-full object-cover opacity-25" autoPlay muted loop playsInline data-testid="hero-bg-video">
          <source src={`/assets/${ASSETS.heroFilm.file}`} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(20,24,31,0.92) 42%, rgba(20,24,31,0.55) 100%)" }} />
      </div>

      <div className="relative z-10 min-h-[100svh] max-w-[1500px] mx-auto px-6 md:px-16 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10">
        {/* LEFT — type */}
        <div className="pt-24 lg:pt-0">
          <div className="font-mono text-[11px] tracking-label text-[color:var(--denim-2)] mb-6 overflow-hidden">
            <motion.span className="inline-block" initial={{ y: "110%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              EVIDENCE OF LIVING — thedenimarchive.com
            </motion.span>
          </div>
          <h1 className="font-serif-display tracking-display text-[color:var(--kraft)] leading-[0.9] text-6xl sm:text-7xl lg:text-[7.5rem]">
            {lines.map((ln, i) => (
              <span key={ln} className="block overflow-hidden">
                <motion.span className="inline-block" initial={{ y: "115%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.13 }}>
                  {ln}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="mt-8 font-serif-display italic text-xl md:text-2xl text-[color:var(--kraft)]/80 max-w-md" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.6 }}>
            A living collection of everyday evidence.
          </motion.p>
          <motion.div className="mt-12 flex flex-wrap items-center gap-8" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.8 }}>
            <a href="#archive" className="btn-stamp" data-cursor="open" data-testid="hero-explore-btn">Explore the Archive</a>
            <a href="#upload" className="btn-ghost-kraft" data-cursor="upload" data-testid="hero-submit-link">Submit Your Denim</a>
          </motion.div>
          <div className="mt-14 font-mono text-[11px] tracking-wider2 text-[color:var(--kraft)]/70" data-testid="hero-counter">
            {count.toLocaleString()} entries and counting
          </div>
        </div>

        {/* RIGHT — floating jeans / archive card */}
        <div className="relative hidden lg:flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative w-[78%]" data-cursor="inspect">
            <div className="floaty relative">
              <div className="hairline-light p-3" style={{ background: "var(--navy-2)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7)" }}>
                <AssetImage asset={ASSETS.archiveCard} className="aspect-[4/5]" note="Folded jeans + Archive Card" />
              </div>
              <Tape className="absolute -top-4 -left-5 z-20" rotate={-8} />
              <CollectedStamp className="absolute -bottom-8 -left-8 z-20" />
              <WaxSeal className="absolute -bottom-5 right-6 z-20" />
              <Pin className="absolute -top-1 right-8 z-20" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 font-mono text-[11px] tracking-wider2 text-[color:var(--kraft)]/45 hidden md:block">SCROLL ↓</div>
    </section>
  );
}
