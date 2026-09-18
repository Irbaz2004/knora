import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";

const SmoothScroll = lazy(() => import("@/components/SmoothScroll"));
const CursorEffect = lazy(() => import("@/components/CursorEffect"));
const OpeningVideoSplash = lazy(
  () => import("@/components/OpeningVideoSplash"),
);

const AboutUs = lazy(() => import("@/pages/AboutUs"));
const AdmissionProcess = lazy(() => import("@/pages/AdmissionProcess"));
const ApplyOnline = lazy(() => import("@/pages/ApplyOnline"));
const Career = lazy(() => import("@/pages/Career"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const Counselling = lazy(() => import("@/pages/Counselling"));
const CourseDetails = lazy(() => import("@/pages/CourseDetails"));
const Courses = lazy(() => import("@/pages/Courses"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const EventsNews = lazy(() => import("@/pages/EventsNews"));
const Faculty = lazy(() => import("@/pages/Faculty"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Home = lazy(() => import("@/pages/Home"));
const MyLearning = lazy(() => import("@/pages/MyLearning"));
const Placements = lazy(() => import("@/pages/Placements"));
const ForgotPassword = lazy(() => import("@/Auth/ForgotPassword"));
const Login = lazy(() => import("@/Auth/Login"));
const SignUp = lazy(() => import("@/Auth/SignUp"));
const StudentLogin = lazy(() => import("@/pages/StudentLogin"));
const TeacherLogin = lazy(() => import("@/pages/TeacherLogin"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const VisionMission = lazy(() => import("@/pages/VisionMission"));

const routes = {
  "/": Home,
  "/about-us": AboutUs,
  "/admission-process": AdmissionProcess,
  "/apply-online": ApplyOnline,
  "/career": Career,
  "/cart": Cart,
  "/checkout": Checkout,
  "/contact-us": ContactUs,
  "/counselling": Counselling,
  "/courses": Courses,
  "/events-news": EventsNews,
  "/faculty": Faculty,
  "/forgot-password": ForgotPassword,
  "/gallery": Gallery,
  "/login": Login,
  "/my-learning": MyLearning,
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
  "/cart": "Cart",
  "/checkout": "Checkout",
  "/contact-us": "Contact Us",
  "/counselling": "Counselling",
  "/courses": "Courses",
  "/events-news": "Events & News",
  "/faculty": "Faculty",
  "/forgot-password": "Forgot Password",
  "/gallery": "Gallery",
  "/login": "Login",
  "/my-learning": "My Learning",
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

function isCourseFolderPath(path) {
  return /^\/course\/[^/]+$/.test(path);
}

function isCourseDetailsPath(path) {
  return /^\/course\/[^/]+\/[^/]+$/.test(path);
}

function getRouteComponent(path) {
  if (isCourseDetailsPath(path)) return CourseDetails;
  if (isCourseFolderPath(path)) return Courses;
  return routes[path] || NotFound;
}

function getRouteLabel(path) {
  if (isCourseFolderPath(path) || isCourseDetailsPath(path)) return "Courses";
  return routeLabels[path] ?? "Page";
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

function DeferredEnhancements() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId;
    let timerId;
    const enable = () => setReady(true);
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const constrainedDevice =
      connection?.saveData ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      navigator.hardwareConcurrency <= 4;

    if (constrainedDevice) return undefined;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 });
    } else {
      timerId = window.setTimeout(enable, 1000);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <SmoothScroll />
      <CursorEffect />
    </Suspense>
  );
}

export default function App() {
  const [path, setPath] = useState(() =>
    normalizePath(window.location.pathname),
  );
  const [transitionKey, setTransitionKey] = useState(0);
  const [transitionLabel, setTransitionLabel] = useState(null);
  const pendingPathRef = useRef(null);
  const Page = useMemo(() => getRouteComponent(path), [path]);
  const isAuthRoute = ["/forgot-password", "/login", "/signup"].includes(path);
  const isCommerceRoute = ["/cart", "/checkout"].includes(path);
  const hideChrome = isAuthRoute || isCommerceRoute;

  const beginNavigation = useCallback(
    (nextPath, { push = true } = {}) => {
      const normalizedPath = normalizePath(nextPath);
      if (normalizedPath === path && !pendingPathRef.current) return;

      pendingPathRef.current = { path: normalizedPath, push };
      setTransitionLabel(getRouteLabel(normalizedPath));
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

    const onAppNavigate = (event) => {
      const nextPath = event.detail?.path;
      if (typeof nextPath === "string") {
        beginNavigation(nextPath);
      }
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener("knora:navigate", onAppNavigate);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("knora:navigate", onAppNavigate);
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
      {!hideChrome && <Navbar />}
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Page />
      </Suspense>
      {!hideChrome && <Footer />}
      <DeferredEnhancements />
      <Toaster richColors position="top-right" />
      {!hideChrome && transitionKey === 0 && (
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 12000,
                background: "#020b19",
              }}
            />
          }
        >
          <OpeningVideoSplash />
        </Suspense>
      )}
      <SplashScreen
        transitionKey={transitionKey}
        routeTitle={transitionLabel}
        onCovered={handleCovered}
      />
    </>
  );
}
