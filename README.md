# Circlechain — Web3 Crypto Platform

Full-stack Web3 / Crypto platform built with Next.js (App Router), NestJS, RTK Query, MUI, Brevo, and Google SSO.

---

## Project Structure

```
web3-frontend/   → Next.js 15 App Router frontend
web3-backend/    → NestJS backend API
```

---

## Setup Instructions

### 1. Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project
3. Enable **Google+ API** and **Google OAuth2 API**
4. Go to **Credentials → Create OAuth 2.0 Client ID**
5. Set Authorized redirect URI: `http://localhost:3001/auth/google/callback`
6. Copy **Client ID** and **Client Secret**

### 2. Brevo Setup

1. Go to [brevo.com](https://brevo.com) and create a free account
2. Go to **Settings → API Keys** → generate a new key
3. Go to **Email Templates** → create a newsletter confirmation template
4. Note the **Template ID**
5. Update `newsletter.service.ts` line with your template ID

### 3. Backend Setup

```bash
cd web3-backend

# Edit .env with your credentials:
# GOOGLE_CLIENT_ID=your_actual_client_id
# GOOGLE_CLIENT_SECRET=your_actual_client_secret
# JWT_SECRET=any_random_strong_string
# BREVO_API_KEY=your_brevo_api_key
# FRONTEND_URL=http://localhost:3000

npm run start:dev
# Backend runs on http://localhost:3001
```

### 4. Frontend Setup

```bash
cd web3-frontend

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

npm run dev
# Frontend runs on http://localhost:3000
```

---

## Features

### Public UI (matches Figma)
- **Hero Section** — headline, CTA buttons, floating crypto cards
- **Feature Cards** — Access Token Market, User Friendly Interface, Ownership Token Control
- **Market Trend Cards** — 16 crypto coins with sparklines and live-style data
- **Crypto Listings** — Top 8 assets in a sortable table
- **Newsletter Section** — Email subscription with Brevo integration
- **Footer** — Quick links, social media icons

### Auth Pages
- `/login` — Google SSO login
- `/signup` — Google SSO signup
- `/auth/callback` — JWT token handler after OAuth redirect

### Protected Pages
- `/dashboard` — Portfolio stats, market overview, quick actions
- `/profile` — User profile from Google account

---

## Architecture

### Frontend (Next.js App Router)
- **RTK Query** handles ALL API calls — no raw `fetch()` or `axios` in components
- **Redux** stores JWT token + user state, persisted to `localStorage`
- **MUI** dark theme matching the Figma design
- Token auto-injected into all API requests via `prepareHeaders`

### Backend (NestJS)
- **Auth Module** — Google OAuth2 via Passport, JWT generation
- **Users Module** — find-or-create user on Google login, `/users/me` endpoint
- **Newsletter Module** — email validation, Brevo contact + transactional email, SQLite storage
- **Prisma** — SQLite database (swap to PostgreSQL for production)

### OAuth Flow
```
Browser → /auth/google → Google Login → /auth/google/callback
→ NestJS generates JWT → redirects to /auth/callback?token=xxx
→ Next.js stores token → redirects to /dashboard
```

### Newsletter Flow
```
User enters email → RTK Query POST /newsletter/subscribe
→ NestJS validates → adds to Brevo contacts → sends confirmation email
→ saves to DB → returns message → frontend shows backend message
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /auth/google | — | Redirect to Google OAuth |
| GET | /auth/google/callback | — | OAuth callback, returns JWT |
| GET | /users/me | JWT | Get current user profile |
| POST | /newsletter/subscribe | — | Subscribe to newsletter |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) |
| State/API | Redux Toolkit + RTK Query |
| UI | Material UI v6 (dark theme) |
| Backend | NestJS |
| Auth | Google OAuth2 + JWT |
| Email | Brevo (transactional) |
| Database | SQLite via Prisma (dev) |
