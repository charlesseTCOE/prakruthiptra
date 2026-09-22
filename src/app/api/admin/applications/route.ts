import { NextRequest, NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-auth";
import { listApplications, updateApplication } from "@/lib/drive";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const records = await listApplications();
  return NextResponse.json({ records });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const metadataFileId = String(body.metadataFileId ?? "");
  const action = String(body.action ?? "");
  if (!metadataFileId) {
    return NextResponse.json({ error: "Missing record." }, { status: 400 });
  }

  if (action === "approve") {
    const board = body.board === "jobs" ? "jobs" : body.board === "advertise" ? "advertise" : "";
    if (!board) {
      return NextResponse.json({ error: "Choose Jobs or Advertise." }, { status: 400 });
    }
    const record = await updateApplication(metadataFileId, {
      status: "approved",
      board,
      listingTitle: String(body.listingTitle ?? "").trim(),
      listingCategory: String(body.listingCategory ?? "").trim(),
      approvedAt: new Date().toISOString(),
    });
    return NextResponse.json({ record });
  }

  if (action === "reject") {
    const record = await updateApplication(metadataFileId, { status: "rejected", board: undefined });
    return NextResponse.json({ record });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
