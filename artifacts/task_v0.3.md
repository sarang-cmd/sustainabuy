# SustainaBuy Release 0.3 Task List

## 1. Visual & UI Optimization (The "Wow" Factor) 🎨
- [x] Fix Landing Page Search Bar (Visual layout fix) <!-- id: 101 -->
- [x] Animate "Consciously" word (Dynamic gradient) <!-- id: 102 -->
- [x] Tone down box parallax effect intensity <!-- id: 103 -->
- [x] Add matching parallax to images <!-- id: 104 -->
- [x] Make AI-Powered Analysis dot pulse <!-- id: 105 -->
- [x] Fix Header Profile (Center image, use icon fallback, no letter) <!-- id: 106 -->
- [x] Fix "View All" button under Trending Finds <!-- id: 111 -->

## 2. Core Search & Navigation 🔍
- [x] Implement global search logic (Landing, Header, All Pages) <!-- id: 107 -->
- [x] Build Meta-Search Engine (Keyword mapping to real results) <!-- id: 108 -->
- [x] Search Normalization (Casing, spacing, typos, synonyms) <!-- id: 109 -->
- [x] Parse User Intent (Local data query, no fake items from strings) <!-- id: 110 -->
- [x] Fix broken product links (Use IDs, not search text slugs) <!-- id: 137 -->
- [x] Implement Search Debouncing <!-- id: 142 -->

## 3. Product System & Comparison (Idealo Style) 📦
- [x] Support Product Variants (Models, sizes, colors, editions) <!-- id: 112 -->
- [x] Implement Idealo-style grouping (Group -> Variant -> Offers) <!-- id: 138 -->
- [x] Build Meta-Comparison Map (Free seller link generator) <!-- id: 139 -->
- [x] List simulated sellers per variant (Price, currency, shipping, stock) <!-- id: 113 -->
- [x] Implement Sorting (Cheapest first, score, rating, speed) <!-- id: 114 -->
- [x] Score visibility (Cards, Results, Variants, Details) <!-- id: 115 -->
- [x] Product Detail Pages (One per group, nested variants) <!-- id: 116 -->
- [x] Sanitize seller buy links (Fix broken/hide invalid) <!-- id: 140 -->
- [x] Fix Missing Images (Local fallbacks & category templates) <!-- id: 141 -->
- [x] Implement functional Slide-over Cart <!-- id: 146 -->

## 4. AI Scanner & Data Logic 🤖
- [x] Fix AI Scanner Performance (<2s, Heuristic mapping, Caching) <!-- id: 119 -->
- [x] Enhance Scanner Logic (Multi-step verification) <!-- id: 147 -->
- [x] Scanner Progress UI (Step messages) <!-- id: 148 -->
- [x] Label estimated score vs verified data <!-- id: 149 -->
- [x] Fix "Run Life Cycle Assessment" hang <!-- id: 150 -->
- [x] Handle Scanner Skeletons (Loading states) <!-- id: 151 -->
- [x] Fix "Endless Scanning" on Products page <!-- id: 152 -->
- [x] Fix "Recommended for You" section <!-- id: 153 -->
- [x] Support API result pagination (Simulated) <!-- id: 120 -->

## 5. Search & Discovery 🔍
- [x] Implement Search Debouncing (Wait 300ms before filtering) <!-- id: 142 -->
- [x] Implement "Trending Brands" section (Quick filter chips) <!-- id: 154 -->
- [x] Implement "Recently Viewed" section (localStorage) <!-- id: 155 -->
- [x] Improve search results relevance (Brand > Category > Key) <!-- id: 156 -->
- [x] Integrate advanced meta-search intents (Adidas, Nike, Stanley) <!-- id: 157 -->

## 6. Account & Auth Features 👤
- [x] Expand Account Settings (Name, birthday, bio for local profiles) <!-- id: 124 -->
- [x] Fix My Account button routing / partial loads <!-- id: 139 -->
- [x] Avatar Customization (Preset gallery & image upload) <!-- id: 125 -->
- [x] Global Avatar Sync (Instant update across Navbar/Header) <!-- id: 146 -->
- [x] Account Linking visibility (Google/GitHub status) <!-- id: 126 -->
- [x] Email Management (Add, remove, set primary) <!-- id: 127 -->
- [x] Password Management (Change and Reset flow) <!-- id: 128 -->
- [x] Enable Auth State Session Updates (No auto-logout on change) <!-- id: 140 -->
- [x] Account History Page (Viewed products, searches, clicks) <!-- id: 129 -->
- [x] Enable/Fix Email Login Provider & Error Messaging <!-- id: 147 -->

## 7. Static Pages & Content 📄
- [x] Implement Footer Pages (Privacy Policy, Careers, About Us) <!-- id: 130 -->
- [x] Fix Data Bank bottom buttons (Verified source, Audit, Carbon) <!-- id: 131 -->
- [x] Support API result pagination <!-- id: 148 -->
- [x] Implement clear Success/Failure validation feedback <!-- id: 141 -->
- [x] Map Auth setup & Env variable documentation <!-- id: 134 -->
- [x] Global Empty / Error / Loading state coverage <!-- id: 133 -->

## 8. Performance & Stability ⚡
- [x] API Response Caching & Search Debouncing <!-- id: 132 -->
