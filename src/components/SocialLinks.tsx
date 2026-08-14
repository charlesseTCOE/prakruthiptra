import { siteConfig } from "@/lib/site-config";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "./icons";

type Props = {
  className?: string;
  iconClassName?: string;
};

export default function SocialLinks({ className = "", iconClassName }: Props) {
  const links = [
    { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: siteConfig.social.twitter, label: "X / Twitter", Icon: XIcon },
    { href: siteConfig.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  ];

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`PTRA on ${label}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-current/20 hover:bg-ochre hover:text-pine hover:border-ochre transition-colors"
          >
            <Icon className={iconClassName ?? "w-4.5 h-4.5"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
