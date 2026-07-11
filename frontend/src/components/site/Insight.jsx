import { motion } from "framer-motion";
import { INSIGHT_TILES } from "@/data";
import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import { Tape, Pin, TopSecret } from "./Stickers";

export default function Insight() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy-2)" }} data-testid="insight-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-24 items-center">
        {/* LEFT — feature photo with stickers */}
        <motion.div
          className="relative order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Pin className="absolute -top-2 left-10 z-20" />
          <Pin className="absolute -top-2 right-10 z-20" />
          <Tape className="absolute top-6 -right-4 z-20" rotate={6} text="EXHIBIT A" />
          <TopSecret className="absolute -bottom-4 left-6 z-20" text="EVIDENCE 001" />
          <div className="hairline-light p-3" style={{ background: "var(--navy)" }} data-cursor="inspect">
            <AssetImage asset={ASSETS.featureRippedKnee} className="aspect-[4/5]" note="Macro evidence feature" />
          </div>
        </motion.div>

        {/* RIGHT — observations list */}
        <div className="order-1 lg:order-2">
          <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 002 — THE INSIGHT</div>
          <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl leading-[1] mb-8 max-w-xl">
            Damage is the wrong word.
          </h2>
          <p className="font-mono text-xs text-[color:var(--grey)] leading-relaxed max-w-md mb-10">
            Some marks matter more than others. Each is a fact, recorded in cotton and indigo.
          </p>
          <ul className="divide-y" style={{ borderColor: "rgba(237,230,216,0.14)" }}>
            {INSIGHT_TILES.map((label, i) => (
              <motion.li
                key={label}
                className="flex items-center justify-between py-4 group"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                data-cursor="inspect"
                data-testid={`insight-row-${i}`}
              >
                <span className="font-serif-display text-2xl md:text-3xl text-[color:var(--kraft)] transition-transform duration-300 group-hover:translate-x-2">
                  {label}
                </span>
                <span className="font-mono text-[10px] tracking-wider2 text-[color:var(--denim-2)]">EV-{String(i + 1).padStart(3, "0")}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
