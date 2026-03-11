# FlashSeal

English | [简体中文](./README_ZH.md) | [日本語](./README_JA.md) | [한국어](./README_KO.md)

FlashSeal is an encrypted burn-after-open text and image sharing tool built on Cloudflare Pages, Pages Functions, and KV.

## What It Does

- Supports `text` and `image` secrets
- Limits images to `15MB`
- Shares secrets by direct link: `/s/:id#k=<base64url-key>`
- Allows only the first successful viewer to open a secret
- Keeps opened secrets visible for `60 seconds`
- Expires unopened secrets after `1 hour`
- Encrypts in the browser and stores ciphertext only

## Stack

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare KV
- TypeScript for Functions
- Native HTML/CSS/JS frontend

## Project Structure

- `public/`: static app shell, styles, PWA files, client logic
- `functions/api/secrets/index.ts`: create-secret endpoint
- `functions/api/secrets/[id]/open.ts`: first-open endpoint
- `functions/api/i18n.ts`: API-side message dictionary
- `wrangler.toml`: Pages and KV configuration

## Requirements

- Node.js `20+`
- npm
- A Cloudflare account
- Wrangler 4, installed through project dependencies

`wrangler@4` expects Node 20+. If you run with Node 18, Wrangler may still install but will warn or behave inconsistently.

## Local Development

### 1. Install dependencies

```bash
cd /Users/yilun/Desktop/FlashSeal
npm install
```

### 2. Authenticate Wrangler

Use one of these approaches:

- Run `npx wrangler login`
- Or export `CLOUDFLARE_API_TOKEN` in your shell

Without Cloudflare authentication, the KV namespace creation commands will fail.

### 3. Create KV namespaces

Create both production and preview namespaces:

```bash
npm run kv:create
npm run kv:create:preview
```

Wrangler will print namespace IDs. Copy them into [wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml):

```toml
[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

### 4. Start local Pages development

```bash
npm run dev
```

FlashSeal runs locally with:

- app port: `8788`
- inspector port: `9230`
- local state dir: `./.wrangler/state`

Open:

```text
http://127.0.0.1:8788
```

### 5. Test the main flow locally

1. Create a text or image secret
2. Copy the generated link
3. Open that link in a new tab or window
4. Confirm the secret opens automatically
5. Confirm the countdown runs for 60 seconds
6. Confirm reopening the same link fails

### Local troubleshooting

- If `wrangler` commands fail after upgrading, use the scripts in `package.json` or `npx wrangler ...`
- If a page shows stale UI, clear the service worker and site storage in DevTools
- If KV creation fails, confirm you are logged in or `CLOUDFLARE_API_TOKEN` is set
- If local dev fails on an older Node version, upgrade to Node 20+

## Deploy To Cloudflare Pages

### Option 1: Deploy from GitHub in the Cloudflare dashboard

1. Push this project to a Git repository
2. In Cloudflare, open `Workers & Pages`
3. Create a new `Pages` project and connect the repository
4. Use these build settings:
   - Build command: leave empty
   - Build output directory: `public`
5. Create or choose a KV namespace for production
6. In the Pages project settings, add a KV binding:
   - Variable name: `SECRETS`
   - Namespace: your production namespace
7. Save and deploy

### Option 2: Prepare config first, then connect Pages

Before connecting the repo, make sure [wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml) contains your real namespace IDs:

```toml
name = "flashseal"
compatibility_date = "2025-11-20"
pages_build_output_dir = "./public"

[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

Then connect the repo in Pages and keep:

- Build command: empty
- Output directory: `public`
