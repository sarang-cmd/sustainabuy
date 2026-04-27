import { db } from "./firebase";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { Product } from "./db";

export const DEMO_PRODUCTS: Omit<Product, "id" | "createdAt">[] = [
    {
        name: "Eco-Knit Sneaker",
        brand: "Allbirds",
        description: "The peak of sustainable performance. 85% recycled ocean-bound rPET upper, FSC-certified natural rubber outsole. OEKO-TEX® 100 certified dyes throughout.",
        materials: ["Eucalyptus Fiber", "Sugarcane SweetFoam"],
        certifications: ["B Corp", "FSC Certified", "Carbon Neutral"],
        origin: "Vietnam",
        price: 98.00,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
        score: 92,
        baseScore: 92,
        thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=200",
        category: "Footwear",
        breakdown: {
            materials: 94,
            manufacturing: 88,
            supplyChain: 90,
            longevity: 85,
            circularity: 98
        }
    },
    {
        name: "Recycled Denim Jacket",
        brand: "Patagonia",
        description: "A warm, low-bulk full-zip jacket made of soft, sweater-knit 100% recycled polyester fleece. Fair Trade Certified™ sewn.",
        materials: ["100% Recycled Polyester"],
        certifications: ["B Corp", "Fair Trade", "Bluesign"],
        origin: "Vietnam",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
        score: 88,
        baseScore: 88,
        thumbnail: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=200",
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
        description: "Soft, breathable, and highly sustainable t-shirt made from organic bamboo fibers. Designed to last.",
        materials: ["Organic Bamboo Fiber"],
        certifications: ["GOTS Certified", "Vegan"],
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
        description: "A high-tech backpack with integrated solar panels made from ocean-bound plastic. The future of travel.",
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
        name: "Everleaf Runner Pro",
        brand: "Everleaf",
        description: "Flagship sustainable performance runner. 100% carbon neutral design.",
        materials: ["Recycled rPET", "Natural Rubber"],
        certifications: ["Eco Certified", "Fair Trade"],
        origin: "Portugal",
        price: 129.00,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
        score: 96,
        baseScore: 96,
        thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=200",
        category: "Footwear",
        breakdown: {
            materials: 98,
            manufacturing: 92,
            supplyChain: 94,
            longevity: 90,
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
