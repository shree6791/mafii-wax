export const studioAddress = "550 Showers Drive D006, Studio 21, Mountain View, CA 94040";
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`;
export const openingHours = [
  ["Monday", "Closed"],
  ["Tuesday", "9 AM – 6 PM"],
  ["Wednesday", "9 AM – 6 PM"],
  ["Thursday", "9 AM – 6 PM"],
  ["Friday", "9 AM – 6 PM"],
  ["Saturday", "8 AM – 4 PM"],
  ["Sunday", "Closed"],
] as const;
