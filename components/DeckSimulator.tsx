"use client";

import { useState } from "react";
import { FinalCardInfo } from "@/data/cards/template";
import { ALL_CARDS } from "@/data/cards"; 

// 🌟 필터용 데이터 상수 확장! (스킬과 캐릭터 리스트 추가)
const ATTR_LIST = [
  { id: "pure", name: "퓨어" }, { id: "cool", name: "쿨" }, 
  { id: "happy", name: "해피" }, { id: "mysterious", name: "미스테리" }, { id: "cute", name: "큐트" }
];
const UNIT_LIST = [
  { id: "vs", name: "버싱" }, { id: "ln", name: "레오니" }, 
  { id: "mmj", name: "모모점" }, { id: "vbs", name: "비배스" }, 
  { id: "wxs", name: "원더쇼" }, { id: "n25", name: "니고" }
];
// (※ 아래 스킬/캐릭터 이름은 실제 도감 데이터 기준에 맞춰 수정해서 사용하시면 됩니다!)
const SKILL_LIST = [
  "스업", "퍼스업", "굿스업", "체스업", "판강", "힐", "팀스업", "블페"
];
const CHAR_LIST = [
  "이치카", "사키", "호나미", "시호", "미노리", "하루카", "아이리", "시즈쿠", 
  "코하네", "안", "아키토", "토우야", "츠카사", "에무", "네네", "루이", 
  "카나데", "마후유", "에나", "미즈키", "미쿠", "린", "렌", "루카", "메이코", "카이토"
];

