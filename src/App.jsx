import AboutUs from "@/pages/AboutUs";
import AdmissionProcess from "@/pages/AdmissionProcess";
import ApplyOnline from "@/pages/ApplyOnline";
import Career from "@/pages/Career";
import ContactUs from "@/pages/ContactUs";
import Courses from "@/pages/Courses";
import EventsNews from "@/pages/EventsNews";
import Faculty from "@/pages/Faculty";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Placements from "@/pages/Placements";
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
  "/gallery": Gallery,
  "/placements": Placements,
  "/student-login": StudentLogin,
  "/teacher-login": TeacherLogin,
  "/testimonials": Testimonials,
  "/vision-mission": VisionMission,
};

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
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const Page = routes[path] || NotFound;

  return <Page />;
}
