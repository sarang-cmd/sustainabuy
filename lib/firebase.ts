import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
    Firestore
} from "firebase/firestore";

// The config is hardcoded for demo purposes
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBrpmL329XEEM0GHp5z_7qEeQyHA_gLlug",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sustainabuy-dev.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sustainabuy-dev",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sustainabuy-dev.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "99139895549",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:99139895549:web:728ca5ad41a4950acebe94",
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

export const auth = getAuth(app);

// Global flag to track if Firestore is actually usable
// This prevents terminal spam and improves performance if the API is disabled
export let isFirestoreEnabled = true;

const getDb = (): Firestore => {
    try {
        const firestore = initializeFirestore(app, {
            localCache: persistentLocalCache({
                tabManager: persistentMultipleTabManager()
            })
        });
        return firestore;
    } catch (e) {
        console.warn("Firestore persistence failed, falling back to standard initialization.");
        return getFirestore(app);
    }
};

export const db = getDb();
export { app };
