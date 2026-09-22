export function formatPostDate(date: string) {
  if (!date) return "";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
export function postCategory(slug: string, category?: string) {
  if (category) return category;
  return slug.includes("sir") ? "Voter information" : slug.includes("complaint") ? "Civic guide" : "Community";
}
