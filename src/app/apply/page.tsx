import ApplyForm from "@/components/ApplyForm";

export const metadata = {
  title: "Write to the committee — PTRA",
};

export default function ApplyPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_80%_0%,rgba(146,38,58,0.06),transparent)]" />
      <div className="relative max-w-3xl mx-auto px-5 py-16">
        <p className="label text-clay mb-3">Committee desk</p>
        <h1 className="font-display text-4xl sm:text-5xl text-moss max-w-xl leading-[1.08]">
          Write to the association.
        </h1>
        <p className="mt-4 max-w-xl text-moss-2 leading-relaxed">
          Introductions, vendor notes, housing or a question for the committee.
          Prepare an email to the PTRA Office Bearers, then send it from your email app. Preparing a draft does not submit or publish your message.
        </p>
        <div className="mt-10">
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}
