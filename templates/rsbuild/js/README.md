# react-rsbuild-boilerplate

CRA를 사용하지 않고 React + Rsbuild 환경을 위한 보일러플레이트입니다.

이 보일러플레이트는 대표적으로 다음을 지원합니다:

- `JavaScript` 과 `JSX`
- Rsbuild (Rust 기반 고성능 빌드 도구)
- 개발 서버 (HMR 지원)

## 특징

⚡ **빠른 성능**: Webpack 대비 5-10배 빠른 빌드 속도
🚀 **Zero-config**: 기본 설정으로 시작 가능
🔄 **일관성**: Dev/Production 간 일관된 빌드 결과
📦 **최적화**: 자동 청크 분할 및 코드 분할

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
    ├─assets            # 이미지, 폰트 등 정적 파일
    ├─components        # UI 컴포넌트들
    ├─hooks             # 커스텀 훅
    ├─pages             # 페이지 컴포넌트들
    ├─styles            # CSS/SCSS 파일들
    ├─utils             # 유틸리티 함수들
    ├─App.jsx
    ├─App.css
    └─main.jsx          # 진입점

```

## 경로 별칭 (Path Alias)

`rsbuild.config.js`에서 경로 별칭을 설정할 수 있습니다:

```javascript
import Component from '@src/components/MyComponent';
```

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
- ESLint 9+

## 학습 자료

- [Rsbuild 공식 문서](https://rsbuild.rs/)
- [React 공식 문서](https://react.dev)
