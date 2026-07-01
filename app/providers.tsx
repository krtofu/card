"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { CHARACTER_COLORS, CharacterName } from "@/lib/colors"; // 🌟 기획자님이 만드신 컬러맵 수입!

// ==========================================
// 1. 캐릭터 테마 컬러를 관리하는 Context
// ==========================================
type ThemeColorContextType = {
  themeColor: CharacterName | "default";
  setThemeColor: (colorName: CharacterName | "default") => void;
};

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

// ==========================================
// 2. 캐릭터 테마 컬러 Provider 내부 로직
// ==========================================
function ThemeColorProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColorState] = useState<CharacterName | "default">("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 이전에 유저가 선택했던 캐릭터 색상을 로컬 스토리지에서 불러옵니다.
    const saved = localStorage.getItem("sekard_theme_color") as CharacterName;
    if (saved && CHARACTER_COLORS[saved]) {
      setThemeColorState(saved);
    }
  }, []);

  const setThemeColor = (name: CharacterName | "default") => {
    setThemeColorState(name);
    localStorage.setItem("sekard_theme_color", name);
  };

  // 테마가 바뀔 때마다 HTML 뿌리(root)에 CSS 변수로 물감을 칠해줍니다!
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (themeColor === "default") {
      root.style.setProperty("--color-primary", "#39C5BB"); // 기본값: 미쿠 청록색
    } else {
      root.style.setProperty("--color-primary", CHARACTER_COLORS[themeColor]);
    }
  }, [themeColor, mounted]);

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

// 다른 컴포넌트에서 테마를 바꿀 수 있게 해주는 마법의 훅!
export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) throw new Error("useThemeColor must be used within ThemeColorProvider");
  return context;
};

// ==========================================
// 3. 최상위(Root)를 감싸는 Main Providers
// ==========================================
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* 다크/라이트 테마 안에 캐릭터 컬러 테마를 품게 만듭니다! */}
      <ThemeColorProvider>
        {children}
      </ThemeColorProvider>
    </ThemeProvider>
  );
}