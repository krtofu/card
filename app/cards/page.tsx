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
type SubSkillDef = { id: string; name: string; matchKeys: string[] };
type SkillDef = { id: string; name: string; img: string; matchKeys?: string[]; subs?: SubSkillDef[] };

const UNIT_FILTERS: UnitDef[] = [
  { id: "vs", name: "무소속 / VIRTUAL SINGER", logo: "/icons/VS.png",
    chars: [
      { id: "miku_0", name: "하츠네 미쿠", img: "/icons/characters/MIKU_0.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_0", name: "카가미네 린", img: "/icons/characters/RIN_0.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_0", name: "카가미네 렌", img: "/icons/characters/REN_0.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_0", name: "메구리네 루카", img: "/icons/characters/LUKA_0.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_0", name: "MEIKO", img: "/icons/characters/MEIKO_0.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_0", name: "KAITO", img: "/icons/characters/KAITO_0.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
    ]
  },
  { id: "ln", name: "Leo/need", logo: "/icons/Leoneed.png",
    chars: [
      { id: "ichika", name: "호시노 이치카", img: "/icons/characters/Ichika.png" },
      { id: "saki", name: "텐마 사키", img: "/icons/characters/Saki.png" },
      { id: "honami", name: "모치즈키 호나미", img: "/icons/characters/Honami.png" },
      { id: "shiho", name: "히노모리 시호", img: "/icons/characters/Shiho.png" },
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
      { id: "miku_n", name: "하츠네 미쿠", img: "/icons/characters/MIKU_n.png", isVirtual: true, matchKeys: ["미쿠"] },
      { id: "rin_n", name: "카가미네 린", img: "/icons/characters/RIN_n.png", isVirtual: true, matchKeys: ["린"] },
      { id: "ren_n", name: "카가미네 렌", img: "/icons/characters/REN_n.png", isVirtual: true, matchKeys: ["렌"] },
      { id: "luka_n", name: "메구리네 루카", img: "/icons/characters/LUKA_n.png", isVirtual: true, matchKeys: ["루카"] },
      { id: "meiko_n", name: "MEIKO", img: "/icons/characters/MEIKO_n.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] },
      { id: "kaito_n", name: "KAITO", img: "/icons/characters/KAITO_n.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] }
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
  { id: "condition_group", name: "조건부 스업", img: "/icons/skills/condition_x.png", 
    subs: [
      { id: "cond_perfect", name: "퍼스업", matchKeys: ["퍼스업"] },
      { id: "cond_good", name: "굿스업", matchKeys: ["굿스업"] },
      { id: "cond_life", name: "체스업", matchKeys: ["체스업"] },
      { id: "cond_bp", name: "블페", matchKeys: ["블페"] },
      { id: "cond_team", name: "팀스업", matchKeys: ["팀스업"] }
    ] 
  },
  { id: "perfect", name: "판정 강화", img: "/icons/skills/perfect_x.png", matchKeys: ["판강"] },
  { id: "heal", name: "라이프 회복", img: "/icons/skills/heal_x.png", matchKeys: ["힐"] }
];

const ALL_SKILL_TARGETS = [
  ...SKILL_FILTERS.filter(s => s.matchKeys),
  ...(SKILL_FILTERS.find(s => s.id === "condition_group")?.subs || [])
];

// 🌟 [추가됨] 세분화된 콜라보 필터 목록 및 인식 키워드 설정!
const COLLAB_FILTERS = [
  { id: "collab_evil", name: "에빌", matchKeys: ["에빌", "악의", "대죄", "evillious"] },
  { id: "collab_sanrio", name: "산리오", matchKeys: ["산리오", "sanrio"] },
  { id: "collab_enstar", name: "앙스타", matchKeys: ["앙스타", "앙상블", "ensemble"] },
  { id: "collab_tamagotchi", name: "다마고치", matchKeys: ["다마고치", "tamagotchi"] }
];

export default function MyCardsPage() {
  const [cardStates, setCardStates] = useState<Record<string, UserCardState>>({});
  const [activeModalCard, setActiveModalCard] = useState<FinalCardInfo | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showPostAwake, setShowPostAwake] = useState(false);
  
  // 🌟 접기/펴기 상태 관리
  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  const [isCollabExpanded, setIsCollabExpanded] = useState(true);
  const [isAttrExpanded, setIsAttrExpanded] = useState(true);
  const [isSkillExpanded, setIsSkillExpanded] = useState(true);
  const [isCharExpanded, setIsCharExpanded] = useState(true);

  // 🌟 필터 선택 상태 관리
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]); 
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedHairs, setSelectedHairs] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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

  const toggleCondSkillGroup = () => {
    const condSubs = SKILL_FILTERS.find(s => s.id === "condition_group")?.subs || [];
    const condIds = condSubs.map(s => s.id);
    const isAllSelected = condIds.every(id => selectedSkills.includes(id));
    setSelectedSkills(isAllSelected ? selectedSkills.filter(id => !condIds.includes(id)) : [...new Set([...selectedSkills, ...condIds])]);
  };

  // 🌟 한정 버튼 누르면 콜라보(에빌,산리오,앙스타,다마고치)까지 싹 다 잡히도록 로직 강화!
  const collabIds = COLLAB_FILTERS.map(c => c.id);
  const limitedGroup = ["limited", ...collabIds];
  const isAllLimitedSelected = limitedGroup.every(id => selectedTypes.includes(id));

  const toggleLimitedGroup = () => {
    if (isAllLimitedSelected) {
      setSelectedTypes(selectedTypes.filter(id => !limitedGroup.includes(id)));
    } else {
      setSelectedTypes([...new Set([...selectedTypes, ...limitedGroup])]);
    }
  };

  const resetFilters = () => {
    setSelectedChars([]); setSelectedAttrs([]); setSelectedSkills([]); 
    setSelectedStatuses([]); setSelectedTypes([]); setSelectedHairs([]);
  };

  const filteredCards = ALL_CARDS.filter(card => {
    // 1. 보유 상태 필터
    if (selectedStatuses.length > 0) {
      const isOwned = cardStates[card.id]?.isOwned || false;
      const isTarget = cardStates[card.id]?.isTarget || false;

      const matchOwned = selectedStatuses.includes("owned") && isOwned;
      const matchUnowned = selectedStatuses.includes("unowned") && !isOwned;
      const matchTarget = selectedStatuses.includes("target") && isTarget;

      if (!(matchOwned || matchUnowned || matchTarget)) return false;
    }

    // 🌟 2. 가챠 타입 & 세분화된 콜라보 필터
    if (selectedTypes.length > 0) {
      const matchNormal = selectedTypes.includes("normal") && card.gachaType === "통상";
      const matchLimited = selectedTypes.includes("limited") && ["한정", "페스", "월링"].includes(card.gachaType);
      
      let matchCollab = false;
      if (card.gachaType === "콜라보") {
        matchCollab = COLLAB_FILTERS.some(collab => {
          if (!selectedTypes.includes(collab.id)) return false;
          // 콜라보 카드일 경우 gachaPoolName이나 eventName에서 키워드를 찾아 매칭합니다.
          const searchStr = (card.gachaPoolName + " " + card.eventName).toLowerCase();
          return collab.matchKeys.some(key => searchStr.includes(key.toLowerCase()));
        });
      }
      
      if (!(matchNormal || matchLimited || matchCollab)) return false;
    }

    // 3. 헤어 유무 필터
    if (selectedHairs.length > 0) {
      const matchHairO = selectedHairs.includes("hair_o") && card.hasHair;
      const matchHairX = selectedHairs.includes("hair_x") && !card.hasHair;
      
      if (!(matchHairO || matchHairX)) return false;
    }
    
    // 4. 캐릭터 필터
    if (selectedChars.length > 0) {
      const matchesChar = selectedChars.some(selId => {
        const parentUnit = UNIT_FILTERS.find(u => u.chars.some(c => c.id === selId));
        const charObj = parentUnit?.chars.find(c => c.id === selId);
        if (!charObj) return false;

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

        return card.character === charObj.name;
      });
      if (!matchesChar) return false;
    }
    
    // 5. 속성 필터
    if (selectedAttrs.length > 0) {
      const matchesAttr = selectedAttrs.some(selId => {
        const cardAttr = (card.attribute || "").toLowerCase();
        const attrObj = ATTR_FILTERS.find(a => a.id === selId);
        return cardAttr === selId || cardAttr === attrObj?.name;
      });
      if (!matchesAttr) return false;
    }

    // 6. 스킬 필터
    if (selectedSkills.length > 0) {
      const matchesSkill = selectedSkills.some(selId => {
        const targetObj = ALL_SKILL_TARGETS.find(t => t.id === selId);
        return targetObj?.matchKeys?.includes(card.skillType || "") ?? false;
      });
      if (!matchesSkill) return false;
    }
    
    return true; 
  });

  if (!mounted) return null;

  const isAnyStatusSelected = selectedStatuses.length > 0;
  const isAnyTypeSelected = selectedTypes.length > 0;
  const isAnyHairSelected = selectedHairs.length > 0;
  const isAnyAttrSelected = selectedAttrs.length > 0;
  const isAnySkillSelected = selectedSkills.length > 0;
  const isAnyCharSelected = selectedChars.length > 0;

  const condSubs = SKILL_FILTERS.find(s => s.id === "condition_group")?.subs || [];
  const condIds = condSubs.map(s => s.id);
  const isAllCondSelected = condIds.length > 0 && condIds.every(id => selectedSkills.includes(id));
  
  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6 min-h-screen text-zinc-100 max-w-[1920px] mx-auto w-full">
      
      {/* 🎛️ 왼쪽 필터 사이드바 */}
      <div className="w-full md:w-[280px] shrink-0 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-zinc-300 tracking-wider uppercase">🔍 필터</h2>
          <button onClick={resetFilters} className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors bg-zinc-900 px-2.5 py-1 rounded-md border border-white/5">초기화 ↺</button>
        </div>

        <div className="space-y-6">
          
          {/* ✅ 상태(STATUS) 대통합 필터 구역 */}
          <div className="space-y-2">
            <button 
              onClick={() => setIsStatusExpanded(!isStatusExpanded)} 
              className="w-full flex items-center justify-between group pb-1 cursor-pointer"
            >
              <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">STATUS</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isStatusExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            
            {isStatusExpanded && (
              <div className="space-y-3 pt-1">
                
                {/* 1층: 보유 / 미보유 / 목표 (텍스트 버튼) */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "owned", label: "✓ 보유" },
                    { id: "unowned", label: "❌ 미보유" },
                    { id: "target", label: "⭐ 목표" }
                  ].map(status => {
                    const isSelected = selectedStatuses.includes(status.id);
                    // 🌟 비활성 상태 가독성 1000% 상승! (스킬 버튼처럼 하얀 글씨 + 투명도 조절)
                    const opacityClass = !isAnyStatusSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-white bg-zinc-900";
                    
                    // 🌟 유저님의 근본 색상 복구 (보유:초록, 목표:핑크)
                    const activeClass =
                      status.id === "target" ? "bg-pink-500/20 text-pink-300 shadow-md border border-pink-500/30 scale-105" :
                      status.id === "owned" ? "bg-emerald-500/20 text-emerald-300 shadow-md border border-emerald-500/30 scale-105" :
                      "bg-zinc-700 text-white shadow-md border border-zinc-500 scale-105";

                    return (
                      <button key={status.id} onClick={() => toggleFilter(selectedStatuses, setSelectedStatuses, status.id)}
                        className={`py-2 px-1 text-[12px] sm:text-[13px] font-medium tracking-tight rounded-lg transition-all duration-300 text-white ${
                          isSelected ? activeClass : "bg-zinc-900 hover:bg-zinc-800 border border-transparent scale-95"
                        } ${opacityClass}`}>
                        {status.label}
                      </button>
                    )
                  })}
                </div>

                {/* 2층: 통상 / 한정 / 헤어 O / 헤어 X (빅 사이즈 이미지 버튼) */}
                <div className="grid grid-cols-4 gap-1.5">
                  {/* 통상 이미지 버튼 */}
                  <button onClick={() => toggleFilter(selectedTypes, setSelectedTypes, "normal")}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${
                      selectedTypes.includes("normal") ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"
                    } ${!isAnyTypeSelected || selectedTypes.includes("normal") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/normal.png" alt="통상" className="w-full h-full object-contain" />
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 shadow-xl">통상</div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </button>

                  {/* 한정 이미지 버튼 (주석 직관적으로 수정 + 누르면 콜라보 싹쓸이 기능!) */}
                  <button onClick={toggleLimitedGroup}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${
                      isAllLimitedSelected ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"
                    } ${!isAnyTypeSelected || isAllLimitedSelected ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/limited.png" alt="한정" className="w-full h-full object-contain" />
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 shadow-xl">한정</div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </button>

                  {/* 헤어 O 이미지 버튼 */}
                  <button onClick={() => toggleFilter(selectedHairs, setSelectedHairs, "hair_o")}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${
                      selectedHairs.includes("hair_o") ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"
                    } ${!isAnyHairSelected || selectedHairs.includes("hair_o") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/hair_o.png" alt="헤어 O" className="w-full h-full object-contain" />
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 shadow-xl">헤어 O</div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </button>

                  {/* 헤어 X 이미지 버튼 */}
                  <button onClick={() => toggleFilter(selectedHairs, setSelectedHairs, "hair_x")}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${
                      selectedHairs.includes("hair_x") ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"
                    } ${!isAnyHairSelected || selectedHairs.includes("hair_x") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/hair_x.png" alt="헤어 X" className="w-full h-full object-contain" />
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 shadow-xl">헤어 X</div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ✅ 세분화된 콜라보(COLLAB) 전용 구역 */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <button 
              onClick={() => setIsCollabExpanded(!isCollabExpanded)} 
              className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer"
            >
              <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">COLLAB</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isCollabExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            
            {isCollabExpanded && (
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {COLLAB_FILTERS.map(collab => {
                  const isSelected = selectedTypes.includes(collab.id);
                  // 🌟 콜라보 역시 스킬 뱃지와 같은 비활성 가독성 적용
                  const opacityClass = !isAnyTypeSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-white bg-zinc-900";
                  
                  return (
                    <button key={collab.id} onClick={() => toggleFilter(selectedTypes, setSelectedTypes, collab.id)}
                      className={`py-2 px-1 text-[11px] sm:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 text-white ${
                        isSelected 
                          ? "bg-amber-500/20 text-amber-300 shadow-md border border-amber-500/30 scale-105" 
                          : "bg-zinc-900 hover:bg-zinc-800 border border-transparent scale-95"
                      } ${opacityClass}`}>
                      {collab.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ✅ 속성 필터 */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <button 
              onClick={() => setIsAttrExpanded(!isAttrExpanded)} 
              className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer"
            >
              <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">ATTRIBUTE</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isAttrExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            
            {isAttrExpanded && (
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {ATTR_FILTERS.map(attr => {
                  const isSelected = selectedAttrs.includes(attr.id);
                  const opacityClass = !isAnyAttrSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                  
                  return (
                  <button key={attr.id} onClick={() => toggleFilter(selectedAttrs, setSelectedAttrs, attr.id)} 
                    className={`relative group aspect-square rounded-full transition-all duration-300 ${
                      isSelected ? "scale-105" : "scale-[0.85] hover:scale-95"
                    } ${opacityClass}`}>
                    <img src={attr.img} alt={attr.name} className="w-full h-full object-contain" />
                    
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 shadow-xl">
                          {attr.name}
                        </div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </button>
                )})}
              </div>
            )}
          </div>

          {/* ✅ 스킬 필터 */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <button 
              onClick={() => setIsSkillExpanded(!isSkillExpanded)} 
              className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer"
            >
              <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">SKILL</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isSkillExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            
            {isSkillExpanded && (
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-4 gap-1.5">
                  {SKILL_FILTERS.map(skill => {
                    const isCondGroup = skill.id === "condition_group";
                    const isSelected = isCondGroup ? isAllCondSelected : selectedSkills.includes(skill.id);
                    const opacityClass = !isAnySkillSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                    
                    return (
                      <button key={skill.id} onClick={isCondGroup ? toggleCondSkillGroup : () => toggleFilter(selectedSkills, setSelectedSkills, skill.id)}
                        className={`relative group aspect-square rounded-full p-1 transition-all duration-300 ${
                          isSelected ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"
                        } ${opacityClass}`}>
                        <img src={skill.img} alt={skill.name} className="w-full h-full object-contain" />
                        
                        <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                          <div className="relative flex flex-col items-center">
                            <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 shadow-xl">
                              {skill.name}
                            </div>
                            <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-5 gap-1.5 mt-2">
                  {condSubs.map(sub => {
                    const isSelected = selectedSkills.includes(sub.id);
                    const opacityClass = !isAnySkillSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-white bg-zinc-900";
                    return (
                      <button key={sub.id} onClick={() => toggleFilter(selectedSkills, setSelectedSkills, sub.id)}
                        className={`py-2 px-1 text-[12px] sm:text-[13px] font-medium tracking-tight rounded-lg transition-all duration-300 text-white ${
                          isSelected 
                            ? "bg-zinc-700 scale-105 shadow-md" 
                            : "bg-zinc-900 hover:bg-zinc-800 scale-95 border border-transparent"
                        } ${opacityClass}`}>
                        {sub.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ✅ 캐릭터 필터 */}
          <div className="pt-2">
            <button 
              onClick={() => setIsCharExpanded(!isCharExpanded)} 
              className="w-full flex items-center justify-between group border-t border-white/5 pt-4 pb-2 cursor-pointer"
            >
              <span className="text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">CHARACTER</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isCharExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            
            {isCharExpanded && (
              <div className="space-y-6 pt-3">
                {UNIT_FILTERS.map((unit) => {
                  const isAllSelected = unit.chars.every(c => selectedChars.includes(c.id));
                  const logoOpacityClass = !isAnyCharSelected || isAllSelected ? "opacity-100" : "opacity-40 hover:opacity-100";

                  return (
                  <div key={unit.id} className="flex flex-col gap-2">
                    <button 
                      onClick={() => toggleUnitFilter(unit.chars)} 
                      className={`w-full h-16 py-1 flex items-center justify-center rounded-xl transition-all duration-300 ${
                        isAllSelected ? "bg-[#00FFD1]/15 scale-105" : "bg-transparent hover:bg-white/5 scale-95"
                      } ${logoOpacityClass}`}
                    >
                      <img src={unit.logo} alt={unit.name} className="h-full w-auto object-contain max-w-[90%]" />
                    </button>
                    
                    <div className="grid grid-cols-4 gap-1.5 mt-1">
                      {unit.chars.map(char => {
                        const isSelected = selectedChars.includes(char.id);
                        const charOpacityClass = !isAnyCharSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                        
                        return (
                        <button key={char.id} onClick={() => toggleFilter(selectedChars, setSelectedChars, char.id)}
                          className={`relative aspect-square rounded-full transition-all duration-300 bg-zinc-950 ${
                            isSelected ? "scale-105" : "scale-[0.80] hover:scale-[0.85]"
                          } ${charOpacityClass}`}>
                          <img src={char.img} alt={char.name} className="w-full h-full object-contain" />
                        </button>
                      )})}
                    </div>
                  </div>
                )})}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 🗂️ 우측: 카드 리스트 구역 */}
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
              const isTarget = cardStates[card.id]?.isTarget;
              
              return (
                <div key={card.id} onClick={() => setActiveModalCard(card)} className="relative p-1 cursor-pointer transition-all hover:scale-[1.05] flex flex-col items-center text-center group min-w-0">
                  <img src={showPostAwake ? card.thumbPostPath : card.thumbPrePath} alt="썸네일" 
                    className="h-[100px] w-auto max-w-full object-contain transition-all duration-300 rounded-lg border border-white/10 group-hover:border-white/30" />
                  
                  <p className={`text-[11px] font-semibold mt-2.5 truncate w-full max-w-[100px] transition-colors ${
                    isOwned ? "text-[#00FFD1]" : isTarget ? "text-pink-400" : "text-zinc-200 group-hover:text-white"
                  }`}>
                    {card.cardName}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5 truncate w-full max-w-[100px]">{card.character}</p>
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