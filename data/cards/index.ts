import type { FinalCardInfo } from "./template";

// ==========================================
// 🎵 1. VIRTUAL SINGER (VS)
// ==========================================
import { MikuCards } from "./VS/MIKU";
// import { RinCards } from "./VS/RIN";
// import { RenCards } from "./VS/REN";
// import { LukaCards } from "./VS/LUKA";
// import { MeikoCards } from "./VS/MEIKO";
// import { KaitoCards } from "./VS/KAITO";

const VS_CARDS = [
  ...MikuCards,
  // ...RinCards,
  // ...RenCards,
  // ...LukaCards,
  // ...MeikoCards,
  // ...KaitoCards,
];

// ==========================================
// 🎸 2. Leo/need (Leoneed)
// ==========================================
import { IchikaCards } from "./Leoneed/Ichika";
// import { SakiCards } from "./Leoneed/Saki";
// import { HonamiCards } from "./Leoneed/Honami";
// import { ShihoCards } from "./Leoneed/Shiho";

const Leoneed_CARDS = [
  ...IchikaCards,
  // ...SakiCards,
  // ...HonamiCards,
  // ...ShihoCards,
];

// ==========================================
// ☘️ 3. MORE MORE JUMP! (MMJ)
// ==========================================
// import { MinoriCards } from "./MMJ/Minori";
// import { HarukaCards } from "./MMJ/Haruka";
// import { AiriCards } from "./MMJ/Airi";
// import { ShizukuCards } from "./MMJ/Shizuku";

const MMJ_CARDS = [
  // ...MinoriCards,
  // ...HarukaCards,
  // ...AiriCards,
  // ...ShizukuCards,
];

// ==========================================
// 🎤 4. Vivid BAD SQUAD (VBS)
// ==========================================
// import { KohaneCards } from "./VBS/Kohane";
// import { AnCards } from "./VBS/An";
// import { AkitoCards } from "./VBS/Akito";
// import { ToyaCards } from "./VBS/Toya";

const VBS_CARDS = [
  // ...KohaneCards,
  // ...AnCards,
  // ...AkitoCards,
  // ...ToyaCards,
];

// ==========================================
// 🎪 5. Wonderlands×Showtime (Wds)
// ==========================================
// import { TsukasaCards } from "./Wds/Tsukasa";
// import { EmuCards } from "./Wds/Emu";
// import { NeneCards } from "./Wds/Nene";
// import { RuiCards } from "./Wds/Rui";

const Wds_CARDS = [
  // ...TsukasaCards,
  // ...EmuCards,
  // ...NeneCards,
  // ...RuiCards,
];

// ==========================================
// 🎧 6. 25시, 나이트코드에서. (Niigo)
// ==========================================
// import { KanadeCards } from "./Niigo/Kanade"; // 👈 폴더 경로도 완벽하게 Niigo로 동기화!
// import { MafuyuCards } from "./Niigo/Mafuyu";
// import { EnaCards } from "./Niigo/Ena";
// import { MizukiCards } from "./Niigo/Mizuki";

const Niigo_CARDS = [
  // ...KanadeCards,
  // ...MafuyuCards,
  // ...EnaCards,
  // ...MizukiCards,
];

// ==========================================
// 🌟 7. [최종 허브 터미널] 앱 전체로 내보내기
// ==========================================
export const ALL_CARDS: FinalCardInfo[] = [
  ...VS_CARDS,
  ...Leoneed_CARDS,
  ...MMJ_CARDS,
  ...VBS_CARDS,
  ...Wds_CARDS,
  ...Niigo_CARDS,
];