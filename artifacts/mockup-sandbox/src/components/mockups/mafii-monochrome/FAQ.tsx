import { FirstVisit } from "./_refined/FirstVisit";
import { RefinedFrame } from "./_refined/RefinedFrame";
import "./CompactPages.css";

export function FAQ() {
  return <div className="mafii-faq-compact"><RefinedFrame inner><FirstVisit /></RefinedFrame></div>;
}
