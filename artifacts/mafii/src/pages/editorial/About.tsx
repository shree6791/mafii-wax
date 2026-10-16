import { SiteShell, image } from "./SiteShell";

export function About() {
  return <SiteShell active="About">
    <section className="mf-wrap mf-compact-head">
      <h1>About MAFII</h1>
      <p>Where precision meets comfort, and every detail is considered. Women-owned and welcoming to all.</p>
    </section>
    <div className="mf-stripes" aria-hidden="true" />
    <section className="mf-wrap mf-section mf-split mf-about-layout">
      <figure className="mf-about-photo">
        <img src={image("studio-interior.jpg")} alt="Inside MAFII’s Studio 21, with illuminated shelving and a black-framed mirror" width="577" height="1024" />
        <figcaption>MAFII Wax Studio · Inside Sola Salon Studios</figcaption>
      </figure>
      <div className="mf-about-copy">
        <h2>Meet your specialist.</h2>
        <p>With over seven years of waxing experience, including years at a leading national wax studio, MAFII’s owner brings expert care to Brazilian and full-body waxing in her own private studio.</p>
        <p>Here, you talk directly with the person doing your wax. Share how much you’d like removed, ask anything and mention any skin concerns. First appointment or regular routine, you’ll feel comfortable and looked after from start to finish.</p>
      </div>
    </section>
  </SiteShell>;
}
export default About;
