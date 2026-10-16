import { intimateServices } from "../lib/intimate-services";
import { page } from "./site-links";

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
    <p>New to Brazilian or full bikini waxing at MAFII? Select the corresponding first-visit appointment for extra time. Discuss your preferred coverage and any skin concerns with your specialist.</p>
    <p>MAFII Man options have their own coverage descriptions in the menu below. All genders are welcome.</p>
    <a className="mf-link" href={page("FirstVisit")}>Preparation & aftercare FAQs ↗</a>
  </details>;
}
