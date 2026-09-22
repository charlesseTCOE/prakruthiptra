import Link from "next/link";
import type { ApplicationRecord } from "@/lib/drive";

export default function ListingRail({
  title,
  href,
  icon,
  items,
  empty,
  tone = "moss",
  onDark = false,
}: {
  title: string;
  href: string;
  icon: string;
  items: ApplicationRecord[];
  empty: string;
  tone?: "moss" | "ochre";
  onDark?: boolean;
}) {
  const accent = onDark
    ? "text-sage border-sage/20 bg-sage/8"
    : tone === "ochre"
      ? "text-moss border-ochre/30 bg-ochre/8"
      : "text-moss border-line bg-white";

  return (
    <aside className={`rounded-[28px] border ${accent} p-4 lg:p-5`}>
      <div className="flex items-center justify-between gap-2 mb-4">
        <p className="label text-clay inline-flex items-center gap-2">
          <i className={icon} aria-hidden="true" />
          {title}
        </p>
        <Link href={href} className={`text-xs ${onDark ? "text-sage/60 hover:text-ochre" : "text-moss-2 hover:text-ochre"}`}>
          All →
        </Link>
      </div>
      {items.length === 0 ? (
        <p className={`text-sm leading-relaxed ${onDark ? "text-sage/65" : "text-moss-2"}`}>{empty}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((row) => (
            <li key={row.id} className={`rounded-2xl p-3 border ${onDark ? "bg-pine/40 border-sage/15" : "bg-white/80 border-line/70"}`}>
              <p className={`font-display leading-snug ${onDark ? "text-sage" : "text-moss"}`}>{row.listingTitle || row.topic}</p>
              <p className={`text-xs mt-1 line-clamp-3 ${onDark ? "text-sage/60" : "text-moss-2"}`}>{row.note}</p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
