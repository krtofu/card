import { defineCharacterCards } from "../template";

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 미쿠
// -> 얼굴 아이콘: MIKU_0.png 자동 매핑
const MikuOriginal = defineCharacterCards("버싱", "하츠네 미쿠", "VS", "MIKU", {
  normal: [],
  limited: [],
  fes: [
      {
        info: {
          id: "VS_MIKU_007",
          cardName: "[마음이 겹치는 곳에서]",
          attribute: "mysterious",
          gachaType: "페스",
          gachaPoolName: "컬러풀 페스티벌 뽑기",
          skillType: "체스업",
          releaseDate: "2023-02-06",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_23_f03.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "그레이스풀 세카이 드레스",
          hasHair: true,
        },
      },
      {
        info: {
          id: "VS_MIKU_012",
          cardName: "[적어도, 나에게]",
          attribute: "pure",
          gachaType: "페스",
          gachaPoolName: "컬러풀 페스티벌 드림 픽 뽑기",
          skillType: "굿스업",
          releaseDate: "2023-10-16",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_23_f07.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "메모리즈 가이딩 스타일",
          hasHair: true,
        },
      },
    ]
});

// 🎸 2. Leo/need (레오니) 미쿠
// -> 얼굴 아이콘: MIKU_l.png 자동 매핑
const MikuLeoneed = defineCharacterCards("레오니", "하츠네 미쿠", "VS", "MIKU", {
  normal: [
      {
        info: {
          id: "VS_MIKU_006",
          cardName: "[성장하는 음색]",
          attribute: "pure",
          gachaType: "통상",
          gachaPoolName: "너와 만나는 벚꽃길 뽑기",
          eventName: "너와 노래해, 벚꽃 흩날리는 세상에서",
          skillType: "힐",
          releaseDate: "2022-10-03",
        },
        media: {
          gachaBannerPath: "/gachas/22y/banner_22_19.png",
          eventBannerPath: "/events/22y/banner_22_18.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "체리 핑크 크로싱",
        },
      },
      {
        info: {
          id: "VS_MIKU_013",
          cardName: "[겹치는 노랫소리]",
          attribute: "happy",
          gachaType: "통상",
          gachaPoolName: "NEON universe 뽑기",
          eventName: "Echo my melody",
          skillType: "판강",
          releaseDate: "2023-11-13",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_23_46_l.png",
          eventBannerPath: "/events/23y/banner_23_46_l.png",
          songName: "the WALL",
          songJacketPath: "/jacket/23y/the_WALL.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "NEON SINGER",
        },
      },
    ],
  limited: [
      {
        info: {
          id: "VS_MIKU_014",
          cardName: "[첫 스트리트!]",
          attribute: "happy",
          gachaType: "한정",
          gachaPoolName: "하늘하늘 흔들리는 소녀 뽑기",
          eventName: "교향하는 거리의 한편에서",
          skillType: "팀스업",
          releaseDate: "2024-04-04",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_24_10.png",
          eventBannerPath: "/events/23y/banner_24_10.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "설레는 소녀의 날개옷",
        },
      },
    ],
  fes: []
});

// ☘️ 3. MORE MORE JUMP! (모모점) 미쿠
// -> 얼굴 아이콘: MIKU_m.png 자동 매핑
const MikuMmj = defineCharacterCards("모모점", "하츠네 미쿠", "VS", "MIKU", {
  normal: [
    {
        info: {
          id: "VS_MIKU_001",
          cardName: "[새 스테이지 의상]",
          attribute: "cute",
          gachaType: "통상",
          gachaPoolName: "서비스 시작 기념 뽑기",
          eventName: "",
          skillType: "스업",
          releaseDate: "2022-05-20",
        },
        media: {
          gachaBannerPath: "/gachas/22y/banner_22_01.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "호핑 프릴",
        },
      },
      {
        info: {
          id: "VS_MIKU_010",
          cardName: "[세카이의 의상실로 안내♪]",
          attribute: "pure",
          gachaType: "통상",
          gachaPoolName: "마법을 걸어 줘! 위치 크래프트 뽑기",
          eventName: "Cast Spell on You",
          skillType: "판강",
          releaseDate: "2023-05-29",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_23_22_m.png",
          eventBannerPath: "/events/23y/banner_23_22_m.png",
          songName: "메타모 리본",
          songJacketPath: "/jacket/23y/Metamo_Ribon.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "모어 포춘 위치",
        },
      },
      {
        info: {
          id: "VS_MIKU_015",
          cardName: "[요코하마 가이드는 미식의 예감♪]",
          attribute: "mysterious",
          gachaType: "통상",
          gachaPoolName: "출항과 유대의 본 보야지 뽑기",
          eventName: "출항 전의 원데이 트립",
          skillType: "힐",
          releaseDate: "2024-05-11",
        },
        media: {
          gachaBannerPath: "/gachas/24y/banner_24_14.png",
          eventBannerPath: "/events/24y/banner_24_14.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "세일러 어프렌티스",
        },
      },
  ],
  limited: [],
  fes: []
});

