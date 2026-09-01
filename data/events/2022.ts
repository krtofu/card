import { defineEvent, EventData } from "./template";

export const EVENTS_2022: EventData[] = [
    defineEvent({
      id: "01",
      gacha: {
        types: ["통상"],
        period: { start: "2022-05-20 12:00", end: "2022-05-29 14:59" },
        featuredCardIds: ["ln_Ichika_001", "VS_MIKU_001", "VS_RIN_001", "VS_LEN_001"]
      },
    }),
      defineEvent({
        id: "02",
        gacha: {
          types: ["통상"],
          period: { start: "2022-05-21 15:00", end: "2022-05-29 14:59" },
          featuredCardIds: ["ln_Saki_001", "VS_LUKA_001", "ln_Shiho_001"]
        },
        // 👇 이벤트가 없는 뽑기라면 아래 event 객체는 싹 지워주세요!
        event: {
          type: "하코",
          isCheerful: false,
          period: { start: "2022-05-21 15:00", end: "2022-05-27 20:59" },
          bonus: {
            attributes: ["mysterious"],
            units: [],
            members: ["Saki", "LUKA", "Shiho", "Honami", "Ichika"]
          }
        }
      }),
        defineEvent({
          id: "03",
          gacha: {
            types: ["통상"],
            period: { start: "2022-05-29 15:00", end: "2022-06-06 14:59" },
            featuredCardIds: ["ng_Mafuyu_001", "ng_Kanade_001", "VS_MIKU_002"]
          },
          // 👇 이벤트가 없는 뽑기라면 아래 event 객체는 싹 지워주세요!
          event: {
            type: "하코",
            isCheerful: false,
            period: { start: "2022-05-29 15:00", end: "2022-06-04 20:59" },
            bonus: {
              attributes: ["cool"],
              units: [],
              members: ["Mafuyu", "Kanade", "MIKU", "Mizuki", "Ena"]
            }
          }
        }),

];