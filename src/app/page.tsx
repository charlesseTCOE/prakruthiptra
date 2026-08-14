import Link from "next/link";
import ContourLines from "@/components/ContourLines";
import SocialLinks from "@/components/SocialLinks";
import ChannelCards from "@/components/ChannelCards";
import SirAlert from "@/components/SirAlert";
import UsefulLinks from "@/components/UsefulLinks";
import { LeafIcon, MegaphoneIcon, RssIcon, LinkIcon, CalendarIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

const whatsHere = [
  { Icon: MegaphoneIcon, text: "Committee announcements & notices" },
  { Icon: RssIcon, text: "Civic updates — GBA, BESCOM & more" },
  { Icon: LinkIcon, text: "All our official channels in one place" },
  { Icon: CalendarIcon, text: "A blog updated as things happen" },
];

const cardAccents = ["bg-ochre", "bg-clay", "bg-moss"];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <SirAlert />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <ContourLines tone="moss" className="absolute -bottom-10 left-0 w-full h-[260px] opacity-50" />
        <div className="relative max-w-5xl mx-auto px-5 pt-16 pb-24">
          <span className="inline-flex items-center gap-2 label text-clay bg-ochre/10 border border-ochre/25 rounded-full px-3.5 py-1.5 mb-6">
            <LeafIcon className="w-3.5 h-3.5" />
            {siteConfig.shortName} · Community site
          </span>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] max-w-3xl text-moss">
            Welcome to <span className="text-clay">Prakruthi Township</span>{" "}
            Residents Association.
          </h1>
          <p className="mt-6 max-w-lg text-moss-2 leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center px-5 py-3 bg-moss text-sage rounded-full text-sm font-medium shadow-sm hover:bg-pine hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              Read the latest updates
            </Link>
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto px-5 py-16 grid gap-10 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
        <div>
          <p className="label text-clay mb-3">About</p>
          <h2 className="font-display text-2xl text-moss mb-3">Who we are</h2>
          <p className="text-moss-2 leading-relaxed">
            The {siteConfig.name} represents residents on matters that affect
            daily life in the township — maintenance, security, civic services
            and community events. This site collects our announcements and
            social updates in one place.
          </p>
        </div>
        <div className="hidden sm:block w-px bg-line self-stretch" aria-hidden="true" />
        <div>
          <p className="label text-clay mb-3">What&apos;s here</p>
          <ul className="space-y-3">
            {whatsHere.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-moss-2 leading-relaxed">
                <span className="flex-none inline-flex items-center justify-center w-8 h-8 rounded-full bg-moss/8 text-moss">
                  <Icon className="w-4 h-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Channels */}
      <section className="bg-sage-deep border-y border-line">
        <div className="max-w-5xl mx-auto px-5 py-16">
          <p className="label text-clay mb-3">Stay in the loop</p>
          <h2 className="font-display text-2xl text-moss mb-3">Updates that matter to residents</h2>
          <p className="text-moss-2 leading-relaxed max-w-lg mb-10">
            City-wide civic news from the Greater Bengaluru Authority, planned
            power cuts from BESCOM, and our own township announcements.
          </p>
          <ChannelCards />
        </div>
      </section>

      {/* Blog preview */}
      <section className="max-w-5xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label text-clay mb-3">Blog</p>
            <h2 className="font-display text-2xl text-moss">Latest from the association</h2>
          </div>
          <Link href="/blog" className="label text-moss-2 hover:text-ochre transition-colors whitespace-nowrap">
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-moss-2">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-xl border border-line shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className={`h-1.5 ${cardAccents[i % cardAccents.length]}`} />
                <div className="p-5">
                  {post.date && (
                    <p className="label text-moss-2/70 mb-2">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <h3 className="font-display text-lg text-moss group-hover:text-clay transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-moss-2 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <UsefulLinks />
    </>
  );
}
