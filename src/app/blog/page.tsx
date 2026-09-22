import { getAllPosts } from "@/lib/posts";
import PostExplorer from "@/components/PostExplorer";
export const metadata = { title: "Updates & notices — PTRA", description: "Community announcements, civic guides, and news from Prakruthi Township Residents Association." };
export default function BlogIndex() {
 return <section className="shell section updates-page"><p className="eyebrow">THE COMMUNITY NOTICEBOARD</p><h1>Updates &amp; notices<span className="brand-dot">.</span></h1><p className="page-intro">A little news. A useful guide. Everything that keeps us connected.</p><PostExplorer posts={getAllPosts()}/></section>;
}
