# Project setup

## Technologies

- Next.js 16 with the App Router, React 19, and TypeScript
- Tailwind CSS 4 and Sass
- Markdown blog content processed with gray-matter, remark, and rehype
- ESLint with the TypeScript ESLint recommended configuration
- Cloudflare Pages for hosting and deployments, with Cloudflare DNS
- Google Tag Manager with GA4 for analytics

## Local development

Requirements: Node.js 22.14.0 or later and npm.

```sh
npm ci
npm run dev
```

Set `NEXT_PUBLIC_GTM_ID` in `.env.local` to enable the GTM container locally. It is a public container ID, not a secret. `NEXT_PUBLIC_` values are included at build time, so changing the value requires a new build.

## Checks and production build

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Deployment and domains

Cloudflare Pages builds and deploys the site from the GitHub repository. Configure the Pages project with build command `npm run build` and build output directory `out`. The build automatically runs `scripts/update-blog-modified-dates.sh` first, updating only the blog posts matched by the filename patterns in `scripts/blogs-to-update.json` (for example, `005-*.md`) to the build machine's current local date, time, and timezone. Edit that JSON file to change which posts are updated. An optional, non-empty `displayModifiedDate` in blog frontmatter controls the visible “Last updated” date independently of `modifiedDate`, which is used for Open Graph and structured data. If `displayModifiedDate` is absent or empty, no visible “Last updated” date is shown. Date-only values submitted in metadata are represented as midnight UTC; the build-generated modification timestamp includes the publishing machine's local time and timezone offset. The script uses Node.js for consistent cross-platform date and file handling. The Next.js configuration exports a static site for Pages. Keep the apex (`rameshkannan.com`) and `www` hostnames assigned to the Pages project and configured in Cloudflare DNS.

Configure `NEXT_PUBLIC_GTM_ID` in the Cloudflare Pages build environment for the required deployment targets, then redeploy after changing it.

## Google Tag Manager

In GTM, configure a Google tag with the GA4 measurement ID and leave automatic `page_view` sending enabled. In the GA4 web data stream's Enhanced Measurement settings, enable **Page changes based on browser history events** to track client-side navigation. Do not add a separate Custom Event tag for `page_view`, as it would duplicate the automatically collected events.
