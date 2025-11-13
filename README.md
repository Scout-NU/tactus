# Tactus

A Next.js e-commerce application built with React 19, TypeScript, and Tailwind CSS.

## Getting Started

### Development Server

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

Build and start the production server:

```bash
npm run build
npm start
```

## Available Commands

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start development server with Turbopack |
| `npm run build`        | Build production bundle                 |
| `npm start`            | Start production server                 |
| `npm run lint`         | Run ESLint to check for code issues     |
| `npm run format`       | Format all files with Prettier          |
| `npm run format:check` | Check if files are formatted correctly  |

## Code Quality

This project uses ESLint and Prettier to maintain code quality and consistency. It's recommended to:

- Run `npm run lint` before committing
- Set up your editor to format on save
- Run `npm run format` to format all files

## How App Router Works

**File-based Routing**: Each folder in `src/app/` becomes a URL route:

- `app/page.tsx` → `/` (home page)
- `app/shop/page.tsx` → `/shop`
- `app/about/page.tsx` → `/about` (add this folder to create the route)

**Special Files**:

- `layout.tsx` - Shared UI that wraps pages (header, footer, etc.)
- `page.tsx` - Unique content for each route

**Components Folder**:

- Store reusable components in `app/components/`
- Not part of routing (doesn't create routes)
- Import into your pages as needed

**Example**: To add a new "Products" page at `/products`:

1. Create `app/products/page.tsx`
2. Export a React component
3. It's automatically accessible at `/products`
