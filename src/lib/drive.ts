import { Readable } from "stream";
import { google } from "googleapis";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
};

export type ApplicationRecord = {
  id: string;
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  topic: string;
  note: string;
  document?: DriveFile;
  metadataFileId?: string;
  status?: "pending" | "approved" | "rejected";
  board?: "jobs" | "advertise";
  listingTitle?: string;
  listingCategory?: string;
  approvedAt?: string;
};

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
}

export function isDriveConfigured() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.GOOGLE_DRIVE_FOLDER_ID);
}

function driveClient() {
  const auth = getAuth();
  if (!auth) throw new Error("Could not authenticate with Google Drive.");
  return google.drive({ version: "v3", auth });
}

async function uploadBuffer(params: {
  filename: string;
  mimeType: string;
  buffer: Buffer;
}): Promise<DriveFile> {
  if (!isDriveConfigured()) {
    throw new Error("Google Drive is not configured.");
  }
  const drive = driveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!;
  const created = await drive.files.create({
    requestBody: {
      name: params.filename,
      parents: [folderId],
    },
    media: {
      mimeType: params.mimeType,
      body: Readable.from(params.buffer),
    },
    fields: "id, name, mimeType, size, modifiedTime, webViewLink",
    supportsAllDrives: true,
  });
  return {
    id: created.data.id ?? "",
    name: created.data.name ?? params.filename,
    mimeType: created.data.mimeType ?? params.mimeType,
    size: created.data.size ?? undefined,
    modifiedTime: created.data.modifiedTime ?? undefined,
    webViewLink: created.data.webViewLink ?? undefined,
  };
}

export async function saveApplication(input: {
  fullName: string;
  phone: string;
  email: string;
  topic: string;
  note: string;
  file?: { filename: string; mimeType: string; buffer: Buffer };
}): Promise<ApplicationRecord> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const stamp = new Date().toISOString();
  const safe = input.fullName.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_") || "resident";

  let document: DriveFile | undefined;
  if (input.file) {
    const ext = input.file.filename.includes(".")
      ? input.file.filename.slice(input.file.filename.lastIndexOf("."))
      : ".pdf";
    document = await uploadBuffer({
      filename: `${id}_${safe}${ext}`,
      mimeType: input.file.mimeType,
      buffer: input.file.buffer,
    });
  }

  const record: ApplicationRecord = {
    id,
    submittedAt: stamp,
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    topic: input.topic,
    note: input.note,
    document,
    status: "pending",
  };

  const meta = await uploadBuffer({
    filename: `${id}_${safe}.json`,
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(record, null, 2)),
  });
  record.metadataFileId = meta.id;
  return record;
}

export async function listApplications(): Promise<ApplicationRecord[]> {
  if (!isDriveConfigured()) return [];
  const drive = driveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!;
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false and mimeType = 'application/json'`,
    fields: "files(id, name)",
    orderBy: "modifiedTime desc",
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const records: ApplicationRecord[] = [];
  for (const file of res.data.files ?? []) {
    if (!file.id) continue;
    const got = await drive.files.get({ fileId: file.id, alt: "media" }, { responseType: "text" });
    try {
      const parsed = JSON.parse(String(got.data)) as ApplicationRecord;
      parsed.metadataFileId = file.id;
      records.push(parsed);
    } catch {
      /* skip corrupt sidecar */
    }
  }
  return records.sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
}

export async function updateApplication(
  metadataFileId: string,
  patch: Partial<ApplicationRecord>
): Promise<ApplicationRecord> {
  const drive = driveClient();
  const got = await drive.files.get({ fileId: metadataFileId, alt: "media" }, { responseType: "text" });
  const record = JSON.parse(String(got.data)) as ApplicationRecord;
  const next: ApplicationRecord = { ...record, ...patch, metadataFileId };
  await drive.files.update({
    fileId: metadataFileId,
    media: {
      mimeType: "application/json",
      body: JSON.stringify(next, null, 2),
    },
  });
  return next;
}

export async function listPublished(board: "jobs" | "advertise"): Promise<ApplicationRecord[]> {
  const all = await listApplications();
  return all.filter((row) => row.status === "approved" && row.board === board);
}
