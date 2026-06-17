import type { UnitName, CharacterName } from "@/lib/colors";
import type { Attr } from "@/lib/gachaNote";
import type { GachaType } from "@/lib/types";

// 1. 입력받는 카드 데이터 타입 (hasHair만 남김!)
export type RawCardInput = {
  id: string;               
  cardName: string;         
  attribute: Attr;          
  gachaType: GachaType;     
  gachaPoolName: string;    
  eventName: string;        
  skillType: string;        

  costumeName?: string;     
  hasCostume?: boolean;     
  hasHair?: boolean;        // 👈 필터용 꼬리표 (hairLimitedOrder 삭제됨)

  gachaBannerPath?: string; 
  eventBannerPath?: string; 
  songName?: string;        
  songJacketPath?: string;  
};

export type CostumeSetPaths = {
  key: string;   
  label: string; 
  front: string; 
  back: string;  
};

// 2. 최종 완성되는 카드 데이터 타입 (hair 객체 대신 boolean만 남김!)
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

  hasHair: boolean;         // 👈 필터에서 써먹을 수 있게 true/false 값만 저장!
};

// 3. 카드 데이터를 생성해주는 함수 (여기를 덮어쓰기 해주세요!)
export function defineCharacterCards(
  unit: UnitName,
  character: CharacterName,
  unitFolder: string,       
  characterFolder: string,  
  cards: RawCardInput[]
): FinalCardInfo[] {
  return cards.map((card) => {
    const folderBase = `/cards/${unitFolder}/${characterFolder}/${card.id}`;

    const thumbPrePath = `${folderBase}/thumb_pre.png`;
    const thumbPostPath = `${folderBase}/thumb_post.png`;
    const preAwakePath = `${folderBase}/pre.png`;
    const postAwakePath = `${folderBase}/post.png`;

    // 🌟 [뿌리 개조] 여기서 캐릭터 얼굴 아이콘을 확정 지어버립니다!
    let finalIconPath = `${folderBase}/icon.png`; // 기본값
    
    // 혹시 모를 띄어쓰기를 전부 제거(.trim)하고 검사합니다
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
      "하츠네 미쿠": "MIKU", "미쿠": "MIKU",
      "카가미네 린": "RIN", "린": "RIN",
      "카가미네 렌": "REN", "렌": "REN",
      "메구리네 루카": "LUKA", "루카": "LUKA",
      "MEIKO": "MEIKO", "메이코": "MEIKO",
      "KAITO": "KAITO", "카이토": "KAITO"
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
      else if (cleanUnitName.includes("니고") || cleanUnitName.includes("25") || cleanUnitName === "niigo") suffix = "_n";
      finalIconPath = `/icons/characters/${vsBase}${suffix}.png`;
    }

    // 👗 의상 경로 처리
    let costumeData = undefined;
    if (card.hasCostume && card.costumeName) {
      const labels = ["기본", "어나더 1", "어나더 2", "어나더 3"];
      const sets: CostumeSetPaths[] = labels.map((label, index) => ({
        key: index === 0 ? "base" : `another${index}`,
        label,
        front: `${folderBase}/c_front_${index}.png`,
        back: `${folderBase}/c_back_${index}.png`,
      }));

      costumeData = {
        name: card.costumeName,
        sets,
      };
    }

    return {
      id: card.id,
      unit,
      character,
      cardName: card.cardName,
      attribute: card.attribute,
      gachaType: card.gachaType,
      gachaPoolName: card.gachaPoolName,
      eventName: card.eventName,
      skillType: card.skillType,
      
      thumbPrePath,  
      thumbPostPath, 
      preAwakePath,
      postAwakePath,
      iconPath: finalIconPath, // 👈 이제 앱 어디서든 무조건 '얼굴 아이콘 경로'가 나갑니다!
      
      gachaBannerPath: card.gachaBannerPath,
      eventBannerPath: card.eventBannerPath,
      songName: card.songName,
      songJacketPath: card.songJacketPath,
      
      costume: costumeData,
      hasHair: !!card.hasHair, 
    };
  });
}