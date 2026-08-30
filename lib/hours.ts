import { BIZ } from "./business";

/**
 * Compute open/closed state in America/New_York regardless of the user's tz.
 */
export type HoursStatus = {
  isOpen: boolean;
  todayLabel: string;
  message: string; // e.g. "Open now until 6:00 PM" or "Closed — opens Mon 7:00 AM"
};

function nycParts(): { day: number; hours: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const map: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return { day: map[weekday] ?? 0, hours: hour, minutes: minute };
}

function toMinutes(t: string | null): number | null {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function fmtTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function getHoursStatus(): HoursStatus {
  const { day, hours, minutes } = nycParts();
  const now = hours * 60 + minutes;
  const today = BIZ.hours[day];
  const todayLabel = today.label;

  if ("closed" in today && today.closed) {
    for (let i = 1; i <= 7; i++) {
      const next = BIZ.hours[(day + i) % 7];
      if (!("closed" in next && next.closed) && next.open) {
        return {
          isOpen: false,
          todayLabel,
          message: `Closed — opens ${next.label} ${fmtTime(next.open)}`,
        };
      }
    }
    return { isOpen: false, todayLabel, message: "Closed today" };
  }

  const openMin = toMinutes(today.open);
  const closeMin = toMinutes(today.close);

  if (openMin !== null && closeMin !== null && now >= openMin && now < closeMin) {
    return {
      isOpen: true,
      todayLabel,
      message: `Open now until ${fmtTime(today.close!)}`,
    };
  }

  // find next open day
  for (let i = 1; i <= 7; i++) {
    const next = BIZ.hours[(day + i) % 7];
    if ("closed" in next && next.closed) continue;
    if (next.open) {
      return {
        isOpen: false,
        todayLabel,
        message: `Closed — opens ${next.label} ${fmtTime(next.open)}`,
      };
    }
  }
  return { isOpen: false, todayLabel, message: "Closed" };
}
