"use client";

import { useState, useEffect } from "react";
import { FinalCardInfo } from "@/data/cards/template";
import { ALL_CARDS } from "@/data/cards"; 

// 🌟 [덱시뮬 5칸 전용] 완벽한 CSS 속성 클립 컴포넌트
const AttributeClip = ({ attr }: { attr: string }) => {
  const styles: Record<string, { bg: string, svg: React.ReactNode }> = {
    pure: { bg: "from-[#39C5BB] to-[#209289]", svg: <path d="M12 22v-7c0-3.5-2.5-6-6-6 3.5 0 6 2.5 6 6v-2c0-4.5 3.5-8 8-8-4.5 0-8 3.5-8 8v9z"/> },
    cool: { bg: "from-[#4669F5] to-[#2A44A5]", svg: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/> },
    happy: { bg: "from-[#FF9E23] to-[#C97813]", svg: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> },
    mysterious: { bg: "from-[#A654C4] to-[#76378E]", svg: <path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/> },
    cute: { bg: "from-[#FF6388] to-[#C44262]", svg: <path d="M12 2.5a4 4 0 00-3.5 6A4 4 0 002.5 12a4 4 0 006 3.5 4 4 0 003.5 6 4 4 0 003.5-6A4 4 0 0021.5 12a4 4 0 00-6-3.5A4 4 0 0012 2.5z"/> }
  };
  const attrData = styles[attr.toLowerCase()];
  if (!attrData) return null;

  return (
    <div className="absolute -top-[1px] -left-[1px] w-[26px] h-[28px] md:w-[30px] md:h-[32px] z-30 drop-shadow-md">
      <div className={`w-full h-full bg-gradient-to-br ${attrData.bg} border-[1.5px] border-white/90 shadow-sm rounded-tl-[6px] rounded-bl-[6px] rounded-br-[6px] rounded-tr-[1px] flex items-center justify-center`}>
        <svg viewBox="0 0 24 24" fill="white" className="w-[65%] h-[65%] drop-shadow-sm">
          {attrData.svg}
        </svg>
      </div>
    </div>
  );
};

// 🌟 필터용 데이터 상수 확장! (스킬과 캐릭터 리스트 추가)
const ATTR_LIST = [
  { id: "pure", name: "퓨어" }, { id: "cool", name: "쿨" }, 
  { id: "happy", name: "해피" }, { id: "mysterious", name: "미스테리" }, { id: "cute", name: "큐트" }
];
const UNIT_LIST = [
  { id: "VS", name: "버싱", img: "VS", chars: ["미쿠", "린", "렌", "루카", "메이코", "카이토"] }, 
  { id: "Leoneed", name: "레오니", img: "Leoneed", chars: ["이치카", "사키", "호나미", "시호"] }, 
  { id: "MMJ", name: "모모점", img: "MMJ", chars: ["미노리", "하루카", "아이리", "시즈쿠"] }, 
  { id: "VBS", name: "비배스", img: "VBS", chars: ["코하네", "안", "아키토", "토우야"] }, 
  { id: "Wds", name: "원더쇼", img: "Wds", chars: ["츠카사", "에무", "네네", "루이"] }, 
  { id: "Niigo", name: "니고", img: "Niigo", chars: ["카나데", "마후유", "에나", "미즈키"] }
];
// 🌟 2. 스킬을 일반 / 특수로 분리했습니다!
const SKILL_GENERAL = ["스업", "판강", "힐"];
const SKILL_SPECIAL = ["퍼스업", "굿스업", "체스업", "팀스업", "블페"];
const CHAR_LIST = [
  "이치카", "사키", "호나미", "시호", "미노리", "하루카", "아이리", "시즈쿠", 
  "코하네", "안", "아키토", "토우야", "츠카사", "에무", "네네", "루이", 
  "카나데", "마후유", "에나", "미즈키", "미쿠", "린", "렌", "루카", "메이코", "카이토"
];

const latestDateMs = Math.max(...ALL_CARDS.map(c => new Date(c.releaseDate).getTime()));

