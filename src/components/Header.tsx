"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { LeafIcon } from "./icons";

const links = [{ href: "/", label: "Home" }, { href: "/#about", label: "Our community" }, { href: "/blog", label: "Updates" }, { href: "/resources", label: "Resources" }, { href: "/jobs", label: "Jobs / Apply" }, { href: "/advertise", label: "Advertise" }, { href: "/apply", label: "Write to us" }];
export default function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  return <header className="site-header" onKeyDown={e => { if (e.key === "Escape") { setOpen(false); button.current?.focus(); } }}>
    <div className="shell header-inner">
      <Link href="/" className="brand" aria-label="PTRA home" onClick={() => setOpen(false)}>
        <span className="brand-mark"><LeafIcon className="w-6 h-6" /></span>
        <span><strong>PTRA<span className="brand-dot">.</span></strong><small>Prakruthi Township</small></span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">{links.map(link => <Link key={link.href} href={link.href} className={link.href === "/jobs" ? "jobs-nav" : undefined} aria-current={link.href === pathname ? "page" : undefined}>{link.label}</Link>)}</nav>
      <Link href="/#contact" className="button button-small header-contact">Get in touch <span aria-hidden="true">↗</span></Link>
      <button ref={button} type="button" className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? "Close ×" : "Menu ☰"}</button>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!open}>{[...links, {href: "/#contact", label: "Get in touch"}].map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></Link>)}</nav>
  </header>;
}
