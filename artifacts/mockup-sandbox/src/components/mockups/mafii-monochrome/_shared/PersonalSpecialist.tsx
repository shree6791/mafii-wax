import { ArrowUpRight } from "lucide-react";
import { SiteShell, Book, page, image } from "./SiteShell";
import "./PersonalSpecialist.css";
import { ClientCarousel } from "./ClientCarousel";

export function PersonalSpecialist() {
  return <SiteShell><div className="ps">
    <section className="ps-hero ps-wrap">
      <div className="ps-hero-top">
        <h1>Waxing,<br /><em>refined.</em></h1>
        <div className="ps-hero-intro"><p>Smooth skin. Expert attention. Brazilian and full-body waxing in a private, owner-operated studio.</p><Book /></div>
      </div>
      <div className="ps-hero-images">
        <figure className="ps-photo ps-shoulder"><img src={image("portrait-3973709.webp")} alt="Black and white stock portrait of a woman looking over her shoulder" fetchPriority="high" /></figure>
        <figure className="ps-photo ps-beach"><img src={image("mafii-barefoot-10956742.jpg")} alt="Stock photograph of bare feet at the shoreline beneath a flowing dress" /></figure>
      </div>
      <div className="ps-hero-foot"><span>Women-owned. Independent. All genders welcome.</span></div>
    </section>
    <section className="ps-dark ps-specialist"><div className="ps-wrap">
      <p className="ps-label">The studio</p>
      <div className="home-studio">
        <figure><img src={image("studio-interior.jpg")} alt="Inside MAFII’s studio, with illuminated shelves and a black-framed mirror" width="577" height="1024" loading="lazy" /><figcaption>MAFII · Studio 21, Mountain View</figcaption></figure>
        <div><h2>Independent studio.<br /><em>Experienced care.</em></h2><p>With over seven years of waxing experience, MAFII’s owner brings practiced technique and personal attention to every appointment.</p><a className="mf-link" href={page("About")}>About MAFII <ArrowUpRight /></a></div>
      </div>
    </div></section>
    <div className="ps-stripes ps-divider" aria-hidden="true" />
    <section className="ps-wrap ps-services">
      <div className="ps-section-top"><h2>Waxing <em>services.</em></h2></div>
      <div className="home-service-layout">
        <figure className="ps-photo"><img src={image("beauty-3373716.webp")} alt="Stock close-up of an eye and brow" loading="lazy" /></figure>
        <div>{[
          ["01", "Brazilian & Bikini", "Choose the coverage that suits you.", "Brazilian"],
          ["02", "Body Waxing", "Legs, arms, underarms and more.", "Services?category=Body"],
          ["03", "Face & Brows", "Brow shaping and facial waxing.", "Services?category=Face"],
        ].map(([number, title, text, destination]) => <a className="home-service-row" href={page(destination)} key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight /></a>)}</div>
      </div>
    </section>
    <ClientCarousel />
  </div></SiteShell>;
}
export default PersonalSpecialist;
