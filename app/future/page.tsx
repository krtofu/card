"use client";

import { useState, useEffect, useRef } from "react";
import { FUTURE_EVENTS } from "@/data/events/index";
import { ALL_CARDS } from "@/data/cards";
import FutureEventCard from "@/components/FutureEventCard";
import CardDetailModal from "@/components/CardDetailModal";
import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page"; 
import { useThemeColor } from "@/app/providers";

// 🌟 PC에서는 호버, 모바일에서는 터치 상태(activeFilterTooltip)일 때만 표시되도록 제어 클래스 분리!
const getTooltipClass = (isActive: boolean) => `absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 text-[11px] font-bold rounded-lg shadow-xl border border-zinc-200 dark:border-white/10 transition-opacity pointer-events-none whitespace-nowrap z-[60] ${isActive ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`;

// 🌟 [추가] 모바일 타임라인 연결선에 쓸 유닛 로고 호출기!
const getUnitLogo = (unitName?: string) => {
  if (!unitName) return null;
  const u = unitName.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  if (u.includes("leo") || u.includes("레오니")) return "/icons/Leoneed_icon.png";
  if (u.includes("more") || u.includes("모모점")) return "/icons/MMJ_icon.png";
  if (u.includes("vivid") || u.includes("비배스")) return "/icons/VBS_icon.png";
  if (u.includes("wonder") || u.includes("원더쇼")) return "/icons/Wds_icon.png";
  if (u.includes("25") || u.includes("니고")) return "/icons/Niigo_icon.png";
  if (u.includes("virtual") || u.includes("버싱")) return "/icons/VS_icon.png";
  return null;
};

