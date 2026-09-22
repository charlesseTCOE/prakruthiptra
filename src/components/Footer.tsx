import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { LeafIcon } from "./icons";
import SocialLinks from "./SocialLinks";
export default function Footer() {
 return <footer id="contact" className="site-footer"><div className="shell">
   <div className="footer-top"><div><p className="eyebrow">LET’S KEEP IN TOUCH</p><h2>A better neighbourhood<br/>starts with a conversation.</h2></div><a className="button button-light" href={`mailto:${siteConfig.contact.email}`}>Email the association <span aria-hidden="true">↗</span></a></div>
   <div className="footer-grid"><div><Link href="/" className="brand"><span className="brand-mark"><LeafIcon className="w-6 h-6"/></span><span><strong>PTRA.</strong><small>Prakruthi Township</small></span></Link><p className="footer-description">Prakruthi Township Residents Association.<br/>Coming together for the place we call home.</p></div>
   <div><h3>Explore</h3><Link href="/#about">Our community</Link><Link href="/blog">Updates & notices</Link><Link href="/resources">Resident resources</Link><Link href="/jobs">Jobs / Apply</Link><Link href="/advertise">Advertise</Link><Link href="/apply">Write to us</Link><Link href="/admin" className="office-bearers-link">Admin · Office Bearers only</Link></div>
   <div><h3>Contact</h3><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>{!siteConfig.contact.phone.startsWith("REPLACE_WITH_") && <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>}{!siteConfig.contact.address.startsWith("REPLACE_WITH_") && <p>{siteConfig.contact.address}</p>}<div className="footer-social"><SocialLinks/></div></div></div>
   <div className="footer-bottom"><span>© {new Date().getFullYear()} PTRA. All rights reserved.</span><span>Made for our community. With care.</span></div>
 </div></footer>;
}
