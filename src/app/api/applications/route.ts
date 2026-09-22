import { NextRequest, NextResponse } from "next/server";
import { isDriveConfigured, saveApplication } from "@/lib/drive";
import { screenSubmission } from "@/lib/moderation";

const JOB_TOPICS = new Set(["Jobs / local work", "Local work or help"]);
const ALLOWED = /\.(pdf|doc|docx)$/i;
const hits = new Map<string, { n: number; t: number }>();

function limited(ip: string) {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now - row.t > 10 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  row.n += 1;
  return row.n > 8;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
    if (limited(ip)) {
      return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
    }
    if (!isDriveConfigured()) {
      return NextResponse.json(
        {
          error:
            "Online submissions are temporarily unavailable. Please email prakruthiptra@gmail.com.",
        },
        { status: 503 }
      );
    }

    const form = await req.formData();
    const fullName = String(form.get("fullName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const topic = String(form.get("topic") ?? "").trim();
    const note = String(form.get("note") ?? "").trim();
    const file = form.get("file");

    if (!fullName) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!topic) {
      return NextResponse.json({ error: "Please choose a topic." }, { status: 400 });
    }
    const blocked = screenSubmission({ fullName, phone, email, note });
    if (blocked) {
      return NextResponse.json({ error: blocked }, { status: 400 });
    }

    let driveFile:
      | { filename: string; mimeType: string; buffer: Buffer }
      | undefined;

    if (file instanceof File && file.size > 0) {
      if (!JOB_TOPICS.has(topic)) {
        return NextResponse.json({ error: "Files are only accepted for Jobs / local work." }, { status: 400 });
      }
      if (!ALLOWED.test(file.name)) {
        return NextResponse.json({ error: "Use a PDF or Word file." }, { status: 400 });
      }
      if (file.size > 8 * 1024 * 1024) {
        return NextResponse.json({ error: "File must be under 8 MB." }, { status: 400 });
      }
      driveFile = {
        filename: file.name,
        mimeType: file.type || "application/pdf",
        buffer: Buffer.from(await file.arrayBuffer()),
      };
    }

    const record = await saveApplication({
      fullName,
      phone,
      email,
      topic,
      note,
      file: driveFile,
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Application submission failed", err);
    return NextResponse.json({ error: "Your submission could not be saved. Please try again or email prakruthiptra@gmail.com." }, { status: 500 });
  }
}
