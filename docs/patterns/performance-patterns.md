# 성능 최적화 패턴

**작성일**: 2025-12-24  
**목적**: 성능 최적화 관련 반복되는 패턴과 해결 방법 정리

---

## 목차

1. [Client-Side Search 패턴 (Fuse.js)](#client-side-search-패턴-fusejs)
2. [Next.js 16 Caching 패턴 (unstable_cache)](#nextjs-16-caching-패턴-unstable_cache)
3. [Guest ID Soft Migration 패턴](#guest-id-soft-migration-패턴)
4. [Duplicate DB Query 최적화 패턴](#duplicate-db-query-최적화-패턴)

---

## Client-Side Search 패턴 (Fuse.js)

### 문제 상황

서버 사이드 검색은 복호화 작업으로 인해 부하가 크고, 비용이 발생

### 해결 방법

#### Fuse.js를 활용한 클라이언트 사이드 검색

```typescript
// ✅ Client-Side Search
import Fuse from 'fuse.js';
import { offlineStorage } from './offline-storage';

export async function searchDiariesClient(
  query: string,
  options: SearchOptions = {}
): Promise<SearchableDiary[]> {
  const diaries = await offlineStorage.getAllDiaries();
  
  const fuse = new Fuse(diaries, {
    keys: ['title', 'content'],
    threshold: 0.3,
  });
  
  const results = fuse.search(query.trim());
  return results.map(result => result.item);
}
```

### 핵심 포인트

1. **서버 부하 제로**: IndexedDB에서 직접 검색
2. **속도 향상**: 0.01초 이내 검색
3. **오프라인 지원**: 네트워크 없이도 검색 가능

### 관련 데브로그

- [DEVLOG_2025-12-14_UUIDV7_MIGRATION_AND_CRITICAL_FIXES.md](../devlogs/DEVLOG_2025-12-14_UUIDV7_MIGRATION_AND_CRITICAL_FIXES.md)

---

## Next.js 16 Caching 패턴 (unstable_cache)

### 문제 상황

Map 객체 기반 캐싱은 서버리스 환경에서 무한정 커질 수 있고, 재시작 시 증발

### 해결 방법

#### Next.js 16 unstable_cache 사용

```typescript
// ✅ Next.js 16 Caching
import { unstable_cache } from 'next/cache';

export const getCachedData = unstable_cache(
  async (key: string) => {
    // 데이터 조회 로직
    return await fetchData(key);
  },
  ['cache-key'],
  {
    revalidate: 3600, // 1시간
    tags: ['data'],
  }
);
```

### 핵심 포인트

1. **서버리스 친화적**: Vercel 환경에서 안정적
2. **태그 기반 무효화**: `revalidateTag`로 선택적 무효화
3. **메모리 안전**: 무한정 증가 방지

### 관련 데브로그

- [DEVLOG_2025-12-14_UUIDV7_MIGRATION_AND_CRITICAL_FIXES.md](../devlogs/DEVLOG_2025-12-14_UUIDV7_MIGRATION_AND_CRITICAL_FIXES.md)

---

## Guest ID Soft Migration 패턴

### 문제 상황

IP 기반 게스트 ID는 공용 와이파이에서 데이터 유출 위험

### 해결 방법

#### UUIDv7 기반 Soft Migration

```typescript
// ✅ Soft Migration 패턴
export function getGuestUserId(request: NextRequest): string {
  // 1순위: X-Guest-ID 헤더에서 UUID 가져오기
  const guestIdHeader = request.headers.get('X-Guest-ID');
  if (guestIdHeader && isValidUUID(guestIdHeader)) {
    const ipBasedId = generateGuestId(ip);
    
    if (ipBasedId !== guestIdHeader) {
      // IP 기반 데이터가 있으면 UUID로 마이그레이션
      migrateGuestDataIfExists(ipBasedId, guestIdHeader);
    }
    return guestIdHeader;
  }
  
  // 2순위: IP 기반 ID (Fallback)
  const ip = getClientIP(request);
  return generateGuestId(ip);
}
```

### 핵심 포인트

1. **Dual Check**: 기존 데이터 유지하면서 신규 로직 적용
2. **자동 마이그레이션**: IP 기반 데이터 발견 시 자동 전환
3. **하위 호환성**: 기존 데이터 손실 없음

### 관련 데브로그

- [DEVLOG_2025-12-14_UUIDV7_MIGRATION_AND_CRITICAL_FIXES.md](../devlogs/DEVLOG_2025-12-14_UUIDV7_MIGRATION_AND_CRITICAL_FIXES.md)

---

## Duplicate DB Query 최적화 패턴

### 문제 상황

같은 데이터를 여러 번 조회하는 중복 쿼리 발생

### 해결 방법

#### 데이터 캐싱 및 재사용

```typescript
// ✅ 중복 쿼리 제거
const user = await prisma.user.findUnique({ where: { id: userId } });

// 여러 곳에서 사용
const diary = await prisma.diaryEntry.findMany({
  where: { user_id: user.id },
});
const analysis = await prisma.analysisResult.findMany({
  where: { user_id: user.id },
});
```

### 핵심 포인트

1. **쿼리 통합**: 한 번의 쿼리로 필요한 데이터 조회
2. **캐싱 활용**: 자주 조회되는 데이터는 캐싱
3. **Include 활용**: Prisma의 `include`로 관계 데이터 한 번에 조회

### 관련 데브로그

- [DEVLOG_2025-12-23_AUTH_AUTHORIZATION_OPTIMIZATION.md](../devlogs/DEVLOG_2025-12-23_AUTH_AUTHORIZATION_OPTIMIZATION.md)

---

**작성자**: Auto (AI Assistant)  
**최종 업데이트**: 2025-12-24

