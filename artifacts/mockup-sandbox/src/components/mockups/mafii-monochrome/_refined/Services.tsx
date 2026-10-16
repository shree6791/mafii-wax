import { useEffect, useState } from "react";
import { SiteShell } from "./SiteShell";
import { intimateServices } from "../lib/intimate-services";
import { IntimateGuide } from "./IntimateGuide";
import "./Services.css";

const menu:[string,string,number,string,string][]=[
...intimateServices,
["Body","Underarms",25,"10 min","Underarms; upper arms excluded."],["Body","Full arms",60,"30 min","Arms, hands and fingers; shoulders excluded."],["Body","Half arms",50,"20 min","Upper or lower arms. See booking menu for coverage."],["Body","Full legs",90,"30 min","Upper and lower legs, knees, feet and toes."],["Body","Lower legs",60,"20 min","Lower legs, knees, feet and toes."],["Body","Upper legs",65,"20 min","Upper legs, knees and inner thighs."],["Body","Full back",85,"30 min","Full length of back; shoulders excluded."],["Body","Lower back",35,"20 min","Mid-back to the top of the glutes."],["Body","Chest",45,"20 min","Collar bone, nipples and pectoral area."],["Body","Stomach",45,"20 min","Full stomach, including stomach strip."],["Body","Shoulders",35,"20 min","Tops of arms to base of neck."],["Body","Glutes",40,"20 min","Glutes and between the cheeks."],["Body","Glute strip",30,"10 min","Between the cheeks."],
["Face","Brows",30,"25 min","Consultation, shaping, waxing, tweezing and trimming."],["Face","Full face",75,"35 min","Brows, cheeks, chin, ears, hairline, nose, sideburns and lips."],["Face","Cheeks",25,"20 min","Cheeks; sideburns excluded."],["Face","Chin",25,"20 min","Chin and lower lip."],["Face","Upper lip",25,"20 min","Upper lip only."],["Face","Lower lip",25,"20 min","Lower lip only."],["Face","Nose",25,"20 min","Inside and outside of the nose."],["Face","Ears",25,"20 min","Inside and outside of the ears."],["Face","Hairline",25,"20 min","Hairline along the forehead."],["Face","Sideburns",25,"20 min","Sideburns; cheeks and neck excluded."],
["Signature","Signature full body",445,"180 min","Brazilian, underarms, full legs, full arms, chest, stomach, full back, glutes and one facial detail. $111.25 deposit."],["Signature","Signature full body · MAFII Man",490,"180 min","Brazilian, chest, stomach, full back, glutes, underarms, full arms, full legs and nose. $122.50 deposit."]
];
const groups = [
  {id:"Intimate", title:"Brazilian & Bikini", description:"Bikini line, full bikini and Brazilian waxing."},
  {id:"Body", title:"Body Waxing", description:"Legs, arms, underarms and individual body areas."},
  {id:"Face", title:"Face & Brows", description:"Brow shaping and facial waxing."},
  {id:"Signature", title:"Full-Body Packages", description:"Multiple areas in one extended appointment."},
];
export function Services(){
const [category,setCategory]=useState(() => {
  const requested = new URLSearchParams(window.location.search).get("category") || (new URLSearchParams(window.location.search).has("q") ? "All" : "Intimate");
  if (window.location.hash === "#bikini-guide") return "Intimate";
  return ["All", "Intimate", "Body", "Face", "Signature"].includes(requested) ? requested : "All";
});
const [search,setSearch]=useState(() => new URLSearchParams(window.location.search).get("q") || "");
useEffect(() => {
  const url = new URL(window.location.href);
  url.searchParams.set("category", category);
  if (search.trim()) url.searchParams.set("q", search);
  else url.searchParams.delete("q");
  window.history.replaceState(window.history.state, "", url);
}, [category, search]);
useEffect(() => {
  const syncLocation = () => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("category") || (params.has("q") ? "All" : "Intimate");
    setCategory(window.location.hash === "#bikini-guide" ? "Intimate" : ["All","Intimate","Body","Face","Signature"].includes(requested) ? requested : "All");
    setSearch(params.get("q") || "");
  };
  window.addEventListener("popstate", syncLocation);
  window.addEventListener("hashchange", syncLocation);
  return () => {
    window.removeEventListener("popstate", syncLocation);
    window.removeEventListener("hashchange", syncLocation);
  };
}, []);
useEffect(() => {
  if (window.location.hash !== "#bikini-guide" || category !== "Intimate") return;
  const guide = document.getElementById("bikini-guide") as HTMLDetailsElement | null;
  if (guide) {
    guide.open = true;
    guide.scrollIntoView({block:"start"});
  }
}, [category, search]);
const searching = search.trim().length > 0;
const rows=menu.filter(r=>(searching || category === "All" || r[0] === category) && r[1].toLowerCase().includes(search.trim().toLowerCase()));
const selectedGroup = groups.find(group => group.id === category);
const tabs = [...groups, {id:"All",title:"All services"}];
function selectCategory(id: string) {
  if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  setCategory(id);
  setSearch("");
}
return <SiteShell active="Services">
  <section className="mf-wrap mf-compact-head mf-information-head"><h1>Waxing Services</h1><p>Choose an area. Select a service to see coverage and appointment details.</p></section>
  <div className="mf-stripes" aria-hidden="true"/>
  <section className="mf-wrap mf-services-layout" aria-label="Service menu">
    <div className="mf-services-nav">
      <div className="mf-faq-tabs" role="tablist" aria-label="Service categories">
        {tabs.map((group, index) =>
          <button key={group.id} role="tab" id={`service-tab-${group.id}`} aria-selected={category === group.id} tabIndex={category === group.id ? 0 : -1} aria-controls="service-results" onClick={() => selectCategory(group.id)} onKeyDown={event => {
            const next = event.key === "ArrowRight" ? (index + 1) % tabs.length
              : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length
              : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
            if (next < 0) return;
            event.preventDefault();
            selectCategory(tabs[next].id);
            document.getElementById(`service-tab-${tabs[next].id}`)?.focus();
          }}>{group.title}</button>
        )}
      </div>
      <div className="mf-services-search">
        <label htmlFor="service-search">Find a service</label>
        <input id="service-search" type="search" placeholder="Try “legs” or “Brazilian”" value={search} onChange={e=>{
          if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
          setSearch(e.target.value);
          setCategory("All");
        }}/>
      </div>
    </div>
    <div className="mf-services-results" id="service-results" role="tabpanel" aria-labelledby={`service-tab-${category}`} tabIndex={0}>
      <h2 className="mf-services-title">{searching ? "Search results" : selectedGroup?.title || "All services"}</h2>
      <p className="mf-services-intro" aria-live="polite">{searching ? `${rows.length} ${rows.length === 1 ? "service" : "services"} matching “${search.trim()}”` : selectedGroup?.description || "The complete menu, arranged by area."}</p>
      {rows.length===0 ? <div className="mf-services-empty">
        <h3>No matching services</h3><p>Try another name or browse all areas.</p>
        <button className="mf-services-reset" onClick={()=>{setCategory("All");setSearch("")}}>Clear filters</button>
      </div> : groups.map(group => {
        const services = rows.filter(row => row[0] === group.id);
        if (!services.length) return null;
        return <section className="mf-services-subgroup" key={group.id} aria-label={group.title}>
          {(searching || category === "All") && <h3>{group.title}</h3>}
          <div className="mf-services-columns" aria-hidden="true"><span>Service · select for details</span><span>Time</span><span>Price</span><span/></div>
          {Array.from(new Set(services.map(r => group.id === "Intimate" ? r[1].split(" · ")[0] : r[1]))).map(family => {
            const variants = services.filter(r => (group.id === "Intimate" ? r[1].split(" · ")[0] : r[1]) === family);
            return <div className={group.id === "Intimate" ? "mf-service-family" : undefined} key={family}>
              {group.id === "Intimate" && <h4>{family}</h4>}
              {variants.map(r => <details className="mf-service-detail" key={r[1]}>
                <summary aria-label={`${r[1]}, ${r[3]}, $${r[2]}`}><span className="mf-service-name">{group.id === "Intimate" ? (r[1].split(" · ").slice(1).join(" · ") || "Standard") : r[1]}</span><span className="mf-service-duration">{r[3]}</span><span className="mf-service-cost">${r[2]}</span></summary>
                <p>{r[4]}</p>
              </details>)}
            </div>;
          })}
        </section>;
      })}
      {(category === "Intimate" || category === "All") && <IntimateGuide />}
    </div>
  </section>
</SiteShell>
}
export default Services;
