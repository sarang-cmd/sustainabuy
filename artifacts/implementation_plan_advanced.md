# SustainaBuy V1.1 - Advanced Features & Persistence Implementation Plan

This plan addresses the remaining features: Wishlist, User Account, Automatic Product Adding, Product Comparison, and full Firestore integration.

## Goal Description
Upgrade the application from a mock-data prototype to a fully functional app with persistent database storage, user profiles, and advanced product discovery features.

## User Review Required
> [!IMPORTANT]
> This update requires Firestore to be active. Ensure `NEXT_PUBLIC_FIREBASE_PROJECT_ID` and other keys are correctly set in `.env.local` and the Firestore database is created in the Firebase Console (Test Mode).

## Proposed Changes

### 1. Firestore Integration (Persistence)
- **Library**: Create `lib/db.ts` to handle Firestore operations.
    - `getProducts(filters)`
    - `getProduct(id)`
    - `addToWishlist(userId, productId)`
    - `removeFromWishlist(userId, productId)`
    - `getUserProfile(userId)`

### 2. User Account System
- **Profile Page** (`app/account/page.tsx`):
    - User details (from Auth).
    - Sustainability Impact Score (gamification).
    - Links to Wishlist and Settings.
- **Wishlist Page** (`app/wishlist/page.tsx`):
    - Display products saved by the user.
    - "Remove" functionality.

### 3. Automatic Product System ("The Scanner")
- **Concept**: A "Scan/Add Product" feature. If a product isn't in the DB, the system "finds" it (simulates external API + AI scoring) and keeps it in Firestore.
- **UI**: A global search/add bar or a dedicated "Scanner" page.
- **Backend flow**: `Check DB -> If missing, Mock API Fetch -> Calculate Score -> Save to Firestore -> Return`.

### 4. Advanced Product Features
- **Comparison** (`app/compare/page.tsx`):
    - Side-by-side view of 2-3 products.
    - Highlights differences in scores and specs.
- **Enhanced Listing** (`app/products/page.tsx`):
    - Connect to Firestore `products` collection.
    - Implement real filtering (Price Range, Brand, Score) and Sorting.

## Verification Plan

### Automated Tests
- N/A (Manual verification emphasized for V1).

### Manual Verification
1.  **Auth**: Log in and verify the Account page shows user data.
2.  **Wishlist**: Click "Heart" on a product -> Go to Wishlist -> Verify it appears.
3.  **Persistence**: Refresh the page; Wishlist items should remain.
4.  **Auto-Add**: Use the "Add Product" feature to generate a new item, then find it in the Search.
