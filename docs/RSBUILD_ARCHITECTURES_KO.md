# Rsbuild 아키텍처 가이드

이 가이드는 **Rsbuild**를 번들러로 사용하는 프로젝트의 구조와 아키텍처를 설명합니다.

## Rsbuild란?

**Rsbuild**는 **Rspack** 기반의 Rust 빌드 도구입니다. 다음 특징을 제공합니다:

- ⚡ **5-10배 빠른 빌드 속도** (Webpack 대비)
- 🚀 **Zero-config**: 기본값으로 바로 사용 가능
- 🔄 **일관성**: 개발/프로덕션 빌드 결과 동일
- 📦 **스마트 청킹**: 자동 코드 분할 및 최적화
- ✅ **Webpack 호환성**: Webpack 플러그인 지원

## 프로젝트 구조

```
my-app/
├── public/                 # 정적 자산
│   └── .gitkeep
├── src/
│   ├── api/               # API 엔드포인트 정의
│   ├── assets/            # 이미지, 아이콘, 폰트 등
│   ├── components/        # 재사용 가능한 React 컴포넌트
│   ├── config/            # 애플리케이션 설정
│   │   └── config.json
│   ├── constants/         # 상수 (토큰, API 키 등)
│   │   └── token.constants.ts
│   ├── hooks/             # 커스텀 React 훅
│   ├── libs/              # 라이브러리 및 유틸리티
│   │   ├── axios/         # Axios 설정
│   │   └── token/         # 토큰 관리
│   ├── pages/             # 페이지 컴포넌트
│   ├── queries/           # API 쿼리 (React Query 등)
│   ├── styles/            # 전역 스타일 및 CSS
│   ├── types/             # TypeScript 타입 정의
│   ├── utils/             # 유틸리티 함수
│   ├── App.tsx            # 루트 컴포넌트
│   ├── App.css            # 루트 스타일
│   └── main.tsx           # 애플리케이션 진입점
├── index.html             # HTML 템플릿
├── rsbuild.config.ts      # Rsbuild 설정
├── tsconfig.json          # TypeScript 루트 설정
├── tsconfig.app.json      # TypeScript 앱 설정
├── eslint.config.js       # ESLint 설정
├── package.json           # 의존성 및 스크립트
└── README.md              # 프로젝트 문서
```

## 파일 명명 규칙

| 타입 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `UserProfile.tsx` |
| 파일 | camelCase | `userService.ts` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 훅 | `use` 접두사 + camelCase | `useAuth.ts` |
| 유틸 | camelCase | `formatDate.ts` |
| 타입 | PascalCase 또는 Generic | `User.ts`, `ApiResponse.ts` |

## 빌드 및 실행

### 개발 모드

```bash
npm run dev
```

`http://localhost:3000` (또는 다음 사용 가능한 포트)에서 HMR이 활성화된 개발 서버 시작.

### 프로덕션 빌드

```bash
npm run build
```

`build/` 디렉토리에 최적화된 프로덕션 빌드 생성.

### 프로덕션 빌드 미리보기

```bash
npm run preview
```

프로덕션 빌드를 로컬에서 미리보기.

### Linting

```bash
npm run lint
```

코드 품질 확인.

## Rsbuild 설정

`rsbuild.config.ts` 파일이 빌드 프로세스를 제어합니다:

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: { index: './src/main.tsx' },
    alias: { '@src': './src' },
  },
  output: {
    target: 'web',
    distPath: { root: 'build' },
  },
});
```

### 주요 설정 옵션

- **plugins**: Rsbuild 플러그인 (React 플러그인 사전 구성)
- **source.entry**: 애플리케이션 진입점
- **source.alias**: 깔끔한 임포트를 위한 경로 별칭
- **output.distPath**: 빌드 출력 디렉토리
- **performance.chunkSplit**: 코드 분할 전략

## 경로 별칭

깔끔한 임포트를 위한 사전 구성 경로 별칭:

```typescript
// 이렇게 하는 대신:
import Component from '../../../components/MyComponent';

// 이렇게 사용:
import Component from '@components/MyComponent';
```

**사용 가능한 별칭:**
- `@src` → `src/`
- `@components` → `src/components/`
- `@hooks` → `src/hooks/`
- `@utils` → `src/utils/`
- `@types` → `src/types/`
- `@assets` → `src/assets/`
- `@config` → `src/config/`
- `@constants` → `src/constants/`
- `@libs` → `src/libs/`
- `@pages` → `src/pages/`
- `@queries` → `src/queries/`
- `@api` → `src/api/`
- `@styles` → `src/styles/`

## 개발 워크플로우

### 1. 컴포넌트 생성

```typescript
// src/components/UserCard.tsx
import React from 'react';
import styles from './UserCard.module.css';

interface UserCardProps {
  name: string;
  email: string;
}

export const UserCard: React.FC<UserCardProps> = ({ name, email }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};
```

### 2. 커스텀 훅 사용

```typescript
// src/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { customAxios } from '@libs/axios/customAxios';

export const useUser = (userId: string) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customAxios.get(`/api/users/${userId}`).then(res => {
      setUser(res.data);
      setLoading(false);
    });
  }, [userId]);

  return { user, loading };
};
```

### 3. API 통합

```typescript
// src/api/userService.ts
import { customAxios } from '@libs/axios/customAxios';

export const fetchUsers = () => {
  return customAxios.get('/api/users');
};

