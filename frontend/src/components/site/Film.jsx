import { ASSETS } from "@/assets";
import { Tape } from "./Stickers";

export default function Film() {
  return (
    <section
      className="relative py-28 md:py-40 grain"
      style={{ background: "var(--navy)" }}
      data-testid="film-section"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-[11px] tracking-label text-[color:var(--rust)] mb-4">
              FILE 003 — THE FILM
            </div>

            <h2 className="font-serif-display text-[color:var(--kraft)] text-4xl md:text-6xl">
              Evidence of Living — The Film.
            </h2>
          </div>

          <p className="font-mono text-xs text-[color:var(--grey)] max-w-xs md:text-right">
            Not about denim. About a life. Runtime 02:14.
          </p>
        </div>

        <div className="relative w-full">
          <Tape
            className="absolute top-6 left-6 z-20"
            rotate={-3}
            text="EVIDENCE OF LIVING"
          />

          <div className="relative aspect-video overflow-hidden hairline-light rounded-lg">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              data-testid="hero-video"
            >
              <source
                src={`/assets/${ASSETS.heroFilm.file}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}