import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    limit,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
import { app } from "@/lib/firebase";
import { User } from "firebase/auth";

export const db = getFirestore(app);

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    score: number;
    sustainabilityData?: any;
}

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    sustainabilityScore: number;
    wishlist: string[];
    createdAt: any;
}

// RESTORED v0.2 DATABASE FUNCTIONS
export const findOrAddProduct = async (productData: Partial<Product>) => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("name", "==", productData.name), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Product;
    }

    const docRef = await addDoc(productsRef, {
        ...productData,
        createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...productData } as Product;
};

export const getAllProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
};

export const createUserProfile = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const profile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || "User",
            photoURL: user.photoURL || undefined,
            sustainabilityScore: 0,
            wishlist: [],
            createdAt: serverTimestamp()
        };
        await setDoc(userRef, profile);
        return profile;
    }
    return userSnap.data() as UserProfile;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
};
