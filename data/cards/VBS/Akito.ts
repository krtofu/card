import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎤 Vivid BAD SQUAD (비배스) 아키토
// -> 얼굴 아이콘: Akito.png 자동 매핑
const AkitoVbs = defineCharacterCards("비배스", "시노노메 아키토", "vbs", "Akito", {
  cards: [

  ]
});

// 🌟 아키토 카드를 배열로 내보내기!
export const AkitoCards = [
  ...AkitoVbs,
];