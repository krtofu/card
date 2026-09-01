import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎤 Vivid BAD SQUAD (비배스) 토우야
// -> 얼굴 아이콘: Toya.png 자동 매핑
const ToyaVbs = defineCharacterCards("비배스", "아오야기 토우야", "vbs", "Toya", {
  cards: [

  ]
});

// 🌟 토우야 카드를 배열로 내보내기!
export const ToyaCards = [
  ...ToyaVbs,
];