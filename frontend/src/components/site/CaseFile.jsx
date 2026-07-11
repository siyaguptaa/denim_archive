import { motion } from "framer-motion";
import Placeholder from "./Placeholder";

export default function CaseFile() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy-2)" }} data-testid="casefile-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Placeholder file="case-file-flatlay.jpg" dims="1600x1600px" note="Case file flat-lay: box, kraft folder, gloves, magnifier, cards" className="aspect-square" />
          {/* evidence tape sticker */}
          <motion.div
            className="absolute -top-4 left-8 evidence-tape font-mono text-[10px] tracking-wider2 px-6 py-2 rotate-[-4deg]"
            whileHover={{ rotate: 0, y: -4, scale: 1.03 }}
            style={{ boxShadow: "3px 5px 12px rgba(0,0,0,0.35)" }}
            data-cursor="evidence"
          >
            EVIDENCE · EVIDENCE · EVIDENCE
          </motion.div>
          {/* collected stamp */}
          <motion.div
            className="absolute -bottom-6 -right-4 w-28 h-28 rounded-full flex items-center justify-center rotate-[8deg]"
            style={{ border: "2px solid var(--rust)", color: "var(--rust)" }}
            whileHover={{ rotate: 0, scale: 1.06 }}
            data-cursor="collected"
          >
            <span className="font-mono text-[10px] tracking-label text-center leading-tight">COLLECTED<br />● 2025 ●</span>
          </motion.div>
        </motion.div>

        <div>
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
      </div>
    </section>
  );
}
