# Tactus



## 📋 Table of Contents

- [Team](#-team)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Setup](#step-by-step-setup)
  - [Environment Variables](#environment-variables)
- [Third-Party Integrations](#-third-party-integrations)
  - [Contentful CMS](#contentful-cms)
  - [Stripe Payments](#stripe-payments)
  - [Netlify Hosting](#netlify-hosting)
- [Configuration Files](#-configuration-files)
- [Project Structure](#-project-structure)
- [Available Commands](#-available-commands)

---

## 👥 Team

| Name | Role | 
|------|------|
| **Eden Voss** | Project Lead |
| **Lucy Liu** | Senior Designer |
| **Emily Chooi** | Junior Designer | 
| **Olivia Li** | Junior Designer | 
| **Zaydaan Jahangir** | Senior Developer |
| **Aswhin Iyer** | Junior Developer | 
| **Sree Kandula** | Junior Developer | 
---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.11.1 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** 

Verify your installations:

```bash
node --version   # Should be v20.x.x or higher
npm --version    # Should be 10.x.x or higher
git --version    # Any recent version
```

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
# Clone the repo
git clone https://github.com/your-organization/tactus.git

# Navigate into the project directory
cd tactus
```

#### 2. Install Dependencies

```bash
# Install all required packages
npm install

# If you encounter peer dependency issues, use:
npm install --legacy-peer-deps
```

#### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Create the environment file
touch .env.local
```

Copy the following template into `.env.local` and fill in the values:

```env
# ============================================
# CONTENTFUL CMS
# ============================================
# Get these from: https://app.contentful.com → Settings → API keys
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_DELIVERY_KEY=your_delivery_api_key_here
CONTENTFUL_PREVIEW_KEY=your_preview_api_key_here
CONTENTFUL_ENVIRONMENT=master

# For webhook-based revalidation (set this to a secure random string)
CONTENTFUL_REVALIDATE_SECRET=your_secure_random_string_here

# ============================================
# STRIPE PAYMENTS
# ============================================
# Get these from: https://dashboard.stripe.com → Developers → API keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Product Price IDs from Stripe Dashboard → Products
NEXT_PUBLIC_STRIPE_PRICE_JACKET=price_your_jacket_price_id_here
NEXT_PUBLIC_STRIPE_PRICE_VEST=price_your_vest_price_id_here
```

#### 4. Run the Development Server

```bash
# Start the dev server with Turbopack (fast refresh)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

### Environment Variables

| Variable | Required | Description | How to Get It |
|----------|----------|-------------|---------------|
| `CONTENTFUL_SPACE_ID` | ✅ | Your Contentful space identifier | Contentful → Settings → API keys |
| `CONTENTFUL_DELIVERY_KEY` | ✅ | Content Delivery API access token | Contentful → Settings → API keys → Content Delivery API - access token |
| `CONTENTFUL_PREVIEW_KEY` | ⚠️ | Content Preview API access token | Contentful → Settings → API keys → Content Preview API - access token |
| `CONTENTFUL_ENVIRONMENT` | ❌ | Contentful environment (default: `master`) | Usually "master" for production |
| `CONTENTFUL_REVALIDATE_SECRET` | ⚠️ | Webhook secret for on-demand revalidation | Generate any secure random string |
| `STRIPE_SECRET_KEY` | ✅ | Stripe API secret key | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) → Secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key (client-side) | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) → Publishable key |
| `NEXT_PUBLIC_STRIPE_PRICE_JACKET` | ✅ | Stripe Price ID for the jacket product | Create product in Stripe → Copy Price ID |
| `NEXT_PUBLIC_STRIPE_PRICE_VEST` | ✅ | Stripe Price ID for the vest product | Create product in Stripe → Copy Price ID |

> **Legend:** ✅ Required | ⚠️ Recommended | ❌ Optional

---

## 🔌 Third-Party Integrations

### Contentful CMS

[Contentful](https://www.contentful.com/) is used as the headless CMS to manage all website content including page copy, images, blog posts, and press releases.

#### How It Works

```
┌─────────────────┐     Delivery API      ┌──────────────────┐
│   Contentful    │ ───────────────────▶ │    Next.js App   │
│   (Content)     │                       │   (Frontend)     │
└─────────────────┘                       └──────────────────┘
         │                                         │
         │     Webhook (on publish)                │
         └────────────────────────────────────────▶│
                                           Triggers revalidation
```

1. **Content Delivery API**: Fetches published content at build time and on-demand
2. **Content Preview API**: View draft content before publishing (optional)
3. **Webhooks**: Automatically revalidate pages when content is updated

#### Content Types in Contentful

| Content Type | Description | Used On |
|--------------|-------------|---------|
| `homepage` | Hero section, videos, sponsor logos | Home page (`/`) |
| `product` | Product features and specifications | Product page (`/product`) |
| `shop` | Shop overview content | Shop page (`/shop`) |
| `shopJacket` | Jacket/Vest product details | `/shop/jacket`, `/shop/vest` |
| `aboutUs` | Mission, team, values | About page (`/about`) |
| `communityPage` | Community page content | Community page (`/community`) |
| `blogPost` | Blog articles | Blog listing and detail pages |
| `pressRelease` | Press/media coverage | Community page press section |

#### Updating Content in Contentful

1. **Log into Contentful**: Go to [app.contentful.com](https://app.contentful.com)
2. **Navigate to Content**: Click "Content" in the left sidebar
3. **Select Entry**: Find and click the content entry you want to edit
4. **Make Changes**: Update text, images, or other fields
5. **Publish**: Click the green "Publish" button in the top right

> **Auto-Deploy**: Since webhooks are configured, the site automatically revalidates when you publish. No manual deployment needed!

#### Setting Up Contentful Webhooks (Auto-Revalidation)

1. Go to **Settings → Webhooks** in Contentful
2. Click **Add Webhook**
3. Configure:
   - **Name**: `Revalidate Tactus Site`
   - **URL**: `https://your-site.netlify.app/api/revalidate`
   - **Triggers**: Select "Publish" and "Unpublish" for Entry
   - **Headers**: Add `X-Contentful-Webhook-Secret` with your `CONTENTFUL_REVALIDATE_SECRET` value
4. Save the webhook

---

### Stripe Payments

[Stripe](https://stripe.com/) handles all payment processing through Stripe Checkout.

#### How It Works

```
┌──────────────┐      Add to Cart      ┌──────────────┐
│    User      │ ────────────────────▶ │  Cart State  │
│              │                       │ (LocalStorage)│
└──────────────┘                       └──────────────┘
       │                                      │
       │  Checkout Click                      │
       ▼                                      ▼
┌──────────────────────────────────────────────────────┐
│           POST /api/create-checkout-session          │
│                  (Creates Stripe Session)            │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   Stripe Checkout   │
               │   (Hosted by Stripe)│
               └─────────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   Success Page      │
               │   /shop/success     │
               └─────────────────────┘
```

1. Users add products to cart (stored in browser localStorage)
2. On checkout, the app creates a Stripe Checkout Session via API
3. User is redirected to Stripe's hosted checkout page
4. After payment, user returns to the success page

#### Setting Up Stripe Products

See [`STRIPE_SETUP.md`](./STRIPE_SETUP.md) for detailed instructions on:
- Creating your Stripe account
- Getting API keys
- Creating products and prices
- Testing with test card numbers

#### Test Card Numbers

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0025 0000 3155` | Requires authentication |
| `4000 0000 0000 9995` | Declined |

> Use any future expiration date and any 3-digit CVC.

---

### Netlify Hosting

The site is **currently** deployed on [Netlify](https://www.netlify.com/) with automatic deployments from Git.

#### How It Works

1. **Push to main branch** → Triggers automatic build
2. **Build process**: `npm ci && npm run build`
3. **Deploy**: Static files + Next.js serverless functions deployed
4. **Live**: Site is updated at your Netlify URL

#### Netlify Environment Variables

You must add all environment variables in the Netlify dashboard:

1. Go to **Site Settings → Environment Variables**
2. Add each variable from your `.env.local` file
3. Trigger a new deploy for changes to take effect

#### Manual Deploy

If you need to trigger a manual deploy:
1. Go to the Netlify dashboard
2. Click **Deploys** → **Trigger deploy** → **Deploy site**

---

## 📁 Configuration Files

### `package.json`

The main project configuration file containing:
- **Project metadata**: Name, version
- **Scripts**: Available npm commands (`dev`, `build`, `start`, `lint`, `format`)
- **Dependencies**: Production packages (React, Next.js, Contentful SDK, Stripe, etc.)
- **DevDependencies**: Development tools (TypeScript, ESLint, Prettier, Tailwind)

### `next.config.ts`

Next.js framework configuration:
- **Image optimization**: Configures remote image patterns for Contentful (`images.ctfassets.net`)
- **Image formats**: Enables WebP and AVIF for better performance
- **Device sizes**: Responsive image breakpoints for optimization

### `tailwind.config.js`

Tailwind CSS configuration:
- **Content paths**: Where to scan for Tailwind classes
- **Theme extensions**: Custom colors, fonts, and border radius using CSS variables
- **Font families**: `Stratos` for headings, `DM Sans` for body text
- **Plugins**: `tailwindcss-animate` for animation utilities

### `tsconfig.json`

TypeScript compiler configuration:
- **Target**: ES2017 for broad browser compatibility
- **Strict mode**: Enabled for type safety
- **Path aliases**: `@/*` maps to `./src/*` for clean imports
- **Next.js plugin**: Enhanced type checking for Next.js

### `postcss.config.mjs`

PostCSS configuration for CSS processing:
- **Tailwind CSS**: Processes Tailwind directives
- **Autoprefixer**: Adds vendor prefixes for browser compatibility

### `eslint.config.mjs`

ESLint linting configuration:
- **Extends**: Next.js core web vitals, TypeScript rules, Prettier
- **Ignores**: Build outputs, node_modules, generated files

### `components.json`

[shadcn/ui](https://ui.shadcn.com/) component library configuration:
- **Style**: New York variant
- **RSC support**: Enabled for React Server Components
- **Path aliases**: Component and utility locations
- **Registries**: Custom Aceternity UI registry for additional components

### `netlify.toml`

Netlify deployment configuration:
- **Build command**: `npm ci && npm run build`
- **Publish directory**: `.next` (Next.js output)
- **Node version**: 20.11.1
- **Plugin**: `@netlify/plugin-nextjs` for Next.js compatibility

### `.gitignore`

Files and directories excluded from Git:
- `node_modules/` - Installed packages
- `.next/` - Next.js build output
- `.env*` - Environment files (keep secrets safe!)
- Build artifacts and system files

---

## 📂 Project Structure

```
tactus/
├── public/                    # Static assets (served as-is)
│   └── assets/               # Videos, images
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── _assets/          # Page-specific assets (images, etc.)
│   │   ├── api/              # API routes
│   │   │   ├── create-checkout-session/  # Stripe checkout
│   │   │   └── revalidate/               # Contentful webhook
│   │   ├── components/       # Shared React components
│   │   ├── about/            # About page
│   │   ├── community/        # Community + Blog pages
│   │   ├── product/          # Product info page
│   │   ├── shop/             # Shop pages (jacket, vest, success)
│   │   ├── globals.css       # Global styles + CSS variables
│   │   ├── layout.tsx        # Root layout (header, footer)
│   │   └── page.tsx          # Home page
│   ├── context/              # React Context providers
│   │   └── CartContext.tsx   # Shopping cart state
│   └── lib/                  # Utilities and integrations
│       ├── contentful.ts     # Contentful API client + types
│       └── utils.ts          # Helper functions
├── .env.local                # Environment variables (create this!)
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
└── README.md                 # You are here!
```

---

## 💻 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack (hot reload) |
| `npm run build` | Build production bundle |
| `npm start` | Start production server (run `build` first) |
| `npm run lint` | Check code for ESLint issues |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check if files are formatted correctly |

---

## 🛠️ Development Workflow

1. **Create a new branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test locally:
   ```bash
   npm run dev
   ```

3. **Lint and format** before committing:
   ```bash
   npm run lint
   npm run format
   ```

4. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub for review

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

<div align="center">

**Made with ❤️ by the Tactus Team**

</div>
