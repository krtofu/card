"use client";

<div className="... max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full"></div>

import { useMemo, useState } from "react";
import Image from "next/image";

import GachaCard from "@/components/GachaCard";
import CostumeLink from "@/components/CostumeLink";
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

export default function Home() {
  const [selectedType, setSelectedType] = useState<GachaType>("통상");
  const [region, setRegion] = useState<Region>("한섭");

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

  return (
    <div className="space-y-6">
      {/* Top */}
      <ReprintSection sections={REPRINT_SECTIONS} />

      {/* Costume */}
      <CostumeLink />

      {/* Video */}
      <VideoPanel
        region={region}
        ytId={YT_IDS[region]}
        meta={currentVideo}
        onToggleRegion={toggleRegion}
      />

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
                          <Image
                            src={b.iconSrc}
                            alt={b.label}
                            width={27}
                            height={27}
                            className="block"
                          />
                        ) : (
                          b.label
                        )}
  
                        {b.tooltip ? (
                          <span
                            className="
                              pointer-events-none absolute right-0 bottom-full mb-2
                              whitespace-nowrap
                              rounded-lg border border-white/10 bg-zinc-950/90 px-2 py-1
                              text-[11px] text-zinc-100 shadow-lg
                              opacity-0 translate-y-1
                              transition-all duration-150
                              group-hover:opacity-100 group-hover:translate-y-0
                              z-50
                            "
                          >
                            {b.tooltip}
                            <span
                              className="
                                absolute right-3 -bottom-1
                                h-2 w-2 rotate-45
                                border-r border-b border-white/10
                                bg-zinc-950/90
                              "
                            />
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