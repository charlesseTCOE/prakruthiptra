import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-sage/90 backdrop-blur border-b border-line">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight text-moss">
          {siteConfig.shortName}
          <span className="hidden sm:inline text-moss-2 font-body text-sm font-normal ml-2">
            Residents Association
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 label text-moss-2">
          <Link href="/#about" className="hover:text-ochre transition-colors">About</Link>
          <Link href="/blog" className="hover:text-ochre transition-colors">Blog</Link>
          <Link href="/#contact" className="hover:text-ochre transition-colors">Contact</Link>
        </nav>

        <SocialLinks iconClassName="w-4 h-4" />
      </div>
    </header>
  );
}
