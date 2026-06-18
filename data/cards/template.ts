import type { UnitName, CharacterName } from "@/lib/colors";
import type { Attr } from "@/lib/gachaNote";
import type { GachaType } from "@/lib/types";

// 🌟 [카드 내부 조각화 입력 양식 정의]
export type CardInfoGroup = {
  id: string;               
  cardName: string;         
  attribute: Attr;          
  gachaType: GachaType;     
  gachaPoolName: string;    
  eventName?: string;        
  skillType: string;        
  releaseDate: string;      // 👈 [추가됨!] 출시일 (예: "2020-09-30")
};

export type CardMediaGroup = {
  gachaBannerPath?: string; 
  eventBannerPath?: string; 
  songName?: string;        
  songJacketPath?: string;  
};

export type CardCostumeGroup = {
  hasCostume?: boolean;     
  costumeName?: string;
  hasHair?: boolean;        
};

// 🌟 [방별 입력 양식 통합]
export type NormalCardInput = { info: CardInfoGroup; media?: CardMediaGroup; costume?: CardCostumeGroup; };
export type LimitedCardInput = { info: CardInfoGroup; media?: CardMediaGroup; costume?: CardCostumeGroup; };
export type FesCardInput = { info: CardInfoGroup; media?: CardMediaGroup; costume?: CardCostumeGroup; };

export type RawCardInput = NormalCardInput | LimitedCardInput | FesCardInput;

export type CostumeSetPaths = {
  key: string;   
  label: string; 
  front: string; 
  back: string;  
};

// 🌟 [앱 전체가 사용하는 최종 완성형 데이터 뼈대]
export type FinalCardInfo = {
  id: string;
  unit: UnitName;           
  character: CharacterName; 
  cardName: string;
  attribute: Attr;
  gachaType: GachaType;     
  gachaPoolName: string;
  eventName: string;
  skillType: string;        
  releaseDate: string;      // 👈 [추가됨!] 최종 데이터에도 출시일 보관

  thumbPrePath: string;     
  thumbPostPath: string;    
  preAwakePath: string;     
  postAwakePath: string;     
  iconPath: string;         

  gachaBannerPath?: string;
  eventBannerPath?: string;
  songName?: string;
  songJacketPath?: string;

  costume?: {
    name: string;
    sets: CostumeSetPaths[]; 
  };

  hasHair: boolean;         
};

// 🌟 [하이브리드 데이터 조립 통합 엔진] 
export function defineCharacterCards(
  unit: UnitName,
  character: CharacterName,
  unitFolder: string,       
  characterFolder: string,  
  cardGroups: {
    normal?: NormalCardInput[];
    limited?: LimitedCardInput[];
    fes?: FesCardInput[];
  }
): FinalCardInfo[] {
  const allInputs: RawCardInput[] = [
    ...(cardGroups.normal || []),
    ...(cardGroups.limited || []),
    ...(cardGroups.fes || []),
  ];

  return allInputs.map((card) => {
    const { info, media, costume } = card;
    const folderBase = `/cards/${unitFolder}/${characterFolder}/${info.id}`;

    const thumbPrePath = `${folderBase}/thumb_pre.png`;
    const thumbPostPath = `${folderBase}/thumb_post.png`;
    const preAwakePath = `${folderBase}/pre.png`;
    const postAwakePath = `${folderBase}/post.png`;

    let finalIconPath = `${folderBase}/icon.png`;
    const cleanCharName = character.trim(); 
    const cleanUnitName = unit.trim().toLowerCase();

    const originalMap: Record<string, string> = {
      "호시노 이치카": "Ichika", "텐마 사키": "Saki", "모치즈키 호나미": "Honami", "히노모리 시호": "Shiho",
      "하나사토 미노리": "Minori", "키리타니 하루카": "Haruka", "모모이 아이리": "Airi", "히노모리 시즈쿠": "Shizuku",
      "아즈사와 코하네": "Kohane", "시라이시 안": "An", "시노노메 아키토": "Akito", "아오야기 토우야": "Toya",
      "텐마 츠카사": "Tsukasa", "오토리 에무": "Emu", "쿠사나기 네네": "Nene", "카미시로 루이": "Rui",
      "요이사키 카나데": "Kanade", "아사히나 마후유": "Mafuyu", "시노노메 에나": "Ena", "아키야마 미즈키": "Mizuki"
    };

    const vsMap: Record<string, string> = {
      "하츠네 미쿠": "MIKU", "미쿠": "MIKU", "카가미네 린": "RIN", "린": "RIN", "카가미네 렌": "REN", "렌": "REN",
      "메구리네 루카": "LUKA", "루카": "LUKA", "MEIKO": "MEIKO", "메이코": "MEIKO", "KAITO": "KAITO", "카이토": "KAITO"
    };

    if (originalMap[cleanCharName]) {
      finalIconPath = `/icons/characters/${originalMap[cleanCharName]}.png`;
    } else if (vsMap[cleanCharName]) {
      const vsBase = vsMap[cleanCharName];
      let suffix = "_0";
      if (cleanUnitName.includes("레오니") || cleanUnitName.includes("leo") || cleanUnitName === "l/n") suffix = "_l";
      else if (cleanUnitName.includes("모모점") || cleanUnitName.includes("more") || cleanUnitName === "mmj") suffix = "_m";
      else if (cleanUnitName.includes("비배스") || cleanUnitName.includes("vivid") || cleanUnitName === "vbs") suffix = "_v";
      else if (cleanUnitName.includes("원더쇼") || cleanUnitName.includes("wonder") || cleanUnitName === "wxs") suffix = "_w";
      else if (cleanUnitName.includes("니고") || cleanUnitName.includes("25") || cleanUnitName === "nigo") suffix = "_n";
      finalIconPath = `/icons/characters/${vsBase}${suffix}.png`;
    }

    let costumeData = undefined;
    if (costume?.hasCostume && costume.costumeName) {
      const labels = ["기본", "어나더 1", "어나더 2", "어나더 3"];
      const sets: CostumeSetPaths[] = labels.map((label, index) => ({
        key: index === 0 ? "base" : `another${index}`,
        label,
        front: `${folderBase}/c_front_${index}.png`,
        back: `${folderBase}/c_back_${index}.png`,
      }));
      costumeData = { name: costume.costumeName, sets };
    }

    return {
      id: info.id,
      unit,
      character,
      cardName: info.cardName,
      attribute: info.attribute,
      gachaType: info.gachaType,
      gachaPoolName: info.gachaPoolName,
      eventName: info.eventName || "",
      skillType: info.skillType,
      releaseDate: info.releaseDate, // 👈 [추가됨!]
      
      thumbPrePath,  
      thumbPostPath, 
      preAwakePath,
      postAwakePath,
      iconPath: finalIconPath,
      
      gachaBannerPath: media?.gachaBannerPath,
      eventBannerPath: media?.eventBannerPath,
      songName: media?.songName,
      songJacketPath: media?.songJacketPath,
      
      costume: costumeData,
      hasHair: !!costume?.hasHair, 
    };
  });
}