import { EventData } from "./index";

export const EVENTS_2023: EventData[] = [
  {
    id: "gacha_event_2023_01",
    name: "러블리 메신저 뽑기",
    eventName: "해피 러블리 에브리데이!",
    eventType: "하코",
    period: { start: "2023-01-02. 15:00", end: "2023-01-08. 20:59" },
    bonus: {
      attribute: "mysterious",
      unit: "MMJ"
    },
    gacha: {
      bannerPath: "/gachas/23y/banner_23_01_m.png",
      types: ["통상"],
      featuredCardIds: ["mmj_Airi_005", "VS_LEN_005", "mmj_Haruka_005"]
    }
  },
  {
    id: "gacha_event_2023_02",
    name: "노래여, 울려라! 꿈꾸는 머메이드 뽑기",
    eventName: "머메이드를 동경해서",
    eventType: "하코",
    period: { start: "2023-01-09. 15:00", end: "2023-01-15. 20:59" },
    bonus: {
      attribute: "pure",
      unit: "Wds"
    },
    gacha: {
      bannerPath: "/gachas/23y/banner_23_02_w.png",
      types: ["통상"],
      featuredCardIds: ["wds_Nene_004", "wds_Rui_004", "VS_LUKA_005"]
    }
  }
];