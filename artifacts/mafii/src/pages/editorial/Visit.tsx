import { SiteShell } from "./SiteShell";
import { directions } from "../../lib/site-links";

export function Visit() {
  return <SiteShell active="Visit">
    <section className="mf-wrap mf-compact-head mf-information-head"><h1>Contact</h1></section>
    <section className="mf-wrap mf-section mf-contact-layout">
      <div className="mf-contact-info">
        <div className="mf-contact-block">
        <dl className="mf-contact-methods">
          <div><dt>Phone</dt><dd><a href="tel:+16509306516">650.930.6516</a></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:contact@mafiiwaxstudio.com">contact@mafiiwaxstudio.com</a></dd></div>
        </dl>
        </div>
        <div className="mf-contact-block">
        <h2>Studio Hours <small>Pacific time</small></h2>
        {[["Tuesday–Friday", "9 AM – 6 PM"], ["Saturday", "8 AM – 4 PM"], ["Sunday–Monday", "Closed"]].map(([day, time]) => <div className="mf-hours" key={day}><span>{day}</span><span>{time}</span></div>)}
        </div>
      </div>
      <div className="mf-contact-map">
        <address><strong>MAFII Wax Studio</strong>550 Showers Drive D006, Studio 21<br />Mountain View, CA 94040<br />Inside Sola Salon Studios<br /><a className="mf-link" href={directions} target="_blank" rel="noopener noreferrer">Get directions</a></address>
        <iframe
          title="Google Map: MAFII Wax Studio, 550 Showers Drive, Mountain View"
          src="https://maps.google.com/maps?q=550+Showers+Drive+Mountain+View+CA+94040&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  </SiteShell>;
}
export default Visit;
