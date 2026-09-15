import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

function getOwnerId() {
  const uid = auth?.currentUser?.uid;
  if (!uid) {
    const error = new Error("Please log in before using your cart.");
    error.code = "cart/auth-required";
    throw error;
  }
  return uid;
}

function getCartKey() {
  return `knora-cart:${getOwnerId()}`;
}

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(getCartKey()) ?? "[]");
  } catch {
    return [];
  }
}

function saveLocalCart(items) {
  localStorage.setItem(getCartKey(), JSON.stringify(items));
  window.dispatchEvent(
    new CustomEvent("knora:cart-updated", { detail: items }),
  );
}

export async function addToCart(item) {
  const items = getCart();
  const next = items.some((entry) => entry.id === item.id)
    ? items
    : [...items, { ...item, quantity: 1 }];
  saveLocalCart(next);

  if (db) {
    await setDoc(
      doc(db, "users", getOwnerId(), "cartItems", item.id),
      {
        ...item,
        userId: getOwnerId(),
        quantity: 1,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }
  return next;
}

export async function removeFromCart(itemId) {
  const next = getCart().filter((item) => item.id !== itemId);
  saveLocalCart(next);
  if (db) await deleteDoc(doc(db, "users", getOwnerId(), "cartItems", itemId));
  return next;
}

export async function saveCheckoutDraft(data) {
  localStorage.setItem(
    `knora-checkout-draft:${getOwnerId()}`,
    JSON.stringify(data),
  );
  if (!db) return;
  await setDoc(
    doc(db, "users", getOwnerId(), "checkout", "current"),
    {
      ...data,
      userId: getOwnerId(),
      status: "checkout",
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
