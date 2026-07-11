// The exact assets that exist (13 images + 1 video). Drop files into /public/assets/.
// Each slot references its real filename; until the file is present, a labeled
// placeholder is shown by <AssetImage/>.
export const ASSET_DIR = "/assets";

export const ASSETS = {
  heroFilm:          { file: "hero-film.mp4",           dims: "1920x1080px · 16:9" },
  heroBg:            { file: "hero-bg.jpg",             dims: "1920x1080px" },
  archiveCard:       { file: "archive-card.jpg",        dims: "1200x1500px" },
  denimArchive:      { file: "denim-archive.jpg",       dims: "1600x1000px" },
  featureRippedKnee: { file: "feature-ripped-knee.jpg", dims: "1080x1350px" },
  evidenceCardPrint: { file: "evidence-card-print.jpg", dims: "1000x1250px" },
  lifeIndexReference:{ file: "life-index-reference.jpg",dims: "1080x1350px" },
  oohPoster:         { file: "ooh-poster.jpg",          dims: "1080x1350px" },
  prBox:             { file: "pr-box.jpg",              dims: "1600x1600px" },
  socialConcepts:    { file: "social-concepts.jpg",     dims: "1200x1200px" },
  storePhoto:        { file: "store-photo.jpg",         dims: "1600x1000px" },
  websiteConcepts:   { file: "website-concepts.jpg",    dims: "1600x1000px" },
  moodboard:         { file: "moodboard.jpg",           dims: "1600x1000px" },
  emailConcept:      { file: "email-concept.jpg",       dims: "1200x1500px" },
};
