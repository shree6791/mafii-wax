import { intimateServices } from "../../lib/intimate-services";
import { page } from "../../lib/site-links";

const comparisons = intimateServices.filter(service =>
  ["Bikini line", "Full bikini", "Brazilian"].includes(service[1]),
);

/** Supporting guidance within Services, never a standalone page. */
export function IntimateGuide() {
  return <details id="bikini-guide" className="mf-intimate-guide">
    <summary>Brazilian or bikini? Compare coverage</summary>
    <div className="mf-guide-options">
      {comparisons.map(([, name, , , description]) =>
        <div key={name}><h3>{name}</h3><p>{description}</p></div>
      )}
    </div>
    <p>First Brazilian or full bikini at MAFII? Book the first-visit option. It builds in extra time, and you’ll agree on coverage together before you start.</p>
    <p>MAFII Man services are listed separately in the menu, with their own coverage. Everyone is welcome here.</p>
    <a className="mf-link" href={page("FirstVisit")}>Preparation & aftercare FAQs ↗</a>
  </details>;
}
