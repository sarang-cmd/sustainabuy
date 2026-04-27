import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrpmL329XEEM0GHp5z_7qEeQyHA_gLlug",
    authDomain: "sustainabuy-dev.firebaseapp.com",
    projectId: "sustainabuy-dev",
    storageBucket: "sustainabuy-dev.firebasestorage.app",
    messagingSenderId: "99139895549",
    appId: "1:99139895549:web:728ca5ad41a4950acebe94",
};

export const PERPLEXITY_API_KEY = "mock-perplexity-key";

// Initialize Firebase only once
let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
