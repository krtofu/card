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
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur dark:bg-zinc-950/70">
        <div className="mx-auto flex h-14 w-full max-w-[1920px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold tracking-tight">Sekard</span>
            <span className="text-xs text-zinc-400">I 두부도감</span>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link href="/cards" className="rounded-lg px-3 py-1.5 text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10">
              내 카드
            </Link>
            <Link href="/future" className="rounded-lg px-3 py-1.5 text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10">
              미래시
            </Link>

            <ThemeToggle />

            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />

            {/* 🌟 다크모드 버튼 옆 가장 우측 끝에 위치한 설정 버튼! */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 rounded-lg text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10 transition-colors"
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