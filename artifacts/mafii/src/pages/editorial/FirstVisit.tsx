import { useState, type KeyboardEvent, type ReactNode } from "react";
import { SiteShell, GiftCardLink } from "./SiteShell";

const groups: { title: string; questions: [string, ReactNode][] }[] = [
  { title: "Choosing your appointment", questions: [
    ["Which appointment should I choose?", "Pick the area you’d like waxed. For your first Brazilian or bikini service at MAFII, choose the first-visit option; it includes extra time. Not sure which one fits? Call 650.930.6516 before booking."],
    ["Are all genders welcome?", "Yes, always. MAFII is women-owned and welcomes every gender, with a dedicated MAFII Man menu."],
    ["How do I book an appointment?", "Tap Book, choose your service and a time that suits you, and confirm on GlossGenius."],
    ["Do you offer gift cards?", <>Yes. <GiftCardLink placement="faq">Buy a MAFII gift card</GiftCardLink> online and send it to someone who deserves some time for themselves.</>]
  ] },
  { title: "Before your visit", questions: [
    ["How much hair growth do I need?", "About 3–4 weeks of growth, roughly the length of a grain of rice, gives the smoothest result. Skip shaving beforehand. For other areas, just ask."],
    ["What should I tell my specialist?", "Mention sensitive skin, recent treatments or peels, and any medications or products you use on the area. If you’re unsure whether waxing suits you, ask before booking. Never stop a prescribed medication without your clinician’s advice."]
  ] },
  { title: "During your appointment", questions: [
    ["What can I expect?", "A private studio and one specialist. MAFII’s owner does every service herself, so you can talk through coverage and comfort with the person doing your wax."],
    ["Will waxing hurt?", "There’s a quick sting, and everyone feels it differently. Many clients find it eases with regular visits. Tell your specialist how you’re doing at any point."]
  ] },
  { title: "After your wax", questions: [
    ["How can I care for freshly waxed skin?", "For the first day or two, let your skin settle: keep the area clean, wear loose clothing, and skip heat, friction, scrubs and fragranced products. Your specialist can tailor this to your skin."],
    ["When can I return to my usual routine?", "Ask your specialist what’s right for your skin and service, including when to resume workouts and exfoliation. If irritation gets worse or doesn’t settle, check in with a healthcare professional."]
  ] }
];
const policies = [
  ["Cancellation & rescheduling", "Please provide at least 24 hours’ notice if you need to cancel or reschedule your appointment."],
  ["Running late", "A 5-minute grace period is provided for shorter services and a 10-minute grace period for longer services. Arriving beyond the grace period may require your appointment to be shortened or rescheduled."],
  ["Missed appointments", "Repeated last-minute cancellations or missed appointments may require a deposit before future appointments can be reserved."],
  ["Signature service deposits", "Signature full-body services need a 25% deposit when you book on GlossGenius."]
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
    <section className="mf-wrap mf-compact-head mf-information-head"><h1>FAQ</h1><p>Everything to know before your wax, and after.</p></section>
    <section className="mf-wrap mf-section mf-faq-groups">
      <div className="mf-faq-tabs" role="tablist" aria-label="FAQ topics">
        {labels.map((label, index) => <button key={keys[index]} role="tab" id={`faq-tab-${keys[index]}`} aria-selected={active === index} aria-controls={`faq-panel-${keys[index]}`} tabIndex={active === index ? 0 : -1} onClick={() => selectTopic(index)} onKeyDown={event => navigateTabs(event, index)}>{label}</button>)}
      </div>
      {topics.map((group, index) => <div role="tabpanel" id={`faq-panel-${keys[index]}`} aria-labelledby={`faq-tab-${keys[index]}`} hidden={active !== index} tabIndex={0} className="mf-faq-group" key={group.title}><h2 id={index === 4 ? "appointment-policies" : undefined}>{group.title}</h2>{group.questions.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>)}
    </section>
  </SiteShell>;
}
export default FirstVisit;
