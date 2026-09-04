import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseReady = Object.values(firebaseConfig).every(Boolean);
export const firebaseApp = firebaseReady ? initializeApp(firebaseConfig) : null;
export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");

export function requireFirebaseAuth() {
  if (!auth) {
    throw {
      code: "auth/configuration-not-found",
      message: "Firebase is not configured yet.",
    };
  }

  return auth;
}

export async function saveUserProfile(user, profile = {}) {
  if (!db || !user?.uid) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const providerId = user.providerData?.[0]?.providerId ?? "password";

  await setDoc(
    userRef,
    {
      uid: user.uid,
      fullName: profile.fullName ?? user.displayName ?? "",
      email: user.email ?? profile.email ?? "",
      photoURL: user.photoURL ?? "",
      phoneNumber: user.phoneNumber ?? "",
      authProvider: profile.authProvider ?? providerId,
      updatedAt: serverTimestamp(),
      ...(snapshot.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true },
  );
}
