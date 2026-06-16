"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { type GachaType } from "@/lib/types";
import { GACHA_TAB_STYLE } from "@/lib/gachaTabStyle";

export default function GachaTabs({
  types,
  value,
  onChange,
  rightSlot,
  worldLinkActiveColor,
}: {
  types: readonly GachaType[];
  value: GachaType;
  onChange: (v: GachaType) => void;
  rightSlot?: ReactNode;
  worldLinkActiveColor?: string | null;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0 flex flex-wrap gap-2">
        {types.map((t) => {
          const isActive = t === value;
          const style = GACHA_TAB_STYLE[t];

          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              style={
                t === "월링" && isActive && worldLinkActiveColor
                  ? {
                      backgroundColor: `${worldLinkActiveColor}33`,
                      borderColor: `${worldLinkActiveColor}66`,
                      color: "#fff",
                  }
                : undefined
              }
              className={clsx(
                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-200 backdrop-blur-sm",
                isActive ? style.active : style.inactive
              )}
            >
              {t}
            </button>
          );
        })}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  );
}