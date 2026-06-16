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

// 3. 카드 데이터를 생성해주는 함수
export function defineCharacterCards(
  unit: UnitName,
  character: CharacterName,
  unitFolder: string,       
  characterFolder: string,  
  cards: RawCardInput[]
): FinalCardInfo[] {
  return cards.map((card) => {
    const folderBase = `/cards/${unitFolder}/${characterFolder}/${card.id}`;

    // 🌟 규칙에 맞춰 썸네일, 일러스트, 아이콘 자동 매칭
    const thumbPrePath = `${folderBase}/thumb_pre.png`;
    const thumbPostPath = `${folderBase}/thumb_post.png`;
    const preAwakePath = `${folderBase}/pre.png`;
    const postAwakePath = `${folderBase}/post.png`;
    const iconPath = `${folderBase}/icon.png`;

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

    // 🌟 에러가 나던 return 부분! (모든 정보를 누락 없이 꽉 채워서 반환합니다)
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
      iconPath, 
      
      gachaBannerPath: card.gachaBannerPath,
      eventBannerPath: card.eventBannerPath,
      songName: card.songName,
      songJacketPath: card.songJacketPath,
      
      costume: costumeData,
      hasHair: !!card.hasHair, // 🌟 복잡한 객체 대신 가볍게 true/false만 반환!
    };
  });
}