import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TAGLINES } from "@/data";

export default function Footer() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setI((v) => (v + 1) % TAGLINES.length), 3000);
    return () => clearInterval(iv);
  }, []);
  return (
    <footer className="relative grain-strong" style={{ background: "var(--navy)" }} data-testid="footer">
      {/* editorial marquee */}
      <div className="overflow-hidden border-y hairline-light py-6">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="font-serif-display text-[color:var(--kraft)]/40 text-3xl md:text-5xl px-8">
              The campaign succeeds when people stop saying these jeans are worn out, and start saying these jeans have lived. · &nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-16 py-20 grid md:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          <div className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-5xl mb-6">THE DENIM ARCHIVE</div>
          <div className="h-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-[11px] tracking-label text-[color:var(--rust)]"
              >
                {TAGLINES[i].toUpperCase()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <nav className="flex flex-col gap-3 md:items-end">
          {["Archive", "Stories", "About", "Journal", "Submit"].map((l) => (
            <a key={l} href="#archive" className="font-mono text-xs tracking-wider2 text-[color:var(--kraft)]/70 hover:text-[color:var(--kraft)] transition-colors" data-cursor="open" data-testid={`footer-link-${l.toLowerCase()}`}>
              {l.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-16 pb-10 flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] tracking-wider2 text-[color:var(--grey)]">
        <span>EVIDENCE OF LIVING. EVERY PAIR TELLS THE TRUTH.</span>
        <span>© 2025 THEDENIMARCHIVE.COM — A CAMPAIGN CONCEPT</span>
      </div>
    </footer>
  );
}
