"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // 미래시 연결용 링크

import GachaCard from "@/components/GachaCard";
import NoticePanel from "@/components/NoticePanel";
import VideoPanel from "@/components/VideoPanel"; 
import ReprintSection from "@/components/ReprintSection";
import GachaTabs from "@/components/GachaTabs";
import TimerBadge from "@/components/TimerBadge";
import CostumePreviewCard from "@/components/CostumePreviewCard";

import { parseAttrsFromNote } from "@/lib/gachaNote";
import { getKeywordBadgeStyle } from "@/lib/keywordBadge";
import { getKeywordRank } from "@/lib/keywordBadge";
import { type GachaType, type Region } from "@/lib/types";
import { GACHA_TYPES, GACHA_DATA } from "@/lib/gacha";
import { YT_IDS, YT_META } from "@/lib/youtube";
import { REPRINT_SECTIONS } from "@/lib/reprints";
import { NOTICES } from "@/lib/notices";
import { VIRTUAL_SINGER_COLORS, UNIT_COLORS } from "@/lib/colors";

import { COSTUME_PREVIEWS } from "@/data/costumes";

// 🌟 대시보드 연동용 데이터 임포트
import { ALL_CARDS } from "@/data/cards";
import { FUTURE_EVENTS } from "@/data/events/index";
import { useThemeColor } from "@/app/providers";

// 🌟 유닛별 통계 매핑 데이터
const UNIT_GROUPS = [
  { id: "vs", name: "VIRTUAL SINGER", logo: "/icons/VS.png", match: ["virtual singer", "무소속", "버싱", "vs"], color: "bg-[#33CCBB]" },
  { id: "ln", name: "Leo/need", logo: "/icons/Leoneed.png", match: ["leo/need", "레오니", "leo", "l/n"], color: "bg-[#4455DD]" },
  { id: "mmj", name: "MORE MORE JUMP!", logo: "/icons/MMJ.png", match: ["more more jump!", "모모점", "mmj"], color: "bg-[#88DD44]" },
  { id: "vbs", name: "Vivid BAD SQUAD", logo: "/icons/VBS.png", match: ["vivid bad squad", "비배스", "vbs"], color: "bg-[#EE1166]" },
  { id: "wxs", name: "Wonderlands×Showtime", logo: "/icons/Wds.png", match: ["wonderlands×showtime", "원더쇼", "wxs"], color: "bg-[#FF9900]" },
  { id: "n25", name: "25시, 나이트코드에서.", logo: "/icons/Niigo.png", match: ["25시, 나이트코드에서.", "니고", "25", "ng", "niigo"], color: "bg-[#884499]" }
];

