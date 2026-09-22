import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, postCategory } from "@/lib/post-utils";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return { title: "Update not found — PTRA" };
  const post = await getPostBySlug(slug);
  return { title: `${post.title} — PTRA`, description: post.excerpt };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <article className="article-page">
      <Link href="/blog" className="label text-moss-2 hover:text-ochre transition-colors">
        ← All posts
      </Link>

      {post.date && (
        <p className="label text-moss-2/70 mt-8 mb-3">
          {formatPostDate(post.date)}
        </p>
      )}
      <h1 className="font-display text-3xl sm:text-4xl text-moss mb-8">{post.title}</h1>

      {postCategory(slug) === "Voter information" && <aside className="article-notice">Archived community update from {formatPostDate(post.date)}. Dates and procedures may have changed. Check the <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">Election Commission portal</a> for current information.</aside>}

      <div
        className="prose-content text-moss-2 leading-relaxed space-y-4 [&_a]:text-clay [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
