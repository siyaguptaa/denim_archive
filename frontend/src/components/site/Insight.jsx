import { motion } from "framer-motion";
import { INSIGHT_TILES } from "@/data";
import Placeholder from "./Placeholder";

function Tile({ label, index }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(10px)`;
  };
  const reset = (e) => { e.currentTarget.style.transform = ""; };
  return (
    <motion.div
      className="relative group hairline-light"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transition: "transform .2s ease", transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
      data-cursor="inspect"
      data-testid={`insight-tile-${index}`}
    >
      <Placeholder file={`evidence-macro-${String(index + 1).padStart(2, "0")}.jpg`} dims="1080x1350px" className="aspect-[4/5]" />
      <div className="absolute left-0 bottom-0 right-0 p-4 flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider2 text-[color:var(--kraft)]">{label}</span>
        <span className="font-mono text-[10px] text-[color:var(--denim-2)]">EV-{String(index + 1).padStart(3, "0")}</span>
      </div>
    </motion.div>
  );
}

export default function Insight() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy-2)" }} data-testid="insight-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 002 — THE INSIGHT</div>
            <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl leading-[1] max-w-2xl">
              Damage is the wrong word.
            </h2>
          </div>
          <p className="font-mono text-xs text-[color:var(--grey)] max-w-xs leading-relaxed">
            Some marks matter more than others. Each is a fact, recorded in cotton and indigo. Hover to inspect the evidence.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {INSIGHT_TILES.map((label, i) => (
            <Tile key={label} label={label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
