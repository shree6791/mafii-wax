import { ArrowUpRight } from "lucide-react";
import { SiteShell, Book, page, image } from "./SiteShell";
import "./PersonalSpecialist.css";
import { ClientCarousel } from "./ClientCarousel";

export function PersonalSpecialist() {
  return <SiteShell><div className="ps">
    <section className="ps-hero ps-wrap">
      <div className="refined-hero-layout">
        <div className="refined-hero-copy">
        <h1>Waxing,<br />refined.</h1>
        <div className="ps-hero-intro"><p>Leave smooth, confident and cared for. Brazilian and full-body waxing by one expert, in a private studio in Mountain View.</p><Book placement="home_hero" /></div>
        </div>
        <figure className="refined-hero-photo"><img src={image("studio-interior.jpg")} alt="Inside MAFII’s private studio: lit shelves, an arched black mirror and orchids" fetchPriority="high" /></figure>
      </div>
      <div className="ps-hero-foot"><span>Rated 5.0 on Google · Women-owned · All genders welcome</span></div>
    </section>
    <section className="ps-dark ps-specialist"><div className="ps-wrap">
      <div className="home-studio">
        <div className="refined-studio-photos">
        <figure><img src={image("studio-entrance.jpg")} alt="MAFII Wax Studio’s branded door: Always inclusive and intentional" width="800" height="1067" loading="lazy" /><figcaption>MAFII · Studio 21, Mountain View</figcaption></figure>
        <figure className="refined-detail"><img src={image("studio-detail.jpg")} alt="Orchid and mirrored details inside MAFII’s studio" width="577" height="1024" loading="lazy" /></figure>
        </div>
        <div><p className="ps-label">Your specialist</p><h2>The same expert hands, every visit.</h2><p>No front desk and no rotating staff. With over seven years of experience, MAFII’s owner performs every service herself, so you’re in practiced hands from your first appointment onward.</p><a className="mf-link" href={page("About")}>About MAFII <ArrowUpRight /></a></div>
      </div>
    </div></section>
    <section className="ps-wrap ps-services">
      <div className="ps-section-top"><h2>Smooth, head to toe.</h2></div>
      <div className="home-service-layout">
        <figure className="ps-photo"><img src={image("beauty-3373716.webp")} alt="Stock close-up of an eye and brow" loading="lazy" /></figure>
        <div>{[
          ["01", "Brazilian & Bikini", "From a tidy bikini line to fully bare. Your call.", "Brazilian"],
          ["02", "Body Waxing", "Legs, arms, back and more, smooth for weeks.", "Services?category=Body"],
          ["03", "Face & Brows", "Shaped brows and a smooth, polished face.", "Services?category=Face"],
        ].map(([number, title, text, destination]) => <a className="home-service-row" href={page(destination)} key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight /></a>)}</div>
      </div>
    </section>
    <ClientCarousel />
  </div></SiteShell>;
}
export default PersonalSpecialist;
