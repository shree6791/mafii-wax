import { Services as ServicesPage } from "./_refined/Services";
import { RefinedFrame } from "./_refined/RefinedFrame";
import "./Services.css";

export function Services() {
  return <div className="mafii-services-compact"><RefinedFrame inner><ServicesPage /></RefinedFrame></div>;
}
