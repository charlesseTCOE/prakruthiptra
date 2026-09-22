const BLOCKED = [
  "buy followers",
  "crypto giveaway",
  "whatsapp lottery",
  "click here to claim",
  "free viagra",
  "porn",
  "xxx",
];

export function screenSubmission(input: {
  fullName: string;
  phone?: string;
  email?: string;
  note?: string;
}): string | null {
  const blob = [input.fullName, input.phone, input.email, input.note]
    .join(" ")
    .toLowerCase();

  if ((input.note ?? "").length > 4000) {
    return "Note is too long.";
  }
  if (/(.)\1{12,}/.test(blob)) {
    return "That looks like junk text. Please rewrite the note.";
  }
  const urls = blob.match(/https?:\/\/[^\s]+/g) ?? [];
  if (urls.length > 3) {
    return "Too many links. Remove the extra URLs.";
  }
  if (BLOCKED.some((word) => blob.includes(word))) {
    return "This note cannot be accepted. Write to the committee in plain language.";
  }
  return null;
}
