import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import { Tape } from "./Stickers";

export default function Film() {
  const [open, setOpen] = useState(false);
  const vref = useRef(null);
  useEffect(() => {
    if (open && vref.current) { vref.current.muted = false; vref.current.volume = 1; vref.current.play().catch(() => {}); }
  }, [open]);

  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy)" }} data-testid="film-section">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 003 — THE FILM</div>
            <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl">Evidence of Living — The Film.</h2>
          </div>
          <p className="font-mono text-xs text-[color:var(--grey)] max-w-xs md:text-right">Not about denim. About a life. Runtime 02:14.</p>
        </div>

        <button className="relative w-full block group" onClick={() => setOpen(true)} data-cursor="play" data-testid="film-play-block">
          <Tape className="absolute top-6 left-6 z-20" rotate={-3} text="PRESS · PLAY · SOUND ON" />
          <div className="relative aspect-video overflow-hidden hairline-light">
            <AssetImage asset={ASSETS.heroBg} note="Poster frame · click to watch with sound" className="absolute inset-0" imgClassName="grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: "var(--rust)" }}>
                <Play className="w-7 h-7 text-[color:var(--kraft)]" fill="currentColor" />
              </span>
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider2 text-[color:var(--kraft)]">▶ PLAY WITH SOUND · 02:14</div>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10" style={{ background: "rgba(10,12,16,0.94)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid="film-modal">
            <button className="absolute top-6 right-6 font-mono text-[11px] tracking-wider2 text-[color:var(--kraft)] flex items-center gap-2 hairline-light px-4 py-2" onClick={() => setOpen(false)} data-cursor="close" data-testid="film-close-btn">
              CLOSE <X className="w-4 h-4" />
            </button>
            <motion.div className="w-full max-w-5xl" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}>
              <video ref={vref} className="w-full aspect-video bg-black hairline-light" controls playsInline data-testid="film-video">
                <source src={`/assets/${ASSETS.heroFilm.file}`} type="video/mp4" />
              </video>
              <div className="font-mono text-[10px] tracking-wider2 text-[color:var(--grey)] mt-3">[ VIDEO SLOT: hero-film.mp4 · plays unmuted on open · drop the real file into /public/assets ]</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
