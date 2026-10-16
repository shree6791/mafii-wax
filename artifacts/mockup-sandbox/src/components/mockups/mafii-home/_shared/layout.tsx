import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "./router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { directionsUrl } from "./studio";
import { photos, STOCK_NOTE } from "./photos";

export const TAGLINE = "Always inclusive and intentional";
export const CTA = "Request appointment";

export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`font-display leading-none ${className}`}>MAFII</span>;
}

const links = [
  { href: "/services", label: "Services" },
  { href: "/brazilian", label: "Brazilian" },
  { href: "/studio", label: "Studio" },
  { href: "/first-visit", label: "First visit" },
];

function NavLink({ href, label, onClick, big, index }: { href: string; label: string; onClick?: () => void; big?: boolean; index?: number }) {
  const [loc] = useLocation();
  const active = loc === href;
  if (big)
    return (
      <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined} data-testid={`link-nav-${label.replace(/\s/g, "-").toLowerCase()}`}
        className="flex items-baseline justify-between border-b border-white/15 py-4">
        <span className={`t-h2 ${active ? "" : "text-white/60"}`}>{label}</span>
        <span className="label text-white/40">0{(index ?? 0) + 1}</span>
      </Link>
    );
  return (
    <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined} data-testid={`link-nav-${label.replace(/\s/g, "-").toLowerCase()}`}
      className={`relative text-sm tracking-tight py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-current after:transition-all motion-reduce:after:transition-none ${active ? "after:w-full" : "text-black/60 hover:text-black after:w-0 hover:after:w-full"}`}>
      {label}
    </Link>
  );
}

