// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useThemeColor } from "@/app/providers";
import { CHARACTER_COLORS, UNIT_COLORS } from "@/lib/colors";

// 🌟 완벽한 교통정리를 위한 그룹화 데이터
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

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-[80vh] overflow-y-auto custom-scrollbar p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 animate-fade-in origin-top-right">
          
          {/* 다크모드 스위치 */}
          <div className="mb-3 flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">다크 모드</span>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                isDark 
                  ? 'bg-primary dark:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]' 
                  : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mb-2">포인트 컬러 테마</span>
          
          {/* 🌟 [수정됨] 마구잡이로 뛰던 여백을 깔끔하게 통일했습니다! */}
          <div className="flex flex-col">
            {THEME_GROUPS.map((group, idx) => (
              <div 
                key={group.label} 
                // 🌟 그룹 간 위아래 패딩(py-2.5)과 밑줄(border-b)을 일괄 적용하고, 첫/마지막 요소 여백을 제거!
                className="flex flex-col py-2.5 border-b border-zinc-100 dark:border-white/5 first:pt-1 last:pb-0 last:border-0"
              >
                {/* 🌟 소제목과 버튼 사이의 간격은 mb-1.5 (6px)로 쫀쫀하게! */}
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider mb-1.5">
                  {group.label}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setThemeColor(group.unit.name as any)}
                    className={`w-6 h-6 rounded-md border-2 transition-all shrink-0 ${themeColor === group.unit.name ? "border-zinc-900 dark:border-white scale-110 shadow-md" : "border-transparent hover:scale-110"}`}
                    style={{ backgroundColor: group.unit.hex }}
                    title={`${group.label} (유닛 컬러)`}
                  />
                  
                  <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-0.5" />
                  
                  <div className="flex flex-wrap gap-1.5">
                    {group.chars.map(charName => (
                      <button
                        key={charName}
                        onClick={() => setThemeColor(charName as any)}
                        className={`w-5 h-5 rounded-full border-2 transition-all ${themeColor === charName || (themeColor === "default" && charName === "하츠네 미쿠") ? "border-zinc-900 dark:border-white scale-110 shadow-md" : "border-transparent hover:scale-110"}`}
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