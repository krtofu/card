// src/components/CardDetailModal.tsx
"use client";

import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page";
import ModalCostumePreviewCard from "@/components/ModalCostumePreviewCard";
import { useState, useEffect } from "react"; 

// 🌟 스킬 보너스 계산 엔진 (모달 전용)
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

  if (skill.includes("블랑") || skill.includes("초기페스")) {
    const isVS = unit === "무소속 / VIRTUAL SINGER" || unit.includes("버싱") || unit.includes("VS") || unit.toLowerCase().includes("virtual");
    return isVS ? [130, 135, 140, 150][idx] : [120, 130, 140, 150][idx];
  }
  return 0;
};

interface CardDetailModalProps {
  card: FinalCardInfo | null;
  userState: UserCardState;
  onUpdateState: (id: string, newState: Partial<UserCardState>) => void;
  onClose: () => void;
}

export default function CardDetailModal({
  card,
  userState,
  onUpdateState,
  onClose,
}: CardDetailModalProps) {
  const [isExpandMode, setIsExpandMode] = useState(false);
  
  // 미보유 카드를 위한 가상 시뮬레이터 상태
  const [simSkillLevel, setSimSkillLevel] = useState(1);
  const [simMasterRank, setSimMasterRank] = useState(0);
  const [characterRank, setCharacterRank] = useState(1);

  useEffect(() => {
    if (card) {
      const saved = localStorage.getItem("sekard_character_ranks");
      if (saved) {
        try {
          const ranks = JSON.parse(saved);
          setCharacterRank(ranks[card.character] || 1);
        } catch(e) {}
      }
    }
  }, [card]);

  if (!card) return null;

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

  // 실시간 스킬 배수 계산
  const calculatedSkillBonus = getSkillBonusPercentage(
    card.skillType || "",
    currentSkillLevel,
    card.unit || "",
    true, 
    characterRank,
    userState.isOwned
  );

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
      case "통상": return "border-sky-300/45 bg-sky-400/16 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]";
      case "한정": return "border-pink-300/45 bg-pink-400/16 text-pink-100 shadow-[0_0_0_1px_rgba(236,72,153,0.18)]";
      case "페스": return "border-violet-300/45 bg-violet-400/16 text-violet-100 shadow-[0_0_0_1px_rgba(167,139,250,0.20)]";
      case "월링": return "border-emerald-300/45 bg-emerald-400/16 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.18)]";
      case "콜라보": return "border-amber-300/45 bg-amber-400/16 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.18)]";
      default: return "border-white/10 bg-zinc-800 text-zinc-400";
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
      else if (unit.includes("원더쇼") || unit.includes("wonder") || unit === "wds") suffix = "_w";
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
    if (lowerUnit.includes("원더쇼") || lowerUnit.includes("wonder") || lowerUnit === "wds") return "/icons/Wds.png";
    if (lowerUnit.includes("니고") || lowerUnit.includes("25") || lowerUnit === "ng" || lowerUnit === "niigo") return "/icons/Niigo.png";
    if (lowerUnit.includes("버싱") || lowerUnit.includes("virtual") || lowerUnit === "vs") return "/icons/VS.png";
    return "";
  };

  const currentGachaStyle = getGachaBadgeStyle(card.gachaType);
  const attrInfo = getAttrInfo(attribute);
  const skillInfo = getSkillInfo(card.skillType || ""); 
  const characterIconPath = getCharacterIcon(card.character || "", card.unit || ""); 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl transition-all flex flex-col custom-scrollbar">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm backdrop-blur-md"
        >
          ✕
        </button>

        {/* 🌌 상단 배너 구역 */}
        <div className={`relative -mx-6 -mt-6 ${isExpandMode ? 'h-auto' : 'h-64 md:h-[360px] border-b border-white/10'} shrink-0 flex overflow-hidden bg-zinc-900 transition-all duration-300 ease-in-out`}>
          {card.hasAwakening ? (
            <>
              <div className="relative h-full flex-1 hover:flex-[3] max-w-[455px] md:max-w-[604px] transition-all duration-700 ease-in-out overflow-hidden group/pre z-10 hover:z-20">
                <img src={preIllustration} alt="특훈 전 일러스트" className="absolute left-0 top-0 h-full aspect-[16/9] max-w-none object-cover object-center" />
                <div className="absolute bottom-4 left-5 inline-flex items-center rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-zinc-100 backdrop-blur-md pointer-events-none tracking-wider shadow-md">특훈 전</div>
              </div>
              <div className="relative h-full flex-1 hover:flex-[3] max-w-[455px] md:max-w-[604px] transition-all duration-700 ease-in-out overflow-hidden group/post z-10 hover:z-20 border-l border-white/10">
                <img src={postIllustration} alt="특훈 후 일러스트" className="absolute right-0 top-0 h-full aspect-[16/9] max-w-none object-cover object-center" />
                <div className="absolute bottom-4 right-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-cyan-300 backdrop-blur-md pointer-events-none tracking-wider shadow-md">특훈 후</div>
              </div>
            </>
          ) : (
            <div className="relative w-full flex flex-col justify-center overflow-hidden z-10">
              <img 
                src={preIllustration} 
                alt="일러스트" 
                className={`w-full ${isExpandMode ? 'h-auto aspect-[16/9] object-contain' : 'h-64 md:h-[360px] object-cover'} object-center transition-all duration-300`} 
              />
              <div className="absolute bottom-4 left-5 inline-flex items-center rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-semibold text-zinc-100 backdrop-blur-md pointer-events-none tracking-wider shadow-md">일러스트</div>
              
              <button
                onClick={() => setIsExpandMode(!isExpandMode)}
                className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm hover:bg-zinc-800 transition-all text-xl shadow-lg active:scale-95"
                title={isExpandMode ? "축소하기" : "넓게 보기"}
              >
                {isExpandMode ? "⇱" : "⇲"}
              </button>
            </div>
          )}
        </div>

        {/* 📝 하단부 상세정보 구역 */}
        <div className="flex flex-col md:flex-row gap-8 pt-2 shrink-0 mt-6">
          
          <div className="flex-[3] flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4 w-full mt-1 border-b border-white/5 pb-5">
              
              <div className="flex flex-wrap items-center gap-2.5">
                {getUnitLogo(card.unit || "") && (
                  <img src={getUnitLogo(card.unit || "")} alt={card.unit} className="h-[28px] w-auto object-contain drop-shadow-md" />
                )}
                
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-1.5">
                  {isReleased && <span className="text-[16px] drop-shadow-sm" title="한국 서버 출시됨">🇰🇷</span>}
                  {card.cardName}
                </h2>
                <span className="text-xl font-bold text-zinc-100">{card.character}</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
                {/* 🌟 [개선됨] 헷갈리던 동적 스킬 뱃지를 스킬 정보에서 싹 지우고 원래대로 깔끔하게 복구했습니다. */}
                {skillInfo.src ? (
                  <div className="relative group flex items-center justify-center cursor-help">
                    <img src={skillInfo.src} alt={skillInfo.label} className="w-[26px] h-[26px] object-contain drop-shadow-md shrink-0" />
                    <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-bold text-zinc-200 shadow-xl">
                          {skillInfo.label}
                        </div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  skillInfo.label && (
                    <span className="shrink-0 inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 tracking-wide">
                      {skillInfo.label}
                    </span>
                  )
                )}

                {attrInfo.src ? (
                  <div className="relative group flex items-center justify-center cursor-help ml-0.5">
                    <img src={attrInfo.src} alt={attrInfo.label} className="w-[26px] h-[26px] object-contain drop-shadow-md shrink-0" />
                    <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-bold text-zinc-200 shadow-xl">{attrInfo.label}</div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="shrink-0 inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 tracking-wide ml-0.5">{attrInfo.label}</span>
                )}

                <span className={`shrink-0 inline-flex items-center px-3 py-1 text-xs font-bold rounded-full border tracking-wide transition-all ml-0.5 ${currentGachaStyle}`}>
                  {card.gachaType}
                </span>
              </div>
            </div>

            {/* 🎲 1. 관련 뽑기 */}
            <div className="flex gap-3.5">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                <img src={characterIconPath} alt="Character Icon" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-bold text-zinc-200 text-sm mt-0.5">관련 뽑기</span>
                {hasGacha ? (
                  <>
                    <div className="w-full max-w-[480px] bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                      {card.gachaBannerPath ? (
                        <img src={card.gachaBannerPath} alt="Gacha Banner" className="w-full h-auto block" />
                      ) : (
                        <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                          <span className="text-zinc-600 text-xs">No Banner</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">({card.gachaPoolName})</span>
                  </>
                ) : (
                  <div className="w-full max-w-[480px] h-24 sm:h-28 bg-zinc-900/30 border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2">
                    <span className="text-xl opacity-50">🎰</span>
                    <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 뽑기 없음</span>
                  </div>
                )}
              </div>
            </div>

            {/* 🎪 2. 관련 이벤트 */}
            <div className="flex gap-3.5 pt-2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                <span className="text-zinc-500 text-lg">🎪</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-bold text-zinc-200 text-sm mt-0.5">관련 이벤트</span>
                {hasEvent ? (
                  <>
                    <div className="w-full max-w-[480px] bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                      {card.eventBannerPath ? (
                        <img src={card.eventBannerPath} alt="Event Banner" className="w-full h-auto block" />
                      ) : (
                        <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                          <span className="text-zinc-600 text-xs">No Banner</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">{card.eventName}</span>
                  </>
                ) : (
                  <div className="w-full max-w-[480px] h-24 sm:h-28 bg-zinc-900/30 border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2">
                    <span className="text-xl opacity-50">🛸</span>
                    <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 이벤트 없음</span>
                  </div>
                )}
              </div>
            </div>

            {/* 💿 3. 관련 악곡 */}
            <div className="flex gap-3.5 pt-2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                <span className="text-zinc-500 text-lg">🎵</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-bold text-zinc-200 text-sm mt-0.5">관련 악곡</span>
                {hasSong ? (
                  <div className="flex flex-wrap gap-4">
                    {songJackets.map((jacket, idx) => (
                      <div key={idx} className="flex flex-col gap-2 items-center">
                        <div className="w-28 sm:w-36 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden shadow-sm shrink-0">
                          <img src={jacket} alt="Song Jacket" className="w-full h-auto block" />
                        </div>
                        <span className="text-[11px] sm:text-xs text-zinc-400 font-medium max-w-[112px] sm:max-w-[144px] text-center truncate">
                          {songNames[idx] || ""}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-28 sm:w-36 h-28 sm:h-36 bg-zinc-900/30 border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 shrink-0">
                    <span className="text-2xl opacity-50">💿</span>
                    <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 악곡 없음</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px bg-white/5 mx-2 self-stretch rounded-full" />

          {/* 👉 우측 영역: 카드 상태 및 의상 프리뷰 컨트롤러 */}
          <div className="flex-[2] min-w-[320px] max-w-[380px] shrink-0 flex flex-col gap-6 self-start">
            <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/5">
                <div className="min-w-0 flex-1 flex items-baseline">
                  <p className="text-[15px] font-bold text-zinc-100 tracking-wide whitespace-nowrap">+ 카드 상태</p>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    disabled={userState.isOwned}
                    onClick={() => onUpdateState(card.id, { isTarget: !userState.isTarget })}
                    className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold border tracking-tight transition-all shadow-sm ${
                      userState.isOwned
                        ? "opacity-50 cursor-not-allowed bg-zinc-900 text-zinc-600 border-zinc-800"
                        : userState.isTarget
                          ? "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.15)] active:scale-95"
                          : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 active:scale-95"
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
                    className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold border tracking-tight transition-all shadow-sm active:scale-95 ${
                      userState.isOwned
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.15)]"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {userState.isOwned ? "✓ 보유 중" : "❌ 미보유"}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">마스터 랭크</span>
                  <span className="font-bold text-sky-400">
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
                          ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-[0_0_8px_rgba(14,165,233,0.2)]"
                          : "bg-zinc-950 text-zinc-500 border border-white/5 hover:bg-zinc-900"
                      }`}
                    >
                      {rank}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🌟 [개선됨] 스킬 배수 뱃지를 시뮬레이션 글씨 옆으로 완전히 이사시켰습니다! (하늘색 & ⇪ 테마 통일) */}
              <div className="space-y-1.5 pt-2 border-t border-white/5 mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 font-medium">스킬 레벨 (Lv.)</span>
                    {calculatedSkillBonus > 0 && (
                      <span className="bg-sky-500/20 text-sky-400 border border-sky-400/30 px-1.5 py-0.5 rounded text-[11px] font-medium tracking-wider animate-fade-in shadow-sm flex items-center gap-0.5">
                        ⇪ +{calculatedSkillBonus}%
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-purple-400">
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
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                          : "bg-zinc-950 text-zinc-500 border border-white/5 hover:bg-zinc-900"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {costumePreviewData ? (
              <div className="w-full animate-fade-in shadow-xl rounded-2xl bg-zinc-950/50 border border-white/5 overflow-hidden">
                <ModalCostumePreviewCard preview={costumePreviewData as any} userState={userState} />
              </div>
            ) : (
              <div className="w-full h-32 bg-zinc-900/20 border border-white/10 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 shadow-inner animate-fade-in">
                <span className="text-2xl opacity-40">🛍️</span>
                <span className="text-xs text-zinc-500 font-medium tracking-wide">관련 의상 없음</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}