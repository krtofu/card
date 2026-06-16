import { type GachaInfo, type GachaType } from "@/lib/types";

export const GACHA_TYPES: readonly GachaType[] = [
  "통상",
  "한정",
  "페스",
  "월링",
  "콜라보",
] as const;

export const GACHA_DATA: Record<GachaType, GachaInfo> = {
  통상: {
    type: "통상",
    title: "〈 Cheer with my Heart! 〉",
    period: "⋆𝅴 모모이 아이리",
    status: "하나사토 미노리 · 모모점 메이코",
    image: "/gacha/260523_260531_t.png",
    note: "속성 - 해피 / 26.05.23 ~ 26.05.31",

    // ✅ 화면에 띄울 태그 키
    tags: ["모모점"],

    // ✅ 옵션 A: '이번 가챠 기준' 의미만 적는 칸 (선택)
    badgeHints: {
      // 스까: 표시 텍스트를 명시하고 싶으면
      mix: {
        "니고+레오니": "니고 ⨯ 레오니",
      },

      // 단일 유닛이 있었으면 여기(unit)에 “이번 달 구성”을 적음
      unit: {
        "모모점": "하나사토 미노리" 
      },

      // 기타 태그 설명이 필요하면 other에
      // other: {
      //   "1차": "1차 픽업",
      //   가구: "가구 포함",
      // },
    },

    start: "2026-01-21",
    end: "2026-01-31",
  },

  한정: {
    type: "한정",
    title: "〈 이 한 땀 한 땀에 마음을 담아 〉",
    period: "⋆𝅴 히노모리 시즈쿠",
    status: "아사히나 마후유 · 모모점 렌",
    image: "/gacha/260131_260210_h.png",
    note: "속성 - 해피 / 26.01.31 ~ 26.02.10",
    tags: ["모모점+니고"],

    badgeHints: {
      mix: {
        "모모점+니고": "모모점 ⨯ 니고",
      },
    },

    start: "2026-01-31",
    end: "2026-02-10",
  },

  페스: {
    type: "페스",
    title: "[ 4.5주년 기념 ] 블룸 페스티벌 뽑기 드림 픽",
    period: "⋆𝅴 모치즈키 호나미 · 메구리네 루카",
    status: "히노모리 시호 · 호시노 이치카 · 레오니 미쿠",
    image: "/gacha/260330_260404_p.png",
    note: "속성 - 미스테리어스 · 해피 / 26.03.30 ~ 26.04.04",

    // ✅ 단일 유닛이면 그냥 유닛명을 tags에 넣으면 됨
    tags: ["레오니", "버싱"],

    // ✅ 옵션 A: “이번 픽업 멤버”를 유닛별로 텍스트로 적는 칸
    badgeHints: {
      unit: {
        레오니: "호나미 8차",
        버싱: "루카 7차",
      },
      // 기타도 같이 적고 싶으면 other
      other: {
        // "2차": "2차 픽업",
      },
    },

    start: "2026-03-30",
    end: "2026-04-04",
  },

  월링: {
    type: "월링",
    title: "〈 Turning Pain into Drive 〉",
    period: "⋆𝅴 Vivid BAD SQUAD",
    status: "",
    image: "/gacha/260408_260422_a.png",
    note: "속성 - 퓨어 / 26.04.08 ~ 26.04.22",

    tags: ["비배스"],

    // ✅ 월링 버튼 색 기준(유닛 or 버싱 캐릭터)
    worldLinkBase: { kind: "unit", value: "비배스" },

    badgeHints: {
      unit: {
        비배스: "토우야 · 아키토 · 코하네 · 안",
      },
    },

    start: "2026-04-08",
    end: "2026-04-22",
  },

  콜라보: {
    type: "콜라보",
    title: "SEKAI에서 Hello𖹭 멋진 만남 뽑기",
    period: "텐마 사키 · 아오야기 토우야",
    status: "하츠네 미쿠 · 모모이 아이리 · 오오토리 에무 · 시노노메 에나",
    image: "/gacha/sanrio_c_banner.png",
    note: "26.02.07 ~ 26.02.20",

    tags: ["산리오", "액세서리"],

    badgeHints: {
      other: {
        다마고치: "구치파치 · 미미치 · 마메치 · 메메치",
        가구: "카드에 포함",
        산리오: "폼폼푸린 · 포차코 · 헬로키티 · 마이멜로디 · 시나모롤 · 쿠로미",
        액세서리: "두부 전용 : 콜라보 캐릭터 머리띠",
      },
    },

    start: "2026-02-07",
    end: "2026-02-20",
  },
};