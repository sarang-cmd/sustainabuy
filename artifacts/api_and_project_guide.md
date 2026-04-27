# SustainaBuy: Ecosystem & API Guide 🍏

This guide explains how SustainaBuy works "under the hood," the purpose of its files, and the external services (APIs) required to power Release 0.3.

## 1. Project Architecture (File Map)
Think of the project as a body: **App** is the brain/logic, **Components** are the limbs/UI, and **Lib** is the nervous system/data.

### 📂 `app/` (The Routes)
Each folder here represents a page on the website.
- **`page.tsx`**: The main Landing Page (Hero, Trending Finds, Search).
- **`products/`**: The catalog where users search and filter items.
- **`products/[id]/`**: The specific page for one product (dynamic).
- **`add-product/`**: The "AI Product Scanner" interface.
- **`account/`**: Everything related to the user's profile and settings.
- **`(auth)/`**: Handles Login and Signup screens.
- **`databank/`**: A page for detailed sustainability data analysis.
- **`globals.css`**: The design rules (colors, fonts, and those "Liquid Glass" animations).

### 📂 `components/` (The Building Blocks)
- **`layout/`**: Parts that stay visible everywhere (Navbar at the top, Footer at the bottom).
- **`product/`**: The "ProductCard" used to display items in grids.
- **`ui/`**: Reusable design elements like our custom buttons, inputs, and the "LiquidCard" glass container.

### 📂 `lib/` (The Logic & Data)
- **`db.ts`**: The "Database Manager." It talks to Firebase to save/load products and users.
- **`firebase.ts`**: The connection bridge to Google Firebase.
- **`scoring.ts`**: The "Engine" that calculates sustainability scores (materials vs origin).

---

## 2. The "Student Stack" (Zero-Cost Fuel)
To build SustainaBuy without spending a single cent, we will use "Community Fuel" instead of expensive enterprise APIs.

### A. The Database: **Google Firebase (Spark Plan)**
- **Cost**: $0 (100% Free).
- **Function**: Core storage for users and products. 
- **Strategy**: We will use Firestore’s generous free limits (50k reads/day). For a solo dev/student app, this is effectively "unlimited."

### B. The Comparison Engine: **Meta-Search Logic**
- **Cost**: $0 (Free).
- **Function**: Instead of a expensive $100/mo API like Rainforest, we will build a **Smart Scraper/Meta-Searcher**.
- **Strategy**: We will use free endpoints (like DuckDuckGo's JSON search) or lightweight "Meta-APIs" on RapidAPI that have permanent free tiers to find seller links and prices.

### C. The Intelligence: **"Heuristic AI" & Local Models**
- **Cost**: $0 (Unlimited).
- **Function**: Powering the "AI Product Scanner."
- **Strategy**: 
    - **Step 1**: Use a high-performance **Keywords Mapping Engine** (completely local and free).
    - **Step 2**: If the user needs deeper analysis, we can use **Transformers.js** to run small AI models directly in the user's browser (no server costs, 100% private, 100% free).
    - **Alternative**: Use the **Mistral AI** free tier (which offers high rate limits for developers).

---

## 3. Environment Setup (Getting Hands-On)
To run the project, you need a `.env.local` file. This is a "Secret Folder" where we store keys so they aren't exposed to the public.

| Variable | Source | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_...` | Firebase Console | Connects the app to your cloud database. |
| `OPENAI_API_KEY` | OpenAI Dashboard | Allows the "AI Scanner" to think and analyze. |
| `PRODUCT_API_KEY` | Rainforest / Idealo | Fetches real prices, images, and seller links. |

---

## 4. How the "Scanner" Works (Phase 4 Logic)
1. **User Types**: "Nike Air Max."
2. **Step 1 (Rainforest API)**: Fetches real photos, current prices, and seller links.
3. **Step 2 (OpenAI)**: Analyzes the materials (e.g., "Recycled Polyester") and assigns a score.
4. **Step 3 (Firestore)**: Saves the result so other users can find it instantly.
5. **Result**: A beautiful product page with "Idealo-style" seller comparisons!
