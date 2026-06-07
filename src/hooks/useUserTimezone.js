import { useMemo } from "react";

/**
 * Detect the user's IANA time zone (e.g. "Africa/Lagos", "America/New_York")
 * using the browser's Intl API. Safe to call on the server — returns null
 * outside the browser.
 *
 * Used by the booking flow to show available slots in the user's local time.
 */
export function useUserTimezone() {
  return useMemo(() => {
    if (typeof Intl === "undefined") return null;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return tz || null;
    } catch {
      return null;
    }
  }, []);
}

/**
 * Given a date and a target IANA time zone, return a short human label
 * like "Tue 10 Jun, 2:30 PM" formatted in that zone. Used for displaying
 * available booking slots in the user's local time.
 */
export function formatInTimezone(date, timeZone, options = {}) {
  if (!date || !timeZone) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZone,
      ...options,
    }).format(date);
  } catch {
    return new Date(date).toLocaleString();
  }
}
