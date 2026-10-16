import { Visit } from "./_refined/Visit";
import { RefinedFrame } from "./_refined/RefinedFrame";
import "./CompactPages.css";
import "./Contact.css";

export function Contact() {
  return <div className="mafii-contact-compact"><RefinedFrame inner><Visit /></RefinedFrame></div>;
}
