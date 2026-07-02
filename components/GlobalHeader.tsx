// src/components/GlobalHeader.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import CharacterSettingsModal from "@/components/CharacterSettingsModal";

export default function GlobalHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [characterRanks, setCharacterRanks] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedRanks = localStorage.getItem("sekard_character_ranks");
    if (savedRanks) {
      try { setCharacterRanks(JSON.parse(savedRanks)); } 
      catch (e) { console.error(e); }
    }
  }, []);

  const updateCharacterRank = (charName: string, rank: number) => {
    const newRanks = { ...characterRanks, [charName]: rank };
    setCharacterRanks(newRanks);
    localStorage.setItem("sekard_character_ranks", JSON.stringify(newRanks));
    window.dispatchEvent(new Event("sekard_ranks_updated"));
  };

  return (
    <>
      {/* 🌟 다크/라이트 모드 완벽 지원 + 포인트 컬러 텍스트 적용 */}
      <header className="sticky top-0 z-[99999] border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/80 transition-colors duration-300">
        <div className="mx-auto flex h-14 w-full max-w-[1920px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-baseline gap-2 group">
            {/* 🌟 로고에 primary 포인트 컬러 적용! */}
            <span className="text-lg font-extrabold tracking-tight text-primary transition-colors">Sekard</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">I 두부도감</span>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            {/* 🌟 활성화 느낌을 위해 호버 시 primary 옅은 배경 적용 */}
            <Link href="/cards" className="rounded-lg px-3 py-1.5 font-semibold text-zinc-600 hover:text-primary hover:bg-primary/10 dark:text-zinc-300 dark:hover:text-primary dark:hover:bg-primary/20 transition-all">
              내 카드
            </Link>
            <Link href="/future" className="rounded-lg px-3 py-1.5 font-semibold text-zinc-600 hover:text-primary hover:bg-primary/10 dark:text-zinc-300 dark:hover:text-primary dark:hover:bg-primary/20 transition-all">
              미래시
            </Link>

            <ThemeToggle />

            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1 transition-colors" />

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 transition-colors"
              title="블룸 페스 랭크 설정"
            >
              ⚙️
            </button>
          </nav>
        </div>
      </header>

      <CharacterSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        ranks={characterRanks}
        onUpdateRank={updateCharacterRank}
      />
    </>
  );
}