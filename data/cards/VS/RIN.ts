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
        {
          info: {
            id: "VS_RIN_011",
            cardName: "[화해의 가교]",
            attribute: "cool",
            gachaType: "페스",
            gachaPoolName: "[전 세계 3900만 명 돌파 기념] 컬러풀 페스티벌 뽑기",
            skillType: "체스업",
            releaseDate: "2024-03-30",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_f09.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "기도의 홀리 드레스",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_RIN_017",
            cardName: "[맨 앞줄에서 응원!]",
            attribute: "happy",
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
            costumeName: "컴퍼스 세일러복",
          },
        },
        {
          info: {
            id: "VS_RIN_018",
            cardName: "[내가 모르는 '나'들]",
            attribute: "pure",
            gachaType: "페스",
            gachaPoolName: "[Brand New Your World 기념] 블룸 페스티벌 드림 픽 뽑기",
            eventName: "마음을 담아! Dream Stage",
            skillType: "블페",
            releaseDate: "2025-09-28",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_f15.png",
            eventBannerPath: "/events/25y/banner_25_28.png",
            songName: "열풍",
            songJacketPath: "/jacket/25y/Neppuu.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "아나크로니즘 드레스",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_RIN_023",
            cardName: "[회전목마에서 예~이!]",
            attribute: "cute",
            gachaType: "월링",
            gachaPoolName: "Velvet Afternoon 뽑기",
            eventName: "Link the Beats!",
            skillType: "스업",
            releaseDate: "2026-09-06",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_26_0.png",
            eventBannerPath: "/events/26y/jbanner_26_26_0.png",
            songName: "킬러",
            songJacketPath: "/jacket/25y/KILLER.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Classical Lipstick",
          },
        },
        {
          info: {
            id: "VS_RIN_027",
            cardName: "[흉내쟁이 댄싱♪]",
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
            costumeName: "Sunny Dancer",
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
        {
          info: {
            id: "VS_RIN_014",
            cardName: "[추억을 들려줘]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "창공에 울리는 소리 뽑기",
            eventName: "Stick to your faith",
            skillType: "스업",
            releaseDate: "2024-10-22",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_30_l.png",
            eventBannerPath: "/events/24y/banner_24_30_l.png",
            songName: "purpose",
            songJacketPath: "/jacket/24y/purpose.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "웜 선샤인",
          },
        },
        {
          info: {
            id: "VS_RIN_019",
            cardName: "[산더미 같은 포도에 부푸는 꿈]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "낙엽이 흩날리는 티 룸에서 뽑기",
            eventName: "다시 나뭇잎이 물들 즈음에",
            skillType: "퍼스업",
            releaseDate: "2025-11-10",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_32.png",
            eventBannerPath: "/events/25y/banner_25_32.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "어여쁜 잎사귀의 옷 (무늬 검열 x)",
          },
        },
        {
          info: {
            id: "VS_RIN_021",
            cardName: "[어린애 취급은 사양할래!]",
            attribute: "pure",
            gachaType: "한정",
            gachaPoolName: "지키기 위한 끝없는 싸움 뽑기",
            eventName: "Connect hearts message",
            skillType: "팀스업",
            releaseDate: "2026-02-28",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_07.png",
            eventBannerPath: "/events/26y/banner_26_07.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "골드 시프 솔저",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_RIN_022",
            cardName: "[기대 위원의 진가 발휘♪]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "Seeking my way 뽑기",
            eventName: "Unsteady, still steady step",
            skillType: "판강",
            releaseDate: "2026-07-15",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_20_l.png",
            eventBannerPath: "/events/26y/jbanner_26_20_l.png",
            songName: "투명한 팔레트",
            songJacketPath: "/jacket/26y/Transparent_Palette.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Cheer of neighbor",
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
        {
          info: {
            id: "VS_RIN_012",
            cardName: "[린 일행에게 맡겨!]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "One's Dear Ones 뽑기",
            eventName: "Light Up the Fire",
            skillType: "스업",
            releaseDate: "2024-06-10",
          },
          media: {
            gachaBannerPath: "/gachas/24y/banner_24_17_v.png",
            eventBannerPath: "/events/24y/banner_24_17_v.png",
            songName: "하극상",
            songJacketPath: "/jacket/24y/Gekokujou.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Spirit of Wish",
          },
        },
        {
          info: {
            id: "VS_RIN_025",
            cardName: "[노력하는 너에게 응원을]",
            attribute: "cool",
            gachaType: "한정",
            gachaPoolName: "이상향을 떠도는 오니 뽑기",
            eventName: "새해를 축복하는, 기원의 춤",
            skillType: "팀스업",
            releaseDate: "2027-01-04",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_01.png",
            eventBannerPath: "/events/27y/jbanner_27_01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "장난꾸러기 꼬마 오니 옷",
            hasHair: true,
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
        {
          info: {
            id: "VS_RIN_015",
            cardName: "[스크린에 비친]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "Punk Night TOKYO 뽑기",
            eventName: "역광의 렌즈 플레어",
            skillType: "판강",
            releaseDate: "2025-01-23",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_03_w.png",
            eventBannerPath: "/events/25y/banner_25_03_w.png",
            songName: "사이버펑크 데드 보이",
            songJacketPath: "/jacket/25y/CYBER_PUNK_DEAD_BOY.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "observer:R",
          },
        },
        {
          info: {
            id: "VS_RIN_024",
            cardName: "[작은 수호자]",
            attribute: "cute",
            gachaType: "통상",
            gachaPoolName: "Get my bright wings 뽑기",
            eventName: "초극의 프로타고니스타",
            skillType: "판강",
            releaseDate: "2026-11-10",
          },
          media: {
            gachaBannerPath: "/gachas/26y/jbanner_26_31_w.png",
            eventBannerPath: "/events/26y/jbanner_26_31_w.png",
            songName: "나아가라",
            songJacketPath: "/jacket/26y/Yuke.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Wings of watch",
          },
        },
        {
          info: {
            id: "VS_RIN_026",
            cardName: "[린이 곁에 있어!]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "Rabbit Kingdom♡ 뽑기",
            eventName: "CHANGE! 에무는 왕녀님?!",
            skillType: "퍼스업",
            releaseDate: "2027-02-19",
          },
          media: {
            gachaBannerPath: "/gachas/27y/jbanner_27_06_w.png",
            eventBannerPath: "/events/27y/jbanner_27_06_w.png",
            songName: "뛰어나가라! 원더뾰이",
            songJacketPath: "/jacket/27y/Tobidase_Wonderpyoi.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "Soft fur attendant",
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
        {
          info: {
            id: "VS_RIN_013",
            cardName: "[또 하나의 나]",
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
            costumeName: "릴리브 마칭",
            hasHair: true,
          },
        },
        {
          info: {
            id: "VS_RIN_016",
            cardName: "[처음 듣는 굉음]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "Reknit Relation 뽑기",
            eventName: "등불의 기억을 더듬으며",
            skillType: "힐",
            releaseDate: "2025-06-20",
          },
          media: {
            gachaBannerPath: "/gachas/25y/banner_25_18_n.png",
            eventBannerPath: "/events/25y/banner_25_18_n.png",
            songName: "엠퍼플",
            songJacketPath: "/jacket/25y/Empurple.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "mend a tear",
          },
        },
        {
          info: {
            id: "VS_RIN_020",
            cardName: "[꾸미기는 어려워]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "DoII dream 뽑기",
            eventName: "Show your shine",
            skillType: "스업",
            releaseDate: "2026-01-21",
          },
          media: {
            gachaBannerPath: "/gachas/26y/banner_26_03.png",
            eventBannerPath: "/events/26y/banner_26_03.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "시크릿 롤리타",
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