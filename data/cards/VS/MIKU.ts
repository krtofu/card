import { defineCharacterCards } from "../template";

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 미쿠
// -> 얼굴 아이콘: MIKU_0.png 자동 매핑
const MikuOriginal = defineCharacterCards("버싱", "하츠네 미쿠", "VS", "MIKU", {
  cards: [
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
    {
      info: {
        id: "VS_MIKU_017",
        cardName: "[feat. 헬로키티]",
        attribute: "mysterious",
        gachaType: "콜라보",
        gachaPoolName: "SEKAI에서 Hello♡ 멋진 만남 뽑기",
        skillType: "스업",
        releaseDate: "2024-12-05",
      },
      media: {
        gachaBannerPath: "/gachas/collab/banner_c2.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "애플 피크닉 코디",
      }
    },
    {
      info: {
        id: "VS_MIKU_020",
        cardName: "[마음을 맡기고]",
        attribute: "cool",
        gachaType: "월링",
        gachaPoolName: "Melody of Wishes 뽑기",
        eventName: "너와 세카이의 시작에서",
        skillType: "스업",
        releaseDate: "2025-08-17",
      },
      media: {
        gachaBannerPath: "/gachas/25y/banner_25_24_0.png",
        eventBannerPath: "/events/25y/banner_25_24_0.png",
        songName: "아임 마인",
        songJacketPath: "/jacket/24y/Im_Mine.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "피처 컴퍼스",
      }
    },
    {
      info: {
        id: "VS_MIKU_022",
        cardName: "[창의 세카이에서]",
        attribute: "cool",
        gachaType: "콜라보",
        gachaPoolName: "",
        skillType: "스업",
        releaseDate: "2025-05-29",
      },
      media: {
        songName: "Hello, SEKAI",
        songJacketPath: "/jacket/25y/Hello_SEKAI.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "클로즈드 크로스 블루종 / 오픈드 미츠 드레스",
        hasHair: true,
        isMovieStyle: true
      }
    },
    {
      info: {
        id: "VS_MIKU_024",
        cardName: "[뒤섞이는 경계]",
        attribute: "happy",
        gachaType: "콜라보",
        gachaPoolName: "[프로세카×동방 project 컬래버레이션 제2탄 기념] 환상향 컬렉션 뽑기",
        eventName: "",
        skillType: "스업",
        releaseDate: "2025-11-20",
        hasAwakening: false,
      },
      media: {
        gachaBannerPath: "/gachas/collab/banner_c5.png",
        songName: ["초 나이트 오브 나이츠", "동방☆원더랜드", "치르노의 퍼펙트 산수교실"],
        songJacketPath: ["/jacket/25y/Cho-Night_of_Knights.png", "/jacket/25y/Touhou_Wonderland.png", "/jacket/25y/Cirno-s_Perfect_Math_Academy.png"],
      },
    },
    {
      info: {
        id: "VS_MIKU_026",
        cardName: "[약속을 가슴에]",
        attribute: "happy",
        gachaType: "월링",
        gachaPoolName: "Velvet Afternoon 뽑기",
        eventName: "Link the Beats!",
        skillType: "스업",
        releaseDate: "2025-09-06",
      },
      media: {
        gachaBannerPath: "/gachas/26y/jbanner_26_26_0.png",
        eventBannerPath: "/events/26y/jbanner_26_26_0.png",
        songName: "후회한다 쓰고 미래",
        songJacketPath: "/jacket/22y/Kuyamu_to_Kaite_Mirai.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "Classical Perfume",
      }
    },
    {
      info: {
        id: "VS_MIKU_027",
        cardName: "[인도하는 노래]",
        attribute: "cool",
        gachaType: "콜라보",
        gachaPoolName: "모두가 다마고치 친구! 드림~ 뽑기",
        skillType: "힐",
        releaseDate: "2026-05-22",
      },
      media: {
        gachaBannerPath: "/gachas/collab/banner_c4.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "마메치풍 도트 재킷",
      }
    },
    {
      info: {
        id: "VS_MIKU_029",
        cardName: "[힘이 될 수 있는 기쁨]",
        attribute: "cute",
        gachaType: "월링",
        gachaPoolName: "YELL of Messengers 뽑기",
        eventName: "약속의 Passerelle",
        skillType: "스업",
        releaseDate: "2027-04-18",
      },
      media: {
        gachaBannerPath: "/gachas/27y/jbanner_27_12.png",
        eventBannerPath: "/events/27y/jbanner_27_12.png",
        songName: "세상을 걷는 법",
        songJacketPath: "/jacket/27y/Sekai_no_Arukikata.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "Wish Cheer",
        hasHair: true,
      }
    },
  ]
});