export default function DeckSimulator() {
  const [presets, setPresets] = useState<Array<Array<FinalCardInfo | null>>>(
    Array.from({ length: 6 }, () => Array(5).fill(null))
  );
  const [activeTab, setActiveTab] = useState(0); 
  
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [tempSelectedCard, setTempSelectedCard] = useState<FinalCardInfo | null | undefined>(undefined); 
  const [isFilterOpen, setIsFilterOpen] = useState(false); 

  const [bonusTarget, setBonusTarget] = useState({ unit: "wxs", attr: "happy" });

  const [isPreAwakeMode, setIsPreAwakeMode] = useState<Record<number, boolean>>({});

  // 🌟 3번 피드백: 자리 바꾸기(Swap) 모드 State 및 클릭 핸들러 추가
  const [isSwapMode, setIsSwapMode] = useState(false);
  const [swapSourceIndex, setSwapSourceIndex] = useState<number | null>(null);

  // 🌟 일반 클릭(멤버 선택창)과 스왑 클릭을 구분해주는 똑똑한 함수!
  const handleSlotClick = (index: number) => {
    if (isSwapMode) {
      if (swapSourceIndex === null) {
        setSwapSourceIndex(index); // 첫 번째 바꿀 카드 선택
      } else {
        // 두 번째 카드를 선택하면 즉시 스왑(교체) 실행!
        const newPresets = [...presets];
        const newDeck = [...newPresets[activeTab]];
        
        const temp = newDeck[swapSourceIndex];
        newDeck[swapSourceIndex] = newDeck[index];
        newDeck[index] = temp;
        
        newPresets[activeTab] = newDeck;
        setPresets(newPresets);
        
        // 🌟 2번 피드백 반영: 교체 완료 후 '첫 번째 선택'만 초기화하고, 스왑 모드는 계속 유지합니다!
        setSwapSourceIndex(null); 
      }
    } else {
      openMemberSelect(index);
    }
  };

  // 🌟 필터 State 확장! (스킬, 캐릭터 추가)
  const [filterAttrs, setFilterAttrs] = useState<string[]>([]);
  const [filterUnits, setFilterUnits] = useState<string[]>([]);
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [filterChars, setFilterChars] = useState<string[]>([]);
  
  const [draftAttrs, setDraftAttrs] = useState<string[]>([]);
  const [draftUnits, setDraftUnits] = useState<string[]>([]);
  const [draftSkills, setDraftSkills] = useState<string[]>([]);
  const [draftChars, setDraftChars] = useState<string[]>([]);

// 🌟 [추가 1] 마랭 데이터를 저장할 State와 무전 수신기(useEffect)
  const [userCardStates, setUserCardStates] = useState<Record<string, { isOwned: boolean, isTarget: boolean, masterRank: number, skillLevel: number }>>({});

  useEffect(() => {
    const loadCardStates = () => {
      // 🌟 내 카드 탭에서 저장하는 바로 그 이름!
      const saved = localStorage.getItem("sekard_user_card_states"); 
      if (saved) {
        try { setUserCardStates(JSON.parse(saved)); } catch (e) {}
      }
    };
    loadCardStates(); // 시뮬레이터 켤 때 내 카드 상태 싹 긁어오기

    // (참고: 내 카드 탭에서 변경 시 즉각 반영되게 하려면 커스텀 이벤트 리스너를 달아도 좋습니다!)
  }, []);

  const currentDeck = presets[activeTab];

  const openMemberSelect = (index: number) => {
    setEditingSlot(index);
    setTempSelectedCard(currentDeck[index] || null); // 현재 카드 상태 복사 (없으면 null)
  };

  const closeMemberSelect = () => {
    setEditingSlot(null);
    setTempSelectedCard(undefined);
  };

  const handleConfirmSelection = () => {
    if (editingSlot === null || tempSelectedCard === undefined) return;
    const newPresets = [...presets];
    const newDeck = [...newPresets[activeTab]];
    
    if (tempSelectedCard === null) {
      newDeck[editingSlot] = null; // 🌟 해제 처리
    } else {
      const existingIndex = newDeck.findIndex(c => c !== null && c.character === tempSelectedCard.character);
      if (existingIndex !== -1 && existingIndex !== editingSlot) {
        newDeck[existingIndex] = newDeck[editingSlot]; 
      }
      newDeck[editingSlot] = tempSelectedCard;
    }
    
    newPresets[activeTab] = newDeck;
    setPresets(newPresets);
    closeMemberSelect();
  };

  const openFilterModal = () => {
    setDraftAttrs(filterAttrs);
    setDraftUnits(filterUnits);
    setDraftSkills(filterSkills);
    setDraftChars(filterChars);
    setIsFilterOpen(true);
  };

  // 🌟 임시 필터 토글 로직 확장
  const toggleDraftFilter = (type: "attr" | "unit" | "skill" | "char", id: string) => {
    if (type === "attr") setDraftAttrs(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    else if (type === "unit") setDraftUnits(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    else if (type === "skill") setDraftSkills(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    else if (type === "char") setDraftChars(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const applyFilter = () => {
    setFilterAttrs(draftAttrs);
    setFilterUnits(draftUnits);
    setFilterSkills(draftSkills);
    setFilterChars(draftChars);
    setIsFilterOpen(false);
  };

  // 🌟 [수정] 성씨 겹침 문제(요이사키 -> 사키)를 완벽 해결한 스마트 번역기!
  const getCharIconName = (fullName?: string) => {
    if (!fullName) return "";
    
    const charNameMap: Record<string, string> = {
      "미쿠": "MIKU", "린": "RIN", "렌": "LEN", "루카": "LUKA", "메이코": "MEIKO", "카이토": "KAITO",
      "이치카": "Ichika", "사키": "Saki", "호나미": "Honami", "시호": "Shiho",
      "미노리": "Minori", "하루카": "Haruka", "아이리": "Airi", "시즈쿠": "Shizuku",
      "코하네": "Kohane", "안": "An", "아키토": "Akito", "토우야": "Touya", 
      "츠카사": "Tsukasa", "에무": "Emu", "네네": "Nene", "루이": "Rui",
      "카나데": "Kanade", "마후유": "Mafuyu", "에나": "Ena", "미즈키": "Mizuki"
    };

    // 🔥 핵심 원인 해결: '요이사키'라는 단어를 임시로 지워버려서 '사키'가 오작동하는 것을 원천 차단!
    const safeName = fullName.replace("요이사키", ""); 

    // 안전해진 이름(safeName)으로 검사 실행
    const foundKey = Object.keys(charNameMap).find(krName => safeName.includes(krName));
    return foundKey ? charNameMap[foundKey] : "";
  };

  // 🌟 1. 스킬 보너스 퍼센트 계산기
const getSkillBonusPercentage = (skillType: string, level: number, unit: string, isAwakened: boolean, charRank: number = 1, isOwned: boolean = false) => {
  const safeLevel = Math.max(1, Math.min(4, level)); 
  const idx = safeLevel - 1;
  const skill = (skillType || "").replace(/\s+/g, "").toLowerCase();

  if (skill.includes("블페") || skill.includes("블룸")) {
    if (isAwakened) {
      const maxLimits = [140, 145, 150, 160];
      if (!isOwned) return maxLimits[idx];
      const bases = [90, 95, 100, 110];
      const bloomBonus = Math.floor(charRank / 2);
      return Math.min(maxLimits[idx], bases[idx] + bloomBonus);
    }
    const isVS = unit === "무소속 / VIRTUAL SINGER" || unit.includes("버싱") || unit.includes("VS") || unit.toLowerCase().includes("virtual");
    return isVS ? [130, 135, 140, 150][idx] : [120, 130, 140, 150][idx];
  }

  if (skill.includes("스업") && !skill.includes("퍼스업") && !skill.includes("굿스업") && !skill.includes("체스업") && !skill.includes("팀스업") && !skill.includes("조건부")) return [100, 105, 110, 120][idx];
  if (skill.includes("퍼스업")) return [110, 115, 120, 130][idx];
  if (skill.includes("굿스업")) return [120, 125, 130, 140][idx];
  if (skill.includes("체스업")) return [120, 125, 130, 140][idx];
  if (skill.includes("팀스업")) return [130, 135, 140, 150][idx];
  if (skill.includes("판강") || skill.includes("판정")) return [80, 85, 90, 100][idx];
  if (skill.includes("힐") || skill.includes("회복")) return [80, 85, 90, 100][idx];

  return 0;
};

// 🌟 2. 스킬명 오마카세 프리미엄 컬러 뱃지
const getSkillBadgeStyle = (skill: string, unitName: string = "") => {
  const premiumStyle = "text-white border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)] [text-shadow:0px_1px_2px_rgba(24,24,27,0.5),0px_0px_3px_rgba(24,24,27,0.2)] shadow-sm";

  if (!skill) return `bg-zinc-400 dark:bg-zinc-500 ${premiumStyle}`;
  const s = skill.replace(/\s+/g, "").toLowerCase();
  
  if (s.includes("팀스업")) {
    const lowerUnit = unitName.toLowerCase();
    let bgColor = "bg-orange-400 dark:bg-orange-500"; 
    
    if (lowerUnit.includes("레오니") || lowerUnit.includes("leo") || lowerUnit === "l/n") bgColor = "bg-[#4455dd]";
    else if (lowerUnit.includes("모모점") || lowerUnit.includes("more") || lowerUnit === "mmj") bgColor = "bg-[#88dd44]";
    else if (lowerUnit.includes("비배스") || lowerUnit.includes("vivid") || lowerUnit === "vbs") bgColor = "bg-[#ee1166]";
    else if (lowerUnit.includes("원더쇼") || lowerUnit.includes("wonder") || lowerUnit === "Wds") bgColor = "bg-[#ff9900]";
    else if (lowerUnit.includes("니고") || lowerUnit.includes("25") || lowerUnit === "ng" || lowerUnit === "niigo") bgColor = "bg-[#884499]";
    else if (lowerUnit.includes("버싱") || lowerUnit.includes("virtual") || lowerUnit === "vs") bgColor = "bg-[#33ccbb]";
    
    return `${bgColor} ${premiumStyle}`;
  }
  
  if (s.includes("퍼스업")) return `bg-[#ff3388] dark:bg-[#ff4499] ${premiumStyle}`;
  if (s.includes("굿스업")) return `bg-sky-400 dark:bg-sky-500 ${premiumStyle}`; 
  if (s.includes("체스업")) return `bg-emerald-400 dark:bg-emerald-500 ${premiumStyle}`; 
  if (s.includes("힐") || s.includes("회복")) return `bg-[#a3e635] dark:bg-[#84cc16] ${premiumStyle}`; 
  if (s.includes("스업")) return `bg-[#15cabb] dark:bg-[#1addcc] ${premiumStyle}`; 
  if (s.includes("판강") || s.includes("판정")) return `bg-violet-400 dark:bg-violet-500 ${premiumStyle}`; 
  
  return `bg-zinc-400 dark:bg-zinc-500 ${premiumStyle}`;
};

  // 🌟 필터링 로직 확장!
  const toggleDraftUnitChars = (chars: string[]) => {
    const isAllSelected = chars.every(c => draftChars.includes(c));
    if (isAllSelected) {
      setDraftChars(prev => prev.filter(c => !chars.includes(c)));
    } else {
      setDraftChars(prev => Array.from(new Set([...prev, ...chars])));
    }
  };

  const filteredCards = ALL_CARDS.filter(card => {
    // 1. 속성 검사
    const matchAttr = filterAttrs.length === 0 || (card.attribute && filterAttrs.includes(card.attribute));
    
    // 2. 스킬 & 캐릭터 검사
    const matchSkill = filterSkills.length === 0 || filterSkills.includes(card.skillType);
    const matchChar = filterChars.length === 0 || filterChars.includes(card.character ?? "");

    // 3. 🌟 유닛 검사 (융통성 로직 적용!)
    const matchUnit = filterUnits.length === 0 || filterUnits.some(targetUnitId => {
      const cleanUnit = (card.unit ?? "").trim().toLowerCase();
      
      // 🌟 대문자 함정 해결! ("leoneed" 소문자로 변경 + "l/n" 복구)
      if (targetUnitId === "ln" && (cleanUnit.includes("레오니") || cleanUnit.includes("leo") || cleanUnit === "leoneed" || cleanUnit === "l/n")) return true;
      if (targetUnitId === "mmj" && (cleanUnit.includes("모모점") || cleanUnit.includes("more") || cleanUnit === "mmj")) return true;
      if (targetUnitId === "vbs" && (cleanUnit.includes("비배스") || cleanUnit.includes("vivid") || cleanUnit === "vbs")) return true;
      // 🌟 원더쇼도 혹시 몰라 "wds" 추가
      if (targetUnitId === "wxs" && (cleanUnit.includes("원더쇼") || cleanUnit.includes("wonder") || cleanUnit === "wxs" || cleanUnit === "wds")) return true;
      if (targetUnitId === "n25" && (cleanUnit.includes("니고") || cleanUnit.includes("25") || cleanUnit === "niigo" || cleanUnit === "ng")) return true;
      if (targetUnitId === "vs" && (cleanUnit.includes("버싱") || cleanUnit.includes("virtual") || cleanUnit === "" || cleanUnit === "vs")) return true;
      
      return false;
    });

    return matchAttr && matchUnit && matchSkill && matchChar;
  });

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-4 relative select-none">
      
      {/* 1. 프리셋 탭 */}
      <div className="flex justify-center">
        <div className="flex items-center bg-zinc-200/50 dark:bg-black/40 p-1.5 rounded-full backdrop-blur-md shadow-inner border border-zinc-300/50 dark:border-white/10">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <button key={idx} onClick={() => setActiveTab(idx)} className={`px-5 py-1.5 md:px-7 md:py-2 rounded-full text-xs md:text-sm font-extrabold transition-all duration-300 ${activeTab === idx ? "bg-white dark:bg-zinc-200 text-zinc-900 shadow-md scale-105" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 hover:bg-white/30"}`}>{`0${idx + 1}`}</button>
          ))}
        </div>
      </div>

      {/* 2. 중앙 5칸 카드 슬롯 (🌟 테마창 먹통 버그 해결: overflow-hidden 삭제!) */}
      <div className="w-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl border border-white/50 dark:border-white/10 relative">
        
        {/* 🌟 수정된 상단 컨트롤 바 (좌측: 실스업 / 우측: 카드 자리 변경) */}
        <div className="w-full flex justify-between items-center mb-2 px-1">
          
          {/* 🌟 3번 피드백: 현재 실스업 UI */}
          <div className="flex items-center gap-1.5 bg-zinc-100/80 dark:bg-zinc-800/80 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm">
            <span className="text-[10px] md:text-xs font-black text-zinc-500 dark:text-zinc-400">현재 실스업</span>
            <img src="/icons/now.png" alt="now" className="w-3 h-3 md:w-3.5 md:h-3.5 object-contain drop-shadow-sm" />
            <span className="text-[#00d0b6] text-xs md:text-sm font-black tracking-tight drop-shadow-sm">
              230% {/* 나중에 실제 계산된 실스업 state로 교체하시면 됩니다! */}
            </span>
            <button className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white text-[9px] md:text-[10px] flex items-center justify-center font-bold ml-0.5 transition-colors">
              i
            </button>
          </div>

          {/* 카드 정렬(자리 바꾸기) 버튼 */}
          <button 
            onClick={() => {
              setIsSwapMode(!isSwapMode);
              setSwapSourceIndex(null);
            }}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-black transition-all shadow-sm flex items-center gap-1 ${
              isSwapMode 
                ? "bg-[#ff529a] text-white border-transparent" 
                : "bg-white text-zinc-600 border border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            {isSwapMode ? "취소하기" : "⇄ 카드 자리 변경"}
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 md:gap-3 mt-2">
          {currentDeck.map((card, index) => {
            // 🌟 1. 카드 기초 데이터 셋업 (레벨, 마랭, 보유 여부 등)
            const isOwned = card ? (userCardStates[card.id]?.isOwned || false) : false;
            const currentMasterRank = (card && isOwned) ? (userCardStates[card.id]?.masterRank || 0) : 0;
            const currentSkillLevel = (card && isOwned) ? (userCardStates[card.id]?.skillLevel || 1) : 1;
            const currentCharRank = (card && isOwned) ? ((userCardStates[card.id] as any)?.charRank || 1) : 1;

            // 🌟 2. 3번 피드백: 동방 / 보카로 악곡 콜라보 체크 (각전 스위치 떼기!)
            const cardInfoStr = card ? [(card as any)?.gacha, (card as any)?.eventName, (card as any)?.prefix, (card as any)?.name].join(" ") : "";
            const isSpecialCollab = ["뒤섞이는 경계", "동방", "Dressed in Melodies", "보카로 악곡", "The Music Style"].some(keyword => cardInfoStr.includes(keyword));
            
            // 실제 각성 상태 계산 (콜라보 카드는 강제로 각후(true) 취급!)
            const isActuallyAwakened = isSpecialCollab ? true : !isPreAwakeMode[index];

            // 🌟 3. 기획자님의 장인정신 함수 2종 세트 가동! (스킬 퍼센트 계산 & 프리미엄 뱃지 스타일)
            const calculatedSkillBonus = card ? getSkillBonusPercentage(card.skillType, currentSkillLevel, card.unit, isActuallyAwakened, currentCharRank, isOwned) : 0;
            const badgeStyle = card ? getSkillBadgeStyle(card.skillType, card.unit) : "";

            return (
              <div 
                key={index} 
                onClick={() => handleSlotClick(index)} 
                className={`relative w-full aspect-[11/15] bg-[#c3c9d6] dark:bg-zinc-800/80 rounded-[12px] md:rounded-[16px] cursor-pointer border-[2px] md:border-[3px] transition-all duration-200 shadow-sm group z-0 mt-8 md:mt-10 ${
                  swapSourceIndex === index 
                    ? "border-[#ff529a] scale-105 shadow-md ring-4 ring-[#ff529a]/30" 
                    : "border-transparent hover:border-teal-400"
                }`}
              >
                
                {/* 🌟 1번 피드백: 미니 아이콘 + 큼직한 스킬 수치 + 프리미엄 팔레트 뱃지! */}
                {card && (
                  <div className="absolute -top-[32px] left-1 md:-top-[44px] md:left-0 z-50 flex items-end gap-0.5 pointer-events-none">
                    {/* 미니 아이콘 */}
                    <div className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md">
                      <img src={`/icons/characters/${getCharIconName(card.character)}_icon.png`} alt={card.character} className="w-full h-full object-contain" />
                    </div>
                    
                    {/* 네모 박스 삭제! 텍스트 대폭 확대! */}
                    <div className="relative flex items-end mb-1 md:mb-2.5 ml-0.5">
                      <span className="text-white text-[15px] md:text-[18px] font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-none tracking-tighter">
                        ▸{calculatedSkillBonus}%
                      </span>
                      
                      {/* 🌟 기획자님의 프리미엄 컬러 뱃지 적용! (badgeStyle 100% 반영) */}
                      <div className={`absolute -top-[1px] -right-[22px] translate-x-full text-[7px] md:text-[10px] font-black px-1.5 py-[2px] rounded-[5px] whitespace-nowrap ${badgeStyle}`}>
                        {card.skillType || "스코어 업"}
                      </div>
                    </div>
                  </div>
                )}

                {/* 🌟 카드 내부 콘텐츠 */}
                <div className="absolute inset-0 w-full h-full rounded-[10px] md:rounded-[13px] overflow-hidden flex items-center justify-center">
                  
                  {/* 리더 띠 (미선택 시 고정 유지) */}
                  {index === 0 && (
                    <div className="absolute top-[14px] -right-[28px] w-[90px] md:top-[5px] md:-right-[28px] md:w-[110px] bg-[#e93b81] text-white text-[8px] md:text-[9px] font-black text-center py-[1px] md:py-[1.5px] rotate-[28deg] shadow-sm z-30 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] tracking-wide pl-[4px] md:pl-[8px]">
                      리더
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute top-[14px] -right-[28px] w-[90px] md:top-[6px] md:-right-[28px] md:w-[110px] bg-[#00b8a0] text-white text-[8px] md:text-[9px] font-black text-center py-[1px] md:py-[1.5px] rotate-[28deg] shadow-sm z-30 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] tracking-wide pl-[4px] md:pl-[8px]">
                      서브 리더
                    </div>
                  )}

                  {card ? (
                    <>
                      {/* 🌟 각전/각후 이미지 (콜라보 카드는 강제로 각후(post) 적용!) */}
                      <img 
                        src={!isActuallyAwakened 
                          ? card.preAwakePath?.replace("pre.png", "cutout_pre.png") 
                          : card.postAwakePath?.replace("post.png", "cutout_post.png").replace("pre.png", "cutout_pre.png")
                        } 
                        alt="카드" 
                        className="w-full h-full object-cover object-[center_15%]" 
                      />
                      
                      {/* 속성 클립 */}
                      {card.attribute && (
                        <div className="absolute top-0 left-[5px] md:left-[5px] w-[24px] h-[28px] md:w-[28px] md:h-[30px] z-30 drop-shadow-sm">
                          <img src={`/icons/attr_clip_${card.attribute.toLowerCase()}.png`} alt={card.attribute} className="w-full h-full object-contain" />
                        </div>
                      )}

                      {/* 무지개 띠 */}
                      <div className="absolute top-0 left-0 w-full h-[4px] md:h-[5px] bg-[linear-gradient(90deg,#ff8fa3_0%,#ffdf85_33%,#85ffb9_66%,#7be0ff_100%)] z-20 opacity-90" />
                      <div className="absolute bottom-0 left-0 w-full h-[4px] md:h-[5px] bg-[linear-gradient(90deg,#7be0ff_0%,#c88dff_50%,#ff8fa3_100%)] z-20 opacity-90" />

                      {/* 별 크기 확대 및 각전각후 토글 */}
                      <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 flex flex-col justify-end pl-1 md:pl-1 pb-2.5">
                        <div className="flex gap-[1.5px] mb-1.5 drop-shadow-md">
                          {[1, 2, 3, 4].map(starNum => (
                            <img key={starNum} src={!isActuallyAwakened ? "/icons/pre_star.png" : "/icons/post_star.png"} alt="star" className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] object-contain" />
                          ))}
                        </div>

                        {/* 🌟 3번 피드백: 콜라보 카드가 아닐 때만 토글 스위치 노출! */}
                        {!isSpecialCollab && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation(); 
                              setIsPreAwakeMode(prev => ({ ...prev, [index]: !prev[index] }));
                            }}
                            className="flex items-center gap-1.5 w-fit cursor-pointer bg-black/40 hover:bg-black/60 px-1.5 py-0.5 rounded-full border border-white/20 transition-colors backdrop-blur-sm pointer-events-auto"
                          >
                            <span className="text-white text-[8px] md:text-[9px] font-black">{isPreAwakeMode[index] ? "각전" : "각후"}</span>
                            <div className={`w-5 h-2.5 md:w-6 md:h-3 rounded-full relative transition-colors ${isPreAwakeMode[index] ? "bg-zinc-500" : "bg-teal-400"}`}>
                              <div className={`absolute top-[1px] w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full transition-all shadow-sm ${isPreAwakeMode[index] ? "left-[1px]" : "left-[11px] md:left-[13px]"}`} />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#aab1c1] transition-colors duration-300 group-hover:text-teal-400">
                      <span className="text-4xl md:text-5xl font-light leading-none -mt-2 drop-shadow-sm">+</span>
                    </div>
                  )}
                </div>

                {/* 마랭 뱃지 */}
                {card && currentMasterRank > 0 && (
                  <div className="absolute -bottom-1.5 -right-1.5 w-10 h-10 md:w-12 md:h-12 z-50 drop-shadow-md transition-transform duration-300 group-hover:scale-[0.95] origin-bottom-right">
                    <img src={`/icons/mr_${currentMasterRank}.png`} alt={`마랭`} className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. 하단 컨트롤 패널 (생략: 기존 코드 유지) */}


      {/* ==========================================
          🌟 4. 멤버 선택 모달 (해제 버튼 복구!)
      ========================================== */}
      {editingSlot !== null && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={closeMemberSelect}>
          <div className="bg-[#6b7280] dark:bg-zinc-900 w-full max-w-5xl h-[85vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden border-4 border-white/20" onClick={(e) => e.stopPropagation()}>
            
            {/* 상단 툴바 */}
            <div className="flex items-center justify-between p-3 md:p-4 bg-black/20 shrink-0">
              <h3 className="text-lg md:text-xl font-bold text-white pl-2">멤버 선택</h3>
              
              <div className="flex items-center gap-2 md:gap-3">
                {/* 🌟 꽉 찬 깔때기 아이콘 적용! */}
                <button onClick={openFilterModal} className={`w-9 h-9 flex items-center justify-center rounded-full shadow-sm transition-colors ${filterAttrs.length > 0 || filterUnits.length > 0 || filterSkills.length > 0 || filterChars.length > 0 ? "bg-teal-400 text-white" : "bg-white/90 text-zinc-700 hover:bg-white"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6.58579C21 6.851 20.8946 7.10536 20.7071 7.29289L14 14V20C14 20.3703 13.7951 20.708 13.4682 20.8715L10.4682 22.3715C9.91414 22.6485 9.25 22.2458 9.25 21.5V14L2.29289 7.29289C2.10536 7.10536 2 6.851 2 6.58579V4C2 3.44772 2.44772 3 3 3H3Z"/>
                  </svg>
                </button>
                <button onClick={() => { setFilterAttrs([bonusTarget.attr]); setFilterUnits([bonusTarget.unit]); }} className="px-4 py-1.5 bg-white/90 hover:bg-white text-zinc-700 font-bold rounded-full text-sm shadow-sm transition-colors">이벤트 보너스</button>
                <button onClick={closeMemberSelect} className="w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-red-500 font-bold transition-colors ml-2">✕</button>
              </div>
            </div>

            {/* 카드 리스트 구역 */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-transparent">
              <div className="flex flex-wrap gap-2 md:gap-3 items-start content-start">
                
                {/* 🌟 기존에 있던 앙증맞은 해제 버튼 복구! */}
                <div 
                  onClick={() => setTempSelectedCard(null)} 
                  className={`relative w-[76px] h-[76px] md:w-[84px] md:h-[84px] cursor-pointer hover:scale-105 transition-all rounded-lg overflow-hidden shadow-sm flex flex-col items-center justify-center shrink-0 bg-white dark:bg-zinc-800
                    ${tempSelectedCard === null ? "border-[4px] border-teal-400 scale-105 z-10" : "border-2 border-dashed border-zinc-400"}`}
                >
                  <span className="text-2xl text-zinc-400 mb-0.5">✕</span>
                  <span className="text-[10px] font-bold text-zinc-500">해제</span>
                </div>

                {filteredCards.map((card) => {
                  const isEquipped = currentDeck.some(c => c?.character === card.character); 
                  const isSelected = tempSelectedCard?.id === card.id;
                  
                  // 🌟 [수정 3-1] 내 카드 탭과 동일한 우물에서 '이 카드'의 진짜 마랭 데이터 찾기!
                  const isOwned = userCardStates[card.id]?.isOwned || false;
                  const currentMasterRank = isOwned ? (userCardStates[card.id]?.masterRank || 0) : 0;

                  return (
                    <div 
                      key={card.id} 
                      onClick={() => setTempSelectedCard(card)}
                      // 🌟 [중요] 여기도 뱃지가 튀어나오게 바깥쪽 overflow-hidden을 뺐습니다!
                      className={`relative w-[76px] h-[76px] md:w-[84px] md:h-[84px] cursor-pointer hover:scale-105 transition-all rounded-lg shadow-sm shrink-0 bg-zinc-800
                        ${isSelected ? "border-[4px] border-teal-400 scale-105 z-10" : "border-2 border-transparent"}
                      `}
                    >
                      {/* 🌟 안쪽 이미지 틀에만 overflow-hidden 씌우기 */}
                      <div className="w-full h-full overflow-hidden rounded-md relative z-0">
                        <img src={card.thumbPostPath} alt="카드" loading="lazy" decoding="async" className="w-full h-full object-cover object-[center_15%]" />
                        {isEquipped && !isSelected && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"><span className="text-white text-[9px] font-bold px-2 py-1 bg-pink-500/90 rounded-sm">편성 중</span></div>
                        )}
                      </div>

                      {/* 🌟 4번 피드백: 마랭 고화질 뱃지 이미지 교체! (띠, 클립 없음) */}
                      {currentMasterRank > 0 && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 z-30 drop-shadow-md transition-transform duration-300 group-hover:scale-[0.95] origin-bottom-right">
                      <img src={`/icons/mr_${currentMasterRank}.png`} alt={`마랭 ${currentMasterRank}`} className="w-full h-full object-contain" />
                      </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 하단 비교 & 결정 구역 */}
            <div className="h-20 bg-[#5c6375] dark:bg-zinc-800 border-t border-white/10 flex items-center justify-between px-4 md:px-8 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-md bg-black/30 overflow-hidden border border-white/20">
                    {currentDeck[editingSlot] && <img src={currentDeck[editingSlot]!.thumbPostPath} className="w-full h-full object-cover object-top" />}
                  </div>
                  <span className="text-teal-300 font-black text-lg">▶</span>
                  <div className="w-12 h-12 rounded-md bg-black/30 overflow-hidden border border-white/20 flex items-center justify-center">
                    {tempSelectedCard === null ? <span className="text-white/50 text-xl font-light">✕</span> : tempSelectedCard && <img src={tempSelectedCard.thumbPostPath} className="w-full h-full object-cover object-top" />}
                  </div>
                </div>
                <div className="flex flex-col ml-4">
                  <span className="text-white/70 text-[10px] font-bold">예상 실스업 변화</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-bold">120%</span>
                    <span className="text-teal-300 text-xs font-bold">▲ 15%</span>
                  </div>
                </div>
              </div>
              <button onClick={handleConfirmSelection} className="px-8 py-2.5 bg-teal-400 hover:bg-teal-300 text-white text-sm font-extrabold rounded-full shadow-lg transition-colors">결정</button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          🌟 5. 하얀색 팝업: 조건 커스텀 필터 모달 (스킬/캐릭터 추가!)
      ========================================== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up border border-zinc-200">
            
            <div className="flex justify-end p-3 pb-0 shrink-0">
              <button onClick={() => setIsFilterOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 font-bold transition-colors">✕</button>
            </div>

            {/* 🌟 내부 스크롤 적용 (내용이 길어져도 안전!) */}
            <div className="px-6 pb-2 overflow-y-auto flex-1">
              
              {/* 간단 필터링 */}
              <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                <h4 className="text-xs font-bold text-zinc-400 mb-3">간단 필터링</h4>
                <div className="flex gap-2">
                  <button onClick={() => { setDraftUnits([]); setDraftAttrs([]); setDraftSkills([]); setDraftChars([]); }} className="flex-1 py-2 rounded-full border border-zinc-300 text-zinc-700 text-sm font-bold hover:bg-zinc-50">전체</button>
                  <button onClick={() => { setDraftUnits([bonusTarget.unit]); setDraftAttrs([bonusTarget.attr]); }} className="flex-1 py-2 rounded-full border border-zinc-300 text-zinc-700 text-sm font-bold hover:bg-zinc-50">이벤트 보너스</button>
                </div>
              </div>

              {/* 조건 커스텀 */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 mb-3">조건 커스텀</h4>
                
                {/* 1. 유닛/서브 유닛 (크기 확대) */}
                <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-3">유닛/서브 유닛</span>
                  <div className="grid grid-cols-4 gap-3">
                    <button onClick={() => setDraftUnits([])} className="flex items-center gap-2">
                      <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${draftUnits.length === 0 ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftUnits.length === 0 ? "bg-teal-400" : "bg-transparent"}`} /></div>
                      <span className="text-xs font-bold text-zinc-700">전체</span>
                    </button>
                    {UNIT_LIST.map(u => (
                      <button key={u.id} onClick={() => toggleDraftFilter("unit", u.id)} className="flex items-center gap-2">
                        <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${draftUnits.includes(u.id) ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftUnits.includes(u.id) ? "bg-teal-400" : "bg-transparent"}`} /></div>
                        {/* 🌟 유닛 로고 크기 큼직하게 확대 (h-6 -> h-7) */}
                        <img src={`/icons/${u.img}.png`} alt={u.name} className="w-auto h-7 object-contain drop-shadow-sm" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. 타입(속성) (크기 확대) */}
                <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-3">타입</span>
                  <div className="grid grid-cols-4 gap-3">
                    <button onClick={() => setDraftAttrs([])} className="flex items-center gap-2">
                      <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${draftAttrs.length === 0 ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftAttrs.length === 0 ? "bg-teal-400" : "bg-transparent"}`} /></div>
                      <span className="text-xs font-bold text-zinc-700">전체</span>
                    </button>
                    {ATTR_LIST.map(a => (
                      <button key={a.id} onClick={() => toggleDraftFilter("attr", a.id)} className="flex items-center gap-2">
                        <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${draftAttrs.includes(a.id) ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftAttrs.includes(a.id) ? "bg-teal-400" : "bg-transparent"}`} /></div>
                        {/* 🌟 속성 뱃지 크기 큼직하게 확대 (w-7 h-7) */}
                        <img src={`/icons/attrs/${a.id}.png`} alt={a.name} className="w-7 h-7 object-contain drop-shadow-sm" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 🌟 3. 스킬 구역 (소제목 분리!) */}
                <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-3">스킬</span>
                  <div className="flex flex-col gap-2.5">
                    {/* 일반 스킬 */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <button onClick={() => setDraftSkills([])} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${draftSkills.length === 0 ? "bg-teal-400 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>전체</button>
                      {SKILL_GENERAL.map(skill => (
                        <button key={skill} onClick={() => toggleDraftFilter("skill", skill)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${draftSkills.includes(skill) ? "bg-teal-400 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
                          {skill}
                        </button>
                      ))}
                    </div>
                    {/* 특수 스킬 (스업) */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="px-2 py-1 bg-zinc-200/60 dark:bg-zinc-800 rounded-md text-[10px] font-bold text-zinc-500 shadow-inner">스업 (특수)</span>
                      {SKILL_SPECIAL.map(skill => (
                        <button key={skill} onClick={() => toggleDraftFilter("skill", skill)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${draftSkills.includes(skill) ? "bg-teal-400 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 🌟 4. 캐릭터 구역 (이미지 뱃지 그룹화 시스템!) */}
                <div className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-zinc-500">캐릭터</span>
                    <button onClick={() => setDraftChars([])} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${draftChars.length === 0 ? "bg-teal-400 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>전체 해제</button>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {UNIT_LIST.map(unit => {
                      const isAllSelected = unit.chars.every(c => draftChars.includes(c));
                      
                      return (
                        <div key={unit.id} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/30 p-1.5 rounded-2xl border border-zinc-100 dark:border-white/5 overflow-x-auto scrollbar-hide">
                          
                          {/* 🌟 유닛 전체 선택 뱃지 (유닛이름_icon.png) */}
                          <button 
                            onClick={() => toggleDraftUnitChars(unit.chars)}
                            className={`shrink-0 relative w-9 h-9 md:w-10 md:h-10 rounded-full transition-all border-[2px] bg-white dark:bg-zinc-900 ${isAllSelected ? "border-teal-400 scale-105 shadow-sm" : "border-zinc-200 dark:border-zinc-700 hover:border-teal-300"}`}
                            title={`${unit.name} 전체 선택`}
                          >
                            <img src={`/icons/${unit.img}_icon.png`} alt={unit.name} className="w-full h-full object-contain p-1" />
                            {isAllSelected && <div className="absolute -top-1 -right-1 bg-teal-400 rounded-full w-3.5 h-3.5 border-[2px] border-white dark:border-zinc-900 shadow-sm" />}
                          </button>

                          {/* 구분선 */}
                          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 shrink-0 mx-1" />

                          {/* 🌟 개별 캐릭터 뱃지 (캐릭터이름_icon.png) */}
                          {unit.chars.map(char => {
                            const isSelected = draftChars.includes(char);
                            return (
                              <button 
                                key={char} 
                                onClick={() => toggleDraftFilter("char", char)}
                                className={`shrink-0 relative w-9 h-9 md:w-10 md:h-10 rounded-full transition-all border-[2px] bg-white dark:bg-zinc-900 ${isSelected ? "border-teal-400 scale-105 shadow-sm" : "border-transparent opacity-60 hover:opacity-100 hover:border-teal-200"}`}
                                title={char}
                              >
                                <img src={`/icons/${char}_icon.png`} alt={char} className="w-full h-full object-cover rounded-full" />
                              </button>
                            )
                          })}
                          
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* 하단 취소 / 결정 버튼 (고정) */}
            <div className="flex bg-zinc-100 p-4 gap-3 shrink-0">
              <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-2.5 bg-white border border-zinc-300 rounded-full text-zinc-600 font-bold shadow-sm hover:bg-zinc-50 transition-colors">취소</button>
              <button onClick={applyFilter} className="flex-1 py-2.5 bg-teal-400 rounded-full text-white font-bold shadow-sm hover:bg-teal-300 transition-colors">결정</button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}