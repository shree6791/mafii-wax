import { SiteShell, image } from "./SiteShell";

export function About() {
  return <SiteShell active="About">
    <section className="mf-wrap mf-compact-head">
      <h1>About MAFII</h1>
      <p>Independent, women-owned and welcoming all genders. Personal waxing care in Mountain View.</p>
    </section>
    <div className="mf-stripes" aria-hidden="true" />
    <section className="mf-wrap mf-section mf-split mf-about-layout">
      <figure className="mf-about-photo">
        <img src={image("studio-interior.jpg")} alt="Inside MAFII’s Studio 21, with illuminated shelving and a black-framed mirror" width="577" height="1024" />
        <figcaption>MAFII Wax Studio · Inside Sola Salon Studios</figcaption>
      </figure>
      <div className="mf-about-copy">
        <h2>Your specialist.<br />Every visit.</h2>
        <p>With over seven years of waxing experience, including time at European Wax Center, MAFII’s owner brings expert care to Brazilian and full-body waxing in her own black-and-white studio.</p>
        <p>Here, you speak directly with the person doing your service. Bring your questions, share your coverage preferences and talk about any skin concerns—whether this is your first appointment or part of your regular routine.</p>
      </div>
    </section>
  </SiteShell>;
}
export default About;
