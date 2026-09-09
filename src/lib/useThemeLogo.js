import { useEffect, useState } from "react";
import logo from "@/assets/knora-logo-transparent.png";
import logoWhite from "@/assets/knoralogowhite.png";

function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

export default function useThemeLogo() {
  const [isDark, setIsDark] = useState(isDarkTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(isDarkTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark ? logoWhite : logo;
}
