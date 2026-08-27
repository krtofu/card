import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) MEIKO
// -> 얼굴 아이콘: MEIKO_0.png 자동 매핑
const MEIKOOriginal = defineCharacterCards("버싱", "메이코", "VS", "MEIKO", {
  cards: [
        {
          info: {
            id: "VS_MEIKO_006",
            cardName: "[악식의 악마]",
            attribute: "mysterious",
            gachaType: "콜라보",
            gachaPoolName: "죄의 회고록 뽑기",
            skillType: "힐",
            releaseDate: "2022-11-20",
          },
          media: {
            gachaBannerPath: "/gachas/collab/banner_c1.png",
            songName: "악식녀 콘치타",
            songJacketPath: "/jacket/22y/Akujiki_Musume_Conchita.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "여자 영주의 요염한 의상",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_MEIKO_013",
            cardName: "[그 이름을 가슴에 품고]",
            attribute: "mysterious",
            gachaType: "페스",
            gachaPoolName: "[Brand New World 애니버서리 기념] 컬러풀 페스티벌 드림 픽 뽑기",
            skillType: "체스업",
            releaseDate: "2024-09-30",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_f11.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "My Way STYLE",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_MEIKO_018",
            cardName: "['나'의 마음을 느끼며]",
            attribute: "cool",
            gachaType: "페스",
            gachaPoolName: "블룸 페스티벌 뽑기",
            skillType: "블페",
            releaseDate: "2025-06-30",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_f14.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "누아르 클레마티트 드레스",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_MEIKO_019",
            cardName: "[다정한 향기와 함께]",
            attribute: "pure",
            gachaType: "월링",
            gachaPoolName: "Melody of Wishes 뽑기",
            eventName: "너와 세카이의 시작에서",
            skillType: "판강",
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
            costumeName: "스타일리시 컴퍼스",
          },
        },
        {
          info: {
            id: "VS_MEIKO_023",
            cardName: "[진수성찬을 한가득!]",
            attribute: "happy",
            gachaType: "월링",
            gachaPoolName: "Velvet Afternoon 뽑기",
            eventName: "Link the Beats!",
            skillType: "스업",
            releaseDate: "2026-09-06",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_26_0.png",
            eventBannerPath: "/events/26y/jbanner_26_26_0.png",
            songName: "가사화",
            songJacketPath: "/jacket/23y/Kashika.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Classical Eyeshadow",
          },
        },
        {
          info: {
            id: "VS_MEIKO_028",
            cardName: "[파도 소리의 틈새에서]",
            attribute: "cute",
            gachaType: "월링",
            gachaPoolName: "Crawl out of Vibrant hell 뽑기",
            eventName: "Again And Again Ambition!",
            skillType: "스업",
            releaseDate: "2027-08-17",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_24.png",
            eventBannerPath: "/events/27y/jbanner_27_24.png",
            songName: "미공개",
            songJacketPath: "/jacket/27y/추후첨부.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Sekai's ambition",
            hasHair: true,
          },
        },
    
  ]
});

