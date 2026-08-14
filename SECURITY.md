# Security

This site is intentionally simple, which is itself a security measure —
fewer moving parts means fewer things that can be attacked.

- **No backend, no database, no login.** The whole site is pre-rendered
  static HTML at build time. There's no server-side code processing user
  input, so there's no SQL injection, no auth to breach, and no user data
  stored anywhere.
- **No forms.** Nothing on the site accepts input from visitors.
- **HTTPS everywhere**, enforced via HSTS (`Strict-Transport-Security`),
  automatically on Vercel.
- **Content-Security-Policy** locked down to `self` plus the specific
  Twitter/X domains needed for the embedded feed — no other third-party
  scripts can run even if injected.
- **Clickjacking protection** via `X-Frame-Options: SAMEORIGIN` and
  `frame-ancestors 'self'`.
- **MIME-sniffing protection** via `X-Content-Type-Options: nosniff`.
- No `X-Powered-By` header (removes a low-value fingerprinting signal).

## Keeping it that way

- Only add npm packages you actually need — each dependency is code you're
  trusting. Run `npm audit` occasionally.
- If you ever add a contact form, comment box, or anything else that takes
  visitor input, that changes the threat model — come back and revisit
  this file (and the CSP in `next.config.ts`) before shipping it.
- Only people with push access to the GitHub repo (or direct Vercel
  access) can change the live site — treat repo access the same way
  you'd treat a website admin password.
- Keep dependencies updated: `npm outdated`, then `npm update`, then
  rebuild and check the site still looks right before pushing.
