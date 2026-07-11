import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Placeholder from "./Placeholder";
import { downloadEvidenceCard } from "@/exportCard";

// Signature Archive Card: a physical index-card you drag to flip in 3D.
export default function ArchiveCard({ data, compact = false, photoUrl }) {
  const rotateY = useMotionValue(0);
  const drag = useRef({ active: false, startX: 0, startRot: 0 });

  // front visible while facing us, back while flipped
  const frontOpacity = useTransform(rotateY, (r) => {
    const m = ((r % 360) + 360) % 360;
    return m > 90 && m < 270 ? 0 : 1;
  });
  const backOpacity = useTransform(rotateY, (r) => {
    const m = ((r % 360) + 360) % 360;
    return m > 90 && m < 270 ? 1 : 0;
  });

  const onDown = (e) => {
    drag.current = { active: true, startX: e.clientX, startRot: rotateY.get() };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current.active) return;
    rotateY.set(drag.current.startRot + (e.clientX - drag.current.startX) * 0.6);
  };
  const onUp = () => {
    drag.current.active = false;
    const snapped = Math.round(rotateY.get() / 180) * 180;
    animate(rotateY, snapped, { type: "spring", stiffness: 120, damping: 16 });
  };
  const flip = () => {
    if (Math.abs(rotateY.get() % 360) < 1 || Math.abs(rotateY.get() % 360) > 359) {
      animate(rotateY, rotateY.get() + 180, { type: "spring", stiffness: 120, damping: 16 });
    } else {
      const snapped = Math.round(rotateY.get() / 180) * 180;
      animate(rotateY, snapped % 360 === 0 ? snapped + 180 : snapped, { type: "spring", stiffness: 120, damping: 16 });
    }
  };

  return (
    <div className={`persp select-none ${compact ? "w-full max-w-[340px]" : "w-full max-w-[420px]"}`} data-testid="archive-card">
      <motion.div
        className="preserve-3d relative"
        style={{ rotateY, aspectRatio: "4/5" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        data-cursor="drag"
      >
        {/* FRONT */}
        <motion.div
          className="absolute inset-0 backface-hidden paper hairline p-5 flex flex-col"
          style={{ opacity: frontOpacity }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] tracking-wider2 text-[color:var(--ink)]">
            <span>THE DENIM ARCHIVE</span>
            <span className="text-[color:var(--rust)]">CLASSIFIED</span>
          </div>
          <Placeholder file="archive-photo.jpg" dims="800x800px" kraft className="flex-1 my-4">
            {photoUrl ? (
              <img src={photoUrl} alt="uploaded denim" className="absolute inset-0 w-full h-full object-cover" />
            ) : null}
          </Placeholder>
          <div className="font-mono text-lg tracking-wider2 text-[color:var(--ink)]">
            ARCHIVE ENTRY {data.number}
          </div>
          <div className="mt-3">
            <div className="font-mono text-[10px] tracking-label text-[color:var(--rust)] mb-2">EVIDENCE COLLECTED</div>
            <div className="flex flex-wrap gap-1.5">
              {data.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] text-[color:var(--ink)] hairline px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 font-mono text-[10px] tracking-wider2 text-[color:var(--grey)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--rust)] inline-block animate-pulse" />
            DRAG TO FLIP · READ THE LIFE INDEX
          </div>
        </motion.div>

        {/* BACK */}
        <motion.div
          className="absolute inset-0 backface-hidden paper hairline p-5 flex flex-col"
          style={{ opacity: backOpacity, rotateY: 180 }}
        >
          <div className="font-mono text-[10px] tracking-label text-[color:var(--rust)]">LIFE INDEX</div>
          <div className="font-serif-display italic text-[color:var(--ink)] text-lg leading-tight mt-1 mb-3">
            {data.number}
          </div>
          <div className="flex-1 flex flex-col justify-center gap-3">
            {Object.entries(data.lifeIndex).map(([k, v]) => (
              <div key={k}>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-wider2 text-[color:var(--ink)] mb-1">
                  <span>{k.toUpperCase()}</span>
                  <span>{v}</span>
                </div>
                <div className="li-track">
                  <motion.div
                    className="li-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="font-serif-display italic text-[color:var(--ink)] mt-3">
            {data.status || "Still Collecting Memories."}
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-6 flex items-center gap-4">
        <button
          className="btn-stamp"
          data-cursor="flip"
          onClick={flip}
          data-testid="flip-card-btn"
        >
          Flip Card
        </button>
        <button
          className="btn-stamp"
          style={{ background: "var(--rust)", borderColor: "var(--rust)" }}
          data-cursor="save"
          onClick={() => downloadEvidenceCard(data)}
          data-testid="download-card-btn"
        >
          Download Evidence Card
        </button>
      </div>
    </div>
  );
}
