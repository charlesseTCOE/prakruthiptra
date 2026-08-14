import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — PTRA",
};

const accents = ["border-ochre", "border-clay", "border-moss"];

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <p className="label text-clay mb-3">Blog</p>
      <h1 className="font-display text-4xl text-moss mb-12">Updates &amp; notices</h1>

      {posts.length === 0 ? (
        <p className="text-moss-2">No posts yet — check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={`group block bg-white rounded-xl border border-line border-l-4 ${accents[i % accents.length]} shadow-sm hover:shadow-md hover:-translate-x-0.5 transition-all p-6`}
              >
                {post.date && (
                  <p className="label text-moss-2/70 mb-2">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
                <h2 className="font-display text-2xl text-moss group-hover:text-clay transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-moss-2 leading-relaxed">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
