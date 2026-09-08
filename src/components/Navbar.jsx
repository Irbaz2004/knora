import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  SunMoon,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { auth, db } from "@/firebase";
import useThemeLogo from "@/lib/useThemeLogo";

const menu = [
  { label: "Home", href: "/" },
  {
    label: "About",
    items: [
      { label: "About Us", href: "/about-us" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Faculty", href: "/faculty" },
    ],
  },
  { label: "Courses", href: "/courses" },
  { label: "Placements", href: "/placements" },
  {
    label: "Media",
    items: [
      { label: "Events & News", href: "/events-news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact-us" },
];

function DesktopItem({ item, active, onSelect }) {
  if (!item.items) {
    return (
      <a
        href={item.href}
        onClick={() => onSelect(item.label)}
        className={`lift-sm relative rounded-full px-3.5 py-2.5 text-[0.9rem] font-medium ${
          active === item.label
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {item.label}
        <span
          className={`absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary transition-opacity duration-300 ${
            active === item.label ? "opacity-100" : "opacity-0"
          }`}
        />
      </a>
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={`lift-sm flex items-center gap-1 rounded-full px-3.5 py-2.5 text-[0.9rem] font-medium ${
          active === item.label
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {item.label}
        <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="nav-dropdown-panel rounded-3xl p-2">
          {item.items.map((child) => (
            <a
              key={child.label}
              href={child.href}
              onClick={() => onSelect(item.label)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary"
            >
              {child.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const logo = useThemeLogo();

  const userName =
    userProfile?.fullName || userProfile?.displayName || userProfile?.email;
  const userInitial = (userName || "U").trim().charAt(0).toUpperCase();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("knora-theme", isDark ? "dark" : "light");
  };

  useEffect(() => {
    const pathLabels = {
      "/": "Home",
      "/about-us": "About",
      "/vision-mission": "About",
      "/faculty": "About",
      "/courses": "Courses",
      "/course": "Courses",
      "/placements": "Placements",
      "/events-news": "Media",
      "/gallery": "Media",
      "/testimonials": "Media",
      "/career": "Career",
      "/contact-us": "Contact Us",
    };
    const onScroll = () => {
      if (window.location.pathname !== "/") {
        setActive(
          pathLabels[window.location.pathname] ??
            (window.location.pathname.startsWith("/course/")
              ? "Courses"
              : "Home"),
        );
        return;
      }
      const doc = document.documentElement;
      const p =
        doc.scrollTop / Math.max(1, doc.scrollHeight - window.innerHeight);
      const order = ["Home", "Courses", "Placements", "About", "Contact Us"];
      setActive(order[Math.min(order.length - 1, Math.floor(p * 5))] ?? "Home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("knora:navigation", onScroll);
    window.addEventListener("popstate", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("knora:navigation", onScroll);
      window.removeEventListener("popstate", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!auth) return undefined;

    let activeSubscription = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (activeSubscription) setUserProfile(null);
        return;
      }

      const nextProfile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      };

      if (db) {
        try {
          const snapshot = await getDoc(doc(db, "users", user.uid));
          if (snapshot.exists()) {
            Object.assign(nextProfile, snapshot.data());
          }
        } catch (error) {
          console.warn("Could not load user profile", error);
        }
      }

      if (activeSubscription) setUserProfile(nextProfile);
    });

    return () => {
      activeSubscription = false;
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    if (!auth) return;

    try {
      await signOut(auth);
      setProfileOpen(false);
      setOpen(false);
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(error?.message || "Could not log out. Please try again.");
    }
  };

  const closeMenus = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-2 z-50 flex justify-center px-3 sm:top-3 sm:px-6">
      <nav className="knora-navbar flex w-full max-w-[1820px] items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-6">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <img
            src={logo}
            alt="Knora Edu Academy"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </a>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          {menu.map((item) => (
            <DesktopItem
              key={item.label}
              item={item}
              active={active}
              onSelect={setActive}
            />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="icon-aura flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:text-primary"
          >
            <SunMoon className="size-4.5" />
          </button>
          <div className="relative hidden lg:block">
            <button
              type="button"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((value) => !value)}
              className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary"
            >
              {userProfile ? userInitial : <UserRound className="size-4" />}
            </button>

            {profileOpen && (
              <div className="nav-dropdown-panel absolute right-0 top-12 z-[70] w-64 rounded-3xl p-2">
                {userProfile ? (
                  <>
                    <div className="px-4 py-3">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {userName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {userProfile.email}
                      </p>
                    </div>
                    <a
                      href="/my-learning"
                      onClick={closeMenus}
                      className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      <BookOpenCheck className="size-4" />
                      My Learning
                    </a>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      onClick={closeMenus}
                      className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      <LogIn className="size-4" />
                      Login
                    </a>
                    <a
                      href="/signup"
                      onClick={closeMenus}
                      className="arrow-shift mt-1 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      Sign Up
                      <ArrowRight className="arrow size-4" />
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-border/70 xl:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-dropdown-panel absolute left-1/2 top-20 z-[60] max-h-[calc(100vh-6rem)] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 overflow-y-auto rounded-3xl p-4 xl:hidden">
          <div className="grid gap-1">
            {menu.map((item) => (
              <div key={item.label}>
                {item.items ? (
                  <div className="rounded-2xl px-4 py-3">
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-foreground">
                      {item.label}
                      <ChevronDown className="size-4 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      {item.items.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-2 border-t border-border/70 pt-4">
            {userProfile ? (
              <>
                <div className="rounded-2xl border border-border/80 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {userName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {userProfile.email}
                  </p>
                </div>
                <a
                  href="/my-learning"
                  onClick={closeMenus}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border/80 px-4 py-3 text-center text-sm font-semibold text-foreground"
                >
                  <BookOpenCheck className="size-4" />
                  My Learning
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-2xl border border-border/80 px-4 py-3 text-center text-sm font-semibold text-foreground"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  onClick={closeMenus}
                  className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground glow-soft"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
