import { IchikaCards } from "./Leoneed/Ichika"; 
// import { SakiCards } from "./Leoneed/Saki"; // 나중에 추가할 때도 이렇게 대문자로 세트!
// import { KanadeCards } from "./Nigo/Kanade";
import type { FinalCardInfo } from "./template";

/**
 * 🏆 [26인 마스터 카드 데이터베이스]
 * 완전히 대문자로 정돈된 IchikaCards 데이터를 허브에 가동합니다.
 */
export const ALL_CARDS: FinalCardInfo[] = [
  ...IchikaCards, // 🌟 변수명 대문자 반영 완료!
  // ...SakiCards,
  // ...KanadeCards,
];