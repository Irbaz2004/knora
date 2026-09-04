import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AboutUs from "@/pages/AboutUs";
import AdmissionProcess from "@/pages/AdmissionProcess";
import ApplyOnline from "@/pages/ApplyOnline";
import Career from "@/pages/Career";
import ContactUs from "@/pages/ContactUs";
import SplashScreen from "@/components/SplashScreen";
import Courses from "@/pages/Courses";
import EventsNews from "@/pages/EventsNews";
import Faculty from "@/pages/Faculty";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Placements from "@/pages/Placements";
import ForgotPassword from "@/Auth/ForgotPassword";
import Login from "@/Auth/Login";
import SignUp from "@/Auth/SignUp";
import StudentLogin from "@/pages/StudentLogin";
import TeacherLogin from "@/pages/TeacherLogin";
import Testimonials from "@/pages/Testimonials";
import VisionMission from "@/pages/VisionMission";

const routes = {
  "/": Home,
  "/about-us": AboutUs,
  "/admission-process": AdmissionProcess,
  "/apply-online": ApplyOnline,
  "/career": Career,
  "/contact-us": ContactUs,
  "/courses": Courses,
  "/events-news": EventsNews,
  "/faculty": Faculty,
  "/forgot-password": ForgotPassword,
  "/gallery": Gallery,
  "/login": Login,
  "/placements": Placements,
  "/signup": SignUp,
  "/student-login": StudentLogin,
  "/teacher-login": TeacherLogin,
  "/testimonials": Testimonials,
  "/vision-mission": VisionMission,
};

const routeLabels = {
  "/": "Home",
  "/about-us": "About Us",
  "/admission-process": "Admission Process",
  "/apply-online": "Apply Online",
  "/career": "Career",
  "/contact-us": "Contact Us",
  "/courses": "Courses",
  "/events-news": "Events & News",
  "/faculty": "Faculty",
  "/forgot-password": "Forgot Password",
  "/gallery": "Gallery",
  "/login": "Login",
  "/placements": "Placements",
  "/signup": "Sign Up",
  "/student-login": "Student Login",
  "/teacher-login": "Teacher Login",
  "/testimonials": "Testimonials",
  "/vision-mission": "Vision & Mission",
};

function normalizePath(path) {
  return path.replace(/\/$/, "") || "/";
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  const [path, setPath] = useState(() =>
    normalizePath(window.location.pathname),
  );
  const [transitionKey, setTransitionKey] = useState(0);
  const [transitionLabel, setTransitionLabel] = useState(null);
  const pendingPathRef = useRef(null);
  const Page = useMemo(() => routes[path] || NotFound, [path]);

  const beginNavigation = useCallback(
    (nextPath, { push = true } = {}) => {
      const normalizedPath = normalizePath(nextPath);
      if (normalizedPath === path && !pendingPathRef.current) return;

      pendingPathRef.current = { path: normalizedPath, push };
      setTransitionLabel(routeLabels[normalizedPath] ?? "Page");
      setTransitionKey((key) => key + 1);
    },
    [path],
  );

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }

      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        anchor.target ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const url = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);
      const hasFileExtension = /\.[a-z0-9]+$/i.test(url.pathname);

      if (
        url.origin !== currentUrl.origin ||
        hasFileExtension ||
        url.pathname === currentUrl.pathname
      ) {
        return;
      }

      event.preventDefault();
      beginNavigation(url.pathname);
    };

    const onPopState = () => {
      beginNavigation(window.location.pathname, { push: false });
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, [beginNavigation]);

  const handleCovered = useCallback(() => {
    const pending = pendingPathRef.current;
    if (!pending) return;

    if (pending.push) {
      window.history.pushState({}, "", pending.path);
    }
    setPath(pending.path);
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("knora:navigation"));
    pendingPathRef.current = null;
  }, []);

  return (
    <>
      <Page />
      <SplashScreen
        transitionKey={transitionKey}
        routeTitle={transitionLabel}
        onCovered={handleCovered}
      />
    </>
  );
}
