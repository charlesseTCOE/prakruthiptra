import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function AdvertiseHere() {
  const body = "Business or service name:\nHeadline:\nAdvertisement details:\nContact number:\nPreferred dates:\n\nPlease share availability and advertising rates.";
  const href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Advertise on PTRA")}&body=${encodeURIComponent(body)}`;
  return <section className="shell advertise-home" aria-labelledby="advertise-home-title">
    <div className="advertise-home-panel"><div><p className="eyebrow">YOUR BUSINESS. OUR NEIGHBOURHOOD.</p><h2 id="advertise-home-title">Advertise here.</h2><p>Reach Prakruthi Township residents with your local business, services, property listing or community event.</p><p className="advertise-home-note">Send your advertisement to the Office Bearers for review. Ask about availability and rates.</p></div><div className="advertise-home-actions"><a className="button" href={href}>Enquire about advertising <span aria-hidden="true">↗</span></a><Link className="text-link" href="/advertise">See advertising details →</Link></div></div>
  </section>;
}
