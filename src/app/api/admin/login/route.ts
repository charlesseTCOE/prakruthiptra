import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieHeaders,
  isAdminConfigured,
  signAdminToken,
  verifyCredentials,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Set ADMIN_EMAIL_1, ADMIN_EMAIL_2 and ADMIN_PASSWORD in Vercel." },
      { status: 503 }
    );
  }
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");
  if (!verifyCredentials(email, password)) {
    return NextResponse.json({ error: "Email not authorised, or password is wrong." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  for (const header of adminCookieHeaders(email, signAdminToken(email))) {
    res.headers.append("Set-Cookie", header);
  }
  return res;
}
