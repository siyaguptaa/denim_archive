import { motion } from "framer-motion";
import Placeholder from "./Placeholder";

export default function Retail() {
  return (
    <section className="relative paper grain py-28 md:py-40" data-testid="retail-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 008 — THE POP-UP</div>
        <h2 className="font-serif-display text-[color:var(--ink)] text-4xl md:text-6xl mb-16 max-w-2xl leading-[1.02]">
          The Evidence Station.
        </h2>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <Placeholder file="retail-interior.jpg" dims="1600x1000px" kraft note="Pop-up interior: QR kiosk, folded denim shelves, fitting mirror" className="aspect-[16/10]" />
          </motion.div>

          <div className="flex flex-col gap-6">
            <div className="hairline p-6 bg-[color:var(--ink)] text-[color:var(--kraft)]" data-cursor="scan">
              <div className="font-mono text-[10px] tracking-label text-[color:var(--denim-2)] mb-3">QR SCAN KIOSK</div>
              {/* faux pixel QR */}
              <div className="grid grid-cols-6 gap-1 w-24 h-24 mb-4" aria-hidden>
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} style={{ background: (i * 7 + (i % 5)) % 3 === 0 ? "var(--kraft)" : "transparent" }} />
                ))}
              </div>
              <p className="font-serif-display text-xl leading-tight">Scan. Upload your denim. Get your Life Index.</p>
            </div>

            <div className="hairline p-6" data-cursor="tag">
              <div className="font-mono text-[10px] tracking-label text-[color:var(--rust)] mb-2">KRAFT HANG TAG</div>
              <p className="font-mono text-sm text-[color:var(--ink)]">ARCHIVE ENTRY<br />STATUS: Still Collecting Evidence</p>
            </div>

            <div className="hairline p-6 flex items-center justify-center text-center aspect-[3/2]" style={{ background: "linear-gradient(160deg,#dcd6c8,#efe9dd)" }} data-cursor="mirror">
              <p className="font-serif-display italic text-2xl text-[color:var(--ink)]">Still Collecting Memories.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
