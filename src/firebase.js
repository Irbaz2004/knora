import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getFunctions } from "firebase/functions";

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

if (
  firebaseApp &&
  import.meta.env.DEV &&
  import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG === "true"
) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const appCheck =
  firebaseApp && import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY
    ? initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaEnterpriseProvider(
          import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY,
        ),
        isTokenAutoRefreshEnabled: true,
      })
    : null;
export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;
export const storage = firebaseApp ? getStorage(firebaseApp) : null;
export const functions = firebaseApp
  ? getFunctions(
      firebaseApp,
      import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || "asia-south1",
    )
  : null;

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

export async function getUserProfile(uid) {
  if (!db || !uid) return null;

  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function submitCounsellingRequest(request) {
  if (!db) {
    throw new Error("Firebase is not configured yet.");
  }

  const requestRef = await addDoc(collection(db, "counsellingRequests"), {
    ...request,
    status: "new",
    source: "counselling-page",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return requestRef.id;
}
