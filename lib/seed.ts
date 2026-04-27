import { db } from "./firebase";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { Product } from "./db";

const DEMO_PRODUCTS: Omit<Product, "id" | "createdAt">[] = [
    {
        name: "Everleaf Runner Pro",
        brand: "Everleaf",
        description: "85% recycled ocean-bound rPET upper, FSC-certified natural rubber outsole. OEKO-TEX® 100 certified dyes throughout.",
        materials: ["Recycled rPET", "Natural Rubber", "Organic Cotton"],
        certifications: ["Eco Certified", "Fair Trade"],
        origin: "Portugal",
        price: 129.00,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
        score: 92,
        baseScore: 92,
        thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=200",
        category: "Footwear",
        breakdown: {
            materials: 96,
            manufacturing: 88,
            supplyChain: 92,
            longevity: 85,
            circularity: 98
        }
    },
    {
        name: "Recycled Denim Jacket",
        brand: "Patagonia",
        description: "Made from 100% recycled denim and organic cotton. Designed for durability and repairability.",
        materials: ["Recycled Denim", "Organic Cotton"],
        certifications: ["B Corp", "Fair Trade"],
        origin: "Vietnam",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
        score: 88,
        baseScore: 88,
        thumbnail: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=200",
        category: "Clothing",
        breakdown: {
            materials: 92,
            manufacturing: 85,
            supplyChain: 80,
            longevity: 95,
            circularity: 90
        }
    },
    {
        name: "Bamboo Organic Tee",
        brand: "Organic Basics",
        description: "Soft, breathable, and highly sustainable t-shirt made from organic bamboo fibers.",
        materials: ["Organic Bamboo"],
        certifications: ["GOTS Certified"],
        origin: "Turkey",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        score: 95,
        baseScore: 95,
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200",
        category: "Clothing",
        breakdown: {
            materials: 98,
            manufacturing: 92,
            supplyChain: 94,
            longevity: 88,
            circularity: 96
        }
    },
    {
        name: "Solar Charging Backpack",
        brand: "Solgaard",
        description: "A high-tech backpack with integrated solar panels made from ocean-bound plastic.",
        materials: ["Ocean Plastic", "Solar Panels"],
        certifications: ["Certified B Corp"],
        origin: "China",
        price: 165.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        score: 85,
        baseScore: 85,
        thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200",
        category: "Accessories",
        breakdown: {
            materials: 88,
            manufacturing: 80,
            supplyChain: 82,
            longevity: 85,
            circularity: 90
        }
    },
    {
        name: "Ethically Sourced Coffee",
        brand: "Fair Grounds",
        description: "Premium shade-grown coffee from regenerative farms in Colombia.",
        materials: ["Roasted Coffee Beans"],
        certifications: ["Fair Trade", "Organic"],
        origin: "Colombia",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
        score: 94,
        baseScore: 94,
        thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=200",
        category: "Food",
        breakdown: {
            materials: 96,
            manufacturing: 90,
            supplyChain: 98,
            longevity: 100,
            circularity: 80
        }
    },
    {
        name: "Sustainable Smartphone Case",
        brand: "Pela",
        description: "The world's first 100% compostable phone case made from flax and bio-polymers.",
        materials: ["Flax Shive", "Bio-polymer"],
        certifications: ["Climate Neutral"],
        origin: "Canada",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
        score: 97,
        baseScore: 97,
        thumbnail: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=200",
        category: "Technology",
        breakdown: {
            materials: 100,
            manufacturing: 95,
            supplyChain: 92,
            longevity: 85,
            circularity: 100
        }
    },
    {
        name: "Organic Cotton Bedding Set",
        brand: "Coyuchi",
        description: "100% GOTS certified organic cotton bedding, produced without harmful chemicals.",
        materials: ["Organic Cotton"],
        certifications: ["GOTS Certified", "Fair Trade"],
        origin: "India",
        price: 188.00,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
        score: 90,
        baseScore: 90,
        thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=200",
        category: "Home",
        breakdown: {
            materials: 95,
            manufacturing: 88,
            supplyChain: 85,
            longevity: 92,
            circularity: 90
        }
    },
    {
        name: "Zero Waste Shaving Kit",
        brand: "Leaf Shave",
        description: "Plastic-free metal razor designed to last a lifetime, replacing thousands of disposables.",
        materials: ["Zinc", "Stainless Steel"],
        certifications: ["Climate Neutral"],
        origin: "USA",
        price: 84.00,
        image: "https://images.unsplash.com/photo-1626285493db3-8f0a3d4400e2?auto=format&fit=crop&q=80&w=800",
        score: 98,
        baseScore: 98,
        thumbnail: "https://images.unsplash.com/photo-1626285493db3-8f0a3d4400e2?auto=format&fit=crop&q=80&w=200",
        category: "Personal Care",
        breakdown: {
            materials: 100,
            manufacturing: 94,
            supplyChain: 90,
            longevity: 100,
            circularity: 98
        }
    }
];

export async function seedDemoProducts() {
    console.log("Seeding demo products...");
    const productsRef = collection(db, "products");

    for (const productData of DEMO_PRODUCTS) {
        try {
            const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const docRef = doc(db, "products", slug);
            await setDoc(docRef, {
                ...productData,
                createdAt: Timestamp.now()
            });
            console.log(`Added product with ID: ${slug}`);
        } catch (error) {
            console.error(`Error adding product ${productData.name}:`, error);
        }
    }
    console.log("Seeding complete!");
}
