// lib/gachaNote.ts

export type Attr = "cute" | "mysterious" | "cool" | "happy" | "pure";

export function parseAttrsFromNote(
  note?: string
): { attrs: Attr[]; rest: string } {
  if (!note) return { attrs: [], rest: "" };

  const normalized = note.replace(/\s+/g, " ").trim();

  const idx = normalized.indexOf("속성");
  if (idx === -1) return { attrs: [], rest: normalized };

  const after = normalized.slice(idx);
  const dashPos = after.indexOf("-");
  if (dashPos === -1) return { attrs: [], rest: normalized };

  const tail = after.slice(dashPos + 1).trim();

  const parts = tail
    .split(/[·/,|]/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const known: Attr[] = [];
  const unknownBits: string[] = [];

  for (const p of parts) {
    if (p === "cute" || p === "mysterious" || p === "cool" || p === "happy" || p === "pure") {
      known.push(p);
    } else {
      unknownBits.push(p);
    }
  }

  let rest = normalized
    .replace(/속성\s*-\s*[^/|,·]+(\s*[·/,|]\s*[^/|,·]+)*/g, "")
    .trim();

  const extra = unknownBits.join(" · ").trim();
  if (extra) rest = rest ? `${rest} · ${extra}` : extra;

  return { attrs: Array.from(new Set(known)), rest };
}

export function attrBadgeClass(attr: Attr) {
  switch (attr) {
    case "cute":
      return "bg-pink-900/70 border-pink-700/60 text-pink-100";
    case "mysterious":
      return "bg-violet-900/70 border-violet-700/60 text-violet-100";
    case "cool":
      return "bg-sky-900/70 border-sky-700/60 text-sky-100";
    case "happy":
      return "bg-orange-900/70 border-orange-700/60 text-orange-100";
    case "pure":
      return "bg-emerald-900/70 border-emerald-700/60 text-emerald-100";
  }
}