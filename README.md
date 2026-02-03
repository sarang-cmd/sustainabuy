# SustainaBuy

SustainaBuy is a production-ready sustainable shopping comparison application. It helps users identify, score, and recommend products based on their sustainability impact rather than just price, utilizing AI scoring and transparent data breakdowns.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (Animations), Lucide React (Icons)
- **Backend**: Firebase (Authentication, Firestore)
- **AI**: Perplexity AI (for Sustainability Scoring)

## Features
- **Glassmorphism UI**: Premium dark-mode design with translucent cards and smooth animations.
- **AI Sustainability Scoring**: scores products 0-100 based on materials, manufacturing, and longevity.
- **Smart Comparison**: Side-by-side product comparison view.
- **Wishlist**: Save sustainable finds (synced with Firestore).
- **Authentication**: Google and GitHub login support.

---

## 🚀 Setup & Configuration Guide

Follow these steps to configure and run the project locally.

### 1. Clone & Install
```bash
git clone <repository-url>
cd SustainaBuy
npm install
```

### 2. Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (e.g., `sustainabuy-dev`).
3. **Enable Authentication**:
   - Go to **Build** > **Authentication** > **Sign-in method**.
   - Enable **Google** and **GitHub** providers.
4. **Enable Firestore**:
   - Go to **Build** > **Firestore Database**.
   - Click **Create Database**.
   - Start in **Test Mode** (for development).
5. **Get Config**:
   - Go to **Project Settings** (gear icon).
   - Scroll to "Your apps" and select Web `</>`.
   - Register the app and copy the `firebaseConfig` object values.

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Firebase keys and Perplexity API key:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Perplexity AI (Optional - Falls back to mock if missing)
PERPLEXITY_API_KEY=your_perplexity_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Troubleshooting

- **"Missing Firebase Config"**: Ensure all variables in `.env.local` start with `NEXT_PUBLIC_`. Restart the server after changing `.env` files.
- **Auth Errors**: Ensure your domain (`localhost`) is added to "Authorized Domains" in Firebase Authentication settings.
- **Styling Issues**: This project uses Tailwind v4. Ensure your VS Code extension is up to date.

## Deployment
This project is optimized for deployment on Vercel.
1. Push to GitHub.
2. Import project in Vercel.
3. Add the environment variables from step 3 to Vercel's project settings.
4. Deploy!
