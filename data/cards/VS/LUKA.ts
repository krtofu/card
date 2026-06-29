import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 루카
// -> 얼굴 아이콘: LUKA_0.png 자동 매핑
const LukaOriginal = defineCharacterCards("버싱", "메구리네 루카", "VS", "LUKA", {
  cards: [
    // 👉 여기에 만능 스니펫(sekai)을 치고 번호순으로 쭉쭉 추가하세요!
    
  ]
});

// 🎸 2. Leo/need (레오니) 루카
// -> 얼굴 아이콘: LUKA_l.png 자동 매핑
const LukaLeoneed = defineCharacterCards("레오니", "메구리네 루카", "VS", "LUKA", {
  cards: [
        {
          info: {
            id: "VS_LUKA_001",
            cardName: "[황혼의 비를 닦아 내고]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "별 내리는 밤하늘의 추억 뽑기",
            eventName: "비 갠 뒤 첫 번째 별",
            skillType: "판강",
            releaseDate: "2022-05-21",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_02_l.png",
            eventBannerPath: "/events/22y/banner_22_01_l.png",
            songName: "스텔라",
            songJacketPath: "/jacket/22y/Stella.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스텔라 클로버",
          },
        },

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 루카
// -> 얼굴 아이콘: LUKA_m.png 자동 매핑
const LukaMmj = defineCharacterCards("모모점", "메구리네 루카", "VS", "LUKA", {
  cards: [

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 루카
// -> 얼굴 아이콘: LUKA_v.png 자동 매핑
const LukaVbs = defineCharacterCards("비배스", "메구리네 루카", "VS", "LUKA", {
  cards: [

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 루카
// -> 얼굴 아이콘: LUKA_w.png 자동 매핑
const LukaWxs = defineCharacterCards("원더쇼", "메구리네 루카", "VS", "LUKA", {
  cards: [

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 루카
// -> 얼굴 아이콘: LUKA_n.png 자동 매핑
const LukaNiigo = defineCharacterCards("니고", "메구리네 루카", "VS", "LUKA", {
  cards: [

  ]
});

// 🌟 루카 카드를 배열로 싹 다 통합해서 내보내기!
export const LukaCards = [
  ...LukaOriginal,
  ...LukaLeoneed,
  ...LukaMmj,
  ...LukaVbs,
  ...LukaWxs,
  ...LukaNiigo,
];