export function Layout({ children }: { children: ReactNode; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loc] = useLocation();
  useEffect(() => {
    setOpen(false);
    const target = window.location.hash.slice(1);
    if (target) document.getElementById(target)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [loc]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-black">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[90] bg-black text-white px-3 py-2">Skip to content</a>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 h-16 flex items-center justify-between gap-6">
          <Link href="/" data-testid="link-home" aria-label="MAFII Wax Studio home" className="flex items-center gap-3">
            <span className="stripe-mark" aria-hidden />
            <Wordmark className="text-[24px]" />
          </Link>
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {links.map((l) => <NavLink key={l.href} {...l} />)}
            <Link href="/book" data-testid="link-book" aria-current={loc === "/book" ? "page" : undefined}
              className="ml-2 text-sm font-medium px-5 py-2.5 bg-black text-white hover:bg-white hover:text-black border border-black transition-colors">{CTA}</Link>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <Link href="/book" className="text-[13px] font-medium px-3 py-2 bg-black text-white" data-testid="link-header-book-mobile">Request</Link>
            <button className="p-2 -mr-2" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mnav" aria-label="Open menu" data-testid="button-menu"><Menu /></button>
          </div>
        </div>
      </header>
      {open && (
        <div id="mnav" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[80] bg-black text-white flex flex-col px-5 md:hidden overflow-y-auto">
          <div className="h-16 flex items-center justify-between shrink-0">
            <Wordmark className="text-[24px]" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2" data-testid="button-menu-close" autoFocus><X /></button>
          </div>
          <nav className="flex flex-col mt-6" aria-label="Mobile">
            {links.map((l, i) => <NavLink key={l.href} {...l} big index={i} onClick={() => setOpen(false)} />)}
          </nav>
          <Link href="/book" onClick={() => setOpen(false)} data-testid="link-mobile-book" className="mt-8 bg-white text-black py-4 text-center font-medium">{CTA}</Link>
          <div className="stripe-cue mt-auto text-white/70" aria-hidden />
          <p className="py-6 label text-white/50">{TAGLINE}</p>
        </div>
      )}
      <main id="main" className="flex-1">{children}</main>
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 py-12 lg:py-14 grid gap-y-10 gap-x-12 md:grid-cols-2 lg:grid-cols-[1fr_0.8fr_1.2fr] items-start">
          <div className="md:col-span-2 lg:col-span-1">
            <Wordmark className="text-4xl" />
            <p className="mt-4 text-sm leading-7 text-white/65">Women-owned. Independently run.<br />Mountain View, California.</p>
          </div>
          <nav className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3 text-sm" aria-label="Footer">
            {[...links, { href: "/book", label: CTA }, { href: "/cancellation-policy", label: "Cancellation policy" }].map((l) => (
              <Link key={l.href} href={l.href} aria-current={loc === l.href ? "page" : undefined} className={`hover:underline underline-offset-4 ${loc === l.href ? "underline" : "text-white/75"}`} data-testid={`link-footer-${l.label.replace(/\s/g, "-").toLowerCase()}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="text-sm leading-7 text-white/75">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-start gap-1">
              <address className="not-italic">550 Showers Drive D006 · Studio 21<br />Inside Sola Salon Studios<br />Mountain View, CA 94040</address>
              <ArrowUpRight className="w-3.5 h-3.5 mt-1 shrink-0" aria-hidden />
            </a>
            <p className="mt-4">Tue–Fri 9 AM–6 PM · Sat 8 AM–4 PM<br />Sunday &amp; Monday closed · Pacific time</p>
            <div className="mt-4 flex flex-col items-start gap-1">
              <a href="tel:+16509306516" className="hover:underline">650.930.6516</a>
              <a href="mailto:contact@mafiiwaxstudio.com" className="hover:underline break-all">contact@mafiiwaxstudio.com</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 pb-6">
          <p data-testid="text-photo-credits" className="pt-5 border-t border-white/15 text-xs leading-6 text-white/55">
            {STOCK_NOTE} Photos:{" "}
            {Object.values(photos).map((p, i, a) => (
              <span key={p.id}><a href={p.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">{p.author} ({p.id})</a>{i < a.length - 1 ? ", " : "."}</span>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{children}</p>;
}

/** Small inline marker for stock imagery; used only where context could be ambiguous. */
export function StockTag({ light }: { light?: boolean }) {
  return <span className={`absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.18em] px-2 py-1 ${light ? "bg-white/90 text-black" : "bg-black/70 text-white"}`}>Stock photo</span>;
}

export function PrimaryCTA({ href = "/book", children = CTA, testId, light }: { href?: string; children?: ReactNode; testId: string; light?: boolean }) {
  return (
    <Link href={href} data-testid={testId} className={`group inline-flex items-center justify-between gap-6 pl-6 pr-5 py-3.5 text-[15px] font-medium border transition-colors ${light ? "bg-white text-black border-white hover:bg-black hover:text-white" : "bg-black text-white border-black hover:bg-white hover:text-black"}`}>
      {children} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45 motion-reduce:transition-none" />
    </Link>
  );
}

/** Photograph with a slim vertical stripe cue beside it, echoing the studio wall. Never overlaps the image. */
export function StripeFrame({ src, alt, className = "", side = "left", priority, position = "center" }: { src: string; alt: string; className?: string; side?: "left" | "right"; priority?: boolean; position?: string }) {
  return (
    <figure className={`grid ${side === "left" ? "grid-cols-[auto_1fr]" : "grid-cols-[1fr_auto]"} gap-3 md:gap-4 items-end w-full max-w-[34rem] mx-auto lg:max-w-none ${className}`}>
      <div className={`stripe-cue h-1/2 wipe-in ${side === "left" ? "order-1" : "order-2"}`} aria-hidden />
      <div className={`bg-black overflow-hidden aspect-[4/5] ${side === "left" ? "order-2" : "order-1"}`}>
        <img src={src} alt={alt} fetchPriority={priority ? "high" : undefined} loading={priority ? undefined : "lazy"} className="w-full h-full object-cover" style={{ objectPosition: position }} />
      </div>
    </figure>
  );
}

export function PageHead({ index, label, title, children, aside }: { index: string; label: string; title: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="border-b border-black">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 pt-14 md:pt-20 pb-12 md:pb-16 grid lg:grid-cols-12 gap-10 items-end fadeup">
        <div className="lg:col-span-7">
          <p className="label text-black/55"><span className="text-black">{index}</span> / {label}</p>
          <h1 className="t-h1 mt-5">{title}</h1>
          {children && <div className="mt-6 t-lead text-black/70 max-w-xl">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4 lg:col-start-9">{aside}</div>}
      </div>
    </section>
  );
}
