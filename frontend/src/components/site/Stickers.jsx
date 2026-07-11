import { motion } from "framer-motion";

// Physical stickers with a little hover physics (tilt + lift).
const lift = { rotate: 0, y: -4, scale: 1.04 };

export function Tape({ text = "EVIDENCE · EVIDENCE · EVIDENCE", rotate = -4, className = "" }) {
  return (
    <motion.div
      className={`evidence-tape font-mono text-[10px] tracking-wider2 px-6 py-2 ${className}`}
      style={{ rotate, boxShadow: "3px 5px 12px rgba(0,0,0,0.35)" }}
      whileHover={lift}
      data-cursor="evidence"
    >
      {text}
    </motion.div>
  );
}

export function WaxSeal({ className = "", size = 56 }) {
  return (
    <motion.div
      className={`wax-seal flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.08, rotate: 6 }}
      data-cursor="seal"
    >
      <span className="font-mono text-[7px] tracking-label text-[color:var(--kraft)]/80">DA</span>
    </motion.div>
  );
}

export function CollectedStamp({ className = "", rotate = 8 }) {
  return (
    <motion.div
      className={`w-24 h-24 rounded-full flex items-center justify-center ${className}`}
      style={{ border: "2px solid var(--rust)", color: "var(--rust)", rotate }}
      whileHover={{ rotate: 0, scale: 1.06 }}
      data-cursor="collected"
    >
      <span className="font-mono text-[9px] tracking-label text-center leading-tight">COLLECTED<br />● 2025 ●</span>
    </motion.div>
  );
}

export function TopSecret({ className = "", rotate = -6, text = "CLASSIFIED" }) {
  return (
    <motion.div
      className={`stamp-box px-3 py-1 text-[10px] ${className}`}
      style={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      data-cursor="file"
    >
      {text}
    </motion.div>
  );
}

export function Pin({ className = "" }) {
  return <span className={`pin block ${className}`} aria-hidden />;
}
