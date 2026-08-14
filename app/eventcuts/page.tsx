"use client";

import { useState, useEffect } from "react"; 
import { useThemeColor } from "@/app/providers";

// =========================================================================
// 👑 1~3위 왕관 메달 컴포넌트
// =========================================================================
function RankingCrown({ rank }: { rank: 1 | 2 | 3 }) {
  const colors = {
    1: { grad: "url(#gold)", stroke: "#b48b3b", textStroke: "#8a5814" },
    2: { grad: "url(#silver)", stroke: "#87929d", textStroke: "#5b6571" },
    3: { grad: "url(#bronze)", stroke: "#a0603f", textStroke: "#753a1d" }
  };
  const c = colors[rank];

  return (
    <svg viewBox="0 0 40 40" className="w-5 h-5 drop-shadow-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff5a0" /><stop offset="40%" stopColor="#ffd233" /><stop offset="100%" stopColor="#f59e00" />
        </linearGradient>
        <linearGradient id="silver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="40%" stopColor="#d1dbe5" /><stop offset="100%" stopColor="#a3b1c1" />
        </linearGradient>
        <linearGradient id="bronze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffcda8" /><stop offset="40%" stopColor="#e8895b" /><stop offset="100%" stopColor="#c75828" />
        </linearGradient>
      </defs>
      <path d="M6 30 L3 13 L14 20 L20 5 L26 20 L37 13 L34 30 Z" fill={c.grad} stroke={c.stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="8" y="31" width="24" height="4" rx="2" fill={c.grad} stroke={c.stroke} strokeWidth="1.5" />
      <circle cx="3" cy="13" r="2.5" fill={c.grad} stroke={c.stroke} strokeWidth="1" />
      <circle cx="20" cy="5" r="3" fill={c.grad} stroke={c.stroke} strokeWidth="1" />
      <circle cx="37" cy="13" r="2.5" fill={c.grad} stroke={c.stroke} strokeWidth="1" />
      <text x="20" y="27" fontSize="16" fontWeight="900" textAnchor="middle" fill="#ffffff" stroke={c.textStroke} strokeWidth="2.5" paintOrder="stroke font">{rank}</text>
    </svg>
  );
}

// =========================================================================
// 🌟 1. 필터 및 기초 데이터 정의
// =========================================================================
type CharDef = { id: string; name: string; img: string; isVirtual?: boolean; matchKeys?: string[] };
type UnitDef = { id: string; name: string; logo: string; chars: CharDef[] };
type AttrDef = { id: string; name: string; img: string };

const UNIT_FILTERS: UnitDef[] = [
  { id: "vs", name: "VIRTUAL SINGER", logo: "/icons/VS.png", chars: [ { id: "miku_0", name: "미쿠", img: "/icons/characters/MIKU_0.png", isVirtual: true, matchKeys: ["미쿠"] }, { id: "rin_0", name: "린", img: "/icons/characters/RIN_0.png", isVirtual: true, matchKeys: ["린"] }, { id: "len_0", name: "렌", img: "/icons/characters/LEN_0.png", isVirtual: true, matchKeys: ["렌"] }, { id: "luka_0", name: "루카", img: "/icons/characters/LUKA_0.png", isVirtual: true, matchKeys: ["루카"] }, { id: "meiko_0", name: "MEIKO", img: "/icons/characters/MEIKO_0.png", isVirtual: true, matchKeys: ["메이코", "MEIKO"] }, { id: "kaito_0", name: "KAITO", img: "/icons/characters/KAITO_0.png", isVirtual: true, matchKeys: ["카이토", "KAITO"] } ] },
  { id: "ln", name: "Leo/need", logo: "/icons/Leoneed.png", chars: [ { id: "ichika", name: "이치카", img: "/icons/characters/Ichika.png" }, { id: "saki", name: "사키", img: "/icons/characters/Saki.png" }, { id: "honami", name: "호나미", img: "/icons/characters/Honami.png" }, { id: "shiho", name: "시호", img: "/icons/characters/Shiho.png" } ] },
  { id: "mmj", name: "MORE MORE JUMP!", logo: "/icons/MMJ.png", chars: [ { id: "minori", name: "미노리", img: "/icons/characters/Minori.png" }, { id: "haruka", name: "하루카", img: "/icons/characters/Haruka.png" }, { id: "airi", name: "아이리", img: "/icons/characters/Airi.png" }, { id: "shizuku", name: "시즈쿠", img: "/icons/characters/Shizuku.png" } ] },
  { id: "vbs", name: "Vivid BAD SQUAD", logo: "/icons/VBS.png", chars: [ { id: "kohane", name: "코하네", img: "/icons/characters/Kohane.png" }, { id: "an", name: "안", img: "/icons/characters/An.png" }, { id: "akito", name: "아키토", img: "/icons/characters/Akito.png" }, { id: "toya", name: "토우야", img: "/icons/characters/Toya.png" } ] },
  { id: "wxs", name: "Wonderlands×Showtime", logo: "/icons/Wds.png", chars: [ { id: "tsukasa", name: "츠카사", img: "/icons/characters/Tsukasa.png" }, { id: "emu", name: "에무", img: "/icons/characters/Emu.png" }, { id: "nene", name: "네네", img: "/icons/characters/Nene.png" }, { id: "rui", name: "루이", img: "/icons/characters/Rui.png" } ] },
  { id: "n25", name: "25시, 나이트코드에서.", logo: "/icons/Niigo.png", chars: [ { id: "kanade", name: "카나데", img: "/icons/characters/Kanade.png" }, { id: "mafuyu", name: "마후유", img: "/icons/characters/Mafuyu.png" }, { id: "ena", name: "에나", img: "/icons/characters/Ena.png" }, { id: "mizuki", name: "미즈키", img: "/icons/characters/Mizuki.png" } ] }
];

const ATTR_FILTERS: AttrDef[] = [
  { id: "pure", name: "퓨어", img: "/icons/attrs/pure.png" },
  { id: "happy", name: "해피", img: "/icons/attrs/happy.png" },
  { id: "cute", name: "큐트", img: "/icons/attrs/cute.png" },
  { id: "mysterious", name: "미스테리어스", img: "/icons/attrs/mysterious.png" },
  { id: "cool", name: "쿨", img: "/icons/attrs/cool.png" }
];

const getTooltipClass = (isActive: boolean) => `absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 text-[11px] font-bold rounded-lg shadow-xl border border-zinc-200 dark:border-white/10 transition-opacity pointer-events-none whitespace-nowrap z-[60] ${isActive ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`;

// =========================================================================
// 🌟 2. 이벤컷 목업 데이터
// =========================================================================
const MOCK_EVENT_CUTS = [
  {
    id: "ev_1",
    iteration: "3차 하코",
    unit: "vbs",
    title: "선명해지는 그 열기는",
    date: "2024.03.15 ~ 03.23",
    attribute: "pure",
    gachaType: "limited",
    cuts: {
      "1": 154321000, "2": 143210000, "3": 132100000,
      "10": 98765432, "50": 76543210, "100": 54321000,
      "500": 32100000, "1000": 21000000, "5000": 10500000
    },
    tags: ["#3차하코", "#아키토배너", "#카니발", "#한정가챠", "#퓨어"]
  },
  {
    id: "ev_2",
    iteration: "2차 하코",
    unit: "mmj",
    title: "버팀목이 되는 맑은 하늘",
    date: "2023.08.10 ~ 08.18",
    attribute: "happy",
    gachaType: "normal",
    cuts: {
      "1": 102345000, "2": 95000000, "3": 89000000,
      "10": 65000000, "50": 45000000, "100": 35000000,
      "500": 18000000, "1000": 9500000, "5000": 4500000
    },
    tags: ["#2차하코", "#미노리배너", "#마라톤", "#통상가챠", "#해피"]
  }
];

// =========================================================================
// 🚀 메인 컴포넌트 시작
// =========================================================================
export default function EventCutsPage() {
  const { themeColor } = useThemeColor();

  // 🌟 이벤컷 전용 탭, 정렬, 검색 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"cut_high" | "cut_low" | "latest">("cut_high");
  const [targetRank, setTargetRank] = useState<"1"|"2"|"3"|"10"|"50"|"100"|"500"|"1000"|"5000">("100");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // 🌟 필터 데이터 상태
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedGachaTypes, setSelectedGachaTypes] = useState<string[]>([]);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<string[]>([]);

  // 🌟 아코디언 펼침/접힘 상태
  const [isYearExpanded, setIsYearExpanded] = useState(true);
  const [isEventTypeExpanded, setIsEventTypeExpanded] = useState(true);
  const [isGachaTypeExpanded, setIsGachaTypeExpanded] = useState(true);
  const [isAttrExpanded, setIsAttrExpanded] = useState(true);
  const [isCharExpanded, setIsCharExpanded] = useState(true);

  // 🌟 반응형 햄버거 토글 및 툴팁 상태
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);
  const [spinDeg, setSpinDeg] = useState(0);
  const [activeFilterTooltip, setActiveFilterTooltip] = useState<string | null>(null);

  // 🌟 1. 워키토키 발신: 서랍 상태가 바뀔 때마다 헤더(햄버거 버튼)에 전송
  useEffect(() => {
    const checkAndSend = () => {
      const isVisible = window.innerWidth < 768 ? isMobileFilterOpen : isDesktopFilterOpen;
      window.dispatchEvent(new CustomEvent("sekard_filter_state", { detail: isVisible }));
    };
    checkAndSend();
    window.addEventListener("resize", checkAndSend);
    return () => window.removeEventListener("resize", checkAndSend);
  }, [isMobileFilterOpen, isDesktopFilterOpen]);

  // 🌟 2. 워키토키 수신: 헤더 햄버거 버튼 누르면 서랍 열기
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) setIsMobileFilterOpen(true);
      else setIsDesktopFilterOpen(true);
    };
    window.addEventListener("toggle_sekard_filter", handleToggle);
    return () => window.removeEventListener("toggle_sekard_filter", handleToggle);
  }, []);

  // 🌟 3. 모바일 필터 열림 시 뒷배경 스크롤 방지
  useEffect(() => {
    if (isMobileFilterOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isMobileFilterOpen]);

  const isAnyAttrSelected = selectedAttrs.length > 0;
  const isAnyCharSelected = selectedChars.length > 0;

  // 🌟 필터 공통 로직 함수들
  const handleReset = () => {
    setSpinDeg(prev => prev - 360); 
    setSelectedYears([]); setSelectedEventTypes([]); setSelectedGachaTypes([]);
    setSelectedAttrs([]); setSelectedChars([]); setSearchQuery("");
  };

  const toggleFilter = (list: string[], setList: (val: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter(item => item !== id) : [...list, id]);
  };
  const toggleRowExpand = (id: string) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };
  const toggleUnitFilter = (unitChars: CharDef[]) => {
    const charIds = unitChars.map(c => c.id);
    const isAllSelected = charIds.every(id => selectedChars.includes(id));
    setSelectedChars(isAllSelected ? selectedChars.filter(id => !charIds.includes(id)) : [...new Set([...selectedChars, ...charIds])]);
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

  const getUnitLogo = (id: string) => UNIT_FILTERS.find(u => u.id === id)?.logo || "";
  const getAttrIcon = (id: string) => ATTR_FILTERS.find(a => a.id === id)?.img || "";
  const getGachaIcon = (type: string) => type === "limited" ? "/icons/status/limited.png" : "/icons/status/normal.png";

  // 정렬 로직 (기준 등수 기반)
  const sortedEvents = [...MOCK_EVENT_CUTS].sort((a, b) => {
    const scoreA = a.cuts[targetRank] || 0;
    const scoreB = b.cuts[targetRank] || 0;
    if (sortOrder === "cut_high") return scoreB - scoreA;
    if (sortOrder === "cut_low") return scoreA - scoreB;
    return new Date(b.date.split(" ~ ")[0]).getTime() - new Date(a.date.split(" ~ ")[0]).getTime();
  });

  return (
    <div 
      onClick={() => setActiveFilterTooltip(null)} 
      className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6 min-h-screen text-zinc-900 dark:text-zinc-100 max-w-[1920px] mx-auto w-full transition-colors duration-300 relative overflow-x-clip"
    >
      
      {/* 🌟 모바일 필터 배경 방어막 (Dim Overlay) */}
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
          
          {/* 필터 헤더 구역 */}
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
            
            {/* 1️⃣ YEAR */}
            <div className="space-y-2">
              <button onClick={() => setIsYearExpanded(!isYearExpanded)} className="w-full flex items-center justify-between group pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">YEAR</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isYearExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isYearExpanded && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[ "2025", "2024", "2023", "2022", "2021" ].map(year => {
                      const isSelected = selectedYears.includes(year);
                      const opacityClass = selectedYears.length === 0 || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                      const activeClass = "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/30 dark:border-primary/50 shadow-sm scale-105";
                      const inactiveClass = "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-transparent scale-95";
                      return (
                        <button key={year} onClick={() => toggleFilter(selectedYears, setSelectedYears, year)}
                          className={`py-2.5 md:py-2 px-1 text-[13px] md:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 ${isSelected ? activeClass : inactiveClass} ${opacityClass}`}>
                          {year}년
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2️⃣ EVENT TYPE */}
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsEventTypeExpanded(!isEventTypeExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">EVENT TYPE</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isEventTypeExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isEventTypeExpanded && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "marathon", label: "🏃 마라톤" },
                      { id: "carnival", label: "🎪 카니발" },
                      { id: "cheer", label: "🎇 응원제 (명절/주년)" }
                    ].map(evt => {
                      const isSelected = selectedEventTypes.includes(evt.id);
                      const opacityClass = selectedEventTypes.length === 0 || isSelected ? "opacity-100" : "opacity-40 hover:opacity-100";
                      const activeClass = "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/30 dark:border-primary/50 shadow-sm scale-105";
                      const inactiveClass = "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-transparent scale-95";
                      return (
                        <button key={evt.id} onClick={() => toggleFilter(selectedEventTypes, setSelectedEventTypes, evt.id)}
                          className={`py-2.5 md:py-2 px-1 text-[13px] md:text-[12px] font-bold tracking-tight rounded-lg transition-all duration-300 ${evt.id === 'cheer' ? 'col-span-2' : ''} ${isSelected ? activeClass : inactiveClass} ${opacityClass}`}>
                          {evt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3️⃣ GACHA SEAL */}
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsGachaTypeExpanded(!isGachaTypeExpanded)} className="w-full flex items-center justify-between group pt-2 pb-1 cursor-pointer">
                <span className="text-[12px] md:text-[11px] font-bold text-zinc-600 dark:text-zinc-500 tracking-widest pl-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">GACHA SEAL</span>
                <span className={`text-[10px] text-zinc-400 dark:text-zinc-500 transform transition-transform duration-300 ${isGachaTypeExpanded ? 'rotate-0' : '-rotate-90'}`}>▼</span>
              </button>
              {isGachaTypeExpanded && (
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <button onClick={(e) => { e.stopPropagation(); toggleFilter(selectedGachaTypes, setSelectedGachaTypes, "normal"); setActiveFilterTooltip('normal'); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full border ${selectedGachaTypes.includes("normal") ? "bg-primary/10 dark:bg-primary/20 scale-105 border-transparent" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-transparent scale-[0.85] hover:scale-95"} ${selectedGachaTypes.length === 0 || selectedGachaTypes.includes("normal") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/normal.png" alt="통상" className="w-full h-full object-contain drop-shadow-sm" />
                    <span className={getTooltipClass(activeFilterTooltip === 'normal')}>통상 씰</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleFilter(selectedGachaTypes, setSelectedGachaTypes, "limited"); setActiveFilterTooltip('limited'); }} onMouseLeave={() => setActiveFilterTooltip(null)}
                    className={`relative group aspect-square rounded-full p-1 transition-all duration-300 w-full h-full border ${selectedGachaTypes.includes("limited") ? "bg-primary/10 dark:bg-primary/20 scale-105 border-transparent" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-transparent scale-[0.85] hover:scale-95"} ${selectedGachaTypes.length === 0 || selectedGachaTypes.includes("limited") ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                    <img src="/icons/status/limited.png" alt="한정" className="w-full h-full object-contain drop-shadow-sm" />
                    <span className={getTooltipClass(activeFilterTooltip === 'limited')}>한정 씰</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4️⃣ ATTRIBUTE */}
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

            {/* 5️⃣ CHARACTER */}
            <div className="pt-2 pb-10 md:pb-0 border-t border-zinc-200 dark:border-white/5 transition-colors">
              <button onClick={() => setIsCharExpanded(!isCharExpanded)} className="w-full flex items-center justify-between group pt-4 pb-2 cursor-pointer transition-colors">
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
                        style={(isAllSelected && themeColor !== "default") ? { "--mix-border": "var(--color-primary)" } as React.CSSProperties : {}}
                        className={`w-full h-16 py-1 flex items-center justify-center rounded-xl transition-all duration-300 border ${
                          isAllSelected 
                            ? themeColor === "default" ? "bg-primary/10 dark:bg-primary/15 scale-105 border-primary/20" : "bg-transparent border-[var(--mix-border)] scale-105" 
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
                            style={(isSelected && themeColor !== "default") ? { "--mix-ring": "var(--color-primary)" } as React.CSSProperties : {}}
                            className={`relative group aspect-square rounded-full transition-all duration-300 bg-white dark:bg-zinc-950 border ${
                              isSelected 
                                ? themeColor === "default" ? "scale-105 ring-2 ring-primary shadow-sm opacity-100 border-primary dark:border-white" : "scale-105 border-4 border-[var(--mix-ring)] shadow-sm opacity-100" 
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

      {/* 👉 우측 본문 영역: 엑셀 스타일 리더보드 트래커 */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-3xl p-4 md:p-6 border border-zinc-200 dark:border-white/5 relative shadow-sm transition-colors duration-300">
        
        {/* 🌟 상단 컨트롤 바 */}
        <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/85 backdrop-blur-md py-4 -mt-4 md:-mt-6 -mx-4 md:-mx-6 px-4 md:px-6 rounded-t-3xl border-b border-zinc-200 dark:border-white/5 z-50 flex flex-wrap items-center justify-between gap-y-3 mb-6 transition-colors duration-300">
          <div className="shrink-0 mr-auto">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              한섭 역대 이벤트 컷
            </h1>
          </div>

          <div className="flex items-center justify-end gap-3 shrink-0">
            {/* 🔍 태그/검색창 */}
            <div className="relative w-[140px] sm:w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">#</span>
              <input
                type="text"
                placeholder="태그/이벤트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[34px] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs rounded-full pl-7 pr-4 focus:outline-none focus:border-primary shadow-sm"
              />
            </div>

            {/* 🏅 정렬 기준 등수 뱃지 */}
            <div className="hidden lg:flex items-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-full p-1 shadow-sm shrink-0">
              <span className="text-[10px] text-zinc-500 font-bold px-2 whitespace-nowrap">정렬 기준</span>
              <div className="flex gap-0.5">
                {(["10", "50", "100", "500", "1000", "5000"] as const).map(rank => (
                  <button 
                    key={rank} 
                    onClick={() => setTargetRank(rank)}
                    className={`px-2 h-[24px] rounded-full text-[11px] font-bold transition-all ${
                      targetRank === rank 
                        ? 'bg-primary/10 text-primary border border-primary/30 scale-105 shadow-sm' 
                        : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                    }`}
                  >
                    in {rank}
                  </button>
                ))}
              </div>
            </div>

            {/* ⇅ 정렬 드롭다운 */}
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="h-[34px] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-lg text-xs font-bold px-3 pr-8 shadow-sm focus:outline-none focus:border-primary appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyMCAyMCIgc3Ryb2tlPSIjOTNhM2FmIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE5IDlsLTMgMy0zLTMiLz48L3N2Zz4=')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.2em_1.2em]"
            >
              <option value="cut_high">⇪ 컷 높은 순</option>
              <option value="cut_low">⇩ 컷 낮은 순</option>
              <option value="latest">⏱️ 최신 이벤트순</option>
            </select>
          </div>
        </div>

        {/* 📊 엑셀 형태의 데이터 테이블 */}
        <div className="flex flex-col gap-2 pb-8 overflow-x-auto custom-scrollbar">
          
          {/* 🌟 엑셀 테이블 헤더 행 */}
          <div className="flex items-center gap-3 px-3 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10 text-[11px] font-bold text-zinc-500 min-w-max select-none">
            <div className="w-6 text-center">태그</div>
            <div className="w-16 text-center">차수</div>
            <div className="w-8 text-center">유닛</div>
            <div className="w-48 md:w-56 pl-1">이벤트명 / 기간</div>
            <div className="w-14 text-center">타입</div>
            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
            <div className="min-w-[90px] text-center font-black text-amber-500">🥇 1위</div>
            <div className="min-w-[90px] text-center font-black text-slate-400">🥈 2위</div>
            <div className="min-w-[90px] text-center font-black text-amber-700">🥉 3위</div>
            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
            {(["10", "50", "100", "500", "1000", "5000"] as const).map(r => (
              <div key={r} className={`min-w-[85px] text-center ${targetRank === r ? 'text-primary font-black' : ''}`}>in {r}</div>
            ))}
          </div>

          {/* 🌟 데이터 행 리스트 */}
          {sortedEvents.map(ev => {
            const isExpanded = expandedRows.includes(ev.id);
            return (
              <div key={ev.id} className="flex flex-col bg-white dark:bg-zinc-950/50 rounded-xl border border-zinc-200 dark:border-white/5 shadow-sm hover:border-primary/40 transition-all min-w-max">
                
                {/* 메인 가로형 행 */}
                <div className="flex items-center gap-3 p-2.5">
                  
                  {/* 1. 태그 토글 버튼 */}
                  <button 
                    onClick={() => toggleRowExpand(ev.id)} 
                    className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-primary transition-colors"
                    title="태그 보기"
                  >
                    <span className={`transform transition-transform duration-300 text-[10px] ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                  </button>

                  {/* 2. 이벤트 차수 */}
                  <div className="shrink-0 w-16 text-center font-black text-[12px] text-zinc-500 dark:text-zinc-400">
                    {ev.iteration}
                  </div>
                  
                  {/* 3. 유닛 로고 */}
                  <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-1 flex items-center justify-center">
                    <img src={getUnitLogo(ev.unit)} alt={ev.unit} className="w-full h-full object-contain drop-shadow-sm" />
                  </div>

                  {/* 4. 이벤트명 & 기간 */}
                  <div className="shrink-0 w-48 md:w-56 flex flex-col justify-center">
                    <span className="font-bold text-[13px] text-zinc-900 dark:text-zinc-100 truncate" title={ev.title}>{ev.title}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">{ev.date}</span>
                  </div>

                  {/* 5. 원형 타입 뱃지 */}
                  <div className="shrink-0 flex items-center gap-1 w-14 justify-center">
                    <img src={getAttrIcon(ev.attribute)} alt="attr" className="w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-0.5" />
                    <img src={getGachaIcon(ev.gachaType)} alt="gacha" className="w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-0.5" />
                  </div>

                  <div className="w-px h-8 bg-zinc-200 dark:border-white/10 shrink-0 mx-1" />

                  {/* 6. 1등 / 2등 / 3등 */}
                  {([1, 2, 3] as const).map(rank => (
                    <div key={rank} className="shrink-0 flex items-center gap-1.5 min-w-[90px] justify-center bg-zinc-50/80 dark:bg-zinc-900/40 rounded-lg py-1.5 border border-zinc-100 dark:border-white/5">
                      <RankingCrown rank={rank} />
                      <span className="font-mono font-black text-[13px] text-zinc-800 dark:text-zinc-200 tracking-tight">
                        {ev.cuts[rank]?.toLocaleString() || "-"}
                      </span>
                    </div>
                  ))}

                  <div className="w-px h-8 bg-zinc-200 dark:border-white/10 shrink-0 mx-1" />

                  {/* 7. in 10 ~ in 5000 */}
                  {(["10", "50", "100", "500", "1000", "5000"] as const).map(rank => {
                    const isTarget = targetRank === rank;
                    return (
                      <div key={rank} className={`shrink-0 flex flex-col items-center min-w-[85px] py-1 rounded-lg border transition-all ${isTarget ? 'bg-primary/10 border-primary/40 shadow-sm scale-105' : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}>
                        <span className={`text-[9px] font-bold ${isTarget ? 'text-primary' : 'text-zinc-400'}`}>in {rank}</span>
                        <span className={`font-mono font-bold text-[13px] tracking-tight ${isTarget ? 'text-primary dark:text-white font-black' : 'text-zinc-700 dark:text-zinc-300'}`}>
                          {ev.cuts[rank]?.toLocaleString() || "-"}
                        </span>
                      </div>
                    )
                  })}

                </div>

                {/* 📌 하단 태그 구역 */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-2.5 pt-1 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/20 flex items-center justify-start gap-2">
                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 shrink-0 ml-1">검색 태그 :</span>
                    <div className="flex flex-wrap gap-1.5">
                      {ev.tags.map(tag => (
                        <button 
                          key={tag}
                          onClick={() => setSearchQuery(tag)} 
                          className="px-2 py-0.5 text-[11px] font-bold text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-md hover:border-primary hover:text-primary transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}