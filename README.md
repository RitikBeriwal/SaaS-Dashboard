# Analytix: SaaS Analytics Dashboard

A responsive SaaS analytics dashboard built with **React**, **Vite**, **Tailwind CSS**, **React Router** and **Recharts**. It runs entirely on local dummy data, with no backend.

## Demo login

| Email                     | Password   |
| ------------------------- | ---------- |
| `alex.morgan@analytix.io` | `demo1234` |

The login page also has a **Use demo account** button that fills these in.

## Features

- **Login / logout**: a login form with validation and an error for wrong details, dashboard pages that redirect to `/login` when you're signed out, a login that survives a page refresh (`localStorage`), and Sign out in the profile menu
- **Overview dashboard**: KPI cards, a revenue line chart, a sales bar chart, recent transactions and recent customers
- **Date range selector** (7 days / 30 days / 12 months) that updates the cards and charts
- **Transactions table** with Completed / Pending / Failed status filters
- **Analytics page**: year-over-year comparison toggle and a "top months" ranking you can switch between revenue and orders
- **Customers page**: search by name, email or company, plus status and plan filters
- **Reports page**: revenue and sales reports, a monthly statistics table and **CSV export**
- **Settings page**: profile form with validation; saved changes update the navbar and the welcome message
- **Light / dark theme**, remembered between visits with `localStorage`
- **Collapsible sidebar** on desktop and a **slide-in drawer** on mobile
- Notification and profile dropdowns that close on outside click or Escape

## Tech stack

| Purpose      | Library                       |
| ------------ | ----------------------------- |
| UI           | React 19 (function components, hooks) |
| Build tool   | Vite                          |
| Styling      | Tailwind CSS v4               |
| Routing      | React Router                  |
| Charts       | Recharts                      |
| Icons        | React Icons (Feather set)     |

State is handled with `useState`, `useEffect` and props only. There is no Redux or other state library.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Check the code with Oxlint           |

## Project structure

```
src/
├── components/      Reusable UI pieces (Sidebar, Navbar, StatCard, charts, tables...)
├── data/            Dummy data (dashboard numbers, transactions, customers)
├── layouts/         DashboardLayout: sidebar + navbar around every page
├── pages/           One file per route (Login, Dashboard, Analytics, Customers, Reports, Settings)
├── App.jsx          Routes, login state and shared state (user, customer search)
├── main.jsx         Entry point
└── index.css        Tailwind setup, dark mode and chart theme
```

## How the pieces talk to each other

- **Login**: App.jsx keeps `isLoggedIn` in state, starting from `localStorage`. Each route chooses what to show from it.
  Logged out, the dashboard routes render `<Navigate to="/login" />`. Logged in, `/login` renders `<Navigate to="/" />`.
  The Login page calls `onLogin()` after a successful check, and the Navbar's Sign out button calls `onLogout()`.
  This is a front-end demo: a real app would check the password on a server and use a secure session or token.
- **App.jsx** keeps the `user` and the `customerSearch` text in state and passes them down as props.
  The Settings page saves a new user through `onSaveUser`. The navbar search sets the customer search through `onSearch`.
- **DashboardLayout** keeps the UI state for the sidebar (collapsed / mobile drawer) and the theme, and renders the current page with `<Outlet />`.
- **Pages** read dummy data from `src/data` and pass it to components as props, e.g. `<RevenueChart data={...} />`.
- **Components** keep only their own small interactions in local state, for example the status filter inside `TransactionTable`.

## Deploying to Vercel

Import the repository in Vercel. It detects Vite automatically. `vercel.json` sends every URL to `index.html`, so refreshing a page like `/customers` works.
