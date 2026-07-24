// src/components/CardDetailModal.tsx
"use client";

import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page";
import ModalCostumePreviewCard from "@/components/ModalCostumePreviewCard";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useThemeColor } from "@/app/providers"; 

// =========================================================================
// 🌟 1. 스킬 보너스 계산 엔진
// =========================================================================
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

// =========================================================================
// 🌟 2. 스킬 툴팁(말풍선) 텍스트 생성기
// =========================================================================
export const getSkillTooltipText = (skillType: string, level: number, unit: string, isAwakened: boolean, charRank: number = 1, isOwned: boolean = false) => {
  const safeLevel = Math.max(1, Math.min(4, level));
  const idx = safeLevel - 1;
  const skill = (skillType || "").replace(/\s+/g, "").toLowerCase();

  if (skill.includes("블페") || skill.includes("블룸")) {
    const isVS = unit === "무소속 / VIRTUAL SINGER" || unit.includes("버싱") || unit.includes("VS") || unit.toLowerCase().includes("virtual");
    if (isAwakened) {
      const maxLimits = [140, 145, 150, 160];
      const bases = [90, 95, 100, 110];
      if (!isOwned) return `기본 ${bases[idx]}% + 캐랭 보너스 = 최대 ${maxLimits[idx]}% (미보유 시 최대치)`;
      const bloomBonus = Math.floor(charRank / 2);
      const finalScore = Math.min(maxLimits[idx], bases[idx] + bloomBonus);
      return `기본 ${bases[idx]}% + 캐랭 보너스 ${bloomBonus}% (랭크 ${charRank}) = 최종 ${finalScore}% (최대 ${maxLimits[idx]}% 제한)`;
    } else {
      return isVS 
        ? `기본 ${[70, 75, 80, 90][idx]}% + 타 유닛 편성 보너스 최대 = ${[130, 135, 140, 150][idx]}% (특훈 전)`
        : `기본 ${[60, 65, 70, 80][idx]}% + 파티원 비례 추가 보너스 = 최대 ${[120, 130, 140, 150][idx]}% (특훈 전)`;
    }
  }

  if (skill.includes("스업") && !skill.includes("퍼스업") && !skill.includes("굿스업") && !skill.includes("체스업") && !skill.includes("팀스업") && !skill.includes("조건부")) {
    return `5초 동안 스코어 ${[100, 105, 110, 120][idx]}% 상승 (조건 없음)`;
  }
  if (skill.includes("퍼스업")) return `5초 동안 PERFECT 판정 시에만 스코어 ${[110, 115, 120, 130][idx]}% 상승`;
  if (skill.includes("굿스업")) return `기본 ${[70, 75, 80, 90][idx]}% 상승 / GOOD 이하 판정 전까지 최대 ${[120, 125, 130, 140][idx]}% 상승`;
  if (skill.includes("체스업")) return `라이프 800 미만 ${[70, 75, 80, 90][idx]}%, 이상 ${[100, 105, 110, 120][idx]}% / 라이프 비례 최대 ${[120, 125, 130, 140][idx]}% 상승`;
  if (skill.includes("팀스업")) return `기본 ${[80, 85, 90, 100][idx]}% 상승 / 소속 일치 인원 비례 최대 ${[130, 135, 140, 150][idx]}% 상승`;
  if (skill.includes("판강") || skill.includes("판정")) return `${[5.5, 6, 6.5, 7][idx]}초간 BAD 이상을 PERFECT로 강화 / 스코어 ${[80, 85, 90, 100][idx]}% 상승`;
  if (skill.includes("힐") || skill.includes("회복")) return `라이프 ${[350, 400, 450, 500][idx]} 회복 / 5초 동안 스코어 ${[80, 85, 90, 100][idx]}% 상승`;

  return "스킬 상세 정보가 없습니다.";
};


interface CardDetailModalProps {
  card: FinalCardInfo | null;
  userState: UserCardState;
  onUpdateState: (id: string, newState: Partial<UserCardState>) => void;
  onClose: () => void;
  globalSettings?: any; 
}

