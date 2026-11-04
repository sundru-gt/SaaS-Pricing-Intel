# SaaS Pricing Intelligence & Comparison Dashboard (MERN)

A full-stack **MERN** (MongoDB, Express.js, React 19, Node.js) web application that transforms B2B software keywords into an interactive pricing comparison dashboard with verified vendor rate cards, dynamic ROI calculators, Gemini 2.5 Flash AI pricing intelligence, guided recommendation flows, and side-by-side matrices.

---

## 🏗️ Architecture & Project Structure

The project is decoupled into clean **Client** and **Server** tiers:

```
├── client/                           # React Frontend (Vite 6 + React 19 + Tailwind CSS)
│   ├── src/
│   │   ├── components/               # Modular UI building blocks
│   │   │   ├── categories/           # CategoryChips, Subtype Filters
│   │   │   ├── comparison/           # Side-by-side Comparison Drawer & Table
│   │   │   ├── layout/               # Sticky Frosted Header, Brand Pill, Theme Toggle
│   │   │   ├── newsletter/           # The Price Watch Newsletter Subscription
│   │   │   ├── pricing/              # PricingCalculator with Dynamic Contrast Slider
│   │   │   ├── recommendations/      # 4-Step Guided Recommendation Flow
│   │   │   ├── search/               # Fixed Floating Search Dock with '/' Shortcut
│   │   │   ├── shared/               # SoftwareLogo Monograms, Toast, Disclaimers, Toolbar
│   │   │   ├── sources/              # Verified Rate Cards & Timestamps
│   │   │   ├── summary/              # QueryBubble, 2-Line Clamped AI Summary Section
│   │   │   ├── toolkit/              # SaaS Shelfware Waste & Renewal Hike Calculators
│   │   │   ├── vendors/              # ResultCards (Grid & Carousel), Detail Sheet, SideDesk
│   │   │   └── video/                # Explainer Video with Interactive Desktop Chapters
│   │   ├── data/                     # Client fallback vendor & category data
│   │   ├── lib/                      # API callers, category themes, pricing formulas
│   │   ├── App.jsx                   # Main Dashboard Orchestrator
│   │   ├── index.css                 # Design tokens, custom slider styling, dot grid
│   │   └── main.jsx                  # React DOM entry
│   ├── index.html                    # HTML shell
│   ├── vite.config.js                # Vite build configuration with API proxy
│   ├── tailwind.config.js            # Tailwind typography, theme extensions & animations
│   └── package.json
│
├── server/                           # Express 4 & Node.js Backend
│   ├── config/                       # MongoDB database connection with automatic memory fallback
│   ├── data/                         # Verified master datasets for 28+ vendors & 8 categories
│   ├── lib/                          # Server-side pricing calculation & search resolution engines
│   ├── models/                       # Mongoose Schemas (Category, Vendor, Newsletter, SearchLog)
│   ├── routes/                       # Modular REST API endpoints:
│   │   ├── aiRoutes.js               # POST /api/ai/summary (Gemini 2.5 Flash + Search Grounding)
│   │   ├── categoryRoutes.js         # GET /api/categories
│   │   ├── vendorRoutes.js           # GET /api/vendors (filtering by category, subtype, keyword)
│   │   ├── searchRoutes.js           # POST /api/search (query matching + analytics logging)
│   │   ├── pricingRoutes.js          # POST /api/pricing/calculate
│   │   └── newsletterRoutes.js       # POST /api/newsletter/subscribe
│   ├── seed/                         # Database population script
│   ├── .env                          # Backend environment variables (Gemini API key, Port, DB URI)
│   ├── server.js                     # Express application entry point (Port 5000)
│   └── package.json
│
├── Assesment.pdf                     # Original assessment specification
├── package.json                      # Monorepo conductor running client and server concurrently
├── README.md                         # Project documentation
└── WRITEUP.md                        # Technical evaluation write-up
```

---

## ⚡ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 6, Tailwind CSS 3, Lucide React, LocalStorage |
| **Backend** | Node.js (ES Modules), Express 4, Mongoose 8 |
| **Database** | MongoDB with seamless in-memory fallback (runs with or without a MongoDB daemon) |
| **AI Intelligence** | Google Gemini 2.5 Flash (`generativelanguage.googleapis.com`) with Google Search Grounding |
| **Styling** | Dark/Light mode theme system, CSS Custom Properties, Tabular figures, Dot-grid canvas |

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies

