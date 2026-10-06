import Link from "next/link";
import FeaturedJobs from "@/components/FeaturedJobs";
import AdvertiseHere from "@/components/AdvertiseHere";
import ChannelCards from "@/components/ChannelCards";
import PostCard from "@/components/PostCard";
import AdBoard from "@/components/AdBoard";
import UsefulLinks from "@/components/UsefulLinks";
import { LeafIcon, MegaphoneIcon, LinkIcon, MailIcon } from "@/components/icons";
import { getAllPosts } from "@/lib/posts";

const shortcuts = [
  {Icon: MegaphoneIcon, number: "01", title: "Community updates", text: "News & notices from PTRA", href: "/blog"},
  {Icon: LinkIcon, number: "02", title: "Resident resources", text: "Civic links & useful helplines", href: "/resources"},
  {Icon: MailIcon, number: "03", title: "Talk to the association", text: "Let’s stay connected", href: "/#contact"},
];
export const dynamic = "force-dynamic";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return <>
    <div className="hero-backdrop"><section className="hero shell">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> THE PTRA COMMUNITY</p>
        <h1>A neighbourhood.<br/>A community.<br/><em>A place to belong.</em></h1>
        <p className="hero-description">Welcome to Prakruthi Township Residents Association. Your home for community news, helpful resources, and the connections that bring us together.</p>
        <div className="hero-actions"><Link className="button" href="/blog">Explore the latest updates <span aria-hidden="true">↗</span></Link><Link href="/#about" className="text-link">Get to know PTRA <span aria-hidden="true">→</span></Link></div>
        <div className="hero-footnote"><LeafIcon className="w-4 h-4"/><span>Stronger together. Greener tomorrow.</span></div>
      </div><aside className="resident-desk"><p className="eyebrow">YOUR RESIDENT DESK</p><h2>How can we help?</h2><p>Useful contacts, community news and a direct connection to PTRA.</p><Link href="/resources"><strong>Helplines &amp; civic services</strong><span>Find the right contact for your concern →</span></Link><Link href="#job-postings"><strong>Jobs &amp; opportunities</strong><span>Explore an opportunity shared with residents →</span></Link><Link href="/apply"><strong>Write to the Office Bearers</strong><span>Share a question or a neighbourhood concern →</span></Link><div className="resident-desk-note">For immediate emergencies: <a href="tel:112">112</a></div></aside>
    </section></div>
    <section className="shell shortcuts" aria-label="Quick links">{shortcuts.map(({Icon,number,title,text,href}) => <Link href={href} key={number} className="shortcut"><span className="shortcut-icon"><Icon className="w-5 h-5"/></span><span><strong>{title}</strong><small>{text}</small></span><span className="shortcut-arrow" aria-hidden="true">↗</span></Link>)}</section>
    <FeaturedJobs />
    <AdvertiseHere />
    <section className="section shell" id="updates"><div className="section-heading"><div><p className="eyebrow">THE COMMUNITY NOTICEBOARD</p><h2>Good to know. Easy to find.</h2></div><Link href="/blog" className="text-link">All updates <span aria-hidden="true">↗</span></Link></div>
      <div className="post-grid">{posts.length ? posts.map(post => <PostCard key={post.slug} post={post}/>) : <p>Community updates will appear here soon.</p>}</div>
    </section>
    <section className="about-band" id="about"><div className="shell about-layout"><div className="about-emblem" aria-hidden="true"><LeafIcon className="w-16 h-16"/><span>OUR ROOTS.<br/>OUR COMMUNITY.</span></div><div><p className="eyebrow">A LITTLE ABOUT US</p><h2>Small actions.<br/>A stronger neighbourhood.</h2></div><div className="about-description"><p>PTRA represents the residents of Prakruthi Township on the things that shape everyday life — maintenance, security, civic services, and community events.</p><p>We bring announcements, practical information, and our official channels together, so staying connected feels simple.</p><Link className="text-link" href="/#contact">Connect with the association <span aria-hidden="true">↗</span></Link></div></div></section>
    <section className="section shell" id="channels"><div className="section-heading"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Your community, connected.</h2></div><p className="section-description">Follow PTRA and civic channels for announcements and service updates.</p></div><ChannelCards/></section>
    <AdBoard compact/>
    <UsefulLinks/>
  </>;
}
