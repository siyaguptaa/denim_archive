import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import { Pin } from "./Stickers";

export default function Social() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy)" }} data-testid="social-section">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-10">FILE 009 — THE COMMUNITY</div>

        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full denim-weave hairline-light shrink-0" />
          <div>
            <div className="font-mono text-lg text-[color:var(--kraft)]">the.denim.archive</div>
            <div className="font-mono text-[11px] text-[color:var(--grey)] mt-1">42.8k entries · 96 countries · Still collecting</div>
            <div className="font-serif-display italic text-[color:var(--kraft)]/70 mt-2">A living collection of everyday evidence.</div>
          </div>
        </div>

        <div className="relative">
  <Pin className="absolute -top-2 left-10 z-20" />

  <div
    className="hairline-light p-3"
    style={{ background: "var(--navy-2)" }}
    data-cursor="inspect"
  >
    <AssetImage
      asset={ASSETS.socialConcepts}
      className="aspect-video"
      imgClassName="w-full h-full object-contain"
      note="Instagram campaign concepts"
    />
  </div>

  <div className="hairline-light p-4 mt-6">
    <p className="font-mono text-xs text-[color:var(--kraft)]/85 leading-relaxed">
      These jeans have seen a lot. #DenimArchive #MyLifeIndex
    </p>
  </div>

  <a
    href="#upload"
    className="btn-stamp text-center mt-6 inline-block"
    data-cursor="upload"
    data-testid="social-generate-btn"
  >
    Generate Yours
  </a>
</div>
      </div>
    </section>
  );
}
