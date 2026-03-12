<div align="center">

# 🛡️ FlashSeal

**Cloudflare Pages와 KV 기반의 암호화 열람 후 자동 소각 텍스트·이미지 공유 도구**

[English](./README.md) | [简体中文](./README_ZH.md) | [日本語](./README_JA.md) | 한국어

[![GitHub license](https://img.shields.io/github/license/afetmin/FlashSeal?style=flat-square)](https://github.com/afetmin/FlashSeal/blob/master/LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)
[![Cloudflare KV](https://img.shields.io/badge/Cloudflare-KV-F38020?style=flat-square&logo=cloudflare)](https://developers.cloudflare.com/kv/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[라이브 데모](https://flashseal.space/) | [소스 코드](https://github.com/afetmin/FlashSeal) | [배포 가이드](https://github.com/afetmin/FlashSeal#cloudflare-pages-배포) | [이슈 제보](https://github.com/afetmin/FlashSeal/issues) | [라이선스](https://github.com/afetmin/FlashSeal/blob/master/LICENSE)

</div>

---

FlashSeal은 Cloudflare Pages, Pages Functions, KV를 기반으로 한 암호화 열람 후 자동 소각 텍스트·이미지 공유 도구입니다.
페이지는 무거운 런타임 프레임워크에 의존하지 않습니다.

## 미리보기

![FlashSeal 미리보기](./images/preview.png)

## 기능

- `🛡️ 종단간 암호화` 콘텐츠는 브라우저에서 암호화된 뒤 업로드되며, 서버에는 암호문만 저장됩니다.
- `🔥 열람 후 자동 소각` 시크릿은 처음으로 정상 열람한 1명만 볼 수 있어, 공유가 일회성으로 유지됩니다.
- `📝 텍스트와 이미지 지원` 텍스트와 이미지를 같은 흐름으로 공유할 수 있으며, 이미지는 `15MB`까지 업로드할 수 있습니다.
- `📋 붙여넣기 업로드` 클립보드에 복사한 이미지를 바로 붙여넣어 업로드할 수 있습니다.
- `🔗 링크 프래그먼트에 키 보관` 공유 링크는 `/s/:id#k=<base64url-key>` 형식을 사용해 복호화 키를 클라이언트 측에 남겨 둡니다.
- `⏱️ 지연 열기` `5`, `15`, `30`분 후에만 열 수 있도록 대기 시간을 설정할 수 있습니다.
- `⌛ 제한 시간 열람` 한 번 열리면 복호화된 내용은 `60초` 동안만 표시됩니다.
- `🗑️ 자동 만료` 열리지 않은 시크릿은 생성 후 `1시간`이 지나면 자동으로 만료되며, 지연 열기 설정 시에도 동일합니다.
- `⚡ 경량 프런트엔드` 무거운 클라이언트 런타임 프레임워크 없이 빠르고 집중된 사용 경험을 제공합니다.

## 기술 스택

- Svelte 5
- Vite 7
- Tailwind CSS 4
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare KV
- 프런트엔드 앱과 Pages Functions 는 TypeScript 사용

## 프로젝트 구조

- `src/`: Svelte 앱 소스, UI 컴포넌트, 브라우저 로직, 스타일
- `static/`: 빌드 시 그대로 복사되는 정적 자산
- `public/`: Cloudflare Pages 배포용 빌드 출력물
- `functions/api/secrets/index.ts`: 지연 열기 설정을 포함한 시크릿 생성 API
- `functions/api/secrets/[id]/open.ts`: 열기 가능 시각을 강제하는 최초 열람 API
- `functions/api/i18n.ts`: API 측 메시지 사전
- `vite.config.js`: Vite 빌드 설정
- `svelte.config.js`: Svelte 컴파일러 설정
- `wrangler.toml`: Pages 및 KV 설정

## 요구 사항

- Node.js `20+`
- npm
- Cloudflare 무료 계정
- 프로젝트 의존성으로 설치된 Wrangler 4

`wrangler@4`는 Node 20+를 요구합니다. Node 18에서도 설치될 수 있지만, 경고가 뜨거나 동작이 불안정할 수 있습니다.

## 로컬 개발

### 1. 의존성 설치

```bash
cd /Users/yilun/Desktop/FlashSeal
npm install
```

### 2. Wrangler 인증

다음 중 하나를 사용하세요.

- `npx wrangler login` 실행
- 또는 shell 에 `CLOUDFLARE_API_TOKEN` 설정

KV namespace 를 만들기 전에 Cloudflare 인증이 필요합니다.

### 3. KV namespace 생성

프로덕션과 프리뷰용 namespace 를 모두 생성합니다.

```bash
npm run kv:create
npm run kv:create:preview
```

Wrangler 가 namespace ID 를 출력합니다. 이를 [wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml) 에 반영하세요.

```toml
[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

### 4. 로컬 Pages 개발 서버 시작

```bash
npm run dev
```

로컬 개발 설정:

- 앱 포트: `8788`
- inspector 포트: `9230`
- 로컬 state 디렉터리: `./.wrangler/state`
- 프런트엔드 빌드 출력 디렉터리: `public/`

접속 주소:

```text
http://127.0.0.1:8788
```

### 5. 로컬에서 메인 플로우 확인

1. 텍스트 또는 이미지 시크릿을 생성
2. 필요하면 `5`, `15`, `30`분 지연 열기를 설정
3. 생성된 링크를 복사
4. 새 탭 또는 창에서 해당 링크를 열기
5. 지연 열기를 설정했다면 아직 열 수 없다는 안내가 보이는지 확인
6. 열기 가능 시각이 지나면 시크릿이 자동으로 열리는지 확인
7. 카운트다운이 60초인지 확인
8. 같은 링크를 다시 열 수 없는지 확인

### 로컬 개발 문제 해결

- 업그레이드 후 `wrangler` 명령이 불안정하면 `package.json` 스크립트나 `npx wrangler ...` 를 사용
- 오래된 UI 가 보이면 브라우저의 service worker 와 사이트 데이터를 삭제
- KV 생성이 실패하면 로그인 여부 또는 `CLOUDFLARE_API_TOKEN` 설정 여부 확인
- 오래된 Node 버전에서 로컬 개발이 실패하면 Node 20+로 업그레이드
- `public/index.html` 을 정적 파일로 직접 미리보기하지 마세요. 이 프로젝트는 Cloudflare Pages 라우팅과 빌드된 자산 경로를 전제로 합니다.

## Cloudflare Pages 배포

### 방법 1: Cloudflare 대시보드에서 GitHub 저장소 연결

1. 이 프로젝트를 Git 저장소에 push
2. Cloudflare 의 `Workers & Pages` 열기
3. 새 `Pages` 프로젝트를 만들고 저장소 연결
4. 다음 빌드 설정 사용
   - Build command: `npm run build`
   - Build output directory: `public`
5. 프로덕션용 KV namespace 생성 또는 선택
6. Pages 프로젝트 설정에서 KV 바인딩 추가
   - Variable name: `SECRETS`
   - Namespace: 프로덕션 namespace
7. 저장 후 배포

### 방법 2: 먼저 설정을 준비한 뒤 Pages 연결

저장소를 연결하기 전에 [wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml) 에 실제 namespace ID 가 들어 있는지 확인하세요.

```toml
name = "flashseal"
compatibility_date = "2026-03-11"
pages_build_output_dir = "./public"

[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

그 다음 Pages 에서 저장소를 연결하고 다음 값을 유지하세요.

- Build command: `npm run build`
- Output directory: `public`
