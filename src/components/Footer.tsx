import { siteConfig } from "@/lib/site-config";
import { MailIcon, PhoneIcon, PinIcon } from "./icons";
import ContourLines from "./ContourLines";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-24 bg-pine text-sage overflow-hidden">
      <ContourLines tone="sage" className="absolute inset-0 w-full h-full opacity-60" />
      <div className="relative max-w-5xl mx-auto px-5 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl mb-2">{siteConfig.shortName}</p>
          <p className="text-sage/70 text-sm leading-relaxed max-w-xs">
            {siteConfig.tagline}.
          </p>
        </div>

        <div className="text-sm space-y-3">
          <p className="label text-sage/50 mb-3">Get in touch</p>
          <p className="flex items-center gap-2">
            <MailIcon className="w-4 h-4 text-ochre" />
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-ochre transition-colors">
              {siteConfig.contact.email}
            </a>
          </p>
          {!siteConfig.contact.phone.startsWith("REPLACE_WITH_") && (
            <p className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-ochre" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-ochre transition-colors">
                {siteConfig.contact.phone}
              </a>
            </p>
          )}
          {!siteConfig.contact.address.startsWith("REPLACE_WITH_") && (
            <p className="flex items-start gap-2">
              <PinIcon className="w-4 h-4 text-ochre mt-0.5" />
              <span>{siteConfig.contact.address}</span>
            </p>
          )}
        </div>

        <div>
          <p className="label text-sage/50 mb-3">Follow</p>
          <SocialLinks />
        </div>
      </div>

      <div className="relative border-t border-sage/10">
        <p className="max-w-5xl mx-auto px-5 py-5 text-xs text-sage/50">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
