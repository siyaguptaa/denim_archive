import { motion } from "framer-motion";
import { OOH } from "@/data";
import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import { Tape, Pin } from "./Stickers";

export default function Ooh() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy)" }} data-testid="ooh-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16 grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-20 items-center">
        {/* LEFT — copy list */}
        <div>
          <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 007 — OUT OF HOME</div>
          <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl mb-10">Seen in the wild.</h2>
          <div className="space-y-6">
            {OOH.map((o, i) => (
              <motion.div
                key={o.n}
                className="grid grid-cols-[auto_1fr] gap-6 items-baseline border-b pb-5"
                style={{ borderColor: "rgba(237,230,216,0.14)" }}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-cursor="poster"
                data-testid={`ooh-line-${i}`}
              >
                <span className="font-mono text-[11px] tracking-wider2 text-[color:var(--denim-2)]">EVIDENCE {o.n}</span>
                <span className="font-serif-display text-[color:var(--kraft)] text-2xl md:text-3xl leading-tight">{o.a} {o.b}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — bus shelter poster */}
        <motion.div className="relative" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <Pin className="absolute -top-2 left-10 z-20" />
          <Tape className="absolute top-8 -left-4 z-20" rotate={-6} text="BUS SHELTER" />
          <div className="hairline-light p-4" style={{ background: "var(--navy-2)" }} data-cursor="inspect">
            <AssetImage asset={ASSETS.oohPoster} className="aspect-[4/5]" note="OOH environment mood" />
            <div className="font-mono text-[10px] tracking-wider2 text-[color:var(--grey)] mt-3 px-1">OUTDOOR · 1080x1350</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
