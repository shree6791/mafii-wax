import { About as AboutPage } from "./_refined/About";
import { RefinedFrame } from "./_refined/RefinedFrame";
import "./About.css";
import "./CompactPages.css";

export function About() {
  return <div className="mafii-about-compact"><RefinedFrame inner><AboutPage /></RefinedFrame></div>;
}
