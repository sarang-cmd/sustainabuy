# 🌿 SustainaBuy v1.0.0 (Production)

> **The definitive marketplace for conscious consumers.**  
> SustainaBuy is a premium, AI-powered ecosystem designed to help users discover, analyze, and compare the sustainability impact of every product they own or want to buy.

![SustainaBuy Banner](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200)

---

## 💎 Premium Design Philosophy
SustainaBuy isn't just a tool; it's an experience. Built with a **Liquid Glassmorphism** aesthetic, the platform features:
- **Dynamic HSL Palettes**: Deep `Jet Black` backgrounds with `Cerulean` and `Tropical Teal` accents.
- **Micro-Animations**: Powered by `Framer Motion` for smooth, fluid transitions and interactive components.
- **Mobile-First Responsive Layout**: A seamless experience from ultra-wide monitors to handheld devices.

---

## 🛠️ Core Technology Stack
- **Framework**: [Next.js 16.2 (Turbopack)](https://nextjs.org/) - Utilizing React 19 for cutting-edge performance.
- **Database & Auth**: [Firebase 12](https://firebase.google.com/) - Real-time synchronization and secure user authentication.
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) - Optimized with custom utility tokens.
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) - For liquid-smooth UI interactions.
- **Icons**: [Lucide React](https://lucide.dev/) - A beautiful, consistent icon system.

---

## ✨ Key Features Walkthrough

### 1. The Global Data Bank
The heart of SustainaBuy. It combines real-time Firestore data with an instant-load local fallback system for maximum resilience.
```typescript
// Optimized data fetching pattern from lib/db.ts
export async function getProduct(id: string): Promise<Product | null> {
    // 1. Instant local resolution for zero-latency initial view
    const foundLocal = DEMO_PRODUCTS.find((p) => getProductSlug(p.name) === id);
    if (foundLocal) return { ...foundLocal, id } as Product;

    // 2. Background Firestore synchronization
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}
```

### 2. AI Sustainability Scoring
Every product is passed through our scoring algorithm which analyzes five key pillars:
- **Materials**: Percentage of recycled/organic content.
- **Manufacturing**: Carbon footprint of the production process.
- **Supply Chain**: Distance traveled and labor practices.
- **Longevity**: Durability and repairability.
- **Circularity**: Ability to be recycled or composted.

### 3. Interactive Comparison Tool
Select multiple products to see a side-by-side breakdown of their scores, price-to-impact ratio, and certification status.

### 4. Liquid Search Intent
Our search bar doesn't just match keywords; it understands intent.
- `search by brand`: "Show me Patagonia jackets"
- `search by category`: "Eco-friendly sneakers"
- `mixed search`: "Recycled cotton tee under $50"

---

## 🚀 Technical Implementation Details

### Deployment Configuration
The project is optimized for **Static Export** (`output: export`), making it incredibly fast to serve via Firebase Hosting or any CDN.
```javascript
// next.config.js snippet
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: { turbo: {} }
};
```

### Authentication Logic
Integrated with `AuthContext.tsx` to provide a seamless login experience across the entire application.
```tsx
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
```

---

## 🔮 Roadmap & Next Steps

### 1. Integrating Puter.js
We are moving towards a decentralized, cloud-native storage solution by integrating **Puter.js**. This will allow:
- **Distributed Data Storage**: User-owned data silos for maximum privacy.
- **Cloud Computing**: Offloading heavy AI scoring tasks to Puter's cloud runtime.
- **Collaborative Features**: Real-time product reviews and shared wishlists powered by Puter's backend.

### 2. Real-time Supply Chain Tracking
Integrating third-party APIs to track the actual shipping route of products added to the database.

### 3. AR Product Scanner
A mobile-first AR feature to scan physical barcodes in stores and see their sustainability score hovering in 3D.

---

## 👨‍💻 Developed By
**sarang-cmd**  
- GitHub: [@sarang-cmd](https://github.com/sarang-cmd)  
- Instagram: [@aaravdeev](https://instagram.com/aaravdeev)  

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
