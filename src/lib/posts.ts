import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: String(data.title ?? slug),
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      category: String(data.category ?? ""),
    };
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string) {
  if (!getPostSlugs().includes(slug)) throw new Error("Post not found");
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: String(data.title ?? slug),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    category: String(data.category ?? ""),
    contentHtml,
  };
}
