import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "ptra_admin";

function secret() {
  return process.env.ADMIN_PASSWORD || "";
}

export function allowedAdminEmails(): string[] {
  const fromList = process.env.ADMIN_EMAILS;
  if (fromList) {
    return fromList
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  }
  return [process.env.ADMIN_EMAIL_1, process.env.ADMIN_EMAIL_2]
    .map((e) => (e || "").trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminConfigured() {
  return secret().length >= 8 && allowedAdminEmails().length > 0;
}

export function signAdminToken(email: string) {
  const s = secret();
  if (!s) throw new Error("ADMIN_PASSWORD is not set");
  const day = Math.floor(Date.now() / 86400000);
  return createHmac("sha256", s).update(`ptra:${email.toLowerCase()}:${day}`).digest("hex");
}

export function verifyCredentials(email: string, password: string) {
  const s = secret();
  const allowed = allowedAdminEmails();
  const normalized = email.trim().toLowerCase();
  if (!s || !normalized || !allowed.includes(normalized)) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(s);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminSession() {
  if (!isAdminConfigured()) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  const email = jar.get(`${COOKIE}_email`)?.value || "";
  if (!token || !email) return false;
  if (!allowedAdminEmails().includes(email.toLowerCase())) return false;
  try {
    const expected = signAdminToken(email);
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function adminCookieHeaders(email: string, token: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return [
    `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${secure}`,
    `${COOKIE}_email=${encodeURIComponent(email.toLowerCase())}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${secure}`,
  ];
}

export function clearAdminCookieHeaders() {
  return [
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
    `${COOKIE}_email=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
  ];
}
