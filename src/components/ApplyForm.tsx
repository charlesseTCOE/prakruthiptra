"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

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
  const [topic, setTopic] = useState(defaultTopic);
  const [draft, setDraft] = useState<{ subject: string; body: string; href: string } | null>(null);
  const isJob = topic === "Jobs / local work";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const subject = `PTRA ${isJob ? "job application" : "message"}: ${topic} — ${value("fullName")}`;
    const body = `Dear PTRA Office Bearers,\n\nName: ${value("fullName")}\nPhone: ${value("phone")}\nEmail: ${value("email")}\nTopic: ${topic}\n\n${value("note")}\n\nRegards,\n${value("fullName")}`;
    setDraft({ subject, body, href: `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` });
  }

  return (
    <form onSubmit={onSubmit} onChange={() => setDraft(null)} className="workflow-form rounded-[28px] border border-line bg-white shadow-[0_24px_60px_-36px_rgba(20,32,26,0.55)] p-6 sm:p-8 space-y-5">
      <div className="notice-banner"><strong>{isJob ? "Apply by email" : "Write to us by email"}</strong><p>Fill in your details to prepare an email to {siteConfig.contact.email}. You will need to press Send in your email app.</p>{isJob && <p><strong>Attach your résumé or profile directly in the email app before sending.</strong> This page does not upload files.</p>}</div>

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
        type="submit"
        className="inline-flex items-center px-6 py-3 rounded-full bg-moss text-sage text-sm font-medium hover:bg-pine disabled:opacity-60"
      >
        Prepare email
      </button>
      {draft && <div className="email-draft-panel">
        <div role="status" className="notice-banner"><strong>Email prepared — not sent yet.</strong><p>Open your email app below, review the draft{isJob ? ", attach your résumé if needed," : ""} and press Send.</p></div>
        <a className="button" href={draft.href}>Open email app ↗</a>
        <details className="mt-5"><summary className="cursor-pointer py-3 font-bold">No email app? Copy the details into Gmail or Outlook</summary><p className="mt-3">To: <strong>{siteConfig.contact.email}</strong></p><p className="my-3">Subject: {draft.subject}</p><label className="block">Email message<textarea readOnly value={draft.body} rows={9} className="w-full border border-line rounded-lg p-3 mt-2" onFocus={e => e.target.select()} /></label><p className="mt-3">The website cannot confirm email delivery. Check your email app’s Sent folder after sending.</p></details>
      </div>}
    </form>
  );
}
