// src/app/future/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { FUTURE_EVENTS } from "@/data/events/index";
import { ALL_CARDS } from "@/data/cards";
import FutureEventCard from "@/components/FutureEventCard";
import CardDetailModal from "@/components/CardDetailModal";
import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page"; 

// 🌟 [복구됨] 고급스러운 말풍선 툴팁 공통 CSS 클래스
const TOOLTIP_CLASS = "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-800 text-zinc-100 text-[11px] font-bold rounded-lg shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[60]";

export default function FuturePage() {
  const [cardStates, setCardStates] = useState<Record<string, UserCardState>>({});
  const [activeModalCard, setActiveModalCard] = useState<FinalCardInfo | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const [showPostAwake, setShowPostAwake] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [spinDeg, setSpinDeg] = useState(0);
  const [openYearMarker, setOpenYearMarker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [hideUnmatchedEvents, setHideUnmatchedEvents] = useState(false);

  const [excludeCollab, setExcludeCollab] = useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  const [isEventTypeExpanded, setIsEventTypeExpanded] = useState(true);
  const [isCollabExpanded, setIsCollabExpanded] = useState(true);
  const [isAttrExpanded, setIsAttrExpanded] = useState(true);
  const [isSkillExpanded, setIsSkillExpanded] = useState(true);
  const [isCharExpanded, setIsCharExpanded] = useState(true);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]); 
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedHairs, setSelectedHairs] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const yearRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sekard_user_card_states");
    if (saved) try { setCardStates(JSON.parse(saved)); } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    if (isMobileFilterOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isMobileFilterOpen]);

  const handleUpdateCardState = (id: string, newState: Partial<UserCardState>) => {
    const updated = { 
      ...cardStates, 
      [id]: { ...(cardStates[id] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }), ...newState } 
    };
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

  const handleReset = () => {
    setSpinDeg(prev => prev - 360); 
    setSelectedChars([]); setSelectedAttrs([]); setSelectedSkills([]); 
    setSelectedStatuses([]); setSelectedTypes([]); setSelectedHairs([]); setSelectedEventTypes([]);
    setExcludeCollab(false);
    setSearchQuery(""); 
  };

  const allVsCharIds = UNIT_FILTERS.flatMap(u => u.chars.filter(c => c.isVirtual).map(c => c.id));
  const isAllVsSelected = allVsCharIds.length > 0 && allVsCharIds.every(id => selectedChars.includes(id));

  const toggleAllVirtualSingers = () => {
    if (isAllVsSelected) setSelectedChars(selectedChars.filter(id => !allVsCharIds.includes(id)));
    else setSelectedChars([...new Set([...selectedChars, ...allVsCharIds])]);
  };

  const toggleSpecificVS = (matchKey: string) => {
    const specificIds = UNIT_FILTERS.flatMap(u => u.chars).filter(c => c.isVirtual && c.matchKeys?.includes(matchKey)).map(c => c.id);
    const isAllSpecificSelected = specificIds.length > 0 && specificIds.every(id => selectedChars.includes(id));
    if (isAllSpecificSelected) setSelectedChars(selectedChars.filter(id => !specificIds.includes(id)));
    else setSelectedChars([...new Set([...selectedChars, ...specificIds])]);
  };

  const checkCardMatch = (card: any) => {
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      
      // 🌟 [핵심 해결] 알맹이 데이터(FinalCardInfo 템플릿)를 정확히 타겟팅!
      const targetCard = card.info ? card.info : card;
      
      const getStr = (val: any) => {
        if (val === null || val === undefined) return "";
        if (Array.isArray(val)) return val.join(" ").toLowerCase();
        return String(val).toLowerCase();
      };
      
      const matchName = getStr(targetCard.cardName).includes(q);
      const matchChar = getStr(targetCard.character).includes(q);
      const matchEvent = getStr(targetCard.eventName).includes(q);
      const matchGacha = getStr(targetCard.gachaPoolName).includes(q);
      
      // 🌟 템플릿(FinalCardInfo) 양식에 있는 변수명 그대로 완벽 매칭!
      const matchCostume = getStr(targetCard.costumeName).includes(q) || getStr(targetCard.costume).includes(q);
      const matchSong = getStr(targetCard.releaseSong).includes(q) || getStr(targetCard.relatedSong).includes(q) || getStr(targetCard.song).includes(q);
      const matchSkill = getStr(targetCard.skillName).includes(q) || getStr(targetCard.skillType).includes(q);
      const matchUnit = getStr(targetCard.unit).includes(q);
      const matchSupportUnit = getStr(targetCard.supportUnit).includes(q);
      
      if (!(matchName || matchChar || matchEvent || matchGacha || matchCostume || matchSong || matchSkill || matchUnit || matchSupportUnit)) {
        return false;
      }
    }

    if (excludeCollab && card.gachaType === "콜라보") return false;
    if (selectedStatuses.length > 0) {
      const isOwned = cardStates[card.id]?.isOwned || false;
      const isTarget = cardStates[card.id]?.isTarget || false;
      if (!( (selectedStatuses.includes("owned") && isOwned) || (selectedStatuses.includes("unowned") && !isOwned) || (selectedStatuses.includes("target") && isTarget) )) return false;
    }
    if (selectedTypes.length > 0) {
      const matchNormal = selectedTypes.includes("normal") && card.gachaType === "통상";
      const matchLimited = selectedTypes.includes("limited") && ["한정", "페스", "월링"].includes(card.gachaType);
      let matchCollab = false;
      if (card.gachaType === "콜라보") {
        if (selectedTypes.includes("collab_all")) matchCollab = true;
        else matchCollab = COLLAB_FILTERS.some(collab => selectedTypes.includes(collab.id) && collab.matchKeys.some(key => (card.gachaPoolName + " " + card.eventName + " " + card.cardName).toLowerCase().includes(key.toLowerCase())));
      }
      if (!(matchNormal || matchLimited || matchCollab)) return false;
    }
    if (selectedHairs.length > 0) {
      if (!( (selectedHairs.includes("hair_o") && card.hasHair) || (selectedHairs.includes("hair_x") && !card.hasHair) )) return false;
    }
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
          else if (targetUnitId === "n25" && (cleanUnit.includes("니고") || cleanUnit.includes("25") || cleanUnit === "niigo" || cleanUnit === "ng")) isCorrectUnit = true;
          else if (targetUnitId === "vs" && (cleanUnit.includes("버싱") || cleanUnit.includes("virtual") || cleanUnit === "" || cleanUnit === "vs")) isCorrectUnit = true;
          return isCorrectUnit && charObj.matchKeys.some(key => card.character.includes(key));
        }
        return card.character === charObj.name;
      });
      if (!matchesChar) return false;
    }
    if (selectedAttrs.length > 0) {
      if (!selectedAttrs.some(selId => (card.attribute || "").toLowerCase() === selId || (card.attribute || "").toLowerCase() === ATTR_FILTERS.find(a => a.id === selId)?.name)) return false;
    }
    if (selectedSkills.length > 0) {
      if (!selectedSkills.some(selId => ALL_SKILL_TARGETS.find(t => t.id === selId)?.matchKeys?.includes(card.skillType || ""))) return false;
    }
    return true; 
  };

  const uniqueYears = [...new Set(FUTURE_EVENTS.map(e => e.period.start.split('-')[0]))].sort() as string[];
  
  const getMonthsForYear = (year: string) => {
    const months = FUTURE_EVENTS.filter(e => e.period.start.startsWith(year)).map(e => e.period.start.split('-')[1]);
    return [...new Set(months)].sort() as string[];
  };

  const scrollToYear = (year: string) => {
    const element = yearRefs.current[year];
    if (element) { element.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };
  
  const scrollToMonth = (yearMonth: string) => {
    const element = monthRefs.current[yearMonth];
    if (element) { element.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  if (!mounted) return null;

  const isAnyStatusSelected = selectedStatuses.length > 0;
  const isAnyTypeSelected = selectedTypes.length > 0;
  const isAnyEventTypeSelected = selectedEventTypes.length > 0;
  const isAnyHairSelected = selectedHairs.length > 0;
  const isAnyAttrSelected = selectedAttrs.length > 0;
  const isAnySkillSelected = selectedSkills.length > 0;
  const isAnyCharSelected = selectedChars.length > 0;

  const isFilterActive = isAnyStatusSelected || isAnyTypeSelected || isAnyEventTypeSelected || isAnyHairSelected || isAnyAttrSelected || isAnySkillSelected || isAnyCharSelected || excludeCollab || searchQuery.trim() !== "";

  const condSubs = SKILL_FILTERS.find(s => s.id === "condition_group")?.subs || [];
  const condIds = condSubs.map(s => s.id);
  const isAllCondSelected = condIds.length > 0 && condIds.every(id => selectedSkills.includes(id));
  
  const processedEvents = FUTURE_EVENTS.map(event => {
    let isEventMatched = true;
    let matchedCardIds: string[] = [];
    if (isFilterActive) {
      const passEventType = !isAnyEventTypeSelected || selectedEventTypes.includes(event.eventType || "없음");
      const eventCards = event.gacha.featuredCardIds.map(id => ALL_CARDS.find(c => c.id === id || ((c as any).info && (c as any).info.id === id))).filter(c => c !== undefined) as any[];
      const matchedCards = eventCards.filter(c => checkCardMatch(c));
      matchedCardIds = matchedCards.map(c => (c as any).info ? (c as any).info.id : c.id);
      if (!passEventType || matchedCardIds.length === 0) isEventMatched = false;
    }
    return { event, isEventMatched, matchedCardIds };
  });

  const visibleEvents = hideUnmatchedEvents ? processedEvents.filter(e => e.isEventMatched) : processedEvents;

  const visibleEventsWithGap = visibleEvents.map((item, index) => {
    let gapDays = 0;
    if (index < visibleEvents.length - 1) {
      const d1 = new Date(item.event.period.start.split('.')[0]);
      const d2 = new Date(visibleEvents[index + 1].event.period.start.split('.')[0]);
      gapDays = Math.floor((d2.getTime() - d1.getTime()) / 86400000);
    }
    return { ...item, gapDays };
  });

  let lastRenderedYear = "";
  let lastRenderedMonth = "";

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6 min-h-screen text-zinc-100 max-w-[1920px] mx-auto w-full">
      
      {/* ========================================= */}
      {/* 👈 좌측 영역: 필터칸 (말풍선 복구!) */}
      {/* ========================================= */}
      <div className={`flex flex-col shrink-0 md:w-[280px] md:relative md:block md:bg-transparent md:p-0 md:h-auto md:z-0 ${isMobileFilterOpen ? 'fixed inset-0 z-[100] bg-zinc-950 p-6 overflow-y-auto' : 'hidden'}`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 md:mb-0">
          <h2 className="text-lg md:text-sm font-bold text-zinc-300 tracking-wider uppercase">🔍 미래시 필터</h2>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm md:text-sm shadow-sm" title="필터 초기화">
              <span className="leading-none -mt-[1px] inline-block" style={{ transform: `rotate(${spinDeg}deg)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>↺</span>
            </button>
            <button onClick={() => setIsMobileFilterOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-white font-bold">✕</button>
          </div>
        </div>

        <div className="space-y-6 md:mt-6">
          <div className="space-y-2">
            <button onClick={() => setIsStatusExpanded(!isStatusExpanded)} className="w-full flex items-center justify-between group pb-1 cursor-pointer">
              <span className="text-[12px] md:text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">STATUS & TYPE</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isStatusExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            {isStatusExpanded && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-3 gap-1.5">
                  {[ { id: "owned", label: "✓ 보유" }, { id: "unowned", label: "❌ 미보유" }, { id: "target", label: "⭐ 목표" } ].map(status => {
                    const isSelected = selectedStatuses.includes(status.id);
                    const opacityClass = !isAnyStatusSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-white bg-zinc-900";
                    const activeClass = status.id === "target" ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.15)] scale-105" : status.id === "owned" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.15)] scale-105" : "bg-zinc-700 text-zinc-100 border border-zinc-500 shadow-md scale-105";
                    return (
                      <button key={status.id} onClick={() => toggleFilter(selectedStatuses, setSelectedStatuses, status.id)}
                        className={`py-2.5 md:py-2 px-1 text-[13px] md:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 text-white ${isSelected ? activeClass : "bg-zinc-900 hover:bg-zinc-800 border border-transparent scale-95"} ${opacityClass}`}>
                        {status.label}
                      </button>
                    )
                  })}
                </div>
                {/* 🌟 통상/한정/헤어 아이콘 말풍선 복구 */}
                <div className="grid grid-cols-4 gap-1.5">
                  <button onClick={() => toggleFilter(selectedTypes, setSelectedTypes, "normal")}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${selectedTypes.includes("normal") ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"} ${!isAnyTypeSelected || selectedTypes.includes("normal") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/normal.png" alt="통상" className="w-full h-full object-contain" />
                    <span className={TOOLTIP_CLASS}>통상</span>
                  </button>
                  <button onClick={() => toggleFilter(selectedTypes, setSelectedTypes, "limited")}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${selectedTypes.includes("limited") ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"} ${!isAnyTypeSelected || selectedTypes.includes("limited") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/limited.png" alt="한정" className="w-full h-full object-contain" />
                    <span className={TOOLTIP_CLASS}>한정/페스/월링</span>
                  </button>
                  <button onClick={() => toggleFilter(selectedHairs, setSelectedHairs, "hair_o")}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${selectedHairs.includes("hair_o") ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"} ${!isAnyHairSelected || selectedHairs.includes("hair_o") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/hair_o.png" alt="헤어 O" className="w-full h-full object-contain" />
                    <span className={TOOLTIP_CLASS}>헤어 개방 가능</span>
                  </button>
                  <button onClick={() => toggleFilter(selectedHairs, setSelectedHairs, "hair_x")}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full ${selectedHairs.includes("hair_x") ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"} ${!isAnyHairSelected || selectedHairs.includes("hair_x") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/hair_x.png" alt="헤어 X" className="w-full h-full object-contain" />
                    <span className={TOOLTIP_CLASS}>헤어 없음</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* EVENT TYPE */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <button onClick={() => setIsEventTypeExpanded(!isEventTypeExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
              <span className="text-[12px] md:text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">EVENT TYPE</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isEventTypeExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            {isEventTypeExpanded && (
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[ { id: "하코", name: "하코", color: "rose" }, { id: "혼합", name: "혼합", color: "indigo" }, { id: "월링", name: "월링", color: "emerald" } ].map(type => {
                  const isSelected = selectedEventTypes.includes(type.id);
                  const opacityClass = !isAnyEventTypeSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-white bg-zinc-900";
                  return (
                    <button key={type.id} onClick={() => toggleFilter(selectedEventTypes, setSelectedEventTypes, type.id)}
                      className={`py-2.5 md:py-2 px-1 text-[13px] md:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 text-white ${isSelected ? `bg-${type.color}-500/20 text-${type.color}-300 border border-${type.color}-400/50 shadow-md scale-105` : "bg-zinc-900 hover:bg-zinc-800 border border-transparent scale-95"} ${opacityClass}`}>
                      {type.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <button onClick={() => setIsCollabExpanded(!isCollabExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
              <span className="text-[12px] md:text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">COLLAB</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isCollabExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            {isCollabExpanded && (
              <div className="space-y-2 pt-1">
                <button 
                  onClick={() => {
                    const allCollabIds = COLLAB_FILTERS.map(c => c.id);
                    const isAllCollab = selectedTypes.includes("collab_all") || allCollabIds.every(id => selectedTypes.includes(id));
                    if (isAllCollab) setSelectedTypes(selectedTypes.filter(id => id !== "collab_all" && !allCollabIds.includes(id)));
                    else setSelectedTypes([...new Set([...selectedTypes, "collab_all", ...allCollabIds])]);
                  }}
                  className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 border ${
                    (selectedTypes.includes("collab_all") || COLLAB_FILTERS.every(c => selectedTypes.includes(c.id)))
                      ? "bg-amber-500/20 text-amber-300 border-amber-400/30 shadow-md scale-100" 
                      : "bg-zinc-900/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  🤝 콜라보 일괄 선택
                </button>
                <div className="grid grid-cols-4 gap-1.5">
                  {COLLAB_FILTERS.map(collab => {
                    const isSelected = selectedTypes.includes(collab.id) || selectedTypes.includes("collab_all");
                    const opacityClass = !isAnyTypeSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-white bg-zinc-900";
                    return (
                      <button key={collab.id} onClick={() => {
                        let nextSelected = [...selectedTypes];
                        if (nextSelected.includes(collab.id)) nextSelected = nextSelected.filter(id => id !== collab.id && id !== "collab_all");
                        else nextSelected.push(collab.id);
                        setSelectedTypes(nextSelected);
                      }}
                        className={`py-2.5 md:py-2 px-1 text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 text-white ${isSelected ? "bg-amber-500/20 text-amber-300 shadow-md border border-amber-500/30 scale-105" : "bg-zinc-900 hover:bg-zinc-800 border border-transparent scale-95"} ${opacityClass}`}>
                        {collab.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <button onClick={() => setIsAttrExpanded(!isAttrExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
              <span className="text-[12px] md:text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">ATTRIBUTE</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isAttrExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            {isAttrExpanded && (
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {/* 🌟 속성 아이콘 말풍선 복구 */}
                {ATTR_FILTERS.map(attr => {
                  const isSelected = selectedAttrs.includes(attr.id);
                  const opacityClass = !isAnyAttrSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                  return (
                  <button key={attr.id} onClick={() => toggleFilter(selectedAttrs, setSelectedAttrs, attr.id)} 
                    className={`relative group aspect-square rounded-full transition-all duration-300 ${isSelected ? "scale-105" : "scale-[0.85] hover:scale-95"} ${opacityClass}`}>
                    <img src={attr.img} alt={attr.name} className="w-full h-full object-contain" />
                    <span className={TOOLTIP_CLASS}>{attr.name}</span>
                  </button>
                )})}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <button onClick={() => setIsSkillExpanded(!isSkillExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
              <span className="text-[12px] md:text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">SKILL</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isSkillExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            {isSkillExpanded && (
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-4 gap-1.5">
                  {/* 🌟 스킬 아이콘 말풍선 복구 */}
                  {SKILL_FILTERS.map(skill => {
                    const isCondGroup = skill.id === "condition_group";
                    const isSelected = isCondGroup ? isAllCondSelected : selectedSkills.includes(skill.id);
                    const opacityClass = !isAnySkillSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                    return (
                      <button key={skill.id} onClick={isCondGroup ? toggleCondSkillGroup : () => toggleFilter(selectedSkills, setSelectedSkills, skill.id)}
                        className={`relative group aspect-square rounded-full p-1 transition-all duration-300 ${isSelected ? "bg-zinc-800 scale-105" : "bg-zinc-900 scale-[0.85] hover:scale-95"} ${opacityClass}`}>
                        <img src={skill.img} alt={skill.name} className="w-full h-full object-contain" />
                        <span className={TOOLTIP_CLASS}>{skill.name}</span>
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
                        className={`py-2.5 md:py-2 px-1 text-[12px] font-medium tracking-tight rounded-lg transition-all duration-300 text-white ${isSelected ? "bg-zinc-700 scale-105 shadow-md border border-white/20" : "bg-zinc-900 hover:bg-zinc-800 scale-95 border border-transparent"} ${opacityClass}`}>
                        {sub.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 pb-10 md:pb-0">
            <button onClick={() => setIsCharExpanded(!isCharExpanded)} className="w-full flex items-center justify-between group border-t border-white/5 pt-4 pb-2 cursor-pointer">
              <span className="text-[12px] md:text-[11px] font-bold text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-300 transition-colors">CHARACTER</span>
              <span className={`text-[10px] text-zinc-500 transform transition-transform duration-300 ${isCharExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
            </button>
            {isCharExpanded && (
              <div className="space-y-6 pt-3">
                <div className="bg-zinc-900/50 p-2 rounded-2xl border border-white/5">
                  <button 
                    onClick={toggleAllVirtualSingers}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12px] font-bold transition-all duration-300 border ${
                      isAllVsSelected ? "bg-[#00FFD1]/15 text-[#00FFD1] border-[#00FFD1]/30 shadow-[0_0_10px_rgba(0,255,209,0.1)] scale-100" : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    }`}
                  >
                    <span>🎙️</span>
                    <span>버추얼 싱어 일괄 선택</span>
                  </button>

                  <div className="grid grid-cols-3 gap-1.5 mt-2">
                    {[
                      { label: "미쿠", key: "미쿠", activeClass: "bg-teal-500/20 text-teal-300 border-teal-400/30 shadow-[0_0_6px_rgba(45,212,191,0.2)] scale-100" },
                      { label: "린", key: "린", activeClass: "bg-amber-500/20 text-amber-300 border-amber-400/30 shadow-[0_0_6px_rgba(251,191,36,0.2)] scale-100" },
                      { label: "렌", key: "렌", activeClass: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30 shadow-[0_0_6px_rgba(250,204,21,0.2)] scale-100" },
                      { label: "루카", key: "루카", activeClass: "bg-pink-500/20 text-pink-300 border-pink-400/30 shadow-[0_0_6px_rgba(244,114,182,0.2)] scale-100" },
                      { label: "MEIKO", key: "MEIKO", activeClass: "bg-red-500/20 text-red-400 border-red-400/30 shadow-[0_0_6px_rgba(248,113,113,0.2)] scale-100" },
                      { label: "KAITO", key: "KAITO", activeClass: "bg-blue-500/20 text-blue-300 border-blue-400/30 shadow-[0_0_6px_rgba(96,165,250,0.2)] scale-100" }
                    ].map(vs => {
                      const specificIds = UNIT_FILTERS.flatMap(u => u.chars).filter(c => c.isVirtual && c.matchKeys?.includes(vs.key)).map(c => c.id);
                      const isAllSpecificSelected = specificIds.length > 0 && specificIds.every(id => selectedChars.includes(id));
                      return (
                        <button 
                          key={vs.key}
                          onClick={() => toggleSpecificVS(vs.key)}
                          className={`py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 border ${isAllSpecificSelected ? vs.activeClass : "bg-zinc-900/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"}`}
                        >
                          {vs.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {UNIT_FILTERS.map((unit) => {
                  const isAllSelected = unit.chars.every(c => selectedChars.includes(c.id));
                  const logoOpacityClass = !isAnyCharSelected || isAllSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                  return (
                  <div key={unit.id} className="flex flex-col gap-2">
                    <button onClick={() => toggleUnitFilter(unit.chars)} className={`w-full h-16 py-1 flex items-center justify-center rounded-xl transition-all duration-300 ${isAllSelected ? "bg-[#00FFD1]/15 scale-105" : "bg-transparent hover:bg-white/5 scale-95"} ${logoOpacityClass}`}>
                      <img src={unit.logo} alt={unit.name} className="h-full w-auto object-contain max-w-[90%]" />
                    </button>
                    <div className="grid grid-cols-4 gap-1.5 mt-1">
                      {/* 🌟 캐릭터 아이콘 말풍선 복구 */}
                      {unit.chars.map(char => {
                        const isSelected = selectedChars.includes(char.id);
                        const charOpacityClass = !isAnyCharSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                        return (
                        <button key={char.id} onClick={() => toggleFilter(selectedChars, setSelectedChars, char.id)}
                          className={`relative group aspect-square rounded-full transition-all duration-300 bg-zinc-950 ${isSelected ? "scale-105" : "scale-[0.80] hover:scale-[0.85]"} ${charOpacityClass}`}>
                          <img src={char.img} alt={char.name} className="w-full h-full object-contain" />
                          <span className={TOOLTIP_CLASS}>{char.name}</span>
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

      {/* ========================================= */}
      {/* 👉 우측 영역: 미래시 타임라인 본문 */}
      {/* ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/30 rounded-3xl p-4 md:p-6 border border-white/5 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 relative z-40">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white mb-2">📅 미래시 타임라인</h1>
            
            <div className="flex flex-wrap gap-2 mt-1 mb-2">
              {uniqueYears.map(year => (
                <button
                  key={year}
                  onClick={() => scrollToYear(year)}
                  className="px-3 py-1 bg-zinc-800 border border-white/10 hover:bg-white hover:text-black text-zinc-300 text-[11px] font-bold rounded-md transition-all shadow-sm"
                >
                  {year}년
                </button>
              ))}
            </div>

            <p className="text-xs text-zinc-400 mt-2">앞으로 다가올 가챠 일정과 픽업 멤버를 확인해보세요.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto relative w-full sm:w-auto">
            <button onClick={() => setIsMobileFilterOpen(true)} className="md:hidden flex items-center justify-center gap-1.5 h-[34px] px-3 rounded-full bg-zinc-800/80 border border-white/10 text-[12px] font-bold text-zinc-300 hover:text-white transition-colors shadow-sm">
              🔍 필터
            </button>

            <button 
              onClick={() => setHideUnmatchedEvents(!hideUnmatchedEvents)}
              className={`hidden sm:flex items-center justify-center h-[34px] rounded-full text-[12px] font-bold transition-all shadow-sm border ${
                hideUnmatchedEvents ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/50 w-[34px] px-0' : 'bg-zinc-800/80 border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 px-3 gap-1.5'
              }`}
              title="비활성 배너 숨기기"
            >
              {hideUnmatchedEvents ? '👻' : '👻 비활성 배너 숨기기'}
            </button>
            <button onClick={() => setHideUnmatchedEvents(!hideUnmatchedEvents)} className={`sm:hidden flex items-center justify-center w-[34px] h-[34px] rounded-full text-[14px] transition-all shadow-sm border ${hideUnmatchedEvents ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/50' : 'bg-zinc-800/80 border-white/10 text-zinc-400'}`}>
              👻
            </button>

            <div className="relative flex items-center w-full sm:w-40 lg:w-56">
              <span className="absolute left-3 text-zinc-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="카드명, 의상, 악곡, 배너 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[34px] bg-zinc-800/80 border border-white/10 text-white text-xs rounded-full pl-8 pr-8 focus:outline-none focus:border-sky-500 transition-all shadow-sm placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 text-zinc-400 hover:text-white text-xs font-bold">✕</button>
              )}
            </div>

            <button onClick={() => setExcludeCollab(!excludeCollab)} className={`hidden sm:flex items-center gap-1.5 h-[34px] px-3 rounded-full text-[12px] font-bold transition-all shadow-sm border ${excludeCollab ? 'bg-red-500/20 text-red-300 border-red-400/50' : 'bg-zinc-800/80 border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700'}`}>
              {excludeCollab ? '🚫 콜라보 제외' : '🤝 콜라보 포함'}
            </button>
            <button onClick={() => setShowPostAwake(!showPostAwake)} className="p-1 rounded-full bg-zinc-900 border border-white/10 shrink-0 ml-auto sm:ml-0" aria-label="썸네일 전환">
              <img src={showPostAwake ? "/icons/post_star.png" : "/icons/pre_star.png"} alt="스위치" className="h-8 w-auto object-contain block" />
            </button>
          </div>
        </div>

        <div className="relative pt-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 pb-20">
            {visibleEventsWithGap.map(({ event, isEventMatched, matchedCardIds, gapDays }, index) => {
              
              const eventYear = event.period.start.split('-')[0];
              const eventMonth = event.period.start.split('-')[1];
              const eventYearMonth = `${eventYear}-${eventMonth}`;

              const showYearMarker = eventYear !== lastRenderedYear;
              if (showYearMarker) lastRenderedYear = eventYear;

              const showMonthMarker = eventYearMonth !== lastRenderedMonth;
              if (showMonthMarker) lastRenderedMonth = eventYearMonth;

              return (
                <div key={event.id} className="relative animate-fade-in">
                  
                  {showYearMarker && (
                    <div ref={(el) => { yearRefs.current[eventYear] = el; monthRefs.current[eventYearMonth] = el; }} className="flex justify-center my-10 relative z-30 scroll-mt-24">
                      <div className="relative flex items-center justify-center">
                        
                        <div className={`absolute right-full top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 ease-in-out origin-right overflow-hidden mr-2 ${openYearMarker === eventYear ? 'max-w-[500px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
                          <div className="flex bg-zinc-800 border border-white/20 rounded-sm shadow-lg overflow-hidden shrink-0">
                             {getMonthsForYear(eventYear).map(month => (
                               <button key={month} onClick={() => { scrollToMonth(`${eventYear}-${month}`); setOpenYearMarker(null); }} className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 hover:bg-white hover:text-black transition-colors border-r border-white/10 last:border-0 whitespace-nowrap">
                                 {month}월
                               </button>
                             ))}
                          </div>
                        </div>

                        <button onClick={() => setOpenYearMarker(openYearMarker === eventYear ? null : eventYear)} className="bg-white text-zinc-950 font-black px-5 py-1.5 rounded-sm text-sm shadow-xl tracking-widest z-20 hover:bg-zinc-200 transition-colors flex items-center gap-1.5">
                          {openYearMarker === eventYear ? '◀' : '▶'} {eventYear} {openYearMarker === eventYear ? '▶' : '◀'}
                        </button>

                        <div className={`absolute left-full top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 ease-in-out origin-left overflow-hidden ml-2 ${openYearMarker === eventYear ? 'max-w-[500px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
                          <div className="flex bg-zinc-800 border border-white/20 rounded-sm shadow-lg overflow-hidden shrink-0">
                             {uniqueYears.filter(y => y !== eventYear).map(year => (
                               <button key={year} onClick={() => { scrollToYear(year); setOpenYearMarker(null); }} className="px-4 py-1.5 text-[12px] font-bold text-white hover:bg-white hover:text-black transition-colors border-r border-white/10 last:border-0 whitespace-nowrap">
                                 {year}년
                               </button>
                             ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {showMonthMarker && !showYearMarker && (
                     <div ref={el => { monthRefs.current[eventYearMonth] = el; }} className="flex justify-center my-6 relative z-30 scroll-mt-24">
                        <span className="bg-zinc-800 text-zinc-400 text-[10px] px-3 py-1 rounded-full border border-white/10 shadow-md">
                          {eventMonth}월
                        </span>
                     </div>
                  )}

                  <FutureEventCard 
                    event={event} 
                    index={index} 
                    userStates={cardStates} 
                    onCardClick={setActiveModalCard} 
                    showPostAwake={showPostAwake}
                    isFilterActive={isFilterActive}
                    isEventMatched={isEventMatched}
                    matchedCardIds={matchedCardIds}
                  />

                  {hideUnmatchedEvents && gapDays > 0 && (
                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                       <span className="bg-zinc-900 text-zinc-400 text-[10px] px-3 py-0.5 rounded-full border border-white/10 font-bold whitespace-nowrap shadow-sm">
                         ⏳ {gapDays}일 후
                       </span>
                     </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CardDetailModal card={activeModalCard} userState={cardStates[activeModalCard?.id || ""] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }} onUpdateState={handleUpdateCardState} onClose={() => setActiveModalCard(null)} />
    </div>
  );
}

// (이하 필터 배열 데이터는 완벽히 동일합니다!)
type CharDef = { id: string; name: string; img: string; isVirtual?: boolean; matchKeys?: string[] };
type UnitDef = { id: string; name: string; logo: string; chars: CharDef[] };
type AttrDef = { id: string; name: string; img: string };
type SubSkillDef = { id: string; name: string; matchKeys: string[] };
type SkillDef = { id: string; name: string; img: string; matchKeys?: string[]; subs?: SubSkillDef[] };
type TypeFilterDef = { id: string; name: string; img?: string; isText?: boolean };
type HairFilterDef = { id: string; name: string; img: string };

const UNIT_FILTERS: UnitDef[] = [
  { id: "vs", name: "무소속 / VIRTUAL SINGER", logo: "/icons/VS.png", chars: [ { id: "miku_0", name: "하츠네 미쿠", img: "/icons/characters/MIKU_0.png", isVirtual: true, matchKeys: ["미쿠"] }, { id: "rin_0", name: "카가미네 린", img: "/icons/characters/RIN_0.png", isVirtual: true, matchKeys: ["린"] }, { id: "len_0", name: "카가미네 렌", img: "/icons/characters/LEN_0.png", isVirtual: true, matchKeys: ["렌"] }, { id: "luka_0", name: "메구리네 루카", img: "/icons/characters/LUKA_0.png", isVirtual: true, matchKeys: ["루카"] }, { id: "meiko_0", name: "MEIKO", img: "/icons/characters/MEIKO_0.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] }, { id: "kaito_0", name: "KAITO", img: "/icons/characters/KAITO_0.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] } ] },
  { id: "ln", name: "Leo/need", logo: "/icons/Leoneed.png", chars: [ { id: "ichika", name: "호시노 이치카", img: "/icons/characters/Ichika.png" }, { id: "saki", name: "텐마 사키", img: "/icons/characters/Saki.png" }, { id: "honami", name: "모치즈키 호나미", img: "/icons/characters/Honami.png" }, { id: "shiho", name: "히노모리 시호", img: "/icons/characters/Shiho.png" }, { id: "miku_l", name: "하츠네 미쿠", img: "/icons/characters/MIKU_l.png", isVirtual: true, matchKeys: ["미쿠"] }, { id: "rin_l", name: "카가미네 린", img: "/icons/characters/RIN_l.png", isVirtual: true, matchKeys: ["린"] }, { id: "len_l", name: "카가미네 렌", img: "/icons/characters/LEN_l.png", isVirtual: true, matchKeys: ["렌"] }, { id: "luka_l", name: "메구리네 루카", img: "/icons/characters/LUKA_l.png", isVirtual: true, matchKeys: ["루카"] }, { id: "meiko_l", name: "MEIKO", img: "/icons/characters/MEIKO_l.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] }, { id: "kaito_l", name: "KAITO", img: "/icons/characters/KAITO_l.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] } ] },
  { id: "mmj", name: "MORE MORE JUMP!", logo: "/icons/MMJ.png", chars: [ { id: "minori", name: "하나사토 미노리", img: "/icons/characters/Minori.png" }, { id: "haruka", name: "키리타니 하루카", img: "/icons/characters/Haruka.png" }, { id: "airi", name: "모모이 아이리", img: "/icons/characters/Airi.png" }, { id: "shizuku", name: "히노모리 시즈쿠", img: "/icons/characters/Shizuku.png" }, { id: "miku_m", name: "하츠네 미쿠", img: "/icons/characters/MIKU_m.png", isVirtual: true, matchKeys: ["미쿠"] }, { id: "rin_m", name: "카가미네 린", img: "/icons/characters/RIN_m.png", isVirtual: true, matchKeys: ["린"] }, { id: "len_m", name: "카가미네 렌", img: "/icons/characters/LEN_m.png", isVirtual: true, matchKeys: ["렌"] }, { id: "luka_m", name: "메구리네 루카", img: "/icons/characters/LUKA_m.png", isVirtual: true, matchKeys: ["루카"] }, { id: "meiko_m", name: "MEIKO", img: "/icons/characters/MEIKO_m.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] }, { id: "kaito_m", name: "KAITO", img: "/icons/characters/KAITO_m.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] } ] },
  { id: "vbs", name: "Vivid BAD SQUAD", logo: "/icons/VBS.png", chars: [ { id: "kohane", name: "아즈사와 코하네", img: "/icons/characters/Kohane.png" }, { id: "an", name: "시라이시 안", img: "/icons/characters/An.png" }, { id: "akito", name: "시노노메 아키토", img: "/icons/characters/Akito.png" }, { id: "toya", name: "아오야기 토우야", img: "/icons/characters/Toya.png" }, { id: "miku_v", name: "하츠네 미쿠", img: "/icons/characters/MIKU_v.png", isVirtual: true, matchKeys: ["미쿠"] }, { id: "rin_v", name: "카가미네 린", img: "/icons/characters/RIN_v.png", isVirtual: true, matchKeys: ["린"] }, { id: "len_v", name: "카가미네 렌", img: "/icons/characters/LEN_v.png", isVirtual: true, matchKeys: ["렌"] }, { id: "luka_v", name: "메구리네 루카", img: "/icons/characters/LUKA_v.png", isVirtual: true, matchKeys: ["루카"] }, { id: "meiko_v", name: "MEIKO", img: "/icons/characters/MEIKO_v.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] }, { id: "kaito_v", name: "KAITO", img: "/icons/characters/KAITO_v.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] } ] },
  { id: "wxs", name: "Wonderlands×Showtime", logo: "/icons/Wds.png", chars: [ { id: "tsukasa", name: "텐마 츠카사", img: "/icons/characters/Tsukasa.png" }, { id: "emu", name: "오토리 에무", img: "/icons/characters/Emu.png" }, { id: "nene", name: "쿠사나기 네네", img: "/icons/characters/Nene.png" }, { id: "rui", name: "카미시로 루이", img: "/icons/characters/Rui.png" }, { id: "miku_w", name: "하츠네 미쿠", img: "/icons/characters/MIKU_w.png", isVirtual: true, matchKeys: ["미쿠"] }, { id: "rin_w", name: "카가미네 린", img: "/icons/characters/RIN_w.png", isVirtual: true, matchKeys: ["린"] }, { id: "len_w", name: "카가미네 렌", img: "/icons/characters/LEN_w.png", isVirtual: true, matchKeys: ["렌"] }, { id: "luka_w", name: "메구리네 루카", img: "/icons/characters/LUKA_w.png", isVirtual: true, matchKeys: ["루카"] }, { id: "meiko_w", name: "MEIKO", img: "/icons/characters/MEIKO_w.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] }, { id: "kaito_w", name: "KAITO", img: "/icons/characters/KAITO_w.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] } ] },
  { id: "n25", name: "25시, 나이트코드에서.", logo: "/icons/Niigo.png", chars: [ { id: "kanade", name: "요이사키 카나데", img: "/icons/characters/Kanade.png" }, { id: "mafuyu", name: "아사히나 마후유", img: "/icons/characters/Mafuyu.png" }, { id: "ena", name: "시노노메 에나", img: "/icons/characters/Ena.png" }, { id: "mizuki", name: "아키야마 미즈키", img: "/icons/characters/Mizuki.png" }, { id: "miku_n", name: "하츠네 미쿠", img: "/icons/characters/MIKU_n.png", isVirtual: true, matchKeys: ["미쿠"] }, { id: "rin_n", name: "카가미네 린", img: "/icons/characters/RIN_n.png", isVirtual: true, matchKeys: ["린"] }, { id: "len_n", name: "카가미네 렌", img: "/icons/characters/LEN_n.png", isVirtual: true, matchKeys: ["렌"] }, { id: "luka_n", name: "메구리네 루카", img: "/icons/characters/LUKA_n.png", isVirtual: true, matchKeys: ["루카"] }, { id: "meiko_n", name: "MEIKO", img: "/icons/characters/MEIKO_n.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] }, { id: "kaito_n", name: "KAITO", img: "/icons/characters/KAITO_n.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] } ] }
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
    subs: [ { id: "cond_perfect", name: "퍼스업", matchKeys: ["퍼스업"] }, { id: "cond_good", name: "굿스업", matchKeys: ["굿스업"] }, { id: "cond_life", name: "체스업", matchKeys: ["체스업"] }, { id: "cond_bp", name: "블페", matchKeys: ["블페", "블룸페스"] }, { id: "cond_team", name: "팀스업", matchKeys: ["팀스업"] } ] 
  },
  { id: "perfect", name: "판정 강화", img: "/icons/skills/perfect_x.png", matchKeys: ["판강"] },
  { id: "heal", name: "라이프 회복", img: "/icons/skills/heal_x.png", matchKeys: ["힐"] }
];

const ALL_SKILL_TARGETS = [
  ...SKILL_FILTERS.filter(s => s.matchKeys),
  ...(SKILL_FILTERS.find(s => s.id === "condition_group")?.subs || [])
];

const TYPE_FILTERS: TypeFilterDef[] = [
  { id: "normal", name: "통상", img: "/icons/status/normal.png" },
  { id: "limited", name: "한정/페스/월링", img: "/icons/status/limited.png" },
  { id: "collab", name: "콜라보", isText: true }
];

const HAIR_FILTERS: HairFilterDef[] = [
  { id: "hair_o", name: "헤어 O", img: "/icons/status/hair_o.png" },
  { id: "hair_x", name: "헤어 X", img: "/icons/status/hair_x.png" }
];

const COLLAB_FILTERS = [
  { id: "collab_evil", name: "에빌", matchKeys: ["에빌", "죄의 회고록", "evillious"] },
  { id: "collab_sanrio", name: "산리오", matchKeys: ["산리오", "sanrio", "SEKAI에서 Hello♡ 멋진 만남"] },
  { id: "collab_enstar", name: "앙스타", matchKeys: ["앙스타", "앙상블", "ensemble"] },
  { id: "collab_tamagotchi", name: "다마고치", matchKeys: ["다마고치", "tamagotchi"] },
  { id: "collab_touhou", name: "동방", matchKeys: ["뒤섞이는 경계", "동방"] },
  { id: "collab_movie", name: "극장판", matchKeys: ["창의 세카이에서", "극장판"] }
];