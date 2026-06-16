## 프로젝트 구조

app/
 └─ page.tsx            # 메인 페이지 (레이아웃 + 상태 관리)

components/
 ├─ ReprintCard.tsx     # 복각 / 뾱각 카드 컴포넌트
 └─ GachaCard.tsx       # 가챠 상세 카드 컴포넌트

public/
 ├─ gacha/              # 가챠 이미지 리소스
 └─ reprints/           # 복각/뾱각 이미지 리소스

# 분리 원칙

· page.tsx

 > 페이지 레이아웃
  > 상태 관리 (선택된 가챠 타입, 서버 지역 등)
   > 데이터 바인딩

· ReprintCard

 > 이미지 슬라이드
  > 기간 계산 (시작 12:00 / 종료 11:59)
   > 진행 중 / 마감 당일 / 종료 상태 표현

· GachaCard

 > 가챠 대표 이미지
  > hover 연출
   > 속성 뱃지 파싱 및 표시
    > 텍스트 정보 배치

파일 정리 규칙

banner_연도(22, 23, ...)_순서nn(연도마다 리셋)_유닛(l, m, v, w, n, 0)
l : 레오니
m : 모모점
v : 비배스
w : 원더쇼
n : 니고
0 : 버싱
유닛스까는 그냥 순서까지만 작성
페스는 f + 순서 > 얘는 컬페 / 블페 / ... 순으로 리셋

{
      // 🌟 [기본 정보]
      id: "ln_Ichika_000",             
      cardName: "[]",                  
      attribute: "pure",               
      gachaType: "통상",               
      gachaPoolName: "뽑기 이름",      
      eventName: "이벤트 이름",        
      skillType: "스업",               

      // 🖼️ [배너 및 악곡 이미지 경로] 
      gachaBannerPath: "", 
      eventBannerPath: "", 
      songName: "",                                
      songJacketPath: "",   

      // 👗 [의상 정보] (의상이 없는 경우 통째로 삭제)
      hasCostume: true,
      costumeName: "의상 이름 입력",

      // ✂️ [헤어 정보] (헤어가 없는 카드의 경우 줄 삭제)
      hasHair: true, 
    },