// Verbatim Google review excerpts. Add a review by adding an entry here;
// the carousel sizes itself. Source and verification notes: REVIEW-SOURCES.md.
export const reviews: { author: string; excerpt: string }[] = [
  { author: "Traci Groening-Wang", excerpt: "I’ve been waxing for many years and Armeis is thorough and considerate, with excellent products and an immaculately hygienic and welcoming work space." },
  { author: "Kyle", excerpt: "After trying multiple wax studios, hers is the best [I’ve] found in this area." },
  { author: "Sammy 913", excerpt: "I'm relatively new to getting waxed and Armeis made it so easy and comfortable." },
  { author: "Sofia Ferreira", excerpt: "She takes the time to listen to what you want and makes sure you're comfortable the entire time." },
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
