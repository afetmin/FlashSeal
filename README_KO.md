# FlashSeal

[English](./README.md) | [简体中文](./README_ZH.md) | [日本語](./README_JA.md) | 한국어

FlashSeal은 Cloudflare Pages, Pages Functions, KV를 기반으로 한 암호화된 열람 후 자동 소각 텍스트/이미지 공유 도구입니다.

## 기능 개요

- `text`, `image` 시크릿 지원
- 이미지 크기 제한은 `15MB`
- 공유 링크 형식: `/s/:id#k=<base64url-key>`
- 처음으로 정상적으로 연 1명만 내용을 볼 수 있음
- 열람 후 `60초` 동안만 표시
- 열리지 않은 시크릿은 `1시간` 후 만료
- 콘텐츠는 브라우저에서 암호화되며 서버에는 암호문만 저장

## 기술 스택

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare KV
- Functions 는 TypeScript 사용
- 프런트엔드는 네이티브 HTML/CSS/JS 사용

## 프로젝트 구조

- `public/`: 정적 페이지, 스타일, PWA 파일, 프런트엔드 로직
- `functions/api/secrets/index.ts`: 시크릿 생성 API
- `functions/api/secrets/[id]/open.ts`: 최초 열람 API
- `functions/api/i18n.ts`: API 측 메시지 사전
- `wrangler.toml`: Pages 및 KV 설정

## 요구 사항

- Node.js `20+`
- npm
- Cloudflare 계정
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

Cloudflare 인증이 없으면 KV namespace 생성 명령이 실패합니다.

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

접속 주소:

```text
http://127.0.0.1:8788
```

### 5. 로컬에서 메인 플로우 확인

1. 텍스트 또는 이미지 시크릿을 생성
2. 생성된 링크를 복사
3. 새 탭 또는 창에서 해당 링크를 열기
4. 시크릿이 자동으로 열리는지 확인
5. 카운트다운이 60초인지 확인
6. 같은 링크를 다시 열 수 없는지 확인

### 로컬 개발 문제 해결

- 업그레이드 후 `wrangler` 명령이 불안정하면 `package.json` 스크립트나 `npx wrangler ...` 를 사용
- 오래된 UI 가 보이면 브라우저의 service worker 와 사이트 데이터를 삭제
- KV 생성이 실패하면 로그인 여부 또는 `CLOUDFLARE_API_TOKEN` 설정 여부 확인
- 오래된 Node 버전에서 로컬 개발이 실패하면 Node 20+로 업그레이드

## Cloudflare Pages 배포

### 방법 1: Cloudflare 대시보드에서 GitHub 저장소 연결

1. 이 프로젝트를 Git 저장소에 push
2. Cloudflare 의 `Workers & Pages` 열기
3. 새 `Pages` 프로젝트를 만들고 저장소 연결
4. 다음 빌드 설정 사용
   - Build command: 비워 둠
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
compatibility_date = "2025-11-20"
pages_build_output_dir = "./public"

[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

그 다음 Pages 에서 저장소를 연결하고 다음 값을 유지하세요.

- Build command: 비워 둠
- Output directory: `public`
