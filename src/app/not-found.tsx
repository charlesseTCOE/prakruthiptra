import Link from "next/link";
export default function NotFound() { return <section className="shell section empty-state"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>Let’s get you back home.</h1><p>This page may have moved, or the link may be incorrect.</p><Link href="/" className="button">Back to PTRA →</Link></section>; }
