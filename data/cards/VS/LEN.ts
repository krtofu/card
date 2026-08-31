import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 렌
// -> 얼굴 아이콘: LEN_0.png 자동 매핑
const LENOriginal = defineCharacterCards("버싱", "카가미네 렌", "VS", "LEN", {
  cards: [
        {
          info: {
            id: "VS_LEN_006",
            cardName: "[쌍둥이 하인]",
            attribute: "happy",
            gachaType: "콜라보",
            gachaPoolName: "죄의 회고록 뽑기",
            skillType: "스업",
            releaseDate: "2022-11-20",
          },
          media: {
            gachaBannerPath: "/gachas/collab/banner_c1.png",
            songName: "악의 하인",
            songJacketPath: "/jacket/22y/Aku_no_Meshitsukai.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "루시페니아 왕국 하인 의상",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LEN_012",
            cardName: "[너를 위한 응원]",
            attribute: "cute",
            gachaType: "페스",
            gachaPoolName: "[전 세계 3900만 명 돌파 기념] 컬러풀 페스티벌 뽑기",
            skillType: "굿스업",
            releaseDate: "2024-03-30",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_f09.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "소망의 홀리 코트",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LEN_018",
            cardName: "[어디서나 최고의 파트너]",
            attribute: "happy",
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
            costumeName: "테일 코트 컴퍼스",
          },
        },
        {
          info: {
            id: "VS_LEN_025",
            cardName: "[양속 가득한 과자]",
            attribute: "mysterious",
            gachaType: "월링",
            gachaPoolName: "Velvet Afternoon 뽑기",
            eventName: "Link the Beats!",
            skillType: "스업",
            releaseDate: "2026-09-06",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_26_0.png",
            eventBannerPath: "/events/26y/jbanner_26_26_0.png",
            songName: "Flyer!",
            songJacketPath: "/jacket/22y/Flyer.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Classical Gloss",
          },
        },
        {
          info: {
            id: "VS_LEN_029",
            cardName: "[반짝임은 겹쳐져서]",
            attribute: "cool",
            gachaType: "월링",
            gachaPoolName: "Vie for the Title 뽑기",
            eventName: "Great Yell for Dreamers!",
            skillType: "스업",
            releaseDate: "2027-05-17",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_15.png",
            eventBannerPath: "/events/27y/jbanner_27_15.png",
            songName: "드리머즈 비트",
            songJacketPath: "/jacket/27y/Dreamers_Beat.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Serenity Dancer",
            hasHair: true,
          },
        },
    
  ]
});

