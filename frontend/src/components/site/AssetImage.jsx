import { useState } from "react";
import { ASSET_DIR } from "@/assets";

// Renders the real asset; if the file isn't dropped in yet, shows a labeled
// empty state so a human knows exactly which file (and size) belongs here.
export default function AssetImage({ asset, note, kraft = false, className = "", imgClassName = "", position }) {
  const [failed, setFailed] = useState(false);
  const { file, dims } = asset;
  return (
    <div className={`relative overflow-hidden ${className}`} data-testid={`asset-${file}`}>
      {!failed ? (
        <img
          src={`${ASSET_DIR}/${file}`}
          alt={file.replace(/\.[a-z0-9]+$/i, "").replace(/-/g, " ")}
          className={`w-full h-full object-cover ${imgClassName}`}
          style={position ? { objectPosition: position } : undefined}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`ph ${kraft ? "ph-kraft" : ""} w-full h-full`}>
          <div className="px-4 py-6 leading-relaxed">
            <div className="opacity-70 mb-1">[ DROP IMAGE HERE ]</div>
            <div className="uppercase tracking-wider2">{file}</div>
            <div className="opacity-60 mt-1">{dims}</div>
            {note ? <div className="opacity-50 mt-2 text-[10px] normal-case">{note}</div> : null}
          </div>
        </div>
      )}
    </div>
  );
}
