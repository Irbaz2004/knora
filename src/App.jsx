import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import CmsPageContent from "@/components/CmsPageContent";

const SmoothScroll = lazy(() => import("@/components/SmoothScroll"));

const OpeningVideoSplash = lazy(
  () => import("@/components/OpeningVideoSplash"),
);

const AboutUs = lazy(() => import("@/Website/pages/AboutUs"));
const AdmissionProcess = lazy(() => import("@/Website/pages/AdmissionProcess"));
const ApplyOnline = lazy(() => import("@/Website/pages/ApplyOnline"));
const Career = lazy(() => import("@/Website/pages/Career"));
const ContactUs = lazy(() => import("@/Website/pages/ContactUs"));
const Counselling = lazy(() => import("@/Website/pages/Counselling"));
const CourseDetails = lazy(() => import("@/Website/pages/CourseDetails"));
const Courses = lazy(() => import("@/Website/pages/Courses"));
const Cart = lazy(() => import("@/Website/pages/Cart"));
const Checkout = lazy(() => import("@/Website/pages/Checkout"));
const PaymentSuccess = lazy(() => import("@/Website/pages/PaymentSuccess"));
const EventsNews = lazy(() => import("@/Website/pages/EventsNews"));
const Faculty = lazy(() => import("@/Website/pages/Faculty"));
const Gallery = lazy(() => import("@/Website/pages/Gallery"));
const Home = lazy(() => import("@/Website/pages/Home"));
const MyLearning = lazy(() => import("@/Website/pages/MyLearning"));
const Placements = lazy(() => import("@/Website/pages/Placements"));
const ForgotPassword = lazy(() => import("@/Auth/ForgotPassword"));
const Login = lazy(() => import("@/Auth/Login"));
const SignUp = lazy(() => import("@/Auth/SignUp"));
const StudentLogin = lazy(() => import("@/Website/pages/StudentLogin"));
const TeacherLogin = lazy(() => import("@/Website/pages/TeacherLogin"));
const Testimonials = lazy(() => import("@/Website/pages/Testimonials"));
const VisionMission = lazy(() => import("@/Website/pages/VisionMission"));
const Crm = lazy(() => import("@/CRM/CrmRouter"));

const routeLabels = {
  "/": "Home",
  "/about-us": "About Us",
  "/admission-process": "Admission Process",
  "/apply-online": "Apply Online",
  "/career": "Career",
  "/cart": "Cart",
  "/checkout": "Checkout",
  "/checkout/success": "Payment complete",
  "/contact-us": "Contact Us",
  "/counselling": "Counselling",
  "/crm": "CRM",
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

function getRouteLabel(path) {
  if (/^\/course\/[^/]+(?:\/[^/]+)?$/.test(path)) return "Courses";
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

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = normalizePath(location.pathname);
  const [transitionKey, setTransitionKey] = useState(0);
  const [transitionLabel, setTransitionLabel] = useState(null);
  const pendingPathRef = useRef(null);
  const isAuthRoute = ["/forgot-password", "/login", "/signup"].includes(path);
  const isCommerceRoute = ["/cart", "/checkout", "/checkout/success"].includes(
    path,
  );
  const isCrmRoute = path === "/crm" || path.startsWith("/crm/");
  const hideChrome = isAuthRoute || isCommerceRoute || isCrmRoute;

  const beginNavigation = useCallback(
    (nextPath, { push = true } = {}) => {
      const normalizedPath = normalizePath(nextPath);
      if (pendingPathRef.current || normalizedPath === path) return;

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

    const onAppNavigate = (event) => {
      const nextPath = event.detail?.path;
      if (typeof nextPath === "string") {
        beginNavigation(nextPath);
      }
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener("knora:navigate", onAppNavigate);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("knora:navigate", onAppNavigate);
    };
  }, [beginNavigation]);

  const handleCovered = useCallback(() => {
    const pending = pendingPathRef.current;
    if (!pending) return;

    navigate(pending.path, { replace: !pending.push });
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("knora:navigation"));
    pendingPathRef.current = null;
  }, [navigate]);

  const handleTransitionComplete = useCallback(() => {
    setTransitionLabel(null);
  }, []);

  return (
    <>
      {!hideChrome && <Navbar />}
      {!hideChrome && <CmsPageContent path={path} />}
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admission-process" element={<AdmissionProcess />} />
          <Route path="/apply-online" element={<ApplyOnline />} />
          <Route path="/career" element={<Career />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<PaymentSuccess />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/counselling" element={<Counselling />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:folderSlug" element={<Courses />} />
          <Route
            path="/course/:folderSlug/:lessonSlug"
            element={<CourseDetails />}
          />
          <Route path="/crm/*" element={<Crm />} />
          <Route path="/events-news" element={<EventsNews />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!hideChrome && <Footer />}
      {!isCrmRoute && (
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
      )}
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
        onComplete={handleTransitionComplete}
      />
    </>
  );
}
