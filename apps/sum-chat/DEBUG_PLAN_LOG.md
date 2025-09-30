# 디버깅/플랜 체크 로그

이 파일은 개발팀(리듬이 & 사용자)이 디버깅 포인트, 개선 요청, 해결 체크, 진행 상황 등을 서면으로 기록/공유하는 용도입니다.

- `[ ]` 미해결, `[x]` 해결
- 날짜/시간, 담당자, 상세 내용, 관련 커밋 등 기록

---

## [YYYY-MM-DD HH:MM] by 사용자

- [ ] 예시: 세션 진입 시 currentSession null 문제 (시크릿창 분기 포함)
- [ ] 예시: tone/mode/tier 기본값 일관성 점검
- [ ] 예시: ChatUI에서 GPT 응답 누락 안내 메시지 UX 개선

## [YYYY-MM-DD HH:MM] by 리듬이

- [x] 예시: 세션 진입 분기 userId로 통일, currentSession 정상화 (commit: abc123)
- [x] 예시: tone/mode/tier 기본값 companion/listener/1.0으로 통일
- [x] 예시: ChatUI 안내 메시지 추가, UX 개선 완료

---

> 자유롭게 디버깅 포인트/플랜/해결 내역을 추가/체크하세요!
