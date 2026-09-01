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
            members: ["사키", "레오니 루카", "시호", "호나미", "이치카"]
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
              members: ["마후유", "카나데", "니고 미쿠", "미즈키", "에나"]
            }
          }
        }),
          defineEvent({
            id: "04",
            gacha: {
              types: ["통상"],
              period: { start: "2022-06-06 15:00", end: "2022-06-14 14:59" },
              featuredCardIds: ["Wds_Rui_001", "Wds_Tsukasa_001", "VS_KAITO_001"]
            },
            // 👇 이벤트가 없는 뽑기라면 아래 event 객체는 싹 지워주세요!
            event: {
              type: "하코",
              isCheerful: false,
              period: { start: "2022-06-06 15:00", end: "2022-06-12 20:59" },
              bonus: {
                attributes: ["happy"],
                units: [],
                members: ["루이", "츠카사", "원더쇼 카이토", "에무", "네네"]
              }
            }
          }),
            defineEvent({
              id: "05",
              gacha: {
                types: ["통상"],
                period: { start: "2022-06-14 15:00", end: "2022-06-22 14:59" },
                featuredCardIds: ["Wds_Emu_001", "mmj_Haruka_001", "VS_MIKU_003"]
              },
              // 👇 이벤트가 없는 뽑기라면 아래 event 객체는 싹 지워주세요!
              event: {
                type: "혼합",
                isCheerful: false,
                period: { start: "2022-06-14 15:00", end: "2022-06-20 20:59" },
                bonus: {
                  attributes: ["pure"],
                  units: [],
                  members: ["에무", "하루카", "원더쇼 미쿠", "마후유", "사키"]
                }
              }
            }),

];