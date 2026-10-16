const base = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/`;
export const isCanvasPreview = base.replace(/\/$/, "") === "/__mockup";
export const booking = "https://mafiiwaxstudio.glossgenius.com/services";
export const directions = "https://www.google.com/maps/search/?api=1&query=550+Showers+Drive+D006+Studio+21+Mountain+View+CA+94040";
const routes: Record<string, string> = {
  PersonalSpecialist: "Refined", Home: "Refined", Refined: "Refined",
  Services: "Services", About: "About", FirstVisit: "FAQ", FAQ: "FAQ", Visit: "Contact", Contact: "Contact",
};
export const nav = [["About", "About"], ["Services", "Services"], ["FAQ", "FirstVisit"], ["Contact", "Visit"]];
export function page(name: string): string {
  const match = name.match(/^([^?#]+)(.*)$/);
  const key = match?.[1] ?? name;
  const suffix = match?.[2] ?? "";
  if (key === "Brazilian") {
    const url = new URL(`${base}preview/mafii-monochrome/Services${suffix}`, window.location.origin);
    url.searchParams.set("category", "Intimate");
    url.hash = "bikini-guide";
    return `${url.pathname}${url.search}${url.hash}`;
  }
  if (!(key in routes)) throw new Error(`Unknown page: ${key}`);
  return `${base}preview/mafii-monochrome/${routes[key]}${suffix}`;
}
export const image = (file: string) => `${base}images/${file}`;
