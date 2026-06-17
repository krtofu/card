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

// 🌟 [핵심 해결] TypeScript에게 데이터의 생김새(규칙)를 미리 알려줍니다!
type CharDef = { id: string; name: string; img: string; matchKeys?: string[] };
type UnitDef = { id: string; name: string; chars: CharDef[] };
type AttrDef = { id: string; name: string; img: string };
type SkillDef = { id: string; name: string; img: string; matchKeys: string[] };

// 🌟 위에서 만든 규칙을 적용해서 에러를 완벽하게 차단합니다.
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

  // 🌟 스위치 상태 관리
  const [showPostAwake, setShowPostAwake] = useState(false);
  
  // 🌟 마법의 필터 상태 관리 (장바구니)
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

  // 🌟 토글(스위치) 헬퍼 함수
  const toggleFilter = (list: string[], setList: (val: string[]) => void, id: string) => {
    if (list.includes(id)) setList(list.filter(item => item !== id));
    else setList([...list, id]);
  };

  // 🌟 초기화 버튼
  const resetFilters = () => {
    setSelectedChars([]);
    setSelectedAttrs([]);
    setSelectedSkills([]);
    setShowOnlyOwned(false);
  };

  // 🌟 대망의 필터링 엔진!
  const filteredCards = ALL_CARDS.filter(card => {
    // 1. 보유 필터
    if (showOnlyOwned && !cardStates[card.id]?.isOwned) return false;

    // 2. 캐릭터 필터
    if (selectedChars.length > 0) {
      const matchesChar = selectedChars.some(selId => {
        const charObj = UNIT_FILTERS.flatMap(u => u.chars).find(c => c.id === selId);
        if (!charObj) return false;

        // matchKeys가 있으면 (버싱) 해당 키워드 포함 검사, 없으면 정확히 이름 일치 검사
        if (charObj.matchKeys) {
          return charObj.matchKeys.some(key => card.character.includes(key));
        }
        return card.character === charObj.name;
      });
      if (!matchesChar) return false;
    }

    // 3. 속성 필터
    if (selectedAttrs.length > 0) {
      const matchesAttr = selectedAttrs.some(selId => {
        const attrObj = ATTR_FILTERS.find(a => a.id === selId);
        return card.attribute === attrObj?.name;
      });
      if (!matchesAttr) return false;
    }

    // 4. 스킬 필터
    if (selectedSkills.length > 0) {
      const matchesSkill = selectedSkills.some(selId => {
        const skillObj = SKILL_FILTERS.find(s => s.id === selId);
        return skillObj?.matchKeys.includes(card.skillType || "") ?? false;
      });
      if (!matchesSkill) return false;
    }

    return true; // 무사히 살아남은 카드만 보여줍니다!
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
          
          {/* ✅ 보유 카드만 보기 스위치 */}
          <button 
            onClick={() => setShowOnlyOwned(!showOnlyOwned)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all shadow-sm active:scale-[0.98] ${
              showOnlyOwned 
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300" 
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
                      ? "ring-2 ring-sky-400 scale-105 opacity-100 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      : "opacity-40 grayscale-[50%] hover:grayscale-0 hover:opacity-80"
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
                  className={`relative aspect-square rounded-full transition-all overflow-hidden ${
                    selectedSkills.includes(skill.id)
                      ? "ring-2 ring-purple-400 scale-105 opacity-100 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)] bg-purple-500/10"
                      : "opacity-40 hover:opacity-80 bg-zinc-900"
                  }`}
                  title={skill.name}
                >
                  <img src={skill.img} alt={skill.name} className="w-full h-full object-contain p-1" />
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
                      className={`relative aspect-square rounded-full transition-all overflow-hidden ${
                        selectedChars.includes(char.id)
                          ? "ring-2 ring-emerald-400 scale-105 opacity-100 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                          : "opacity-40 grayscale-[60%] hover:grayscale-0 hover:opacity-100"
                      }`}
                      title={char.name}
                    >
                      <img src={char.img} alt={char.name} className="w-full h-full object-contain bg-zinc-950" />
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
        
        {/* 타이틀 영역과 토글 버튼 우측 정렬 배치 */}
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

        {/* 필터링 결과가 없을 때 */}
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
                  className={`relative p-1 cursor-pointer transition-all flex flex-col items-center text-center group ${
                    isOwned ? "opacity-100" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <div className="relative w-fit shrink-0">
                    <img 
                      src={showPostAwake ? card.thumbPostPath : card.thumbPrePath} 
                      alt="썸네일" 
                      className={`h-25 w-auto object-contain transition-all duration-300 rounded-lg group-hover:-translate-y-1 ${
                        isOwned 
                          ? "ring-2 ring-emerald-500/50 shadow-[0_4px_12px_rgba(52,211,153,0.2)]" 
                          : "ring-1 ring-white/10 group-hover:ring-white/30"
                      }`} 
                    />
                  </div>
                  
                  <p className={`text-[11px] font-semibold mt-2.5 truncate w-25 transition-colors ${
                    isOwned ? "text-emerald-100" : "text-zinc-400 group-hover:text-zinc-200"
                  }`}>
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

      {/* 팝업 모달창 장착 */}
      <CardDetailModal
        card={activeModalCard}
        userState={currentModalState}
        onUpdateState={handleUpdateCardState}
        onClose={() => setActiveModalCard(null)}
      />
    </div>
  );
}