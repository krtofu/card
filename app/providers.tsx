// src/app/providers.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { CHARACTER_COLORS, UNIT_COLORS } from "@/lib/colors"; 

// 🌟 캐릭터 색상과 유닛 색상을 하나로 합칩니다!
const ALL_COLORS = { ...CHARACTER_COLORS, ...UNIT_COLORS };
type ThemeKey = keyof typeof ALL_COLORS | "default";

type ThemeColorContextType = {
  themeColor: ThemeKey;
  setThemeColor: (colorName: ThemeKey) => void;
};

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

function ThemeColorProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColorState] = useState<ThemeKey>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sekard_theme_color") as ThemeKey;
    if (saved && ALL_COLORS[saved as keyof typeof ALL_COLORS]) {
      setThemeColorState(saved);
    }
  }, []);

  const setThemeColor = (name: ThemeKey) => {
    setThemeColorState(name);
    localStorage.setItem("sekard_theme_color", name);
  };

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (themeColor === "default") {
      root.style.setProperty("--color-primary", "#39C5BB"); // 기본: 미쿠
    } else {
      root.style.setProperty("--color-primary", ALL_COLORS[themeColor as keyof typeof ALL_COLORS]);
    }
  }, [themeColor, mounted]);

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) throw new Error("useThemeColor must be used within ThemeColorProvider");
  return context;
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <ThemeColorProvider>
        {children}
      </ThemeColorProvider>
    </ThemeProvider>
  );
}