## Folder Architecture
 ### axios
```
├─public
└─src
    ├─api               # API 관련 파일
    ├─assets            # 이미지, 폰트 등 정적 파일
    ├─components        # UI 컴포넌트
    ├─config            # 설정 파일 (config.json 등)
    ├─constants         # 상수 파일
    │   └─token         # 토큰 관련 상수
    │      └─token.constants.ts
    ├─hooks             # 커스텀 훅
    ├─libs              # 라이브러리 및 헬퍼 함수
    │   └─axios         # Axios 관련 설정
    │      ├─customAxios.ts            # Axios 인스턴스 설정
    │      ├─requestInterceptor.ts     # 요청 인터셉터
    │      └─responseInterceptor.ts    # 응답 인터셉터
    │   └─token         # 토큰 관련 설정
    │      └─token.ts
    ├─pages             # 페이지 컴포넌트
    ├─queries           # React Query 관련 파일
    ├─styles            # CSS/SCSS 스타일 파일
    ├─types             # 타입 정의 파일
    └─utils             # 유틸리티 함수
├─vite.config.ts
```

 ### default Typescript
```
├─public
└─src
    ├─api               # API 관련 파일
    ├─assets            # 이미지, 폰트 등 정적 파일
    ├─components        # UI 컴포넌트
    ├─config            # 설정 파일 (config.json 등)
    ├─constants         # 상수 파일
    ├─hooks             # 커스텀 훅
    ├─libs              # 라이브러리 및 헬퍼 함수
    ├─pages             # 페이지 컴포넌트
    ├─queries           # React Query 관련 파일
    ├─styles            # CSS/SCSS 스타일 파일
    ├─types             # 타입 정의 파일
    └─utils             # 유틸리티 함수
├─vite.config.ts
```

 ### default Javascript
```
├─public
└─src
    ├─api               # API 관련 파일
    ├─assets            # 이미지, 폰트 등 정적 파일
    ├─components        # UI 컴포넌트
    ├─config            # 설정 파일 (config.json 등)
    ├─constants         # 상수 파일
    ├─hooks             # 커스텀 훅
    ├─libs              # 라이브러리 및 헬퍼 함수
    ├─pages             # 페이지 컴포넌트
    ├─queries           # React Query 관련 파일
    ├─styles            # CSS/SCSS 스타일 파일
    └─utils             # 유틸리티 함수
├─vite.config.js
```
