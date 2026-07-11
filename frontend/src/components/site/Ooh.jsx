import { OOH } from "@/data";
import Placeholder from "./Placeholder";

export default function Ooh() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy)" }} data-testid="ooh-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16 mb-12">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 007 — OUT OF HOME</div>
        <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl">Seen in the wild.</h2>
      </div>

      <div className="flex gap-6 overflow-x-auto px-6 md:px-16 pb-8 snap-x" data-testid="ooh-strip">
        {OOH.map((o, i) => (
          <div key={o.n} className="shrink-0 w-[80vw] md:w-[420px] snap-start" data-cursor="poster">
            {/* bus shelter frame */}
            <div className="hairline-light p-4" style={{ background: "var(--navy-2)" }}>
              <Placeholder file={`ooh-macro-${String(i + 1).padStart(2, "0")}.jpg`} dims="1080x1350px" className="aspect-[4/5] mb-4" />
              <div className="font-mono text-[10px] tracking-wider2 text-[color:var(--denim-2)]">EVIDENCE {o.n}</div>
              <div className="font-serif-display text-[color:var(--kraft)] text-2xl mt-2 leading-tight">
                {o.a}<br />{o.b}
              </div>
            </div>
            <div className="font-mono text-[10px] tracking-wider2 text-[color:var(--grey)] mt-3">BUS SHELTER · 1080x1350</div>
          </div>
        ))}
      </div>
    </section>
  );
}