From the project root:

```bash
# Install root orchestration dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
cd ..
```

---

### 2. Configure Environment Variables

The server includes a configured `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/saas-pricing
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note on Gemini Key**: If a Gemini API key is provided, the dashboard queries `gemini-2.5-flash` with real-time Google Search grounding. If absent or offline, an intelligent deterministic 5-line SaaS pricing analyst engine automatically takes over without disruption.

---

### 3. Run Client and Server Simultaneously

From the project root, launch both tiers with a single command:

```bash
npm run dev
```

This starts:
- **Express Backend**: [http://localhost:5000](http://localhost:5000) (Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health))
- **React Frontend**: [http://localhost:5173](http://localhost:5173)

---

### 4. Or Run Tiers in Separate Terminals

#### Terminal 1 — Backend:
```bash
npm run server
```

#### Terminal 2 — Frontend:
```bash
npm run client
```

---

### 5. (Optional) Seed MongoDB Database

```bash
npm run seed
```

> **Zero-Friction Evaluation**: If MongoDB is not running locally, the server's resilient connection pool immediately activates pre-loaded in-memory collections so every filter, calculation, and search query operates seamlessly.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & MongoDB / fallback status |
| `GET` | `/api/categories` | Retrieves all 8 software verticals + All category |
| `GET` | `/api/categories/:id` | Retrieves category by ID or slug |
| `GET` | `/api/vendors` | Lists vendors with query filters (`?categoryId=...&subType=...&q=...`) |
| `GET` | `/api/vendors/:id` | Full vendor profile, plan editions, contract policies |
| `POST` | `/api/search` | Natural language keyword resolver with query log tracking |
| `POST` | `/api/pricing/calculate` | Mathematical seat multiplier, base fees, and annual savings |
| `POST` | `/api/ai/summary` | Executive 5-line pricing intelligence generated by Gemini 2.5 Flash |
| `POST` | `/api/newsletter/subscribe` | Validates corporate email and persists newsletter subscribers |

---

## 🌟 Key UI & Engineering Highlights

1. **Gemini 2.5 Flash Pricing Summary (FR-2)**:
   - Queries Google's latest `gemini-2.5-flash` model with Google Search Grounding to extract up-to-date entry rates, mid-tier pricing, free plans, and contract caveats.
   - Clamped by default to **2 lines** (`line-clamp-2`) with an interactive **"Read more" / "Show less"** toggle to maintain dashboard cleanliness.

2. **Theme-Aware Contrast Seats Slider (FR-7)**:
   - Dynamic track progress indicator:
     - **Light Mode**: Dragged portion on the left is **solid black** (`#000000`), remaining unfilled portion is **white** (`#ffffff`) with a hairline border outline.
     - **Dark Mode**: Dragged portion on the left is **solid white** (`#ffffff`), remaining unfilled portion is **black** (`#000000`).
   - Matching high-contrast thumb with drop shadow for smooth feedback.

3. **Modern Software Benchmark Cards (FR-9)**:
   - Tool names and monograms sit in a dedicated top header row with `truncate` and `whitespace-nowrap`, preventing vertical letter wrapping.
   - Feature highlight badges (`★ Best for Product Event Funnels`) are rendered in their own row below the title.
   - Prominent **Starting Rate** and **Free Tier** status badges.
   - Supports both **Grid View** and **Horizontal Scroll Snap Carousel** layouts.

4. **8 Colorful Category Themes & Monograms**:
   - Distinct color palettes and Lucide icons across all 8 verticals (Rose for Video, Emerald for HR, Amber for Accounting, Blue for CRM, Purple for PM, Sky for Collaboration, Fuchsia for Analytics, Amber for Reviews).
   - Deterministic 8-palette gradient monogram generator ensuring missing favicons render crisp emblems.

5. **Sticky Frosted Glass Header**:
   - Header is pinned (`sticky top-0 z-50 backdrop-blur-xl bg-background/90`) with live benchmark indicators, category navigation, currency switcher (USD $ / INR ₹), and theme toggle.

6. **Interactive Comparison Drawer & Floating Dock (FR-10)**:
   - Select 2–3 software tools from any card to trigger a floating dock with vendor avatars.
   - Expand the side-by-side comparison drawer to inspect feature sets, contract terms, hidden add-ons, and a live seat count multiplier that automatically highlights the lowest-cost solution.