// 🎸 2. Leo/need (레오니) 렌
// -> 얼굴 아이콘: LEN_l.png 자동 매핑
const LENLeoneed = defineCharacterCards("레오니", "카가미네 렌", "VS", "LEN", {
  cards: [
        {
          info: {
            id: "VS_LEN_010",
            cardName: "[방과 후의 한때]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "점점 가라앉는 adolescence 뽑기",
            eventName: "No seek No find",
            skillType: "힐",
            releaseDate: "2023-08-28",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_35_l.png",
            eventBannerPath: "/events/23y/banner_23_35_l.png",
            songName: "번질번질",
            songJacketPath: "/jacket/23y/SHOW_OFF.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "D.C.Be help",
          },
        },
        {
          info: {
            id: "VS_LEN_014",
            cardName: "[마음을 담은 연주로]",
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
            costumeName: "인커리지 마칭",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LEN_019",
            cardName: "[사이다에 둘러싸여]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "Me and my diva 뽑기",
            eventName: "This moment with you!",
            skillType: "판강",
            releaseDate: "2025-09-20",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_27_l.png",
            eventBannerPath: "/events/25y/banner_25_27_l.png",
            songName: "그럼에도 우리는 노래하기를 그만두지 않아",
            songJacketPath: "/jacket/25y/Sore_Uta.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "캣 니트 보이",
          },
        },
        {
          info: {
            id: "VS_LEN_028",
            cardName: "[의외의 선객]",
            attribute: "mysterious",
            gachaType: "한정",
            gachaPoolName: "Cherished memories 뽑기",
            eventName: "따뜻한 추억을 더듬어",
            skillType: "팀스업",
            releaseDate: "2027-04-30",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_13_l.png",
            eventBannerPath: "/events/27y/jbanner_27_13_l.png",
            songName: "별에 가장 가까운 장소",
            songJacketPath: "/jacket/27y/Hoshi_ni_Ichiban_Chikai_Basho.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "연성 수브닐",
            hasHair: true,
          },
        },

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 렌
// -> 얼굴 아이콘: LEN_m.png 자동 매핑
const LENMmj = defineCharacterCards("모모점", "카가미네 렌", "VS", "LEN", {
  cards: [
        {
          info: {
            id: "VS_LEN_005",
            cardName: "[스테이지의 왕자님]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "러블리 메신저 뽑기",
            eventName: "해피 러블리 에브리데이!",
            skillType: "힐",
            releaseDate: "2023-01-02",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_01_m.png",
            eventBannerPath: "/events/23y/banner_23_01_m.png",
            songName: "아이스 드롭",
            songJacketPath: "/jacket/23y/icedrop.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "희망의 메신저",
          },
        },
        {
          info: {
            id: "VS_LEN_013",
            cardName: "[우리니까 할 수 있는 말]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "마음이 반짝이는 보석함 뽑기",
            eventName: "STEP by STEP!",
            skillType: "스업",
            releaseDate: "2024-06-20",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_18_m.png",
            eventBannerPath: "/events/24y/banner_24_18_m.png",
            songName: "팀메이트",
            songJacketPath: "/jacket/24y/Teammate.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스파클 젬",
          },
        },
        {
          info: {
            id: "VS_LEN_022",
            cardName: "[특별한 하트를 너에게]",
            attribute: "happy",
            gachaType: "한정",
            gachaPoolName: "Night sweet meal 뽑기",
            eventName: "이 바늘 한 땀에 마음을 담아",
            skillType: "팀스업",
            releaseDate: "2026-01-31",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_04.png",
            eventBannerPath: "/events/26y/banner_26_04.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Shady rose-duke",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LEN_026",
            cardName: "[무대에 정통한 자]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "The Light We Found 뽑기",
            eventName: "이 이야기는 희망을 싣고",
            skillType: "힐",
            releaseDate: "2026-12-21",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_35_m.png",
            eventBannerPath: "/events/26y/jbanner_26_35_m.png",
            songName: "Polar Star",
            songJacketPath: "/jacket/26y/Polar_Star.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Calm Wisdom",
          },
        },
        {
          info: {
            id: "VS_LEN_030",
            cardName: "[꽃피는 렌 이야기]",
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
            costumeName: "다크 엠퍼사이저",
            hasHair: true,
          },
        },

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 렌
// -> 얼굴 아이콘: LEN_v.png 자동 매핑
const LENVbs = defineCharacterCards("비배스", "카가미네 렌", "VS", "LEN", {
  cards: [
        {
          info: {
            id: "VS_LEN_002",
            cardName: "[최고&최강의 콤비?!]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "세카이의 두근두근 새해 뽑기",
            eventName: "세카이의 해피 뉴 이어!",
            skillType: "판강",
            releaseDate: "2022-07-24",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_10.png",
            eventBannerPath: "/events/22y/banner_22_09.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "축하의 후디",
          },
        },
        {
          info: {
            id: "VS_LEN_004",
            cardName: "[나의 댄싱 슈즈!]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "여름밤에 떠오르는 지난날 뽑기",
            eventName: "여름 축제, 울려 퍼지는 소리는",
            skillType: "퍼스업",
            releaseDate: "2022-12-19",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_30.png",
            eventBannerPath: "/events/22y/banner_22_29.png",
          },
        },
        {
          info: {
            id: "VS_LEN_007",
            cardName: "[억누르지 못한 흥미]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "스카이 러너즈! 뽑기",
            eventName: "Legend still vivid",
            skillType: "스업",
            releaseDate: "2023-05-08",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_19_v.png",
            eventBannerPath: "/events/23y/banner_23_19_v.png",
            songName: "Flyer!",
            songJacketPath: "/jacket/23y/Flyer.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "블루미 스카이 후드",
          },
        },
        {
          info: {
            id: "VS_LEN_008",
            cardName: "[봄빛 디저트에 둘러싸여]",
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
            costumeName: "봄빛 스카잔",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LEN_021",
            cardName: "[커다란 아침 식사]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Unknown tone 뽑기",
            eventName: "Time to take off!",
            skillType: "판강",
            releaseDate: "2026-01-11",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_02_v.png",
            eventBannerPath: "/events/26y/banner_26_02_v.png",
            songName: "헤이븐",
            songJacketPath: "/jacket/26y/HAVEN.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Dance of pleasure",
          },
        },

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 렌
// -> 얼굴 아이콘: LEN_w.png 자동 매핑
const LENWxs = defineCharacterCards("원더쇼", "카가미네 렌", "VS", "LEN", {
  cards: [
        {
          info: {
            id: "VS_LEN_001",
            cardName: "[새로운 단원 등장!]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "서비스 시작 기념 뽑기",
            skillType: "힐",
            releaseDate: "2022-05-20",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "리틀 스타",
          },
        },
        {
          info: {
            id: "VS_LEN_003",
            cardName: "[반짝반짝 호기심☆]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "로맨틱 브라이드 뽑기",
            eventName: "순백의 그대에게 맹세의 노래를!",
            skillType: "퍼스업",
            releaseDate: "2022-11-14",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_25.png",
            eventBannerPath: "/events/22y/banner_22_24.png",
          },
        },
        {
          info: {
            id: "VS_LEN_011",
            cardName: "[즐거움 가득 보물 상자]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "반짝이는 밤하늘의 Milky Way 뽑기",
            eventName: "꿈속, 빛나는 별들에게",
            skillType: "판강",
            releaseDate: "2024-01-10",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_02_w.png",
            eventBannerPath: "/events/24y/banner_24_02_w.png",
            songName: "별하늘 오케스트라",
            songJacketPath: "/jacket/24y/Hoshizora_Orchestra.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "페어리 팅크",
          },
        },
        {
          info: {
            id: "VS_LEN_015",
            cardName: "[동경하는 주인공]",
            attribute: "pure",
            gachaType: "한정",
            gachaPoolName: "화려한 도시로의 초대 뽑기",
            eventName: "최고의 크랭크 업!",
            skillType: "팀스업",
            releaseDate: "2024-11-30",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_34.png",
            eventBannerPath: "/events/24y/banner_24_34.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "꿈꾸는 페이스트리 셰프",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LEN_017",
            cardName: "[함께 특훈!]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "미지와의 조우?! cosmic opera 뽑기",
            eventName: "perspective for smile",
            skillType: "판강",
            releaseDate: "2025-05-23",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_15_w.png",
            eventBannerPath: "/events/25y/banner_25_15_w.png",
            songName: "오페라! 스페이스 오페라!",
            songJacketPath: "/jacket/25y/Opera_Space_Opera.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "코스믹 래빗 보이",
          },
        },
        {
          info: {
            id: "VS_LEN_020",
            cardName: "[너를☆위한☆응원!]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "고결한 쟁패의 기사 뽑기",
            eventName: "The Power Of Regret",
            skillType: "스업",
            releaseDate: "2025-11-25",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_33_w.png",
            eventBannerPath: "/events/25y/banner_25_33_w.png",
            songName: "나의 카미사마",
            songJacketPath: "/jacket/25y/Bokuno_Kamisama.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "하빌리티 슈발리에",
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 렌
// -> 얼굴 아이콘: LEN_n.png 자동 매핑
const LENNigo = defineCharacterCards("니고", "카가미네 렌", "VS", "LEN", {
  cards: [
        {
          info: {
            id: "VS_LEN_009",
            cardName: "[머뭇거리는 인사와 함께]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "Nursing my ES 뽑기",
            eventName: "헤매는 아이의 손을 잡고 이끈, 그 너머에는",
            skillType: "판강",
            releaseDate: "2023-07-31",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_31_n.png",
            eventBannerPath: "/events/23y/banner_23_31_n.png",
            songName: "버그",
            songJacketPath: "/jacket/23y/bug.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "인듀어 나이트가운",
          },
        },
        {
          info: {
            id: "VS_LEN_016",
            cardName: "[즐거워 보이는 개인 전시회]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "Drawing Blooming 뽑기",
            eventName: "Knowing the Unseen",
            skillType: "퍼스업",
            releaseDate: "2025-04-10",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_11_n.png",
            eventBannerPath: "/events/25y/banner_25_11_n.png",
            songName: "나는 비",
            songJacketPath: "/jacket/25y/Im_the_Rain.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스너글 셔츠",
          },
        },
        {
          info: {
            id: "VS_LEN_023",
            cardName: "[괴로움에 다가서서]",
            attribute: "mysterious",
            gachaType: "한정",
            gachaPoolName: "Papilio Vinculatus 뽑기",
            eventName: "그리고, 바늘은 움직이기 시작한다",
            skillType: "팀스업",
            releaseDate: "2026-04-30",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_13_n.png",
            eventBannerPath: "/events/26y/banner_26_13_n.png",
            songName: "니힐 씨",
            songJacketPath: "/jacket/26y/Mx-Nihil.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Silent Devotion",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_LEN_024",
            cardName: "[맛있는 행복을 나누며]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "너를 향해 웃는 fuzzy daisy 뽑기",
            eventName: "풀리지 않는 내일에 손을 뻗어서",
            skillType: "힐",
            releaseDate: "2026-08-22",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_24_n.png",
            eventBannerPath: "/events/26y/banner_26_24_n.png",
            songName: "장식해",
            songJacketPath: "/jacket/26y/Kazatte.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Petit souhait",
          },
        },
        {
          info: {
            id: "VS_LEN_027",
            cardName: "[가리키는 그 앞에 있는 길]",
            attribute: "happy",
            gachaType: "한정",
            gachaPoolName: "Lunatic doll in the box 뽑기",
            eventName: "악몽의 정원을 노래로 밝히며",
            skillType: "팀스업",
            releaseDate: "2027-02-28",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_07.png",
            eventBannerPath: "/events/27y/jbanner_27_07.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Insomnia Night",
            hasHair: true,
          },
        },

  ]
});

// 🌟 7. 모든 렌 카드를 하나의 배열로 싹 다 통합해서 내보내기!
export const LENCards = [
  ...LENOriginal,
  ...LENLeoneed,
  ...LENMmj,
  ...LENVbs,
  ...LENWxs,
  ...LENNigo,
];