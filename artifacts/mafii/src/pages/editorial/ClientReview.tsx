const reviews = {
  welcome: {
    author: "Neena Umpad",
    excerpt: "From the very first day I walked through her door, she made me feel comfortable and cared for.",
  },
  care: {
    author: "Roots",
    excerpt: "she made the entire experience feel comfortable and professional from start to finish.",
  },
};

// Verified verbatim excerpts; source and verification notes in REVIEW-SOURCES.md.
export const reviewSource = "https://www.google.com/maps/search/MAFII+Wax+Studio+Mountain+View/";

export function ClientReview({ review }: { review: keyof typeof reviews }) {
  const { author, excerpt } = reviews[review];
  return <blockquote className="mf-client-review">
    <p>“{excerpt}”</p>
    <cite>{author} · Google review excerpt</cite>
  </blockquote>;
}
