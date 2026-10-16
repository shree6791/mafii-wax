const base = "/__mockup/images/";

export type Photo = { id: string; src: string; alt: string; author: string; url: string };

export const photos = {
  campaign: {
    id: "3973709",
    src: `${base}mafii/portrait-3973709.webp`,
    alt: "Black and white stock portrait of a woman looking over her bare shoulder",
    author: "Dellon Thomas",
    url: "https://www.pexels.com/photo/3973709/",
  },
  detail: {
    id: "3373716",
    src: `${base}mafii/beauty-3373716.webp`,
    alt: "Black and white stock close-up of an eye and brow",
    author: "Shiny Diamond",
    url: "https://www.pexels.com/photo/3373716/",
  },
  portrait: {
    id: "5863100",
    src: `${base}mafii/portrait-5863100.webp`,
    alt: "Black and white stock portrait of a bearded man smiling",
    author: "Sandy Rojas",
    url: "https://www.pexels.com/photo/5863100/",
  },
  muse: {
    id: "3762759",
    src: `${base}mafii/portrait-3762759.webp`,
    alt: "Black and white stock portrait of a woman with her hair pulled back, glancing upward with a soft smile",
    author: "Shiny Diamond",
    url: "https://www.pexels.com/photo/3762759/",
  },
} satisfies Record<string, Photo>;

export const STOCK_NOTE = "Stock photography from Pexels. Models are not MAFII staff, clients or results.";
