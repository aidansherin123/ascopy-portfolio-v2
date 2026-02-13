# A.S. Copy — Portfolio Website

## Overview

A.S. Copy is a single-page portfolio website for Aidan Sherin, a freelance copywriter and programmer. The site features a visually rich hero section with a Three.js WebGL particle animation, GSAP scroll-triggered animations, multiple content sections (Home, Services, Website Samples, Copy Samples, Contact), a Calendly scheduling widget, and a contact form that saves inquiries to a PostgreSQL database. The site is built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (client/)
- **Framework:** React 18 with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router) — currently just `/` (Home) and a 404 page
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Styling:** Tailwind CSS with CSS variables for theming. Fonts are Inter (body) and DM Sans (headings). The color palette centers on a blue (#a2a4ff) and dark navy (#000120) scheme
- **State/Data Fetching:** TanStack React Query for server state, react-hook-form with zod resolvers for form handling
- **Animations:** GSAP with ScrollTrigger for scroll-based animations and text reveals. Three.js for the WebGL particle network background in the hero section
- **Calendly Integration:** react-calendly's InlineWidget for scheduling in the contact section
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend (server/)
- **Framework:** Express 5 on Node.js with TypeScript (run via tsx in dev, esbuild-bundled for production)
- **API Pattern:** A single REST endpoint `POST /api/inquiries` for contact form submissions. Route definitions are shared between client and server via `shared/routes.ts` which includes path, method, input schema, and response schemas
- **Validation:** Zod schemas generated from Drizzle table definitions via drizzle-zod. Validation errors return 400 with field-level messages
- **Dev Server:** Vite dev server runs as middleware on the Express server with HMR support
- **Production:** Client is built to `dist/public/`, server is bundled to `dist/index.cjs` with esbuild. Static files served by Express with SPA fallback

### Shared Code (shared/)
- **schema.ts:** Drizzle ORM table definitions and Zod insert schemas. Currently has one table: `inquiries` (id, name, email, message, createdAt)
- **routes.ts:** API route contracts shared between frontend and backend — includes paths, HTTP methods, input/output schemas

### Database
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Driver:** node-postgres (pg) Pool
- **Migrations:** Use `npm run db:push` (drizzle-kit push) to sync schema to database
- **Connection:** Requires `DATABASE_URL` environment variable
- **Session Store:** connect-pg-simple is listed as a dependency (for future session support)

### Build Pipeline
- **Dev:** `npm run dev` — tsx runs the server which hosts Vite middleware for HMR
- **Build:** `npm run build` — Vite builds the client, esbuild bundles the server. Most dependencies are externalized except for a specific allowlist that gets bundled to reduce cold-start syscalls
- **Start:** `npm run start` — runs the production bundle from `dist/index.cjs`

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable
- **Calendly** — Embedded scheduling widget via react-calendly (requires a Calendly URL to be configured in the component)
- **Google Fonts** — Inter and DM Sans loaded via CDN in the HTML head
- **Three.js** — 3D WebGL rendering for the hero background animation (installed as npm package)
- **GSAP** — Animation library for scroll-triggered effects (installed as npm package)
- **Radix UI** — Headless UI primitives powering all shadcn/ui components
- **Replit Plugins** — vite-plugin-runtime-error-modal, vite-plugin-cartographer, and vite-plugin-dev-banner for Replit development environment integration