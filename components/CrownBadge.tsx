// src/components/CrownBadge.tsx

interface CrownBadgeProps {
  rank: 1 | 2 | 3;
  className?: string; // 크기 조절용 (예: "w-10 h-10")
}

export default function CrownBadge({ rank, className = "w-10 h-10" }: CrownBadgeProps) {
  // 🌟 사진에서 완벽하게 추출한 컬러 및 설정값
  const config = {
    1: { main: "#D5B45B", outline: "#B38C3B", text: "1", sparkles: true }, // 골드 (1등)
    2: { main: "#C0BBD0", outline: "#9D98B0", text: "2", sparkles: false }, // 실버 (2등)
    3: { main: "#C78B68", outline: "#9E6748", text: "3", sparkles: false }, // 브론즈 (3등)
  };

  const { main, outline, text, sparkles } = config[rank];

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`inline-block drop-shadow-sm ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 👑 왕관 메인 바디 (사진의 둥근 굴곡 완벽 구현) */}
      <path
        d="M 16 80 L 84 80 L 93 38 Q 80 50 68 50 L 50 18 L 32 50 Q 20 50 7 38 Z"
        fill={main}
        stroke={main}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* 👑 왕관 꼭대기 동그라미 3개 */}
      <circle cx="7" cy="38" r="5.5" fill={main} />
      <circle cx="50" cy="18" r="6.5" fill={main} />
      <circle cx="93" cy="38" r="5.5" fill={main} />

      {/* 👑 왕관 하단 받침대 */}
      <rect x="16" y="86" width="68" height="6" rx="2" fill={main} />

      {/* 🔢 중앙 숫자 (흰색 폰트 + 진한 테두리) */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="44"
        fill="white"
        stroke={outline}
        strokeWidth="5"
        paintOrder="stroke fill" /* 테두리가 글자를 파먹지 않도록 밖으로 렌더링 */
      >
        {text}
      </text>

      {/* ✨ 1등 전용 반짝이 (Sparkles) */}
      {sparkles && (
        <>
          {/* 좌측 반짝이 */}
          <path d="M 22 10 Q 22 16 28 16 Q 22 16 22 22 Q 22 16 16 16 Q 22 16 22 10 Z" fill={main} />
          {/* 우측 상단 반짝이 */}
          <path d="M 75 5 Q 75 11 81 11 Q 75 11 75 17 Q 75 11 69 11 Q 75 11 75 5 Z" fill={main} />
          {/* 우측 하단 작은 반짝이 */}
          <path d="M 88 18 Q 88 22 92 22 Q 88 22 88 26 Q 88 22 84 22 Q 88 22 88 18 Z" fill={main} />
        </>
      )}
    </svg>
  );
}