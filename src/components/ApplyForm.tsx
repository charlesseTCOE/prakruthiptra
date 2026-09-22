"use client";

import { useMemo, useState } from "react";

const topics = [
  "Jobs / local work",
  "Introduction / profile",
  "Vendor or service",
  "Housing or lease",
  "Volunteer",
  "Advertise with us",
  "Something else",
];

export default function ApplyForm({ defaultTopic = "" }: { defaultTopic?: string }) {
  const [status, setStatus] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [topic, setTopic] = useState(defaultTopic);
  const [fileName, setFileName] = useState("");
  const showFile = useMemo(() => topic === "Jobs / local work", [topic]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setStatus("");
    setOk(false);
    try {
      const res = await fetch("/api/applications", { method: "POST", body: new FormData(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send.");
      setOk(true);
      setStatus(
        topic === "Jobs / local work"
          ? "Job application submitted successfully. The Office Bearers will review it."
          : "Message sent successfully. The Office Bearers have received it for review."
      );
      form.reset();
      setTopic(defaultTopic);
      setFileName("");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not send.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="workflow-form rounded-[28px] border border-line bg-white shadow-[0_24px_60px_-36px_rgba(20,32,26,0.55)] p-6 sm:p-8 space-y-5">
      {showFile && (
        <label className="block sm:col-span-2 cursor-pointer">
          <span className="inline-flex items-center gap-2 label text-clay mb-2">
            Jobs attachment

          </span>
          <span className="flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-ochre bg-ochre/12 px-4 py-8 text-center hover:bg-ochre/18 transition-colors">
            <span className="font-display text-xl text-moss">Choose a PDF or Word file</span>
            <span className="text-sm text-moss-2">
              {fileName ? `Selected · ${fileName}` : "Optional résumé or profile, up to 8 MB."}
            </span>

          </span>
          <input
            name="file"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf"
            className="mt-3"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-moss-2">
          <span className="inline-flex items-center gap-2"> Full name</span>
          <input required autoComplete="name" name="fullName" className="mt-1.5 w-full rounded-2xl border border-line bg-sage px-3.5 py-2.5 text-moss outline-none focus:border-ochre" />
        </label>
        <label className="block text-sm text-moss-2">
          <span className="inline-flex items-center gap-2"> Phone</span>
          <input type="tel" autoComplete="tel" name="phone" className="mt-1.5 w-full rounded-2xl border border-line bg-sage px-3.5 py-2.5 text-moss outline-none focus:border-ochre" />
        </label>
        <label className="block text-sm text-moss-2 sm:col-span-2">
          <span className="inline-flex items-center gap-2"> Email</span>
          <input type="email" autoComplete="email" name="email" className="mt-1.5 w-full rounded-2xl border border-line bg-sage px-3.5 py-2.5 text-moss outline-none focus:border-ochre" />
        </label>
        <label className="block text-sm text-moss-2 sm:col-span-2">
          <span className="inline-flex items-center gap-2"> Topic</span>
          <select
            required
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-line bg-sage px-3.5 py-2.5 text-moss outline-none focus:border-ochre"
          >
            <option value="" disabled>
              Choose one
            </option>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-moss-2 sm:col-span-2">
          <span className="inline-flex items-center gap-2"> Note to the committee</span>
          <textarea name="note" rows={5} className="mt-1.5 w-full rounded-2xl border border-line bg-sage px-3.5 py-2.5 text-moss outline-none focus:border-ochre" />
        </label>
      </div>
      <button
        disabled={busy}
        className="inline-flex items-center px-6 py-3 rounded-full bg-moss text-sage text-sm font-medium hover:bg-pine disabled:opacity-60"
      >
        {busy ? "Sending…" : showFile ? "Send note + attachment" : "Send to the association"}
      </button>
      {status && (
        <div
          role={ok ? "status" : "alert"}
          aria-live="polite"
          className={ok ? "submission-message submission-success" : "submission-message submission-error"}
        >
          <span aria-hidden="true" className="submission-icon">{ok ? "✓" : "!"}</span>
          <div>
            <strong>{ok ? "Successfully submitted" : "Submission not sent"}</strong>
            <p>{status}</p>
          </div>
        </div>
      )}
    </form>
  );
}