// 🎸 2. Leo/need (레오니) MEIKO
// -> 얼굴 아이콘: MEIKO_l.png 자동 매핑
const MEIKOLeoneed = defineCharacterCards("레오니", "메이코", "VS", "MEIKO", {
  cards: [
        {
          info: {
            id: "VS_MEIKO_002",
            cardName: "[3번째 선배!]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "작은 용기, 커다란 한 걸음 뽑기",
            eventName: "흔들리는 채로, 그래도 넌 앞으로",
            skillType: "판강",
            releaseDate: "2022-08-01",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_11_l.png",
            eventBannerPath: "/events/22y/banner_22_10_l.png",
            songName: "날이 개길 기다려",
            songJacketPath: "/jacket/22y/Awaiting_Clear_Skies.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스테인드글라스 브레이브 하트",
          },
        },
        {
          info: {
            id: "VS_MEIKO_011",
            cardName: "[든든한 온기]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "SPACE COLONY 뽑기",
            eventName: "Get over it.",
            skillType: "스업",
            releaseDate: "2024-04-11",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_11_l.png",
            eventBannerPath: "/events/24y/banner_24_11_l.png",
            songName: "상생",
            songJacketPath: "/jacket/24y/Aioi.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "갤럭시 리서처",
          },
        },
        {
          info: {
            id: "VS_MEIKO_015",
            cardName: "[가르쳐 줘! 시호 선생님]",
            attribute: "mysterious",
            gachaType: "한정",
            gachaPoolName: "새봄맞이 화려하게 피는 매혹의 꽃 뽑기",
            eventName: "변함없는 온기 옆에서",
            skillType: "팀스업",
            releaseDate: "2025-01-04",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_01.png",
            eventBannerPath: "/events/25y/banner_25_01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "일본식 엘레강트 패션",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_MEIKO_017",
            cardName: "[우리들의 존재 방식]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Not Overlap Sounds 뽑기",
            eventName: "Parallel Harmonies",
            skillType: "힐",
            releaseDate: "2025-04-20",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_12_l.png",
            eventBannerPath: "/events/25y/banner_25_12_l.png",
            songName: "아슬아슬",
            songJacketPath: "/jacket/25y/Suresure.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "고딕 억셉트",
          },
        },
        {
          info: {
            id: "VS_MEIKO_021",
            cardName: "[비밀 윙크!]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "마녀가 들려주는 옛날 이야기 뽑기",
            eventName: "과거의 Read-aloud",
            skillType: "스업",
            releaseDate: "2026-02-20",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_06.png",
            eventBannerPath: "/events/26y/banner_26_06.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "레쟁 소르시에르",
          },
        },

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) MEIKO
// -> 얼굴 아이콘: MEIKO_m.png 자동 매핑
const MEIKOMmj = defineCharacterCards("모모점", "메이코", "VS", "MEIKO", {
  cards: [
        {
          info: {
            id: "VS_MEIKO_005",
            cardName: "[기획 회의의 힌트는 토끼?!]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "달밤의 시스터 래빗츠 뽑기",
            eventName: "두 사람, 달 토끼",
            skillType: "퍼스업",
            releaseDate: "2023-01-16",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_03.png",
            eventBannerPath: "/events/23y/banner_23_03.png",
          },
        },
        {
          info: {
            id: "VS_MEIKO_009",
            cardName: "[복근부터 단련해야지!]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "물가에 피는 가련한 꽃 뽑기",
            eventName: "푸른 하늘 너머, 반짝임을 따라서",
            skillType: "판강",
            releaseDate: "2023-09-11",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_37_m.png",
            eventBannerPath: "/events/23y/banner_23_37_m.png",
            songName: "파라솔 사이다",
            songJacketPath: "/jacket/23y/Parasol_Cider.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "블루 마린 머메이드",
          },
        },
        {
          info: {
            id: "VS_MEIKO_010",
            cardName: "[한 명의 팬으로서]",
            attribute: "pure",
            gachaType: "한정",
            gachaPoolName: "Fly to the future!! 뽑기",
            eventName: "그 날의 꿈의, 저 너머로",
            skillType: "팀스업",
            releaseDate: "2023-11-30",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_48_m.png",
            eventBannerPath: "/events/23y/banner_23_48_m.png",
            songName: "플로트 플래너",
            songJacketPath: "/jacket/23y/Float_Planner.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "쿨 캐빈 크루",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_MEIKO_022",
            cardName: "[레츠 모어 모어 트레이닝!]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Starry-eyed Princess 뽑기",
            eventName: "Cheer with my Heart!",
            skillType: "퍼스업",
            releaseDate: "2026-05-25",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_15_m.png",
            eventBannerPath: "/events/26y/banner_26_15_m.png",
            songName: "일레븐스",
            songJacketPath: "/jacket/26y/Eleventh.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "어펙셔네이트 신데렐라",
          },
        },
        {
          info: {
            id: "VS_MEIKO_024",
            cardName: "[스페셜 성원을 전달!]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "눈동자에 비친 이어지는 꽃 뽑기",
            eventName: "교차하는 색은 그날 그대로",
            skillType: "스업",
            releaseDate: "2026-10-21",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_29_m.png",
            eventBannerPath: "/events/26y/jbanner_26_29_m.png",
            songName: "당신의 하늘이 운다면",
            songJacketPath: "/jacket/26y/Anata_no_Sora_ga_Naku_no_Nara.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "코디얼 컬러",
          },
        },

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) MEIKO
// -> 얼굴 아이콘: MEIKO_v.png 자동 매핑
const MEIKOVbs = defineCharacterCards("비배스", "메이코", "VS", "MEIKO", {
  cards: [
        {
          info: {
            id: "VS_MEIKO_004",
            cardName: "[토킹 커피 타임]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "비밀스레 간직한 비스트 하트 뽑기",
            eventName: "Awakening Beat",
            skillType: "퍼스업",
            releaseDate: "2022-12-12",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_29_v.png",
            eventBannerPath: "/events/22y/banner_22_28_v.png",
            songName: "Beat Eater",
            songJacketPath: "/jacket/22y/Beat_Eater.png",
          },
        },
        {
          info: {
            id: "VS_MEIKO_008",
            cardName: "[노력한 너에게]",
            attribute: "pure",
            gachaType: "한정",
            gachaPoolName: "그레이스 마리아주 뽑기",
            eventName: "푸른 하늘에 바라는 유어 해피니스!",
            skillType: "팀스업",
            releaseDate: "2023-07-24",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_30.png",
            eventBannerPath: "/events/23y/banner_23_30.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "레이디 엘레강트",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_MEIKO_016",
            cardName: "[중요하니까]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Roots in the snow 뽑기",
            eventName: "The first concerto",
            skillType: "힐",
            releaseDate: "2025-03-22",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_09_v.png",
            eventBannerPath: "/events/25y/banner_25_09_v.png",
            songName: "blender",
            songJacketPath: "/jacket/25y/blender.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Love suffering",
          },
        },

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) MEIKO
// -> 얼굴 아이콘: MEIKO_w.png 자동 매핑
const MEIKOWxs = defineCharacterCards("원더쇼", "메이코", "VS", "MEIKO", {
  cards: [
        {
          info: {
            id: "VS_MEIKO_001",
            cardName: "[알려 줘! 모두의 크리스마스♪]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "원더 캐럴 뽑기",
            eventName: "성스러운 밤에 이 노랫소리를",
            skillType: "퍼스업",
            releaseDate: "2022-07-16",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_09_w.png",
            eventBannerPath: "/events/22y/banner_22_08_w.png",
            songName: "무지갯빛 스토리즈",
            songJacketPath: "/jacket/22y/NIJIIRO_STORIES.png",
          },
        },
        {
          info: {
            id: "VS_MEIKO_007",
            cardName: "[울음소리는 어디에서?]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "꿈도 리얼도! 섞어섞어 팝핀 뽑기",
            eventName: "POP IN MY HEART!!",
            skillType: "스업",
            releaseDate: "2023-04-17",
          },
          media: {
            gachaBannerPath: "/gachas/23y/banner_23_16_w.png",
            eventBannerPath: "/events/23y/banner_23_16_w.png",
            songName: "빙그레^^조사대의 테마",
            songJacketPath: "/jacket/23y/Theme_of_Niccori_Survey_Team.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "젤리곰 투어 가이드",
          },
        },
        {
          info: {
            id: "VS_MEIKO_012",
            cardName: "[행복을 전하는 이야기꾼]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Never Ending Showtime 뽑기",
            eventName: "우리들의 해피 엔딩",
            skillType: "스업",
            releaseDate: "2024-08-21",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_24_w.png",
            eventBannerPath: "/events/24y/banner_24_24_w.png",
            songName: "키라피피★키라피카",
            songJacketPath: "/jacket/24y/Kirapipi_Kirapika.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "베테랑 상인 여행복",
          },
        },
        {
          info: {
            id: "VS_MEIKO_014",
            cardName: "[레츠☆삼륜차]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "Play the shadow 뽑기",
            eventName: "네가 주인공인 이야기를",
            skillType: "판강",
            releaseDate: "2024-11-25",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_33_w.png",
            eventBannerPath: "/events/24y/banner_24_33_w.png",
            songName: "필라멘트 피버",
            songJacketPath: "/jacket/24y/filament_fever.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스파이럴 레이디",
          },
        },
        {
          info: {
            id: "VS_MEIKO_026",
            cardName: "[명탐정 MEIKO?!]",
            attribute: "cool",
            gachaType: "한정",
            gachaPoolName: "조종하는 것은 누구의 손가락인가 뽑기",
            eventName: "저녁빛의 Inside Direction",
            skillType: "팀스업",
            releaseDate: "2027-03-30",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_10_w.png",
            eventBannerPath: "/events/27y/jbanner_27_10_w.png",
            songName: "꼭두각시의 현실",
            songJacketPath: "/jacket/27y/Puppet.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "폭로하는 이는 연마자",
            hasHair: true,
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) MEIKO
// -> 얼굴 아이콘: MEIKO_n.png 자동 매핑
const MEIKONiigo = defineCharacterCards("니고", "메이코", "VS", "MEIKO", {
  cards: [
        {
          info: {
            id: "VS_MEIKO_003",
            cardName: "[필요한 거리]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "비밀의 드레스 룸 뽑기",
            eventName: "시크릿 디스턴스",
            skillType: "힐",
            releaseDate: "2022-10-10",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_20_n.png",
            eventBannerPath: "/events/22y/banner_22_19_n.png",
            songName: "아이디 스마일",
            songJacketPath: "/jacket/22y/IDSMILE.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "네슬레 크리놀린",
          },
        },
        {
          info: {
            id: "VS_MEIKO_020",
            cardName: "[내가 해야 할 일]",
            attribute: "cool",
            gachaType: "한정",
            gachaPoolName: "That flower, once more 뽑기",
            eventName: "상처투성이 손으로, 우리는",
            skillType: "팀스업",
            releaseDate: "2025-11-30",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_34_n.png",
            eventBannerPath: "/events/25y/banner_25_34_n.png",
            songName: "여화에 넋을 잃고",
            songJacketPath: "/jacket/25y/Yoka_ni_Mitorete.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "프로테제 파피용",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_MEIKO_025",
            cardName: "[지키는 자, 뒤흔드는 자]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "¿행복한 발레리나? 뽑기",
            eventName: "깨어나지 않는 환상을 노크하며",
            skillType: "판강",
            releaseDate: "2027-01-11",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_02_n.png",
            eventBannerPath: "/events/27y/jbanner_27_02_n.png",
            songName: "행복형",
            songJacketPath: "/jacket/27y/Koufukukei.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "메인테인 튀튀",
          },
        },
        {
          info: {
            id: "VS_MEIKO_027",
            cardName: "[평온한 해질녘]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "투명하게 밝아오는 기억의 한가운데서 뽑기",
            eventName: "바래지 않는 지금을, 물들여",
            skillType: "스업",
            releaseDate: "2027-07-09",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_20_n.png",
            eventBannerPath: "/events/27y/jbanner_27_20_n.png",
            songName: "빛",
            songJacketPath: "/jacket/27y/Hikari.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "calm moment",
          },
        },

  ]
});

// 🌟 MEIKO 카드를 배열로 싹 다 통합해서 내보내기!
export const MEIKOCards = [
  ...MEIKOOriginal,
  ...MEIKOLeoneed,
  ...MEIKOMmj,
  ...MEIKOVbs,
  ...MEIKOWxs,
  ...MEIKONiigo,
];