// src/components/FutureEventCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { EventData } from "@/data/events/index";
import { ALL_CARDS } from "@/data/cards"; 
import CardItem from "@/components/CardItem"; 
import { UserCardState } from "@/app/cards/page";
import { FinalCardInfo } from "@/data/cards/template";
import { calculateCardEventBonus } from "@/lib/bonusCalculator";
// 🌟 [수정됨] 메인 화면용 의상 프리뷰 컴포넌트로 교체!
import CostumePreviewCard from "@/components/CostumePreviewCard";

const PREMIUM_BADGE_STYLE: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.35)",
  backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)",
  textShadow: "0px 1px 2px rgba(24, 24, 27, 0.5), 0px 0px 3px rgba(24, 24, 27, 0.2)",
};

const PREMIUM_BADGE_CLASS = "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold text-white shadow-md";

const getGachaBadgeBg = (gachaType: string) => {
  switch (gachaType) {
    case "통상": return "bg-sky-500";
    case "한정": return "bg-pink-500";
    case "페스": return "bg-violet-500";
    case "월링": return "bg-emerald-500";
    case "콜라보": return "bg-amber-500";
    case "유료": return "bg-zinc-950 !text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]";
    default: return "bg-zinc-600";
  }
};

const getEventTypeBadgeBg = (eventType?: string) => {
  switch (eventType) {
    case "하코": return "bg-rose-500";
    case "혼합": return "bg-indigo-500";
    case "월링": return "bg-emerald-500";
    default: return "bg-zinc-600";
  }
};

const matchAttribute = (cardAttr: string, targetAttr: string) => {
  const c = (cardAttr || "").toLowerCase();
  const t = (targetAttr || "").toLowerCase();
  if (c === t || c.includes(t)) return true;
  if (t === "pure" && c === "퓨어") return true;
  if (t === "happy" && c === "해피") return true;
  if (t === "cute" && c === "큐트") return true;
  if (t === "mysterious" && c === "미스테리어스") return true;
  if (t === "cool" && c === "쿨") return true;
  return false;
};

