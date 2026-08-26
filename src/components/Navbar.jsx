import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  SunMoon,
  UserRound,
  X,
} from "lucide-react";
import logo from "@/assets/knora-logo-transparent.png";

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
  {
    label: "Admission",
    items: [
      { label: "Admission Process", href: "/admission-process" },
      { label: "Apply Online", href: "/apply-online" },
    ],
  },
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
      "/admission-process": "Admission",
      "/apply-online": "Admission",
      "/placements": "Placements",
      "/events-news": "Media",
      "/gallery": "Media",
      "/testimonials": "Media",
      "/career": "Career",
      "/contact-us": "Contact Us",
    };
    const onScroll = () => {
      if (window.location.pathname !== "/") {
        setActive(pathLabels[window.location.pathname] ?? "Home");
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

  return (
    <header className="fixed inset-x-0 top-2 z-50 flex justify-center px-3 sm:top-3 sm:px-6">
      <nav className="glass flex w-full max-w-[1820px] items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-6">
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
          <a
            href="/student-login"
            className="hidden items-center gap-1.5 rounded-full border border-border/80 px-4 py-2.5 text-[0.8rem] font-semibold text-foreground hover:border-primary/40 hover:text-primary lg:flex"
          >
            <UserRound className="size-4" />
            Student Login
          </a>
          <a
            href="/teacher-login"
            className="hidden items-center gap-1.5 rounded-full border border-border/80 px-4 py-2.5 text-[0.8rem] font-semibold text-foreground hover:border-primary/40 hover:text-primary lg:flex"
          >
            <UserRound className="size-4" />
            Teacher Login
          </a>
          <a
            href="/apply-online"
            className="lift arrow-shift hidden items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-soft sm:flex"
          >
            Apply Now
            <ArrowRight className="arrow size-4" />
          </a>
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
            <a
              href="/student-login"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-border/80 px-4 py-3 text-center text-sm font-semibold text-foreground"
            >
              Student Login
            </a>
            <a
              href="/teacher-login"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-border/80 px-4 py-3 text-center text-sm font-semibold text-foreground"
            >
              Teacher Login
            </a>
            <a
              href="/apply-online"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground glow-soft"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
