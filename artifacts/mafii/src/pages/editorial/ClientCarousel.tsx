import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ClientReview, reviewSource } from "./ClientReview";
import "./ClientCarousel.css";

export function ClientCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const goTo = (index: number) => {
    const element = track.current;
    if (!element) return;
    const next = Math.max(0, Math.min(2, index));
    // Keep control/track focus in place; never move focus to an offscreen card.
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && element.contains(focused) && focused !== element) {
      element.focus({ preventScroll: true });
    }
    element.scrollTo({
      left: next * element.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const destination = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: 2 }[event.key];
    if (destination === undefined) return;
    event.preventDefault();
    goTo(destination);
  };
  return <section className="ps-client-carousel" aria-labelledby="client-words" aria-roledescription="carousel" data-testid="section-client-words">
    <div className="ps-wrap ps-client-layout">
      <div className="ps-client-intro">
        <h2 id="client-words">In our clients’ <em>words.</em></h2>
        <div className="ps-client-controls">
          <button type="button" aria-label="Previous testimonial card" aria-controls="client-review-track" aria-disabled={active === 0} onClick={() => goTo(active - 1)} data-testid="button-review-previous"><ArrowLeft aria-hidden="true" /></button>
          <button type="button" aria-label="Next testimonial card" aria-controls="client-review-track" aria-disabled={active === 2} onClick={() => goTo(active + 1)} data-testid="button-review-next"><ArrowRight aria-hidden="true" /></button>
          <span className="ps-client-count" role="status" aria-live="polite" aria-atomic="true" aria-label={`Card ${active + 1} of 3`}>0{active + 1} / 03</span>
        </div>
      </div>
      <div className="ps-client-window">
        <div id="client-review-track" className="ps-client-track" ref={track} tabIndex={0} aria-label="Client review cards. Use left and right arrow keys to browse." onKeyDown={onKeyDown} onScroll={() => {
          const element = track.current;
          if (element) {
            const next = Math.max(0, Math.min(2, Math.round(element.scrollLeft / element.clientWidth)));
            if (next !== 2 && document.activeElement?.tagName === "A" && element.contains(document.activeElement)) {
              element.focus({ preventScroll: true });
            }
            setActive(next);
          }
        }} data-testid="carousel-reviews">
          {(["welcome", "care"] as const).map((review, index) => <div className="ps-client-card" key={review} role="group" aria-roledescription="slide" aria-label={`${index + 1} of 3`} aria-hidden={active !== index} data-testid={`review-${review}`}>
            <ClientReview review={review} />
          </div>)}
          <div className="ps-client-card ps-client-last" role="group" aria-roledescription="slide" aria-label="3 of 3, Google reviews" aria-hidden={active !== 2}>
            <p>91 reviews, all five stars.</p>
            <a className="mf-link" href={reviewSource} tabIndex={active === 2 ? 0 : -1} target="_blank" rel="noopener noreferrer" aria-label="Read reviews on Google (opens in a new tab)" data-testid="link-google-reviews">Read them on Google <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
