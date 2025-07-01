# react-typescript-bolierplate

CRA를 사용하지 않고 React + TypeScript 환경을 위한 bolierplate입니다.

이 bolierplate는 대표적으로 다음을 지원합니다.

- `JavaScript` 과 `TypeScript`
  (`jsx`, `tsx`, `js`, `ts`)

- `` 


# How to use
- 기본적으로 axios 설정이 되어 있습니다.
install

```
npm install
# or
yarn install 
# or 
pnpm install
```

start
```
npm run dev
# or
yarn run dev
# or 
pnpm run dev
```


# Folder Architecture
```
├─public
└─src
    ├─api               # API 관련 파일들
    ├─assets            # 이미지, 폰트 등 정적 파일
    ├─components        # UI 컴포넌트들
    ├─config            # 설정 파일 (config.json)
    ├─constants         # 상수 파일들
    │   └─token         # 토큰 관련 상수
    │      └─token.constants.ts
    ├─hooks             # 커스텀 훅
    ├─libs              # 라이브러리 및 헬퍼 함수
    │   └─axios         # Axios 관련 설정
    │      ├─customAxios.ts
    │      ├─requestInterceptor.ts
    │      └─responseInterceptor.ts
    │   └─token         # 토큰 관련 설정
    │      └─token.ts
    ├─pages             # 페이지 컴포넌트들
    ├─queries           # React Query 관련 파일들
    ├─styles            # CSS/SCSS 파일들
    ├─types             # 타입 정의
    └─utils             # 유틸리티 함수들

```