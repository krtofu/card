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

type CharDef = { id: string; name: string; img: string; isVirtual?: boolean; matchKeys?: string[] };
type UnitDef = { id: string; name: string; logo: string; chars: CharDef[] };
type AttrDef = { id: string; name: string; img: string };
type SkillDef = { id: string; name: string; img: string; matchKeys: string[] };

// 🌟 유닛별로 오리지널 4명 + 세카이 버싱 6명을 한 바구니에 담았습니다! (유닛당 총 10명씩)
const UNIT_FILTERS: UnitDef[] = [
  { id: "ln", name: "Leo/need", logo: "/icons/Leoneed.png",
    chars: [
      { id: "ichika", name: "호시노 이치카", img: "/icons/characters/Ichika.png" },
      { id: "saki", name: "텐마 사키", img: "/icons/characters/Saki.png" },
      { id: "honami", name: "모치즈키 호나미", img: "/icons/characters/Honami.png" },
      { id: "shiho", name: "히노모리 시호", img: "/icons/characters/Shiho.png" },
      // 레오니 세카이 버싱 (id에 유닛 접미사를 붙여 개별 버튼으로 작동하게 합니다)
      { id: "miku_l", name: "하츠네 미쿠", img: "/icons/characters/MIKU_l.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_l", name: "카가미네 린", img: "/icons/characters/RIN_l.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_l", name: "카가미네 렌", img: "/icons/characters/REN_l.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_l", name: "메구리네 루카", img: "/icons/characters/LUKA_l.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_l", name: "MEIKO", img: "/icons/characters/MEIKO_l.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_l", name: "KAITO", img: "/icons/characters/KAITO_l.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
    ]
  },
  { id: "mmj", name: "MORE MORE JUMP!", logo: "/icons/MMJ.png",
    chars: [
      { id: "minori", name: "하나사토 미노리", img: "/icons/characters/Minori.png" },
      { id: "haruka", name: "키리타니 하루카", img: "/icons/characters/Haruka.png" },
      { id: "airi", name: "모모이 아이리", img: "/icons/characters/Airi.png" },
      { id: "shizuku", name: "히노모리 시즈쿠", img: "/icons/characters/Shizuku.png" },
      // 모모점 세카이 버싱
      { id: "miku_m", name: "하츠네 미쿠", img: "/icons/characters/MIKU_m.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_m", name: "카가미네 린", img: "/icons/characters/RIN_m.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_m", name: "카가미네 렌", img: "/icons/characters/REN_m.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_m", name: "메구리네 루카", img: "/icons/characters/LUKA_m.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_m", name: "MEIKO", img: "/icons/characters/MEIKO_m.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_m", name: "KAITO", img: "/icons/characters/KAITO_m.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
    ]
  },
  { id: "vbs", name: "Vivid BAD SQUAD", logo: "/icons/VBS.png",
    chars: [
      { id: "kohane", name: "아즈사와 코하네", img: "/icons/characters/Kohane.png" },
      { id: "an", name: "시라이시 안", img: "/icons/characters/An.png" },
      { id: "akito", name: "시노노메 아키토", img: "/icons/characters/Akito.png" },
      { id: "toya", name: "아오야기 토우야", img: "/icons/characters/Toya.png" },
      // 비배스 세카이 버싱
      { id: "miku_v", name: "하츠네 미쿠", img: "/icons/characters/MIKU_v.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_v", name: "카가미네 린", img: "/icons/characters/RIN_v.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_v", name: "카가미네 렌", img: "/icons/characters/REN_v.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_v", name: "메구리네 루카", img: "/icons/characters/LUKA_v.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_v", name: "MEIKO", img: "/icons/characters/MEIKO_v.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_v", name: "KAITO", img: "/icons/characters/KAITO_v.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
    ]
  },
  { id: "wxs", name: "Wonderlands×Showtime", logo: "/icons/Wds.png",
    chars: [
      { id: "tsukasa", name: "텐마 츠카사", img: "/icons/characters/Tsukasa.png" },
      { id: "emu", name: "오토리 에무", img: "/icons/characters/Emu.png" },
      { id: "nene", name: "쿠사나기 네네", img: "/icons/characters/Nene.png" },
      { id: "rui", name: "카미시로 루이", img: "/icons/characters/Rui.png" },
      // 원더쇼 세카이 버싱
      { id: "miku_w", name: "하츠네 미쿠", img: "/icons/characters/MIKU_w.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_w", name: "카가미네 린", img: "/icons/characters/RIN_w.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_w", name: "카가미네 렌", img: "/icons/characters/REN_w.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_w", name: "메구리네 루카", img: "/icons/characters/LUKA_w.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_w", name: "MEIKO", img: "/icons/characters/MEIKO_w.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_w", name: "KAITO", img: "/icons/characters/KAITO_w.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
    ]
  },
  { id: "n25", name: "25시, 나이트코드에서.", logo: "/icons/25.png",
    chars: [
      { id: "kanade", name: "요이사키 카나데", img: "/icons/characters/Kanade.png" },
      { id: "mafuyu", name: "아사히나 마후유", img: "/icons/characters/Mafuyu.png" },
      { id: "ena", name: "시노노메 에나", img: "/icons/characters/Ena.png" },
      { id: "mizuki", name: "아키야마 미즈키", img: "/icons/characters/Mizuki.png" },
      // 니고 세카이 버싱
      { id: "miku_n", name: "하츠네 미쿠", img: "/icons/characters/MIKU_n.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_n", name: "카가미네 린", img: "/icons/characters/RIN_n.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_n", name: "카가미네 렌", img: "/icons/characters/REN_n.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_n", name: "메구리네 루카", img: "/icons/characters/LUKA_n.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_n", name: "MEIKO", img: "/icons/characters/MEIKO_n.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_n", name: "KAITO", img: "/icons/characters/KAITO_n.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
    ]
  },
  { id: "vs", name: "무소속 / VIRTUAL SINGER", logo: "/icons/VS.png",
    chars: [
      // 특정 세카이가 명시되지 않은 순수 무소속 버싱 카드용 필터 버튼
      { id: "miku_0", name: "하츠네 미쿠", img: "/icons/characters/MIKU_0.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_0", name: "카가미네 린", img: "/icons/characters/RIN_0.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_0", name: "카가미네 렌", img: "/icons/characters/REN_0.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_0", name: "메구리네 루카", img: "/icons/characters/LUKA_0.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_0", name: "MEIKO", img: "/icons/characters/MEIKO_0.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_0", name: "KAITO", img: "/icons/characters/KAITO_0.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
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
  
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sekard_user_card_states");
    if (saved) try { setCardStates(JSON.parse(saved)); } catch (e) { console.error(e); }
  }, []);

  const handleUpdateCardState = (id: string, newState: Partial<UserCardState>) => {
    const updated = { ...cardStates, [id]: { ...(cardStates[id] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }), ...newState } };
    setCardStates(updated);
    localStorage.setItem("sekard_user_card_states", JSON.stringify(updated));
  };

  const toggleFilter = (list: string[], setList: (val: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter(item => item !== id) : [...list, id]);
  };

  const toggleUnitFilter = (unitChars: CharDef[]) => {
    const charIds = unitChars.map(c => c.id);
    const isAllSelected = charIds.every(id => selectedChars.includes(id));
    setSelectedChars(isAllSelected ? selectedChars.filter(id => !charIds.includes(id)) : [...new Set([...selectedChars, ...charIds])]);
  };

  const resetFilters = () => {
    setSelectedChars([]); setSelectedAttrs([]); setSelectedSkills([]); setShowOnlyOwned(false);
  };

  // 🌟 정교해진 하이브리드 필터 엔진
  const filteredCards = ALL_CARDS.filter(card => {
    if (showOnlyOwned && !cardStates[card.id]?.isOwned) return false;
    
    if (selectedChars.length > 0) {
      const matchesChar = selectedChars.some(selId => {
        // 현재 선택된 버튼의 유닛 부모 찾기
        const parentUnit = UNIT_FILTERS.find(u => u.chars.some(c => c.id === selId));
        const charObj = parentUnit?.chars.find(c => c.id === selId);
        if (!charObj) return false;

        // 버추얼 싱어 처리 (해당 유닛 소속 코드와 이름 조건이 모두 일치해야 함)
        if (charObj.isVirtual && charObj.matchKeys) {
          const cleanUnit = (card.unit || "").trim().toLowerCase();
          const targetUnitId = parentUnit?.id || "";
          
          let isCorrectUnit = false;
          if (targetUnitId === "ln" && (cleanUnit.includes("레오니") || cleanUnit.includes("leo") || cleanUnit === "l/n")) isCorrectUnit = true;
          else if (targetUnitId === "mmj" && (cleanUnit.includes("모모점") || cleanUnit.includes("more") || cleanUnit === "mmj")) isCorrectUnit = true;
          else if (targetUnitId === "vbs" && (cleanUnit.includes("비배스") || cleanUnit.includes("vivid") || cleanUnit === "vbs")) isCorrectUnit = true;
          else if (targetUnitId === "wxs" && (cleanUnit.includes("원더쇼") || cleanUnit.includes("wonder") || cleanUnit === "wxs")) isCorrectUnit = true;
          else if (targetUnitId === "n25" && (cleanUnit.includes("니고") || cleanUnit.includes("25") || cleanUnit === "niigo")) isCorrectUnit = true;
          else if (targetUnitId === "vs" && (cleanUnit.includes("버싱") || cleanUnit.includes("virtual") || cleanUnit === "")) isCorrectUnit = true;

          return isCorrectUnit && charObj.matchKeys.some(key => card.character.includes(key));
        }

        // 오리지널 캐릭터 처리
        return card.character === charObj.name;
      });
      if (!matchesChar) return false;
    }
    
    if (selectedAttrs.length > 0 && !selectedAttrs.some(selId => card.attribute === ATTR_FILTERS.find(a => a.id === selId)?.name)) return false;
    if (selectedSkills.length > 0 && !selectedSkills.some(selId => SKILL_FILTERS.find(s => s.id === selId)?.matchKeys.includes(card.skillType || ""))) return false;
    return true; 
  });

  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 py-6 min-h-screen text-zinc-100 max-w-screen-2xl mx-auto">
      
      {/* 🧭 1. 왼편: 이미지 아이콘 필터 구역 */}
      <div className="w-full md:w-[280px] shrink-0 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-zinc-300 tracking-wider uppercase">🔍 필터</h2>
          <button onClick={resetFilters} className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors bg-zinc-900 px-2.5 py-1 rounded-md border border-white/5">초기화 ↺</button>
        </div>

        <button onClick={() => setShowOnlyOwned(!showOnlyOwned)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${showOnlyOwned ? "bg-[#00FFD1]/10 text-[#00FFD1]" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"}`}>
          <span className="text-xs font-bold tracking-wide">내 보유 카드만 보기</span>
          <span className="text-sm">{showOnlyOwned ? "✓" : "○"}</span>
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1">ATTRIBUTE</span>
            <div className="grid grid-cols-5 gap-1.5">
              {ATTR_FILTERS.map(attr => (
                <button key={attr.id} onClick={() => toggleFilter(selectedAttrs, setSelectedAttrs, attr.id)} 
                  className={`relative aspect-square rounded-full transition-all duration-200 ${
                    selectedAttrs.includes(attr.id) ? "scale-105" : "scale-[0.85] hover:scale-95"
                  }`}>
                  <img src={attr.img} alt={attr.name} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1">SKILL</span>
            <div className="grid grid-cols-4 gap-1.5">
              {SKILL_FILTERS.map(skill => (
                <button key={skill.id} onClick={() => toggleFilter(selectedSkills, setSelectedSkills, skill.id)}
                  className={`relative aspect-square rounded-full p-1 transition-all duration-200 ${
                    selectedSkills.includes(skill.id) ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"
                  }`}>
                  <img src={skill.img} alt={skill.name} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1 border-t border-white/5 pt-4 block">CHARACTER</span>
            {UNIT_FILTERS.map((unit) => (
              <div key={unit.id} className="flex flex-col gap-2">
                
                {/* 유닛 로고 버튼 (현재 유닛에 소속된 버싱포함 전원 선택 여부 판단) */}
                <button 
                  onClick={() => toggleUnitFilter(unit.chars)} 
                  className={`w-full h-16 py-1 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    unit.chars.every(c => selectedChars.includes(c.id)) 
                      ? "bg-[#00FFD1]/15 scale-105" 
                      : "bg-transparent hover:bg-white/5 scale-95"
                  }`}
                >
                  <img src={unit.logo} alt={unit.name} className="h-full w-auto object-contain max-w-[90%]" />
                </button>
                
                {/* 🌟 4열(기존)에서 버싱포함 10명이 줄바꿈 정돈되도록 격자 배치유지 */}
                <div className="grid grid-cols-4 gap-1.5 mt-1">
                  {unit.chars.map(char => (
                    <button key={char.id} onClick={() => toggleFilter(selectedChars, setSelectedChars, char.id)}
                      className={`relative aspect-square rounded-full transition-all duration-200 bg-zinc-950 ${
                        selectedChars.includes(char.id) ? "scale-105" : "scale-[0.80] hover:scale-[0.85]"
                      }`}>
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
            <p className="text-xs text-zinc-400 mt-1">검색된 카드: <strong className="text-white">{filteredCards.length}</strong>장</p>
          </div>
          <button onClick={() => setShowPostAwake(!showPostAwake)} className="self-start sm:self-auto p-1 rounded-full bg-zinc-900 border border-white/10" aria-label="썸네일 전환">
            <img src={showPostAwake ? "/icons/post_star.png" : "/icons/pre_star.png"} alt="스위치" className="h-8 w-auto object-contain block" />
          </button>
        </div>

        {filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500"><p>선택한 조건에 맞는 카드가 없습니다.</p></div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-y-6 gap-x-4 w-full">
            {filteredCards.map((card) => {
              const isOwned = cardStates[card.id]?.isOwned;
              return (
                <div key={card.id} onClick={() => setActiveModalCard(card)} className="relative p-1 cursor-pointer transition-all hover:scale-[1.05] flex flex-col items-center text-center group">
                  <img src={showPostAwake ? card.thumbPostPath : card.thumbPrePath} alt="썸네일" 
                    className="h-25 w-auto object-contain transition-all duration-300 rounded-lg border border-white/10 group-hover:border-white/30" />
                  <p className={`text-[11px] font-semibold mt-2.5 truncate w-25 ${isOwned ? "text-[#00FFD1]" : "text-zinc-200"}`}>{card.cardName}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{card.character}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CardDetailModal card={activeModalCard} userState={cardStates[activeModalCard?.id || ""] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }} onUpdateState={handleUpdateCardState} onClose={() => setActiveModalCard(null)} />
    </div>
  );
}