# Prakruthi Township Residents Association — website

A minimal, responsive Next.js site: home page with a live X/Twitter feed and
social links, and a blog you can update by adding a markdown file.

## 1. Fill in your real details

Everything social/contact-related lives in **one file**:

```
src/lib/site-config.ts
```

Open it and replace the `REPLACE_WITH_...` placeholders with your real
Instagram handle, X/Twitter handle, email, phone, WhatsApp number and
address. The Facebook link is already set to `facebook.com/ptramemberofficial`.

The X/Twitter feed on the home page uses `siteConfig.social.twitterHandle`
(no `@`) — once that's a real handle, the live timeline will start showing
posts automatically. Until then the widget area will just be empty.

## 2. Add or edit blog posts

Posts live as plain markdown files in:

```
src/content/posts/
```

To add a new post, create a new file, e.g. `src/content/posts/my-update.md`:

```markdown
---
title: "Your post title"
date: "2026-08-20"
excerpt: "One or two sentences shown in the post list."
---

Your post content goes here, in normal markdown.
```

Save it, commit, and push — that's the whole workflow. No CMS, no login,
no database. Delete a file to remove a post.

## 3. Run it locally (optional)

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 4. Deploy to Vercel today (no domain needed yet)

**Recommended — GitHub + Vercel (auto-deploys every time you push):**

1. Create a new empty repo on GitHub (e.g. `ptra-site`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ptra-site.git
   git push -u origin main
   ```
3. Go to https://vercel.com → **Add New → Project** → import the
   `ptra-site` repo → click **Deploy**. Vercel auto-detects Next.js, no
   config needed.
4. You'll get a live URL immediately, like `ptra-site.vercel.app`.
5. From now on, every `git push` to `main` redeploys the live site
   automatically — this is what makes "updated often" easy: edit a
   markdown file, commit, push, done.

**Alternative — deploy straight from your machine without GitHub:**

```bash
npm install -g vercel
vercel login
vercel --prod
```

This works today too, but you'll need to re-run `vercel --prod` for every
future update instead of just `git push`.

## 5. Connect prakruthitownshipresidentsassociation.co.in once it's registered

`.co.in` domains are managed under the `.in` registry (NIXI) and are
usually registered through a registrar such as GoDaddy, BigRock, Namecheap,
or Google Domains resellers. Typical steps:

1. **Register the domain** with any `.co.in`-supporting registrar. You'll
   need basic KYC (name, address, ID) — standard for `.in` domains.
2. In your Vercel project → **Settings → Domains**, add
   `prakruthitownshipresidentsassociation.co.in`.
3. Vercel will show you DNS records to add at your registrar — typically:
   - an **A record** for the root domain pointing to Vercel's IP, or
   - a **CNAME** for `www` pointing to `cname.vercel-dns.com`
   (Vercel shows the exact current values on the Domains page — use those,
   they can change).
4. Add those records in your registrar's DNS panel. Propagation is usually
   under an hour but can take up to 24–48 hours for `.co.in`.
5. Vercel issues an SSL certificate automatically once DNS resolves — no
   extra steps needed for HTTPS.

Until step 5 is done, the `*.vercel.app` URL from step 4 above is your live
site — share that today, and swap in the custom domain once it resolves.

## Security notes

- Security headers (CSP, HSTS, X-Frame-Options, etc.) are set in
  `next.config.ts` and applied automatically on every deploy — no server
  to maintain, since this is a fully static/serverless Next.js site on
  Vercel.
- No database, no login form, no user input anywhere on the site — this
  removes most common attack surfaces by design.
- HTTPS is enforced automatically by Vercel on both the `.vercel.app` URL
  and the custom domain once connected.
