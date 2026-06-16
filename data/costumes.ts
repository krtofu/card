import type { GachaType } from "@/lib/types";

export type CostumeSet = {
  key: string;   // "base", "another1" 같은 내부 키
  label: string; // 화면 표시: "기본", "어나더 1"
  front: string[];
  back: string[];
  subtitle?: string; 
};

export type CostumeCharacter = {
  name: string;
  subtitle?: string; 
  sets: CostumeSet[]; // ✅ 이제 sets로만 통일 (구버전 front/back 제거)
};

export type CostumePreview = {
  title?: string;     // 카드 상단 제목(옵션)
  subtitle?: string;  // "[카드 이름] 의상 이름" 같은 라벨
  characters: CostumeCharacter[];
};

/**
 * ✅ 주의:
 * - front/back에 "존재하지 않는 경로"를 넣으면 Next/Image가 에러를 냅니다.
 * - 아직 파일이 없는 항목은 []로 비워두었습니다. (placeholder는 컴포넌트가 처리)
 */

export const COSTUME_PREVIEWS: Record<GachaType, CostumePreview> = {
  통상: {
    title: "+ Doll dream 의상",
    characters: [
      {
        name: "요이사키 카나데",
        subtitle: "[거울 속의 낯선 나] 샤이니 롤리타",
        sets: [
          {
            key: "base",
            label: "기본",
            front: ["/previews/front/kanade/021_Show_your_shine_t_0.png"],
            back: ["/previews/back/kanade/021_Show_your_shine_t_0.png"],
          },
          {
            key: "another1",
            label: "어나더 1",
            front: ["/previews/front/kanade/021_Show_your_shine_t_1.png"],
            back: ["/previews/back/kanade/021_Show_your_shine_t_1.png"],
          },
          {
            key: "another2",
            label: "어나더 2",
            front: ["/previews/front/kanade/021_Show_your_shine_t_2.png"],
            back: ["/previews/back/kanade/021_Show_your_shine_t_2.png"],
          },
          {
            key: "another3",
            label: "어나더 3",
            front: ["/previews/front/kanade/021_Show_your_shine_t_3.png"],
            back: ["/previews/back/kanade/021_Show_your_shine_t_3.png"],
          },
        ],
      },
      {
        name: "텐마 사키",
        subtitle: "[넘치는 감사] 하트풀 롤리타",
        sets: [
          {
            key: "base",
            label: "기본",
            front: ["/previews/front/saki/021_Show_your_shine_t_0.png"],
            back: ["/previews/back/saki/021_Show_your_shine_t_0.png"],
          },
          {
            key: "another1",
            label: "어나더 1",
            front: ["/previews/front/saki/021_Show_your_shine_t_1.png"],
            back: ["/previews/back/saki/021_Show_your_shine_t_1.png"],
          },
          {
            key: "another2",
            label: "어나더 2",
            front: ["/previews/front/saki/021_Show_your_shine_t_2.png"],
            back: ["/previews/back/saki/021_Show_your_shine_t_2.png"],
          },
          {
            key: "another3",
            label: "어나더 3",
            front: ["/previews/front/saki/021_Show_your_shine_t_3.png"],
            back: ["/previews/back/saki/021_Show_your_shine_t_3.png"],
          },
        ],
      },
      {
        name: "니고 린",
        subtitle: "[꾸미기는 어려워] 시크릿 롤리타",
        sets: [
          {
            key: "base",
            label: "기본",
            front: ["/previews/front/rin/020_Show_your_shine_25_t_0.png"],
            back: ["/previews/back/rin/020_Show_your_shine_25_t_0.png"],
          },
          {
            key: "another1",
            label: "어나더 1",
            front: ["/previews/front/rin/020_Show_your_shine_25_t_1.png"],
            back: ["/previews/back/rin/020_Show_your_shine_25_t_1.png"],
          },
          {
            key: "another2",
            label: "어나더 2",
            front: ["/previews/front/rin/020_Show_your_shine_25_t_2.png"],
            back: ["/previews/back/rin/020_Show_your_shine_25_t_2.png"],
          },
          {
            key: "another3",
            label: "어나더 3",
            front: ["/previews/front/rin/020_Show_your_shine_25_t_3.png"],
            back: ["/previews/back/rin/020_Show_your_shine_25_t_3.png"],
          },
        ],
      },
    ],
  },

  한정: {
    title: "+ Night sweet meal 의상",
    characters: [
      {
        name: "히노모리 시즈쿠",
        subtitle: "[실로 만든 꽃에 푹 빠져] Night rose-queen",
        sets: [
          { 
            key: "base",
            label: "기본",
            front: ["/previews/front/shizuku/021_260131_260210_h_0.png"],
            back: ["/previews/back/shizuku/021_260131_260210_h_0.png"]
          },
          { 
            key: "another1",
            label: "어나더 1",
            front: ["/previews/front/shizuku/021_260131_260210_h_1.png"],
            back: ["/previews/back/shizuku/021_260131_260210_h_1.png"]
          },
          { 
            key: "another2",
            label: "어나더 2",
            front: ["/previews/front/shizuku/021_260131_260210_h_2.png"],
            back: ["/previews/back/shizuku/021_260131_260210_h_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/shizuku/021_260131_260210_h_3.png"], 
            back: ["/previews/back/shizuku/021_260131_260210_h_3.png"] 
          },
        ],
      },
      {
        name: "아사히나 마후유",
        subtitle: "[조용한 도서실에서] Icy rose-lady",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/mafuyu/021_260131_260210_h_0.png"], 
            back: ["/previews/back/mafuyu/021_260131_260210_h_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/mafuyu/021_260131_260210_h_1.png"], 
            back: ["/previews/back/mafuyu/021_260131_260210_h_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/mafuyu/021_260131_260210_h_2.png"], 
            back: ["/previews/back/mafuyu/021_260131_260210_h_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/mafuyu/021_260131_260210_h_3.png"], 
            back: ["/previews/back/mafuyu/021_260131_260210_h_3.png"] 
          },
        ],
      },
      {
        name: "모모점 렌",
        subtitle: "[특별한 하트를 너에게] Shady rose-duke",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/ren/022_260131_260210_mmj_h_0.png"], 
            back: ["/previews/back/ren/022_260131_260210_mmj_h_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/ren/022_260131_260210_mmj_h_1.png"], 
            back: ["/previews/back/ren/022_260131_260210_mmj_h_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/ren/022_260131_260210_mmj_h_2.png"], 
            back: ["/previews/back/ren/022_260131_260210_mmj_h_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/ren/022_260131_260210_mmj_h_3.png"], 
            back: ["/previews/back/ren/022_260131_260210_mmj_h_3.png"] 
          },
        ],
      },
    ],
  },

  페스: {
    title: "+ [4.5주년 기념] 블룸 페스티벌 의상",
    characters: [
      {
        name: "모치즈키 호나미",
        subtitle: "[그 시절의『우리』] Brilliant Tender",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/honami/022_405_bloom_f_0.png"], 
            back: ["/previews/back/honami/022_405_bloom_f_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/honami/022_405_bloom_f_1.png"], 
            back: ["/previews/back/honami/022_405_bloom_f_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/honami/022_405_bloom_f_2.png"], 
            back: ["/previews/back/honami/022_405_bloom_f_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/honami/022_405_bloom_f_3.png"], 
            back: ["/previews/back/honami/022_405_bloom_f_3.png"] 
          },
        ],
      },
      {
        name: "메구리네 루카",
        subtitle: "[돌고 도는 세카이, 닿는 마음] White Attractive",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/ruka/021_405_bloom_f_0.png"], 
            back: ["/previews/back/ruka/021_405_bloom_f_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/ruka/021_405_bloom_f_1.png"], 
            back: ["/previews/back/ruka/021_405_bloom_f_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/ruka/021_405_bloom_f_2.png"], 
            back: ["/previews/back/ruka/021_405_bloom_f_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/ruka/021_405_bloom_f_3.png"], 
            back: ["/previews/back/ruka/021_405_bloom_f_3.png"] 
          },
        ],
      },
    ],
  },

  월링: {
    title: "+ Turning Pain into Drive 의상",
    characters: [
      {
        name: "아오야기 토우야",
        subtitle: "[반짝이는 기억을 더듬어] Bond of memory",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/toya/022_Turning_Pain_into_Drive_a_0.png"], 
            back: ["/previews/back/toya/022_Turning_Pain_into_Drive_a_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/toya/022_Turning_Pain_into_Drive_a_1.png"], 
            back: ["/previews/back/toya/022_Turning_Pain_into_Drive_a_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/toya/022_Turning_Pain_into_Drive_a_2.png"], 
            back: ["/previews/back/toya/022_Turning_Pain_into_Drive_a_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/toya/022_Turning_Pain_into_Drive_a_3.png"], 
            back: ["/previews/back/toya/022_Turning_Pain_into_Drive_a_3.png"] 
          },
        ],
      },
      {
        name: "시노노메 아키토",
        subtitle: "[예상 밖의 말] Bond of flame",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/akito/023_Turning_Pain_into_Drive_a_0.png"], 
            back: ["/previews/back/akito/023_Turning_Pain_into_Drive_a_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/akito/023_Turning_Pain_into_Drive_a_1.png"], 
            back: ["/previews/back/akito/023_Turning_Pain_into_Drive_a_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/akito/023_Turning_Pain_into_Drive_a_2.png"], 
            back: ["/previews/back/akito/023_Turning_Pain_into_Drive_a_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/akito/023_Turning_Pain_into_Drive_a_3.png"], 
            back: ["/previews/back/akito/023_Turning_Pain_into_Drive_a_3.png"] 
          },
        ],
      },
      {
        name: "아즈사와 코하네",
        subtitle: "[황혼빛 미소] Bond of Sparkle",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/kohane/022_Turning_Pain_into_Drive_a_0.png"], 
            back: ["/previews/back/kohane/022_Turning_Pain_into_Drive_a_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/kohane/022_Turning_Pain_into_Drive_a_1.png"], 
            back: ["/previews/back/kohane/022_Turning_Pain_into_Drive_a_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/kohane/022_Turning_Pain_into_Drive_a_2.png"], 
            back: ["/previews/back/kohane/022_Turning_Pain_into_Drive_a_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/kohane/022_Turning_Pain_into_Drive_a_3.png"], 
            back: ["/previews/back/kohane/022_Turning_Pain_into_Drive_a_3.png"] 
          },
        ],
      },
      {
        name: "시라이시 안",
        subtitle: "[애달픔도 받아들이고] Bond of belief",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/an/021_Turning_Pain_into_Drive_a_0.png"], 
            back: ["/previews/back/an/021_Turning_Pain_into_Drive_a_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/an/021_Turning_Pain_into_Drive_a_1.png"], 
            back: ["/previews/back/an/021_Turning_Pain_into_Drive_a_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/an/021_Turning_Pain_into_Drive_a_2.png"], 
            back: ["/previews/back/an/021_Turning_Pain_into_Drive_a_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/an/021_Turning_Pain_into_Drive_a_3.png"], 
            back: ["/previews/back/an/021_Turning_Pain_into_Drive_a_3.png"] 
          },
        ],
      },
    ],
  },

  콜라보: {
    title: "+ 산리오 콜라보 의상",
    characters: [
      {
        name: "텐마 사키",
        subtitle: "[feat. 폼폼푸린] 느긋 피크닉 코디",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/saki/015_sanrio_c_0.png"], 
            back: ["/previews/back/saki/015_sanrio_c_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/saki/015_sanrio_c_1.png"], 
            back: ["/previews/back/saki/015_sanrio_c_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/saki/015_sanrio_c_2.png"], 
            back: ["/previews/back/saki/015_sanrio_c_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/saki/015_sanrio_c_3.png"], 
            back: ["/previews/back/saki/015_sanrio_c_3.png"] 
          },
        ],
      },
      {
        name: "아오야기 토우야",
        subtitle: "[feat. 포차코] 산책 카디건 스타일",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/toya/014_sanrio_c_0.png"], 
            back: ["/previews/back/toya/014_sanrio_c_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/toya/014_sanrio_c_1.png"], 
            back: ["/previews/back/toya/014_sanrio_c_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/toya/014_sanrio_c_2.png"], 
            back: ["/previews/back/toya/014_sanrio_c_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/toya/014_sanrio_c_3.png"], 
            back: ["/previews/back/toya/014_sanrio_c_3.png"] 
          },
        ],
      },
      {
        name: "하츠네 미쿠",
        subtitle: "[feat. 헬로키티] 애플 피크닉 코디",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/miku/017_sanrio_c_0.png"], 
            back: ["/previews/back/miku/017_sanrio_c_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/miku/017_sanrio_c_1.png"], 
            back: ["/previews/back/miku/017_sanrio_c_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/miku/017_sanrio_c_2.png"], 
            back: ["/previews/back/miku/017_sanrio_c_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/miku/017_sanrio_c_3.png"], 
            back: ["/previews/back/miku/017_sanrio_c_3.png"] 
          },
        ],
      },
      {
        name: "모모이 아이리",
        subtitle: "[feat. 마이멜로디] 풍성한 리본과 딸기 원피스",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/airi/016_sanrio_c_0.png"], 
            back: ["/previews/back/airi/016_sanrio_c_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/airi/016_sanrio_c_1.png"], 
            back: ["/previews/back/airi/016_sanrio_c_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/airi/016_sanrio_c_2.png"], 
            back: ["/previews/back/airi/016_sanrio_c_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/airi/016_sanrio_c_3.png"], 
            back: ["/previews/back/airi/016_sanrio_c_3.png"] 
          },
        ],
      },
      {
        name: "오오토리 에무",
        subtitle: "[feat. 시나모롤] 폭신폭신 깜찍 메이드복",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/emu/015_sanrio_c_0.png"], 
            back: ["/previews/back/emu/015_sanrio_c_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/emu/015_sanrio_c_1.png"], 
            back: ["/previews/back/emu/015_sanrio_c_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/emu/015_sanrio_c_2.png"], 
            back: ["/previews/back/emu/015_sanrio_c_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/emu/015_sanrio_c_3.png"], 
            back: ["/previews/back/emu/015_sanrio_c_3.png"] 
          },
        ],
      },
      {
        name: "시노노메 에나",
        subtitle: "[feat. 쿠로미] 쿨한 소녀 원피스",
        sets: [
          { 
            key: "base", 
            label: "기본", 
            front: ["/previews/front/ena/016_sanrio_c_0.png"], 
            back: ["/previews/back/ena/016_sanrio_c_0.png"] 
          },
          { 
            key: "another1", 
            label: "어나더 1", 
            front: ["/previews/front/ena/016_sanrio_c_1.png"], 
            back: ["/previews/back/ena/016_sanrio_c_1.png"] 
          },
          { 
            key: "another2", 
            label: "어나더 2", 
            front: ["/previews/front/ena/016_sanrio_c_2.png"], 
            back: ["/previews/back/ena/016_sanrio_c_2.png"] 
          },
          { 
            key: "another3", 
            label: "어나더 3", 
            front: ["/previews/front/ena/016_sanrio_c_3.png"], 
            back: ["/previews/back/ena/016_sanrio_c_3.png"] 
          },
        ],
      },
    ],
  },
};