import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 루카
// -> 얼굴 아이콘: LUKA_0.png 자동 매핑
const LUKAOriginal = defineCharacterCards("버싱", "메구리네 루카", "VS", "LUKA", {
  cards: [
        {
          info: {
            id: "VS_LUKA_007",
            cardName: "[질투에 눈이 먼 재봉사]",
            attribute: "cute",
            gachaType: "콜라보",
            gachaPoolName: "죄의 회고록 뽑기",
            skillType: "판강",
            releaseDate: "2022-11-20",
          },
          media: {
            gachaBannerPath: "/gachas/collab/banner_c1.png",
            songName: "엔비자카의 재봉사",
            songJacketPath: "/jacket/22y/Enbizaka_no_Shitateya.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "피로 물든 광기의 의상",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LUKA_010",
            cardName: "[이야기해, ''너''의 마음에]",
            attribute: "pure",
            gachaType: "페스",
            gachaPoolName: "[390만 명 돌파 기념] 컬러풀 페스티벌 드림 픽 뽑기",
            skillType: "체스업",
            releaseDate: "2023-10-16",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_f07.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "플레잉 미스터리 드레스",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LUKA_018",
            cardName: "[마음에 다가서서]",
            attribute: "cute",
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
            costumeName: "무디 컴퍼스",
          },
        },
        {
          info: {
            id: "VS_LUKA_021",
            cardName: "[돌고 도는 세카이, 느껴지는 마음]",
            attribute: "happy",
            gachaType: "페스",
            gachaPoolName: "[700만 명 돌파 기념] 블룸 페스티벌 드림 픽 뽑기",
            eventName: "Find the dream view",
            skillType: "블페",
            releaseDate: "2026-03-30",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_f17.png",
            eventBannerPath: "/events/26y/banner_26_10_l.png",
            songName: "Sympathy",
            songJacketPath: "/jacket/26y/Sympathy.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "White Attractive",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LUKA_023",
            cardName: "[대흥분의 무대!]",
            attribute: "cool",
            gachaType: "월링",
            gachaPoolName: "Velvet Afternoon 뽑기",
            eventName: "Link the Beats!",
            skillType: "스업",
            releaseDate: "2026-09-06",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_26_0.png",
            eventBannerPath: "/events/26y/jbanner_26_26_0.png",
            songName: "오더 메이드",
            songJacketPath: "/jacket/23y/Made_to_Order.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Classical Blush",
          },
        },
        {
          info: {
            id: "VS_LUKA_027",
            cardName: "[맡긴 소원]",
            attribute: "happy",
            gachaType: "월링",
            gachaPoolName: "Past Fragments 뽑기",
            eventName: "Into the New Light",
            skillType: "스업",
            releaseDate: "2027-06-08",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_17.png",
            eventBannerPath: "/events/27y/jbanner_27_17.png",
            songName: "여행으로 돌아가다",
            songJacketPath: "/jacket/27y/Tabi_ni_Kaeru.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Caring Aurora",
            hasHair: true,
          },
        },
    
  ]
});

