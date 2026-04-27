# SustainaBuy V1.0 Implementation Plan

This plan outlines the steps to build the SustainaBuy application, a sustainable shopping companion.

## User Review Required
> [!IMPORTANT]
> The application requires Firebase credentials (API Key, Auth Domain, Project ID) to function fully. The setup guide will include instructions on where to place these.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v3 (Glassmorphism, Custom Palette)
- **Backend/Auth**: Firebase (Auth, Firestore)
- **Icons**: Heroicons / Lucide React

## Modules & Features

### 1. Configuration & Design System
- **Tailwind Config**: Implement the specific Jet Black, Cerulean, Tropical Teal, Muted Teal, and Tea Green color palette.
- **Global Styles**: Base CSS for glassmorphism utilities and dark mode defaults.
- **Components**: Reusable UI elements (GlassCard, PrimaryButton, SustainabilityBadge).

### 2. Authentication (Firebase)
- **Context**: `AuthContext` to manage user sessions.
- **Pages**:
    - Login (Email/Password, Google, GitHub)
    - Signup
- **Profile**: User dashboard for settings and saved items.

### 3. Core Pages
- **Home**: Hero section, Search, Trending.
- **Data Bank**: Educational content about sustainability.

### 4. Products & Scoring
- **Data Model**: Firestore schema for Products (includes `sustainabilityScore`, `materialBreakdown`, etc.).
- **Search & Filter**: Product listing with filters for price, score, brand.
- **Product Detail**: In-depth view with "AI Score Breakdown".
- **Comparison**: Side-by-side view.

### 5. Backend Logic (Mocked/Simulated for V1)
- **AI Scoring Logic**: A utility that calculates a score (0-100) based on input attributes (mocked until real API provided).

## Proposed File Structure
```
app/
  (auth)/
    login/page.tsx
    signup/page.tsx
  products/
    page.tsx       <-- Search/Listing
    [id]/page.tsx  <-- Product Detail
  databank/
    page.tsx
  layout.tsx
  page.tsx
components/
  ui/
    GlassCard.tsx
    Button.tsx
    Input.tsx
  layout/
    Navbar.tsx
    Footer.tsx
  product/
    ProductCard.tsx
    SustainabilityScore.tsx
lib/
  firebase.ts
  utils.ts
  scoring.ts      <-- AI Logic
```

## Verification Plan
- **Setup**: `npm run dev` ensures Tailwind styles load correctly.
- **Auth**: Verify Login/Signup flows with Firebase Emulator or live project.
- **UI**: Visual check of Glassmorphism effects and responsiveness.
