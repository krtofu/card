import { EventData } from "./index";

export const EVENTS_2022: EventData[] = [
  {
    id: "first_gacha",
    name: "서비스 시작 기념 뽑기",
    eventName: "",
    eventType: "없음",
    period: { start: "2022-05-20. 12:00", end: "2022-05-29. 14:59" },
    gacha: {
      bannerPath: "/gachas/22y/banner_22_01.png",
      types: ["통상"],
      featuredCardIds: ["ln_Ichika_001", "VS_MIKU_001", "VS_RIN_001", "VS_LEN_001"]
    }
  },
  {
    id: "gacha_event_22_01",
    name: "별 내리는 밤하늘의 추억 뽑기",
    eventName: "비 갠 뒤 첫 번째 별",
    eventType: "하코",
    period: { start: "2022-05-21. 15:00", end: "2022-05-29. 14:59" },
    bonus: {
      attribute: "mysterious",
      unit: "Leoneed"
    },
    gacha: {
      bannerPath: "/gachas/22y/banner_22_02_l.png",
      types: ["통상"],
      featuredCardIds: ["ln_Saki_001", "VS_LUKA_001", "ln_Shiho_001"]
    },
    eventBannerPath: "/gachas/22y/banner_22_01_l.png", 
  },
  {
    id: "gacha_event_22_02",
    name: "인형들의 무도회 뽑기",
    eventName: "사로잡힌 마리오네트",
    eventType: "하코",
    period: { start: "2022-05-29. 15:00", end: "2022-06-06. 14:59" },
    bonus: {
      attribute: "cool",
      unit: "Niigo"
    },
    gacha: {
      bannerPath: "/gachas/22y/banner_22_03_n.png",
      types: ["통상"],
      featuredCardIds: ["ng_Mafuyu_001", "ng_Kanade_001", "VS_MIKU_002"]
    },
    eventBannerPath: "/gachas/22y/banner_22_02_n.png", 
  },
];