# PTRA community website

White-and-red Next.js website for Prakruthi Township Residents Association. Includes a responsive homepage, searchable updates, a searchable resident directory, and X/social channel links.

## Run locally

Use Node.js 20.9 or newer and npm. From this folder:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run lint
npm run build
npm run start
```

The project retains the supplied Next.js/React versions and lockfile. The supplied Jobs/Admin version adds googleapis and nodemailer; these are retained and the lockfile has been updated. Fonts use native system/serif stacks and the illustration is local SVG, so there are no external font or image downloads during builds.

## What changed

- White surfaces, elegant crimson accents and subtle blush section backgrounds; original vector community illustration and leaf favicon.
- Mobile navigation with expanded state, Escape handling and close-on-navigation.
- Searchable, category-filtered blog with empty-state reset and accessible result count.
- Dedicated `/resources` page: 9 tap-to-call helplines, filters, search and 9 civic portals.
- Expanded X section with PTRA, GBA and BESCOM links; Facebook, Instagram and YouTube retained.
- Configurable X Spaces panel with an honest empty state until a real Space is supplied.
- Six new resident guides combined with the nine posts from the newly supplied source: 15 articles in total.
- Expired August promotion removed from the homepage. Legacy voter posts have dated archive notices.
- Article-specific metadata, deterministic post ordering, date normalization and a slug allowlist before filesystem access.
- Custom 404 page, responsive article typography and reduced-motion support.

## Update content

| Content | File |
| --- | --- |
| Association name, canonical URL, email, social accounts, optional X Space | `src/lib/site-config.ts` |
| Helplines, source notes, review date and service links | `src/lib/resident-resources.ts` |
| Article files | `src/content/posts/*.md` |
| Theme and responsive styles | `src/app/globals.css` |
| X civic-channel descriptions | `src/components/ChannelCards.tsx` |

The canonical domain from the supplied project is preserved. Set `siteConfig.url` to the actual production domain before deployment. Phone/address placeholders remain hidden until real details are provided. The leaf mark is a new design element, not a reproduction of the association's official logo.

Add an article using this frontmatter:

```markdown
---
title: "Your update"
date: "2026-09-21"
category: "Community"
excerpt: "A short summary for residents."
---

Your article here.
```

Use an ISO date. Categories are derived automatically from articles. Add source links and review dates when publishing time-sensitive guidance. Posts are rendered at build time; rebuild to publish edits.

To list an actual X Space, replace `xSpace: null as ...` with an object containing `title` and a genuine HTTPS X Space URL. The website does not fetch posts, create Spaces or claim that a conversation is live. No X API keys are required. The older unused `TwitterFeed.tsx` is retained from the supplied source; it is not mounted and its external widget is not permitted by the production CSP. Use the direct profile links provided by the active components.

## Contact and source review

Review date: 21 September 2026. Each helpline has a source/review note in the directory. See `CONTENT_REVIEW.md` for verification limits. The directory date denotes an editorial review, not a test call or a guarantee of availability. No calls were placed, complaints submitted or messages posted.

The two original election articles contain conflicting schedules. They are preserved as archived articles with an Election Commission link; their dates have not been validated as current. Review or replace their content before actively promoting them again. Existing source contact details and local operational arrangements should be confirmed by the association.

## Checks and previews

Completed: production build (including TypeScript), ESLint, browser route/interaction checks and desktop/mobile screenshot review. All 15 article routes, missing-post 404, blog search/reset/categories, 9 helplines, contact search/filter, mobile menu/Escape/navigation and narrow-screen overflow checks passed. No browser page errors were recorded.

Screenshots are in `qa/`. The optional `qa/check.mjs` starts a production server on port 3100 and runs Playwright checks. To run it on a development machine, install Playwright as a development tool, install its Chromium browser, build, then run `node qa/check.mjs`. Playwright is not a runtime dependency. The optional `PTRA_CHROMIUM_PATH` can point to an installed Chromium executable.

## Deployment

Use your existing Next.js hosting workflow. This is a source-code delivery; no live website, domain or external repository was changed. Do not upload `node_modules` or `.next` as source files. Keep the supplied lockfile and run `npm ci` on your build host. This project is configured for a Next.js host, not a plain static-file server.

## Call-link clarification

Telephone links use `tel:` without a new-tab target. Visible “Call” labels have been removed; phone numbers remain direct telephone links. Screenshots have been refreshed for the larger resident-friendly typography.

## Restored Jobs, applications, advertising and Admin

This edition merges the functionality supplied in `ptra-modernized.zip` into the redesigned site.

- `/jobs`: application form with optional PDF/Word attachment (8 MB server limit). The public Open roles section has been removed.
- `/apply`: private submissions to the committee, with attachment input when a Jobs topic is selected.
- `/advertise`: approved classifieds and original sponsor/advertising information.
- `/admin`: committee login, inbox, approval/rejection and Jobs/Advertise publishing tabs.
- `/resumes`: retains the supplied redirect to `/apply`.
- The homepage includes a Jobs/Apply promotion and a classifieds board. The footer marks Admin as restricted to Office Bearers.

Copy `.env.example` to `.env.local` and configure the existing Google Drive and admin variables, or retain them in your hosting provider. See `SETUP-DRIVE.md`. Never put credentials in client components. No working credentials or real submissions were included in the ZIP.

Classifieds and the homepage render dynamically so approved classifieds can appear on subsequent requests without a rebuild. Jobs approval records remain available in Admin, but the public Jobs listing section is hidden. Temporary listing failures show a readable unavailable message. Existing Drive storage and moderation rules are retained. The supplied Drive reader still reads at most 100 metadata files per request; pagination was not part of this theme update.

The active submission route saves to Google Drive. The legacy `mail.ts` helper remains in the source but is not called by that route. Resident-facing wording no longer promises an email delivery. Attachments remain private unless access is separately granted in Drive; approving a listing publishes its note and displayed phone/email as in the supplied code.

Validation used isolated test credentials and no live Drive configuration. Real admin API checks covered rejected credentials, a signed session and protected reads. Browser checks covered form topic/file behaviour, the storage-unavailable message, and a mocked successful submission response. No real application was uploaded and no live listing was published. Live Google Drive writes and moderation writes require validation in your configured environment.

## Resident readability

Body copy and controls use 18px text, articles use 20px text, secondary labels use at least 16px, and the compact mobile brand subtitle uses 12px. Headings, helpline numbers and important article text have stronger emphasis. Controls have larger tap areas, focus outlines are prominent, and narrower layouts use the menu earlier to leave space for larger navigation text.

Jobs and Write to Us now show a prominent success panel after the server confirms that the submission was saved. Highlight sections use stronger blush backgrounds, crimson borders and clearer hover emphasis.
