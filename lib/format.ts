const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// Fixed locale + UTC so server and client render identical strings (no hydration mismatch).
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
