import ApplyForm from "@/components/ApplyForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Jobs — PTRA",
};

export default function JobsPage() {

  return (
    <>
      <section className="workflow-heading">
        <div className="max-w-7xl mx-auto px-5 py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
          <div>
            <p className="label text-ochre mb-3">Township jobs</p>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] max-w-xl">
              Work in and around Prakruthi.
            </h1>
            <p className="mt-4 text-moss-2 max-w-lg leading-relaxed">
              Household help, tutoring, site work and resident-to-resident roles.
              Introduce yourself using the application form below.
            </p>
          </div>
          <Link
            href="#apply"
            className="justify-self-start lg:justify-self-end inline-flex px-5 py-3 rounded-full bg-pine text-white text-sm font-medium"
          >
            Apply for local work
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-14">
        <section id="apply">
          <p className="label text-clay mb-3">YOUR APPLICATION</p>
          <h2 className="font-display text-3xl text-moss mb-2">Tell us about yourself.</h2>
          <p className="text-moss-2 mb-6">Share your experience and optionally attach a résumé or profile.</p>
          <ApplyForm defaultTopic="Jobs / local work" />
        </section>
      </section>
    </>
  );
}
