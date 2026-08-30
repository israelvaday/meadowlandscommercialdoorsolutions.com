# Meadowlands Commercial Door Solutions

Next.js site for commercial overhead doors, rolling steel, loading docks,
high-speed doors, fire-rated assemblies, and storefronts from
333 Washington St, Jersey City, NJ 07302.

## Development

```powershell
npm install
npm run dev
```

Business details are centralized in `lib/business.ts`. Commercial services and
100 nearby service areas live in `content/`.

## Generated assets

OpenRouter and Cloudflare credentials belong in the ignored `.env.local` file.
Never commit or print API keys.

```powershell
node scripts/openrouter-generate-site.mjs --copy --force
node scripts/openrouter-generate-site.mjs --areas --force
node scripts/openrouter-generate-site.mjs --images-blog --images-gallery --images-brand --images-quote --force
```

The site identifies generated images as project inspiration, not completed
customer work. Photos are written as WebP for faster loading.

## Deploy (GitHub Pages)

```powershell
npm run build:pages
npm run deploy:pages
```

## Cloudflare

```powershell
node scripts/cloudflare-configure.mjs
node scripts/cloudflare-configure.mjs --apply
```
