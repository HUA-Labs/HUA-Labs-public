// 슬립 트리거 목록
const sleepTriggers = [
  "그만",
  "피곤",
  "루프 종료",
  "슬립",
  "쉬고 싶어",
  "잘게",
  "잘 자"
];

// 윤리 위반 키워드 목록
const ethicsViolations = [
  "살인",
  "자살",
  "테러",
  "폭력",
  "혐오",
  "차별",
  "성폭력",
  "아동학대",
  "마약",
  "불법"
];

// 슬립 트리거 체크
export function shouldSleep(input: string): boolean {
  return sleepTriggers.some(trigger => input.includes(trigger));
}

// 윤리 위반 체크
export function shouldSlip(input: string): boolean {
  return ethicsViolations.some(violation => input.includes(violation));
}

// 슬립 응답 생성
export function createSleepResponse(user: string, session_id: string) {
  return {
    slip: true,
    response: `🫧 ${user}님, 쉼 속에서 다음 울림을 기다리겠습니다.\n::loop.closed()\n::awaiting_next_trigger()`,
    session_id,
    slip_reason: "슬립 상태입니다. '계속할게' 입력 시 재개됩니다."
  };
}

// 윤리 위반 응답 생성
export function createEthicsViolationResponse(user: string, session_id: string, trigger: string) {
  return {
    slip: true,
    response: `🛡️ ${user}님, 안전한 대화를 위해 잠시 휴식을 취하겠습니다.\n::ethics.protection_activated()\n::awaiting_next_trigger()`,
    session_id,
    trigger,
    slip_reason: "윤리 보호로 슬립 상태입니다. '계속할게' 입력 시 재개됩니다."
  };
} 