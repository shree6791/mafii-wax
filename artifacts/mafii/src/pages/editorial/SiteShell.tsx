import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import "./SiteShell.css";
import { usePageMeta } from "../../lib/site";
import { pageMetadata } from "../../lib/page-metadata";
import { booking, page, nav, isCanvasPreview } from "../../lib/site-links";
export { booking, page, image, directions, nav } from "../../lib/site-links";

const bookingLabel = "Book Appointment";
export function Book() {
  return <a className="mf-book" href={booking} target="_blank" rel="noopener noreferrer">
    {bookingLabel}
  </a>;
}

function NavigationLinks({ active }: { active?: string }) {
  return <>{nav.map(([label, to]) =>
    <a key={to} href={page(to)} aria-current={active === to ? "page" : undefined}>{label}</a>
  )}</>;
}

export function SiteShell({ children, active: selected = "" }: { children: ReactNode; active?: string }) {
  const active = selected;
  const meta = pageMetadata[selected] ?? pageMetadata.Home;
  usePageMeta(meta.title, meta.description);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    if (!isCanvasPreview) return;
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const previous = icon?.getAttribute("href");
    icon?.setAttribute("href", `${import.meta.env.BASE_URL.replace(/\/$/, "")}/mafii-favicon.svg?v=mafii-2`);
    return () => { if (icon && previous) icon.setAttribute("href", previous); };
  }, []);

  const scope = selected === "Services" ? "mafii-services-compact" : selected === "FirstVisit" ? "mafii-faq-compact" : selected === "About" ? "mafii-about-compact" : selected === "Visit" ? "mafii-contact-compact" : "";
  return <div className={scope}><div className={`mafii-refined hero-balanced${selected ? " refined-inner" : ""}`}><div className="mf">
    <a href="#mf-main" className="mf-skip">Skip to content</a>
    <header className="mf-header">
      <div className="mf-wrap mf-nav">
        <a className="mf-brand" href={page("PersonalSpecialist")} aria-label="MAFII home">MAFII<small>WAX STUDIO</small></a>
        <nav className="mf-navlinks" aria-label="Main navigation"><NavigationLinks active={active} /><Book /></nav>
        <div className="mf-mobile-book"><Book /></div>
        <button ref={menuButton} className="mf-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mf-mobile" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav hidden={!open} className="mf-mobile" id="mf-mobile" aria-label="Mobile navigation">
        <NavigationLinks active={active} />
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
          <nav aria-label="Footer navigation">
            <NavigationLinks /><a href={booking} target="_blank" rel="noopener noreferrer">{bookingLabel}</a>
          </nav>
          <div className="mf-contact">
            <a href="tel:+16509306516">650.930.6516</a>
            <a href="mailto:contact@mafiiwaxstudio.com">contact@mafiiwaxstudio.com</a>
            <span>Tue–Fri 9–6 · Sat 8–4</span>
          </div>
        </div>
      </div>
    </footer>
  </div></div></div>;
}

export function PageHead({ label, title, text, book = false }: { label: string; title: ReactNode; text: string; book?: boolean }) {
  return <section className="mf-wrap mf-head">
    <p className="mf-label">{label} / MAFII Wax Studio</p>
    <div className="mf-head-grid"><h1>{title}</h1><div><p>{text}</p>{book && <Book />}</div></div>
  </section>;
}

export function BookingBand() {
  return <section className="mf-dark mf-section">
    <div className="mf-wrap mf-band">
      <div><p className="mf-label">Your next appointment</p><h2 style={{ marginTop: 15 }}>Make time for <em>yourself.</em></h2><p>Choose your service and an available time on GlossGenius.</p></div>
      <Book />
    </div>
  </section>;
}
