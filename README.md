This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Christ the King Anglican Website (ctk-website)

A fully dynamic, top-tier church website built with Next.js for Christ the King Anglican, featuring a public site and secure admin dashboard.

## Project Overview
- **Purpose**: Deliver a modern, editable platform with hymn books, service rotas, sermons, giving, and prayer features, managed by admins.
- **Goal**: Create a "best of the best" experience—dynamic, secure, user-friendly.
- **Tech Stack**: Next.js (full-stack), SQLite, Tailwind CSS, NextAuth.js, Vercel hosting.

## Features
### Public-Facing
- **Home**: Dynamic welcome with latest rota preview.
- **Rotas**: Weekly service schedules.
- **Hymns**: List of hymns with PDFs/links.
- **Sermons**: Audio/video sermons.
- **Giving**: Online donation form (PayPal planned).
- **Prayer**: Submission form.
- **Contact**: Church info.

### Admin Area
- **Login**: Secure access via email/password (NextAuth.js).
- **Dashboard**: CRUD for rotas, hymns, sermons, prayers, donations.

## Development Phases
1. **Planning**: Defined goals, sitemap, tools (Next.js, SQLite).
2. **Setup/Design**: Initialized project, designed UI, set up SQLite.
3. **Development**: Build dynamic pages, admin area, APIs.
4. **Testing**: Verify functionality, security, usability.
5. **Deployment**: Launch on Vercel.
6. **Maintenance**: Admin training, updates.

## Tech Details
- **Frontend**: Next.js (React), Tailwind CSS.
- **Backend**: Next.js API routes.
- **Database**: SQLite (file: `data/ctk.db`).
- **Auth**: NextAuth.js for admin login.
- **Hosting**: Vercel (planned).

## Setup Instructions
1. **Clone Repo**: `git clone <repo-url>`
2. **Install Dependencies**: `npm install`
3. **Set Up Environment**: Create `.env.local` with:
4. **Run Locally**: `npm run dev`
5. **Access**: `http://localhost:3000` (public), `/api/test-db` (test SQLite).

## Deployment
- Push to GitHub: `git add .`, `git commit -m "message"`, `git push origin main`.
- Deploy on Vercel: Import repo, set environment variables.

## Admin Guide
- **Login**: `/admin` (to be implemented).
- **Manage**: Add/update/delete content via dashboard.

## Future Enhancements
- PayPal integration for giving.
- Live streaming.
- Custom domain (e.g., ctkanglican.org).
