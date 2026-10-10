# 🧭 Rove — AI Travel Operating System

> *“To wander, explore, and travel freely — but thoughtfully.”*

Rove is an intelligent, full-stack **AI Travel Operating System** built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

For the complete project overview, comprehensive architectural guide, and component breakdown, please refer to the master documentation:
👉 **[Root README.md](../README.md)**

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start local development server (with Turbopack)
npm run dev

# Build production static export
npm run build

# Run code linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Key Subdirectories

- [`src/app`](./src/app) — Next.js App Router root layout, workspace page, and global styles.
- [`src/components`](./src/components) — All 25 interactive travel OS components (Itinerary, Interactive Map, Budget Intelligence, What-If Simulator, Travel Mode HUD, etc.).
- [`src/context`](./src/context) — Centralized state engine (`RoveContext.tsx`) managing locks, re-optimization, What-If simulation, wallet, and chat.
- [`src/types`](./src/types) — Comprehensive TypeScript domain models (`rove.ts`).
- [`src/data`](./src/data) — Default trip datasets and mock seed records (`mockData.ts`).
- [`docs/`](./docs) — Detailed project specifications and hackathon master blueprints.
