import { siteConfig } from "@/lib/site-config";
import { XIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from "./icons";

// Reliable "follow us" cards — no dependence on X's embed widget, which
// frequently refuses to render timelines for logged-out visitors.
const channels = [
  {
    name: "Greater Bengaluru Authority",
    handle: "@GBA_office",
    href: siteConfig.civicFeeds.gba.url,
    blurb: "Civic notices and city-wide announcements from the Greater Bengaluru Authority.",
    Icon: XIcon,
    accent: "bg-moss",
  },
  {
    name: "BESCOM",
    handle: "@NammaBESCOM",
    href: siteConfig.civicFeeds.bescom.url,
    blurb: "Planned power cuts, outage alerts, and electricity updates for Bengaluru — check before you plan your day.",
    Icon: XIcon,
    accent: "bg-ochre",
  },
  {
    name: "PTRA — official",
    handle: "@PTRAOfficialAcc",
    href: siteConfig.social.twitter,
    blurb: "Our own announcements post here first. Follow to get township updates as they happen.",
    Icon: XIcon,
    accent: "bg-clay",
  },
];

const followRow = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
];

export default function ChannelCards() {
  return (
    <div>
      <div className="social-feature"><div><span className="tag">PTRA ON X / TWITTER</span><h3>Neighbourhood news.<br/>An ongoing conversation.</h3><p>Open our X profile for PTRA posts and announcements. Explore the civic channels below for wider Bengaluru updates.</p><a className="button" href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">Open @PTRAOfficialAcc ↗</a></div><div className="spaces-panel"><span className="eyebrow">X SPACES · COMMUNITY CONVERSATIONS</span><h3>Listen. Share. Stay connected.</h3><p>{siteConfig.xSpace ? siteConfig.xSpace.title : "Any upcoming PTRA audio conversations will be announced on our X profile. No Space is currently listed on this website."}</p><a className="text-link" href={siteConfig.xSpace?.url ?? siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">{siteConfig.xSpace ? "Open the Space ↗" : "Check PTRA announcements ↗"}</a></div></div>
      <div className="section-heading"><div><p className="eyebrow">COMMUNITY & CIVIC CHANNELS</p><p className="directory-note">These links open on X. Sign-in may be required; posts are not mirrored on this website.</p></div></div>
      <div className="channel-grid">
        {channels.map(({ name, handle, href, blurb, Icon, accent }) => (
          <a
            key={handle}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card group flex flex-col"
          >
            <div className={`channel-accent ${accent}`} />
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-pine text-sage">
                  <Icon className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-display text-moss leading-tight">{name}</p>
                  <p className="text-xs text-moss-2/80">{handle}</p>
                </div>
              </div>
              <p className="text-sm text-moss-2 leading-relaxed flex-1">{blurb}</p>
              <p className="label text-clay mt-4 group-hover:text-ochre transition-colors">
                View updates →
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-sm text-moss-2">Also find us on</span>
        {followRow.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-white text-sm text-moss hover:border-ochre hover:text-clay shadow-sm transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