// 🎸 2. Leo/need (레오니) 루카
// -> 얼굴 아이콘: LUKA_l.png 자동 매핑
const LUKALeoneed = defineCharacterCards("레오니", "메구리네 루카", "VS", "LUKA", {
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
        {
          info: {
            id: "VS_LUKA_002",
            cardName: "[우아한 미소]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "세카이의 두근두근 새해 뽑기",
            eventName: "세카이의 해피 뉴 이어!",
            skillType: "퍼스업",
            releaseDate: "2022-07-24",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_10.png",
            eventBannerPath: "/events/22y/banner_22_09.png",
          },
        },
        {
          info: {
            id: "VS_LUKA_008",
            cardName: "[칠판에 핀 벚꽃]",
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
            costumeName: "벚꽃 스튜던트",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LUKA_025",
            cardName: "[최고의 연습 상대]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "반짝임의 Sunny days 뽑기",
            eventName: "Path made by faith",
            skillType: "힐",
            releaseDate: "2027-02-10",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_05_l.png",
            eventBannerPath: "/events/27y/jbanner_27_05_l.png",
            songName: "이대로 가자",
            songJacketPath: "/jacket/27y/Kono_Manma_de_Ikou.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Gentle steps",
          },
        },

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 루카
// -> 얼굴 아이콘: LUKA_m.png 자동 매핑
const LUKAMmj = defineCharacterCards("모모점", "메구리네 루카", "VS", "LUKA", {
  cards: [
        {
          info: {
            id: "VS_LUKA_003",
            cardName: "[새로운 멤버 등장♪]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "비 온 뒤 반짝이는 무지개 뽑기",
            eventName: "Color of Myself!",
            skillType: "힐",
            releaseDate: "2022-09-02",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_15_m.png",
            eventBannerPath: "/events/22y/banner_22_14_m.png",
            songName: "Color of Drops",
            songJacketPath: "/jacket/22y/Color_of_Drops.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "디어 플라워",
          },
        },
            {
              info: {
                id: "VS_LUKA_006",
                cardName: "[든든한 말]",
                attribute: "happy",
                gachaType: "통상",
                gachaPoolName: "비밀의 일루미네이션 뽑기",
                eventName: "버디 퍼니 스펜드 타임♪",
                skillType: "힐",
                releaseDate: "2023-03-13",
              },
              media: {
                gachaBannerPath: "/gachas/23y/banner_23_11.png",
                eventBannerPath: "/events/23y/banner_23_11.png",
              },
              costume: {
                hasCostume: true,
                costumeName: "스위트나이트 퍼레이드",
              },
            },
            {
              info: {
                id: "VS_LUKA_013",
                cardName: "[반짝임을 보여 주기 위해]",
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
                costumeName: "패러간 마칭",
                hasHair: true,
              },
            },
            {
              info: {
                id: "VS_LUKA_015",
                cardName: "[인사는 아이돌의 기본]",
                attribute: "cool",
                gachaType: "통상",
                gachaPoolName: "밀착! 애니멀 폴리스 24시! 뽑기",
                eventName: "여기저기 사육사 체험!",
                skillType: "퍼스업",
                releaseDate: "2024-12-10",
              },
              media: {
                gachaBannerPath: "/gachas/24y/banner_24_35.png",
                eventBannerPath: "/events/24y/banner_24_35.png",
              },
              costume: {
                hasCostume: true,
                costumeName: "줄무늬 폴리스",
              },
            },
            {
              info: {
                id: "VS_LUKA_020",
                cardName: "[후회도 감싸안고]",
                attribute: "mysterious",
                gachaType: "통상",
                gachaPoolName: "Stay determined 뽑기",
                eventName: "Rise and Strive",
                skillType: "스업",
                releaseDate: "2026-01-31",
              },
              media: {
                gachaBannerPath: "/gachas/26y/banner_26_05_m.png",
                eventBannerPath: "/events/26y/banner_26_05_m.png",
                songName: "안티유",
                songJacketPath: "/jacket/26y/Anti_you.png",
              },
              costume: {
                hasCostume: true,
                costumeName: "Unfailing kindness",
              },
            },

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 루카
// -> 얼굴 아이콘: LUKA_v.png 자동 매핑
const LUKAVbs = defineCharacterCards("비배스", "메구리네 루카", "VS", "LUKA", {
  cards: [
        {
          info: {
            id: "VS_LUKA_011",
            cardName: "[서둘러 멤버들의 곁으로!]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Break the Chain 뽑기",
            eventName: "Find A Way Out",
            skillType: "스업",
            releaseDate: "2023-12-11",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_49_v.png",
            eventBannerPath: "/events/23y/banner_23_49_v.png",
            songName: "가사화",
            songJacketPath: "/jacket/23y/Kashika.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Ramble Rider",
          },
        },
        {
          info: {
            id: "VS_LUKA_014",
            cardName: "[갑작스러운 도발]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "FIND THE EXIT 뽑기",
            eventName: "BURN MY SOUL",
            skillType: "힐",
            releaseDate: "2024-10-12",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_29_v.png",
            eventBannerPath: "/events/24y/banner_24_29_v.png",
            songName: "CR에이ZY",
            songJacketPath: "/jacket/24y/CRaZY.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "SPARK SPARKLE",
          },
        },
        {
          info: {
            id: "VS_LUKA_019",
            cardName: "[흥미진진 등불 만들기!]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "너와 보는 가랑눈 뽑기",
            eventName: "Special present for YOU!",
            skillType: "스업",
            releaseDate: "2025-12-21",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_36.png",
            eventBannerPath: "/events/25y/banner_25_36.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Cat in pocket",
          },
        },
        {
          info: {
            id: "VS_LUKA_022",
            cardName: "[두 사람의 비밀 이야기]",
            attribute: "happy",
            gachaType: "한정",
            gachaPoolName: "Those who dare 뽑기",
            eventName: "Competitive fire!",
            skillType: "팀스업",
            releaseDate: "2026-07-31",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_22_v.png",
            eventBannerPath: "/events/26y/banner_26_22_v.png",
            songName: "액셀러레이트",
            songJacketPath: "/jacket/26y/Accelerate.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "PURE WATCHER",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LUKA_026",
            cardName: "[응원하는 마음도 듬뿍 담아서!]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "Proof the Red 뽑기",
            eventName: "Show 'em what's up!",
            skillType: "퍼스업",
            releaseDate: "2027-04-09",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_11_v.png",
            eventBannerPath: "/events/27y/jbanner_27_11_v.png",
            songName: "CRASH THE PARTY",
            songJacketPath: "/jacket/27y/CRASH_THE_PARTY.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Spit raw truth",
          },
        },
        {
          info: {
            id: "VS_LUKA_028",
            cardName: "[사이좋게 예이!]",
            attribute: "pure",
            gachaType: "한정",
            gachaPoolName: "Unspoken Code 뽑기",
            eventName: "Mix&Make Party Time!!",
            skillType: "팀스업",
            releaseDate: "2027-08-29",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_25_0.png",
            eventBannerPath: "/events/27y/jbanner_27_25_0.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "다크 오가나이저",
            hasHair: true,
          },
        },

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 루카
// -> 얼굴 아이콘: LUKA_w.png 자동 매핑
const LUKAWxs = defineCharacterCards("원더쇼", "메구리네 루카", "VS", "LUKA", {
  cards: [
        {
          info: {
            id: "VS_LUKA_005",
            cardName: "[바다를 마음에 그리며]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "노래여, 울려라! 꿈꾸는 머메이드 뽑기",
            eventName: "머메이드를 동경해서",
            skillType: "퍼스업",
            releaseDate: "2023-01-09",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_02_w.png",
            eventBannerPath: "/events/23y/banner_23_02_w.png",
            songName: "Glory Steady Go!",
            songJacketPath: "/jacket/23y/Glory_Steady_Go.png",
          },
        },
        {
          info: {
            id: "VS_LUKA_009",
            cardName: "[캇파가 좋아하는 것?]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "총명한 자들의 계략 뽑기",
            eventName: "불타올라라! 카미야마 응원단!",
            skillType: "판강",
            releaseDate: "2023-07-10",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_28.png",
            eventBannerPath: "/events/23y/banner_23_28.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "요염한 누님의 화려한 의상",
          },
        },
        {
          info: {
            id: "VS_LUKA_016",
            cardName: "[둥실둥실 드림 웨딩]",
            attribute: "mysterious",
            gachaType: "한정",
            gachaPoolName: "in my fairy tale 뽑기",
            eventName: "다 함께 방송♡ WEDDING LIVE!",
            skillType: "팀스업",
            releaseDate: "2025-05-31",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_16.png",
            eventBannerPath: "/events/25y/banner_25_16.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "lady of charming",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LUKA_017",
            cardName: "[화재 감시탑 위에서]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "악을 멸하라 징계 청부인 뽑기",
            eventName: "오라를 받아라?! 텐마 체포록",
            skillType: "힐",
            releaseDate: "2025-07-09",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_20_w.png",
            eventBannerPath: "/events/25y/banner_25_20_w.png",
            songName: "처단하겠다AAAAA아!",
            songJacketPath: "/jacket/25y/Seibai_ItaAAAAAsu.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "몽환적인 믿음의 옷",
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 루카
// -> 얼굴 아이콘: LUKA_n.png 자동 매핑
const LUKANiigo = defineCharacterCards("니고", "메구리네 루카", "VS", "LUKA", {
  cards: [
        {
          info: {
            id: "VS_LUKA_004",
            cardName: "[나는 내 방식대로]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "메모리즈 멜로디 뽑기",
            eventName: "카네이션 리컬렉션",
            skillType: "스업",
            releaseDate: "2022-11-28",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_27_n.png",
            eventBannerPath: "/events/22y/banner_22_26_n.png",
            songName: "카나데토모스소라",
            songJacketPath: "/jacket/22y/Kanadetomosusora.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "새벽하늘빛 그라데이션 드레스",
          },
        },
        {
          info: {
            id: "VS_LUKA_012",
            cardName: "[사고방식을 바꿔]",
            attribute: "cool",
            gachaType: "한정",
            gachaPoolName: "Escape from rain 뽑기",
            eventName: "우리들의 생존 도주",
            skillType: "팀스업",
            releaseDate: "2024-04-30",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_13_n.png",
            eventBannerPath: "/events/24y/banner_24_13_n.png",
            songName: "키티",
            songJacketPath: "/jacket/24y/kitty.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Escape girl",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LUKA_024",
            cardName: "[들떠오르는 예감]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Human×Tech 뽑기",
            eventName: "함께, 트루 루트를 목표로",
            skillType: "판강",
            releaseDate: "2026-12-10",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_34.png",
            eventBannerPath: "/events/26y/jbanner_26_34.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "통찰력 바디 슈트",
          },
        },

  ]
});

// 🌟 루카 카드를 배열로 싹 다 통합해서 내보내기!
export const LUKACards = [
  ...LUKAOriginal,
  ...LUKALeoneed,
  ...LUKAMmj,
  ...LUKAVbs,
  ...LUKAWxs,
  ...LUKANiigo,
];