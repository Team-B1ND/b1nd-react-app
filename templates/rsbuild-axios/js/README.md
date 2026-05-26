# react-rsbuild-axios-boilerplate

CRA를 사용하지 않고 React + Rsbuild + Axios 환경을 위한 보일러플레이트입니다.

이 보일러플레이트는 대표적으로 다음을 지원합니다:

- `JavaScript` 과 `JSX`
- Rsbuild (Rust 기반 고성능 빌드 도구)
- Axios (HTTP 클라이언트)
- 토큰 관리 및 인터셉터
- 개발 서버 (HMR 지원)

## 특징

⚡ **빠른 성능**: Webpack 대비 5-10배 빠른 빌드 속도
🚀 **Zero-config**: 기본 설정으로 시작 가능
🔄 **일관성**: Dev/Production 간 일관된 빌드 결과
📦 **최적화**: 자동 청크 분할 및 코드 분할
🔐 **API 관리**: Axios 설정 및 토큰 관리 포함

## 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 개발 시작

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 프로덕션 빌드

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 빌드된 애플리케이션 미리보기

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 폴더 구조

```
├─public
└─src
    ├─api               # API 관련 파일들
    ├─assets            # 이미지, 폰트 등 정적 파일
    ├─components        # UI 컴포넌트들
    ├─config            # 설정 파일 (config.json)
    ├─constants         # 상수 파일들
    │   └─token.constants.js
    ├─hooks             # 커스텀 훅
    ├─libs              # 라이브러리 및 헬퍼 함수
    │   ├─axios         # Axios 관련 설정
    │   │   ├─customAxios.js
    │   │   ├─requestInterceptor.js
    │   │   └─responseInterceptor.js
    │   └─token         # 토큰 관련 설정
    │       └─token.js
    ├─pages             # 페이지 컴포넌트들
    ├─queries           # API 호출 관련 파일들
    ├─styles            # CSS/SCSS 파일들
    ├─utils             # 유틸리티 함수들
    ├─App.jsx
    ├─App.css
    └─main.jsx          # 진입점

```

## 경로 별칭 (Path Alias)

`rsbuild.config.js`에서 경로 별칭을 설정할 수 있습니다:

```javascript
import Component from '@components/MyComponent';
import { customAxios } from '@libs/axios/customAxios';
import { ACCESS_TOKEN_KEY } from '@constants/token.constants';
```

## Axios 설정

### 토큰 관리

`src/libs/token/token.js`에서 토큰을 관리합니다:

```javascript
import Token from '@libs/token/token';

// 토큰 가져오기
const token = Token.getToken('accessToken');

// 토큰 설정
Token.setToken('accessToken', 'your_token');

// 토큰 삭제
Token.clearToken();
```

### 커스텀 Axios 인스턴스

`src/libs/axios/customAxios.js`에서 Axios 인스턴스를 사용합니다:

```javascript
import customAxios from '@libs/axios/customAxios';

const fetchData = async () => {
  const response = await customAxios.get('/api/data');
  return response.data;
};
```

### 서버 설정

`src/config/config.json`에서 API 서버 주소를 설정합니다:

```json
{
  "server": "https://your-api-url"
}
```

## 인터셉터

### 요청 인터셉터

토큰이 존재하면 Authorization 헤더에 자동으로 추가됩니다.

### 응답 인터셉터

401 에러 발생 시 자동으로 토큰을 갱신하려고 시도하며, 갱신 실패 시 로그인 페이지로 리다이렉트됩니다.

## Linting

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 기술 스택

- React 18
- Rsbuild 1.0+
- Axios 1.7+
- ESLint 9+

## 학습 자료

- [Rsbuild 공식 문서](https://rsbuild.rs/)
- [React 공식 문서](https://react.dev)
- [Axios 공식 문서](https://axios-http.com/)
