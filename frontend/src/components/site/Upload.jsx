import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { LIFE_TRAITS } from "@/data";
import { ASSETS } from "@/assets";
import AssetImage from "./AssetImage";
import ArchiveCard from "./ArchiveCard";
import { Tape, WaxSeal } from "./Stickers";

const TAGS = ["Coffee stains", "Pocket fading", "Frayed hems", "Paint residue", "Concert wristband", "Sun bleach", "Hand-sewn patch", "Grass marks", "Torn cuff"];
const STEPS = ["Reading the evidence.", "Calculating your story.", "Indexing the marks."];

function generate() {
  const li = {};
  LIFE_TRAITS.forEach((t) => { li[t] = 68 + Math.floor(Math.random() * 33); });
  const shuffled = [...TAGS].sort(() => Math.random() - 0.5);
  return {
    number: `A-${String(20000 + Math.floor(Math.random() * 79999)).padStart(5, "0")}`,
    tags: shuffled.slice(0, 4 + Math.floor(Math.random() * 2)),
    lifeIndex: li,
    status: "Still Collecting Memories.",
  };
}

export default function Upload() {
  const [phase, setPhase] = useState("idle");
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState(0);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!/image\/(jpe?g|png)/.test(file.type)) { toast.error("JPG or PNG only."); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error("Max file size is 10MB."); return; }
    setPhoto(URL.createObjectURL(file));
    setPhase("reading"); setStep(0);
    let s = 0;
    const iv = setInterval(() => { s += 1; setStep(s); }, 900);
    setTimeout(() => { clearInterval(iv); setResult(generate()); setPhase("done"); toast.success("Your Life Index is ready."); }, 2900);
  };
  const reset = () => { setPhase("idle"); setPhoto(null); setResult(null); };

  return (
    <section id="upload" className="relative paper grain torn-bottom py-28 md:py-40" data-testid="upload-section">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 005 — SUBMIT YOUR DENIM</div>
        <h2 className="font-serif-display text-[color:var(--ink)] text-4xl md:text-6xl mb-4 max-w-3xl leading-[1.05]">Generate your Life Index.</h2>
        <p className="font-mono text-xs text-[color:var(--ink)]/60 mb-14 max-w-md">Upload a photo of your own worn denim. We read the evidence and return your Archive Entry.</p>

        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div key="drop" className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => inputRef.current?.click()}
                className="hairline flex flex-col items-center justify-center text-center py-24 px-6 transition-colors duration-300"
                style={{ borderStyle: "dashed", background: dragOver ? "rgba(168,59,50,0.06)" : "transparent" }}
                data-cursor="upload" data-testid="upload-dropzone"
              >
                <WaxSeal className="mb-6" />
                <p className="font-serif-display text-2xl md:text-3xl text-[color:var(--ink)] mb-2">Drag & drop your denim photo, or click to browse.</p>
                <p className="font-mono text-[11px] tracking-wider2 text-[color:var(--ink)]/50">JPG, PNG UP TO 10MB</p>
                <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleFile(e.target.files[0])} data-testid="upload-input" />
              </div>
              <div className="relative">
                <Tape className="absolute -top-4 left-6 z-20" rotate={-5} text="SAMPLE OUTPUT" />
                <div className="hairline p-3 h-full bg-[color:var(--kraft-2)]">
                  <AssetImage asset={ASSETS.lifeIndexReference} kraft className="h-full min-h-[300px]" note="Life Index detail reference" />
                </div>
              </div>
            </motion.div>
          )}

          {phase === "reading" && (
            <motion.div key="reading" className="hairline py-24 px-6 flex flex-col items-center text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid="upload-loading">
              <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-6 animate-pulse">GENERATING YOUR LIFE INDEX...</div>
              {photo && <img src={photo} alt="denim" className="w-40 h-40 object-cover hairline mb-8 grayscale" />}
              <div className="space-y-2">
                {STEPS.map((s, i) => (
                  <div key={s} className={`font-serif-display text-xl md:text-2xl transition-opacity duration-500 text-[color:var(--ink)] ${i <= step ? "opacity-100" : "opacity-25"}`}>{s}</div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "done" && result && (
            <motion.div key="done" className="grid md:grid-cols-2 gap-12 items-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} data-testid="upload-result">
              <div className="relative">
                <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">ENTRY GENERATED — {result.number}</div>
                <h3 className="font-serif-display text-[color:var(--ink)] text-3xl md:text-5xl mb-6 leading-tight">The evidence has been read.</h3>
                <p className="font-mono text-xs text-[color:var(--ink)]/60 leading-relaxed mb-8 max-w-sm">Your denim now has an Archive Entry. Drag the card to flip it and read your full Life Index, then download your Evidence Card to keep or share.</p>
                <button className="btn-stamp" onClick={reset} data-cursor="reset" data-testid="upload-reset-btn">Submit Another</button>
              </div>
              <div className="relative flex justify-center">
                <div className="absolute inset-0 -z-0 opacity-40 pointer-events-none">
                  <AssetImage asset={ASSETS.evidenceCardPrint} kraft className="w-full h-full" />
                </div>
                <div className="relative z-10"><ArchiveCard data={result} photoUrl={photo} /></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
