import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import { Tape, TopSecret } from "./Stickers";

// moodboard.jpg is intentionally the SECOND slide.
const SLIDES = [
  { asset: ASSETS.websiteConcepts, label: "WEBSITE CONCEPTS", cap: "Layout studies across homepage, upload, browse and the entry detail." },
  { asset: ASSETS.moodboard, label: "THE MOODBOARD", cap: "Tone, texture and colour reference for the whole archive." },
  { asset: ASSETS.emailConcept, label: "NOTIFICATION CONCEPT", cap: "How a new entry quietly announces itself." },
];

export default function ConceptSlider() {
  const [i, setI] = useState(0);
  const go = (d) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);
  const s = SLIDES[i];

  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy-2)" }} data-testid="concept-slider">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16 grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">
        {/* LEFT: text */}
        <div>
          <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-6">FILE 010 — THE CONCEPT FILES</div>
          <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl leading-[1.02] mb-6">
            Before the archive, the idea.
          </h2>
          <div className="h-16">
            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-xs text-[color:var(--grey)] leading-relaxed max-w-sm"
              >
                {s.cap}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button onClick={() => go(-1)} className="w-11 h-11 hairline-light flex items-center justify-center text-[color:var(--kraft)]" data-cursor="prev" data-testid="slider-prev">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={() => go(1)} className="w-11 h-11 hairline-light flex items-center justify-center text-[color:var(--kraft)]" data-cursor="next" data-testid="slider-next">
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex gap-2 ml-3">
              {SLIDES.map((sl, k) => (
                <button
                  key={sl.label}
                  onClick={() => setI(k)}
                  data-cursor="jump"
                  data-testid={`slider-dot-${k}`}
                  className="font-mono text-[10px] tracking-wider2 transition-colors"
                  style={{ color: k === i ? "var(--rust)" : "rgba(237,230,216,0.4)" }}
                >
                  0{k + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: slide */}
        <div className="relative">
          <Tape className="absolute -top-4 left-6 z-20" rotate={-3} />
          <TopSecret className="absolute -bottom-4 -right-3 z-20" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.97, rotate: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hairline-light p-3"
              style={{ background: "var(--navy)" }}
              data-cursor="inspect"
            >
              <AssetImage asset={s.asset} note="Concept reference" className="aspect-[16/10]" />
              <div className="flex items-center justify-between px-1 pt-3 pb-1 font-mono text-[10px] tracking-wider2 text-[color:var(--grey)]">
                <span>{s.label}</span>
                <span>REF · {s.asset.file}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
