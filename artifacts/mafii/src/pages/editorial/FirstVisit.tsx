import { useState, type KeyboardEvent } from "react";
import { SiteShell, BookingBand } from "./SiteShell";

const groups = [
  { title: "Choosing your appointment", questions: [
    ["Which appointment should I choose?", "Select the area you want waxed. If you’ve never had a Brazilian or bikini service with MAFII, choose the corresponding first-time appointment on GlossGenius. If the coverage or booking label is unclear, contact the studio before booking."],
    ["Are all genders welcome?", "Yes. MAFII provides Brazilian and full-body waxing for all genders. The booking menu lists coverage and service options; contact the studio if you’re unsure which to choose."],
    ["How do I book an appointment?", "Select Book Appointment to open MAFII’s booking menu on GlossGenius. Choose your service and an available time, then follow the steps to confirm your appointment."]
  ] },
  { title: "Before your visit", questions: [
    ["How much hair growth do I need?", "MAFII’s first-time Brazilian services ask for 3–4 weeks of hair growth. Avoid shaving just before your appointment. For other areas, ask the studio about preparation for your selected service."],
    ["What should I tell my specialist?", "Mention skin sensitivity, recent skin treatments, medications and products you use on the area. Ask the studio whether waxing is appropriate before booking if you have concerns. Don’t stop prescribed medication without guidance from your clinician."]
  ] },
  { title: "During your appointment", questions: [
    ["What can I expect?", "MAFII’s owner is your waxing specialist. You can discuss your coverage preferences and ask questions about your service. The area being waxed and the time listed depend on the appointment you select; check those details in the booking menu."],
    ["Will waxing hurt?", "Waxing can cause temporary discomfort. Everyone experiences it differently; tell your specialist how you’re feeling and ask questions about the process."]
  ] },
  { title: "After your wax", questions: [
    ["How can I care for freshly waxed skin?", "As general guidance, treat sensitive skin gently: keep the area clean, avoid rubbing or picking, and avoid heat, friction and fragranced or exfoliating products while the skin feels irritated. Comfortable, loose clothing can help reduce rubbing. This is general information, not a personalized aftercare plan."],
    ["When can I return to my usual routine?", "Ask your specialist for advice suited to your skin and service, including when to resume exercise, exfoliation and your usual skincare. There is no single schedule that suits everyone. If irritation worsens, persists or concerns you, seek advice from a healthcare professional."]
  ] }
];
const policies = [
  ["Cancellation & rescheduling", "Please provide at least 24 hours’ notice if you need to cancel or reschedule your appointment."],
  ["Running late", "A 5-minute grace period is provided for shorter services and a 10-minute grace period for longer services. Arriving beyond the grace period may require your appointment to be shortened or rescheduled."],
  ["Missed appointments", "Repeated last-minute cancellations or missed appointments may require a deposit before future appointments can be reserved."],
  ["Signature service deposits", "The published Signature full-body services require a 25% reservation deposit at booking. Review the selected service and current terms on GlossGenius."]
];
export function FirstVisit() {
  const topics = [...groups, { title: "Appointment policies", questions: policies }];
  const labels = ["Booking", "Before Your Visit", "During Your Visit", "Aftercare", "Policies"];
  const keys = ["booking", "before", "during", "aftercare", "policies"];
  const [active, setActive] = useState(() => {
    if (window.location.hash === "#appointment-policies") return 4;
    const index = keys.indexOf(new URLSearchParams(window.location.search).get("topic") || "booking");
    return index < 0 ? 0 : index;
  });
  function selectTopic(index: number) {
    setActive(index);
    const url = new URL(window.location.href);
    url.searchParams.set("topic", keys[index]);
    url.hash = index === 4 ? "appointment-policies" : "";
    window.history.replaceState(window.history.state, "", url);
  }
  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % topics.length
      : event.key === "ArrowLeft" ? (index + topics.length - 1) % topics.length
      : event.key === "Home" ? 0 : event.key === "End" ? topics.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    selectTopic(next);
    document.getElementById(`faq-tab-${keys[next]}`)?.focus();
  }
  return <SiteShell active="FirstVisit">
    <section className="mf-wrap mf-compact-head mf-information-head"><h1>FAQ</h1><p>Preparation, aftercare and studio policies.</p></section>
    <section className="mf-wrap mf-section mf-faq-groups">
      <div className="mf-faq-tabs" role="tablist" aria-label="FAQ topics">
        {labels.map((label, index) => <button key={keys[index]} role="tab" id={`faq-tab-${keys[index]}`} aria-selected={active === index} aria-controls={`faq-panel-${keys[index]}`} tabIndex={active === index ? 0 : -1} onClick={() => selectTopic(index)} onKeyDown={event => navigateTabs(event, index)}>{label}</button>)}
      </div>
      {topics.map((group, index) => <div role="tabpanel" id={`faq-panel-${keys[index]}`} aria-labelledby={`faq-tab-${keys[index]}`} hidden={active !== index} tabIndex={0} className="mf-faq-group" key={group.title}><h2 id={index === 4 ? "appointment-policies" : undefined}>{group.title}</h2>{group.questions.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>)}
    </section>
    <BookingBand placement="faq_band" />
  </SiteShell>;
}
export default FirstVisit;
