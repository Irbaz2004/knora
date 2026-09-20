import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase";

export const CMS_PAGES = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About Us", path: "/about-us" },
  { id: "testimonials", label: "Testimonials", path: "/testimonials" },
  { id: "vision-mission", label: "Vision & Mission", path: "/vision-mission" },
  { id: "contact", label: "Contact Us", path: "/contact-us" },
  { id: "gallery", label: "Gallery", path: "/gallery" },
];

export const EMPTY_CMS_PAGE = {
  enabled: false,
  eyebrow: "",
  title: "",
  subtitle: "",
  body: "",
  imageUrl: "",
  items: [],
};

export async function getCmsPage(id) {
  if (!db) return EMPTY_CMS_PAGE;
  const snapshot = await getDoc(doc(db, "websiteContent", id));
  return snapshot.exists()
    ? { ...EMPTY_CMS_PAGE, ...snapshot.data() }
    : EMPTY_CMS_PAGE;
}

export function useCmsPage(id) {
  const [state, setState] = useState({ data: EMPTY_CMS_PAGE, loading: true });
  useEffect(() => {
    if (!id || !db) {
      setState({ data: EMPTY_CMS_PAGE, loading: false });
      return undefined;
    }
    return onSnapshot(
      doc(db, "websiteContent", id),
      (snapshot) => {
        setState({
          data: snapshot.exists()
            ? { ...EMPTY_CMS_PAGE, ...snapshot.data() }
            : EMPTY_CMS_PAGE,
          loading: false,
        });
      },
      () => setState((current) => ({ ...current, loading: false })),
    );
  }, [id]);
  return state;
}
