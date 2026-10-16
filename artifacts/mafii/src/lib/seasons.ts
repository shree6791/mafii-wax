// Gift-card seasons. The bar shows only inside a window, judged by today's
// date in Pacific time, so it switches on and off each year without edits.
// Gift seasons are listed first so they win where windows overlap.
// Specific holidays come before broad seasons for the same reason.
// Preview any season with ?season=valentines|mothers|fathers|holidays|memorialday|july4|laborday|halloween|summer|newyear.

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
/** Memorial Day: the last Monday of May. */
function memorialDay(y: number): Ymd {
  const fifth = nthWeekday(y, 5, 1, 5);
  return fifth.d <= 31 ? fifth : nthWeekday(y, 5, 1, 4);
}

function within(today: Ymd, start: Ymd, end: Ymd) {
  const t = dayNumber(today);
  return t >= dayNumber(start) && t <= dayNumber(end);
}

const seasons: (Season & { window: (y: number) => [Ymd, Ymd] })[] = [
  {
    id: "valentines",
    message: "Valentine’s gift idea: smooth, confident skin.",
    action: "gift",
    window: y => [{ y, m: 1, d: 25 }, { y, m: 2, d: 14 }],
  },
  {
    id: "mothers",
    message: "Mother’s Day: give her an hour that’s all about her.",
    action: "gift",
    window: y => { const day = nthSunday(y, 5, 2); return [{ ...day, d: day.d - 14 }, day]; },
  },
  {
    id: "fathers",
    message: "Father’s Day: a MAFII Man gift card he’ll actually use.",
    action: "gift",
    window: y => { const day = nthSunday(y, 6, 3); return [{ ...day, d: day.d - 14 }, day]; },
  },
  {
    id: "holidays",
    message: "Still shopping? Smooth skin is the easiest gift on your list.",
    action: "gift",
    window: y => [{ y, m: 11, d: 20 }, { y, m: 12, d: 24 }],
  },
  {
    id: "memorialday",
    message: "Memorial Day plans? Wax 2–3 days before for your smoothest skin.",
    action: "book",
    window: y => { const day = memorialDay(y); return [{ ...day, d: day.d - 10 }, day]; },
  },
  {
    id: "july4",
    message: "Fourth of July plans? Wax 2–3 days ahead so skin is calm and smooth.",
    action: "book",
    window: y => [{ y, m: 6, d: 25 }, { y, m: 7, d: 4 }],
  },
  {
    id: "laborday",
    message: "Last long weekend of summer? Wax 2–3 days before you go.",
    action: "book",
    window: y => { const day = laborDay(y); return [{ ...day, d: day.d - 10 }, day]; },
  },
  {
    id: "halloween",
    message: "Costume’s ready. Is your skin? Treat yourself before the party.",
    action: "book",
    window: y => [{ y, m: 10, d: 20 }, { y, m: 10, d: 31 }],
  },
  {
    id: "summer",
    message: "Beach, pool or vacation? Wax 2–3 days before for smooth, calm skin.",
    action: "book",
    window: y => [{ y, m: 5, d: 15 }, laborDay(y)],
  },
  {
    id: "newyear",
    message: "Ring in the new year smooth. Wax 2–3 days before your celebration.",
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
