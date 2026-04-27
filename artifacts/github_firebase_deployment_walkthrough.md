# Walkthrough: GitHub & Firebase Deployment 🚀

This guide provides a focused, step-by-step walkthrough for uploading your SustainaBuy project to GitHub and deploying updates to your live Firebase site.

---

## 1. Publishing to GitHub 🐙

Whether you are starting fresh or updating an existing repository, follow these steps.

### Choice A: Pushing to a NEW Repository
1.  **Initialize Git** (if not already done):
    ```powershell
    git init
    ```
2.  **Add Your Files**:
    ```powershell
    git add .
    ```
3.  **Commit the Code**:
    ```powershell
    git commit -m "feat: complete Release 0.3 implementation"
    ```
4.  **Create a Repository on GitHub**: Go to [github.com/new](https://github.com/new) and create a repository named `sustainabuy`.
5.  **Connect & Push**:
    ```powershell
    git remote add origin https://github.com/YOUR_USERNAME/sustainabuy.git
    git branch -M main
    git push -u origin main
    ```

### Choice B: Updating an EXISTING Repository
1.  **Stage Changes**:
    ```powershell
    git add .
    ```
2.  **Commit**:
    ```powershell
    git commit -m "chore: update with release 0.3 features"
    ```
3.  **Push**:
    ```powershell
    git push origin main
    ```

---

## 2. Deploying Updates to Firebase ☁️

Use these steps to push your latest code changes (UI, logic, styles) to the live web.

### Step 1: Create a Production Build
Next.js needs to optimize your code for production before it can be hosted.
```powershell
npm run build
```

### Step 2: Test Locally (Optional but Recommended)
Ensure the build works as expected before going live.
```powershell
npx firebase serve
```

### Step 3: Deploy to Hosting
Once the build is finished (usually in the `.next` or `out` folder depending on your config), run:
```powershell
firebase deploy --only hosting
```

### Step 4: Verify Live
Visit your Firebase URL (e.g., `sustainabuy-abcde.web.app`) to see the new features in action!

---

> [!TIP]
> **Environment Variables**: Remember that if you are using a new environment, you must copy your `.env.local` values to the Firebase/Vercel dashboard under "Environment Variables" for features like Firebase Auth and Firestore to work correctly in production.
