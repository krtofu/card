import type { FinalCardInfo } from "./template";

// ==========================================
// 🎵 1. VIRTUAL SINGER (버싱)
// ==========================================
import { MikuCards } from "./VS/MIKU";
// import { RinCards } from "./VS/RIN";
// import { LenCards } from "./VS/REN";
// import { LukaCards } from "./VS/LUKA";
// import { MeikoCards } from "./VS/MEIKO";
// import { KaitoCards } from "./VS/KAITO";

const VS_CARDS = [
  ...MikuCards,
  // ...RinCards,
  // ...LenCards,
  // ...LukaCards,
  // ...MeikoCards,
  // ...KaitoCards,
];

// ==========================================
// 🎸 2. Leo/need (레오니)
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
// ☘️ 3. MORE MORE JUMP! (모모점)
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
// 🎤 4. Vivid BAD SQUAD (비배스)
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
// 🎪 5. Wonderlands×Showtime (원더쇼)
// ==========================================
// import { TsukasaCards } from "./WXs/Tsukasa";
// import { EmuCards } from "./WXs/Emu";
// import { NeneCards } from "./WXs/Nene";
// import { RuiCards } from "./WXs/Rui";

const WXs_CARDS = [
  // ...TsukasaCards,
  // ...EmuCards,
  // ...NeneCards,
  // ...RuiCards,
];

// ==========================================
// 🎧 6. 25시, 나이트코드에서. (니고)
// ==========================================
// import { KanadeCards } from "./25/Kanade";
// import { MafuyuCards } from "./25/Mafuyu";
// import { EnaCards } from "./25/Ena";
// import { MizukiCards } from "./25/Mizuki";

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
  ...WXs_CARDS,
  ...Niigo_CARDS,
];