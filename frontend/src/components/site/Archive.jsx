import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { ENTRIES } from "@/data";
import Placeholder from "./Placeholder";
import ArchiveCard from "./ArchiveCard";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const FILTERS = ["All Evidence", "Stains", "Tears", "Fades", "Repairs"];

function Tile({ entry, onOpen, depth }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40 * depth, -40 * depth]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);

  return (
    <motion.button
      ref={ref}
      style={{ y, rotateX, transformStyle: "preserve-3d" }}
      className="relative text-left group hairline-light block w-full"
      onClick={() => onOpen(entry)}
      data-cursor="open"
      data-testid={`archive-tile-${entry.id}`}
    >
      <div className="relative aspect-square overflow-hidden">
        <Placeholder file={entry.tile} dims="600x600px" className="absolute inset-0" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(180deg, transparent, rgba(20,24,31,0.7))" }} />
      </div>
      <div className="p-3 flex items-start justify-between gap-3" style={{ background: "var(--navy)" }}>
        <div>
          <div className="font-mono text-[11px] tracking-wider2 text-[color:var(--denim-2)]">{entry.number}</div>
          <div className="font-mono text-[11px] text-[color:var(--kraft)]/80 mt-1 leading-snug">{entry.line}</div>
        </div>
        <span className="font-mono text-[9px] text-[color:var(--rust)] shrink-0">{entry.category.toUpperCase()}</span>
      </div>
    </motion.button>
  );
}

export default function Archive() {
  const [filter, setFilter] = useState("All Evidence");
  const [sort, setSort] = useState("Latest");
  const [active, setActive] = useState(null);

  let list = ENTRIES.filter((e) => filter === "All Evidence" || e.category === filter);
  list = sort === "Latest" ? [...list].reverse() : list;

  return (
    <section id="archive" className="relative py-28 md:py-40 grain persp" style={{ background: "var(--navy)" }} data-testid="archive-section">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">FILE 004 — THE ARCHIVE</div>

        {/* stamped counter block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16 hairline-light" style={{ background: "rgba(237,230,216,0.15)" }}>
          {[["42,817", "Global Archive Entries"], ["96", "Countries Represented"], ["118,204", "Photos Collected"]].map(([n, l]) => (
            <div key={l} className="p-8" style={{ background: "var(--navy)" }}>
              <div className="font-serif-display text-5xl md:text-6xl text-[color:var(--kraft)]">{n}</div>
              <div className="font-mono text-[10px] tracking-wider2 text-[color:var(--grey)] mt-2">{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <p className="font-serif-display italic text-[color:var(--kraft)]/70 text-xl mb-12">Still Collecting Evidence.</p>

        {/* filters */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor="filter"
                data-testid={`filter-${f.replace(/\s+/g, "-").toLowerCase()}`}
                className={`font-mono text-[11px] tracking-wider2 px-4 py-2 hairline-light transition-colors duration-300 ${
                  filter === f ? "bg-[color:var(--rust)] text-[color:var(--kraft)]" : "text-[color:var(--kraft)]/70"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="font-mono text-[11px] tracking-wider2 px-4 py-2 hairline-light text-[color:var(--kraft)]/80 flex items-center gap-2" data-cursor="sort" data-testid="sort-trigger">
                SORT: {sort.toUpperCase()} <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-mono text-xs">
              <DropdownMenuItem onClick={() => setSort("Latest")} data-testid="sort-latest">Latest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("Oldest")} data-testid="sort-oldest">Oldest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {list.map((e, i) => (
            <Tile key={e.id} entry={e} onOpen={setActive} depth={0.5 + (i % 4) * 0.4} />
          ))}
        </div>
      </div>

      {/* detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: "rgba(10,12,16,0.94)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            data-testid="archive-detail-modal"
          >
            <button
              className="fixed top-6 right-6 font-mono text-[11px] tracking-wider2 text-[color:var(--kraft)] flex items-center gap-2 hairline-light px-4 py-2 z-10"
              onClick={() => setActive(null)}
              data-cursor="close"
              data-testid="detail-close-btn"
            >
              CLOSE <X className="w-4 h-4" />
            </button>
            <motion.div
              className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center py-16"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            >
              <div>
                <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">ARCHIVE ENTRY {active.number}</div>
                <h3 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-5xl leading-tight mb-6">{active.line}</h3>
                <div className="font-mono text-xs text-[color:var(--grey)] leading-relaxed mb-6">
                  Category: {active.category} · Origin: {active.country}<br />
                  This entry is part of a living, growing archive. Every mark recorded here happened to someone, somewhere. Drag the card to read the full Life Index.
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-[color:var(--kraft)]/80 hairline-light px-2 py-1">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <ArchiveCard data={{ ...active, status: "Still Collecting Memories." }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
