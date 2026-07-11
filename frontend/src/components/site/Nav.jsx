import { useEffect, useState } from "react";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[150] transition-colors duration-500"
      style={{ background: solid ? "rgba(20,24,31,0.85)" : "transparent", backdropFilter: solid ? "blur(8px)" : "none" }}
      data-testid="nav"
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-[11px] tracking-label text-[color:var(--kraft)]" data-cursor="top" data-testid="nav-brand">
          THE DENIM ARCHIVE
        </a>
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-wider2 text-[color:var(--kraft)]/70">
          <a href="#archive" className="hover:text-[color:var(--kraft)] transition-colors" data-cursor="open">ARCHIVE</a>
          <a href="#upload" className="hover:text-[color:var(--kraft)] transition-colors" data-cursor="open">SUBMIT</a>
          <span className="text-[color:var(--rust)]">● LIVE</span>
        </nav>
        <a href="#upload" className="font-mono text-[10px] tracking-wider2 text-[color:var(--kraft)] hairline-light px-4 py-2 md:hidden" data-cursor="upload">SUBMIT</a>
      </div>
    </header>
  );
}
