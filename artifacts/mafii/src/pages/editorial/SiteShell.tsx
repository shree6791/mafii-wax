import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { FaGoogle, FaYelp } from "react-icons/fa";
import "./SiteShell.css";
import { usePageMeta } from "../../lib/site";
import { pageMetadata } from "../../lib/page-metadata";
import { booking, page, nav, giftCards } from "../../lib/site-links";
import { bookingUrl, trackBookClick, trackGiftCardClick } from "../../lib/analytics";
import { currentSeason } from "../../lib/seasons";

export function GiftCardLink({ placement, children = "Gift cards" }: { placement: string; children?: ReactNode }) {
  return <a href={bookingUrl(giftCards, placement)} target="_blank" rel="noopener noreferrer" onClick={() => trackGiftCardClick(placement)}>{children}</a>;
}
export { booking, page, image } from "../../lib/site-links";

const bookingLabel = "Book Appointment";
export function Book({ placement, label = bookingLabel }: { placement: string; label?: string }) {
  return <a className="mf-book" href={bookingUrl(booking, placement)} target="_blank" rel="noopener noreferrer" onClick={() => trackBookClick(placement)}>
    {label}
  </a>;
}

function NavigationLinks({ active }: { active?: string }) {
  return <>{nav.map(([label, to]) =>
    <a key={to} href={page(to)} aria-current={active === to ? "page" : undefined}>{label}</a>
  )}</>;
}

export function SiteShell({ children, active = "" }: { children: ReactNode; active?: string }) {
  const meta = pageMetadata[active] ?? pageMetadata.Home;
  usePageMeta(meta.title, meta.description);
  const [open, setOpen] = useState(false);
  const [season] = useState(currentSeason);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const scope = active === "Services" ? "mafii-services-compact" : active === "FirstVisit" ? "mafii-faq-compact" : active === "About" ? "mafii-about-compact" : active === "Visit" ? "mafii-contact-compact" : "";
  return <div className={scope}><div className={`mafii-refined hero-balanced${active ? " refined-inner" : ""}`}><div className="mf">
    <a href="#mf-main" className="mf-skip">Skip to content</a>
    {season && <p className="mf-season" data-season={season.id}>{season.message} {season.action === "gift"
      ? <GiftCardLink placement={`season_${season.id}`}>Shop gift cards</GiftCardLink>
      : <a href={bookingUrl(booking, `season_${season.id}`)} target="_blank" rel="noopener noreferrer" onClick={() => trackBookClick(`season_${season.id}`)}>Book now</a>}</p>}
    <header className="mf-header">
      <div className="mf-wrap mf-nav">
        <a className="mf-brand" href={page("PersonalSpecialist")} aria-label="MAFII home">MAFII<small>WAX STUDIO</small></a>
        <nav className="mf-navlinks" aria-label="Main navigation"><NavigationLinks active={active} /><Book placement="header" /></nav>
        <div className="mf-mobile-book"><Book placement="header_mobile" label="Book" /></div>
        <button ref={menuButton} className="mf-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mf-mobile" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav hidden={!open} className="mf-mobile" id="mf-mobile" aria-label="Mobile navigation">
        <NavigationLinks active={active} />
        <GiftCardLink placement="mobile_menu" />
      </nav>
    </header>
    <main id="mf-main" tabIndex={-1}>{children}</main>
    <footer className="mf-footer mf-dark">
      <div className="mf-wrap">
        <div className="mf-footer-grid">
          <div className="mf-footer-brand">
            <a className="mf-brand" href={page("PersonalSpecialist")} aria-label="MAFII home">MAFII</a>
            <p>Always inclusive and intentional.</p>
          </div>
          <nav className="mf-footer-nav" aria-label="Footer navigation">
            <NavigationLinks /><a href={bookingUrl(booking, "footer")} target="_blank" rel="noopener noreferrer" onClick={() => trackBookClick("footer")}>{bookingLabel}</a><GiftCardLink placement="footer" />
          </nav>
          <div className="mf-contact">
            <a href="tel:+16509306516">650.930.6516</a>
            <a href="mailto:contact@mafiiwaxstudio.com">contact@mafiiwaxstudio.com</a>
            <span>Tue–Fri 9–6 · Sat 8–4</span>
            <span className="mf-social">
              <a href="https://www.google.com/maps/search/MAFII+Wax+Studio+Mountain+View/" target="_blank" rel="noopener noreferrer" aria-label="MAFII reviews on Google (opens in a new tab)" title="Google reviews"><FaGoogle aria-hidden="true" /></a>
              <a href="https://yelp.to/Vn-Wj6MKaj" target="_blank" rel="noopener noreferrer" aria-label="MAFII on Yelp (opens in a new tab)" title="Yelp"><FaYelp aria-hidden="true" /></a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div></div></div>;
}