const matchUnit = (cardUnit: string, targetUnit: string) => {
  const c = (cardUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  const t = (targetUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  if (!c || !t) return false;
  if (t.includes("leo") && (c.includes("leo") || c.includes("레오니") || c.includes("ln"))) return true;
  if (t.includes("more") && (c.includes("more") || c.includes("모모점") || c.includes("mmj"))) return true;
  if (t.includes("vivid") && (c.includes("vivid") || c.includes("비배스") || c.includes("vbs"))) return true;
  if (t.includes("wonder") && (c.includes("wonder") || c.includes("원더쇼") || c.includes("wxs"))) return true;
  if (t.includes("25") && (c.includes("25") || c.includes("니고") || c.includes("niigo") || c.includes("n25"))) return true;
  return c.includes(t) || t.includes(c);
};

const getUnitLogo = (unitName: string) => {
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

interface FutureEventCardProps {
  event: EventData;
  index: number;
  userStates: Record<string, UserCardState>; 
  onCardClick: (card: FinalCardInfo) => void; 
  showPostAwake: boolean;
  isFilterActive: boolean; 
  isEventMatched: boolean; 
  matchedCardIds: string[]; 
  monthMarker?: string; 
}

export default function FutureEventCard({ 
  event, userStates, onCardClick, showPostAwake, 
  isFilterActive, isEventMatched, matchedCardIds, monthMarker 
}: FutureEventCardProps) {
  
  const [isEventMode, setIsEventMode] = useState(false);
  const [showCostumes, setShowCostumes] = useState(false);
  const [sortMode, setSortMode] = useState<"bonus" | "score">("bonus");
  const [refMasterRank, setRefMasterRank] = useState<number>(0);
  const [refSkillLevel, setRefSkillLevel] = useState<number>(1);

  const pickupCards = event.gacha.featuredCardIds
    .map((cardId) => ALL_CARDS.find((c: any) => c.id === cardId || ((c as any).info && (c as any).info.id === cardId)))
    .filter((c) => c !== undefined)
    .map(card => {
      const realId = (card as any).info ? (card as any).info.id : (card as any).id;
      const myState = userStates[realId];
      return { card, myState, bonus: 0, score: 0 };
    });

  const getBonusCards = () => {
    if (!event.bonus) return [];
    
    const eventStartClean = event.period.start.split(".")[0].trim();
    const eventStartDate = new Date(eventStartClean);

    const matchingCards = ALL_CARDS.filter(card => {
      if (card.releaseDate) {
        const cardReleaseDate = new Date(card.releaseDate);
        if (cardReleaseDate > eventStartDate) return false;
      }
      if (!matchAttribute(card.attribute || "", event.bonus!.attribute)) return false;
      const matchesUnit = event.bonus!.unit && matchUnit(card.unit || "", event.bonus!.unit);
      const matchesChar = event.bonus!.characters && event.bonus!.characters.includes(card.character || "");
      return matchesUnit || matchesChar;
    });

    const cardsWithValues = matchingCards.map(card => {
      const realId = (card as any).info ? (card as any).info.id : (card as any).id;
      const myState = userStates[realId];
      
      const fakeState = myState?.isOwned ? myState : { 
        isOwned: true, 
        masterRank: refMasterRank, 
        skillLevel: refSkillLevel, 
        isTarget: myState?.isTarget 
      };
      
      const bonus = calculateCardEventBonus(card as any, fakeState, event);
      const score = getSkillBonusPercentage((card as any).skillType || "", fakeState.skillLevel, (card as any).unit || "", showPostAwake, 1, fakeState.isOwned);
      
      return { card, myState, bonus, score };
    });

    return cardsWithValues.sort((a, b) => {
      if (sortMode === "score") {
        if (b.score !== a.score) return b.score - a.score;
      } else {
        if (b.bonus !== a.bonus) return b.bonus - a.bonus;
      }
      const valA = a.myState?.isOwned ? 2 : (a.myState?.isTarget ? 1 : 0);
      const valB = b.myState?.isOwned ? 2 : (b.myState?.isTarget ? 1 : 0);
      if (valA !== valB) return valB - valA;
      return ((b.card as any).releaseDate || "").localeCompare((a.card as any).releaseDate || "");
    });
  };

  const bonusCards = getBonusCards();
  const displayItems = isEventMode ? bonusCards : pickupCards;
  const displayBanner = isEventMode && event.eventBannerPath ? event.eventBannerPath : event.gacha.bannerPath;
  const unitLogo = isEventMode && event.eventType === "하코" && event.bonus?.unit ? getUnitLogo(event.bonus?.unit) : null;

  const fadeClass = isFilterActive && !isEventMatched 
    ? "opacity-30 grayscale hover:opacity-60 transition-opacity duration-300" 
    : "opacity-100 transition-opacity duration-300";

  // 🌟 [수정됨] 캐릭터마다 개별적으로 카드 이름을 전달하도록 변경!
  const combinedCostumeData = () => {
    const charsWithCostumes = pickupCards
      .map(p => (p.card as any).info || p.card)
      .filter(c => c.costume)
      .map(c => ({
        name: c.character,
        title: c.cardName, // 🌟 [추가] 캐릭터별 카드 이름을 'title'로 꽂아줍니다!
        subtitle: c.costume.name,
        sets: c.costume.sets.map((set: any) => ({
          key: set.key, label: set.label, front: [set.front], back: [set.back]
        }))
      }));

    if (charsWithCostumes.length === 0) return null;

    return {
      title: "", // 🌟 공통 타이틀은 비워둡니다 (자식 컴포넌트가 개별 타이틀을 우선적으로 띄우게 함)
      subtitle: "", 
      characters: charsWithCostumes
    };
  };

  const costumePreviewPayload = combinedCostumeData();

  return (
    <div className={`flex flex-col md:flex-row items-stretch gap-8 ${fadeClass}`}>
      
      {/* ================= 좌측: 배너 영역 ================= */}
      <div className="flex-1 w-full relative z-10 flex flex-col justify-center md:px-4 py-2 shrink-0">
        <div className="w-full max-w-[520px] mx-auto bg-zinc-900 border border-white/10 rounded-2xl overflow-visible shadow-xl flex flex-col relative h-fit">
          
          {event.bonus && (
             <div className="absolute -left-6 sm:-left-12 md:-left-[70px] top-1/2 -translate-y-1/2 flex items-center z-50">
               <button
                 onClick={() => { setIsEventMode(!isEventMode); setShowCostumes(false); }}
                 className="w-10 h-10 rounded-full bg-zinc-800 border-[3px] border-zinc-950 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-[18px] hover:bg-zinc-700 hover:scale-110 transition-transform z-10 relative"
                 title={isEventMode ? "가챠 배너로 돌아가기" : "이벤트 배너 보기"}
               >
                 {isEventMode ? '🎪' : '🎰'}
               </button>
               <div className="w-6 sm:w-10 md:w-[46px] h-[3px] bg-zinc-600 absolute left-5 top-1/2 -translate-y-1/2 -z-10 shadow-sm" />
             </div>
          )}

          <div className="relative aspect-[21/9] w-full bg-zinc-950/40 flex items-center justify-center border-b border-white/10 overflow-hidden rounded-t-2xl shrink-0">
            {displayBanner ? (
              <img 
                key={displayBanner}
                src={displayBanner} 
                alt={`${event.name} 배너`}
                className={`absolute inset-0 w-full h-full animate-fade-in ${isEventMode ? 'object-contain p-1.5' : 'object-cover'}`}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span className="text-zinc-600 text-sm font-bold tracking-widest">NO BANNER IMAGE</span>
            )}
            
            {!isEventMode && (
              <div className="absolute top-3 left-3 flex gap-2 z-20">
                {event.gacha.types.map((type, idx) => (
                  <span key={idx} className={`${PREMIUM_BADGE_CLASS} ${getGachaBadgeBg(type)}`} style={PREMIUM_BADGE_STYLE}>{type}</span>
                ))}
              </div>
            )}

            {event.eventType && event.eventType !== "없음" && (
              <div className="absolute top-3 right-3 flex z-20">
                <span className={`${PREMIUM_BADGE_CLASS} ${getEventTypeBadgeBg(event.eventType)}`} style={PREMIUM_BADGE_STYLE}>{event.eventType}</span>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-zinc-950/90 backdrop-blur-sm relative z-20 flex justify-between items-end flex-1 rounded-b-2xl">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-white mb-1 truncate pr-2">
                {isEventMode ? (event.eventName || event.name) : event.name}
              </h3>
              <p className="text-sm font-medium text-zinc-400">
                🕒 {event.period.start} ~ {event.period.end}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 중앙 타임라인 선 ================= */}
      <div className="hidden md:flex flex-col items-center justify-center relative z-20 w-10 shrink-0">
        <div className="relative flex justify-center items-center">
          {monthMarker && (
            <div className="absolute bottom-full mb-4 px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[11px] font-bold border border-white/10 shadow-sm z-30 whitespace-nowrap">
              {monthMarker}월
            </div>
          )}

          {unitLogo ? (
            <div className="w-9 h-9 rounded-full bg-zinc-900 border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] z-20 flex items-center justify-center overflow-hidden p-1 transition-all">
               <img src={unitLogo} alt="Unit Logo" className="w-full h-full object-contain drop-shadow-md" />
            </div>
          ) : (
            <div className={`w-4 h-4 rounded-full border-4 border-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all ${isFilterActive && !isEventMatched ? 'bg-zinc-600' : 'bg-white'}`} />
          )}
        </div>
      </div>

      {/* ================= 우측: 카드 목록 ================= */}
      <div className="flex-1 w-full relative z-10 flex flex-col justify-center md:px-4 py-2 shrink-0">
        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 w-full max-w-[520px] mx-auto flex flex-col h-fit">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-1.5 font-bold text-zinc-300 text-sm">
              {isEventMode ? <><span className="text-amber-400">🎁</span> 이벤트 보너스 멤버</> : <><span className="text-sky-400">✨</span> 가챠 픽업 멤버</>}
            </div>
            
            <div className="flex items-center gap-2">
               {isEventMode ? (
                 <>
                   <button
                     onClick={() => setSortMode(prev => prev === "bonus" ? "score" : "bonus")}
                     className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors shadow-sm"
                     title={sortMode === "bonus" ? "이벤포순 정렬 중 (클릭 시 스업 수치순)" : "스업 수치순 정렬 중 (클릭 시 이벤포순)"}
                   >
                     {sortMode === "bonus" ? "✦" : "⇪"}
                   </button>

                   {sortMode === "bonus" ? (
                     <div className="flex items-center bg-zinc-800 border border-white/10 rounded-full p-1 shadow-sm animate-fade-in">
                        <span className="text-[10px] text-zinc-400 font-bold px-2 whitespace-nowrap hidden sm:inline-block">미보유 기준 마랭</span>
                        <span className="text-[10px] text-zinc-400 font-bold pl-2 pr-1 whitespace-nowrap sm:hidden">마랭</span>
                        <div className="flex gap-0.5 pr-0.5">
                          {[0, 1, 2, 3, 4, 5].map(lv => (
                            <button key={lv} onClick={() => setRefMasterRank(lv)}
                              className={`w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${refMasterRank === lv ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 scale-105' : 'text-zinc-500 hover:bg-zinc-700 hover:text-zinc-200'}`}>
                              {lv}
                            </button>
                          ))}
                        </div>
                     </div>
                   ) : (
                     <div className="flex items-center bg-zinc-800 border border-white/10 rounded-full p-1 shadow-sm animate-fade-in">
                        <span className="text-[10px] text-zinc-400 font-bold px-2 whitespace-nowrap hidden sm:inline-block">미보유 기준 Lv</span>
                        <span className="text-[10px] text-zinc-400 font-bold pl-2 pr-1 whitespace-nowrap sm:hidden">Lv</span>
                        <div className="flex gap-0.5 pr-0.5">
                          {[1, 2, 3, 4].map(lv => (
                            <button key={lv} onClick={() => setRefSkillLevel(lv)}
                              className={`w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${refSkillLevel === lv ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 scale-105' : 'text-zinc-500 hover:bg-zinc-700 hover:text-zinc-200'}`}>
                              {lv}
                            </button>
                          ))}
                        </div>
                     </div>
                   )}
                 </>
               ) : (
                 <div className="flex items-center gap-1.5">
                    {/* 🌟 🛍️ 버튼이 통상/한정 뱃지 바로 좌측에 예쁘게 배치됩니다! */}
                    {costumePreviewPayload && (
                      <button 
                        onClick={() => setShowCostumes(!showCostumes)} 
                        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all shadow-md text-[14px] ${
                          showCostumes 
                            ? 'bg-pink-500/20 border border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.3)]' 
                            : 'bg-zinc-800 border border-white/10 hover:bg-zinc-700'
                        }`}
                        title={showCostumes ? "카드 보기" : "의상 프리뷰 보기"}
                      >
                        🛍️
                      </button>
                    )}

                    {event.gacha.types.map(t => {
                      if (t === "통상") return <img key={t} src="/icons/status/normal.png" className="w-[30px] h-[30px] rounded-full shadow-md" alt="통상" title="통상" />;
                      if (["한정", "페스", "월링"].includes(t)) return <img key={t} src="/icons/status/limited.png" className="w-[30px] h-[30px] rounded-full shadow-md" alt={t} title={t} />;
                      return null;
                    })}
                 </div>
               )}
            </div>
          </div>
          
          {/* 🌟 [개선됨] 🛍️ 버튼 토글에 따라 의상 프리뷰 창(1개로 합쳐짐) 렌더링! */}
          {showCostumes && !isEventMode && costumePreviewPayload ? (
            <div className="w-full shadow-2xl rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden animate-fade-in">
              <CostumePreviewCard preview={costumePreviewPayload as any} />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {displayItems.length > 0 ? displayItems.map(({ card, myState, bonus, score }, idx) => {
                const realId = (card as any).info ? (card as any).info.id : (card as any).id;
                const isCardMatched = !isFilterActive || matchedCardIds.includes(realId);

                return (
                  <div key={realId || idx} className={`w-[100px] shrink-0 transition-all duration-300 ${!isCardMatched ? 'opacity-30 grayscale-[80%]' : ''}`}>
                    <CardItem 
                      card={card as any} 
                      userState={myState} 
                      onClick={onCardClick} 
                      showPostAwake={showPostAwake} 
                      showTextBadge={true}
                      sortOrder={isEventMode ? sortMode : undefined}
                      eventBonus={bonus}
                      scoreBonus={score}
                    />
                  </div>
                );
              }) : (
                <div className="w-full py-10 flex justify-center text-zinc-500 text-xs font-bold">
                  보너스 조건에 맞는 멤버가 없습니다.
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>

    </div>
  );
}