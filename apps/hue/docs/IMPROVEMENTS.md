# Hue 개선점 & 기술 부채

> 코드베이스 분석 후 발견한 개선 사항들

## Priority: High

### ~~1. Undo/Redo 단축키 미구현~~ ✅ 완료
`Ctrl+Z`, `Ctrl+Shift+Z`, `Ctrl+Y` 구현됨.

### ~~2. 노드 삭제 단축키 미구현~~ ✅ 완료
`Delete`, `Backspace` 키로 선택 노드 삭제 구현됨.

### 3. JSON 가져오기 에러 핸들링 부족
`importFromJson()`에서 잘못된 JSON 입력 시 사용자 피드백 없음.

**위치**: `store/project-store.ts`

```typescript
// 현재
importFromJson: (json: string) => {
  const parsed = JSON.parse(json); // 에러 시 크래시
}

// 개선
importFromJson: (json: string) => {
  try {
    const parsed = JSON.parse(json);
    // 스키마 검증 추가
  } catch (e) {
    // 토스트 에러 메시지
  }
}
```

### 4. 컴포넌트 팔레트 검색 기능 없음
컴포넌트가 많아지면 찾기 어려움. 검색/필터 필요.

**위치**: `components/panels/ComponentPalette.tsx`

---

## Priority: Medium

### 5. 다중 선택 미구현
`Selection.nodeIds` 타입은 있으나 실제 구현 없음.
`Shift+클릭`, `Ctrl+클릭`으로 다중 선택 필요.

**위치**: `store/editor-store.ts`, `components/editor/Canvas.tsx`

### 6. 노드 복사/붙여넣기 미구현
`Ctrl+C`, `Ctrl+V` 기능 없음. 현재는 컨텍스트 메뉴 "복제"만 가능.

### 7. 드래그 미리보기(Ghost) 개선
드래그 중 실제 컴포넌트 모양 대신 기본 브라우저 ghost 사용 중.
커스텀 드래그 이미지 필요.

### 8. 깊은 트리 성능 최적화
재귀 탐색 함수들(`findNodeById`, `updateNode` 등)이 깊은 트리에서 느려질 수 있음.
- 노드 ID → 경로 캐싱
- 가상화(virtualization) 고려

### 9. 히스토리 설명 부족
`HistoryEntry.description`이 대부분 비어있음.
"노드 추가", "속성 변경" 등 액션별 설명 자동 생성 필요.

### 10. 조건 에디터 필드 자동완성 개선
현재 하드코딩된 필드 목록. 실제 Context 스키마에서 동적 생성 필요.

**위치**: `components/panels/PropertiesPanel.tsx`의 `FIELD_SUGGESTIONS`

---

## Priority: Low

### 11. 반응형 프리뷰에 커스텀 사이즈 입력
현재 모바일/태블릿/데스크톱 3가지만. 임의 픽셀 값 입력 기능.

### 12. 줌 휠 제스처
`Ctrl+휠`로 캔버스 줌 인/아웃.

### 13. 컴포넌트 잠금(locked) 기능 활용
`EditorNode.locked` 필드 있으나 UI에서 사용 안 함.

### 14. 캔버스 그리드 스냅
드래그 시 그리드에 맞춰 정렬.

### 15. 테마 프리뷰
라이트/다크 모드 캔버스 내 프리뷰.

---

## 기술 부채

### T1. Tailwind v4 @theme 중복
각 앱마다 `globals.css`에 `@theme` 블록 복붙 필요.
`hua-ui` 패키지 레벨에서 해결 방안 필요.

### T2. 컴포넌트 메타데이터 하드코딩
`lib/component-metadata.ts`에 모든 컴포넌트 메타데이터 수동 작성.
`hua-ui` 패키지에서 자동 생성하거나 co-location 필요.

### T3. 타입 불일치
- `EditorNode`와 `SDUINode` 간 변환 함수 존재하나 타입 체크 느슨함
- `editorNodeToSDUI`, `sduiToEditorNode` 타입 강화 필요

### T4. 테스트 없음
유닛 테스트, E2E 테스트 전무.
최소한 `condition-evaluator.ts`, `schema-utils.ts`는 테스트 필요.

### T5. 에러 바운더리 없음
컴포넌트 렌더링 에러 시 전체 앱 크래시.
캔버스, 프리뷰에 에러 바운더리 추가 필요.

---

## 아키텍처 개선

### A1. 스토어 분리 재검토
`editor-store.ts`가 비대해짐. 관심사별 분리 고려:
- `schema-store.ts` - 노드 트리 관리
- `selection-store.ts` - 선택/호버 상태
- `viewport-store.ts` - 줌/팬

### A2. 이벤트 버스 도입
컴포넌트 간 통신이 prop drilling + store 혼용.
이벤트 버스 또는 Context 기반 통신 정리.

### A3. 플러그인 아키텍처
커스텀 컴포넌트, 커스텀 속성 에디터 등 확장성을 위한 플러그인 시스템.

---

## Quick Wins (빠르게 해결 가능)

1. [x] ~~Undo/Redo 단축키~~ → 완료 (Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y)
2. [x] ~~Delete 키로 노드 삭제~~ → 완료 (Delete, Backspace)
3. [ ] 컴포넌트 팔레트 검색 → 1시간
4. [ ] JSON 가져오기 에러 토스트 → 30분
5. [ ] 히스토리 설명 자동 생성 → 1시간

---

## 참고

- 현재 Phase 2 (Logic Engine) 완료
- Phase 3 (Event Actions) 시작 전 위 개선사항 중 High 우선 처리 권장
