import Link from "next/link";
import { MegaphoneIcon } from "./icons";

// Time-sensitive notice shown prominently on the home page. When SIR season
// is over, either update the copy/dates for the next notice or remove
// <SirAlert /> from src/app/page.tsx.
export default function SirAlert() {
  return (
    <div className="bg-pine text-sage">
      <div className="max-w-5xl mx-auto px-5 py-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-2 label text-ochre">
          <MegaphoneIcon className="w-4 h-4" />
          SIR 2026
        </span>
        <p className="text-sm flex-1 min-w-[200px]">
          Is your name on the voter rolls? Enumeration closes{" "}
          <strong className="text-ochre">17 August</strong> — check your status
          in under a minute.
        </p>
        <Link
          href="/blog/how-to-check-your-sir-status"
          className="inline-flex items-center px-4 py-1.5 bg-ochre text-pine rounded-full text-sm font-medium hover:bg-sage transition-colors whitespace-nowrap"
        >
          How to check →
        </Link>
      </div>
    </div>
  );
}
