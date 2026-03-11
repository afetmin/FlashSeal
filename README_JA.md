# FlashSeal

[English](./README.md) | [简体中文](./README_ZH.md) | 日本語 | [한국어](./README_KO.md)

FlashSeal は、Cloudflare Pages、Pages Functions、KV を使った暗号化付きの閲覧後自動消去テキスト・画像共有ツールです。

## 機能概要

- `text` と `image` のシークレットをサポート
- 画像サイズ上限は `15MB`
- 共有リンク形式：`/s/:id#k=<base64url-key>`
- 最初に正常にアクセスした 1 人だけが閲覧可能
- 開封後の表示時間は `60 秒`
- 未開封のシークレットは `1 時間` で期限切れ
- コンテンツはブラウザ内で暗号化され、サーバーには暗号文のみ保存

## 技術スタック

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare KV
- Functions は TypeScript
- フロントエンドはネイティブ HTML/CSS/JS

## プロジェクト構成

- `public/`: 静的ページ、スタイル、PWA ファイル、フロントエンドロジック
- `functions/api/secrets/index.ts`: シークレット作成 API
- `functions/api/secrets/[id]/open.ts`: 初回オープン API
- `functions/api/i18n.ts`: API 側メッセージ辞書
- `wrangler.toml`: Pages と KV の設定

## 必要環境

- Node.js `20+`
- npm
- Cloudflare アカウント
- プロジェクト依存としてインストールされた Wrangler 4

`wrangler@4` は Node 20+ を前提としています。Node 18 でもインストールできる場合がありますが、警告や不安定な動作が出ることがあります。

## ローカル開発

### 1. 依存関係をインストール

```bash
cd /Users/yilun/Desktop/FlashSeal
npm install
```

### 2. Wrangler を認証

次のいずれかを使用してください。

- `npx wrangler login` を実行
- または shell に `CLOUDFLARE_API_TOKEN` を設定

Cloudflare 認証がないと KV namespace 作成コマンドは失敗します。

### 3. KV namespace を作成

本番用とプレビュー用の両方を作成します。

```bash
npm run kv:create
npm run kv:create:preview
```

Wrangler が namespace ID を出力します。[wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml) に反映してください。

```toml
[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

### 4. ローカル Pages 開発サーバーを起動

```bash
npm run dev
```

ローカル設定は以下です。

- アプリポート: `8788`
- inspector ポート: `9230`
- ローカル state ディレクトリ: `./.wrangler/state`

アクセス先:

```text
http://127.0.0.1:8788
```

### 5. メインフローをローカルで確認

1. テキストまたは画像のシークレットを作成
2. 生成されたリンクをコピー
3. 新しいタブまたはウィンドウでそのリンクを開く
4. シークレットが自動で開くことを確認
5. カウントダウンが 60 秒であることを確認
6. 同じリンクを再度開けないことを確認

### ローカル開発のトラブルシュート

- アップグレード後に `wrangler` コマンドが不安定なら、`package.json` のスクリプトか `npx wrangler ...` を使う
- 古い UI が表示される場合は、ブラウザの service worker とサイトデータを削除する
- KV 作成が失敗する場合は、ログイン済みか `CLOUDFLARE_API_TOKEN` が設定されているか確認する
- 古い Node バージョンでローカル開発が失敗する場合は Node 20+ に上げる

## Cloudflare Pages へのデプロイ

### 方法 1: Cloudflare ダッシュボードで GitHub リポジトリを接続

1. このプロジェクトを Git リポジトリに push する
2. Cloudflare の `Workers & Pages` を開く
3. 新しい `Pages` プロジェクトを作成し、リポジトリを接続する
4. ビルド設定は以下を使う
   - Build command: 空のまま
   - Build output directory: `public`
5. 本番用 KV namespace を作成または選択する
6. Pages プロジェクト設定で KV バインディングを追加する
   - Variable name: `SECRETS`
   - Namespace: 本番用 namespace
7. 保存してデプロイする

### 方法 2: 先に設定を用意してから Pages に接続

リポジトリを接続する前に、[wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml) に実際の namespace ID が入っていることを確認してください。

```toml
name = "flashseal"
compatibility_date = "2025-11-20"
pages_build_output_dir = "./public"

[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

その後 Pages でリポジトリを接続し、次を維持します。

- Build command: 空のまま
- Output directory: `public`
