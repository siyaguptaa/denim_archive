// The Denim Archive — data bank. All copy verbatim from the brief where indicated.

export const TAGLINES = [
  "Evidence of Living",
  "Every Pair Tells the Truth.",
  "Proof You Lived.",
  "Life Leaves Marks.",
  "Still Collecting Memories.",
  "Wear Life Well.",
  "Collect Evidence.",
  "Some Marks Matter More Than Others.",
  "A living collection of everyday evidence.",
  "Not about denim. About a life.",
];

const CATS = ["Stains", "Tears", "Fades", "Repairs"];

const EVIDENCE_LINES = [
  ["Coffee residue. First apartment.", "Stains"],
  ["Frayed hem. Missed trains. Late nights.", "Tears"],
  ["Paint residue. Built something worth remembering.", "Stains"],
  ["Pocket stretched. Never left home without the essentials.", "Fades"],
  ["Ripped knee. Learned courage the hard way.", "Tears"],
  ["Coffee residue. Pulled another all-nighter.", "Stains"],
  ["Ripped knee. Learned something the hard way.", "Tears"],
  ["Pocket faded. Always carried hope.", "Fades"],
  ["Paint stains. Built a home.", "Stains"],
  ["Faded pocket. Loose change and old receipts.", "Fades"],
  ["Frayed cuff. Walked further than planned.", "Tears"],
  ["Ink mark. Signed something that mattered.", "Stains"],
  ["Sun bleach. A summer that ran long.", "Fades"],
  ["Patched knee. Sewn back by hand.", "Repairs"],
  ["Grass stain. Fell laughing.", "Stains"],
  ["Worn seat. Long drives, no destination.", "Fades"],
  ["Torn belt loop. Someone pulled you close.", "Tears"],
  ["Bleach spot. A kitchen at 2am.", "Stains"],
  ["Reinforced seam. Refused to give up.", "Repairs"],
  ["Faded thigh. Same seat, same window.", "Fades"],
  ["Split seam. Danced too hard.", "Tears"],
  ["Wax residue. A candlelit table.", "Stains"],
  ["Darned pocket. Kept what mattered.", "Repairs"],
  ["Chalk dust. Climbed higher.", "Stains"],
];

const TRAITS = ["Adventure", "Creativity", "Late Nights", "Travel", "Chaos", "Comfort", "Sentiment"];

function seededIndex(seed) {
  const li = {};
  TRAITS.forEach((t, i) => {
    li[t] = 60 + ((seed * (i + 3) * 37) % 41); // 60..100
  });
  return li;
}

const TAG_POOL = [
  "Coffee stains", "Pocket fading", "Frayed hems", "Paint residue",
  "Concert wristband", "Grass marks", "Ink smudge", "Sun bleach",
  "Hand-sewn patch", "Torn cuff", "Worn seat", "Split seam",
];

export const ENTRIES = EVIDENCE_LINES.map((row, i) => {
  const num = 20481 + i * 173 + (i % 4) * 41;
  const seed = i + 7;
  const tagCount = 3 + (i % 3);
  const tags = TAG_POOL.slice(i % 5, (i % 5) + tagCount);
  return {
    id: i + 1,
    number: `A-${String(num).padStart(5, "0")}`,
    line: row[0],
    category: row[1],
    tile: `archive-tile-${String(i + 1).padStart(2, "0")}.jpg`,
    tags: tags.length ? tags : TAG_POOL.slice(0, 3),
    lifeIndex: seededIndex(seed),
    country: ["Japan", "France", "USA", "Brazil", "India", "Germany", "Kenya", "Italy"][i % 8],
  };
});

// Signature hero card (verbatim from brief section 6)
export const HERO_CARD = {
  number: "A-20481",
  tags: ["Coffee stains", "Pocket fading", "Frayed hems", "Paint residue", "Concert wristband"],
  lifeIndex: {
    Adventure: 92, Creativity: 88, "Late Nights": 97, Travel: 74,
    Chaos: 81, Comfort: 100, Sentiment: 95,
  },
  status: "Still Collecting Memories.",
};

export const INSIGHT_TILES = [
  "A coffee stain.",
  "A faded pocket.",
  "A ripped knee.",
  "A frayed hem.",
  "A paint smudge.",
  "A worn seam.",
];

export const OOH = [
  { n: "021", a: "Coffee residue.", b: "Pulled another all-nighter." },
  { n: "137", a: "Ripped knee.", b: "Learned something the hard way." },
  { n: "284", a: "Pocket faded.", b: "Always carried hope." },
  { n: "398", a: "Paint stains.", b: "Built a home." },
];

export const LIFE_TRAITS = TRAITS;
