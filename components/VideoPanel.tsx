"use client";

import ShortcutBox from "@/components/ShortcutBox";
import { type Region } from "@/lib/types";

type VideoMeta = {
  header?: string;
  title: string;
  subtitle?: string;
  credits?: string;
};

export default function VideoPanel({
  region,
  ytId,
  meta,
  onToggleRegion,
  children, // 🌟 메인 화면에서 들어오는 통계창
}: {
  region: Region;
  ytId?: string;
  meta?: VideoMeta;
  onToggleRegion: () => void;
  children?: React.ReactNode;
}) {
  return (
    // 🌟 [최종 해결] 범인 적출 완료! 
    // 240px로 막혀있던 벽을 'auto'로 바꿨습니다. 이제 버튼은 자기 크기만큼만 자리를 차지하고,
    // 통계창(1fr)이 남은 거대한 여백을 모두 흡수하며 좌우로 쫙! 넓어집니다.
    <section className={children ? "grid gap-6 lg:grid-cols-[1fr_auto]" : "grid gap-4 lg:grid-cols-[1fr_200px_240px]"}>
      
      {children ? (
        // 📊 통계창 구역: 투명 벽이 사라진 만큼 1fr이 끝까지 확장됩니다.
        <div className="min-w-0 w-full h-full">
          {children}
        </div>
      ) : (
        // 🎬 비디오 구역 (오리지널 유지)
        <>
          <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
            <div key={ytId} className="h-full w-full animate-video-fade">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                title="Project Sekai Official Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="relative mt-3 flex items-start justify-between gap-3">
            <div className="min-w-0 flex h-full flex-col">
              <div>
                {meta?.header && <div className="truncate text-sm tracking-tight text-zinc-400">{meta.header}</div>}
                <div className="truncate text-xl font-bold tracking-tight text-zinc-100">{meta?.title}</div>
                {meta?.credits && <div className="mt-1 whitespace-nowrap text-xs text-zinc-300">{meta.credits}</div>}
              </div>
              {meta?.subtitle && <div className="mt-auto pt-3 text-[10px] text-zinc-500">{meta.subtitle}</div>}
            </div>
          </div>
        </>
      )}

      {/* 🔗 기획자님의 오리지널 ShortcutBox 직배치!
          이제 240px 강제 할당이 풀렸으므로, 버튼들은 우측 구석에 예쁘게 붙고
          안내 텍스트는 좌측 하단 제자리를 완벽하게 지킵니다. */}
      <ShortcutBox region={region} onToggle={onToggleRegion} />
      
    </section>
  );
}