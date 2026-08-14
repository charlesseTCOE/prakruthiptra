import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
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
    <article className="max-w-2xl mx-auto px-5 py-20">
      <Link href="/blog" className="label text-moss-2 hover:text-ochre transition-colors">
        ← All posts
      </Link>

      {post.date && (
        <p className="label text-moss-2/70 mt-8 mb-3">
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}
      <h1 className="font-display text-3xl sm:text-4xl text-moss mb-8">{post.title}</h1>

      <div
        className="prose-content text-moss-2 leading-relaxed space-y-4 [&_a]:text-clay [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
