## Aurora Cosmetics – Next.js 14 Storefront

A minimalist cosmetics storefront built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **App Router**, **Zustand** cart state, and **Stripe Checkout** (test mode). The catalog showcases three hero products from Allies of Skin and Medik8 with a fully responsive product experience (home, listing, detail pages) and a persistent client-side cart.

### ✨ Features
- App Router architecture with typed server and client features.
- Home hero, featured spotlight, and full product grid.
- `/products` listing with responsive 3 / 2 / 1 column layout.
- `/products/[id]` detail page featuring gallery, description, ingredients, usage, and quick add-to-cart.
- Persistent cart powered by Zustand + `localStorage`, surfaced in the header, `/cart`, and checkout.
- Checkout page that initializes a Stripe Checkout Session using sandbox keys.
- REST API route at `/api/products` backed by `data/products.json`.
- SEO metadata, Open Graph/Twitter cards, and auto-generated sitemap (`/sitemap.xml`).
- Tailwind-driven aesthetic with white space, soft shadows, and rounded geometry—deploy-ready for Vercel.

### 🛠 Prerequisites
- Node.js ≥ 18.17
- npm ≥ 9
- Stripe test account (for generating API keys)

### ⚙️ Environment Variables
Create a `.env.local` file based on the template below:

```bash
STRIPE_SECRET_KEY=sk_test_***
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_***
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `STRIPE_SECRET_KEY` is used server-side by `/api/checkout`.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is required to redirect to Stripe Checkout from the client.
- `NEXT_PUBLIC_SITE_URL` is used for metadata, checkout success/cancel URLs, and sitemap links.

> The application ships with Stripe in test mode. Use card number `4242 4242 4242 4242` with any future expiry and CVC.

### 🚀 Local Development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to browse the storefront.

### 🧪 Testing Stripe Locally
1. Ensure test keys are present in `.env.local`.
2. Add products to the cart and proceed to `/checkout`.
3. Submit the form to be redirected to Stripe’s test checkout.
4. After confirming the payment with a test card, you’ll return to the configured success URL.

### 🗂 Project Structure Highlights
- `app/` – App Router routes (home, products, product details, cart, checkout) plus API routes.
- `components/` – UI building blocks: header, footer, product cards, grids, cart/checkout UI, and cart interactions.
- `store/` – Zustand store for cart state (persisted to `localStorage`).
- `data/products.json` – Cosmetic product seed data used across pages and API routes.
- `lib/` – Domain helpers for accessing product data.

### 📦 Deployment
The project is Vercel-ready out of the box:
```bash
npm run build
npm run start
```
Set the same environment variables in your deployment platform to enable Stripe Checkout and correct domain URLs.
