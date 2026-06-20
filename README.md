# Go Business — Referral Dashboard

A responsive referral management dashboard built with **React + Vite**. Users sign in, view referral metrics and a service summary, share their referral link/code, and browse a searchable, sortable, paginated referrals table with a detail view for each referral.

🔗 **Live demo:** https://referral-dashboard-chi.vercel.app

**Test credentials**

```
Email:    admin@example.com
Password: admin123
```

## Features

- Email/password authentication with a JWT stored in a cookie
- Protected routes — unauthenticated users are redirected to `/login`
- Dashboard with overview metrics, service summary, and referral link/code sharing
- Referrals table with API-driven search and sort, plus client-side pagination (10 rows per page)
- Referral detail page reachable via deep link (`/referral/:id`)
- 404 Not Found page
- Accessible markup (ARIA labels, landmark roles, keyboard-activatable rows)

## Tech stack

- React 18
- Vite 5
- React Router v6
- js-cookie

## Getting started

Prerequisites: **Node.js (LTS)**

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# create a production build
npm run build

# preview the production build locally
npm run preview
```

## Project structure

```
src/
  api.js          # API calls + response parsing
  config.js       # API endpoints + cookie name
  format.js       # date and currency formatting helpers
  App.jsx         # route definitions
  main.jsx        # app entry
  components/     # Navbar, Footer, ProtectedRoute, table, sections
  pages/          # Login, Dashboard, ReferralDetail, NotFound
  index.css       # styles
```

## API

All data comes from a single API gateway. The JWT returned at login is sent as
`Authorization: Bearer <token>` on every subsequent request.

- `POST /api/auth/signin` — returns the token at `data.token`
- `GET /api/referrals` — referrals list; supports `?search=`, `?sort=asc|desc`, and `?id=<id>`

Pagination is handled client-side (the API returns the full matching set).

## Deployment

Deployed on **Vercel**. `vercel.json` adds an SPA rewrite so client-side routes
(e.g. `/referral/48`) resolve to `index.html` instead of returning a 404 on direct
load or refresh. Every push to `main` triggers an automatic redeploy.
