# DODAM_AUTH_TEMPLATE
# Overview
B1ND AUTH TEMPLATE은 인증 관련 기능을 빠르게 구현할 수 있는 템플릿입니다. 이 프로젝트는 React로 작성되었으며, 효율적인 API 통신을 위해 Axios와 인터셉터가 설정되어 있습니다. 프로젝트 구조는 확장 가능하며 다양한 환경에서 사용할 수 있습니다.

# HOW TO USE?

### START

`npx b1nd-react-app [projectname]`으로 시작하실 수 있습니다. 

1. `? Which bundler do you want to use?` - 번들러를 선택할수있습니다.
❯   Default (No bundler)
    Webpack (Recommended)
    Vite

2. `? Which language do you want to use?` - 원하는 언어를 선택할수 있습니다.
❯   TypeScript
    JavaScript

3. `? Which package manager would you like to use?` - 원하는 패키지 매니저를 선택할수 있습니다.
❯   npm
    yarn
    pnpm
    bun

4. `? Do you want to include Axios?` - axios 기본설정을 포함할지를 선택할수 있습니다.
❯   Yes
    No


### HOW TO INSTALL
![화면 기록 2025-03-25 오전 11 41 31](https://github.com/user-attachments/assets/ea5a7a11-705a-48d4-812b-c0d8b8df8ca8)




### USER EDITING POINT

1. `src/config/config.json`의 `server`속성을 자신의 API BASE_URL로 변경해주세요.
2. `src/libs/responseInterceptor.ts`의 32번쨰 줄 refresh end-point를 자신의 API end-point로 변경해주세요.
   또한 33번째 줄의 BODY값도 자신의 API BODY 값으로 변경해주세요.
3. `src/libs/requestInterceptor.ts`의 12번쨰 줄 login url을 자신의 login url로 변경해주세요.

# ETC
* 토큰을 사용하는 과정이 다르거나 필요없다면 폴더를 삭제 하시면 됩니다 

1. 토큰의 종류는 `accessToken`과 `refreshToken`으로 구분되며, 각각 Cookie에 `accessToken`, `refreshToken`으로 저장됩니다.
2. 토큰의 저장은 `token.setToken({TOKEN_CONSTANTS}, [value]);`로 하시면 됩니다. `ex) token.setToken(ACCESS_TOKEN_KEY, res.data.data.accessToken);`
2. REACT 프로젝트를 FLUX 아키텍처로 개발하기 위한 폴더 구조입니다. [FLUX구조란?](https://velog.io/@alskt0419/FLUX-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EB%9E%80)
3. 서버와의 통신은 `react-query`를 사용하시면 더욱 더 편리하게 사용 가능합니다.
4. 번들러는 `webpack`,`vite`를 사용할수있습니다.



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

   

## 프레임워크별 아키텍처
 # REACT
 React의 경우, 컴포넌트 기반 아키텍처를 사용하며 필요에 따라 훅, 컨텍스트 및 상태 관리가 적용됩니다. React의 일반적인 구조는 아래에서 확인할 수 있습니다.
[GOTO-ARCHITECTURES](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/REACT_ARCHITECTURES.md)

 # VITE
 Vite는 속도와 성능을 중점으로 한 빌드 도구입니다. 구조는 React와 유사하지만, 빠른 개발과 빌드를 최적화한 것입니다. Vite 프로젝트의 일반적인 구조는 아래에서 확인할 수 있습니다.
[GOTO-ARCHITECTURES](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/VITE_ARCHITECTURES.md)

# WEBPACK
 Webpack은 더 많은 설정이 필요하지만 매우 유연한 번들러입니다. 이 구조는 자산 처리, 코드 분할 및 최적화를 위한 설정을 포함합니다.
[GOTO-ARCHITECTURES](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/WEBPACK_ARCHITECTURES.md)



## 커뮤니티

B1ND AUTH TEMPLATE 커뮤니티는 [GitHub Discussions](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/discussions)에서 질문을 하거나 아이디어를 공유하고 다른 커뮤니티 구성원들과 프로젝트를 소개할 수 있습니다.

모든 B1ND AUTH TEMPLATE 커뮤니티 채널에는 코드 오브 콘덕트가 적용됩니다. 모두가 존중하고 생산적인 환경을 유지할 수 있도록 [Code of Conduct ](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/CODE_OF_CONDUCT_KO.md)를 읽고 따르시기를 권장합니다.

## 기여

B1ND AUTH TEMPLATE 프로젝트에 대한 기여는 환영하며 매우 감사하게 생각합니다. 그러나 기여를 시작하기 전에 [기여 가이드라인](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/contributing_ko.md)을 검토하시어 원활한 기여 경험을 보장해 주세요.

## 첫 기여하기 좋은 이슈
새로운 기여자에게 적합한 첫 기여하기 좋은 이슈들이 준비되어 있습니다. 이 이슈들은 범위가 제한적이어서 기여 경험을 쌓고, 기여 프로세스를 이해하며, 코드베이스에 익숙해지기에 좋은 시작점입니다. 첫 기여하기 [좋은 이슈 목록](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)을 확인하고 오늘부터 기여를 시작하세요! [이슈작성법](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/ISSUE_KO.md)


---

여러분의 기여를 기다립니다!

# 문서

- [테스트 문서](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/testing_ko.md)
