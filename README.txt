# Strange New Models — Website Setup Guide

## Files in this folder
- index.html      — Homepage
- catalogue.html  — Browse all ships by faction
- ship.html       — Individual ship page (3D preview, buy, like, share)
- terms.html      — Terms of use & print licence
- contact.html    — Contact form (→ robbybelboah@msn.com)
- netlify.toml    — Netlify config (auto-detected)

---

## Step 1 — Create a GitHub account
1. Go to github.com and sign up (use your Google account)
2. Create a new repository called "strange-new-models"
3. Upload all files in this folder to the repository

## Step 2 — Deploy to Netlify (free)
1. Go to netlify.com and sign up with your Google account
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select the "strange-new-models" repo
4. Click Deploy — your site will be live in ~30 seconds
5. You'll get a URL like: https://strange-new-models.netlify.app

## Step 3 — Set up contact form email
1. In Netlify dashboard → Forms → Enable forms
2. Add to your contact form HTML: name="contact" data-netlify="true"
3. In Netlify → Forms → Settings → Email notifications → robbybelboah@msn.com
4. Messages will arrive directly in your inbox, not spam

## Step 4 — Custom domain (optional, ~£10/year)
1. Buy strangenewmodels.com from Namecheap or Google Domains
2. In Netlify → Domain settings → Add custom domain
3. Follow the DNS instructions (takes ~24hrs to go live)

---

## Phase 2 — Supabase (database, accounts, likes)
1. Go to supabase.com → Create project (use Google auth)
2. Create tables: ships, orders, users, likes
3. Add Supabase JS library and replace demo data in catalogue.html
4. Wire up login modal in index.html

## Phase 3 — Stripe (payments)
1. Go to stripe.com → Create account
2. Get your publishable key
3. Add Stripe.js to ship.html
4. Create payment intents via Netlify Functions (free)
5. Wire Google Drive download delivery via webhook

---

## Still needed from Rob
- Cults3D profile URL (to add to footer links)
- Logo image file (or I'll design one)
- YouTube channel videos for the Videos page
- Actual ship images/renders to replace placeholders

---

## Current placeholder state
- Ship cards show rocket emoji placeholders — replace with your catalogue JPGs
- Patreon feed shows demo posts — will pull from RSS when configured
- Buy button shows "coming soon" toast — wire to Stripe in Phase 2
- Login shows "coming soon" toast — wire to Supabase in Phase 2
- Contact form shows success animation — wire to Netlify Forms in deployment
