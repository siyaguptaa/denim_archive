import { useEffect, useRef, useState } from "react";

// Chunky 8-bit magnifying glass drawn as pixel rects (16x16 grid).
const GLASS = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' shape-rendering='crispEdges'%3E%3Cpath fill='%23ede6d8' d='M4 2h6v1h2v1h1v2h1v6h-1v2h-2v1H4v-1H2v-2H1V6h1V4h2z'/%3E%3Cpath fill='%2314181f' d='M4 1h6v1H4zM10 2h2v1h-2zM12 3h1v1h-1zM13 4h1v2h-1zM14 6h1v6h-1v-1h-1v1h1v1h-1v1h-1v-1h1v-1h1zM2 4h2v1H2zM1 6h1v6H1zM2 12h2v1H2zM4 13h6v1H4zM10 12h2v1h-2z'/%3E%3Cpath fill='%23a83b32' d='M6 4h2v1h1v1h1v2h-1v1H8v1H6V9H5V6h1z'/%3E%3Cpath fill='%23ede6d8' d='M6 5h1v1H6z'/%3E%3Cpath fill='%2314181f' d='M13 13h1v1h-1zM14 14h1v1h-1zM15 15h1v1h-1z'/%3E%3C/svg%3E`;

export default function CustomCursor() {
  const dot = useRef(null);
  const lbl = useRef(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let raf;
    const pos = { x: -100, y: -100 };

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) setVisible(true);
      const t = e.target.closest("[data-cursor]");
      const next = t ? t.getAttribute("data-cursor") : "";
      setLabel((prev) => (prev === next ? prev : next));
    };
    const render = () => {
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
      if (lbl.current) lbl.current.style.transform = `translate(${pos.x + 26}px, ${pos.y + 18}px)`;
      raf = requestAnimationFrame(render);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      <img
        ref={dot}
        src={GLASS}
        alt=""
        className="pixel-cursor"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden
      />
      {label ? (
        <span ref={lbl} className="pixel-label" aria-hidden>
          {label}
        </span>
      ) : null}
    </>
  );
}
