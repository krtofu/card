"use client";

import { useEffect } from "react";
import { useThemeColor } from "@/app/providers"; 

interface CharacterSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ranks: Record<string, number>;
  onUpdateRank: (charName: string, rank: number) => void;
}

export default function CharacterSettingsModal({
  isOpen,
  onClose,
  ranks,
  onUpdateRank,
}: CharacterSettingsModalProps) {
  const { themeColor } = useThemeColor();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen) return null;

  // 🌟 경로를 모두 _icon.png 로 교체 완료!
  const unitGroups = [
    { name: "VIRTUAL SINGER", logo: "/icons/VS_icon.png", members: ["하츠네 미쿠", "카가미네 린", "카가미네 렌", "메구리네 루카", "MEIKO", "KAITO"] },
    { name: "Leo/need", logo: "/icons/Leoneed_icon.png", members: ["호시노 이치카", "텐마 사키", "모치즈키 호나미", "히노모리 시호"] },
    { name: "MORE MORE JUMP!", logo: "/icons/MMJ_icon.png", members: ["하나사토 미노리", "키리타니 하루카", "모모이 아이리", "히노모리 시즈쿠"] },
    { name: "Vivid BAD SQUAD", logo: "/icons/VBS_icon.png", members: ["아즈사와 코하네", "시라이시 안", "시노노메 아키토", "아오야기 토우야"] },
    { name: "Wonderlands×Showtime", logo: "/icons/Wds_icon.png", members: ["텐마 츠카사", "오토리 에무", "쿠사나기 네네", "카미시로 루이"] },
    { name: "25시, 나이트코드에서.", logo: "/icons/Niigo_icon.png", members: ["요이사키 카나데", "아사히나 마후유", "시노노메 에나", "아키야마 미즈키"] },
  ];

  return (
    <div className="fixed inset-0 z-[100000] flex justify-end bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in transition-all">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[400px] sm:max-w-[420px] h-[100dvh] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-white/10 p-5 sm:p-6 flex flex-col shadow-2xl overflow-hidden animate-slide-left transition-colors">
        
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4 mb-4 shrink-0 transition-colors">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">⚙️ 도감 엔진 설정</h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">캐릭터 랭크에 따라 <strong className="text-zinc-700 dark:text-zinc-300">블룸 페스</strong> 보너스가 갱신됩니다.</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-white/5 shadow-sm">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
          {unitGroups.map((unit) => (
            <div key={unit.name} className="space-y-2">
              
              {/* 🌟 안쪽 로고 박스를 완전히 벗기고, 텍스트와 아이콘이 한 덩어리처럼 보이게 수정했습니다! */}
              <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-white/5 mb-1 transition-colors">
                <img src={unit.logo} alt={unit.name} className="w-3.5 h-3.5 object-contain opacity-80 dark:opacity-90 drop-shadow-sm" />
                <h3 className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 tracking-wider uppercase">{unit.name}</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {unit.members.map((char) => {
                  const currentRank = ranks[char] || 1;
                  const bloomBonus = Math.floor(currentRank / 2);

                  let badgeStyle = "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/20"; 
                  if (currentRank === 100) {
                    badgeStyle = "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-300 dark:border-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.3)]"; 
                  } else if (currentRank >= 80) {
                    badgeStyle = "bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-300 dark:border-amber-400/50 shadow-[0_0_8px_rgba(251,191,36,0.2)]"; 
                  }

                  return (
                    <div key={char} className="flex items-center justify-between bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-xl p-2.5 hover:border-zinc-300 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
                      <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 truncate pr-2">{char}</span>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-mono border font-bold px-1.5 py-0.5 rounded transition-all duration-300 ${badgeStyle}`}>
                          +{bloomBonus}%
                        </span>
                        
                        <div className="flex items-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-lg overflow-hidden h-7 shadow-inner transition-colors">
                          <button 
                            onClick={() => onUpdateRank(char, Math.max(1, currentRank - 10))}
                            className="w-7 h-full bg-zinc-100 dark:bg-zinc-900/40 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors font-mono font-bold flex items-center justify-center text-[10px]"
                          >
                            -10
                          </button>
                          <div className="w-px h-full bg-zinc-200 dark:bg-white/5" />
                          <button 
                            onClick={() => onUpdateRank(char, Math.max(1, currentRank - 1))}
                            className="w-7 h-full text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors font-mono font-bold flex items-center justify-center"
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            value={currentRank}
                            onChange={(e) => onUpdateRank(char, Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                            className="w-9 h-full text-center bg-transparent text-[13px] font-mono font-bold text-zinc-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-x border-zinc-200 dark:border-white/5 transition-colors"
                          />
                          <button 
                            onClick={() => onUpdateRank(char, Math.min(100, currentRank + 1))}
                            className="w-7 h-full text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors font-mono font-bold flex items-center justify-center"
                          >
                            +
                          </button>
                          <div className="w-px h-full bg-zinc-200 dark:bg-white/5" />
                          <button 
                            onClick={() => onUpdateRank(char, Math.min(100, currentRank + 10))}
                            className="w-7 h-full bg-zinc-100 dark:bg-zinc-900/40 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors font-mono font-bold flex items-center justify-center text-[10px]"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-white/10 shrink-0 transition-colors">
          <button 
            onClick={onClose}
            style={themeColor !== "default" ? { backgroundColor: "var(--color-primary)", color: "white" } : {}}
            className={`w-full py-3 active:scale-[0.98] rounded-xl text-sm font-bold transition-all shadow-lg ${
              themeColor === "default" 
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100" 
                : "hover:brightness-110"
            }`}
          >
            설정 저장 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
}