# Overhaul Plan - UX, Performance & Features

## 1. Performance & Bug Fixes 🛠️
- **Reduce GPU Load**: Lower `backdrop-blur` from `xl/2xl` to `md` in `globals.css` and `LiquidCard`.
- **Fix Hover Clipping**: Remove `overflow-hidden` from `ProductCard` to prevent image disappearance during 3D tilt.
- **Hardware Acceleration**: Use `will-change: transform` on animated cards.
- **Snappy Transitions**: Tune `framer-motion` springs for faster, non-oscillating animations.

## 2. Advanced Product Features 🔍
- **Fast Search & Filters**: Ensure search is responsive and category filtering is instantaneous.
- **Recommendations Engine**:
  - Add a "Smart Recommendations" section on the Products page.
  - Logic: Show products with scores > 80 or from categories the user frequently views.
- **Full Catalog Visibility**: Ensure pagination or infinite scroll (for simplicity in V1, just ensure effective loading/filtering of the full Firestore collection).

## 3. Visual Polish 🍏
- **Data Bank Refinement**: Better layout and more premium animations for topic cards.
- **Landing Page Speed**: Optimize hero section animations to prevent "stutter" on first load.

## 4. Static Build Fix (Firebase Hosting) 🚀
- **Refactor Dynamic Routes**: Convert `app/products/[id]/page.tsx` to a Server Component.
- **Implement `generateStaticParams`**: Fetch all product IDs from Firestore at build time to pre-render product pages.
- **Client/Server Split**: Move interactive logic (Wishlist, Auth) to a separate Client Component while keeping the route static.

## 5. Deployment & Hosting 🚀
- **Firebase Hosting**:
  - Configure `firebase.json` for Next.js 15.
  - Add deployment guide.

## Tasks
- [ ] Fix `globals.css` (reduce blur).
- [ ] Fix `LiquidCard.tsx` (remove overflow, add will-change).
- [ ] Update `ProductCard.tsx` (fix image layering).
- [ ] Implement Recommendations UI/Logic in `app/products/page.tsx`.
- [x] Refine `DatabankPage`.
- [ ] Fix `app/products/[id]/page.tsx` for static build (`generateStaticParams`).
- [ ] Guide Firebase Hosting setup.
