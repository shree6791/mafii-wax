const base = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/`;
export const booking = "https://mafiiwaxstudio.glossgenius.com/services";
export const directions = "https://www.google.com/maps/dir/?api=1&destination=550+Showers+Drive+D006+Mountain+View+CA+94040";
const routes: Record<string, string> = {
  PersonalSpecialist: "", Services: "services",
  About: "about", FirstVisit: "first-visit", Visit: "visit",
};
export const nav = [
  ["About", "About"], ["Services", "Services"],
  ["FAQ", "FirstVisit"], ["Contact", "Visit"],
];
export function page(name: string): string {
  const [key, query] = name.split("?");
  // Compatibility for old links: the guide is now part of Services.
  if (key === "Brazilian") return `${page("Services?category=Intimate")}#bikini-guide`;
  if (!(key in routes)) throw new Error(`Unknown page: ${key}`);
  return `${base}${routes[key]}${query ? `?${query}` : ""}`;
}
export const image = (file: string) => `${base}images/${file}`;
