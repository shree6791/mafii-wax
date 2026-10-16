// Verbatim Google review excerpts. Add a review by adding an entry here;
// the carousel sizes itself. Source and verification notes: REVIEW-SOURCES.md.
export const reviews: { author: string; excerpt: string }[] = [
  { author: "Neena Umpad", excerpt: "From the very first day I walked through her door, she made me feel comfortable and cared for." },
  { author: "Roots", excerpt: "…she made the entire experience feel comfortable and professional from start to finish." },
];

export const reviewSource = "https://www.google.com/maps/search/MAFII+Wax+Studio+Mountain+View/";

export function ClientReview({ author, excerpt }: { author: string; excerpt: string }) {
  return <blockquote className="mf-client-review">
    <p>“{excerpt}”</p>
    <cite>{author} · Google review excerpt</cite>
  </blockquote>;
}
