# SustainaBuy Project Handover & AI Instructions 📄🚀

This document serves as the complete technical history, architecture overview, and operational guide for the **SustainaBuy** project (v0.3). It is designed to be read by an AI assistant to instantaneously understand the project's journey, from the first line of code to the current production state.

---

## 🏗️ Project Overview
**SustainaBuy** is a premium, AI-powered sustainability scanning and marketplace application. It empowers users to make conscious shopping decisions by providing real-time sustainability scores ("Eco-Scores") based on material analysis, manufacturing ethics, and corporate transparency.

### 💻 Technology Stack
- **Frontend**: Next.js 15+ (App Router), TypeScript, React.
- **Styling**: TailwindCSS (v4 compatible), Framer Motion (Liquid Design system).
- **Backend/Database**: Firebase Firestore.
- **Authentication**: Firebase Auth (Google & GitHub providers).
- **Icons**: Lucide React.
- **State Management**: React Context API (`AuthContext`, `CartContext`).

---

## 📜 Complete Version History

### **Release 0.1: Foundations**
- **Objective**: Initial structure and setup.
- **Key Files**: `app/page.tsx`, `lib/firebase.ts`.
- **Milestones**: Connected Firebase, basic landing page.

### **Release 0.2: Core Marketplace**
- **Objective**: Functional shopping experience.
- **Key Files**: `app/products/page.tsx`, `components/product/ProductCard.tsx`, `contexts/CartContext.tsx`.
- **Milestones**: Implemented Product Grid, Cart functionality, and Firebase seeding.
- **Note**: A full snapshot of v0.2 source code is preserved in `/v0.2-SNAPSHOT/`.

### **Release 0.3: AI Intelligence & Polish (Current)**
- **Objective**: Discovery ecosystem and AI integration.
- **Major Features**:
    1. **AI Heuristic Scanner**: Optimized scoring engine in `lib/scoring.ts` that provides instant feedback for major brands.
    2. **Meta-Search Engine**: Intent mapping in `lib/meta-search.ts` that understands natural language queries ("Nike shoes", "Eco backpacks").
    3. **Personalized Accounts**: Tab-based dashboard (`app/account/page.tsx`) with History, Wishlist, and Profile Settings.
    4. **Discovery Hub**: Trending brands carousel and "Recently Viewed" history (Local Storage).
    5. **Static Ecosystem**: Fully polished About Us, Privacy Policy, Careers, and Sustainability Data Bank pages.

---

## 🔍 Technical Deep Dives

### **1. The Sustainability Scoring Engine (`lib/scoring.ts`)**
Instead of hitting expensive APIs for every view, we use a **Heuristic Engine**. 
- **Mechanism**: Maps brand names and categories to a pre-defined `SustainabilityScore` object.
- **Transparency**: Scores are labeled as "AI-Estimated" or "Verified" in the UI.

### **2. Global State & Sync (`contexts/AuthContext.tsx`)**
- **The Problem**: User names/avatars from Firebase Auth often didn't match the personalized `UserProfile` in Firestore.
- **The Solution**: The `AuthContext` now manages a `userProfile` state. When a user updates their bio or avatar in Settings, the `refreshProfile()` function syncs this across the **Navbar**, **Dashboard**, and **Impact Cards** instantly.

### **3. Liquid Design System**
We use `Framer Motion` combined with `LiquidCard.tsx` to create a "living" UI.
- **Aesthetic**: Dark mode, glassmorphism, cerulean blue accents, and subtle parallax animations.

---

## 🛠️ Operational History (Commands & Permissions)

### **Git Configuration**
The project identity is configured for:
- `user.name`: "sarang-cmd"
- `user.email`: "sar.brawlstars@gmail.com"

### **Firebase Management**
- **Hardcoding**: For development portability, Firebase credentials were hardcoded into `lib/firebase.ts` at the user's request.
- **Deployment**: `firebase deploy --only hosting` is the primary command for pushing updates to: `sustainabuy-dev.web.app`.

### **Key Terminal Commands Run:**
- `npm install firebase framer-motion lucide-react clsx tailwind-merge`
- `git init`, `git add .`, `git commit`, `git push origin main`
- `firebase init hosting`
- `npm run build`

---

## 🤖 Instructions for the Next AI
If you are taking over this project, please adhere to these guidelines:

1.  **Maintain Aesthetic Consistency**: Every new component MUST use the Liquid Design style (glassmorphism/subtle glows). Use `@/components/ui/LiquidCard` for containers.
2.  **State Management**: Always use `useAuth()` to get the `userProfile` for the UI, rather than the raw Firebase `user` object.
3.  **Portability**: The folder `/artifacts/` contains all historical planning docs, UI mockups, and walkthroughs. Refer to these to understand past design decisions.
4.  **Lint Awareness**: The project currently has "Unknown at rule @tailwind" warnings in `globals.css`. These are expected in some IDE environments during Tailwind v4 transition and don't break the build.
5.  **Data Bank**: The interactive buttons in `app/databank/page.tsx` are currently placeholders (using alerts). Moving to Release 0.4 should involve transforming these into full visual sub-pages or modals.

---

**Project State**: Healthy & Production-Ready (v0.3)
**Last Updated**: February 5, 2026
**Handover Signed By**: Antigravity AI
