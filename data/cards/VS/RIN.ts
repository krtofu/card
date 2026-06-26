import { defineCharacterCards } from "../template";

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 린
// -> 얼굴 아이콘: RIN_0.png 자동 매핑
const RinOriginal = defineCharacterCards("버싱", "카가미네 린", "VS", "RIN", {
  cards: [
        {
          info: {
            id: "VS_RIN_006",
            cardName: "[오만한 왕녀]",
            attribute: "mysterious",
            gachaType: "콜라보",
            gachaPoolName: "죄의 회고록 뽑기",
            skillType: "스업",
            releaseDate: "2022-11-20",
          },
          media: {
            gachaBannerPath: "/gachas/collab/banner_c1.png",
            songName: "악의 딸",
            songJacketPath: "/jacket/22y/Aku_no_Musume.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "루시페니아 왕국 왕녀 정장",
            hasHair: true,
          },
        },
    
  ]
});

// 🎸 2. Leo/need (레오니) 린
// -> 얼굴 아이콘: RIN_l.png 자동 매핑
const RinLeoneed = defineCharacterCards("레오니", "카가미네 린", "VS", "RIN", {
  cards: [
        {
          info: {
            id: "VS_RIN_004",
            cardName: "[말괄량이 멜로디]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "무지갯빛 하모니 뽑기",
            eventName: "Unnamed Harmony",
            skillType: "힐",
            releaseDate: "2022-12-05",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_28_l.png",
            eventBannerPath: "/events/22y/banner_22_27_l.png",
            songName: "프롬 도쿄",
            songJacketPath: "/jacket/22y/From_Tokyo.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "프티 레인보우 코트",
          },
        },

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
        {
          info: {
            id: "VS_RIN_008",
            cardName: "[더 의지해 줘♪]",
            attribute: "cool",
            gachaType: "한정",
            gachaPoolName: "너에게 외치는 푸른 목소리 뽑기",
            eventName: "이어가는 Painful Hope",
            skillType: "팀스업",
            releaseDate: "2023-07-03",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_27_m.png",
            eventBannerPath: "/events/23y/banner_23_27_m.png",
            songName: "이프",
            songJacketPath: "/jacket/23y/IF.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "러블리 블랙 베레",
            hasHair: true,
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
        {
          info: {
            id: "VS_RIN_009",
            cardName: "[상영 중에는 조용히!]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "그날의 빛을 쫓아서 뽑기",
            eventName: "The Vivid Old Tale",
            skillType: "힐",
            releaseDate: "2023-08-21",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_34_v.png",
            eventBannerPath: "/events/23y/banner_23_34_v.png",
            songName: "거리",
            songJacketPath: "/jacket/23y/City.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "My Little Shine",
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
        {
          info: {
            id: "VS_RIN_010",
            cardName: "[사자춤 로봇과 술래잡기]",
            attribute: "mysterious",
            gachaType: "한정",
            gachaPoolName: "신수들의 새해 뽑기",
            eventName: "새해맞이! 사자춤 로봇의 새해 쇼!",
            skillType: "팀스업",
            releaseDate: "2024-01-04",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_01.png",
            eventBannerPath: "/events/24y/banner_24_01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "뛰어오르는 해태의 옷",
            hasHair: true,
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 린
// -> 얼굴 아이콘: RIN_n.png 자동 매핑
const RinNigo = defineCharacterCards("니고", "카가미네 린", "VS", "RIN", {
  cards: [
        {
          info: {
            id: "VS_RIN_005",
            cardName: "[앨범 속의 그 아이]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "망각의 스노 화이트 뽑기",
            eventName: "등불의 미라주",
            skillType: "퍼스업",
            releaseDate: "2023-01-30",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_05_n.png",
            eventBannerPath: "/events/23y/banner_23_05_n.png",
            songName: "재생",
            songJacketPath: "/jacket/23y/Reborn.png",
          },
        },  
        {
          info: {
            id: "VS_RIN_007",
            cardName: "[전하고 싶은 노랫소리]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "번지는 색채에 빠져들어 뽑기",
            eventName: "공백의 캔버스에 그리는 나는",
            skillType: "판강",
            releaseDate: "2023-06-05",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_23_n.png",
            eventBannerPath: "/events/23y/banner_23_23_n.png",
            songName: "노매드",
            songJacketPath: "/jacket/23y/Nomad.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "파스토랄 클로스",
          },
        },
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