export default function DeckSimulator() {
  const [presets, setPresets] = useState<Array<Array<FinalCardInfo | null>>>(
    Array.from({ length: 6 }, () => Array(5).fill(null))
  );
  const [activeTab, setActiveTab] = useState(0); 
  
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [tempSelectedCard, setTempSelectedCard] = useState<FinalCardInfo | null | undefined>(undefined); 
  const [isFilterOpen, setIsFilterOpen] = useState(false); 

  const [bonusTarget, setBonusTarget] = useState({ unit: "wxs", attr: "happy" });

  // 🌟 필터 State 확장! (스킬, 캐릭터 추가)
  const [filterAttrs, setFilterAttrs] = useState<string[]>([]);
  const [filterUnits, setFilterUnits] = useState<string[]>([]);
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [filterChars, setFilterChars] = useState<string[]>([]);
  
  const [draftAttrs, setDraftAttrs] = useState<string[]>([]);
  const [draftUnits, setDraftUnits] = useState<string[]>([]);
  const [draftSkills, setDraftSkills] = useState<string[]>([]);
  const [draftChars, setDraftChars] = useState<string[]>([]);

  const currentDeck = presets[activeTab];

  const openMemberSelect = (index: number) => {
    setEditingSlot(index);
    setTempSelectedCard(currentDeck[index] || null); // 현재 카드 상태 복사 (없으면 null)
  };

  const closeMemberSelect = () => {
    setEditingSlot(null);
    setTempSelectedCard(undefined);
  };

  const handleConfirmSelection = () => {
    if (editingSlot === null || tempSelectedCard === undefined) return;
    const newPresets = [...presets];
    const newDeck = [...newPresets[activeTab]];
    
    if (tempSelectedCard === null) {
      newDeck[editingSlot] = null; // 🌟 해제 처리
    } else {
      const existingIndex = newDeck.findIndex(c => c !== null && c.character === tempSelectedCard.character);
      if (existingIndex !== -1 && existingIndex !== editingSlot) {
        newDeck[existingIndex] = newDeck[editingSlot]; 
      }
      newDeck[editingSlot] = tempSelectedCard;
    }
    
    newPresets[activeTab] = newDeck;
    setPresets(newPresets);
    closeMemberSelect();
  };

  const openFilterModal = () => {
    setDraftAttrs(filterAttrs);
    setDraftUnits(filterUnits);
    setDraftSkills(filterSkills);
    setDraftChars(filterChars);
    setIsFilterOpen(true);
  };

  // 🌟 임시 필터 토글 로직 확장
  const toggleDraftFilter = (type: "attr" | "unit" | "skill" | "char", id: string) => {
    if (type === "attr") setDraftAttrs(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    else if (type === "unit") setDraftUnits(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    else if (type === "skill") setDraftSkills(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    else if (type === "char") setDraftChars(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const applyFilter = () => {
    setFilterAttrs(draftAttrs);
    setFilterUnits(draftUnits);
    setFilterSkills(draftSkills);
    setFilterChars(draftChars);
    setIsFilterOpen(false);
  };

  // 🌟 필터링 로직 확장!
  const filteredCards = ALL_CARDS.filter(card => {
    const matchAttr = filterAttrs.length === 0 || (card.attribute && filterAttrs.includes(card.attribute));
    const matchUnit = filterUnits.length === 0 || filterUnits.includes(card.unit ?? ""); 
    const matchSkill = filterSkills.length === 0 || filterSkills.includes(card.skillType);
    const matchChar = filterChars.length === 0 || filterChars.includes(card.character ?? "");
    return matchAttr && matchUnit && matchSkill && matchChar;
  });

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-4 relative select-none">
      
      {/* 1. 프리셋 탭 */}
      <div className="flex justify-center">
        <div className="flex items-center bg-zinc-200/50 dark:bg-black/40 p-1.5 rounded-full backdrop-blur-md shadow-inner border border-zinc-300/50 dark:border-white/10">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <button key={idx} onClick={() => setActiveTab(idx)} className={`px-5 py-1.5 md:px-7 md:py-2 rounded-full text-xs md:text-sm font-extrabold transition-all duration-300 ${activeTab === idx ? "bg-white dark:bg-zinc-200 text-zinc-900 shadow-md scale-105" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 hover:bg-white/30"}`}>{`0${idx + 1}`}</button>
          ))}
        </div>
      </div>

      {/* 2. 중앙 5칸 카드 슬롯 */}
      <div className="w-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl border border-white/50 dark:border-white/10 relative overflow-hidden">
        <div className="grid grid-cols-5 gap-2 md:gap-3 mt-4">
          {currentDeck.map((card, index) => (
            <div key={index} onClick={() => openMemberSelect(index)} className="relative w-full aspect-[11/15] bg-zinc-100 dark:bg-zinc-800/80 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer border-[2px] md:border-[3px] border-transparent hover:border-teal-400 transition-all duration-200 flex items-center justify-center shadow-inner group">
              {index === 0 && <div className="absolute top-0 left-0 bg-pink-500 text-white text-[9px] md:text-[11px] font-black px-2 py-0.5 md:py-1 rounded-br-lg z-20 shadow-sm">리더</div>}
              {index === 1 && <div className="absolute top-0 right-0 bg-teal-400 text-white text-[9px] md:text-[11px] font-black px-2 py-0.5 md:py-1 rounded-bl-lg z-20 shadow-sm">서브 리더</div>}
              {card ? (
                <>
                  <img src={card.thumbPostPath} alt="카드" className="w-full h-full object-cover object-top z-0" />
                  {card.attribute && <div className="absolute top-1 right-1 md:top-2 md:right-2 z-10 w-4 h-4 md:w-6 md:h-6 drop-shadow-md"><img src={`/icons/attrs/${card.attribute}.png`} alt="속성" className="w-full h-full object-contain" /></div>}
                </>
              ) : (
                <span className="text-zinc-400 text-2xl font-light group-hover:scale-125 transition-transform">+</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. 하단 컨트롤 패널 (생략: 기존 코드 유지) */}


      {/* ==========================================
          🌟 4. 멤버 선택 모달 (해제 버튼 복구!)
      ========================================== */}
      {editingSlot !== null && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={closeMemberSelect}>
          <div className="bg-[#6b7280] dark:bg-zinc-900 w-full max-w-5xl h-[85vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden border-4 border-white/20" onClick={(e) => e.stopPropagation()}>
            
            {/* 상단 툴바 */}
            <div className="flex items-center justify-between p-3 md:p-4 bg-black/20 shrink-0">
              <h3 className="text-lg md:text-xl font-bold text-white pl-2">멤버 선택</h3>
              
              <div className="flex items-center gap-2 md:gap-3">
                {/* 🌟 꽉 찬 깔때기 아이콘 적용! */}
                <button onClick={openFilterModal} className={`w-9 h-9 flex items-center justify-center rounded-full shadow-sm transition-colors ${filterAttrs.length > 0 || filterUnits.length > 0 || filterSkills.length > 0 || filterChars.length > 0 ? "bg-teal-400 text-white" : "bg-white/90 text-zinc-700 hover:bg-white"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6.58579C21 6.851 20.8946 7.10536 20.7071 7.29289L14 14V20C14 20.3703 13.7951 20.708 13.4682 20.8715L10.4682 22.3715C9.91414 22.6485 9.25 22.2458 9.25 21.5V14L2.29289 7.29289C2.10536 7.10536 2 6.851 2 6.58579V4C2 3.44772 2.44772 3 3 3H3Z"/>
                  </svg>
                </button>
                <button onClick={() => { setFilterAttrs([bonusTarget.attr]); setFilterUnits([bonusTarget.unit]); }} className="px-4 py-1.5 bg-white/90 hover:bg-white text-zinc-700 font-bold rounded-full text-sm shadow-sm transition-colors">이벤트 보너스</button>
                <button onClick={closeMemberSelect} className="w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-red-500 font-bold transition-colors ml-2">✕</button>
              </div>
            </div>

            {/* 카드 리스트 구역 */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-transparent">
              <div className="flex flex-wrap gap-2 md:gap-3 items-start content-start">
                
                {/* 🌟 기존에 있던 앙증맞은 해제 버튼 복구! */}
                <div 
                  onClick={() => setTempSelectedCard(null)} 
                  className={`relative w-[76px] h-[76px] md:w-[84px] md:h-[84px] cursor-pointer hover:scale-105 transition-all rounded-lg overflow-hidden shadow-sm flex flex-col items-center justify-center shrink-0 bg-white dark:bg-zinc-800
                    ${tempSelectedCard === null ? "border-[4px] border-teal-400 scale-105 z-10" : "border-2 border-dashed border-zinc-400"}`}
                >
                  <span className="text-2xl text-zinc-400 mb-0.5">✕</span>
                  <span className="text-[10px] font-bold text-zinc-500">해제</span>
                </div>

                {filteredCards.map((card) => {
                  const isEquipped = currentDeck.some(c => c?.character === card.character); 
                  const isSelected = tempSelectedCard?.id === card.id;

                  return (
                    <div 
                      key={card.id} 
                      onClick={() => setTempSelectedCard(card)}
                      className={`relative w-[76px] h-[76px] md:w-[84px] md:h-[84px] cursor-pointer hover:scale-105 transition-all rounded-lg overflow-hidden shadow-sm shrink-0 bg-zinc-800
                        ${isSelected ? "border-[4px] border-teal-400 scale-105 z-10" : "border-2 border-transparent"}
                      `}
                    >
                      <img src={card.thumbPostPath} alt="카드" loading="lazy" decoding="async" className="w-full h-full object-cover object-[center_15%]" />
                      {card.attribute && <div className="absolute top-1 left-1 w-4 h-4 drop-shadow-md z-10"><img src={`/icons/attrs/${card.attribute}.png`} alt={card.attribute} className="w-full h-full object-contain" /></div>}
                      {isEquipped && !isSelected && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"><span className="text-white text-[9px] font-bold px-2 py-1 bg-pink-500/90 rounded-sm">편성 중</span></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 하단 비교 & 결정 구역 */}
            <div className="h-20 bg-[#5c6375] dark:bg-zinc-800 border-t border-white/10 flex items-center justify-between px-4 md:px-8 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-md bg-black/30 overflow-hidden border border-white/20">
                    {currentDeck[editingSlot] && <img src={currentDeck[editingSlot]!.thumbPostPath} className="w-full h-full object-cover object-top" />}
                  </div>
                  <span className="text-teal-300 font-black text-lg">▶</span>
                  <div className="w-12 h-12 rounded-md bg-black/30 overflow-hidden border border-white/20 flex items-center justify-center">
                    {tempSelectedCard === null ? <span className="text-white/50 text-xl font-light">✕</span> : tempSelectedCard && <img src={tempSelectedCard.thumbPostPath} className="w-full h-full object-cover object-top" />}
                  </div>
                </div>
                <div className="flex flex-col ml-4">
                  <span className="text-white/70 text-[10px] font-bold">예상 실스업 변화</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-bold">120%</span>
                    <span className="text-teal-300 text-xs font-bold">▲ 15%</span>
                  </div>
                </div>
              </div>
              <button onClick={handleConfirmSelection} className="px-8 py-2.5 bg-teal-400 hover:bg-teal-300 text-white text-sm font-extrabold rounded-full shadow-lg transition-colors">결정</button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          🌟 5. 하얀색 팝업: 조건 커스텀 필터 모달 (스킬/캐릭터 추가!)
      ========================================== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up border border-zinc-200">
            
            <div className="flex justify-end p-3 pb-0 shrink-0">
              <button onClick={() => setIsFilterOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 font-bold transition-colors">✕</button>
            </div>

            {/* 🌟 내부 스크롤 적용 (내용이 길어져도 안전!) */}
            <div className="px-6 pb-2 overflow-y-auto flex-1">
              
              {/* 간단 필터링 */}
              <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                <h4 className="text-xs font-bold text-zinc-400 mb-3">간단 필터링</h4>
                <div className="flex gap-2">
                  <button onClick={() => { setDraftUnits([]); setDraftAttrs([]); setDraftSkills([]); setDraftChars([]); }} className="flex-1 py-2 rounded-full border border-zinc-300 text-zinc-700 text-sm font-bold hover:bg-zinc-50">전체</button>
                  <button onClick={() => { setDraftUnits([bonusTarget.unit]); setDraftAttrs([bonusTarget.attr]); }} className="flex-1 py-2 rounded-full border border-zinc-300 text-zinc-700 text-sm font-bold hover:bg-zinc-50">이벤트 보너스</button>
                </div>
              </div>

              {/* 조건 커스텀 */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 mb-3">조건 커스텀</h4>
                
                {/* 1. 유닛/서브 유닛 */}
                <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-3">유닛/서브 유닛</span>
                  <div className="grid grid-cols-4 gap-3">
                    <button onClick={() => setDraftUnits([])} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${draftUnits.length === 0 ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftUnits.length === 0 ? "bg-teal-400" : "bg-transparent"}`} /></div>
                      <span className="text-xs font-bold text-zinc-700">전체</span>
                    </button>
                    {UNIT_LIST.map(u => (
                      <button key={u.id} onClick={() => toggleDraftFilter("unit", u.id)} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${draftUnits.includes(u.id) ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftUnits.includes(u.id) ? "bg-teal-400" : "bg-transparent"}`} /></div>
                        <img src={`/icons/${u.id}.png`} alt={u.name} className="w-5 h-5 object-contain" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. 타입(속성) */}
                <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-3">타입</span>
                  <div className="grid grid-cols-4 gap-3">
                    <button onClick={() => setDraftAttrs([])} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${draftAttrs.length === 0 ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftAttrs.length === 0 ? "bg-teal-400" : "bg-transparent"}`} /></div>
                      <span className="text-xs font-bold text-zinc-700">전체</span>
                    </button>
                    {ATTR_LIST.map(a => (
                      <button key={a.id} onClick={() => toggleDraftFilter("attr", a.id)} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${draftAttrs.includes(a.id) ? "border-teal-400" : "border-zinc-300"}`}><div className={`w-2.5 h-2.5 rounded-full ${draftAttrs.includes(a.id) ? "bg-teal-400" : "bg-transparent"}`} /></div>
                        <img src={`/icons/attrs/${a.id}.png`} alt={a.name} className="w-5 h-5 object-contain" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 🌟 3. 스킬 구역 */}
                <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-3">스킬</span>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setDraftSkills([])} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${draftSkills.length === 0 ? "bg-teal-400 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>전체</button>
                    {SKILL_LIST.map(skill => (
                      <button key={skill} onClick={() => toggleDraftFilter("skill", skill)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${draftSkills.includes(skill) ? "bg-teal-400 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 🌟 4. 캐릭터 구역 */}
                <div className="pb-4">
                  <span className="text-[11px] font-bold text-zinc-500 block mb-3">캐릭터</span>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setDraftChars([])} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${draftChars.length === 0 ? "bg-teal-400 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>전체</button>
                    {CHAR_LIST.map(char => (
                      <button key={char} onClick={() => toggleDraftFilter("char", char)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors border ${draftChars.includes(char) ? "bg-teal-50 border-teal-400 text-teal-600 shadow-sm" : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"}`}>
                        {char}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* 하단 취소 / 결정 버튼 (고정) */}
            <div className="flex bg-zinc-100 p-4 gap-3 shrink-0">
              <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-2.5 bg-white border border-zinc-300 rounded-full text-zinc-600 font-bold shadow-sm hover:bg-zinc-50 transition-colors">취소</button>
              <button onClick={applyFilter} className="flex-1 py-2.5 bg-teal-400 rounded-full text-white font-bold shadow-sm hover:bg-teal-300 transition-colors">결정</button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}