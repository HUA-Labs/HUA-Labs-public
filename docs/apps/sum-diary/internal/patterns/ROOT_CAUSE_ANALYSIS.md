# 근본 원인 분석 (Root Cause Analysis)

**작성일**: 2025-12-11  
**목적**: 22번의 실패한 시도를 분석하여 근본 원인 파악

---

## 📊 실패 패턴 분석

### 공통 실패 패턴

모든 시도(1-22)에서 동일한 패턴이 관찰됨:

1. **오류 메시지**: `No such file or directory (os error 2)`
2. **실행 시간**: 100-104ms (매우 짧음)
3. **디버깅 로그**: 전혀 출력되지 않음
4. **exitCode**: `null` (프로세스가 시작되지 않음)

### 성공한 케이스

- ✅ `vercel.json`의 `buildCommand`: `corepack pnpm exec turbo` → **작동**
- ❌ `package.json`의 스크립트: 모든 시도 실패

---

## 🔍 핵심 차이점

### 작동하는 경우
```json
// vercel.json
"buildCommand": "cd ../.. && corepack pnpm exec turbo run build --filter=sum-diary"
```
- **실행 컨텍스트**: 쉘에서 직접 실행
- **PATH**: 쉘의 PATH 환경 변수 사용
- **결과**: ✅ 성공

### 실패하는 경우
```json
// package.json
"build": "node scripts/build-tsc.js"
"build": "tsc"
"build": "pnpm exec tsc"
"build": "corepack pnpm exec node scripts/build-tsc.js"
"build": "bash scripts/build.sh"
```
- **실행 컨텍스트**: Turbo가 실행
- **PATH**: Turbo가 PATH를 상속받지 않음
- **결과**: ❌ 모두 실패

---

## 💡 근본 원인 가설

### 가설 1: Turbo의 PATH 상속 문제 (가장 가능성 높음)

**증거**:
- `vercel.json`의 `buildCommand`는 작동 (쉘에서 직접 실행)
- `package.json`의 스크립트는 모두 실패 (Turbo가 실행)
- 모든 명령어(`node`, `tsc`, `pnpm`, `bash` 등)가 PATH에서 찾지 못함

**결론**: Turbo가 `package.json` 스크립트를 실행할 때 PATH 환경 변수를 제대로 상속받지 않음

### 가설 2: Turbo의 실행 방식 문제

**증거**:
- 실행 시간이 100ms 이하 (매우 짧음)
- 디버깅 로그가 전혀 출력되지 않음
- `exitCode`가 `null` (프로세스가 시작되지 않음)

**결론**: Turbo가 쉘을 거치지 않고 직접 실행 파일을 찾으려고 시도하지만, PATH가 설정되지 않아 실패

---

## 🎯 해결 방향

### 방향 1: 쉘을 통해 실행 강제

Turbo가 쉘을 통해 실행하도록 강제:
```json
"build": "sh -c 'node scripts/build-direct.js'"
```

**장점**:
- 쉘을 통해 실행되므로 PATH가 설정될 수 있음
- Vercel Linux 환경에서 `sh`는 기본적으로 사용 가능

**단점**:
- Turbo가 `sh`를 PATH에서 찾지 못할 수 있음

### 방향 2: 절대 경로 사용

모든 실행 파일의 절대 경로를 사용:
```json
"build": "/usr/bin/node scripts/build-direct.js"
```

**장점**:
- PATH 문제를 완전히 우회

**단점**:
- Vercel 환경에서 Node.js 경로가 다를 수 있음
- 플랫폼별로 경로가 다름

### 방향 3: Node.js require.resolve 활용

Node.js의 모듈 해석을 활용:
```javascript
// scripts/build-direct.js
const tscPath = require.resolve('typescript/lib/tsc.js');
spawnSync(process.execPath, [tscPath], ...);
```

**장점**:
- `require.resolve`는 Node.js 모듈 해석을 사용하므로 PATH 문제 없음
- `process.execPath`는 현재 실행 중인 Node.js 경로이므로 항상 유효