// 🎸 2. Leo/need (레오니) 미쿠
// -> 얼굴 아이콘: MIKU_l.png 자동 매핑
const MikuLeoneed = defineCharacterCards("레오니", "하츠네 미쿠", "VS", "MIKU", {
  cards: [
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
        gachaBannerPath: "/gachas/24y/banner_24_10.png",
        eventBannerPath: "/events/24y/banner_24_10.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "설레는 소녀의 날개옷",
        hasHair: true,
      },
    },
    {
      info: {
        id: "VS_MIKU_023",
        cardName: "[울려 퍼지는 마음에 감싸여]",
        attribute: "cool",
        gachaType: "한정",
        gachaPoolName: "Living With Music 뽑기",
        eventName: "Find the dream view",
        skillType: "팀스업",
        releaseDate: "2026-04-04",
      },
      media: {
        gachaBannerPath: "/gachas/26y/banner_26_10_l.png",
        eventBannerPath: "/events/26y/banner_26_10_l.png",
        songName: "Sympathy",
        songJacketPath: "/jacket/26y/Sympathy.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "raise hearts voice",
        hasHair: true,
      }
    },
  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 미쿠
// -> 얼굴 아이콘: MIKU_m.png 자동 매핑
const MikuMmj = defineCharacterCards("모모점", "하츠네 미쿠", "VS", "MIKU", {
  cards: [
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
    {
      info: {
        id: "VS_MIKU_018",
        cardName: "[궤적이 느껴지는 상흔]",
        attribute: "pure",
        gachaType: "통상",
        gachaPoolName: "하늘에 그리는 무지개 마법 뽑기",
        eventName: "새겨진 상처는 이윽고",
        skillType: "힐",
        releaseDate: "2025-02-20",
      },
      media: {
        gachaBannerPath: "/gachas/25y/banner_25_06_m.png",
        eventBannerPath: "/events/25y/banner_25_06_m.png",
        songName: "JUMPIN’ OVER !",
        songJacketPath: "/jacket/25y/JUMPIN-OVER.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "CLOUDY magician",
      }
    },
    {
      info: {
        id: "VS_MIKU_021",
        cardName: "[마음으로 느낀 눈빛]",
        attribute: "happy",
        gachaType: "통상",
        gachaPoolName: "high-flapping hope 뽑기",
        eventName: "Grow glorious glow",
        skillType: "힐",
        releaseDate: "2025-12-11",
      },
      media: {
        gachaBannerPath: "/gachas/25y/banner_25_35_m.png",
        eventBannerPath: "/events/25y/banner_25_35_m.png",
        songName: "달려라! 저 멀리! 닿아라!",
        songJacketPath: "/jacket/25y/Hashiru_Tooku_Todoku.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "조력의 페더",
      }
    },
  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 미쿠
// -> 얼굴 아이콘: MIKU_v.png 자동 매핑
const MikuVbs = defineCharacterCards("비배스", "하츠네 미쿠", "VS", "MIKU", {
  cards: [
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
    {
      info: {
        id: "VS_MIKU_019",
        cardName: "[문 너머로]",
        attribute: "mysterious",
        gachaType: "한정",
        gachaPoolName: "The Party Of Blast!! 뽑기",
        eventName: "OVER RAD SQUAD!!",
        skillType: "팀스업",
        releaseDate: "2025-07-04",
      },
      media: {
        gachaBannerPath: "/gachas/25y/banner_25_19_v.png",
        eventBannerPath: "/events/25y/banner_25_19_v.png",
        songName: "ULTRA C",
        songJacketPath: "/jacket/25y/ULTRA_C.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "Stunning lady",
        hasHair: true,
      }
    },
    {
      info: {
        id: "VS_MIKU_025",
        cardName: "[갑작스러운 위기]",
        attribute: "cute",
        gachaType: "한정",
        gachaPoolName: "광망이 비치는 여명 뽑기",
        eventName: "Aim higher and higher!",
        skillType: "팀스업",
        releaseDate: "2026-05-30",
      },
      media: {
        gachaBannerPath: "/gachas/26y/banner_26_16_v.png",
        eventBannerPath: "/events/26y/banner_26_16_v.png",
        songName: "광선가",
        songJacketPath: "/jacket/26y/Kousenka.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "새벽빛을 우러러보는 붉은 불꽃",
        hasHair: true,
      }
    },
  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 미쿠
// -> 얼굴 아이콘: MIKU_w.png 자동 매핑
const MikuWxs = defineCharacterCards("원더쇼", "하츠네 미쿠", "VS", "MIKU", {
  cards: [
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
    {
      info: {
        id: "VS_MIKU_016",
        cardName: "[반짝반짝 미소의 마법]",
        attribute: "cute",
        gachaType: "한정",
        gachaPoolName: "마음을 연주하는 마칭 퍼레이드 뽑기",
        eventName: "세카이에 울려 퍼져라! Your Song",
        skillType: "팀스업",
        releaseDate: "2024-08-31",
      },
      media: {
        gachaBannerPath: "/gachas/24y/banner_24_25_0.png",
        eventBannerPath: "/events/24y/banner_24_25_0.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "스마일링 마칭",
        hasHair: true,
      },
    },
  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 미쿠
// -> 얼굴 아이콘: MIKU_n.png 자동 매핑
const MikuNigo = defineCharacterCards("니고", "하츠네 미쿠", "VS", "MIKU", {
  cards: [
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
        hasHair: true,
      },
    },
    {
      info: {
        id: "VS_MIKU_028",
        cardName: "[마음에 드는 옷]",
        attribute: "cute",
        gachaType: "통상",
        gachaPoolName: "우리들의 밤이 깨어나기 전에 뽑기",
        eventName: "Amid the Wavering Light",
        skillType: "스업",
        releaseDate: "2027-03-20",
      },
      media: {
        gachaBannerPath: "/gachas/27y/jbanner_27_09_n.png",
        eventBannerPath: "/events/27y/jbanner_27_09_n.png",
        songName: "고백",
        songJacketPath: "/jacket/27y/Kokuhaku.png",
      },
      costume: {
        hasCostume: true,
        costumeName: "Awaiting Coat",
      }
    },
  ]
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