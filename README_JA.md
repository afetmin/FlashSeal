<div align="center">

# 🛡️ FlashSeal

**Cloudflare Pages と KV で動く、暗号化対応の閲覧後自動消去テキスト・画像共有ツール**

[English](./README.md) | [简体中文](./README_ZH.md) | 日本語 | [한국어](./README_KO.md)

[![GitHub license](https://img.shields.io/github/license/afetmin/FlashSeal?style=flat-square)](https://github.com/afetmin/FlashSeal/blob/master/LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)
[![Cloudflare KV](https://img.shields.io/badge/Cloudflare-KV-F38020?style=flat-square&logo=cloudflare)](https://developers.cloudflare.com/kv/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Live Demo](https://flashseal.space/) | [ソースコード](https://github.com/afetmin/FlashSeal) | [デプロイ手順](https://github.com/afetmin/FlashSeal#cloudflare-pages-へのデプロイ) | [Issue 報告](https://github.com/afetmin/FlashSeal/issues) | [ライセンス](https://github.com/afetmin/FlashSeal/blob/master/LICENSE)

</div>

---

FlashSeal は、Cloudflare Pages、Pages Functions、KV を使った暗号化対応の閲覧後自動消去テキスト・画像共有ツールです。
ページは重量級のランタイムフレームワークに依存しません。

## プレビュー

![FlashSeal preview](./images/preview.png)

## 機能

- `🛡️ エンドツーエンド暗号化` コンテンツはブラウザ内で暗号化されてから送信され、サーバーには暗号文のみが保存されます。
- `🔥 閲覧後自動消去` シークレットは最初に正常に開いた 1 人だけが閲覧でき、共有を一度きりに保てます。
- `📝 テキストと画像に対応` テキストと画像を同じフローで共有でき、画像は 1 枚あたり `15MB` まで扱えます。
- `📋 貼り付けアップロード` クリップボードから画像をそのまま貼り付けてアップロードできます。
- `🔗 フラグメントに鍵を保持` 共有リンクは `/s/:id#k=<base64url-key>` 形式で、復号鍵はクライアント側に残ります。
- `⏱️ 遅延オープン` `5`、`15`、`30` 分後に開封可能にする待機設定を選べます。
- `⌛ 時限表示` 一度開封されると、復号された内容は `60 秒` 間だけ表示されます。
- `🗑️ 自動期限切れ` 未開封のシークレットは作成から `1 時間` で自動的に失効し、遅延オープン設定時も同様です。
- `⚡ 軽量フロントエンド` 重量級のクライアントランタイムに依存せず、読み込みを速く保ちます。

## 技術スタック

- Svelte 5
- Vite 7
- Tailwind CSS 4
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare KV
- フロントエンドアプリと Pages Functions は TypeScript

## プロジェクト構成

- `src/`: Svelte アプリのソース、UI コンポーネント、ブラウザロジック、スタイル
- `static/`: ビルド時にそのままコピーされる静的アセット
- `public/`: Cloudflare Pages にデプロイするビルド出力
- `functions/api/secrets/index.ts`: 遅延開封設定付きのシークレット作成 API
- `functions/api/secrets/[id]/open.ts`: 開封可能時刻を強制する初回オープン API
- `functions/api/i18n.ts`: API 側メッセージ辞書
- `vite.config.js`: Vite ビルド設定
- `svelte.config.js`: Svelte コンパイラ設定
- `wrangler.toml`: Pages と KV の設定

## 必要環境

- Node.js `20+`
- npm
- Cloudflare 無料アカウント
- プロジェクト依存としてインストールされた Wrangler 4

`wrangler@4` は Node 20+ を前提としています。Node 18 でもインストールできる場合がありますが、警告や不安定な動作が出ることがあります。

## ローカル開発

### 1. 依存関係をインストール

```bash
cd /Users/yilun/Desktop/FlashSeal
npm install
```

### 2. Wrangler を認証

次のいずれかを使います。

- `npx wrangler login` を実行
- または shell に `CLOUDFLARE_API_TOKEN` を設定

KV namespace を作成する前に Cloudflare 認証が必要です。

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

ローカル設定は次のとおりです。

- アプリポート: `8788`
- inspector ポート: `9230`
- ローカル state ディレクトリ: `./.wrangler/state`
- フロントエンドのビルド出力先: `public/`

アクセス先:

```text
http://127.0.0.1:8788
```

### 5. メインフローをローカルで確認

1. テキストまたは画像のシークレットを作成
2. 必要に応じて `5`、`15`、`30` 分の遅延開封を設定
3. 生成されたリンクをコピー
4. 新しいタブまたはウィンドウでそのリンクを開く
5. 遅延開封を設定した場合、まだ開けない旨の表示が出ることを確認
6. 開封可能時刻を過ぎるとシークレットが自動で開くことを確認
7. カウントダウンが 60 秒であることを確認
8. 同じリンクを再度開けないことを確認

### ローカル開発のトラブルシュート

- アップグレード後に `wrangler` コマンドが不安定なら、`package.json` のスクリプトか `npx wrangler ...` を使う
- 古い UI が表示される場合は、ブラウザの service worker とサイトデータを削除する
- KV 作成が失敗する場合は、ログイン済みか `CLOUDFLARE_API_TOKEN` が設定されているか確認する
- 古い Node バージョンでローカル開発が失敗する場合は Node 20+ に上げる
- `public/index.html` を静的ファイルとして直接プレビューしないでください。このプロジェクトは Cloudflare Pages のルーティングとビルド済みアセットを前提にしています。

## Cloudflare Pages へのデプロイ

### 方法 1: Cloudflare ダッシュボードで GitHub リポジトリを接続

1. このプロジェクトを Git リポジトリに push する
2. Cloudflare の `Workers & Pages` を開く
3. 新しい `Pages` プロジェクトを作成し、リポジトリを接続する
4. ビルド設定は以下を使う
   - Build command: `npm run build`
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
compatibility_date = "2026-03-11"
pages_build_output_dir = "./public"

[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

その後 Pages でリポジトリを接続し、次を維持します。

- Build command: `npm run build`
- Output directory: `public`
