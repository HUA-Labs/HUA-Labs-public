# fix(example): add missing closing bracket in Promise type

## 문제

release.yml 워크플로우가 빌드 단계에서 실패:
```
Parsing ecmascript source code failed
): Promise<Record<string, Record<string, Record<string, string>>> {
```

반환 타입에서 닫힘 괄호(`>`)가 하나 누락되어 구문 오류 발생.

## 해결

```diff
-): Promise<Record<string, Record<string, Record<string, string>>> {
+): Promise<Record<string, Record<string, Record<string, string>>>> {
```

이제 빌드가 성공하여 changesets 액션이 정상적으로 실행되고 "Version Packages" PR이 생성됩니다.
