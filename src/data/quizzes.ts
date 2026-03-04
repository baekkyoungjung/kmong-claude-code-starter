import type { QuizQuestion, SpotProblemScenario, ContextItem } from "@/lib/types";

// Mission 1-1: Claude Code 동작 원리 퀴즈
export const mission11Quizzes: QuizQuestion[] = [
  {
    id: "q1-1-1",
    question: "Claude Code에서 LLM(대규모 언어 모델)의 역할은?",
    options: [
      { id: "a", text: "파일을 직접 수정한다" },
      { id: "b", text: "사용자의 요청을 이해하고 다음 행동을 판단한다" },
      { id: "c", text: "인터넷을 검색한다" },
      { id: "d", text: "코드를 컴파일한다" },
    ],
    correctId: "b",
    explanation:
      "LLM은 '두뇌' 역할을 합니다. 사용자의 요청을 이해하고 어떤 도구를 사용할지, 어떤 행동을 할지 판단합니다.",
  },
  {
    id: "q1-1-2",
    question: "Claude Code에서 '도구(Tools)'의 역할은?",
    options: [
      { id: "a", text: "사용자와 대화한다" },
      { id: "b", text: "요청을 분석한다" },
      { id: "c", text: "파일 읽기/쓰기, 명령 실행 등 실제 작업을 수행한다" },
      { id: "d", text: "결과를 예측한다" },
    ],
    correctId: "c",
    explanation:
      "도구는 '손' 역할을 합니다. LLM이 판단한 행동을 실제로 실행합니다 — 파일 읽기, 코드 수정, 터미널 명령 실행 등.",
  },
  {
    id: "q1-1-3",
    question: "Claude Code의 루프가 종료되는 조건은?",
    options: [
      { id: "a", text: "정해진 시간이 지나면" },
      { id: "b", text: "LLM이 더 이상 도구를 호출할 필요가 없다고 판단하면" },
      { id: "c", text: "5번 반복하면 자동 종료" },
      { id: "d", text: "사용자가 취소 버튼을 누르면" },
    ],
    correctId: "b",
    explanation:
      "루프는 LLM이 '작업이 완료됐다'고 판단하면 종료됩니다. 도구 호출 없이 텍스트 응답만 하면 루프가 끝납니다.",
  },
];

// Mission 1-2: 프롬프트 품질 비교
export const promptExamples = [
  {
    level: 1,
    stars: 1,
    label: "모호한 요청",
    prompt: "웹사이트 만들어줘",
    result:
      "기본 HTML 템플릿이 생성되었습니다.\n\n- index.html (Hello World 텍스트만 있는 빈 페이지)\n- 스타일 없음\n- 반응형 미적용\n- 콘텐츠 없음",
  },
  {
    level: 2,
    stars: 2,
    label: "보통 요청",
    prompt: "베이커리 랜딩페이지 만들어, 히어로 섹션이랑 연락처 포함해줘",
    result:
      "베이커리 랜딩페이지가 생성되었습니다.\n\n- 히어로 섹션 (기본 배경색)\n- 연락처 섹션 (이메일, 전화번호)\n- 기본적인 반응형 대응\n- 그러나 브랜드 느낌 부족, 디테일 미흡",
  },
  {
    level: 3,
    stars: 3,
    label: "상세한 요청",
    prompt:
      "Sweet Moments Bakery 반응형 랜딩: 히어로(크루아상 사진 배경), About 섹션, 메뉴 그리드 6개 아이템, 문의 폼. 크림/브라운/골드 컬러 톤. 모바일 우선 디자인. 폰트는 Playfair Display.",
    result:
      "Sweet Moments Bakery 프리미엄 랜딩페이지가 생성되었습니다.\n\n- 풀스크린 히어로 (크루아상 배경 + 오버레이)\n- 감성적인 About 섹션 (브랜드 스토리)\n- 6개 메뉴 카드 그리드 (호버 효과)\n- 폼 유효성 검사가 포함된 문의 양식\n- 크림/브라운/골드 컬러 팔레트\n- 완벽한 모바일 반응형\n- Playfair Display + 세리프 폰트 조합",
  },
];

