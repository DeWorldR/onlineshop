// src/utils/formatDate.ts
export function formatIsoToLocale(iso?: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Bangkok",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleString();
  }
}