export default function CardDetailModal({
  card,
  userState,
  onUpdateState,
  onClose,
  globalSettings,
}: CardDetailModalProps) {
  const { themeColor } = useThemeColor();

  const [isExpandMode, setIsExpandMode] = useState(false);
  const [simSkillLevel, setSimSkillLevel] = useState(1);
  const [simMasterRank, setSimMasterRank] = useState(0);
  const [characterRank, setCharacterRank] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState("status");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<'pre' | 'post' | null>(null); 
  
  const [isSimAwakened, setIsSimAwakened] = useState(card?.hasAwakening ? true : false);
  const [simMode, setSimMode] = useState<'skill' | 'bonus'>('skill'); 

  useEffect(() => {
    setMounted(true); 
    if (card) {
      setActiveMobileTab("status");
      setIsExpandMode(false); 
      setIsSimAwakened(card.hasAwakening ? true : false);
      setSimMode('skill'); 

      const saved = localStorage.getItem("sekard_character_ranks");
      if (saved) {
        try {
          const ranks = JSON.parse(saved);
          setCharacterRank(ranks[card.character] || 1);
        } catch(e) {}
      }
    }
  }, [card]);

  if (!card || !mounted) return null;

  const postIllustration = card.thumbPostPath 
    ? card.thumbPostPath.replace("thumb_post.png", "post.png") : "";
  const preIllustration = card.thumbPostPath 
    ? card.thumbPostPath.replace("thumb_post.png", "pre.png") : "";

  const hasCostume = !!card.costume;
  const attribute = card.attribute || "속성";

  const songNames = Array.isArray(card.songName) ? card.songName : (card.songName ? [card.songName] : []);
  const songJackets = Array.isArray(card.songJacketPath) ? card.songJacketPath : (card.songJacketPath ? [card.songJacketPath] : []);
  const hasSong = songNames.length > 0 || songJackets.length > 0;
  
  const hasEvent = !!card.eventName;
  const hasGacha = !!card.gachaPoolName; 

  const isReleased = card.releaseDate ? new Date(card.releaseDate) <= new Date() : false;

  const currentSkillLevel = userState.isOwned ? (userState.skillLevel || 1) : simSkillLevel;
  const currentMasterRank = userState.isOwned ? (userState.masterRank || 0) : simMasterRank;

  const actualCharRank = globalSettings?.charRanks?.[card.character] || characterRank;

  const isBloomFes = (card.skillType || "").replace(/\s+/g, "").toLowerCase().includes("블페") || (card.skillType || "").replace(/\s+/g, "").toLowerCase().includes("블룸");

  const calculatedSkillBonus = getSkillBonusPercentage(card.skillType || "", currentSkillLevel, card.unit || "", isSimAwakened, actualCharRank, userState.isOwned);
  const tooltipText = getSkillTooltipText(card.skillType || "", currentSkillLevel, card.unit || "", isSimAwakened, actualCharRank, userState.isOwned);

  const costumePreviewData = hasCostume && card.costume ? {
    title: card.cardName,
    subtitle: card.costume.name,
    characters: [
      {
        name: card.character,
        sets: card.costume.sets.map((set) => ({
          key: set.key, label: set.label, front: [set.front], back: [set.back]
        }))
      }
    ]
  } : null;

  const getGachaBadgeStyle = (gachaType: string) => {
    switch (gachaType) {
      case "통상": return "border-sky-300/45 bg-sky-50 dark:bg-sky-400/16 text-sky-600 dark:text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]";
      case "한정": return "border-pink-300/45 bg-pink-50 dark:bg-pink-400/16 text-pink-600 dark:text-pink-100 shadow-[0_0_0_1px_rgba(236,72,153,0.18)]";
      case "페스": return "border-violet-300/45 bg-violet-50 dark:bg-violet-400/16 text-violet-600 dark:text-violet-100 shadow-[0_0_0_1px_rgba(167,139,250,0.20)]";
      case "월링": return "border-emerald-300/45 bg-emerald-50 dark:bg-emerald-400/16 text-emerald-600 dark:text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.18)]";
      case "콜라보": return "border-amber-300/45 bg-amber-50 dark:bg-amber-400/16 text-amber-600 dark:text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.18)]";
      default: return "border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm";
    }
  };

  const getAttrInfo = (attr: string) => {
    const key = attr.toLowerCase();
    if (key === "pure" || key === "퓨어") return { src: "/icons/attrs/pure.png", label: "퓨어" };
    if (key === "happy" || key === "해피") return { src: "/icons/attrs/happy.png", label: "해피" };
    if (key === "cute" || key === "큐트") return { src: "/icons/attrs/cute.png", label: "큐트" };
    if (key === "mysterious" || key === "미스테리어스") return { src: "/icons/attrs/mysterious.png", label: "미스테리어스" };
    if (key === "cool" || key === "쿨") return { src: "/icons/attrs/cool.png", label: "쿨" };
    return { src: "", label: attr };
  };

  const getSkillInfo = (skill: string) => {
    if (!skill) return { src: "", label: "" };
    if (skill === "스업") return { src: "/icons/skills/score_x.png", label: "스업" };
    if (["퍼스업", "굿스업", "체스업", "블페", "팀스업"].includes(skill)) return { src: "/icons/skills/condition_x.png", label: skill }; 
    if (skill === "판강") return { src: "/icons/skills/perfect_x.png", label: "판정 강화" };
    if (skill === "힐") return { src: "/icons/skills/heal_x.png", label: "라이프 회복" };
    return { src: "", label: skill };
  };

  const getCharacterIcon = (charName: string, unitName: string) => {
    const originalMap: Record<string, string> = {
      "호시노 이치카": "Ichika", "텐마 사키": "Saki", "모치즈키 호나미": "Honami", "히노모리 시호": "Shiho",
      "하나사토 미노리": "Minori", "키리타니 하루카": "Haruka", "모모이 아이리": "Airi", "히노모리 시즈쿠": "Shizuku",
      "아즈사와 코하네": "Kohane", "시라이시 안": "An", "시노노메 아키토": "Akito", "아오야기 토우야": "Toya",
      "텐마 츠카사": "Tsukasa", "오토리 에무": "Emu", "쿠사나기 네네": "Nene", "카미시로 루이": "Rui",
      "요이사키 카나데": "Kanade", "아사히나 마후유": "Mafuyu", "시노노메 에나": "Ena", "아키야마 미즈키": "Mizuki"
    };
    if (originalMap[charName]) return `/icons/characters/${originalMap[charName]}.png`;

    const vsMap: Record<string, string> = {
      "하츠네 미쿠": "MIKU", "미쿠": "MIKU", "카가미네 린": "RIN", "린": "RIN", "카가미네 렌": "REN", "렌": "REN",
      "메구리네 루카": "LUKA", "루카": "LUKA", "MEIKO": "MEIKO", "메이코": "MEIKO", "KAITO": "KAITO", "카이토": "KAITO"
    };

    if (vsMap[charName]) {
      const vsBase = vsMap[charName];
      let suffix = "_0"; 
      const unit = unitName.toLowerCase();
      if (unit.includes("레오니") || unit.includes("leo") || unit === "l/n") suffix = "_l";
      else if (unit.includes("모모점") || unit.includes("more") || unit === "mmj") suffix = "_m";
      else if (unit.includes("비배스") || unit.includes("vivid") || unit === "vbs") suffix = "_v";
      else if (unit.includes("원더쇼") || unit.includes("wonder") || unit === "Wds") suffix = "_w";
      else if (unit.includes("니고") || unit.includes("25") || unit === "ng" || unit === "niigo") suffix = "_n";

      return `/icons/characters/${vsBase}${suffix}.png`;
    }
    return card.iconPath || ""; 
  };

  const getUnitLogo = (unitName: string) => {
    if (!unitName) return "";
    const lowerUnit = unitName.toLowerCase();
    if (lowerUnit.includes("레오니") || lowerUnit.includes("leo") || lowerUnit === "l/n") return "/icons/Leoneed.png";
    if (lowerUnit.includes("모모점") || lowerUnit.includes("more") || lowerUnit === "mmj") return "/icons/MMJ.png";
    if (lowerUnit.includes("비배스") || lowerUnit.includes("vivid") || lowerUnit === "vbs") return "/icons/VBS.png";
    if (lowerUnit.includes("원더쇼") || lowerUnit.includes("wonder") || lowerUnit === "Wds") return "/icons/Wds.png";
    if (lowerUnit.includes("니고") || lowerUnit.includes("25") || lowerUnit === "ng" || lowerUnit === "niigo") return "/icons/Niigo.png";
    if (lowerUnit.includes("버싱") || lowerUnit.includes("virtual") || lowerUnit === "vs") return "/icons/VS.png";
    return "";
  };

  // 🎨 스킬명 오마카세 컬러 뱃지
  const getSkillBadgeStyle = (skill: string) => {
    if (!skill) return "bg-zinc-500 dark:bg-zinc-600 text-white shadow-sm";
    const s = skill.replace(/\s+/g, "").toLowerCase();
    
    if (s.includes("퍼스업")) return "bg-fuchsia-500 dark:bg-fuchsia-600 text-white shadow-sm";
    if (s.includes("굿스업")) return "bg-teal-500 dark:bg-teal-600 text-white shadow-sm";
    if (s.includes("체스업") || s.includes("힐") || s.includes("회복")) return "bg-green-500 dark:bg-green-600 text-white shadow-sm"; 
    if (s.includes("팀스업")) return "bg-orange-500 dark:bg-orange-600 text-white shadow-sm";
    if (s.includes("스업")) return "bg-blue-500 dark:bg-blue-600 text-white shadow-sm";
    if (s.includes("판강") || s.includes("판정")) return "bg-violet-500 dark:bg-violet-600 text-white shadow-sm";
    
    return "bg-zinc-500 dark:bg-zinc-600 text-white shadow-sm";
  };

  const currentGachaStyle = getGachaBadgeStyle(card.gachaType);
  const attrInfo = getAttrInfo(attribute);
  const skillInfo = getSkillInfo(card.skillType || ""); 
  const characterIconPath = getCharacterIcon(card.character || "", card.unit || ""); 

  const ModalHeader = (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        {getUnitLogo(card.unit || "") && (
          <img src={getUnitLogo(card.unit || "")} alt={card.unit} className="h-[28px] w-auto object-contain drop-shadow-sm dark:drop-shadow-md" />
        )}
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 transition-colors">
          {isReleased && <span className="text-[16px] drop-shadow-sm" title="한국 서버 출시됨">🇰🇷</span>}
          {card.cardName}
        </h2>
        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors">{card.character}</span>
      </div>
      
      <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
        {skillInfo.src ? (
          <div 
            className="relative group flex items-center justify-center cursor-help"
            onClick={() => setActiveTooltip(prev => prev === 'skill' ? null : 'skill')}
            onMouseLeave={() => setActiveTooltip(null)} 
          >
            <img src={skillInfo.src} alt={skillInfo.label} className="w-[26px] h-[26px] object-contain drop-shadow-sm dark:drop-shadow-md shrink-0" />
            <div className={`pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 transition-all duration-200 z-50 ${activeTooltip === 'skill' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-950 px-2.5 py-1.5 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 shadow-xl transition-colors">{skillInfo.label}</div>
                <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-950 transition-colors"></div>
              </div>
            </div>
          </div>
        ) : (
          skillInfo.label && (
            <span className="shrink-0 inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full border border-purple-300 dark:border-purple-500/20 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 tracking-wide transition-colors">
              {skillInfo.label}
            </span>
          )
        )}
        {attrInfo.src ? (
          <div 
            className="relative group flex items-center justify-center cursor-help ml-0.5"
            onClick={() => setActiveTooltip(prev => prev === 'attr' ? null : 'attr')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <img src={attrInfo.src} alt={attrInfo.label} className="w-[26px] h-[26px] object-contain drop-shadow-sm dark:drop-shadow-md shrink-0" />
            <div className={`pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 transition-all duration-200 z-50 ${activeTooltip === 'attr' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-950 px-2.5 py-1.5 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 shadow-xl transition-colors">{attrInfo.label}</div>
                <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-950 transition-colors"></div>
              </div>
            </div>
          </div>
        ) : (
          <span className="shrink-0 inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 tracking-wide ml-0.5 transition-colors">{attrInfo.label}</span>
        )}
        <span className={`shrink-0 inline-flex items-center px-3 py-1 text-xs font-bold rounded-full border tracking-wide transition-all ml-0.5 ${currentGachaStyle}`}>
          {card.gachaType}
        </span>
      </div>
    </>
  );

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 bg-white/70 dark:bg-black/80 backdrop-blur-md transition-colors duration-300"
      style={{ zIndex: 99999 }} 
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <div 
        style={{
          "--mix-bg": "color-mix(in srgb, var(--color-primary) 15%, transparent)",
          "--mix-border": "var(--color-primary)",
          "--mix-text-light": "color-mix(in srgb, var(--color-primary) 40%, black)",
          "--mix-text-dark": "color-mix(in srgb, var(--color-primary) 40%, white)",
          "--mix-glow": "color-mix(in srgb, var(--color-primary) 30%, transparent)",
          
          "--themed-modal-bg-light": themeColor === "default" ? "white" : "color-mix(in srgb, var(--color-primary) 12%, white)",
          "--themed-modal-bg-dark": themeColor === "default" ? "#09090b" : "color-mix(in srgb, var(--color-primary) 18%, #09090b)",
        } as React.CSSProperties}
        className="relative w-full max-w-6xl max-h-[90dvh] overflow-y-auto rounded-2xl md:rounded-3xl border border-zinc-300 dark:border-zinc-700 bg-[var(--themed-modal-bg-light)] dark:bg-[var(--themed-modal-bg-dark)] p-4 md:p-6 shadow-2xl transition-colors duration-500 flex flex-col"
      >

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-white/80 dark:bg-black/60 border border-zinc-300 dark:border-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-sm backdrop-blur-md shadow-sm"
        >
          ✕
        </button>

        {/* 🌌 상단 일러스트 배너 구역 */}
        <div className={`relative -mx-4 -mt-4 md:-mx-6 md:-mt-6 ${isExpandMode ? 'h-auto' : 'h-48 sm:h-64 md:h-[360px] border-b border-zinc-300 dark:border-zinc-700'} shrink-0 flex overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 ease-in-out`}>
          {card.hasAwakening ? (
            <>
              {/* 특훈 전 */}
              <div 
                onClick={() => setActiveImage(prev => prev === 'pre' ? null : 'pre')}
                onMouseLeave={() => setActiveImage(null)}
                className={`relative h-full transition-all duration-700 ease-in-out overflow-hidden z-10 cursor-pointer max-w-[341px] sm:max-w-[455px] md:max-w-[604px]
                  ${activeImage === 'pre' 
                    ? 'flex-[3] z-20' 
                    : activeImage === 'post' 
                      ? 'flex-1' 
                      : 'flex-1 lg:hover:flex-[3] lg:hover:z-20'}
                `}
              >
                <img src={preIllustration} alt="특훈 전 일러스트" className="absolute left-0 top-0 h-full aspect-[16/9] max-w-none object-cover object-center" />
                <div className="absolute bottom-2 left-2 md:bottom-4 md:left-5 inline-flex items-center rounded-full border border-white/40 dark:border-white/20 bg-black/40 dark:bg-black/60 px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[10px] font-semibold text-white dark:text-zinc-100 backdrop-blur-md pointer-events-none tracking-wider shadow-md">특훈 전</div>
              </div>

              {/* 특훈 후 */}
              <div 
                onClick={() => setActiveImage(prev => prev === 'post' ? null : 'post')}
                onMouseLeave={() => setActiveImage(null)}
                className={`relative h-full transition-all duration-700 ease-in-out overflow-hidden z-10 border-l border-white/30 dark:border-white/10 cursor-pointer max-w-[341px] sm:max-w-[455px] md:max-w-[604px]
                  ${activeImage === 'post' 
                    ? 'flex-[3] z-20' 
                    : activeImage === 'pre' 
                      ? 'flex-1' 
                      : 'flex-1 lg:hover:flex-[3] lg:hover:z-20'}
                `}
              >
                <img src={postIllustration} alt="특훈 후 일러스트" className="absolute right-0 top-0 h-full aspect-[16/9] max-w-none object-cover object-center" />
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-5 inline-flex items-center rounded-full border border-cyan-300/40 dark:border-cyan-400/20 bg-black/40 dark:bg-black/60 px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[10px] font-semibold text-cyan-200 dark:text-cyan-300 backdrop-blur-md pointer-events-none tracking-wider shadow-md">특훈 후</div>
              </div>
            </>
          ) : (
            <div className="relative w-full flex flex-col justify-center overflow-hidden z-10">
              <img 
                src={preIllustration} 
                alt="일러스트" 
                className={`w-full ${isExpandMode ? 'h-auto aspect-[16/9] object-contain' : 'h-48 sm:h-64 md:h-[360px] object-cover'} object-center transition-all duration-300`} 
              />
              <div className="absolute bottom-4 left-5 inline-flex items-center rounded-full border border-white/40 dark:border-white/20 bg-black/40 dark:bg-black/60 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-100 backdrop-blur-md pointer-events-none tracking-wider shadow-md">일러스트</div>
              
              <button
                onClick={() => setIsExpandMode(!isExpandMode)}
                className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-xl bg-black/40 dark:bg-black/60 border border-white/40 dark:border-white/10 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/60 dark:hover:bg-zinc-800 transition-all text-xl shadow-lg active:scale-95"
                title={isExpandMode ? "축소하기" : "넓게 보기"}
              >
                {isExpandMode ? "⇱" : "⇲"}
              </button>
            </div>
          )}
        </div>

        {/* 📝 하단부 상세정보 구역 */}
        <div className="relative z-30 flex flex-col gap-4 lg:gap-6 mt-4 lg:mt-6 shrink-0">
          
          {/* 📱 1. 모바일 전용 헤더 */}
          <div className="flex lg:hidden flex-col sm:flex-row sm:items-start justify-between gap-4 w-full border-b border-zinc-300 dark:border-zinc-700 pb-4 transition-colors">
            {ModalHeader}
          </div>

          {/* 📱 2. 모바일 전용 책갈피 탭 */}
          <div className="flex flex-wrap lg:hidden pt-3 px-2 sm:px-3 border-b border-zinc-300 dark:border-zinc-700 mt-2 gap-1.5 justify-center sm:justify-start">
            {[
              { id: "status", label: "☑ 카드 상태" },
              { id: "costume", label: "⟡ 관련 의상" },
              { id: "info", label: "+ 관련 뽑기 & 이벤트 & 악곡" },
            ].map(tab => {
              const isActive = activeMobileTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMobileTab(tab.id)}
                  style={isActive && themeColor !== "default" ? {
                    "--mix-border": "var(--color-primary)",
                    "--mix-text-light": "color-mix(in srgb, var(--color-primary) 40%, black)",
                    "--mix-text-dark": "color-mix(in srgb, var(--color-primary) 40%, white)",
                  } as React.CSSProperties : {}}
                  className={`shrink-0 px-4 py-2.5 text-[13px] font-bold rounded-t-xl transition-colors border-t border-l border-r -mb-[1px] ${
                    isActive
                      ? themeColor === "default" 
                        ? "bg-[var(--themed-modal-bg-light)] dark:bg-[var(--themed-modal-bg-dark)] border-zinc-300 dark:border-zinc-700 border-b-transparent text-zinc-900 dark:text-white z-10"
                        : "bg-[var(--themed-modal-bg-light)] dark:bg-[var(--themed-modal-bg-dark)] border-[var(--mix-border)] border-b-transparent text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] z-10"
                      : "bg-zinc-100/50 dark:bg-zinc-900/30 border-transparent border-b-zinc-300 dark:border-b-zinc-700 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* 🌟 3. 본문 2단 분할 영역 */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-2 lg:mt-0">
            
            {/* 👉 좌측 영역: 뽑기 / 이벤트 / 악곡 */}
            <div className={`flex-[3] flex-col gap-6 md:gap-8 ${activeMobileTab === 'info' ? 'flex' : 'hidden'} lg:flex`}>
              
              {/* 💻 PC 전용 헤더 */}
              <div className="hidden lg:flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full border-b border-zinc-300 dark:border-zinc-700 pb-5 transition-colors">
                {ModalHeader}
              </div>

              <div className="flex gap-3.5 pt-2 lg:pt-0">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shrink-0 overflow-hidden flex items-center justify-center transition-colors">
                  <img src={characterIconPath} alt="Character Icon" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 transition-colors">관련 뽑기</span>
                  {hasGacha ? (
                    <>
                      <div className="w-full max-w-[480px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl overflow-hidden flex items-center justify-center shadow-sm transition-colors">
                        {card.gachaBannerPath ? (
                          <img src={card.gachaBannerPath} alt="Gacha Banner" className="w-full h-auto block" />
                        ) : (
                          <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                            <span className="text-zinc-400 dark:text-zinc-600 text-xs transition-colors">No Banner</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium transition-colors">({card.gachaPoolName})</span>
                    </>
                  ) : (
                    <div className="w-full max-w-[480px] h-24 sm:h-28 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
                      <span className="text-xl opacity-50">🎰</span>
                      <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 뽑기 없음</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shrink-0 overflow-hidden flex items-center justify-center transition-colors">
                  <span className="text-zinc-400 dark:text-zinc-500 text-lg">🎪</span>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 transition-colors">관련 이벤트</span>
                  {hasEvent ? (
                    <>
                      <div className="w-full max-w-[480px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl overflow-hidden flex items-center justify-center shadow-sm transition-colors">
                        {card.eventBannerPath ? (
                          <img src={card.eventBannerPath} alt="Event Banner" className="w-full h-auto block" />
                        ) : (
                          <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                            <span className="text-zinc-400 dark:text-zinc-600 text-xs transition-colors">No Banner</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium transition-colors">{card.eventName}</span>
                    </>
                  ) : (
                    <div className="w-full max-w-[480px] h-24 sm:h-28 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
                      <span className="text-xl opacity-50">🛸</span>
                      <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 이벤트 없음</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shrink-0 overflow-hidden flex items-center justify-center transition-colors">
                  <span className="text-zinc-400 dark:text-zinc-500 text-lg">🎵</span>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 transition-colors">관련 악곡</span>
                  {hasSong ? (
                    <div className="flex flex-wrap gap-4">
                      {songJackets.map((jacket, idx) => (
                        <div key={idx} className="flex flex-col gap-2 items-center">
                          <div className="w-28 md:w-36 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm shrink-0 transition-colors">
                            <img src={jacket} alt="Song Jacket" className="w-full h-auto block" />
                          </div>
                          <span className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-medium max-w-[112px] sm:max-w-[144px] text-center truncate transition-colors">
                            {songNames[idx] || ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-28 md:w-36 h-28 md:h-36 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 shrink-0 transition-colors">
                      <span className="text-2xl opacity-50">💿</span>
                      <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 악곡 없음</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 중앙 세로 구분선 (PC 전용) */}
            <div className="hidden lg:block w-px bg-zinc-300 dark:bg-zinc-700 mx-2 self-stretch rounded-full transition-colors" />

            {/* 👉 우측 영역: 카드 상태 / 관련 의상 */}
            <div className={`flex-[2] w-full lg:min-w-[320px] lg:max-w-[380px] shrink-0 flex-col gap-4 md:gap-6 self-start ${['status', 'costume'].includes(activeMobileTab) ? 'flex' : 'hidden'} lg:flex`}>
              
              {/* 📊 카드 상태 & 🎯 덱 시뮬레이터 구역 */}
              <div className={`${activeMobileTab === 'status' ? 'flex' : 'hidden'} lg:flex bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 flex-col justify-between gap-4 transition-colors`}>
                <div className="flex items-start justify-between gap-3 pb-2 border-b border-zinc-300 dark:border-zinc-700 transition-colors">
                  <div className="min-w-0 flex-1 flex items-baseline">
                    <p className="text-[15px] font-bold text-zinc-800 dark:text-zinc-100 tracking-wide whitespace-nowrap transition-colors">+ 카드 상태</p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      disabled={userState.isOwned}
                      onClick={() => onUpdateState(card.id, { isTarget: !userState.isTarget })}
                      className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold border tracking-tight transition-all shadow-sm ${
                        userState.isOwned
                          ? "opacity-50 cursor-not-allowed bg-transparent text-zinc-400 dark:text-zinc-600 border-zinc-200 dark:border-zinc-800"
                          : userState.isTarget
                            ? "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-300 dark:border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.15)] active:scale-95"
                            : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-800 dark:hover:text-zinc-200 active:scale-95"
                      }`}
                    >
                      {userState.isTarget && !userState.isOwned ? "⭐ 목표 중" : "☆ 목표 설정"}
                    </button>

                    <button
                      onClick={() => {
                        const nextOwned = !userState.isOwned;
                        onUpdateState(card.id, { 
                          isOwned: nextOwned,
                          ...(nextOwned ? { isTarget: false } : {}) 
                        });
                      }}
                      style={userState.isOwned ? {
                        "--own-hex": "#10b981", 
                        "--mix-bg": "color-mix(in srgb, var(--own-hex) 15%, transparent)",
                        "--mix-border": "var(--own-hex)",
                        "--mix-text-light": "color-mix(in srgb, var(--own-hex) 40%, black)",
                        "--mix-text-dark": "color-mix(in srgb, var(--own-hex) 40%, white)",
                        "--mix-glow": "color-mix(in srgb, var(--own-hex) 30%, transparent)",
                      } as React.CSSProperties : {}}
                      className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold border tracking-tight transition-all shadow-sm active:scale-95 ${
                        userState.isOwned
                          ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)] dark:shadow-[0_0_8px_rgba(52,211,153,0.15)]"
                          : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      {userState.isOwned ? "✓ 보유 중" : "❌ 미보유"}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium transition-colors">마스터 랭크</span>
                    <span className="font-bold text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] transition-colors">
                      {userState.isOwned ? `${userState.masterRank || 0} 마랭` : `시뮬레이션: ${simMasterRank} 마랭`}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5].map((rank) => (
                      <button
                        key={rank}
                        onClick={() => userState.isOwned ? onUpdateState(card.id, { masterRank: rank }) : setSimMasterRank(rank)}
                        className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                          currentMasterRank === rank
                            ? "bg-[var(--mix-bg)] border border-[var(--mix-border)] text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] shadow-[0_0_8px_var(--mix-glow)] scale-105"
                            : "bg-white dark:bg-zinc-950 text-zinc-500 border border-zinc-200 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        }`}
                      >
                        {rank}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-zinc-300 dark:border-zinc-700 mt-2 transition-colors">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium transition-colors">스킬 레벨 (Lv.)</span>
                    <span className="font-bold text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] transition-colors">
                      {userState.isOwned ? `Lv.${userState.skillLevel || 1}` : `시뮬레이션: Lv.${simSkillLevel}`}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => userState.isOwned ? onUpdateState(card.id, { skillLevel: lvl }) : setSimSkillLevel(lvl)}
                        className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                          currentSkillLevel === lvl
                            ? "bg-[var(--mix-bg)] border border-[var(--mix-border)] text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)] shadow-[0_0_8px_var(--mix-glow)] scale-105"
                            : "bg-white dark:bg-zinc-950 text-zinc-500 border border-zinc-200 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 🎯 덱 시뮬레이터 UI 구역 */}
                <div className="mt-2 pt-4 border-t border-zinc-300 dark:border-zinc-700/50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 transition-colors">
                      {simMode === 'skill' ? '✨ 스킬 최대 효율 시뮬레이터' : '🌟 이벤트 배수 시뮬레이터'}
                    </h3>
                    
                    {/* 🌟 블페 확인 분기 */}
                    {isBloomFes ? (
                      <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-full p-0.5 border border-zinc-300 dark:border-zinc-700">
                        <button
                          onClick={() => setIsSimAwakened(false)}
                          className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-all ${
                            !isSimAwakened 
                              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' 
                              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                          }`}
                        >
                          특훈 전
                        </button>
                        <button
                          onClick={() => setIsSimAwakened(true)}
                          className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-all ${
                            isSimAwakened 
                              ? 'bg-cyan-500 dark:bg-cyan-600 text-white shadow-sm' 
                              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                          }`}
                        >
                          특훈 후
                        </button>
                      </div>
                    ) : (
                      <div className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-colors ${getSkillBadgeStyle(card.skillType || "")}`}>
                        {card.skillType}
                      </div>
                    )}
                  </div>

                  <div className="flex items-end justify-between">
                    {simMode === 'skill' ? (
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 tracking-tight">
                          +{calculatedSkillBonus}%
                        </div>
                        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                          SCORE UP
                        </div>

                        <div className="relative group flex items-center justify-center cursor-help ml-1 mb-1.5">
                          <div className="w-5 h-5 rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center text-[10px] font-bold border border-zinc-400 dark:border-zinc-600 transition-colors group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500">
                            i
                          </div>
                          
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-[240px] p-2.5 bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 text-zinc-100 text-[11px] leading-relaxed rounded-lg shadow-xl z-50 text-center break-keep pointer-events-none animate-fade-in-up">
                            {tooltipText}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-800 dark:border-t-zinc-900"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-black text-amber-500 dark:text-amber-400 tracking-tight">
                          +???%
                        </div>
                        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                          EVENT BONUS
                        </div>
                        <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1 ml-1 bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-sm">
                          개발 중
                        </div>
                      </div>
                    )}

                    {/* 🔄 모드 전환 버튼 (아이콘 토글) */}
                    <div 
                      className="relative group flex items-center justify-center ml-2"
                      onMouseLeave={() => setActiveTooltip(null)} 
                    >
                      <button
                        onClick={() => {
                          setSimMode(prev => prev === 'skill' ? 'bonus' : 'skill');
                          setActiveTooltip('simModeBtn'); 
                        }}
                        className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shadow-sm hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 active:scale-95 transition-all flex items-center justify-center text-[15px]"
                      >
                        {simMode === 'skill' ? '✦' : '⇪'}
                      </button>
                      
                      <div className={`pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap transition-all duration-200 z-50 ${activeTooltip === 'simModeBtn' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
                        <div className="bg-zinc-800 dark:bg-zinc-900 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl border border-zinc-700">
                          {simMode === 'skill' ? '배수 모드로 전환' : '스킬 모드로 전환'}
                        </div>
                        <div className="absolute top-full right-3 border-[5px] border-transparent border-t-zinc-800 dark:border-t-zinc-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 🎯 시뮬레이터 구역 끝 */}

              </div>

              {/* 👗 관련 의상 */}
              <div className={`${activeMobileTab === 'costume' ? 'block' : 'hidden'} lg:block w-full`}>
                {costumePreviewData ? (
                  <div className="w-full animate-fade-in shadow-xl rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-700 overflow-hidden transition-colors">
                    <ModalCostumePreviewCard preview={costumePreviewData as any} userState={userState} />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-300 dark:border-zinc-700 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 shadow-inner animate-fade-in transition-colors">
                    <span className="text-2xl opacity-40">🛍️</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-wide transition-colors">관련 의상 없음</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}