// 🎤 4. Vivid BAD SQUAD (비배스) 미쿠
// -> 얼굴 아이콘: MIKU_v.png 자동 매핑
const MikuVbs = defineCharacterCards("비배스", "하츠네 미쿠", "VS", "MIKU", {
  normal: [
      {
        info: {
          id: "VS_MIKU_005",
          cardName: "[강자의 미소]",
          attribute: "pure",
          gachaType: "통상",
          gachaPoolName: "세카이의 두근두근 새해 뽑기",
          eventName: "세카이의 해피 뉴 이어!",
          skillType: "스업",
          releaseDate: "2022-07-24",
        },
        media: {
          gachaBannerPath: "/gachas/22y/banner_22_10.png",
          eventBannerPath: "/events/22y/banner_22_09.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "퍼내틱 뉴 이어",
        },
      },
      {
        info: {
          id: "VS_MIKU_008",
          cardName: "[듣고 싶지 않은 말이라도]",
          attribute: "cool",
          gachaType: "통상",
          gachaPoolName: "Break The Fence! 뽑기",
          eventName: "Bout for Beside You",
          skillType: "퍼스업",
          releaseDate: "2023-02-13",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_23_07_v.png",
          eventBannerPath: "/events/23y/banner_23_07_v.png",
          songName: "Awake Now",
          songJacketPath: "/jacket/23y/Awake_Now.png",
        },
      },
    ],
  limited: [],
  fes: []
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 미쿠
// -> 얼굴 아이콘: MIKU_w.png 자동 매핑
const MikuWxs = defineCharacterCards("원더쇼", "하츠네 미쿠", "VS", "MIKU", {
  normal: [
      {
        info: {
          id: "VS_MIKU_003",
          cardName: "[레츠 치어!]",
          attribute: "pure",
          gachaType: "통상",
          gachaPoolName: "생기발랄♪ 응원단 뽑기",
          eventName: "달려라! 운동회! ~바쁜 실행 위원~",
          skillType: "퍼스업",
          releaseDate: "2022-06-14",
        },
        media: {
          gachaBannerPath: "/gachas/22y/banner_22_05.png",
          eventBannerPath: "/events/22y/banner_22_04.png",
        },
      },
      {
        info: {
          id: "VS_MIKU_004",
          cardName: "[원더☆ 크리스마스!]",
          attribute: "cute",
          gachaType: "통상",
          gachaPoolName: "원더 캐럴 뽑기",
          eventName: "성스러운 밤에 이 노랫소리를",
          skillType: "판강",
          releaseDate: "2022-07-16",
        },
        media: {
          gachaBannerPath: "/gachas/22y/banner_22_09_w.png",
          eventBannerPath: "/events/22y/banner_22_08_w.png",
          songName: "무지갯빛 스토리즈",
          songJacketPath: "/jacket/22y/NIJIIRO_STORIES.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "프레젠트 포 유!",
        },
      },
    ],
  limited: [],
  fes: []
});

// 🎧 6. 25시, 나이트코드에서. (니고) 미쿠
// -> 얼굴 아이콘: MIKU_n.png 자동 매핑
const MikuNigo = defineCharacterCards("니고", "하츠네 미쿠", "VS", "MIKU", {
  normal: [
    {
        info: {
          id: "VS_MIKU_002",
          cardName: "[끊어진 실]",
          attribute: "cool",
          gachaType: "통상",
          gachaPoolName: "인형들의 무도회 뽑기",
          eventName: "사로잡힌 마리오네트",
          skillType: "퍼스업",
          releaseDate: "2022-05-29",
        },
        media: {
          gachaBannerPath: "/gachas/22y/banner_22_03_n.png",
          eventBannerPath: "/events/22y/banner_22_02_n.png",
          songName: "잭팟 새드 걸",
          songJacketPath: "/jacket/22y/Jack_Pot_Sad_Girl.png",
        },
      },
      {
        info: {
          id: "VS_MIKU_009",
          cardName: "[올곧은 가사]",
          attribute: "cute",
          gachaType: "통상",
          gachaPoolName: "겹치는 마음 Words Snow 뽑기",
          eventName: "교차하는 선율 빛을 밝히는 온기",
          skillType: "퍼스업",
          releaseDate: "2023-03-20",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_23_12.png",
          eventBannerPath: "/events/23y/banner_23_12.png",
        },
      },
  ],
  limited: [
      {
        info: {
          id: "VS_MIKU_011",
          cardName: "[바람에 흩날리는 꽃잎 속에서]",
          attribute: "happy",
          gachaType: "한정",
          gachaPoolName: "봄을 생각하는, 초저녁 한때 뽑기",
          eventName: "세카이의 벚꽃, 이어지는 마음",
          skillType: "팀스업",
          releaseDate: "2023-06-17",
        },
        media: {
          gachaBannerPath: "/gachas/23y/banner_23_24_0.png",
          eventBannerPath: "/events/23y/banner_23_24_0.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "밤벚꽃의 옷",
        },
      },
    ],
  fes: []
});

// 🌟 7. 모든 미쿠 카드를 하나의 배열로 싹 다 통합해서 내보내기!
export const MikuCards = [
  ...MikuOriginal,
  ...MikuLeoneed,
  ...MikuMmj,
  ...MikuVbs,
  ...MikuWxs,
  ...MikuNigo,
];