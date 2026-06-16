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
}: {
  region: Region;
  ytId: string;
  meta: VideoMeta;
  onToggleRegion: () => void;
}) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_200px_240px]">
      {/* Big video area */}
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

      {/* Video meta */}
      <div className="relative mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex h-full flex-col">
          <div>
            {meta.header ? (
              <div className="truncate text-sm tracking-tight text-zinc-400">
                {meta.header}
              </div>
            ) : null}

            <div className="truncate text-xl font-bold tracking-tight text-zinc-100">
              {meta.title}
            </div>

            {meta.credits ? (
              <div className="mt-1 whitespace-nowrap text-xs text-zinc-300">
                {meta.credits}
              </div>
            ) : null}
          </div>

          {meta.subtitle ? (
            <div className="mt-auto pt-3 text-[10px] text-zinc-500">
              {meta.subtitle}
            </div>
          ) : null}
        </div>
      </div>

      {/* Shortcuts + badge */}
      <ShortcutBox region={region} onToggle={onToggleRegion} />
    </section>
  );
}