export default function Home() {
  const [selectedType, setSelectedType] = useState<GachaType>("통상");
  const [region, setRegion] = useState<Region>("한섭"); // 🌟 한섭/일섭 뼈대 스위치

  const currentVideo = YT_META[region];
  const currentGacha = useMemo(
    () => GACHA_DATA[selectedType],
    [selectedType]
  );

  const costumePreview = useMemo(
    () => COSTUME_PREVIEWS[selectedType],
    [selectedType]
  );

  const worldLinkColor = useMemo(() => {
    if (selectedType !== "월링") return null;

    // ✅ 1) 월링 + 기준이 "character"면 버싱 캐릭터 색
    if (currentGacha.worldLinkBase?.kind === "character") {
      const name = currentGacha.worldLinkBase.value; // VirtualSinger
      return VIRTUAL_SINGER_COLORS[name];
    }

    // ✅ 2) 월링 + 기준이 "unit"이면 유닛색
    if (currentGacha.worldLinkBase?.kind === "unit") {
      const unit = currentGacha.worldLinkBase.value; // UnitName
      return UNIT_COLORS[unit];
    }

    // ✅ 3) fallback: tags에서 단일 유닛 찾기
    const unit = currentGacha.tags?.find((t) => t in UNIT_COLORS);
    if (unit) return UNIT_COLORS[unit as keyof typeof UNIT_COLORS];

    return null;
  }, [selectedType, currentGacha]);

  // ✅ 속성 추출
  const { attrs: gachaAttrs } = useMemo(
    () => parseAttrsFromNote(currentGacha.note),
    [currentGacha.note]
  );

  const keywords = useMemo(() => {
    const base = currentGacha.tags ?? [];
    const merged = Array.from(new Set([...base, ...gachaAttrs]));
    return merged.sort((a, b) => getKeywordRank(a) - getKeywordRank(b));
  }, [currentGacha.tags, gachaAttrs]);

  const toggleRegion = () =>
    setRegion((prev) => (prev === "한섭" ? "일섭" : "한섭"));

  // ==========================================
  // 🚀 [리뉴얼 핵심] 서버 연동형 통계 및 미래시 로직
  // ==========================================
  const { themeColor } = useThemeColor();
  const [cardStates, setCardStates] = useState<Record<string, { isOwned?: boolean }>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sekard_user_card_states");
    if (saved) try { setCardStates(JSON.parse(saved)); } catch (e) {}
  }, []);

  // 오늘 날짜 기준 미래시 가챠 자동 세팅
  const autoDetectedGachaType = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeEvent = FUTURE_EVENTS.find(ev => {
      try {
        const start = new Date(ev.period.start.split(' ')[0].replace(/[\.-]/g, '/'));
        start.setHours(0, 0, 0, 0);
        const end = new Date((ev.period.end || ev.period.start).split(' ')[0].replace(/[\.-]/g, '/'));
        end.setHours(23, 59, 59, 999);
        return today >= start && today <= end;
      } catch (e) { return false; }
    });

    if (activeEvent?.gacha?.types) {
      const typeMap: Record<string, GachaType> = { "통상": "통상", "한정": "한정", "페스": "페스", "월링": "월링", "콜라보": "콜라보" };
      for (const t of activeEvent.gacha.types) {
        if (typeMap[t]) return typeMap[t];
      }
    }
    return null;
  }, []);

  useEffect(() => {
    if (autoDetectedGachaType) setSelectedType(autoDetectedGachaType);
  }, [autoDetectedGachaType]);

  // 🌟 [기획자님 천재적 아이디어 반영] region(한섭/일섭)에 맞춰 유동적으로 변하는 4성 통계창!
  const stats = useMemo(() => {
    let total = 0;
    let owned = 0;
    const unitStats: Record<string, { total: number; owned: number }> = {};
    UNIT_GROUPS.forEach(u => unitStats[u.id] = { total: 0, owned: 0 });

    const today = new Date();

    ALL_CARDS.forEach(card => {
      // 🔒 한섭 모드일 때는 미출시 카드(출시일이 오늘보다 미래인 카드)를 분모/통계에서 완전히 제외시킵니다!
      if (region === "한섭" && card.releaseDate && new Date(card.releaseDate) > today) {
        return; 
      }

      total++;
      if (cardStates[card.id]?.isOwned) owned++;
      const unitStr = (card.unit || "").toLowerCase();
      const matchedUnit = UNIT_GROUPS.find(u => u.match.some(m => unitStr.includes(m)));
      if (matchedUnit) {
        unitStats[matchedUnit.id].total++;
        if (cardStates[card.id]?.isOwned) unitStats[matchedUnit.id].owned++;
      }
    });

    return { total, owned, unitStats };
  }, [cardStates, region]); // 💡 region이 바뀔 때마다 실시간으로 수집율이 재계산됩니다!

  // 실시간 미래시 감지
  const { liveEvents, upcomingEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const live: any[] = [];
    const upcoming: any[] = [];
    
    FUTURE_EVENTS.forEach(ev => {
      try {
        const start = new Date(ev.period.start.split(' ')[0].replace(/[\.-]/g, '/'));
        start.setHours(0, 0, 0, 0);
        const end = new Date((ev.period.end || ev.period.start).split(' ')[0].replace(/[\.-]/g, '/'));
        end.setHours(23, 59, 59, 999);
        if (today >= start && today <= end) live.push(ev);
        else if (start > today) upcoming.push(ev);
      } catch(e) {}
    });
    
    upcoming.sort((a, b) => new Date(a.period.start.split(' ')[0].replace(/[\.-]/g, '/')).getTime() - new Date(b.period.start.split(' ')[0].replace(/[\.-]/g, '/')).getTime());
    return { liveEvents: live, upcomingEvents: upcoming };
  }, []);

  if (!mounted) return null;
  const overallPercent = stats.total > 0 ? Math.floor((stats.owned / stats.total) * 100) : 0;

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
      
      {/* Top */}
      <ReprintSection sections={REPRINT_SECTIONS} />

      {/* 📊 2번 지시: 구 비디오 패널 프레임 유지 + 내부에 실시간 통계 연동 대시보드 삽입 */}
      <VideoPanel
        region={region}
        ytId={YT_IDS[region]}
        meta={currentVideo}
        onToggleRegion={toggleRegion}
      >
        <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-white/10 shadow-sm w-full h-full flex flex-col justify-center transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <span className="text-2xl">🏆</span> 4성 수집 달성률
            </h2>
            {/* 🌟 현재 어떤 모드로 통계가 나오고 있는지 친절한 서브 뱃지 추가 */}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors border ${region === "한섭" ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-blue-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20'}`}>
              {region === "한섭" ? "🇰🇷 현재 한섭 출시 기준" : "🇯🇵 일섭 미래시 포함 기준"}
            </span>
          </div>
          
          {/* 전체 진행도 */}
          <div className="mb-6 bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-2xl border border-zinc-100 dark:border-white/5 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">전체 컬렉션</span>
              <div className="text-right">
                <span className="text-2xl font-black transition-colors" style={themeColor !== "default" ? { color: "var(--color-primary)" } : { color: "#10b981" }}>
                  {overallPercent}%
                </span>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 ml-2">
                  ({stats.owned} / {stats.total}장)
                </span>
              </div>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${themeColor === "default" ? 'bg-emerald-500' : ''}`} 
                style={themeColor !== "default" ? { backgroundColor: "var(--color-primary)", width: `${overallPercent}%` } : { width: `${overallPercent}%` }} 
              />
            </div>
          </div>

          {/* 유닛별 진행도 (3단 분할 시원한 뷰) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {UNIT_GROUPS.map(unit => {
              const uStat = stats.unitStats[unit.id];
              const uPct = uStat.total > 0 ? Math.floor((uStat.owned / uStat.total) * 100) : 0;
              return (
                <div key={unit.id} className="bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-2xl border border-zinc-100 dark:border-white/5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-sm group">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center p-1 shrink-0 group-hover:scale-110 transition-transform">
                      <img src={unit.logo} alt={unit.name} className="w-full h-full object-contain drop-shadow-sm" />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 truncate">{unit.name}</span>
                    <span className="text-[11px] font-black text-zinc-800 dark:text-zinc-200 ml-auto">{uPct}%</span>
                  </div>
                  <div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-1 shadow-inner">
                      <div className={`h-full rounded-full ${unit.color}`} style={{ width: `${uPct}%` }} />
                    </div>
                    <div className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500 text-right">
                      {uStat.owned} / {uStat.total}장
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </VideoPanel>

      {/* 🚨 3번 지시: 실시간 미래시 대시보드 (의상 프리뷰 위쪽 공간 B안 가로형 배치) */}
      <section className="bg-white dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-white/10 shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <span className="text-2xl">📡</span> 실시간 미래시
          </h2>
          <Link href="/future" style={themeColor !== "default" ? { color: "var(--color-primary)", backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" } : {}} className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 px-3 py-1.5 rounded-full hover:scale-105 transition-transform border border-transparent dark:border-white/5">
            전체 일정 보기 ➔
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveEvents.length > 0 ? (
            liveEvents.map((ev, idx) => (
              <Link key={`live-${idx}`} href="/future" className="group bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 rounded-2xl p-4 flex flex-col gap-2 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded border border-red-200 dark:border-red-500/20 self-start transition-colors">🔴 NOW LIVE</span>
                <h3 className="font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-primary transition-colors">{ev.name}</h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-auto pt-2">{ev.period.start} ~ {ev.period.end}</p>
              </Link>
            ))
          ) : (
            upcomingEvents.slice(0, 3).map((ev, idx) => (
              <Link key={`up-${idx}`} href="/future" className="group bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 rounded-2xl p-4 flex flex-col gap-2 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/20 self-start transition-colors">🟡 UPCOMING</span>
                <h3 className="font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-primary transition-colors line-clamp-2">{ev.name}</h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-auto pt-2">{ev.period.start} 시작 예정</p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Bottom: Costume Preview + Gacha */}
      <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
        {/* ✅ 왼쪽: 의상 프리뷰 (탭에 연동) */}
        <CostumePreviewCard preview={costumePreview} />

        {/* ✅ 오른쪽: 가챠 */}
        <div className="relative p-4">
          <GachaTabs
            types={GACHA_TYPES}
            value={selectedType}
            onChange={setSelectedType}
            worldLinkActiveColor={worldLinkColor}
            rightSlot={
              keywords.length ? (
                <div className="flex flex-wrap justify-end gap-2">
                  {keywords.map((k) => {
                    const b = getKeywordBadgeStyle(k, currentGacha);

                    return (
                      <span
                        key={k}
                        className={"group relative " + b.className}
                        style={b.style}
                      >
                        {b.iconSrc ? (
                          <Image src={b.iconSrc} alt={b.label} width={27} height={27} className="block" />
                        ) : ( b.label )}
  
                        {b.tooltip ? (
                          <span className="pointer-events-none absolute right-0 bottom-full mb-2 whitespace-nowrap rounded-lg border border-white/10 bg-zinc-950/90 px-2 py-1 text-[11px] text-zinc-100 shadow-lg opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 z-50">
                            {b.tooltip}
                            <span className="absolute right-3 -bottom-1 h-2 w-2 rotate-45 border-r border-b border-white/10 bg-zinc-950/90" />
                          </span>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
              ) : null
            }
          />

          <GachaCard gacha={currentGacha} />
        </div>
      </section>

      {/* ✅ 공지사항: 바닥에 깔기 */}
      <section className="p-4">
        <NoticePanel notices={NOTICES} />
      </section>
    </div>
  );
}