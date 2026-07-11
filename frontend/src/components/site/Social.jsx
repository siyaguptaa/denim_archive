import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Placeholder from "./Placeholder";

function Reel() {
  const vref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = vref.current;
    if (!v) return;
    if (!playing) { v.muted = false; setMuted(false); v.play().catch(() => {}); setPlaying(true); }
    else { v.muted = !v.muted; setMuted(v.muted); }
  };
  return (
    <button className="relative aspect-[9/16] w-full hairline-light overflow-hidden group" onClick={toggle} data-cursor="play" data-testid="social-reel">
      <video ref={vref} className="absolute inset-0 w-full h-full object-cover" loop muted playsInline poster="">
        <source src="/hero-film.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!playing && <span className="font-mono text-[10px] tracking-wider2 text-[color:var(--kraft)] bg-[color:var(--ink)]/70 px-3 py-2">▶ TAP TO PLAY WITH SOUND</span>}
      </div>
      <span className="absolute bottom-3 right-3 text-[color:var(--kraft)]">
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </span>
      <span className="absolute top-3 left-3 font-mono text-[9px] tracking-wider2 text-[color:var(--kraft)]">REEL · 9:16</span>
    </button>
  );
}

export default function Social() {
  return (
    <section className="relative py-28 md:py-40 grain" style={{ background: "var(--navy-2)" }} data-testid="social-section">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-10">FILE 009 — THE COMMUNITY</div>

        {/* profile header */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full denim-weave hairline-light shrink-0" />
          <div>
            <div className="font-mono text-lg text-[color:var(--kraft)]">the.denim.archive</div>
            <div className="font-mono text-[11px] text-[color:var(--grey)] mt-1">42.8k entries · 96 countries · Still collecting</div>
            <div className="font-serif-display italic text-[color:var(--kraft)]/70 mt-2">A living collection of everyday evidence.</div>
          </div>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          {/* 3x3 grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Placeholder key={i} file={`social-grid-${String(i + 1).padStart(2, "0")}.jpg`} dims="800x800px" className="aspect-square" />
            ))}
          </div>
          {/* reel + captions */}
          <div className="flex flex-col gap-4">
            <Reel />
            <div className="hairline-light p-4">
              <p className="font-mono text-xs text-[color:var(--kraft)]/85 leading-relaxed">These jeans have seen a lot. #DenimArchive #MyLifeIndex</p>
            </div>
            <a href="#upload" className="btn-stamp text-center" data-cursor="upload" data-testid="social-generate-btn">Generate Yours</a>
          </div>
        </div>
      </div>
    </section>
  );
}
