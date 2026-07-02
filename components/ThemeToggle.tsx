// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useThemeColor } from "@/app/providers";
import { CHARACTER_COLORS, UNIT_COLORS } from "@/lib/colors";

const THEME_GROUPS = [
  { label: "VIRTUAL SINGER", unit: { name: "버싱", hex: UNIT_COLORS["버싱"] }, chars: ["하츠네 미쿠", "카가미네 린", "카가미네 렌", "메구리네 루카", "메이코", "카이토"] },
  { label: "Leo/need", unit: { name: "레오니", hex: UNIT_COLORS["레오니"] }, chars: ["호시노 이치카", "텐마 사키", "모치즈키 호나미", "히노모리 시호"] },
  { label: "MORE MORE JUMP!", unit: { name: "모모점", hex: UNIT_COLORS["모모점"] }, chars: ["하나사토 미노리", "키리타니 하루카", "모모이 아이리", "히노모리 시즈쿠"] },
  { label: "Vivid BAD SQUAD", unit: { name: "비배스", hex: UNIT_COLORS["비배스"] }, chars: ["아즈사와 코하네", "시라이시 안", "시노노메 아키토", "아오야기 토우야"] },
  { label: "Wonderlands×Showtime", unit: { name: "원더쇼", hex: UNIT_COLORS["원더쇼"] }, chars: ["텐마 츠카사", "오오토리 에무", "쿠사나기 네네", "카미시로 루이"] },
  { label: "25시, 나이트코드에서.", unit: { name: "니고", hex: UNIT_COLORS["니고"] }, chars: ["요이사키 카나데", "아사히나 마후유", "시노노메 에나", "아키야마 미즈키"] },
];

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useThemeColor();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // 🌟 포인트 컬러 팔레트 잠금 상태 관리 (초기값: 해제 🔓)
  const [isColorLocked, setIsColorLocked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    // 🌟 로컬 스토리지에서 잠금 상태 불러오기
    const savedLock = localStorage.getItem("sekard_color_theme_locked");
    if (savedLock) {
      setIsColorLocked(savedLock === "true");
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";

  // 🌟 잠금 상태 토글 함수
  const toggleLock = () => {
    const nextLock = !isColorLocked;
    setIsColorLocked(nextLock);
    localStorage.setItem("sekard_color_theme_locked", String(nextLock));
  };

  // 🌟 다크/라이트 모드 전환 시 자동 리셋 핸들러
  const handleModeToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);

    // 🌟 잠금 해제(🔓) 상태일 때만 포인트 컬러를 "default"(무채색)로 초기화!
    if (!isColorLocked) {
      setThemeColor("default");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="테마 및 색상 설정"
        className="relative p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
      >
        {/* 🌟 마법의 CSS: var(--color-primary)가 없으면 자연스럽게 텍스트 기본색(currentColor)으로 폴백! */}
        <span 
          className="text-xl leading-none block transition-colors bg-clip-text text-transparent text-zinc-800 dark:text-zinc-100"
          style={{ backgroundImage: "linear-gradient(var(--color-primary, currentColor), var(--color-primary, currentColor))" }}
        >
          {isDark ? "☾" : "☀︎"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-[80vh] overflow-y-auto custom-scrollbar p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 animate-fade-in origin-top-right transition-colors duration-300">
          
          {/* 🌟 다크/라이트 모드 토글 (한 줄로 통합) */}
          <div className="mb-3 flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5 transition-colors">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-colors">
              {isDark ? "다크 모드" : "라이트 모드"}
            </span>
            <button
              onClick={handleModeToggle}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                isDark 
                  ? (themeColor === 'default' ? 'bg-zinc-700 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]' : 'bg-primary dark:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]')
                  : 'bg-zinc-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* 🌟 포인트 컬러 테마 타이틀 & 잠금 버튼 */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-colors">
              포인트 컬러 테마
            </span>
            <button
              onClick={toggleLock}
              className={`text-xs px-2 py-0.5 rounded-md font-bold transition-all border ${
                isColorLocked 
                  ? 'bg-red-50 dark:bg-red-500/10 text-red-500 border-red-200 dark:border-red-500/30' 
                  : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-transparent'
              }`}
              title={isColorLocked ? "팔레트 잠김 (모드 변경 시 색상 유지)" : "팔레트 잠금 해제 (모드 변경 시 색상 리셋)"}
            >
              {isColorLocked ? "🔒 잠금" : "🔓 잠금 해제"}
            </button>
          </div>
          
          {/* 🌟 유닛 팔레트 리스트 */}
          <div className="flex flex-col">
            {THEME_GROUPS.map((group, idx) => (
              <div 
                key={group.label} 
                className="flex flex-col py-2.5 border-b border-zinc-100 dark:border-white/5 first:pt-1 last:pb-0 last:border-0 transition-colors"
              >
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider mb-1.5 transition-colors">
                  {group.label}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setThemeColor(group.unit.name as any)}
                    className={`w-6 h-6 rounded-md border-2 transition-all shrink-0 ${themeColor === group.unit.name ? "border-zinc-900 dark:border-white scale-110 shadow-md" : "border-transparent hover:scale-110"}`}
                    style={{ backgroundColor: group.unit.hex }}
                    title={`${group.label} (유닛 컬러)`}
                  />
                  
                  <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-0.5 transition-colors" />
                  
                  <div className="flex flex-wrap gap-1.5">
                    {group.chars.map(charName => (
                      <button
                        key={charName}
                        onClick={() => setThemeColor(charName as any)}
                        // 🌟 [수정됨] 디폴트일 때는 아무 버튼도 선택되지 않게 변경!
                        className={`w-5 h-5 rounded-full border-2 transition-all ${themeColor === charName ? "border-zinc-900 dark:border-white scale-110 shadow-md" : "border-transparent hover:scale-110"}`}
                        style={{ backgroundColor: CHARACTER_COLORS[charName as keyof typeof CHARACTER_COLORS] }}
                        title={charName}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}