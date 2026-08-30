import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 카이토
// -> 얼굴 아이콘: KAITO_0.png 자동 매핑
const KAITOOriginal = defineCharacterCards("버싱", "카이토", "VS", "KAITO", {
  cards: [
        {
          info: {
            id: "VS_KAITO_005",
            cardName: "[탐욕스러운 재판관]",
            attribute: "cool",
            gachaType: "콜라보",
            gachaPoolName: "죄의 회고록 뽑기",
            skillType: "판강",
            releaseDate: "2022-11-20",
          },
          media: {
            gachaBannerPath: "/gachas/collab/banner_c1.png",
            songName: "악덕의 저지먼트",
            songJacketPath: "/jacket/22y/Akutoku_no_Judgment.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "USE 암성청 재판관 의상",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_KAITO_014",
            cardName: "[초조함을 적시는 노래]",
            attribute: "cute",
            gachaType: "페스",
            gachaPoolName: "[Brand New World 애니버서리 기념] 컬러풀 페스티벌 드림 픽 뽑기",
            skillType: "굿스업",
            releaseDate: "2024-09-30",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_f11.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Serenity STYLE",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_KAITO_019",
            cardName: "[격려하는 마음]",
            attribute: "mysterious",
            gachaType: "월링",
            gachaPoolName: "Melody of Wishes 뽑기",
            eventName: "너와 세카이의 시작에서",
            skillType: "힐",
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
            costumeName: "컴퍼스 재킷",
          },
        },
        {
          info: {
            id: "VS_KAITO_023",
            cardName: "[동료의 존재]",
            attribute: "happy",
            gachaType: "페스",
            gachaPoolName: "블룸 페스티벌 뽑기",
            eventName: "Deeper and deeper",
            skillType: "블페",
            releaseDate: "2026-07-07",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_f18.png",
            eventBannerPath: "/events/26y/banner_26_19_w.png",
            songName: "아이리드",
            songJacketPath: "/jacket/26y/EYELID.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Noble Eternity",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_KAITO_024",
            cardName: "[''불가사의''에 휘말려서]",
            attribute: "pure",
            gachaType: "월링",
            gachaPoolName: "Velvet Afternoon 뽑기",
            eventName: "Link the Beats!",
            skillType: "스업",
            releaseDate: "2026-09-06",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_26_0.png",
            eventBannerPath: "/events/26y/jbanner_26_26_0.png",
            songName: "톤데모 원더즈",
            songJacketPath: "/jacket/22y/Tondemo-Wonderz.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Classical Nails",
          },
        },
        {
          info: {
            id: "VS_KAITO_028",
            cardName: "[하늘로 배웅하며]",
            attribute: "pure",
            gachaType: "월링",
            gachaPoolName: "around table WITH you! 뽑기",
            eventName: "너의 곁, 너와 바라보는 내일",
            skillType: "스업",
            releaseDate: "2027-07-19",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_21.png",
            eventBannerPath: "/events/27y/jbanner_27_21.png",
            songName: "렘",
            songJacketPath: "/jacket/27y/Rem.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "하모니 벨라",
            hasHair: true,
          },
        },
    
  ]
});

