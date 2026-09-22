"use client";

import { useEffect, useMemo, useState } from "react";

type RecordItem = {
  id: string;
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  topic: string;
  note: string;
  document?: { name: string; webViewLink?: string };
  metadataFileId?: string;
  status?: "pending" | "approved" | "rejected";
  board?: "jobs" | "advertise";
  listingTitle?: string;
  listingCategory?: string;
};

type Tab = "inbox" | "jobs" | "advertise";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [tab, setTab] = useState<Tab>("inbox");
  const [busyId, setBusyId] = useState("");

  async function load() {
    const res = await fetch("/api/admin/applications");
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load submissions.");
    setRecords(data.records ?? []);
    setAuthed(true);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/applications", { signal: controller.signal })
      .then(async res => {
        if (res.status === 401) return;
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load submissions.");
        setRecords(data.records ?? []);
        setAuthed(true);
      })
      .catch(err => { if (err.name !== "AbortError") setError("Could not connect. Please try again."); });
    return () => controller.abort();
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Could not sign in.");
      return;
    }
    setPassword("");
    await load();
    } catch { setError("Could not sign in. Please try again."); }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setRecords([]);
  }

  async function act(row: RecordItem, action: "approve" | "reject", board?: "jobs" | "advertise") {
    if (!row.metadataFileId) return;
    setBusyId(row.id);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadataFileId: row.metadataFileId,
          action,
          board,
          listingTitle: row.listingTitle || row.topic || row.fullName,
          listingCategory: board === "jobs" ? "Jobs" : row.listingCategory || "Community",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Could not update.");
        return;
      }
      setError("");
      await load();
    } catch {
      setError("Could not update the listing. Please try again.");
    } finally {
      setBusyId("");
    }
  }

  const visible = useMemo(() => {
    if (tab === "jobs") return records.filter((r) => r.status === "approved" && r.board === "jobs");
    if (tab === "advertise") return records.filter((r) => r.status === "approved" && r.board === "advertise");
    return records.filter((r) => (r.status ?? "pending") !== "rejected");
  }, [records, tab]);

  if (!authed) {
    return (
      <section className="admin-page max-w-md mx-auto px-5 py-24">
        <p className="label text-clay mb-3">Committee only</p>
        <p className="label text-clay mb-2">Restricted access</p>
        <h1 className="font-display text-3xl text-moss mb-2">Office Bearers Admin</h1>
        <p className="text-moss-2 mb-6">For authorised PTRA Office Bearers only.</p>
        <form onSubmit={login} className="rounded-3xl border border-line bg-white p-6 space-y-4">
          <label className="block text-sm text-moss-2">
            Committee email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-line px-3.5 py-2.5" />
          </label>
          <label className="block text-sm text-moss-2">
            Password
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-line px-3.5 py-2.5" />
          </label>
          <button className="w-full rounded-full bg-moss text-sage py-3 text-sm">Enter</button>
          {error && <p className="text-sm text-clay">{error}</p>}
        </form>
      </section>
    );
  }

  return (
    <section className="admin-page max-w-6xl mx-auto px-5 py-16">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="label text-clay mb-3">Committee desk</p>
          <h1 className="font-display text-4xl text-moss">Review & publish</h1>
        </div>
        <button onClick={logout} className="text-sm text-moss-2 hover:text-clay">Sign out</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {([["inbox", "Inbox"], ["jobs", "Jobs live"], ["advertise", "Advertise live"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={tab === id ? "px-4 py-2 rounded-full bg-ochre text-pine text-sm font-medium" : "px-4 py-2 rounded-full border border-line text-sm text-moss-2"}
          >
            {label}
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-clay mb-4">{error}</p>}
      {visible.length === 0 ? (
        <p className="text-moss-2">Nothing in this tab yet. New submissions appear in the Inbox.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((row) => (
            <article key={row.id} className="rounded-3xl border border-line bg-white p-5 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-xl text-moss">{row.fullName}</p>
                <span className="label text-ochre">{row.status ?? "pending"}</span>
              </div>
              <p className="text-sm text-moss-2 mt-1">{row.topic}</p>
              <p className="text-xs text-moss-2 mt-1">{row.submittedAt ? new Date(row.submittedAt).toLocaleString("en-IN") : ""}</p>
              {row.phone && <p className="text-sm text-moss-2 mt-3">Phone · {row.phone}</p>}
              {row.email && <p className="text-sm text-moss-2">Email · {row.email}</p>}
              {row.note && <p className="text-sm text-moss mt-3 line-clamp-5">{row.note}</p>}
              {row.document?.webViewLink && (
                <a href={row.document.webViewLink} target="_blank" rel="noopener noreferrer" className="text-sm text-clay mt-3">
                  Open file in Drive →
                </a>
              )}
              {(row.status ?? "pending") !== "approved" && (
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  <button disabled={busyId === row.id} onClick={() => act(row, "approve", "jobs")} className="px-3 py-1.5 rounded-full bg-ochre text-pine text-xs font-medium">
                    Approve → Jobs
                  </button>
                  <button disabled={busyId === row.id} onClick={() => act(row, "approve", "advertise")} className="px-3 py-1.5 rounded-full bg-moss text-sage text-xs font-medium">
                    Approve → Advertise
                  </button>
                  <button disabled={busyId === row.id} onClick={() => act(row, "reject")} className="px-3 py-1.5 rounded-full border border-line text-xs text-moss-2">
                    Hide
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
