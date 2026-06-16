"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="테마 전환"
      className="
        p-1
        text-zinc-500 dark:text-zinc-400
        transition-colors transition-transform duration-150
        hover:text-zinc-900 dark:hover:text-white
        active:scale-95
      "
    >
      <span className="text-lg">{isDark ? "☀︎" : "☾"}</span>
    </button>
  );
}