// 🎸 2. Leo/need (레오니) 카이토
// -> 얼굴 아이콘: KAITO_l.png 자동 매핑
const KAITOLeoneed = defineCharacterCards("레오니", "카이토", "VS", "KAITO", {
  cards: [
        {
          info: {
            id: "VS_KAITO_004",
            cardName: "[소리로 말하는 합주]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "망설임을 끊어 내는 풀 메탈 뽑기",
            eventName: "Knock the Future!!",
            skillType: "힐",
            releaseDate: "2023-01-23",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_04_l.png",
            eventBannerPath: "/events/23y/banner_23_04_l.png",
            songName: "유성의 펄스",
            songJacketPath: "/jacket/23y/Pulse_of_the_Meteor.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "브레이브풀 하트",
          },
        },
        {
          info: {
            id: "VS_KAITO_006",
            cardName: "[조금 어색한 떠들썩함]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "Journey with U 뽑기",
            eventName: "그날, 하늘은 멀리 있었다",
            skillType: "스업",
            releaseDate: "2023-05-15",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_20_l.png",
            eventBannerPath: "/events/23y/banner_23_20_l.png",
            songName: "Peaky Peaky",
            songJacketPath: "/jacket/23y/Peaky_Peaky.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "롱 트립 라이더스",
          },
        },
          {
            info: {
              id: "VS_KAITO_013",
              cardName: "[지켜봐 온 궤적]",
              attribute: "cool",
              gachaType: "통상",
              gachaPoolName: "마음을 실어, Shooting Star!! 뽑기",
              eventName: "이어지는, 별의 노래",
              skillType: "퍼스업",
              releaseDate: "2024-07-21",
            },
            media: {
              gachaBannerPath: "/gachas/24y/banner_24_21_l.png",
              eventBannerPath: "/events/24y/banner_24_21_l.png",
              songName: "별을 잇다",
              songJacketPath: "/jacket/24y/Hoshi_wo_Tsunagu.png",
            },
            costume: {
              hasCostume: true,
              costumeName: "일루미네이트 스타",
            },
          },
          {
            info: {
              id: "VS_KAITO_016",
              cardName: "[어느 쪽에 찬성?!]",
              attribute: "cool",
              gachaType: "통상",
              gachaPoolName: "눈동자, 높은 곳을 목표로 뽑기",
              eventName: "이끄는 용기, 다정함을 가슴에",
              skillType: "판강",
              releaseDate: "2025-02-10",
            },
            media: {
              gachaBannerPath: "/gachas/25y/banner_25_05_l.png",
              eventBannerPath: "/events/25y/banner_25_05_l.png",
              songName: "레굴루스",
              songJacketPath: "/jacket/25y/Regulus.png",
            },
            costume: {
              hasCostume: true,
              costumeName: "커널 유니폼",
            },
          },
          {
            info: {
              id: "VS_KAITO_017",
              cardName: "[개구쟁이 발견자]",
              attribute: "cool",
              gachaType: "한정",
              gachaPoolName: "Play with dogs 뽑기",
              eventName: "Rise as ONE!",
              skillType: "팀스업",
              releaseDate: "2025-04-04",
            },
            media: {
              gachaBannerPath: "/gachas/25y/banner_25_10.png",
              eventBannerPath: "/events/25y/banner_25_10.png",
            },
            costume: {
              hasCostume: true,
              costumeName: "Gentle Dog",
              hasHair: true,
            },
          },

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 카이토
// -> 얼굴 아이콘: KAITO_m.png 자동 매핑
const KAITOMmj = defineCharacterCards("모모점", "카이토", "VS", "KAITO", {
  cards: [
        {
          info: {
            id: "VS_KAITO_010",
            cardName: "[어떤 어레인지가 좋을까?]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "강림한 자애로운 사수 뽑기",
            eventName: "활시위를 당겨, 하얀 세계에서",
            skillType: "힐",
            releaseDate: "2023-12-21",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_50.png",
            eventBannerPath: "/events/23y/banner_23_50.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "일루미네이트 아처",
          },
        },
        {
          info: {
            id: "VS_KAITO_018",
            cardName: "[최고의 스테이지를 만들기 위해]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "going upstairs 뽑기",
            eventName: "Lead to shine more",
            skillType: "스업",
            releaseDate: "2025-06-10",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_17_m.png",
            eventBannerPath: "/events/25y/banner_25_17_m.png",
            songName: "Supernova",
            songJacketPath: "/jacket/25y/Supernova.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "sparkle of smarts",
          },
        },
        {
          info: {
            id: "VS_KAITO_021",
            cardName: "[콩주머니라면 특기!]",
            attribute: "cute",
            gachaType: "한정",
            gachaPoolName: "영롱한 추억 뽑기",
            eventName: "Unfading wishing",
            skillType: "팀스업",
            releaseDate: "2026-01-04",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_01.png",
            eventBannerPath: "/events/26y/banner_26_01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "청풍의 날개옷",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_KAITO_027",
            cardName: "[세카이의 아이디어맨]",
            attribute: "happy",
            gachaType: "한정",
            gachaPoolName: "베일 너머의 당신에게 뽑기",
            eventName: "가장 먼 끝으로 날아가는 너에게",
            skillType: "팀스업",
            releaseDate: "2027-05-31",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_16.png",
            eventBannerPath: "/events/27y/jbanner_27_16.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "amour sincere",
            hasHair: true,
          },
        },

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 카이토
// -> 얼굴 아이콘: KAITO_v.png 자동 매핑
const KAITOVbs = defineCharacterCards("비배스", "카이토", "VS", "KAITO", {
  cards: [
        {
          info: {
            id: "VS_KAITO_003",
            cardName: "[활기찬 DJ 등장?]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "함께 걷는 크루 뽑기",
            eventName: "STRAY BAD DOG",
            skillType: "퍼스업",
            releaseDate: "2022-10-24",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_22_v.png",
            eventBannerPath: "/events/22y/banner_22_21_v.png",
            songName: "시네마",
            songJacketPath: "/jacket/22y/Cinema.png",
          },
        },
        {
          info: {
            id: "VS_KAITO_008",
            cardName: "[모두가 좋아하는 팬케이크!]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "AIM FOR LEGEND 뽑기",
            eventName: "THE POWER OF UNITY",
            skillType: "스업",
            releaseDate: "2023-07-17",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_29_v.png",
            eventBannerPath: "/events/23y/banner_23_29_v.png",
            songName: "월광",
            songJacketPath: "/jacket/23y/Moonlight.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "COOL SURVIVOR",
          },
        },
        {
          info: {
            id: "VS_KAITO_009",
            cardName: "[섬세함 아닐까?]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "From on a perch 뽑기",
            eventName: "Walk on and on",
            skillType: "힐",
            releaseDate: "2023-10-09",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_41_v.png",
            eventBannerPath: "/events/23y/banner_23_41_v.png",
            songName: "공허함을 부추기다",
            songJacketPath: "/jacket/23y/Hollow.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "House Walker",
          },
        },
        {
          info: {
            id: "VS_KAITO_011",
            cardName: "[푹신함은 섞는 방법에 달렸어!]",
            attribute: "mysterious",
            gachaType: "한정",
            gachaPoolName: "Imperial Soldiers 뽑기",
            eventName: "Never Give Up Cooking!",
            skillType: "팀스업",
            releaseDate: "2024-02-28",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_07.png",
            eventBannerPath: "/events/24y/banner_24_07.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "완더링 거너",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_KAITO_026",
            cardName: "[전력으로 달리는 너에게]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "Gathering place 뽑기",
            eventName: "GO ALL OUT",
            skillType: "힐",
            releaseDate: "2027-01-21",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_03_v.png",
            eventBannerPath: "/events/27y/jbanner_27_03_v.png",
            songName: "투과하는 온도",
            songJacketPath: "/jacket/27y/Touka_Suru_Ondo.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "에포트리스 오버올",
          },
        },

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 카이토
// -> 얼굴 아이콘: KAITO_w.png 자동 매핑
const KAITOWxs = defineCharacterCards("원더쇼", "카이토", "VS", "KAITO", {
  cards: [
        {
          info: {
            id: "VS_KAITO_001",
            cardName: "[헤매는 아이들의 말 상대]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "젠틀★포테이토 스타 뽑기",
            eventName: "전력! 원더 핼러윈!",
            skillType: "퍼스업",
            releaseDate: "2022-06-06",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_04_w.png",
            eventBannerPath: "/events/22y/banner_22_03_w.png",
            songName: "potato가 되어가",
            songJacketPath: "/jacket/22y/Becoming_Potatoes.png",
          },
        },
        {
          info: {
            id: "VS_KAITO_002",
            cardName: "[비밀스러운 연기 지도]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "하이 스쿨 카니발 뽑기",
            eventName: "KAMIHIGH FESTIVAL!",
            skillType: "판강",
            releaseDate: "2022-07-08",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_08.png",
            eventBannerPath: "/events/22y/banner_22_07.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "페스티벌 블레이저",
          },
        },
        {
          info: {
            id: "VS_KAITO_007",
            cardName: "[괜찮아, 얘들아]",
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
            costumeName: "화극의상 벚꽃",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_KAITO_012",
            cardName: "[응원의 힘을 믿어]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "잔물결에 휩쓸린 추억은 뽑기",
            eventName: "카나리아는 궁지 속에서 노래한다",
            skillType: "판강",
            releaseDate: "2024-05-25",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_15_w.png",
            eventBannerPath: "/events/24y/banner_24_15_w.png",
            songName: "모형 정원의 코럴",
            songJacketPath: "/jacket/24y/Coral.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "클래리티 가이",
          },
        },
        {
          info: {
            id: "VS_KAITO_022",
            cardName: "[다가가는 미소]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "Blooming Light 뽑기",
            eventName: "Choices for the future",
            skillType: "퍼스업",
            releaseDate: "2026-04-22",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_12_w.png",
            eventBannerPath: "/events/26y/banner_26_12_w.png",
            songName: "올 세이브 챌린지",
            songJacketPath: "/jacket/26y/All-Save_Challenge.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스리르 오트쿠튀르",
          },
        },
        {
          info: {
            id: "VS_KAITO_029",
            cardName: "[설레는 마음을 스푼에 얹어]",
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
            costumeName: "다크 렌드 핸드",
            hasHair: true,
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 카이토
// -> 얼굴 아이콘: KAITO_n.png 자동 매핑
const KAITONiigo = defineCharacterCards("니고", "카이토", "VS", "KAITO", {
  cards: [
        {
          info: {
            id: "VS_KAITO_015",
            cardName: "[모르는 척할 수 없는 마음]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Memory of Melody 뽑기",
            eventName: "그날, 연주한 음색을",
            skillType: "스업",
            releaseDate: "2024-12-20",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_36_n.png",
            eventBannerPath: "/events/24y/banner_24_36_n.png",
            songName: "25시의 정열",
            songJacketPath: "/jacket/24y/25-ji_no_Jounetsu.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "부추김의 세일러복",
          },
        },
        {
          info: {
            id: "VS_KAITO_020",
            cardName: "[영도의 말다툼]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "썩어가는 꽃은 이윽고 뽑기",
            eventName: "가시밭길은 어디로",
            skillType: "판강",
            releaseDate: "2025-10-12",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_29_n.png",
            eventBannerPath: "/events/25y/banner_25_29_n.png",
            songName: "둔갑의 꽃",
            songJacketPath: "/jacket/25y/BAKENOHANA.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "말없이 바치는 꽃",
          },
        },
        {
          info: {
            id: "VS_KAITO_025",
            cardName: "[망설임 없는 ''나다움''을]",
            attribute: "pure",
            gachaType: "한정",
            gachaPoolName: "Hues of the Self 뽑기",
            eventName: "Colors of Pure Sense",
            skillType: "팀스업",
            releaseDate: "2026-10-31",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_30_n.png",
            eventBannerPath: "/events/26y/jbanner_26_30_n.png",
            songName: "그 그림의 이름은",
            songJacketPath: "/jacket/26y/Sono_E_no_Namae_wa.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "벨리티 에이프런",
            hasHair: true,
          },
        },

  ]
});

// 🌟 카이토 카드를 배열로 싹 다 통합해서 내보내기!
export const KAITOCards = [
  ...KAITOOriginal,
  ...KAITOLeoneed,
  ...KAITOMmj,
  ...KAITOVbs,
  ...KAITOWxs,
  ...KAITONiigo,
];