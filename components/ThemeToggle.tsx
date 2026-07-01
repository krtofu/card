// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useThemeColor } from "@/providers/ThemeColorProvider";
import { CHARACTER_COLORS, CharacterName } from "@/lib/colors";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useThemeColor();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative" ref={menuRef}>
      {/* 🌟 1. 테마 메뉴 열기 버튼 (현재 선택된 포인트 컬러가 은은하게 빛납니다) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="테마 및 색상 설정"
        className="relative p-1.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
      >
        <span className="text-xl leading-none block drop-shadow-[0_0_8px_var(--color-primary)]">
          {isDark ? "☾" : "☀︎"}
        </span>
      </button>

      {/* 🌟 2. 팔레트 드롭다운 팝업 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 animate-fade-in origin-top-right">
          
          <div className="mb-4 flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">다크 모드</span>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${isDark ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">포인트 컬러 (캐릭터 테마)</span>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setThemeColor("default")}
                className={`w-6 h-6 rounded-full border-2 transition-all ${themeColor === "default" ? "border-zinc-900 dark:border-white scale-110" : "border-transparent hover:scale-110"}`}
                style={{ backgroundColor: "#39C5BB" }}
                title="기본 (미쿠)"
              />
              
              {/* 캐릭터 색상 동그라미들을 쫙 뿌려줍니다! */}
              {Object.entries(CHARACTER_COLORS).map(([name, hex]) => {
                if (name === "하츠네 미쿠") return null; // 기본값과 겹치니 생략
                
                return (
                  <button
                    key={name}
                    onClick={() => setThemeColor(name as CharacterName)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${themeColor === name ? "border-zinc-900 dark:border-white scale-110 shadow-md" : "border-transparent hover:scale-110"}`}
                    style={{ backgroundColor: hex }}
                    title={name}
                  />
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}