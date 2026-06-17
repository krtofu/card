"use client";

import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page";
import ModalCostumePreviewCard from "@/components/ModalCostumePreviewCard";

interface CardDetailModalProps {
  card: FinalCardInfo | null;
  userState: UserCardState;
  onUpdateState: (id: string, newState: Partial<UserCardState>) => void;
  onClose: () => void;
}

export default function CardDetailModal({
  card,
  userState,
  onUpdateState,
  onClose,
}: CardDetailModalProps) {
  if (!card) return null;

  const postIllustration = card.thumbPostPath 
    ? card.thumbPostPath.replace("thumb_post.png", "post.png") 
    : "";
  const preIllustration = card.thumbPostPath 
    ? card.thumbPostPath.replace("thumb_post.png", "pre.png") 
    : "";

  const hasCostume = !!card.costume;
  const attribute = card.attribute || "속성";

  const songName = card.songName || ""; 
  const songJacket = card.songJacketPath || ""; 
  const hasSong = !!songName || !!songJacket;
  
  const hasEvent = !!card.eventName;

  const costumePreviewData = hasCostume && card.costume ? {
    title: card.cardName,
    subtitle: card.costume.name,
    characters: [
      {
        name: card.character,
        sets: card.costume.sets.map((set) => ({
          key: set.key,
          label: set.label,
          front: [set.front], 
          back: [set.back]
        }))
      }
    ]
  } : null;

  const getGachaBadgeStyle = (gachaType: string) => {
    switch (gachaType) {
      case "통상": return "border-sky-300/45 bg-sky-400/16 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]";
      case "한정": return "border-pink-300/45 bg-pink-400/16 text-pink-100 shadow-[0_0_0_1px_rgba(236,72,153,0.18)]";
      case "페스": return "border-violet-300/45 bg-violet-400/16 text-violet-100 shadow-[0_0_0_1px_rgba(167,139,250,0.20)]";
      case "월링": return "border-emerald-300/45 bg-emerald-400/16 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.18)]";
      case "콜라보": return "border-amber-300/45 bg-amber-400/16 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.18)]";
      default: return "border-white/10 bg-zinc-800 text-zinc-400";
    }
  };

  const getAttrInfo = (attr: string) => {
    const key = attr.toLowerCase();
    if (key === "pure" || key === "퓨어") return { src: "/icons/attrs/pure.png", label: "퓨어" };
    if (key === "happy" || key === "해피") return { src: "/icons/attrs/happy.png", label: "해피" };
    if (key === "cute" || key === "큐트") return { src: "/icons/attrs/cute.png", label: "큐트" };
    if (key === "mysterious" || key === "미스테리어스") return { src: "/icons/attrs/mysterious.png", label: "미스테리어스" };
    if (key === "cool" || key === "쿨") return { src: "/icons/attrs/cool.png", label: "쿨" };
    return { src: "", label: attr };
  };

  const getSkillInfo = (skill: string) => {
    if (!skill) return { src: "", label: "" };
    
    if (skill === "스업") {
      return { src: "/icons/skills/score_x.png", label: "스업" };
    } 
    if (["퍼스업", "굿스업", "체스업", "블페", "팀스업"].includes(skill)) {
      return { src: "/icons/skills/condition_x.png", label: skill }; 
    } 
    if (skill === "판강") {
      return { src: "/icons/skills/perfect_x.png", label: "판정 강화" };
    } 
    if (skill === "힐") {
      return { src: "/icons/skills/heal_x.png", label: "라이프 회복" };
    }
    
    return { src: "", label: skill };
  };

  // 🌟 캐릭터 얼굴 아이콘 매핑 함수 (유저님 데이터 완벽 반영!)
  const getCharacterIcon = (charName: string) => {
    const charMap: Record<string, string> = {
      // 버추얼 싱어
      "버싱 미쿠": "MIKU_0", "레오니 미쿠": "MIKU_l", "모모점 미쿠": "MIKU_m", "비배스 미쿠": "MIKU_v", "원더쇼 미쿠": "MIKU_w", "니고 미쿠": "MIKU_n",
      "버싱 린": "RIN_0", "레오니 린": "RIN_l", "모모점 린": "RIN_m", "비배스 린": "RIN_v", "원더쇼 린": "RIN_w", "니고 린": "RIN_n",
      "버싱 렌": "REN_0", "레오니 렌": "REN_l", "모모점 렌": "REN_m", "비배스 렌": "REN_v", "원더쇼 렌": "REN_w", "니고 렌": "REN_n",
      "버싱 루카": "LUKA_0", "레오니 루카": "LUKA_l", "모모점 루카": "LUKA_m", "비배스 루카": "LUKA_v", "원더쇼 루카": "LUKA_w", "니고 루카": "LUKA_n",
      "버싱 메이코": "MEIKO_0", "레오니 메이코": "MEIKO_l", "모모점 메이코": "MEIKO_m", "비배스 메이코": "MEIKO_v", "원더쇼 메이코": "MEIKO_w", "니고 메이코": "MEIKO_n",
      "버싱 카이토": "KAITO_0", "레오니 카이토": "KAITO_l", "모모점 카이토": "KAITO_m", "비배스 카이토": "KAITO_v", "원더쇼 카이토": "KAITO_w", "니고 카이토": "KAITO_n",
      // 오리지널 캐릭터
      "이치카": "Ichika", "사키": "Saki", "호나미": "Honami", "시호": "Shiho",
      "미노리": "Minori", "하루카": "Haruka", "아이리": "Airi", "시즈쿠": "Shizuku",
      "코하네": "Kohane", "안": "An", "아키토": "Akito", "토우야": "Toya",
      "츠카사": "Tsukasa", "에무": "Emu", "네네": "Nene", "루이": "Rui",
      "카나데": "Kanade", "마후유": "Mafuyu", "에나": "Ena", "미즈키": "Mizuki"
    };

    const fileName = charMap[charName];
    // 매핑된 이름이 있으면 그 이미지를 반환하고, 없으면 원래 있던 카드 아이콘을 임시로 보여줌
    if (fileName) return `/icons/characters/${fileName}.png`;
    return card.iconPath || ""; 
  };

  const currentGachaStyle = getGachaBadgeStyle(card.gachaType);
  const attrInfo = getAttrInfo(attribute);
  const skillInfo = getSkillInfo(card.skillType || ""); 
  const characterIconPath = getCharacterIcon(card.character || ""); // 👈 캐릭터 아이콘 경로 찾기!

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl transition-all flex flex-col gap-6 custom-scrollbar">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm backdrop-blur-md"
        >
          ✕
        </button>

        {/* 🌌 상단 배너 */}
        <div className="relative -mx-6 -mt-6 h-64 md:h-[360px] shrink-0 flex overflow-hidden border-b border-white/10 bg-zinc-900">
          <div className="relative h-full flex-1 hover:flex-[3] max-w-[455px] md:max-w-[604px] transition-all duration-700 ease-in-out overflow-hidden group/pre z-10 hover:z-20">
            <img src={preIllustration} alt="특훈 전 일러스트" className="absolute left-0 top-0 h-full aspect-[16/9] max-w-none object-cover object-center" />
            <div className="absolute bottom-4 left-5 inline-flex items-center rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-zinc-100 backdrop-blur-md pointer-events-none tracking-wider shadow-md">특훈 전</div>
          </div>
          <div className="relative h-full flex-1 hover:flex-[3] max-w-[455px] md:max-w-[604px] transition-all duration-700 ease-in-out overflow-hidden group/post z-10 hover:z-20 border-l border-white/10">
            <img src={postIllustration} alt="특훈 후 일러스트" className="absolute right-0 top-0 h-full aspect-[16/9] max-w-none object-cover object-center" />
            <div className="absolute bottom-4 right-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-cyan-300 backdrop-blur-md pointer-events-none tracking-wider shadow-md">특훈 후</div>
          </div>
        </div>

        {/* 📝 하단부 */}
        <div className="flex flex-col md:flex-row gap-8 pt-2 shrink-0">
          
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4 w-full mt-1 border-b border-white/5 pb-5">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h2 className="text-xl font-bold text-zinc-100">{card.cardName}</h2>
                <span className="text-xl font-bold text-zinc-100">{card.character}</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
                {/* ✨ 1. 스킬 뱃지 */}
                {skillInfo.src ? (
                  <div className="relative group flex items-center justify-center cursor-help">
                    <img src={skillInfo.src} alt={skillInfo.label} className="w-[26px] h-[26px] object-contain drop-shadow-md shrink-0" />
                    <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-bold text-zinc-200 shadow-xl">
                          {skillInfo.label}
                        </div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  skillInfo.label && (
                    <span className="shrink-0 inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 tracking-wide">
                      {skillInfo.label}
                    </span>
                  )
                )}

                {/* 💧 2. 속성 뱃지 */}
                {attrInfo.src ? (
                  <div className="relative group flex items-center justify-center cursor-help ml-0.5">
                    <img src={attrInfo.src} alt={attrInfo.label} className="w-[26px] h-[26px] object-contain drop-shadow-md shrink-0" />
                    <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 z-50">
                      <div className="relative flex flex-col items-center">
                        <div className="relative z-10 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-bold text-zinc-200 shadow-xl">
                          {attrInfo.label}
                        </div>
                        <div className="absolute -bottom-[4px] z-20 h-2 w-2 rotate-45 border-b border-r border-zinc-600 bg-zinc-950"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="shrink-0 inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 tracking-wide ml-0.5">
                    {attrInfo.label}
                  </span>
                )}

                {/* 🎫 3. 가챠 뱃지 */}
                <span className={`shrink-0 inline-flex items-center px-3 py-1 text-xs font-bold rounded-full border tracking-wide transition-all ml-0.5 ${currentGachaStyle}`}>
                  {card.gachaType}
                </span>
              </div>
            </div>

            {/* 🎲 1. 관련 뽑기 (여기서 캐릭터 얼굴 아이콘이 뜨도록 변경됨!) */}
            <div className="flex gap-3.5">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                <img src={characterIconPath} alt="Character Icon" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-bold text-zinc-200 text-sm mt-0.5">관련 뽑기</span>
                <div className="w-full max-w-[480px] bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                  {card.gachaBannerPath ? (
                    <img src={card.gachaBannerPath} alt="Gacha Banner" className="w-full h-auto block" />
                  ) : (
                    <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                      <span className="text-zinc-600 text-xs">No Banner</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-zinc-400 font-medium">({card.gachaPoolName})</span>
              </div>
            </div>

            {/* 🎪 2. 관련 이벤트 */}
            <div className="flex gap-3.5 pt-2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                <span className="text-zinc-500 text-lg">🎪</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-bold text-zinc-200 text-sm mt-0.5">관련 이벤트</span>
                {hasEvent ? (
                  <>
                    <div className="w-full max-w-[480px] bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                      {card.eventBannerPath ? (
                        <img src={card.eventBannerPath} alt="Event Banner" className="w-full h-auto block" />
                      ) : (
                        <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                          <span className="text-zinc-600 text-xs">No Banner</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">{card.eventName}</span>
                  </>
                ) : (
                  <div className="w-full max-w-[480px] h-24 sm:h-28 bg-zinc-900/30 border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2">
                    <span className="text-xl opacity-50">🛸</span>
                    <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 이벤트 없음</span>
                  </div>
                )}
              </div>
            </div>

            {/* 💿 3. 관련 악곡 */}
            <div className="flex gap-3.5 pt-2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                <span className="text-zinc-500 text-lg">🎵</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-bold text-zinc-200 text-sm mt-0.5">관련 악곡</span>
                {hasSong ? (
                  <>
                    <div className="w-28 sm:w-36 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center shadow-sm shrink-0">
                      <img src={card.songJacketPath} alt="Song Jacket" className="w-full h-auto block" />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">{songName}</span>
                  </>
                ) : (
                  <div className="w-28 sm:w-36 h-28 sm:h-36 bg-zinc-900/30 border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 shrink-0">
                    <span className="text-2xl opacity-50">💿</span>
                    <span className="text-[11px] text-zinc-500 font-medium tracking-wide">관련 악곡 없음</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 👉 우측 영역: 카드 상태 및 의상 프리뷰 컨트롤러 */}
          <div className="w-full md:w-80 shrink-0 flex flex-col gap-6 self-start">
            <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/5">
                <div className="min-w-0 flex-1 flex items-baseline">
                  <p className="text-[15px] font-bold text-zinc-100 tracking-wide whitespace-nowrap">+ 카드 상태</p>
                </div>
                <button
                  onClick={() => onUpdateState(card.id, { isOwned: !userState.isOwned })}
                  className={`shrink-0 inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border tracking-tight transition-all shadow-sm active:scale-95 ${
                    userState.isOwned
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.15)]"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {userState.isOwned ? "✓ 보유 중" : "❌ 미보유"}
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">마스터 랭크</span>
                  <span className="font-bold text-sky-400">
                    {userState.isOwned ? `${userState.masterRank} 마랭` : "비활성"}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map((rank) => (
                    <button
                      key={rank}
                      disabled={!userState.isOwned}
                      onClick={() => onUpdateState(card.id, { masterRank: rank })}
                      className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                        !userState.isOwned
                          ? "bg-zinc-950 text-zinc-800 cursor-not-allowed"
                          : userState.masterRank === rank
                          ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                          : "bg-zinc-950 text-zinc-500 border border-white/5 hover:bg-zinc-900"
                      }`}
                    >
                      {rank}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">스킬 레벨 (Lv.)</span>
                  <span className="font-bold text-purple-400">
                    {userState.isOwned ? `Lv.${userState.skillLevel}` : "비활성"}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((lvl) => (
                    <button
                      key={lvl}
                      disabled={!userState.isOwned}
                      onClick={() => onUpdateState(card.id, { skillLevel: lvl })}
                      className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                        !userState.isOwned
                          ? "bg-zinc-950 text-zinc-800 cursor-not-allowed"
                          : userState.skillLevel === lvl
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-zinc-950 text-zinc-500 border border-white/5 hover:bg-zinc-900"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {costumePreviewData ? (
              <div className="w-full animate-fade-in shadow-xl rounded-2xl bg-zinc-950/50 border border-white/5 overflow-hidden">
                <ModalCostumePreviewCard preview={costumePreviewData as any} userState={userState} />
              </div>
            ) : (
              <div className="w-full h-32 bg-zinc-900/20 border border-white/10 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 shadow-inner animate-fade-in">
                <span className="text-2xl opacity-40">👗</span>
                <span className="text-xs text-zinc-500 font-medium tracking-wide">관련 의상 없음</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}