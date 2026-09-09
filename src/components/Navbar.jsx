import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Box } from "@mui/material";
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

const navbarStyles = {
  header: {
    position: "fixed",
    insetInline: 0,
    top: { xs: "0.5rem", sm: "0.75rem" },
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    px: { xs: "0.75rem", sm: "1.5rem" },
  },
  nav: {
    display: "flex",
    width: "100%",
    maxWidth: "1820px",
    minWidth: 0,
    alignItems: "center",
    justifyContent: "space-between",
    gap: { xs: "0.8rem", sm: "1rem" },
    borderRadius: { xs: "1.5rem", sm: "999px" },
    border: "1px solid color-mix(in oklab, var(--primary) 14%, white)",
    background: "#ffffff",
    boxShadow:
      "0 18px 44px -28px color-mix(in oklab, var(--navy) 32%, transparent)",
    px: { xs: "1rem", sm: "1.55rem" },
    py: { xs: "0.65rem", sm: "0rem" },
    ".dark &": {
      borderColor: "color-mix(in oklab, var(--primary) 22%, transparent)",
      background: "var(--card)",
      boxShadow: "0 18px 48px -30px rgba(0, 0, 0, 0.62)",
    },
  },
  logoLink: {
    display: "flex",
    minWidth: 0,
    flexShrink: 0,
    alignItems: "center",
    textDecoration: "none",
  },
  logoFrame: {
    position: "relative",
    width: { xs: "4.8rem", sm: "7rem" },
    height: { xs: "3.2rem", sm: "4.85rem" },
    overflow: "hidden",
  },
  logoImage: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: { xs: "8.95rem", sm: "10.15rem" },
    height: { xs: "8.95rem", sm: "10.15rem" },
    maxWidth: "none",
    transform: "translate(-50%, -50%)",
    objectFit: "contain",
  },
  desktopNav: {
    display: { xs: "none", xl: "flex" },
    minWidth: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
  },
  desktopItemWrap: {
    position: "relative",
    "&:hover > [data-menu-panel='true']": {
      pointerEvents: "auto",
      opacity: 1,
    },
    "&:hover [data-chevron='true']": {
      transform: "rotate(180deg)",
    },
  },
  desktopTrigger: (isActive) => ({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    border: 0,
    borderRadius: "999px",
    background: "transparent",
    color: isActive ? "var(--primary)" : "var(--muted-foreground)",
    cursor: "pointer",
    font: "inherit",
    fontSize: "0.98rem",
    fontWeight: 600,
    lineHeight: 1,
    px: "0.9rem",
    py: "0.72rem",
    textDecoration: "none",
    transition:
      "transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), color 0.24s ease",
    whiteSpace: "nowrap",
    "&:hover": {
      color: isActive ? "var(--primary)" : "var(--foreground)",
      transform: "translateY(-2px)",
    },
  }),
  activeDot: (isActive) => ({
    position: "absolute",
    left: "50%",
    bottom: "-0.28rem",
    width: "0.38rem",
    height: "0.38rem",
    borderRadius: "999px",
    background: "var(--primary)",
    opacity: isActive ? 1 : 0,
    transform: "translateX(-50%)",
    transition: "opacity 300ms ease",
  }),
  chevron: {
    width: "0.9rem",
    height: "0.9rem",
    transition: "transform 200ms ease",
  },
  dropdownShell: {
    pointerEvents: "none",
    position: "absolute",
    left: "50%",
    top: "100%",
    zIndex: 50,
    width: "14rem",
    pt: "0.75rem",
    opacity: 0,
    transform: "translateX(-50%)",
    transition: "opacity 200ms ease",
  },
  dropdownPanel: {
    borderRadius: "1.5rem",
    border: "1px solid color-mix(in oklab, var(--primary) 16%, white)",
    background:
      "linear-gradient(180deg, color-mix(in oklab, white 72%, transparent), color-mix(in oklab, white 48%, transparent)), color-mix(in oklab, var(--background) 42%, transparent)",
    boxShadow:
      "0 24px 64px -34px color-mix(in oklab, var(--navy) 38%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(26px) saturate(180%)",
    WebkitBackdropFilter: "blur(26px) saturate(180%)",
    p: "0.5rem",
    ".dark &": {
      borderColor: "color-mix(in oklab, var(--primary) 24%, transparent)",
      background:
        "linear-gradient(180deg, color-mix(in oklab, var(--card) 72%, transparent), color-mix(in oklab, var(--background) 62%, transparent)), color-mix(in oklab, var(--background) 50%, transparent)",
      boxShadow:
        "0 24px 68px -36px rgba(0, 0, 0, 0.72), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
    },
  },
  dropdownLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    border: 0,
    borderRadius: "1rem",
    background: "transparent",
    color: "var(--muted-foreground)",
    cursor: "pointer",
    font: "inherit",
    fontSize: "0.88rem",
    fontWeight: 600,
    px: "1rem",
    py: "0.75rem",
    textAlign: "left",
    textDecoration: "none",
    width: "100%",
    "&:hover": {
      background: "color-mix(in oklab, var(--primary) 10%, transparent)",
      color: "var(--primary)",
    },
  },
  controls: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    gap: "0.5rem",
  },
  iconButton: {
    display: "flex",
    width: { xs: "2.65rem", sm: "2.8rem" },
    height: { xs: "2.65rem", sm: "2.8rem" },
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
    background: "transparent",
    color: "var(--muted-foreground)",
    cursor: "pointer",
    transition:
      "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.24s ease",
    "&:hover": {
      color: "var(--primary)",
      transform: "scale(1.08)",
    },
  },
  profileWrap: {
    position: "relative",
    display: { xs: "none", lg: "block" },
  },
  profileMenu: {
    position: "absolute",
    right: 0,
    top: "3.35rem",
    zIndex: 70,
    width: "16rem",
  },
  profileMeta: {
    px: "1rem",
    py: "0.75rem",
  },
  profileName: {
    m: 0,
    overflow: "hidden",
    color: "var(--foreground)",
    fontSize: "0.88rem",
    fontWeight: 700,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  profileEmail: {
    m: 0,
    overflow: "hidden",
    color: "var(--muted-foreground)",
    fontSize: "0.75rem",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  signupLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    mt: "0.25rem",
    borderRadius: "1rem",
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    fontSize: "0.88rem",
    fontWeight: 700,
    px: "1rem",
    py: "0.75rem",
    textDecoration: "none",
    "& svg": {
      transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
    },
    "&:hover svg": {
      transform: "translateX(6px)",
    },
  },
  menuButton: {
    display: { xs: "flex", xl: "none" },
  },
  mobileMenu: {
    position: "absolute",
    left: "50%",
    top: { xs: "6.25rem", sm: "6.9rem" },
    zIndex: 60,
    width: "calc(100% - 1.5rem)",
    maxWidth: "28rem",
    maxHeight: "calc(100vh - 7rem)",
    overflowY: "auto",
    transform: "translateX(-50%)",
    borderRadius: "1.5rem",
    p: "1rem",
  },
  mobileGroup: {
    display: "grid",
    gap: "0.25rem",
  },
  mobileParent: {
    borderRadius: "1rem",
    px: "1rem",
    py: "0.75rem",
  },
  mobileHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: "0.5rem",
    color: "var(--foreground)",
    fontSize: "0.88rem",
    fontWeight: 700,
  },
  mobileChildList: {
    display: "grid",
    gap: "0.25rem",
  },
  mobileLink: {
    display: "block",
    borderRadius: "1rem",
    color: "var(--muted-foreground)",
    fontSize: "0.88rem",
    fontWeight: 700,
    px: "1rem",
    py: "0.75rem",
    textAlign: "left",
    textDecoration: "none",
    "&:hover": {
      background: "color-mix(in oklab, var(--primary) 10%, transparent)",
      color: "var(--primary)",
    },
  },
  mobileChildLink: {
    borderRadius: "0.75rem",
    fontWeight: 500,
    px: "0.75rem",
    py: "0.5rem",
  },
  mobileAuth: {
    display: "grid",
    gap: "0.5rem",
    mt: "1rem",
    borderTop: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
    pt: "1rem",
  },
  mobileProfileBox: {
    borderRadius: "1rem",
    border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
    px: "1rem",
    py: "0.75rem",
  },
  mobileAction: {
    justifyContent: "center",
    border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
    textAlign: "center",
  },
};

