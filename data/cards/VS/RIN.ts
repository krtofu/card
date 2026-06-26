import { defineCharacterCards } from "../template";

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 린
// -> 얼굴 아이콘: RIN_0.png 자동 매핑
const RinOriginal = defineCharacterCards("버싱", "카가미네 린", "VS", "RIN", {
  cards: [
    // 👉 여기에 sekai 스니펫을 치고 번호순(001, 002...)으로 쭉쭉 추가하세요!
    
  ]
});

// 🎸 2. Leo/need (레오니) 린
// -> 얼굴 아이콘: RIN_l.png 자동 매핑
const RinLeoneed = defineCharacterCards("레오니", "카가미네 린", "VS", "RIN", {
  cards: [

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 린
// -> 얼굴 아이콘: RIN_m.png 자동 매핑
const RinMmj = defineCharacterCards("모모점", "카가미네 린", "VS", "RIN", {
  cards: [
        {
          info: {
            id: "VS_RIN_002",
            cardName: "[네가 웃어 준다면]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "MORE MORE SMILE! 뽑기",
            eventName: "지금부터 RE:START!",
            skillType: "퍼스업",
            releaseDate: "2022-06-30",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_07_m.png",
            eventBannerPath: "/events/22y/banner_22_06_m.png",
            songName: "모어! 점프! 모어!",
            songJacketPath: "/jacket/22y/MORE_JUMP_MORE.png",
          },
        },

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 린
// -> 얼굴 아이콘: RIN_v.png 자동 매핑
const RinVbs = defineCharacterCards("비배스", "카가미네 린", "VS", "RIN", {
  cards: [
        {
          info: {
            id: "VS_RIN_001",
            cardName: "[아웅다웅 히트 업]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "서비스 시작 기념 뽑기",
            skillType: "판강",
            releaseDate: "2022-05-20",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "액티브 스트리트",
          },
        },

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 린
// -> 얼굴 아이콘: RIN_w.png 자동 매핑
const RinWxs = defineCharacterCards("원더쇼", "카가미네 린", "VS", "RIN", {
  cards: [
        {
          info: {
            id: "VS_RIN_003",
            cardName: "[우정의 큐피드]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "Rockin'Parade 뽑기",
            eventName: "울려 퍼지는 트와일라이트 퍼레이드",
            skillType: "힐",
            releaseDate: "2022-08-17",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_13.png",
            eventBannerPath: "/events/22y/banner_22_12.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "푹신푹신 록",
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 린
// -> 얼굴 아이콘: RIN_n.png 자동 매핑
const RinNigo = defineCharacterCards("니고", "카가미네 린", "VS", "RIN", {
  cards: [

  ]
});

// 🌟 7. 모든 린 카드를 하나의 배열로 싹 다 통합해서 내보내기!
export const RinCards = [
  ...RinOriginal,
  ...RinLeoneed,
  ...RinMmj,
  ...RinVbs,
  ...RinWxs,
  ...RinNigo,
];