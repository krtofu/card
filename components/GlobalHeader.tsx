"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import CharacterSettingsModal from "@/components/CharacterSettingsModal";

export default function GlobalHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [characterRanks, setCharacterRanks] = useState<Record<string, number>>({});
  
  // 🌟 워키토키 수신 상태: 기본적으로 서랍은 열려있다고 가정합니다.
  const [isFilterOpen, setIsFilterOpen] = useState(true); 
  const pathname = usePathname();
  
  // 🌟 [핵심 변경] 이벤컷('/eventcuts') 페이지에서도 햄버거 버튼 활성화를 허가합니다!
  const isShowHamburgerAllowed = pathname === "/cards" || pathname === "/future" || pathname === "/eventcuts";

  useEffect(() => {
    const savedRanks = localStorage.getItem("sekard_character_ranks");
    if (savedRanks) {
      try { setCharacterRanks(JSON.parse(savedRanks)); } 
      catch (e) { console.error(e); }
    }
  }, []);

  // 🌟 무전기 수신: 각 페이지에서 쏘는 무전을 받아 상태를 즉각 반영합니다.
  useEffect(() => {
    const handleFilterState = (e: any) => {
      setIsFilterOpen(e.detail);
    };
    window.addEventListener("sekard_filter_state", handleFilterState);
    return () => window.removeEventListener("sekard_filter_state", handleFilterState);
  }, []);

  const updateCharacterRank = (charName: string, rank: number) => {
    const newRanks = { ...characterRanks, [charName]: rank };
    setCharacterRanks(newRanks);
    localStorage.setItem("sekard_character_ranks", JSON.stringify(newRanks));
    window.dispatchEvent(new Event("sekard_ranks_updated"));
  };

  return (
    <>
      <header className="sticky top-0 z-[99999] border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/80 transition-colors duration-300">
        <div className="mx-auto flex h-14 w-full max-w-[1920px] items-center justify-between px-4 md:px-8">
          
          <div className="flex items-center gap-2 shrink-0 mr-auto">
            {/* 🌟 햄버거 버튼 */}
            {isShowHamburgerAllowed && !isFilterOpen && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("toggle_sekard_filter"))}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-primary hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-primary dark:hover:bg-zinc-800 transition-colors text-lg mr-1 animate-fade-in"
                title="필터 서랍 열기"
              >
                ☰
              </button>
            )}

            <Link href="/" className="flex items-baseline gap-2 group shrink-0">
              <span className="text-lg font-extrabold tracking-tight text-primary transition-colors">Sekard</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors hidden sm:inline-block">I 두부도감</span>
            </Link>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2 text-sm shrink-0">
            <Link href="/cards" className={`rounded-lg px-2.5 sm:px-3 py-1.5 font-semibold transition-all ${pathname === '/cards' ? 'text-primary bg-primary/10 dark:bg-primary/20' : 'text-zinc-600 hover:text-primary hover:bg-primary/5 dark:text-zinc-300 dark:hover:text-primary dark:hover:bg-primary/10'}`}>
              내 카드
            </Link>
            <Link href="/future" className={`rounded-lg px-2.5 sm:px-3 py-1.5 font-semibold transition-all ${pathname === '/future' ? 'text-primary bg-primary/10 dark:bg-primary/20' : 'text-zinc-600 hover:text-primary hover:bg-primary/5 dark:text-zinc-300 dark:hover:text-primary dark:hover:bg-primary/10'}`}>
              미래시
            </Link>
            
            {/* 🌟 이벤컷 탭 추가! (다른 탭들과 동일한 스타일 및 활성화 로직 적용) */}
            <Link href="/eventcuts" className={`rounded-lg px-2.5 sm:px-3 py-1.5 font-semibold transition-all ${pathname === '/eventcuts' ? 'text-primary bg-primary/10 dark:bg-primary/20' : 'text-zinc-600 hover:text-primary hover:bg-primary/5 dark:text-zinc-300 dark:hover:text-primary dark:hover:bg-primary/10'}`}>
              이벤컷
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