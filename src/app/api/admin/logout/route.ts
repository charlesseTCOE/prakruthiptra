import { NextResponse } from "next/server";
import { clearAdminCookieHeaders } from "@/lib/admin-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  for (const header of clearAdminCookieHeaders()) {
    res.headers.append("Set-Cookie", header);
  }
  return res;
}
