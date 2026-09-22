import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatPostDate, postCategory } from "@/lib/post-utils";
export default function PostCard({ post }: { post: PostMeta }) {
  return <Link className="post-card" href={`/blog/${post.slug}`}>
    <div className="post-meta"><span className="tag">{postCategory(post.slug, post.category)}</span><span>{formatPostDate(post.date)}</span></div>
    <h3>{post.title}</h3><p>{post.excerpt}</p>
    <span className="card-link">Read update <span aria-hidden="true">↗</span></span>
  </Link>;
}