export const fetchUser = (id: string) => {
  return customAxios.get(`/api/users/${id}`);
};

export const createUser = (userData: any) => {
  return customAxios.post('/api/users', userData);
};
```

### 4. 컴포넌트에서 사용

```typescript
// src/pages/UserList.tsx
import { useEffect, useState } from 'react';
import { fetchUsers } from '@api/userService';
import { UserCard } from '@components/UserCard';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
};
```

## 성능 최적화

### 코드 분할

Rsbuild는 자동으로 코드 분할을 처리합니다:

```typescript
// node_modules의 자동 청킹
import lodash from 'lodash'; // → vendor 청크

// 페이지 기반 자동 분할
import UserList from '@pages/UserList'; // → 별도 청크
```

### Lazy Loading 컴포넌트

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('@components/Heavy'));

export const App = () => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <HeavyComponent />
  </Suspense>
);
```

### 이미지 최적화

```typescript
// 자동 최적화
import logo from '@assets/logo.png';

export const Header = () => (
  <img src={logo} alt="Logo" />
);
```

## 의존성 관리

### 의존성 추가

```bash
npm install 패키지명
# 또는
yarn add 패키지명
# 또는
pnpm add 패키지명
```

### 핵심 의존성 (사전 설치)

- **react**: React 라이브러리
- **react-dom**: React DOM 렌더링
- **axios**: HTTP 클라이언트 (Axios 템플릿 선택 시)
- **typescript**: 타입 검사
- **eslint**: 코드 린팅

## 타입 검사

TypeScript는 strict 모드로 설정됩니다:

```bash
# 타입 검사 (컴파일 없음)
npx tsc --noEmit
```

`tsconfig.app.json`의 설정:
- `strict: true` - 엄격한 타입 검사
- `noUnusedLocals: true` - 미사용 변수 경고
- `noUnusedParameters: true` - 미사용 파라미터 경고

## 디버깅

### 브라우저 개발자 도구에서

1. 개발자 도구 열기 (F12)
2. Sources 탭으로 이동
3. webpack:// > ./ > src/ 로 이동
4. 중단점 설정 및 디버깅

### ESLint (코드 품질 검사)

```bash
npm run lint
```

자동 수정 가능한 문제 해결:

```bash
npm run lint -- --fix
```

### Prettier (코드 포맷팅)

```bash
npm run format
```

Prettier 설정은 `.prettierrc`에 정의됩니다:
- 프린트 너비: 100자
- 탭 너비: 2칸
- 후행 쉼표: ES5 스타일
- 싱글 쿼트: 활성화
- 화살표 함수: 가능하면 괄호 생략

ESLint와 Prettier는 함께 작동하여 코드 품질과 일관된 스타일을 유지합니다.

## 일반적인 작업

### 전역 스타일 추가

```typescript
// src/styles/global.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}
```

```typescript
// src/main.tsx
import '@styles/global.css';
```

### 환경 변수

`.env` 파일 생성:

```
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

코드에서 액세스:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 성능 비교

| 지표 | Rsbuild | Webpack | Vite |
|------|---------|---------|------|
| Cold Start | ~30초 | ~85초 | ~1초 |
| HMR | 3-4초 | 9-10초 | <1초 |
| 빌드 | 5-10배 빠름 | 기준 | 빠름 |
| Dev/Prod 일관성 | ✅ 동일 | ⚠️ 다름 | ⚠️ 다름 |

## 다른 번들러에서 마이그레이션

### Webpack에서

- Webpack 설정이 더 이상 필요하지 않음 (Rsbuild는 zero-config)
- 경로 별칭은 `tsconfig.json`에서 자동 감지
- 대부분의 Webpack 플러그인은 `@rsbuild/core`를 통해 작동

### Vite에서

- 동일한 개발 서버 경험이지만 프로덕션에 최적화됨
- 기본 제공 React Fast Refresh (Vite와 동일)
- 더 나은 빌드 최적화 및 청킹 전략

## 문제 해결

### 일반적인 문제

**문제**: 포트 3000이 이미 사용 중
```bash
# 다른 포트 사용
npm run dev -- --port 3001
```

**문제**: 타입이 인식되지 않음
```bash
# 타입 정의 재구성
npm run build
```

**문제**: 변경사항이 반영되지 않음
```bash
# Rsbuild 캐시 삭제
rm -rf dist && npm run dev
```

## 리소스

- 📚 [공식 Rsbuild 문서](https://rsbuild.rs/)
- 🔗 [Rspack 문서](https://rspack.dev/)
- 💬 [Rsbuild GitHub 토론](https://github.com/web-infra-dev/rsbuild/discussions)
- 🐛 [이슈 보고](https://github.com/web-infra-dev/rsbuild/issues)

## 모범 사례

1. **TypeScript 사용**: 엄격한 타입 검사 활용
2. **경로 별칭**: 임포트를 깔끔하고 읽기 쉽게 유지
3. **컴포넌트 구성**: UI를 작고 재사용 가능한 컴포넌트로 분해
4. **Lazy Loading**: 무거운 컴포넌트에 React.lazy() 사용
5. **Error Boundaries**: 컴포넌트를 래핑하여 에러 캡처
6. **메모이제이션**: 비용이 많이 드는 계산에 React.memo() 사용
7. **코드 분할**: Rsbuild가 자동 청킹을 처리하도록 함
