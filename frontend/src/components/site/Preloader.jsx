import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Suspenseful intro: "EVIDENCE IS LOADING" with a dark-red scanning loader.
export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v = Math.min(100, v + Math.random() * 13 + 5);
      setPct(Math.floor(v));
      if (v >= 100) {
        clearInterval(iv);
        setTimeout(() => { setGone(true); onDone && onDone(); }, 650);
      }
    }, 150);
    return () => clearInterval(iv);
  }, [onDone]);

  const files = ["hero-film.mp4", "archive-card.jpg", "denim-archive.jpg", "moodboard.jpg", "pr-box.jpg"];

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center grain-strong"
          style={{ background: "#0f1216" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          data-testid="preloader"
        >
          {/* scanning magnifier */}
          <div className="relative w-full max-w-md px-8">
            <div className="flex items-center justify-between mb-4 font-mono text-[10px] tracking-label text-[color:var(--rust)]">
              <span>CASE FILE OPENING</span>
              <span data-testid="preloader-pct">{pct}%</span>
            </div>

            <div className="font-serif-display text-[color:var(--kraft)] text-3xl md:text-5xl leading-[1.05] mb-8">
              Evidence<br />is loading.
            </div>

            {/* loader bar */}
            <div className="preloader-bar w-full mb-3" style={{ height: 3 }}>
              <motion.span animate={{ width: `${pct}%` }} transition={{ ease: "linear", duration: 0.15 }} />
              <span className="absolute inset-y-0 w-16 scanx" style={{ background: "linear-gradient(90deg, transparent, rgba(216,83,74,0.6), transparent)" }} />
            </div>

            {/* rolling filenames */}
            <div className="font-mono text-[10px] tracking-wider2 text-[color:var(--grey)] h-4 overflow-hidden">
              READING · {files[Math.min(files.length - 1, Math.floor(pct / 20))]}
            </div>
          </div>

          <div className="absolute bottom-8 font-mono text-[10px] tracking-label text-[color:var(--kraft)]/40">
            THE DENIM ARCHIVE — EVIDENCE OF LIVING
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
