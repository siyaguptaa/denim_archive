import { motion } from "framer-motion";

const CHAPTERS = [
  { n: "01", t: "What if the most honest record of your life wasn't stored in your camera roll." },
  { n: "02", t: "What if it was stitched into your favourite pair of jeans." },
  { n: "03", t: "Long after photographs are forgotten and memories fade, denim quietly keeps a record of where you've been, what you've done and who you've become." },
  { n: "04", t: "It never asks for attention. It simply remembers." },
];

export default function Manifesto() {
  return (
    <section className="relative paper grain torn-bottom py-28 md:py-40" data-testid="manifesto-section">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-16">
          FILE 001 — THE HUMAN TRUTH
        </div>
        <div className="space-y-14 md:space-y-20">
          {CHAPTERS.map((c) => (
            <motion.div
              key={c.n}
              className="grid grid-cols-[auto_1fr] gap-6 md:gap-12 items-start"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-sm text-[color:var(--rust)] pt-3 md:pt-5">{c.n}</span>
              <p className="font-serif-display text-[color:var(--ink)] text-2xl md:text-4xl lg:text-5xl leading-[1.15] max-w-4xl">
                {c.t}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