export default function FuturePage() {
  const { themeColor } = useThemeColor(); 

  const [cardStates, setCardStates] = useState<Record<string, UserCardState>>({});
  const [activeModalCard, setActiveModalCard] = useState<FinalCardInfo | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const [showPostAwake, setShowPostAwake] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);
  const [spinDeg, setSpinDeg] = useState(0);
  const [openYearMarker, setOpenYearMarker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeYear, setActiveYear] = useState<string>(""); // 🌟 현재 스크롤 위치의 연도를 기억할 녀석!

  const [hideUnmatchedEvents, setHideUnmatchedEvents] = useState(false);
  const [excludeCollab, setExcludeCollab] = useState(false);
  
  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  const [isGachaTypeExpanded, setIsGachaTypeExpanded] = useState(true);
  const [isEventTypeExpanded, setIsEventTypeExpanded] = useState(true);
  const [isCollabExpanded, setIsCollabExpanded] = useState(true);
  const [isAttrExpanded, setIsAttrExpanded] = useState(true);
  const [isSkillExpanded, setIsSkillExpanded] = useState(true);
  const [isCharExpanded, setIsCharExpanded] = useState(true);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]); 
  const [selectedGachaTypes, setSelectedGachaTypes] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedHairs, setSelectedHairs] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeFilterTooltip, setActiveFilterTooltip] = useState<string | null>(null); // 🌟 필터 아이콘 터치 토글용 상태!

  const yearRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const checkAndSend = () => {
      const isVisible = window.innerWidth < 768 ? isMobileFilterOpen : isDesktopFilterOpen;
      window.dispatchEvent(new CustomEvent("sekard_filter_state", { detail: isVisible }));
    };
    checkAndSend();
    window.addEventListener("resize", checkAndSend);
    return () => window.removeEventListener("resize", checkAndSend);
  }, [isMobileFilterOpen, isDesktopFilterOpen]);

  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) setIsMobileFilterOpen(true);
      else setIsDesktopFilterOpen(true);
    };
    window.addEventListener("toggle_sekard_filter", handleToggle);
    return () => window.removeEventListener("toggle_sekard_filter", handleToggle);
  }, []);

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

  // 🌟 스크롤스파이 (Scrollspy) 감지 로직
  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute("data-year");
            if (year) setActiveYear(year);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" } // 화면 상단을 지날 때 더 민감하게 켜지도록 조정!
    );

    const timeout = setTimeout(() => {
      Object.values(yearRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [mounted, searchQuery, hideUnmatchedEvents, isMobileFilterOpen]);

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
    setSelectedStatuses([]); setSelectedTypes([]); setSelectedHairs([]); 
    setSelectedEventTypes([]); setSelectedGachaTypes([]); 
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

  const checkCardMatch = (card: any, currentEvent: any) => {
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim().replace("년", "");
      const getStr = (val: any) => {
        if (val === null || val === undefined) return "";
        if (Array.isArray(val)) return val.join(" ").toLowerCase();
        return String(val).toLowerCase();
      };
      
      // 🌟 날짜 데이터 형식(2023-01-05 등)에서 하이픈을 빼고 순수 문자열로 만들어 검색 유연성을 확보합니다!
      const cleanEventDate = getStr(currentEvent?.period?.start).replace(/[^0-9]/g, "");
      const matchYear = cleanEventDate.includes(q) || getStr(currentEvent?.period?.start).includes(q);
      const matchName = getStr(card.cardName).includes(q);
      const matchChar = getStr(card.character).includes(q);
      const matchEvent = getStr(card.eventName).includes(q);
      const matchGacha = getStr(card.gachaPoolName).includes(q);
      const matchCostume = getStr(card.costume?.name).includes(q); 
      const matchSong = getStr(card.songName).includes(q);        
      const matchSkill = getStr(card.skillType).includes(q);       
      const matchUnit = getStr(card.unit).includes(q);             
      const matchGachaType = getStr(card.gachaType).includes(q);
      const matchAttribute = getStr(card.attribute).includes(q);
      
      if (!(matchYear || matchName || matchChar || matchEvent || matchGacha || matchCostume || matchSong || matchSkill || matchUnit || matchGachaType || matchAttribute)) {
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
  const isAnyGachaTypeSelected = selectedGachaTypes.length > 0;
  const isAnyHairSelected = selectedHairs.length > 0;
  const isAnyAttrSelected = selectedAttrs.length > 0;
  const isAnySkillSelected = selectedSkills.length > 0;
  const isAnyCharSelected = selectedChars.length > 0;

  const isFilterActive = isAnyStatusSelected || isAnyTypeSelected || isAnyEventTypeSelected || isAnyGachaTypeSelected || isAnyHairSelected || isAnyAttrSelected || isAnySkillSelected || isAnyCharSelected || excludeCollab || searchQuery.trim() !== "";

  const condSubs = SKILL_FILTERS.find(s => s.id === "condition_group")?.subs || [];
  const condIds = condSubs.map(s => s.id);
  const isAllCondSelected = condIds.length > 0 && condIds.every(id => selectedSkills.includes(id));
  
  const processedEvents = FUTURE_EVENTS.map(event => {
    let isEventMatched = true;
    let matchedCardIds: string[] = [];
    if (isFilterActive) {
      const passEventType = !isAnyEventTypeSelected || selectedEventTypes.includes(event.eventType || "없음");
      
      const passGachaType = !isAnyGachaTypeSelected || (event.gacha.types && selectedGachaTypes.some(sel => {
        if (sel === "exclude_rerun") return !event.gacha.types.includes("복각") && !event.gacha.types.includes("뾱각");
        return event.gacha.types.includes(sel);
      }));

      const eventCards = event.gacha.featuredCardIds.map(id => ALL_CARDS.find(c => c.id === id || ((c as any).info && (c as any).info.id === id))).filter(c => c !== undefined) as any[];
      const matchedCards = eventCards.filter(c => checkCardMatch(c, event)); 
      matchedCardIds = matchedCards.map(c => (c as any).info ? (c as any).info.id : c.id);
      
      // 🌟 [핵심] 연도나 이벤트 이름이 직접 맞았을 때는 카드가 0장이라도 무조건 노출되게 예외 처리!
      const q = searchQuery.toLowerCase().trim().replace("년", "");
      const isDirectMatch = q.length > 0 && (event.period.start.includes(q) || event.name.toLowerCase().includes(q) || (event.eventName && event.eventName.toLowerCase().includes(q)));

      if (!passEventType || !passGachaType || (matchedCardIds.length === 0 && !isDirectMatch)) {
        isEventMatched = false;
      }
    }
    return { event, isEventMatched, matchedCardIds };
  });

  const visibleEvents = hideUnmatchedEvents ? processedEvents.filter(e => e.isEventMatched) : processedEvents;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const visibleEventsWithStatus = visibleEvents.map((item) => {
    let daysLeft = 0;
    let isOngoing = false;
    let isEnded = false;
    try {
      const cleanStartStr = item.event.period.start.split(' ')[0].replace(/[\.-]/g, '/');
      const eventStart = new Date(cleanStartStr);
      eventStart.setHours(0, 0, 0, 0);
      const cleanEndStr = (item.event.period.end || item.event.period.start).split(' ')[0].replace(/[\.-]/g, '/');
      const eventEnd = new Date(cleanEndStr);
      eventEnd.setHours(23, 59, 59, 999);
      const diffTime = eventStart.getTime() - today.getTime();
      daysLeft = Math.ceil(diffTime / 86400000);
      if (daysLeft < 0) {
        if (today.getTime() <= eventEnd.getTime()) isOngoing = true; 
        else isEnded = true;   
      }
    } catch(e) { daysLeft = 0; }
    return { ...item, daysLeft, isOngoing, isEnded };
  });

  let lastRenderedYear = "";
  let lastRenderedMonth = "";

  return (
    <div 
      onClick={() => setActiveFilterTooltip(null)} // 🌟 허공을 누르면 툴팁 닫기
      className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6 min-h-screen text-zinc-900 dark:text-zinc-100 max-w-[1920px] mx-auto w-full transition-colors duration-300 relative overflow-x-clip"
    >

      {/* 🌟 모바일 필터 배경 방어막 */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/40 dark:bg-black/60 z-[100000] transition-opacity duration-300 ${
          isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileFilterOpen(false)}
      />

      {/* 👈 좌측 영역: 필터 서랍 */}
      <div className={`
        shrink-0 transition-all duration-300 ease-in-out z-[100001] md:z-10
        ${isDesktopFilterOpen ? 'md:w-[300px] md:opacity-100' : 'md:w-0 md:opacity-0 md:overflow-hidden'}
        fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-zinc-950 shadow-2xl 
        md:static md:h-auto md:bg-transparent md:shadow-none
        ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
      `}>
        <div className="w-[300px] h-full flex flex-col p-6 md:p-0 bg-white dark:bg-zinc-950 md:bg-transparent">
          
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3 mb-6 transition-colors">
            <h2 className="text-lg md:text-sm font-bold text-zinc-700 dark:text-zinc-300 tracking-wider uppercase transition-colors">🔍 필터</h2>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm md:text-sm shadow-sm" title="초기화">
                <span className="leading-none -mt-[1px] inline-block" style={{ transform: `rotate(${spinDeg}deg)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>↺</span>
              </button>
              <button onClick={() => setIsDesktopFilterOpen(false)} className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg bg-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary transition-colors text-lg" title="필터 접기">
                ☰
              </button>
              <button onClick={() => setIsMobileFilterOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-red-500 font-bold transition-colors">
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <button onClick={() => setIsStatusExpanded(!isStatusExpanded)} className="w-full flex items-center justify-between group pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">STATUS & TYPE</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isStatusExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isStatusExpanded && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[ { id: "owned", label: "✓ 보유" }, { id: "unowned", label: "❌ 미보유" }, { id: "target", label: "⭐ 목표" } ].map(status => {
                      const isSelected = selectedStatuses.includes(status.id);
                      const opacityClass = !isAnyStatusSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                      const activeClass = status.id === "target" 
                        ? "bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-300 dark:border-amber-400/50 shadow-sm scale-105" 
                        : status.id === "owned" 
                          ? "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-400/50 shadow-sm scale-105" 
                          : "bg-transparent text-zinc-800 dark:text-zinc-200 border border-zinc-400 dark:border-zinc-500 shadow-md scale-105 font-extrabold";
                      const inactiveClass = "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-transparent scale-95";
                      return (
                        <button key={status.id} onClick={() => toggleFilter(selectedStatuses, setSelectedStatuses, status.id)}
                          className={`py-2.5 md:py-2 px-1 text-[13px] md:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 ${isSelected ? activeClass : inactiveClass} ${opacityClass}`}>
                          {status.label}
                        </button>
                      )
                    })}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <button onClick={(e) => { e.stopPropagation(); toggleFilter(selectedTypes, setSelectedTypes, "normal"); setActiveFilterTooltip('normal'); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                      className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full border ${selectedTypes.includes("normal") ? "bg-primary/10 dark:bg-primary/20 scale-105 border-transparent" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-transparent scale-[0.85] hover:scale-95"} ${!isAnyTypeSelected || selectedTypes.includes("normal") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                      <img src="/icons/status/normal.png" alt="통상" className="w-full h-full object-contain drop-shadow-sm" />
                      <span className={getTooltipClass(activeFilterTooltip === 'normal')}>통상 씰</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); toggleFilter(selectedTypes, setSelectedTypes, "limited"); setActiveFilterTooltip('limited'); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                      className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full border ${selectedTypes.includes("limited") ? "bg-primary/10 dark:bg-primary/20 scale-105 border-transparent" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-transparent scale-[0.85] hover:scale-95"} ${!isAnyTypeSelected || selectedTypes.includes("limited") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                      <img src="/icons/status/limited.png" alt="한정" className="w-full h-full object-contain drop-shadow-sm" />
                      <span className={getTooltipClass(activeFilterTooltip === 'limited')}>한정 씰</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); toggleFilter(selectedHairs, setSelectedHairs, "hair_o"); setActiveFilterTooltip('hair_o'); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                      className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full border ${selectedHairs.includes("hair_o") ? "bg-primary/10 dark:bg-primary/20 scale-105 border-transparent" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-transparent scale-[0.85] hover:scale-95"} ${!isAnyHairSelected || selectedHairs.includes("hair_o") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                      <img src="/icons/status/hair_o.png" alt="헤어 O" className="w-full h-full object-contain drop-shadow-sm" />
                      <span className={getTooltipClass(activeFilterTooltip === 'hair_o')}>헤어 O</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); toggleFilter(selectedHairs, setSelectedHairs, "hair_x"); setActiveFilterTooltip('hair_x'); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                      className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full border ${selectedHairs.includes("hair_x") ? "bg-primary/10 dark:bg-primary/20 scale-105 border-transparent" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-transparent scale-[0.85] hover:scale-95"} ${!isAnyHairSelected || selectedHairs.includes("hair_x") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                      <img src="/icons/status/hair_x.png" alt="헤어 X" className="w-full h-full object-contain drop-shadow-sm" />
                      <span className={getTooltipClass(activeFilterTooltip === 'hair_x')}>헤어 X</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsGachaTypeExpanded(!isGachaTypeExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">GACHA TYPE</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isGachaTypeExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isGachaTypeExpanded && (
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[ 
                    { id: "exclude_rerun", name: "⁰ 복각 제외", activeClass: "bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 border-red-300 dark:border-red-400/50 shadow-sm" },
                    { id: "복각", name: "¹ 복각", activeClass: "bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-300 dark:border-purple-400/50 shadow-sm" }, 
                    { id: "뾱각", name: "² 뾱각", activeClass: "bg-fuchsia-50 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-300 dark:border-fuchsia-400/50 shadow-sm" } 
                  ].map(type => {
                    const isSelected = selectedGachaTypes.includes(type.id);
                    const opacityClass = !isAnyGachaTypeSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-zinc-500 dark:text-white bg-zinc-100 dark:bg-zinc-900";
                    return (
                      <button key={type.id} onClick={() => toggleFilter(selectedGachaTypes, setSelectedGachaTypes, type.id)}
                        className={`py-2.5 md:py-2 px-1 text-[13px] md:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 border ${isSelected ? `${type.activeClass} scale-105` : "bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-white border-zinc-200 dark:border-transparent scale-95"} ${opacityClass}`}>
                        {type.name}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsEventTypeExpanded(!isEventTypeExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">EVENT TYPE</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isEventTypeExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isEventTypeExpanded && (
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[ 
                    { id: "하코", name: "하코", activeClass: "bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-400/50 shadow-sm" }, 
                    { id: "혼합", name: "혼합", activeClass: "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-300 dark:border-indigo-400/50 shadow-sm" }, 
                    { id: "월링", name: "월링", activeClass: "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-300 dark:border-emerald-400/50 shadow-sm" } 
                  ].map(type => {
                    const isSelected = selectedEventTypes.includes(type.id);
                    const opacityClass = !isAnyEventTypeSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-zinc-500 dark:text-white bg-zinc-100 dark:bg-zinc-900";
                    return (
                      <button key={type.id} onClick={() => toggleFilter(selectedEventTypes, setSelectedEventTypes, type.id)}
                        className={`py-2.5 md:py-2 px-1 text-[13px] md:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 border ${isSelected ? `${type.activeClass} scale-105` : "bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-white border-zinc-200 dark:border-transparent scale-95"} ${opacityClass}`}>
                        {type.name}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsCollabExpanded(!isCollabExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">COLLAB</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isCollabExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
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
                    style={((selectedTypes.includes("collab_all") || COLLAB_FILTERS.every(c => selectedTypes.includes(c.id))) && themeColor !== "default") ? {
                      "--mix-bg": "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                      "--mix-border": "var(--color-primary)",
                      "--mix-text-light": "color-mix(in srgb, var(--color-primary) 40%, black)",
                      "--mix-text-dark": "color-mix(in srgb, var(--color-primary) 40%, white)",
                      "--mix-glow": "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                    } as React.CSSProperties : {}}
                    className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 border ${
                      (selectedTypes.includes("collab_all") || COLLAB_FILTERS.every(c => selectedTypes.includes(c.id)))
                        ? themeColor === "default"
                          ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border-primary/30 dark:border-primary/50 shadow-sm scale-100"
                          : "bg-[var(--mix-bg)] border-[var(--mix-border)] text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] shadow-[0_0_8px_var(--mix-glow)] scale-100"
                        : "bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    🤝 콜라보 일괄 선택
                  </button>
                  <div className="grid grid-cols-4 gap-1.5">
                    {COLLAB_FILTERS.map(collab => {
                      const isSelected = selectedTypes.includes(collab.id) || selectedTypes.includes("collab_all");
                      const opacityClass = !isAnyTypeSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-zinc-500 dark:text-white bg-zinc-100 dark:bg-zinc-900";
                      return (
                        <button key={collab.id} onClick={() => {
                          let nextSelected = [...selectedTypes];
                          if (nextSelected.includes(collab.id)) nextSelected = nextSelected.filter(id => id !== collab.id && id !== "collab_all");
                          else nextSelected.push(collab.id);
                          setSelectedTypes(nextSelected);
                        }}
                          style={isSelected && themeColor !== "default" ? {
                            "--mix-bg": "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                            "--mix-border": "var(--color-primary)",
                            "--mix-text-light": "color-mix(in srgb, var(--color-primary) 40%, black)",
                            "--mix-text-dark": "color-mix(in srgb, var(--color-primary) 40%, white)",
                            "--mix-glow": "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                          } as React.CSSProperties : {}}
                          className={`py-2.5 md:py-2 px-1 text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 border ${
                            isSelected 
                              ? themeColor === "default"
                                ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary shadow-sm scale-105 border-primary/30 dark:border-primary/50"
                                : "bg-[var(--mix-bg)] border-[var(--mix-border)] text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] shadow-[0_0_8px_var(--mix-glow)] scale-105"
                              : "bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-white border-zinc-200 dark:border-transparent scale-95"
                          } ${opacityClass}`}>
                          {collab.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsAttrExpanded(!isAttrExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">ATTRIBUTE</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isAttrExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isAttrExpanded && (
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {ATTR_FILTERS.map(attr => {
                    const isSelected = selectedAttrs.includes(attr.id);
                    const opacityClass = !isAnyAttrSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                    return (
                    <button key={attr.id} onClick={(e) => { e.stopPropagation(); toggleFilter(selectedAttrs, setSelectedAttrs, attr.id); setActiveFilterTooltip(attr.id); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                      className={`relative group aspect-square rounded-full transition-all duration-300 ${isSelected ? "scale-105 drop-shadow-md bg-primary/10 dark:bg-primary/20" : "scale-[0.85] hover:scale-95 bg-zinc-100 dark:bg-transparent"} ${opacityClass}`}>
                      <img src={attr.img} alt={attr.name} className="w-full h-full object-contain" />
                      <span className={getTooltipClass(activeFilterTooltip === attr.id)}>{attr.name}</span>
                    </button>
                  )})}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsSkillExpanded(!isSkillExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">SKILL</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isSkillExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isSkillExpanded && (
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-4 gap-1.5">
                    {SKILL_FILTERS.map(skill => {
                      const isCondGroup = skill.id === "condition_group";
                      const isSelected = isCondGroup ? isAllCondSelected : selectedSkills.includes(skill.id);
                      const opacityClass = !isAnySkillSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                      return (
                        <button key={skill.id} onClick={(e) => { e.stopPropagation(); (isCondGroup ? toggleCondSkillGroup() : toggleFilter(selectedSkills, setSelectedSkills, skill.id)); setActiveFilterTooltip(skill.id); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                          className={`relative group aspect-square rounded-full p-1 transition-all duration-300 border ${isSelected ? "bg-primary/10 dark:bg-primary/20 scale-105 border-transparent" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-transparent scale-[0.85] hover:scale-95"} ${opacityClass}`}>
                          <img src={skill.img} alt={skill.name} className="w-full h-full object-contain drop-shadow-sm" />
                          <span className={getTooltipClass(activeFilterTooltip === skill.id)}>{skill.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 mt-2">
                    {condSubs.map(sub => {
                      const isSelected = selectedSkills.includes(sub.id);
                      const opacityClass = !isAnySkillSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100 text-zinc-500 dark:text-white bg-zinc-100 dark:bg-zinc-900";
                      return (
                        <button key={sub.id} onClick={() => toggleFilter(selectedSkills, setSelectedSkills, sub.id)}
                          style={isSelected && themeColor !== "default" ? {
                            "--mix-bg": "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                            "--mix-border": "var(--color-primary)",
                            "--mix-text-light": "color-mix(in srgb, var(--color-primary) 40%, black)",
                            "--mix-text-dark": "color-mix(in srgb, var(--color-primary) 40%, white)",
                            "--mix-glow": "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                          } as React.CSSProperties : {}}
                          className={`py-2.5 md:py-2 px-1 text-[12px] font-medium tracking-tight rounded-lg transition-all duration-300 border ${
                            isSelected 
                              ? themeColor === "default"
                                ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary scale-105 shadow-sm border-primary/30 dark:border-primary/50" 
                                : "bg-[var(--mix-bg)] border-[var(--mix-border)] text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] shadow-[0_0_8px_var(--mix-glow)] scale-105"
                              : "bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 scale-95 border-zinc-200 dark:border-transparent"
                          } ${opacityClass}`}>
                          {sub.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 pb-10 md:pb-0">
              <button onClick={() => setIsCharExpanded(!isCharExpanded)} className="w-full flex items-center justify-between group border-t border-zinc-200 dark:border-white/5 pt-4 pb-2 cursor-pointer transition-colors">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">CHARACTER</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isCharExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isCharExpanded && (
                <div className="space-y-6 pt-3">
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-2xl border border-zinc-200 dark:border-white/5 transition-colors">
                    <button 
                      onClick={toggleAllVirtualSingers}
                      style={themeColor !== "default" ? {
                        "--mix-bg": "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                        "--mix-border": "var(--color-primary)",
                        "--mix-text-light": "color-mix(in srgb, var(--color-primary) 40%, black)",
                        "--mix-text-dark": "color-mix(in srgb, var(--color-primary) 40%, white)",
                        "--mix-glow": "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                        "--tint-bg": "color-mix(in srgb, var(--color-primary) 6%, transparent)",
                        "--tint-text-light": "color-mix(in srgb, var(--color-primary) 80%, #3f3f46)",
                        "--tint-text-dark": "color-mix(in srgb, var(--color-primary) 80%, #f4f4f5)",
                      } as React.CSSProperties : {}}
                      className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12px] font-bold transition-all duration-300 border ${
                        isAllVsSelected 
                          ? themeColor === "default"
                            ? "bg-primary/10 dark:bg-[#00FFD1]/15 text-primary dark:text-[#00FFD1] border-primary/30 dark:border-[#00FFD1]/30 shadow-sm dark:shadow-[0_0_10px_rgba(0,255,209,0.1)] scale-100" 
                            : "bg-[var(--mix-bg)] border-[var(--mix-border)] text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] shadow-[0_0_8px_var(--mix-glow)] scale-100"
                          : themeColor === "default"
                            ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            : "bg-[var(--tint-bg)] border-zinc-200 dark:border-white/5 text-[var(--tint-text-light)] dark:text-[var(--tint-text-dark)] hover:bg-primary/10 transition-colors"
                      }`}
                    >
                      <span>🎙️</span>
                      <span>버추얼 싱어 일괄 선택</span>
                    </button>

                    <div className="grid grid-cols-3 gap-1.5 mt-2">
                      {[
                        { label: "미쿠", key: "미쿠", activeClass: "bg-[#39C5BB]/10 dark:bg-[#39C5BB]/20 text-[#39C5BB] border-[#39C5BB]/30 dark:border-[#39C5BB]/50 shadow-sm dark:shadow-[0_0_6px_rgba(57,197,187,0.2)] scale-100 font-bold" },
                        { label: "린", key: "린", activeClass: "bg-[#FFA500]/10 dark:bg-[#FFA500]/20 text-[#FFA500] border-[#FFA500]/30 dark:border-[#FFA500]/50 shadow-sm dark:shadow-[0_0_6px_rgba(255,165,0,0.2)] scale-100 font-bold" },
                        { label: "렌", key: "렌", activeClass: "bg-[#FFE211]/10 dark:bg-[#FFE211]/20 text-[#D4B800] dark:text-[#FFE211] border-[#FFE211]/30 dark:border-[#FFE211]/50 shadow-sm dark:shadow-[0_0_6px_rgba(255,226,17,0.2)] scale-100 font-bold" },
                        { label: "루카", key: "루카", activeClass: "bg-[#FFC0CB]/10 dark:bg-[#FFC0CB]/20 text-[#E08A9A] dark:text-[#FFC0CB] border-[#FFC0CB]/30 dark:border-[#FFC0CB]/50 shadow-sm dark:shadow-[0_0_6px_rgba(255,192,203,0.2)] scale-100 font-bold" },
                        { label: "MEIKO", key: "MEIKO", activeClass: "bg-[#D80000]/10 dark:bg-[#D80000]/20 text-[#D80000] border-[#D80000]/30 dark:border-[#D80000]/50 shadow-sm dark:shadow-[0_0_6px_rgba(216,0,0,0.2)] scale-100 font-bold" },
                        { label: "KAITO", key: "KAITO", activeClass: "bg-[#3468CD]/10 dark:bg-[#3468CD]/20 text-[#3468CD] border-[#3468CD]/30 dark:border-[#3468CD]/50 shadow-sm dark:shadow-[0_0_6px_rgba(52,104,205,0.2)] scale-100 font-bold" }
                      ].map(vs => {
                        const specificIds = UNIT_FILTERS.flatMap(u => u.chars).filter(c => c.isVirtual && c.matchKeys?.includes(vs.key)).map(c => c.id);
                        const isAllSpecificSelected = specificIds.length > 0 && specificIds.every(id => selectedChars.includes(id));
                        return (
                          <button 
                            key={vs.key}
                            onClick={() => toggleSpecificVS(vs.key)}
                            style={(!isAllSpecificSelected && themeColor !== "default") ? {
                              "--tint-bg": "color-mix(in srgb, var(--color-primary) 6%, transparent)",
                              "--tint-text-light": "color-mix(in srgb, var(--color-primary) 80%, #3f3f46)",
                              "--tint-text-dark": "color-mix(in srgb, var(--color-primary) 80%, #f4f4f5)",
                            } as React.CSSProperties : {}}
                            className={`py-1.5 rounded-lg text-[11px] transition-all duration-300 border ${
                              isAllSpecificSelected 
                                ? vs.activeClass 
                                : themeColor === "default"
                                  ? "bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium"
                                  : "bg-[var(--tint-bg)] border-zinc-200 dark:border-white/5 text-[var(--tint-text-light)] dark:text-[var(--tint-text-dark)] hover:bg-primary/10 font-medium"
                            }`}
                          >
                            {vs.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {UNIT_FILTERS.map((unit) => {
                    const isAllSelected = unit.chars.every(c => selectedChars.includes(c.id));
                    const logoOpacityClass = !isAnyCharSelected || isAllSelected ? "opacity-100" : "opacity-40 hover:opacity-100 filter grayscale-[50%] dark:grayscale-0";
                    return (
                    <div key={unit.id} className="flex flex-col gap-2">
                      <button onClick={() => toggleUnitFilter(unit.chars)} 
                        style={(isAllSelected && themeColor !== "default") ? {
                          "--mix-border": "var(--color-primary)",
                        } as React.CSSProperties : {}}
                        className={`w-full h-16 py-1 flex items-center justify-center rounded-xl transition-all duration-300 border ${
                          isAllSelected 
                            ? themeColor === "default"
                              ? "bg-primary/10 dark:bg-primary/15 scale-105 border-primary/20" 
                              : "bg-transparent border-[var(--mix-border)] scale-105" 
                            : "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 scale-95 border-transparent"
                        } ${logoOpacityClass}`}>
                        <img src={unit.logo} alt={unit.name} className="h-full w-auto object-contain max-w-[90%] drop-shadow-sm dark:drop-shadow-md" />
                      </button>
                      <div className="grid grid-cols-4 gap-1.5 mt-1">
                        {unit.chars.map(char => {
                          const isSelected = selectedChars.includes(char.id);
                          const charOpacityClass = !isAnyCharSelected || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                          return (
                          <button key={char.id} onClick={(e) => { e.stopPropagation(); toggleFilter(selectedChars, setSelectedChars, char.id); setActiveFilterTooltip(char.id); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                            style={(isSelected && themeColor !== "default") ? {
                              "--mix-ring": "var(--color-primary)",
                            } as React.CSSProperties : {}}
                            className={`relative group aspect-square rounded-full transition-all duration-300 bg-white dark:bg-zinc-950 border ${
                              isSelected 
                                ? themeColor === "default"
                                  ? "scale-105 ring-2 ring-primary shadow-sm opacity-100 border-primary dark:border-white" 
                                  : "scale-105 border-4 border-[var(--mix-ring)] shadow-sm opacity-100" 
                                : "scale-[0.80] hover:scale-[0.85] border-zinc-200 dark:border-transparent"
                            } ${charOpacityClass}`}>
                            <img src={char.img} alt={char.name} className="w-full h-full object-contain" />
                            <span className={getTooltipClass(activeFilterTooltip === char.id)}>{char.name}</span>
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
      </div>

      {/* ========================================= */}
      {/* 👉 우측 영역: 미래시 타임라인 본문 */}
      {/* ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-3xl p-4 md:p-6 border border-zinc-200 dark:border-white/5 relative transition-colors">
        
        {/* 🌟 글로벌 헤더(<GlobalHeader />) 바로 아랫선에 빈틈없이 붙어서 따라오도록 높이 재단 완료! */}
        <div className="sticky top-14 xl:top-14 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md py-4 -mx-4 md:-mx-6 px-4 md:px-6 rounded-t-3xl border-b border-zinc-200 dark:border-white/5 z-[100] flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4 transition-colors">
          <div className="shrink-0 mr-auto">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white shrink-0 transition-colors">📅 미래시 타임라인</h1>
              <div className="flex flex-wrap items-center gap-1.5">
                {uniqueYears.map(year => (
                  <button
                    key={year}
                    onClick={() => scrollToYear(year)}
                    className={`px-2.5 py-1 border text-[11px] font-bold rounded-md transition-all shadow-sm whitespace-nowrap ${
                      activeYear === year
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white scale-105"
                        : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/90 hover:text-zinc-900 dark:hover:text-black"
                    }`}
                  >
                    {year}년
                  </button>
                ))}
              </div>
            </div>
            {/* 🌟 2번 요청 완벽 반영: 지저분한 회색 텍스트 삭제 */}
          </div>

          {/* 🎯 검색창과 버튼 묶음을 분리하여, 공간 부족 시 버튼들이 통째로 떨어지도록 구조 변경 */}
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-3 self-start xl:self-auto w-full xl:w-auto">
            
            {/* 1. 검색창: 화면 폭이 좁아져도 자신의 크기를 유지하며 상단에 버팀 */}
            <div className="relative flex items-center w-full sm:w-[180px] lg:w-64 xl:w-80 shrink-0">
              <span className="absolute left-3 text-zinc-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="카드명, 의상, 악곡, 배너 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[34px] bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs rounded-full pl-8 pr-8 focus:outline-none focus:border-primary dark:focus:border-primary transition-all shadow-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-white text-xs font-bold transition-colors">✕</button>
              )}
            </div>

            {/* 🌟 2. 나머지 버튼 묶음: 새로운 div로 묶어 하나의 덩어리로 인식하게 함 */}
            <div className="flex items-center justify-end gap-2 shrink-0">
              <button 
                onClick={() => setHideUnmatchedEvents(!hideUnmatchedEvents)}
                className={`hidden sm:flex items-center justify-center shrink-0 h-[34px] rounded-full text-[12px] font-bold transition-all shadow-sm border ${
                  hideUnmatchedEvents 
                    ? 'bg-indigo-100 dark:bg-indigo-600 border-indigo-300 dark:border-indigo-500 text-indigo-700 dark:text-white shadow-sm dark:shadow-[0_0_12px_rgba(79,70,229,0.5)] px-4 gap-1.5' 
                    : 'bg-white dark:bg-zinc-800/80 border-zinc-200 dark:border-white/10 text-indigo-500 dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 px-3 gap-1.5'
                }`}
                title="비활성 배너 숨기기"
              >
                👻 {hideUnmatchedEvents ? '숨겨짐!' : '비활성 배너 숨기기'}
              </button>
              
              {/* 👻 비활성 배너 숨기기 모바일 버튼 */}
              <button 
                onClick={(e) => { e.stopPropagation(); setHideUnmatchedEvents(!hideUnmatchedEvents); setActiveFilterTooltip('unmatched'); }} 
                onMouseLeave={() => setActiveFilterTooltip(null)}
                className={`relative group sm:hidden shrink-0 flex items-center justify-center w-[34px] h-[34px] rounded-full text-[14px] transition-all shadow-sm border ${
                  hideUnmatchedEvents 
                    ? 'bg-indigo-100 dark:bg-indigo-600 border-indigo-300 dark:border-indigo-500 text-indigo-700 dark:text-white shadow-sm dark:shadow-[0_0_12px_rgba(79,70,229,0.5)]' 
                    : 'bg-white dark:bg-zinc-800/80 border-zinc-200 dark:border-white/10 text-indigo-500 dark:text-indigo-300'
                }`}
              >
                👻
                <span className={getTooltipClass(activeFilterTooltip === 'unmatched')}>{hideUnmatchedEvents ? '비활성 숨김' : '비활성 포함'}</span>
              </button>

              <button onClick={() => setExcludeCollab(!excludeCollab)} className={`hidden sm:flex shrink-0 items-center gap-1.5 h-[34px] px-3 rounded-full text-[12px] font-bold transition-all shadow-sm border ${excludeCollab ? 'bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 border-red-300 dark:border-red-400/50' : 'bg-white dark:bg-zinc-800/80 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200'}`}>
                {excludeCollab ? '🚫 콜라보 제외' : '🤝 콜라보 포함'}
              </button>

              {/* 🚫 콜라보 제외 모바일 버튼 */}
              <button 
                onClick={(e) => { e.stopPropagation(); setExcludeCollab(!excludeCollab); setActiveFilterTooltip('collab'); }} 
                onMouseLeave={() => setActiveFilterTooltip(null)}
                className={`relative group sm:hidden shrink-0 flex items-center justify-center w-[34px] h-[34px] rounded-full text-[14px] transition-all shadow-sm border ${excludeCollab ? 'bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 border-red-200 dark:border-red-400/50' : 'bg-white dark:bg-zinc-800/80 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'}`}
              >
                {excludeCollab ? '🚫' : '🤝'}
                <span className={getTooltipClass(activeFilterTooltip === 'collab')}>{excludeCollab ? '콜라보 제외' : '콜라보 포함'}</span>
              </button>
              
              {/* ⭐ 각전/각후 전환 버튼 (공통) */}
              <button 
                onClick={(e) => { e.stopPropagation(); setShowPostAwake(!showPostAwake); setActiveFilterTooltip('awake'); }} 
                onMouseLeave={() => setActiveFilterTooltip(null)}
                className="relative group p-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shrink-0 shadow-sm transition-colors"
              >
                <img src={showPostAwake ? "/icons/post_star.png" : "/icons/pre_star.png"} alt="스위치" className="h-8 w-auto object-contain block drop-shadow-sm" />
                <span className={getTooltipClass(activeFilterTooltip === 'awake')}>{showPostAwake ? '특훈 후' : '특훈 전'}</span>
              </button>
            </div>

          </div>
        </div>

        <div className="relative pt-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-white/10 -translate-x-1/2 hidden xl:block transition-colors" />
          
          {/* 모바일 타임라인 선 연결을 위해 간격을 넓힙니다 */}
          <div className="space-y-20 xl:space-y-12 pb-20">
            {visibleEventsWithStatus.map(({ event, isEventMatched, matchedCardIds, daysLeft, isOngoing, isEnded }, index) => {
              
              const eventYear = event.period.start.split('-')[0];
              const eventMonth = event.period.start.split('-')[1];
              const eventYearMonth = `${eventYear}-${eventMonth}`;

              const showYearMarker = eventYear !== lastRenderedYear;
              if (showYearMarker) lastRenderedYear = eventYear;

              const showMonthMarker = eventYearMonth !== lastRenderedMonth;
              if (showMonthMarker) lastRenderedMonth = eventYearMonth;

              return (
                <div key={event.id} ref={(el) => { if(showMonthMarker) monthRefs.current[eventYearMonth] = el; }} className="relative animate-fade-in">
                  
                  {showYearMarker && (
                    <div ref={(el) => { yearRefs.current[eventYear] = el; monthRefs.current[eventYearMonth] = el; }} className="flex justify-center my-10 relative z-30 scroll-mt-24" data-year={eventYear}>
                      <div className="relative flex items-center justify-center">
                        
                        <div className={`absolute right-full top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 ease-in-out origin-right overflow-hidden mr-2 ${openYearMarker === eventYear ? 'max-w-[500px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
                          <div className="flex bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/20 rounded-sm shadow-lg overflow-hidden shrink-0 transition-colors">
                             {getMonthsForYear(eventYear).map(month => (
                               <button key={month} onClick={() => { scrollToMonth(`${eventYear}-${month}`); setOpenYearMarker(null); }} className="px-3 py-1.5 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white hover:text-zinc-900 dark:hover:text-black transition-colors border-r border-zinc-200 dark:border-white/10 last:border-0 whitespace-nowrap">
                                 {month}월
                               </button>
                             ))}
                          </div>
                        </div>

                        <button onClick={() => setOpenYearMarker(openYearMarker === eventYear ? null : eventYear)} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black px-5 py-1.5 rounded-sm text-sm shadow-md dark:shadow-xl tracking-widest z-20 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1.5">
                          {openYearMarker === eventYear ? '◀' : '▶'} {eventYear} {openYearMarker === eventYear ? '▶' : '◀'}
                        </button>

                        <div className={`absolute left-full top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 ease-in-out origin-left overflow-hidden ml-2 ${openYearMarker === eventYear ? 'max-w-[500px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
                          <div className="flex bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/20 rounded-sm shadow-lg overflow-hidden shrink-0 transition-colors">
                             {uniqueYears.filter(y => y !== eventYear).map(year => (
                               <button key={year} onClick={() => { scrollToYear(year); setOpenYearMarker(null); }} className="px-4 py-1.5 text-[12px] font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white hover:text-zinc-900 dark:hover:text-black transition-colors border-r border-zinc-200 dark:border-white/10 last:border-0 whitespace-nowrap">
                                 {year}년
                               </button>
                             ))}
                          </div>
                        </div>

                      </div>
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
                    monthMarker={showMonthMarker ? eventMonth : undefined}
                    daysLeft={daysLeft}
                    isOngoing={isOngoing}
                    isEnded={isEnded}
                  />
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

// (이하 데이터는 완벽 유지)
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