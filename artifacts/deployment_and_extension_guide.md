# SustainaBuy: Deployment & Future Expansion Guide 🚀

This guide provides step-by-step instructions for publishing your code, deploying your web app, converting it to native platforms, and building the Chrome extension ecosystem.

## 1. Source Control: GitHub 🐙

### New Repository
1. **Initialize Git**: Open your terminal in the project root.
   ```bash
   git init
   git add .
   git commit -m "feat: complete release 0.3"
   ```
2. **Create Repo**: Create a new repository on [GitHub](https://github.com/new).
3. **Link & Push**:
   ```bash
   git remote add origin https://github.com/your-username/sustainabuy.git
   git branch -M main
   git push -u origin main
   ```

### Existing/Old Repository
1. **Change Remote**: If you want to move this project into an existing repo.
   ```bash
   git remote set-url origin https://github.com/your-username/old-repo.git
   git add .
   git commit -m "Update SustainaBuy to v0.3"
   git push origin main
   ```

---

## 2. Web Deployment: Firebase & Beyond ☁️

### Updating Firebase
Since you already have a working Firebase site:
1. **Build**: Create a production-ready bundle.
   ```bash
   npm run build
   ```
2. **Deploy**:
   ```bash
   firebase deploy --only hosting
   ```

### Alternative Hosting (Recommended)
*   **Vercel (Best for Next.js)**: Connect your GitHub repo to [Vercel](https://vercel.com). It will auto-deploy every time you push to `main`.
*   **Netlify**: Similar to Vercel, very easy "Global CDN" deployment.

---

## 3. Mobile & Desktop Apps 📱💻

To turn SustainaBuy into an app without rewriting the code:

### Android & iOS (Capacitor)
1. **Install Capacitor**:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   ```
2. **Add Platforms**:
   ```bash
   npm install @capacitor/android @capacitor/ios
   npx cap add android
   npx cap add ios
   ```
3. **Open in IDE**: Use Android Studio or Xcode to build the final binary for the Stores.

### Windows App (Microsoft Store)
*   **PWA (Progressive Web App)**: Next.js can be converted into a PWA using `next-pwa`. Once it's a PWA, you can use [PWABuilder](https://www.pwabuilder.com/) to wrap it for the Microsoft Store.

---

## 4. Chrome Extension & Monetization 🧩

### Architecture
The extension should be a separate small project that:
1.  **Detects Products**: Monitors the URL (Amazon, Walmart, etc.).
2.  **Calls Your API**: Hits your `lib/scoring.ts` logic (via an API endpoint) to get the score.
3.  **UI Overlay**: Displays a small "SustainaBuy Badge" on the product image.

### Monetizing Ideas 💰
*   **Affiliate Links**: When a user views a low-score product, suggest a "Sustainable Alternative" using your `generateMetaOffers` logic with an affiliate tag.
*   **Brand Sponsorships**: Highlight "Verified" brands in the "Trending" section.
*   **API as a Service**: Sell your sustainability data/scoring engine to other green-tech companies.

---

## 5. Artifact Storage 📂

All of your project's planning artifacts, including **Task Lists**, **Implementation Plans**, and **Walkthroughs**, are stored locally on your machine at:

`C:\Users\sarbr\.gemini\antigravity\brain\3e531cbd-a8d1-4a43-9437-fe53b496f3b8\`

You can open this folder to view the Markdown files directly at any time.
