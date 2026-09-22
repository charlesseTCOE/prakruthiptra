# Security

Threat model now includes a public form, an admin cookie, and Google Drive uploads. The site still has no application database.

## Controls in place

- HTTPS + HSTS on Vercel
- CSP default `self`; Font Awesome CSS/fonts only from cdnjs (hashed stylesheet)
- `X-Frame-Options: SAMEORIGIN`, `frame-ancestors 'self'`
- `X-Content-Type-Options: nosniff`
- `poweredByHeader: false`
- Admin: only `ADMIN_EMAIL_1` / `ADMIN_EMAIL_2` + `ADMIN_PASSWORD`
- Cookie: HttpOnly, SameSite=Strict, 24h, timing-safe compare
- Jobs files: PDF/Word only, 8 MB cap, Jobs topic only
- Filenames sanitised before Drive write
- Drive folder must stay private (share with the service account + committee only)
- No Gmail password stored

## What submissions do **not** do

They do **not** land in prakruthiptra@gmail.com by themselves.  
They land in the Google Drive folder set by `GOOGLE_DRIVE_FOLDER_ID`.  
Committee reads them in Drive or at `/admin`.

`prakruthiptra@gmail.com` is still the public address for advertise requests and ordinary mail.

## Before every release

1. `npm audit`
2. Confirm `.env.local` and service-account JSON are not in git
3. Confirm the Drive folder is not “anyone with the link”
4. Rotate `ADMIN_PASSWORD` when an office-bearer leaves