**단점**:
- 스크립트가 실행되려면 `node`를 찾을 수 있어야 함

---

## 🔧 권장 해결 방법

### 시도 24: 다른 성공 패키지와 동일한 패턴 사용 ❌

**결과**: ❌ 실패
**오류**: `No such file or directory (os error 2)`
**이유**: 
- `hua-ui`는 `tsup`이 필요한 패키지인데 `tsc`만 실행함
- 성공 로그를 보면 `"command":"tsup && tsc --emitDeclarationOnly"`였음
- `tsc`만으로는 번들링이 안 됨

### 시도 25: 성공 로그와 동일한 패턴 사용 (현재 시도 중) ⚠️

**핵심 발견**: 성공 로그(`turborepo_summary_dpl_37rxpQ92d4HmA3f34Nba4DKRYrHN.json`)를 보면 `@hua-labs/ui#build`의 `command`가 `"tsup && tsc --emitDeclarationOnly"`였음!

**방법**:
```json
"build": "node ../../node_modules/tsx/dist/cli.mjs ../../node_modules/tsup/dist/cli-default.js && node ../../node_modules/typescript/lib/tsc.js --emitDeclarationOnly"
```

**이유**:
- 성공했을 때는 `tsup && tsc --emitDeclarationOnly`를 사용했음
- `hua-ui`는 `tsup`으로 번들링이 필요한 패키지 (여러 엔트리 포인트)
- `tsc`만으로는 번들링이 안 됨
- `tsx`를 사용하여 ESM 모듈인 `tsup` 실행
- 절대 경로 사용으로 PATH 문제 완전 우회

### 시도 23: `sh -c` + Node.js require.resolve ❌

**핵심 발견**: 다른 패키지들(`hua-utils`, `hua-i18n-sdk`, `hua-hooks` 등)은 모두 성공적으로 빌드됨!

**성공하는 패키지들의 빌드 스크립트**:
```json
"build": "node ../../node_modules/typescript/lib/tsc.js"
```

**차이점**:
- ✅ 성공 패키지: `node ../../node_modules/typescript/lib/tsc.js` (절대 경로)
- ❌ 실패 패키지: `sh -c 'node scripts/build-direct.js'` (스크립트 실행)

**이유**:
- `node`는 이미 실행 중이므로 PATH 문제 없음
- `../../node_modules/typescript/lib/tsc.js`는 절대 경로이므로 PATH 문제 없음
- 다른 성공 패키지들과 동일한 패턴 사용

### 시도 23: `sh -c` + Node.js require.resolve ❌

**방법**:
```json
"build": "sh -c 'node scripts/build-direct.js'"
```

```javascript
// scripts/build-direct.js
const tscPath = require.resolve('typescript/lib/tsc.js');
const { spawnSync } = require('child_process');
spawnSync(process.execPath, [tscPath], { stdio: 'inherit' });
```

**이유**:
1. `sh -c`를 사용하여 쉘을 통해 실행 → PATH 설정 가능
2. `require.resolve`로 `tsc.js` 절대 경로 확보 → PATH 문제 없음
3. `process.execPath`로 Node.js 경로 확보 → PATH 문제 없음

**예상 결과**:
- ✅ `sh`는 Vercel Linux 환경에서 기본 제공
- ✅ 쉘을 통해 실행되므로 PATH 설정 가능
- ✅ `require.resolve`와 `process.execPath`로 PATH 문제 완전 우회

---

## 📝 다음 단계

1. **시도 23 테스트**: Vercel에서 빌드 테스트
2. **실패 시**: Turbo의 PATH 상속 설정 확인
3. **대안**: Turbo 버전 업데이트 또는 다른 빌드 도구 고려

---

## 🔗 참고 자료

- [Turbo 공식 문서](https://turbo.build/repo/docs)
- [Vercel 빌드 환경](https://vercel.com/docs/build-step)
- [Node.js PATH 문제](https://nodejs.org/api/process.html#process_process_env)

