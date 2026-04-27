import { db } from "./firebase";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { Product } from "./db";

import { DEMO_PRODUCTS, getProductSlug } from "./demo-data";
export { DEMO_PRODUCTS };


export async function seedDemoProducts() {
    console.log("Seeding demo products...");
    const productsRef = collection(db, "products");

    for (const productData of DEMO_PRODUCTS) {
        try {
            const slug = getProductSlug(productData.name);
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
