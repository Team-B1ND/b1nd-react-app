# 테스트 방법 (로컬 패키지로 실행)

아래 절차를 통해 로컬에서 `b1nd-react-app`을 패키징하고, `test` 디렉터리에서 실제로 실행해볼 수 있습니다.

## 사전 준비
- Node.js 18.18.0 이상
- pnpm 설치됨
- 프로젝트 루트가 `b1nd-react-app` (이 저장소)임을 확인

## 1) 빌드 및 패키징
루트에서 빌드 후 패키지를 생성합니다.

```bash
pnpm build && pnpm pack
```

명령이 완료되면 루트에 `b1nd-react-app-<버전>.tgz` 파일이 생성됩니다. 예: `b1nd-react-app-1.3.0.tgz`

## 2) 테스트 워크스페이스 준비
`test` 디렉터리로 이동해 초기화 후, 방금 생성된 tgz를 설치합니다.

```bash
cd test
pnpm init -y
pnpm add ../b1nd-react-app-1.3.0.tgz  # 버전에 맞게 파일명 조정
```

이미 `test/package.json`에 의존성이 지정돼 있다면, 다음처럼 설치만 해도 됩니다.

```bash
pnpm install
```

## 3) CLI 실행해서 프로젝트 생성
아래처럼 실행합니다. `myapp`은 원하는 앱 이름으로 변경하세요.

```bash
npx b1nd-react-app myapp
```

프롬프트에서 번들러/언어/패키지 매니저를 선택하면 템플릿 파일이 복사되고 의존성 설치가 진행됩니다.

## 4) 생성 이후(의존성 설치가 끝난 뒤)
생성된 디렉터리로 이동해 개발 서버를 실행합니다. 예시(선택한 패키지 매니저에 맞추어 실행):

```bash
cd myapp
npm install        # 혹은 yarn / pnpm / bun
npm run dev        # 혹은 yarn dev / pnpm dev / bun dev
```

## 문제 해결(Troubleshooting)
- 디스크 용량 부족 오류(ENOSPC):
  - 메시지 예: `ENOSPC: no space left on device`
  - 조치: 불필요한 파일을 정리해 디스크 용량을 확보한 다음, 생성된 `myapp` 디렉터리에서 다시 의존성 설치를 실행하세요.
  - 참고: 템플릿 복사 단계가 끝난 뒤 설치에서 실패했다면, `myapp` 폴더는 이미 생성돼 있을 가능성이 큽니다. 용량 확보 후 `cd myapp && <패키지 매니저> install`을 다시 실행하세요.

- tgz 파일명 불일치:
  - `pnpm pack` 결과물의 파일명은 패키지 버전에 따라 달라집니다. 실제 생성된 파일명을 확인해 `pnpm add ../b1nd-react-app-<버전>.tgz`에서 정확히 지정하세요.

- Node 버전 문제:
  - 이 패키지는 Node.js 18.18.0 이상을 요구합니다. `node -v`로 확인하고 필요 시 업데이트하세요.
