// Gift-card seasons. The bar shows only inside a window, judged by today's
// date in Pacific time, so it switches on and off each year without edits.
// Gift seasons are listed first so they win where windows overlap.
// Specific holidays come before broad seasons for the same reason.
// Preview any season with ?season=valentines|mothers|fathers|holidays|july4|laborday|summer|newyear.

export type Season = { id: string; message: string; action: "gift" | "book" };

type Ymd = { y: number; m: number; d: number };

function todayPacific(): Ymd {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value);
  return { y: get("year"), m: get("month"), d: get("day") };
}

const dayNumber = ({ y, m, d }: Ymd) => Date.UTC(y, m - 1, d) / 86400000;

/** The nth given weekday (0 = Sunday) of a month, e.g. Mother's Day = 2nd Sunday of May. */
function nthWeekday(y: number, m: number, weekday: number, n: number): Ymd {
  const firstWeekday = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  return { y, m, d: 1 + ((weekday - firstWeekday + 7) % 7) + (n - 1) * 7 };
}
const nthSunday = (y: number, m: number, n: number) => nthWeekday(y, m, 0, n);
const laborDay = (y: number) => nthWeekday(y, 9, 1, 1);

function within(today: Ymd, start: Ymd, end: Ymd) {
  const t = dayNumber(today);
  return t >= dayNumber(start) && t <= dayNumber(end);
}

const seasons: (Season & { window: (y: number) => [Ymd, Ymd] })[] = [
  {
    id: "valentines",
    message: "Valentine’s Day is coming. Give the gift of smooth skin.",
    action: "gift",
    window: y => [{ y, m: 1, d: 25 }, { y, m: 2, d: 14 }],
  },
  {
    id: "mothers",
    message: "For Mother’s Day, give her an hour that’s all hers.",
    action: "gift",
    window: y => { const day = nthSunday(y, 5, 2); return [{ ...day, d: day.d - 14 }, day]; },
  },
  {
    id: "fathers",
    message: "For Father’s Day, give a MAFII Man gift card.",
    action: "gift",
    window: y => { const day = nthSunday(y, 6, 3); return [{ ...day, d: day.d - 14 }, day]; },
  },
  {
    id: "holidays",
    message: "This holiday season, give the gift of smooth skin.",
    action: "gift",
    window: y => [{ y, m: 11, d: 20 }, { y, m: 12, d: 24 }],
  },
  {
    id: "july4",
    message: "Fourth of July weekend? Get beach ready before the fireworks.",
    action: "book",
    window: y => [{ y, m: 6, d: 25 }, { y, m: 7, d: 4 }],
  },
  {
    id: "laborday",
    message: "Labor Day weekend is coming. One last beach-ready wax.",
    action: "book",
    window: y => { const day = laborDay(y); return [{ ...day, d: day.d - 10 }, day]; },
  },
  {
    id: "summer",
    message: "Summer’s here. Get beach ready.",
    action: "book",
    window: y => [{ y, m: 5, d: 15 }, laborDay(y)],
  },
  {
    id: "newyear",
    message: "Ring in the new year smooth. Book before the holiday rush.",
    action: "book",
    window: y => [{ y, m: 12, d: 26 }, { y, m: 12, d: 31 }],
  },
];

export function currentSeason(): Season | null {
  if (typeof window === "undefined") return null;
  const preview = new URLSearchParams(window.location.search).get("season");
  const forced = seasons.find(s => s.id === preview);
  if (forced) return forced;
  const today = todayPacific();
  return seasons.find(s => { const [start, end] = s.window(today.y); return within(today, start, end); }) ?? null;
}
