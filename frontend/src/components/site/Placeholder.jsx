// Labeled empty-state block: dashed border, filename, required dimensions.
// So a human can drop real macro-denim photography straight in.
export default function Placeholder({ file, dims, note, kraft = false, className = "", children }) {
  return (
    <div className={`ph ${kraft ? "ph-kraft" : ""} ${className}`} data-testid={`placeholder-${file}`}>
      <div className="px-4 py-6 leading-relaxed">
        <div className="opacity-70 mb-1">[ PLACEHOLDER ]</div>
        <div className="uppercase tracking-wider2">{file}</div>
        <div className="opacity-60 mt-1">{dims}</div>
        {note ? <div className="opacity-50 mt-2 text-[10px] normal-case">{note}</div> : null}
        {children}
      </div>
    </div>
  );
}
