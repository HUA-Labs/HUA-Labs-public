/**
 * Korean Translations
 * 한국어 번역
 */

export const ko = {
  // 앱 기본
  app: {
    name: "Hue",
    tagline: "HUA Labs의 비주얼 UI 에디터",
  },

  // 툴바
  toolbar: {
    undo: "실행 취소",
    redo: "다시 실행",
    save: "저장",
    load: "불러오기",
    export: "내보내기",
    import: "가져오기",
    preview: "미리보기",
    edit: "편집",
    settings: "설정",
    newProject: "새 프로젝트",
    projectName: "프로젝트 이름",
  },

  // 패널
  panels: {
    components: "컴포넌트",
    properties: "속성",
    layers: "레이어",
    context: "컨텍스트",
    schema: "스키마",
  },

  // 컴포넌트 카테고리
  categories: {
    layout: "레이아웃",
    typography: "타이포그래피",
    form: "폼",
    display: "디스플레이",
    feedback: "피드백",
    advanced: "고급",
  },

  // 속성 패널
  properties: {
    noSelection: "선택된 컴포넌트가 없습니다",
    selectToEdit: "편집할 컴포넌트를 선택하세요",
    node: "노드",
    styles: "스타일",
    layout: "레이아웃",
    content: "콘텐츠",
    conditions: "조건",
    actions: "액션",
    addCondition: "조건 추가",
    removeCondition: "조건 삭제",
    conditionField: "필드",
    conditionOperator: "연산자",
    conditionValue: "값",
  },

  // 조건 연산자
  operators: {
    eq: "같음",
    neq: "같지 않음",
    gt: "보다 큼",
    gte: "이상",
    lt: "보다 작음",
    lte: "이하",
    contains: "포함",
    notContains: "포함하지 않음",
    exists: "존재함",
    notExists: "존재하지 않음",
  },

  // 캔버스
  canvas: {
    dropHere: "여기에 드롭",
    emptyCanvas: "컴포넌트를 드래그하여 시작하세요",
    mobile: "모바일",
    tablet: "태블릿",
    desktop: "데스크톱",
  },

  // 컨텍스트 패널
  context: {
    title: "컨텍스트",
    presets: "프리셋",
    guest: "게스트",
    member: "멤버",
    admin: "관리자",
    custom: "커스텀",
    addValue: "값 추가",
    key: "키",
    value: "값",
  },

  // 내보내기
  export: {
    title: "내보내기",
    json: "JSON 스키마",
    react: "React 코드",
    copied: "클립보드에 복사됨",
    download: "다운로드",
    copyToClipboard: "클립보드에 복사",
  },

  // 설정
  settings: {
    title: "설정",
    language: "언어",
    theme: "테마",
    themeLight: "라이트",
    themeDark: "다크",
    themeSystem: "시스템",
    autoSave: "자동 저장",
    autoSaveInterval: "자동 저장 간격",
    gridSnap: "그리드 스냅",
    showGrid: "그리드 표시",
    close: "닫기",
  },

  // 공통
  common: {
    save: "저장",
    cancel: "취소",
    delete: "삭제",
    duplicate: "복제",
    copy: "복사",
    paste: "붙여넣기",
    cut: "잘라내기",
    undo: "실행 취소",
    redo: "다시 실행",
    search: "검색",
    searchPlaceholder: "검색...",
    noResults: "결과 없음",
    loading: "로딩 중...",
    error: "오류",
    success: "성공",
    warning: "경고",
    info: "정보",
    confirm: "확인",
    yes: "예",
    no: "아니오",
    ok: "확인",
    close: "닫기",
    open: "열기",
    add: "추가",
    remove: "제거",
    edit: "편집",
    view: "보기",
    reset: "초기화",
    clear: "지우기",
    selectAll: "전체 선택",
    deselectAll: "전체 해제",
    expandAll: "모두 펼치기",
    collapseAll: "모두 접기",
  },

  // 단축키
  shortcuts: {
    title: "단축키",
    undo: "실행 취소",
    redo: "다시 실행",
    copy: "복사",
    paste: "붙여넣기",
    duplicate: "복제",
    delete: "삭제",
    preview: "미리보기",
    edit: "편집 모드",
    toggleLeftPanel: "왼쪽 패널 토글",
    toggleRightPanel: "오른쪽 패널 토글",
    toggleContextPanel: "컨텍스트 패널 토글",
  },

  // 프로젝트
  project: {
    new: "새 프로젝트",
    open: "프로젝트 열기",
    save: "프로젝트 저장",
    saveAs: "다른 이름으로 저장",
    recent: "최근 프로젝트",
    noRecent: "최근 프로젝트가 없습니다",
    untitled: "제목 없음",
    modified: "수정됨",
    saved: "저장됨",
  },

  // 에러 메시지
  errors: {
    loadFailed: "불러오기 실패",
    saveFailed: "저장 실패",
    exportFailed: "내보내기 실패",
    importFailed: "가져오기 실패",
    invalidJson: "유효하지 않은 JSON",
    unknownError: "알 수 없는 오류",
  },

  // 토스트 메시지
  toast: {
    saved: "저장되었습니다",
    copied: "복사되었습니다",
    deleted: "삭제되었습니다",
    undone: "실행 취소됨",
    redone: "다시 실행됨",
    exported: "내보내기 완료",
    imported: "가져오기 완료",
  },
};

// 타입 추론용 (구조만 체크)
export type TranslationKeys = typeof ko;
