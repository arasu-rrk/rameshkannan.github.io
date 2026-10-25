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

### Previewing Cloudflare Pages Functions locally

`npm run dev` runs Next.js only and does not serve the resume contact Pages Function. To test contact reveal locally, create a Git-ignored `.dev.vars` file in the project root with dummy values:

```ini
RESUME_EMAIL=developer@example.invalid
RESUME_PHONE=000-000-0000
RESUME_ADDRESS=Local development only
```

Build the static site, then start the local Pages preview:

```sh
npm run build
npm run preview
```

The preview serves the `out` directory and runs the Pages Function with `.dev.vars`. The build skips R2 publishing when no R2 credentials are configured; preview contact values are for local testing only.

## Checks and production build

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Deployment and domains

Cloudflare Pages builds and deploys the site from the GitHub repository. Configure the Pages project with build command `npm run build` and build output directory `out`. Before deployment, you can test the built site and Pages Functions locally with `npm run build` followed by `npm run preview` (see [Previewing Cloudflare Pages Functions locally](#previewing-cloudflare-pages-functions-locally)). `npm run preview` is a local preview command; do not use it as the Pages build command. The build automatically runs `scripts/update-blog-modified-dates.sh` first, updating only the blog posts matched by the filename patterns in `scripts/blogs-to-update.json` (for example, `005-*.md`) to the build machine's current local date, time, and timezone. Edit that JSON file to change which posts are updated. An optional, non-empty `displayModifiedDate` in blog frontmatter controls the visible “Last updated” date independently of `modifiedDate`, which is used for Open Graph and structured data. If `displayModifiedDate` is absent or empty, no visible “Last updated” date is shown. Date-only values submitted in metadata are represented as midnight UTC; the build-generated modification timestamp includes the publishing machine's local time and timezone offset. The script uses Node.js for consistent cross-platform date and file handling. The Next.js configuration exports a static site for Pages. Keep the apex (`rameshkannan.com`) and `www` hostnames assigned to the Pages project and configured in Cloudflare DNS.

Configure `NEXT_PUBLIC_GTM_ID` in the Cloudflare Pages build environment for the required deployment targets, then redeploy after changing it.

### Cloudflare R2 image publishing

The `prebuild` script publishes `public/images` to the configured R2 bucket and removes stale images. For Cloudflare Pages builds, configure these build variables/secrets for each deployment environment:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET`
- `NEXT_PUBLIC_IMAGE_CDN_URL` (the public HTTPS base URL used to serve the images)

Create an R2 API token with **Object Read & Write** access to the bucket named by `CLOUDFLARE_R2_BUCKET`. The script lists existing objects, uploads current images, and deletes stale ones, so a write-only token or a token scoped to a different bucket will fail with `AccessDenied` during the list step. Use the account ID for the same Cloudflare account as the bucket. After changing the token or variables in Pages, redeploy.

## Google Tag Manager

In GTM, configure a Google tag with the GA4 measurement ID and leave automatic `page_view` sending enabled. In the GA4 web data stream's Enhanced Measurement settings, enable **Page changes based on browser history events** to track client-side navigation. Do not add a separate Custom Event tag for `page_view`, as it would duplicate the automatically collected events.
