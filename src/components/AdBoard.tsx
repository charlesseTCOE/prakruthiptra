import Link from "next/link";
import { sponsorSlots } from "@/lib/ads";
import { listPublished } from "@/lib/drive";

export default async function AdBoard({ compact = false }: { compact?: boolean }) {
  const { items: published, unavailable } = await listPublished("advertise")
    .then(items => ({ items, unavailable: false }))
    .catch(() => ({ items: [], unavailable: true }));
  const list = compact ? published.slice(0, 4) : published;

  return (
    <section id="ads" className="max-w-7xl mx-auto px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="label text-clay mb-3">Advertise</p>
          <h2 className="font-display text-3xl sm:text-4xl text-moss">Township classifieds</h2>
          <p className="mt-2 text-moss-2 max-w-xl">
            Housing, services, jobs and events — a public noticeboard for Prakruthi,
            not a WhatsApp scroll.
          </p>
        </div>
        <Link
          href="/advertise"
          className="inline-flex items-center px-4 py-2 rounded-full bg-moss text-sage text-sm hover:bg-pine transition-colors"
        >
          See all ads
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-8">
        {sponsorSlots.map((slot) => (
          <article
            key={slot.id}
            className="relative overflow-hidden rounded-3xl border border-ochre/30 bg-gradient-to-br from-ochre/18 via-white to-clay/10 p-6"
          >
            <p className="label text-clay mb-2">{slot.label}</p>
            <h3 className="font-display text-xl text-moss mb-2">{slot.headline}</h3>
            <p className="text-sm text-moss-2 leading-relaxed">{slot.body}</p>
          </article>
        ))}
        <article className="rounded-3xl border border-dashed border-line bg-sage-deep p-6 flex flex-col justify-between">
          <div>
            <p className="label text-moss-2 mb-2">Place a listing</p>
            <h3 className="font-display text-xl text-moss mb-2">Email the copy</h3>
            <p className="text-sm text-moss-2">
              Send headline, 40–80 words and a contact number to prakruthiptra@gmail.com.
              The committee publishes after a quick check.
            </p>
          </div>
          <a
            href="mailto:prakruthiptra@gmail.com?subject=Advertise%20on%20PTRA"
            className="mt-4 text-sm text-clay hover:text-ochre"
          >
            prakruthiptra@gmail.com →
          </a>
        </article>
      </div>

      {list.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-white p-8 text-moss-2">
          <p className="font-display text-xl text-moss mb-2">{unavailable ? "Listings temporarily unavailable" : "No listings yet"}</p>
          <p className="text-sm">{unavailable ? "Please try again later or email the association." : "The committee has not published a classified. Email prakruthiptra@gmail.com to place one."}</p>
        </div>
      ) : (
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((ad) => (
          <article
            key={ad.id}
            className="rounded-3xl border border-line bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="label text-ochre">{ad.listingCategory || "Community"}</span>
              <span className="text-xs text-moss-2/70">
                {ad.approvedAt ? new Date(ad.approvedAt).toLocaleDateString("en-IN") : ""}
              </span>
            </div>
            <h3 className="font-display text-lg text-moss">{ad.listingTitle || ad.topic}</h3>
            <p className="mt-2 text-sm text-moss-2 leading-relaxed">{ad.note}</p>
            <p className="mt-3 text-xs text-moss-2/80">Contact · {ad.phone ? <a href={`tel:${ad.phone}`} className="underline underline-offset-4">{ad.phone}</a> : ad.email ? <a href={`mailto:${ad.email}`} className="underline underline-offset-4">{ad.email}</a> : "Committee desk"}</p>
          </article>
        ))}
      </div>
      )}
    </section>
  );
}
