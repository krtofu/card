// src/app/providers.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";
import { CHARACTER_COLORS, UNIT_COLORS } from "@/lib/colors"; 

const ALL_COLORS = { ...CHARACTER_COLORS, ...UNIT_COLORS };
type ThemeKey = keyof typeof ALL_COLORS | "default";

type ThemeColorContextType = {
  themeColor: ThemeKey;
  setThemeColor: (colorName: ThemeKey) => void;
};

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

// 🌟 포인트 컬러의 밝기를 계산해서 글씨색을 흑/백으로 자동 결정해주는 똑똑한 함수!
const getFgColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#18181b" : "#ffffff";
};

function ThemeColorProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
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
      // 🌟 [수정됨] 변수를 삭제하지 않고, 다크/라이트 모드에 맞춰 근본 무채색을 명확히 주입!
      const isDark = resolvedTheme === "dark";
      root.style.setProperty("--color-primary", isDark ? "#ffffff" : "#18181b");
      root.style.setProperty("--color-primary-foreground", isDark ? "#18181b" : "#ffffff");
    } else {
      const hex = ALL_COLORS[themeColor as keyof typeof ALL_COLORS];
      root.style.setProperty("--color-primary", hex);
      root.style.setProperty("--color-primary-foreground", getFgColor(hex));
    }
  }, [themeColor, mounted, resolvedTheme]);

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