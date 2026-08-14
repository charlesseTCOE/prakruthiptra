const columns = [
  {
    title: "Civic authorities",
    links: [
      { label: "GBA — Greater Bengaluru Authority", href: "https://gba.karnataka.gov.in/" },
      { label: "BBMP — Bruhat Bengaluru Mahanagara Palike", href: "https://site.bbmp.gov.in/" },
      { label: "BWSSB — Bangalore Water Supply & Sewerage Board", href: "https://bwssb.karnataka.gov.in/english" },
    ],
  },
  {
    title: "Grievance portals",
    links: [
      { label: "BBMP Sahaaya 2.0 — file a civic complaint", href: "https://sahaaya2.bbmpgov.in/" },
      { label: "BWSSB Complaint Management System", href: "https://cms.bwssb.gov.in/module/complain/new_complaint" },
    ],
  },
  {
    title: "Helplines",
    links: [
      { label: "BBMP (civic issues) — 1533", href: "tel:1533" },
      { label: "BWSSB (water/sewage) — 1916", href: "tel:1916" },
      { label: "BESCOM (power) — 1912", href: "tel:1912" },
      { label: "Fire — 101", href: "tel:101" },
      { label: "Ambulance — 108", href: "tel:108" },
    ],
  },
];

export default function UsefulLinks() {
  return (
    <section className="bg-[#eaf2fb] border-y border-[#c7dcf0]">
      <div className="max-w-5xl mx-auto px-5 py-16 grid gap-10 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-[#4a6b8a] text-sm tracking-[0.15em] uppercase pb-3 mb-4 border-b border-[#c7dcf0]">
              {col.title}
            </h2>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("tel:") ? undefined : "_blank"}
                    rel={link.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                    className="text-sm text-[#2f4a63] leading-relaxed hover:text-[#2f6fad] hover:underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
