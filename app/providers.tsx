// src/app/providers.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { CHARACTER_COLORS, UNIT_COLORS } from "@/lib/colors"; 

// 🌟 오리지널 무채색 테마 추가! (순수 다크 / 순수 라이트 포인트 컬러)
const BASIC_COLORS = {
  "오리지널 먹색": "#71717a", // 차분한 zinc-500 톤
  "퓨어 화이트": "#d4d4d8", // 깔끔한 zinc-300 톤
};

const ALL_COLORS = { ...CHARACTER_COLORS, ...UNIT_COLORS, ...BASIC_COLORS };
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