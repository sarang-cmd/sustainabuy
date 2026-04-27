# SustainaBuy

SustainaBuy is a modern shopping companion that helps you make conscious choices by analyzing products for sustainability. Built with Next.js, Tailwind CSS (Glassmorphism), and Firebase.

## Features
- **AI-Powered Analysis**: Instant sustainability scores (0-100) based on materials and supply chain.
- **Glassmorphism UI**: Premium, modern interface with dark mode by default.
- **Product Search & Comparison**: Find and filter manufactured goods by eco-impact.
- **Automatic Product Scanner**: "Scan" any product name to instantly generate an AI assessment and add it to the database.
- **User Accounts & Wishlists**: Save favorite sustainable finds and track your impact.
- **Comparison Tool**: View products side-by-side to make the best choice.

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS v3 (Custom Palette: Jet Black, Cerulean, Tropical Teal)
- **Backend**: Firebase (Auth, Firestore)
- **Icons**: Lucide React

---

## 🚀 Setup Guide

Follow these steps to get the project running locally.

### 1. Prerequisites
- Node.js 18+ installed
- A Google account (for Firebase)

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Enable Authentication**:
    - Go to **Build** > **Authentication** > **Get Started**.
    - Enable **Google** and **GitHub** providers in the **Sign-in method** tab.
3. **Create Firestore Database**:
    - Go to **Build** > **Firestore Database** > **Create Database**.
    - Start in **Test Mode** (allows read/write for development).
4. **Get Config Keys**:
    - Go to **Project Settings** (gear icon) > **General**.
    - Scroll down to "Your apps" and select the Web icon (`</>`).
    - Register the app and copy the `firebaseConfig` object values.

### 4. Environment Variables
1. Rename `.env.local.example` to `.env.local`:
   ```bash
   mv .env.local.example .env.local
   # OR on Windows PowerShell
   ren .env.local.example .env.local
   ```
2. Open `.env.local` and paste your Firebase keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
   > **Note**: Do not commit this file to GitHub. It is already in `.gitignore`.

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to verify.

### 6. Verify Features
- **Auth**: Click "Log In" and try signing in with Google.
- **Scan/Add**: Go to "Scan New" (or `/add-product`) and type a product name (e.g., "Bamboo Toothbrush") to populate the DB.
- **Profile**: Click your avatar > "Account" to see your dashboard.
- **Wishlist**: Heart an item and check `/wishlist`.

## Troubleshooting
- **Firebase Error (auth/configuration-not-found)**: Ensure you enabled Authentication in the Firebase Console.
- **Tailwind Styles Missing**: Check if `tailwind.config.ts` includes the correct paths.
- **Icons not showing**: Ensure `lucide-react` is installed (`npm install lucide-react`).

## License
MIT