function DesktopItem({ item, active, onSelect }) {
  if (!item.items) {
    return (
      <Box
        component="a"
        href={item.href}
        onClick={() => onSelect(item.label)}
        sx={navbarStyles.desktopTrigger(active === item.label)}
      >
        {item.label}
        <Box
          component="span"
          sx={navbarStyles.activeDot(active === item.label)}
        />
      </Box>
    );
  }

  return (
    <Box sx={navbarStyles.desktopItemWrap}>
      <Box
        component="button"
        type="button"
        sx={navbarStyles.desktopTrigger(active === item.label)}
      >
        {item.label}
        <Box
          component={ChevronDown}
          data-chevron="true"
          sx={navbarStyles.chevron}
        />
      </Box>
      <Box data-menu-panel="true" sx={navbarStyles.dropdownShell}>
        <Box sx={navbarStyles.dropdownPanel}>
          {item.items.map((child) => (
            <Box
              component="a"
              key={child.label}
              href={child.href}
              onClick={() => onSelect(item.label)}
              sx={navbarStyles.dropdownLink}
            >
              {child.label}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
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
    <Box component="header" sx={navbarStyles.header}>
      <Box component="nav" sx={navbarStyles.nav}>
        <Box component="a" href="/" sx={navbarStyles.logoLink}>
          <Box component="span" sx={navbarStyles.logoFrame}>
            <Box
              component="img"
              src={logo}
              alt="Knora Edu Academy"
              sx={navbarStyles.logoImage}
            />
          </Box>
        </Box>

        <Box sx={navbarStyles.desktopNav}>
          {menu.map((item) => (
            <DesktopItem
              key={item.label}
              item={item}
              active={active}
              onSelect={setActive}
            />
          ))}
        </Box>

        <Box sx={navbarStyles.controls}>
          <Box
            component="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            sx={navbarStyles.iconButton}
          >
            <Box
              component={SunMoon}
              sx={{ width: "1.05rem", height: "1.05rem" }}
            />
          </Box>
          <Box sx={navbarStyles.profileWrap}>
            <Box
              component="button"
              type="button"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((value) => !value)}
              sx={{
                ...navbarStyles.iconButton,
                borderColor:
                  "color-mix(in oklab, var(--border) 80%, transparent)",
                background: "var(--card)",
                color: "var(--foreground)",
                fontSize: "0.88rem",
                fontWeight: 700,
                "&:hover": {
                  borderColor:
                    "color-mix(in oklab, var(--primary) 40%, transparent)",
                  color: "var(--primary)",
                  transform: "none",
                },
              }}
            >
              {userProfile ? (
                userInitial
              ) : (
                <Box
                  component={UserRound}
                  sx={{ width: "1rem", height: "1rem" }}
                />
              )}
            </Box>

            {profileOpen && (
              <Box
                sx={{
                  ...navbarStyles.dropdownPanel,
                  ...navbarStyles.profileMenu,
                }}
              >
                {userProfile ? (
                  <>
                    <Box sx={navbarStyles.profileMeta}>
                      <Box component="p" sx={navbarStyles.profileName}>
                        {userName}
                      </Box>
                      <Box component="p" sx={navbarStyles.profileEmail}>
                        {userProfile.email}
                      </Box>
                    </Box>
                    <Box
                      component="a"
                      href="/my-learning"
                      onClick={closeMenus}
                      sx={navbarStyles.dropdownLink}
                    >
                      <Box
                        component={BookOpenCheck}
                        sx={{ width: "1rem", height: "1rem" }}
                      />
                      My Learning
                    </Box>
                    <Box
                      component="button"
                      type="button"
                      onClick={handleLogout}
                      sx={navbarStyles.dropdownLink}
                    >
                      <Box
                        component={LogOut}
                        sx={{ width: "1rem", height: "1rem" }}
                      />
                      Logout
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      component="a"
                      href="/login"
                      onClick={closeMenus}
                      sx={{
                        ...navbarStyles.dropdownLink,
                        color: "var(--foreground)",
                      }}
                    >
                      <Box
                        component={LogIn}
                        sx={{ width: "1rem", height: "1rem" }}
                      />
                      Login
                    </Box>
                    <Box
                      component="a"
                      href="/signup"
                      onClick={closeMenus}
                      sx={navbarStyles.signupLink}
                    >
                      Sign Up
                      <Box
                        component={ArrowRight}
                        sx={{ width: "1rem", height: "1rem" }}
                      />
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Box>
          <Box
            component="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            sx={{ ...navbarStyles.iconButton, ...navbarStyles.menuButton }}
          >
            {open ? (
              <Box component={X} sx={{ width: "1rem", height: "1rem" }} />
            ) : (
              <Box component={Menu} sx={{ width: "1rem", height: "1rem" }} />
            )}
          </Box>
        </Box>
      </Box>

      {open && (
        <Box sx={{ ...navbarStyles.dropdownPanel, ...navbarStyles.mobileMenu }}>
          <Box sx={navbarStyles.mobileGroup}>
            {menu.map((item) => (
              <Box key={item.label}>
                {item.items ? (
                  <Box sx={navbarStyles.mobileParent}>
                    <Box sx={navbarStyles.mobileHeading}>
                      {item.label}
                      <Box
                        component={ChevronDown}
                        sx={{
                          width: "1rem",
                          height: "1rem",
                          color: "var(--primary)",
                        }}
                      />
                    </Box>
                    <Box sx={navbarStyles.mobileChildList}>
                      {item.items.map((child) => (
                        <Box
                          component="a"
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          sx={{
                            ...navbarStyles.mobileLink,
                            ...navbarStyles.mobileChildLink,
                          }}
                        >
                          {child.label}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    component="a"
                    href={item.href}
                    onClick={() => setOpen(false)}
                    sx={navbarStyles.mobileLink}
                  >
                    {item.label}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Box sx={navbarStyles.mobileAuth}>
            {userProfile ? (
              <>
                <Box sx={navbarStyles.mobileProfileBox}>
                  <Box component="p" sx={navbarStyles.profileName}>
                    {userName}
                  </Box>
                  <Box component="p" sx={navbarStyles.profileEmail}>
                    {userProfile.email}
                  </Box>
                </Box>
                <Box
                  component="a"
                  href="/my-learning"
                  onClick={closeMenus}
                  sx={{
                    ...navbarStyles.dropdownLink,
                    ...navbarStyles.mobileAction,
                    color: "var(--foreground)",
                  }}
                >
                  <Box
                    component={BookOpenCheck}
                    sx={{ width: "1rem", height: "1rem" }}
                  />
                  My Learning
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={handleLogout}
                  sx={{
                    ...navbarStyles.dropdownLink,
                    justifyContent: "center",
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    textAlign: "center",
                    "&:hover": {
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                    },
                  }}
                >
                  <Box
                    component={LogOut}
                    sx={{ width: "1rem", height: "1rem" }}
                  />
                  Logout
                </Box>
              </>
            ) : (
              <>
                <Box
                  component="a"
                  href="/login"
                  onClick={closeMenus}
                  sx={{
                    ...navbarStyles.mobileLink,
                    border:
                      "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
                    color: "var(--foreground)",
                    textAlign: "center",
                  }}
                >
                  Login
                </Box>
                <Box
                  component="a"
                  href="/signup"
                  onClick={closeMenus}
                  sx={{
                    ...navbarStyles.mobileLink,
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    textAlign: "center",
                    "&:hover": {
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                    },
                  }}
                >
                  Sign Up
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