// Mission 3-1: 컨텍스트 항목
export const contextItems: ContextItem[] = [
  { id: "design", label: "디자인 목업", percentage: 15 },
  { id: "brand", label: "브랜드 가이드라인", percentage: 10 },
  { id: "target", label: "타겟 유저", percentage: 10 },
  { id: "tech", label: "기술 요구사항", percentage: 15 },
  { id: "code", label: "기존 코드 패턴", percentage: 10 },
  { id: "edge", label: "엣지 케이스", percentage: 10 },
  { id: "example", label: "원하는 결과 예시", percentage: 15 },
  { id: "constraints", label: "제약사항", percentage: 15 },
];

// Mission 3-1: Claude에게 질문시키기 시뮬레이션
export const claudeQuestions = [
  "이 프로젝트의 타겟 사용자는 누구인가요? (연령대, 기술 수준 등)",
  "기존에 사용 중인 디자인 시스템이나 컴포넌트 라이브러리가 있나요?",
  "모바일과 데스크톱 중 어떤 환경을 우선적으로 지원해야 하나요?",
  "비슷한 레퍼런스나 벤치마크하고 싶은 서비스가 있나요?",
  "이 기능의 성공 기준(KPI)은 무엇인가요?",
];

// Mission 3-2: 문제 찾기 시나리오
export const spotProblemScenarios: SpotProblemScenario[] = [
  {
    id: "sp1",
    prompt: '"폼 만들어줘"',
    badResult:
      "못생긴 기본 HTML 폼이 생성됨. 이름과 이메일 필드만 있고, 스타일이 전혀 없으며, 유효성 검사도 없음.",
    options: [
      { id: "a", text: "AI가 고장났다" },
      {
        id: "b",
        text: "내가 디자인 참고, 필드 명세, 유효성 규칙을 안 줬다",
      },
      { id: "c", text: "AI는 폼을 못 만든다" },
    ],
    correctId: "b",
    missingContext:
      "디자인 참고 이미지, 필요한 필드 목록, 각 필드의 유효성 규칙, 에러 메시지 형식을 제공했어야 합니다.",
  },
  {
    id: "sp2",
    prompt: '"랜딩 카피 써줘"',
    badResult:
      '"혁신적인 솔루션으로 비즈니스를 성장시키세요!" 같은 뻔한 마케팅 문구만 나옴.',
    options: [
      { id: "a", text: "AI가 고장났다" },
      {
        id: "b",
        text: "내가 브랜드 보이스, 타겟 고객, 차별점을 안 줬다",
      },
      { id: "c", text: "AI는 마케팅 카피를 못 쓴다" },
    ],
    correctId: "b",
    missingContext:
      "브랜드 톤앤매너, 타겟 고객 페르소나, 경쟁사 대비 차별점, 핵심 가치 제안을 제공했어야 합니다.",
  },
  {
    id: "sp3",
    prompt: '"체크아웃 플로우 만들어"',
    badResult:
      "단순한 장바구니 → 결제 2단계만 구현됨. 배송지 입력, 쿠폰, 에러 처리 없음.",
    options: [
      { id: "a", text: "AI가 고장났다" },
      {
        id: "b",
        text: "내가 결제 수단, 엣지케이스, 에러 상태를 안 줬다",
      },
      { id: "c", text: "AI는 복잡한 플로우를 못 만든다" },
    ],
    correctId: "b",
    missingContext:
      "지원 결제 수단, 배송/쿠폰/포인트 흐름, 재고 부족/결제 실패 등 에러 시나리오, 단계별 필수 필드를 제공했어야 합니다.",
  },
  {
    id: "sp4",
    prompt: '"이 버그 고쳐"',
    badResult:
      "관련 없는 코드를 수정하거나, 증상만 숨기는 임시 처리를 함.",
    options: [
      { id: "a", text: "AI가 고장났다" },
      {
        id: "b",
        text: "내가 재현 단계, 기대 동작, 관련 코드를 안 줬다",
      },
      { id: "c", text: "AI는 디버깅을 못 한다" },
    ],
    correctId: "b",
    missingContext:
      "버그 재현 단계, 현재 동작 vs 기대 동작, 관련 파일/함수, 에러 로그를 제공했어야 합니다.",
  },
];
