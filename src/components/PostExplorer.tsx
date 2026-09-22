"use client";
import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { postCategory } from "@/lib/post-utils";
import PostCard from "./PostCard";
export default function PostExplorer({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All updates");
  const categories = ["All updates", ...new Set(posts.map(post => postCategory(post.slug, post.category)))];
  const filtered = posts.filter(post => (category === "All updates" || postCategory(post.slug, post.category) === category) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><div className="updates-tools"><div className="filter-tabs" role="group" aria-label="Filter updates">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><span className="sr-only">Search updates</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search updates…"/></label></div><p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? "update" : "updates"}</p><div className="post-grid">{filtered.map(post => <PostCard post={post} key={post.slug}/>)}</div>{!filtered.length && <div className="empty-state"><h2>No matching updates</h2><p>Try a different search or browse all community updates.</p><button className="button" onClick={() => {setQuery(""); setCategory("All updates");}}>Clear filters</button></div>}</>;
}
