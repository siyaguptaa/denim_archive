import { motion } from "framer-motion";
import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import { Tape, CollectedStamp } from "./Stickers";

export default function CaseFile() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy-2)" }} data-testid="casefile-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
        {/* LEFT — text (flipped orientation vs other sections) */}
        <div className="order-2 lg:order-1">
          <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-6">FILE 006 — THE CASE FILE</div>
          <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl leading-[1.02] mb-8">
            Every mark has a memory. Every memory is evidence.
          </h2>
          <p className="font-mono text-xs text-[color:var(--grey)] leading-relaxed max-w-md mb-8">
            A black box opens to reveal the jeans wrapped in plastic with a red EVIDENCE tag, a kraft folder stamped CLASSIFIED, a Life Index card, an Archive Card, white cotton gloves, and a magnifying glass. Filed like a detective&apos;s case.
          </p>
          <div className="paper hairline p-5 max-w-sm">
            <div className="font-mono text-[10px] tracking-wider2 text-[color:var(--ink)]/50 mb-2">PACKAGING TAG</div>
            <p className="font-serif-display italic text-[color:var(--ink)] text-lg">Every fade begins with a moment. Go collect yours.</p>
          </div>
        </div>

        {/* RIGHT — flat-lay */}
        <motion.div className="relative order-1 lg:order-2" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <Tape className="absolute -top-4 left-8 z-20" rotate={-4} />
          <CollectedStamp className="absolute -bottom-6 -right-4 z-20" />
          <div className="hairline-light p-3" style={{ background: "var(--navy)" }} data-cursor="inspect">
            <AssetImage asset={ASSETS.prBox} className="aspect-square" note="Case file flat-lay: box, folder, gloves, magnifier, cards" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
