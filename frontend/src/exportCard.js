// Renders an Archive Card to a canvas and triggers a PNG download.
// Self-contained (no external deps) so the "Download Evidence Card" flow is real.
export function downloadEvidenceCard(data) {
  const W = 1000, H = 1250, P = 70;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");

  // kraft background
  x.fillStyle = "#ede6d8";
  x.fillRect(0, 0, W, H);
  // subtle noise dots
  x.fillStyle = "rgba(28,26,22,0.04)";
  for (let i = 0; i < 2600; i++) {
    x.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }
  // border
  x.strokeStyle = "#1c1a16";
  x.lineWidth = 2;
  x.strokeRect(P / 2, P / 2, W - P, H - P);

  x.fillStyle = "#1c1a16";
  x.textBaseline = "top";

  // header label
  x.font = "600 20px 'IBM Plex Mono', monospace";
  x.fillText("THE DENIM ARCHIVE", P, P);
  x.font = "400 14px 'IBM Plex Mono', monospace";
  x.fillStyle = "#8a8880";
  x.fillText("EVIDENCE OF LIVING", P, P + 26);

  // photo area (denim block)
  const py = P + 70, ph = 360;
  const grad = x.createLinearGradient(P, py, W - P, py + ph);
  grad.addColorStop(0, "#5f7a99");
  grad.addColorStop(1, "#3c5069");
  x.fillStyle = grad;
  x.fillRect(P, py, W - P * 2, ph);
  x.strokeStyle = "rgba(255,255,255,0.15)";
  x.lineWidth = 1;
  for (let i = 0; i < ph; i += 4) {
    x.beginPath(); x.moveTo(P, py + i); x.lineTo(W - P, py + i + 8); x.stroke();
  }

  // archive number stamp
  let cy = py + ph + 40;
  x.fillStyle = "#1c1a16";
  x.font = "600 46px 'IBM Plex Mono', monospace";
  x.fillText(`ARCHIVE ENTRY ${data.number}`, P, cy);

  // evidence collected
  cy += 78;
  x.font = "500 15px 'IBM Plex Mono', monospace";
  x.fillStyle = "#a83b32";
  x.fillText("EVIDENCE COLLECTED", P, cy);
  cy += 26;
  x.font = "400 16px 'IBM Plex Sans', sans-serif";
  x.fillStyle = "#1c1a16";
  x.fillText(data.tags.join("  /  "), P, cy);

  // life index
  cy += 46;
  x.font = "500 15px 'IBM Plex Mono', monospace";
  x.fillStyle = "#a83b32";
  x.fillText("LIFE INDEX", P, cy);
  cy += 30;
  const entries = Object.entries(data.lifeIndex);
  const bw = W - P * 2;
  entries.forEach(([k, v]) => {
    x.font = "400 13px 'IBM Plex Mono', monospace";
    x.fillStyle = "#1c1a16";
    x.fillText(k.toUpperCase(), P, cy);
    x.fillText(String(v), W - P - 26, cy);
    // track
    x.fillStyle = "rgba(28,26,22,0.14)";
    x.fillRect(P, cy + 18, bw, 6);
    x.fillStyle = "#1c1a16";
    x.fillRect(P, cy + 18, (bw * v) / 100, 6);
    cy += 40;
  });

  // status
  cy += 6;
  x.font = "italic 400 18px 'Fraunces', Georgia, serif";
  x.fillStyle = "#1c1a16";
  x.fillText(data.status || "Still Collecting Memories.", P, cy);

  const url = c.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `denim-archive-${data.number}.png`;
  a.click();
}
