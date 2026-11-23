# The Barker Shoppe — Marketing Website

Production-ready marketing site for **The Barker Shoppe**, a locally owned dog daycare, boarding, and grooming shoppe in Springfield, Missouri.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and FlatIcon UIcons.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script          | What it does                      |
| --------------- | --------------------------------- |
| `npm run dev`   | Local development server          |
| `npm run build` | Production build (static pages)   |
| `npm start`     | Serve the production build        |
| `npm run lint`  | ESLint                            |

---

## Design system (from attached homepage)

- **Fonts:** Archivo (headings) + Karla (body) — both sans-serif, no serif
- **Body size:** 18px (`text-body`)
- **Colors:** cream `#fbf4e9`, ink `#16262e`, navy `#0d2c38`, blue `#309ecf`, wine `#8b1c25`
- **Icons:** FlatIcon UIcons (CDN) — `fi-rr-*` regular-rounded + `fi-brands-facebook`
- **Photo treatment:** arched frames (`rounded-arch` / `rounded-arch-lg`) with soft blue/wine backdrops
- **Login:** intentionally removed (per client brief)

---

## Pages

| Route       | Purpose |
| ----------- | ------- |
| `/`         | Home — matches attached HTML design |
| `/about`    | Team dedication and values |
| `/story`    | Why the shoppe started |
| `/services` | Daycare, boarding, grooming detail |
| `/pricing`  | Rates, packages, new-client requirements, vaccinations, FAQs |
| `/gallery`  | Masonry gallery + lightbox |
| `/contact`  | Form, hours, map, business details |

---

## Confirmed client details

- **Address:** 1927 East Bennett Street, Springfield, MO 65804
- **Phone:** (417) 501-1053
- **Email:** Barkershoppe@gmail.com
- **Facebook:** https://www.facebook.com/barkershoppe
- **Domain:** https://barkershoppesgf.com
- **Hours:** Mon–Fri 7:30 am–6 pm · Sat & Sun 8–11 am, 4–6 pm
- **Dogs only** — no cats or other animals
- **Vaccinations required:** Bordetella, DHPP, Rabies
- **Boarding perk:** every 7th night free

### Rates (from client rate sheet)

**Daycare — one dog:** Full $30 · Half $15 · 5-day $115 · 10-day $210 · 30-day $570  
**Daycare — two dogs:** Full $50 · Half $25 · 5-day $170 · 10-day $310 · 30-day $840  
**Boarding:** 1 dog $35/night · 2 dogs $60 · 3 dogs $85  
**Grooming:** quoted by size/service — call for pricing

---

## SEO & analytics

### Google Tag Manager, Analytics & Search Console

1. Create a [GTM container](https://tagmanager.google.com/) → copy Container ID (`GTM-XXXXXXXX`).
2. (Optional) Create a [GA4 property](https://analytics.google.com/) if you are not loading GA through GTM.
3. Create a [Search Console](https://search.google.com/search-console) property for `https://barkershoppesgf.com`.
4. Verify ownership with the HTML tag method → copy the `content` value only.
5. Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_GTM_ID=GTM-K47N98SJ
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_token_here
```

6. Redeploy / restart the app so the env vars load.
7. In Search Console, submit `https://barkershoppesgf.com/sitemap.xml`.

When `NEXT_PUBLIC_GTM_ID` is set, GTM loads (preferred). Direct GA4 only loads if GTM is empty. GSC verification stays off until that env var is set.

### Built-in SEO

| Item | Location |
| ---- | -------- |
| XML sitemap | `/sitemap.xml` (`app/sitemap.ts`) |
| robots.txt | `/robots.txt` (`app/robots.ts`) |
| Canonical + titles + descriptions | `lib/seo.ts` + each page |
| JSON-LD (LocalBusiness, WebSite, BreadcrumbList, Service) | `lib/schema.ts` |
| Open Graph image | `app/opengraph-image.tsx` |
| HTML sitemap | `/sitemap` |

---

## Placeholders still to replace

1. **Contact form endpoint** — validates and shows success, but does not send email yet (`components/contact/ContactForm.tsx`)
2. **Team names & headshots** — placeholders on `/about`
3. **Google Business map embed** — generic address query works; swap for GBP embed if preferred
4. **GTM / GA4 / GSC env values** — set IDs in `.env.local` (see above)

---

## Project structure

```
app/                 Routes + layout + globals
components/
  home/              Home sections matching attached design
  layout/            Header, Footer, Logo
  shared/            PageHero, CTASection
  services/          ServiceDetail
  gallery/           GalleryGrid + lightbox
  contact/           ContactForm
  ui/                Button, Section, Reveal, Accordion, Icon (FlatIcon)
lib/site.ts          All copy, rates, hours, nav
public/images/       Client photos + logo
```

## Editing content

Almost everything lives in `lib/site.ts`. FlatIcon icon names are the `fi-rr-*` suffix (e.g. `"scissors"` → `fi-rr-scissors`). Register new names in the `FiIcon` type first.
