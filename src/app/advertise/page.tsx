import AdBoard from "@/components/AdBoard";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Advertise — PTRA",
};

const rates = [
  { slot: "Classified listing", detail: "Housing, services, jobs, events", term: "30 days" },
  { slot: "Featured partner banner", detail: "Top of the advertise page + home strip", term: "Quarter" },
  { slot: "Festival / event stall", detail: "On-ground + site mention", term: "Per event" },
];

export default function AdvertisePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(800px_320px_at_10%_0%,rgba(146,38,58,0.06),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-5 py-16">
          <p className="label text-clay mb-3">Advertise with PTRA</p>
          <h1 className="font-display text-4xl sm:text-5xl text-moss max-w-2xl leading-[1.08]">
            Reach every household in Prakruthi Township.
          </h1>
          <p className="mt-4 max-w-xl text-moss-2 leading-relaxed">
            A classifieds board for the township — partners on top, listings
            underneath, published only after the committee reads them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Housing", "Services", "Jobs", "Events", "Community"].map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full border border-line bg-white text-sm text-moss-2">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14">
        <p className="label text-clay mb-3">How it works</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Write the ad", "Headline + short copy + a number people can call."],
            ["2", "Email the desk", "prakruthiptra@gmail.com — subject line Advertise."],
            ["3", "We publish", "After a quick check it appears here and on the home board."],
          ].map(([n, t, d]) => (
            <article key={n} className="rounded-3xl border border-line bg-white p-5">
              <p className="font-display text-2xl text-ochre">{n}</p>
              <h2 className="font-display text-xl text-moss mt-1">{t}</h2>
              <p className="text-sm text-moss-2 mt-2">{d}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-3xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-sage-deep text-left text-moss">
              <tr>
                <th className="px-5 py-3 font-medium">Slot</th>
                <th className="px-5 py-3 font-medium">What it is</th>
                <th className="px-5 py-3 font-medium">Run</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((row) => (
                <tr key={row.slot} className="border-t border-line">
                  <td className="px-5 py-3 text-moss">{row.slot}</td>
                  <td className="px-5 py-3 text-moss-2">{row.detail}</td>
                  <td className="px-5 py-3 text-moss-2">{row.term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-moss-2">
          Ask the committee for current availability and the rate card.
        </p>
      </section>

      <AdBoard />
    </>
  );
}
