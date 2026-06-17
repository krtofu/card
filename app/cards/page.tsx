"use client";

import { useState, useEffect } from "react"; 
import { ALL_CARDS } from "@/data/cards"; 
import { FinalCardInfo } from "@/data/cards/template"; 
import CardDetailModal from "@/components/CardDetailModal";

export type UserCardState = {
  isOwned: boolean;
  isTarget: boolean;
  masterRank: number;
  skillLevel: number;
};

// 필터용 데이터 정의
type CharDef = { id: string; name: string; img: string; matchKeys?: string[] };
type UnitDef = { id: string; name: string; chars: CharDef[] };
type AttrDef = { id: string; name: string; img: string };
type SkillDef = { id: string; name: string; img: string; matchKeys: string[] };

const UNIT_FILTERS: UnitDef[] = [
  {
    id: "ln", name: "Leo/need",
    chars: [
      { id: "ichika", name: "호시노 이치카", img: "/icons/characters/Ichika.png" },
      { id: "saki", name: "텐마 사키", img: "/icons/characters/Saki.png" },
      { id: "honami", name: "모치즈키 호나미", img: "/icons/characters/Honami.png" },
      { id: "shiho", name: "히노모리 시호", img: "/icons/characters/Shiho.png" }
    ]
  },
  {
    id: "mmj", name: "MORE MORE JUMP!",
    chars: [
      { id: "minori", name: "하나사토 미노리", img: "/icons/characters/Minori.png" },
      { id: "haruka", name: "키리타니 하루카", img: "/icons/characters/Haruka.png" },
      { id: "airi", name: "모모이 아이리", img: "/icons/characters/Airi.png" },
      { id: "shizuku", name: "히노모리 시즈쿠", img: "/icons/characters/Shizuku.png" }
    ]
  },
  {
    id: "vbs", name: "Vivid BAD SQUAD",
    chars: [
      { id: "kohane", name: "아즈사와 코하네", img: "/icons/characters/Kohane.png" },
      { id: "an", name: "시라이시 안", img: "/icons/characters/An.png" },
      { id: "akito", name: "시노노메 아키토", img: "/icons/characters/Akito.png" },
      { id: "toya", name: "아오야기 토우야", img: "/icons/characters/Toya.png" }
    ]
  },
  {
    id: "wxs", name: "Wonderlands×Showtime",
    chars: [
      { id: "tsukasa", name: "텐마 츠카사", img: "/icons/characters/Tsukasa.png" },
      { id: "emu", name: "오토리 에무", img: "/icons/characters/Emu.png" },
      { id: "nene", name: "쿠사나기 네네", img: "/icons/characters/Nene.png" },
      { id: "rui", name: "카미시로 루이", img: "/icons/characters/Rui.png" }
    ]
  },
  {
    id: "n25", name: "25시, 나이트코드에서.",
    chars: [
      { id: "kanade", name: "요이사키 카나데", img: "/icons/characters/Kanade.png" },
      { id: "mafuyu", name: "아사히나 마후유", img: "/icons/characters/Mafuyu.png" },
      { id: "ena", name: "시노노메 에나", img: "/icons/characters/Ena.png" },
      { id: "mizuki", name: "아키야마 미즈키", img: "/icons/characters/Mizuki.png" }
    ]
  },
  {
    id: "vs", name: "VIRTUAL SINGER",
    chars: [
      { id: "miku", name: "미쿠", img: "/icons/characters/MIKU_0.png", matchKeys: ["미쿠"] },
      { id: "rin", name: "린", img: "/icons/characters/RIN_0.png", matchKeys: ["린"] },
      { id: "ren", name: "렌", img: "/icons/characters/REN_0.png", matchKeys: ["렌"] },
      { id: "luka", name: "루카", img: "/icons/characters/LUKA_0.png", matchKeys: ["루카"] },
      { id: "meiko", name: "MEIKO", img: "/icons/characters/MEIKO_0.png", matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito", name: "KAITO", img: "/icons/characters/KAITO_0.png", matchKeys: ["카이토", "KAITO"] }
    ]
  }
];

const ATTR_FILTERS: AttrDef[] = [
  { id: "pure", name: "퓨어", img: "/icons/attrs/pure.png" },
  { id: "happy", name: "해피", img: "/icons/attrs/happy.png" },
  { id: "cute", name: "큐트", img: "/icons/attrs/cute.png" },
  { id: "mysterious", name: "미스테리어스", img: "/icons/attrs/mysterious.png" },
  { id: "cool", name: "쿨", img: "/icons/attrs/cool.png" }
];

const SKILL_FILTERS: SkillDef[] = [
  { id: "score", name: "스업", img: "/icons/skills/score_x.png", matchKeys: ["스업"] },
  { id: "condition", name: "조건부 스업", img: "/icons/skills/condition_x.png", matchKeys: ["퍼스업", "굿스업", "체스업", "블페", "팀스업"] },
  { id: "perfect", name: "판정 강화", img: "/icons/skills/perfect_x.png", matchKeys: ["판강"] },
  { id: "heal", name: "라이프 회복", img: "/icons/skills/heal_x.png", matchKeys: ["힐"] }
];

export default function MyCardsPage() {
  const [cardStates, setCardStates] = useState<Record<string, UserCardState>>({});
  const [activeModalCard, setActiveModalCard] = useState<FinalCardInfo | null>(null);
  const [mounted, setMounted] = useState(false);

  const [showPostAwake, setShowPostAwake] = useState(false);
  
  // 필터 상태
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sekard_user_card_states");
    if (saved) {
      try { 
        setCardStates(JSON.parse(saved)); 
      } catch (e) { 
        console.error(e); 
      }
    }
  }, []);

  const handleUpdateCardState = (id: string, newState: Partial<UserCardState>) => {
    const defaultState: UserCardState = { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 };
    const currentCardState = cardStates[id] || defaultState;
    
    const updated = {
      ...cardStates,
      [id]: { ...currentCardState, ...newState }
    };
    
    setCardStates(updated);
    localStorage.setItem("sekard_user_card_states", JSON.stringify(updated));
  };

  const toggleFilter = (list: string[], setList: (val: string[]) => void, id: string) => {
    if (list.includes(id)) setList(list.filter(item => item !== id));
    else setList([...list, id]);
  };

  const resetFilters = () => {
    setSelectedChars([]);
    setSelectedAttrs([]);
    setSelectedSkills([]);
    setShowOnlyOwned(false);
  };

  const filteredCards = ALL_CARDS.filter(card => {
    if (showOnlyOwned && !cardStates[card.id]?.isOwned) return false;

    if (selectedChars.length > 0) {
      const matchesChar = selectedChars.some(selId => {
        const charObj = UNIT_FILTERS.flatMap(u => u.chars).find(c => c.id === selId);
        if (!charObj) return false;
        if (charObj.matchKeys) {
          return charObj.matchKeys.some(key => card.character.includes(key));
        }
        return card.character === charObj.name;
      });
      if (!matchesChar) return false;
    }

    if (selectedAttrs.length > 0) {
      const matchesAttr = selectedAttrs.some(selId => {
        const attrObj = ATTR_FILTERS.find(a => a.id === selId);
        return card.attribute === attrObj?.name;
      });
      if (!matchesAttr) return false;
    }

    if (selectedSkills.length > 0) {
      const matchesSkill = selectedSkills.some(selId => {
        const skillObj = SKILL_FILTERS.find(s => s.id === selId);
        return skillObj?.matchKeys.includes(card.skillType || "") ?? false;
      });
      if (!matchesSkill) return false;
    }

    return true; 
  });

  if (!mounted) return null;

  const currentModalState = activeModalCard
    ? cardStates[activeModalCard.id] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }
    : { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 };

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 py-6 min-h-screen text-zinc-100 max-w-screen-2xl mx-auto">
      
      {/* 🧭 1. 왼편: 이미지 아이콘 필터 구역 */}
      <div className="w-full md:w-[280px] shrink-0 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-zinc-300 tracking-wider uppercase">🔍 필터</h2>
          <button 
            onClick={resetFilters}
            className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors bg-zinc-900 px-2.5 py-1 rounded-md border border-white/5"
          >
            초기화 ↺
          </button>
        </div>

        <div className="space-y-6 max-h-[80vh] md:overflow-y-auto custom-scrollbar pr-2">
          
          <button 
            onClick={() => setShowOnlyOwned(!showOnlyOwned)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all shadow-sm active:scale-[0.98] ${
              showOnlyOwned 
                ? "bg-[#00FFD1]/10 border-[#00FFD1]/50 text-[#00FFD1]" 
                : "bg-zinc-900 border-white/5 text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            <span className="text-xs font-bold tracking-wide">내 보유 카드만 보기</span>
            <span className="text-sm">{showOnlyOwned ? "✓" : "○"}</span>
          </button>

          {/* ✅ 속성 필터 */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1">ATTRIBUTE</span>
            <div className="grid grid-cols-5 gap-1.5">
              {ATTR_FILTERS.map(attr => (
                <button
                  key={attr.id}
                  onClick={() => toggleFilter(selectedAttrs, setSelectedAttrs, attr.id)}
                  className={`relative aspect-square rounded-full transition-all overflow-hidden ${
                    selectedAttrs.includes(attr.id)
                      ? "ring-2 ring-[#00FFD1] scale-105 drop-shadow-[0_0_8px_rgba(0,255,209,0.7)]"
                      : "ring-1 ring-white/10 hover:ring-white/30"
                  }`}
                  title={attr.name}
                >
                  <img src={attr.img} alt={attr.name} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* ✅ 스킬 필터 */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1">SKILL</span>
            <div className="grid grid-cols-4 gap-1.5">
              {SKILL_FILTERS.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => toggleFilter(selectedSkills, setSelectedSkills, skill.id)}
                  className={`relative aspect-square rounded-full transition-all overflow-hidden p-1 ${
                    selectedSkills.includes(skill.id)
                      ? "ring-2 ring-[#00FFD1] scale-105 drop-shadow-[0_0_8px_rgba(0,255,209,0.7)] bg-[#00FFD1]/10"
                      : "ring-1 ring-white/10 hover:ring-white/30 bg-zinc-900"
                  }`}
                  title={skill.name}
                >
                  <img src={skill.img} alt={skill.name} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* ✅ 캐릭터(유닛별) 필터 */}
          <div className="space-y-4 pt-2">
            <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1 border-t border-white/5 pt-4 block">CHARACTER</span>
            {UNIT_FILTERS.map((unit) => (
              <div key={unit.id} className="bg-zinc-900/50 p-2.5 rounded-2xl border border-white/5">
                <div className="grid grid-cols-4 gap-1.5">
                  {unit.chars.map(char => (
                    <button
                      key={char.id}
                      onClick={() => toggleFilter(selectedChars, setSelectedChars, char.id)}
                      className={`relative aspect-square rounded-full transition-all overflow-hidden bg-zinc-950 ${
                        selectedChars.includes(char.id)
                          ? "ring-2 ring-[#00FFD1] scale-105 drop-shadow-[0_0_8px_rgba(0,255,209,0.7)]"
                          : "ring-1 ring-white/10 hover:ring-white/30"
                      }`}
                      title={char.name}
                    >
                      <img src={char.img} alt={char.name} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 🗂️ 2. 우측: 필터링된 전체 카드 리스트 나열 구역 */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/30 rounded-3xl p-4 md:p-6 border border-white/5">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">내 4성 체크리스트</h1>
            <p className="text-xs text-zinc-400 mt-1">
              검색된 카드: <strong className="text-white">{filteredCards.length}</strong>장
            </p>
          </div>

          <button
            onClick={() => setShowPostAwake(!showPostAwake)}
            className="self-start sm:self-auto flex items-center gap-2 p-1 text-[12px] font-bold rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all shadow-sm active:scale-95 shrink-0 border border-white/10"
            aria-label={showPostAwake ? "특훈 전 썸네일로 전환" : "특훈 후 썸네일로 전환"}
          >
            <img 
              src={showPostAwake ? "/icons/post_star.png" : "/icons/pre_star.png"} 
              alt={showPostAwake ? "현재: 특훈 후" : "현재: 특훈 전"}
              className="h-8 w-auto object-contain block"
            />
          </button>
        </div>

        {filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <span className="text-4xl mb-3 opacity-50">🫥</span>
            <p className="text-sm font-medium">선택한 조건에 맞는 카드가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-y-6 gap-x-4 w-full">
            {filteredCards.map((card) => {
              const isOwned = cardStates[card.id]?.isOwned;
              return (
                <div 
                  key={card.id} 
                  onClick={() => setActiveModalCard(card)}
                  className="relative p-1 cursor-pointer transition-all hover:scale-[1.05] flex flex-col items-center text-center group"
                >
                  <div className="relative w-fit shrink-0">
                    <img 
                      src={showPostAwake ? card.thumbPostPath : card.thumbPrePath} 
                      alt="썸네일" 
                      className={`h-25 w-auto object-contain transition-all duration-300 rounded-lg ${
                        isOwned 
                          ? "ring-2 ring-[#00FFD1]/80 shadow-[0_0_12px_rgba(0,255,209,0.5)]" 
                          : "ring-1 ring-white/10 group-hover:ring-white/30"
                      }`} 
                    />
                  </div>
                  
                  <p className="text-[11px] font-semibold mt-2.5 truncate w-25 transition-colors text-zinc-200 group-hover:text-white">
                    {card.cardName}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {card.character}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CardDetailModal
        card={activeModalCard}
        userState={currentModalState}
        onUpdateState={handleUpdateCardState}
        onClose={() => setActiveModalCard(null)}
      />
    </div>
  );
}