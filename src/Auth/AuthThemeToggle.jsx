import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const toggleStyles = {
  position: "absolute",
  top: "clamp(0.95rem, 1.8vw, 1.35rem)",
  right: "clamp(1.15rem, 2.2vw, 2.4rem)",
  zIndex: 4,
  width: "2.65rem",
  height: "2.65rem",
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--muted-foreground)",
  cursor: "pointer !important",
  "&:hover": {
    background: "color-mix(in oklab, var(--primary) 10%, var(--card))",
    color: "var(--primary)",
  },
  "@media (max-width: 720px)": {
    top: "0.75rem",
    right: "0.9rem",
  },
};

export default function AuthThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextIsDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("knora-theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
        sx={toggleStyles}
      >
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}
