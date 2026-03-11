# FlashSeal

[English](./README.md) | 简体中文 | [日本語](./README_JA.md) | [한국어](./README_KO.md)

FlashSeal 是一个基于 Cloudflare Pages、Pages Functions 和 KV 的加密阅后即焚文本/图片分享工具。

## 功能概览

- 支持 `text` 和 `image` 两种秘密内容
- 图片大小限制为 `15MB`
- 通过直接链接分享：`/s/:id#k=<base64url-key>`
- 只有第一个成功访问的人可以打开秘密
- 打开后内容可见 `60 秒`
- 未打开的秘密会在 `1 小时` 后过期
- 内容在浏览器中加密，后端只保存密文

## 技术栈

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare KV
- Functions 使用 TypeScript
- 前端使用原生 HTML/CSS/JS

## 项目结构

- `public/`：静态页面、样式、PWA 文件、前端逻辑
- `functions/api/secrets/index.ts`：创建秘密接口
- `functions/api/secrets/[id]/open.ts`：首次打开接口
- `functions/api/i18n.ts`：接口侧多语言字典
- `wrangler.toml`：Pages 与 KV 配置

## 环境要求

- Node.js `20+`
- npm
- 一个 Cloudflare 账号
- 通过项目依赖安装的 Wrangler 4

`wrangler@4` 要求 Node 20+。如果你使用 Node 18，虽然可能还能安装，但运行时会有警告或不稳定行为。

## 本地开发

### 1. 安装依赖

```bash
cd /Users/yilun/Desktop/FlashSeal
npm install
```

### 2. 登录 Wrangler

任选一种方式：

- 执行 `npx wrangler login`
- 或在 shell 中设置 `CLOUDFLARE_API_TOKEN`

如果没有 Cloudflare 认证，创建 KV namespace 的命令会失败。

### 3. 创建 KV namespace

分别创建生产和预览用的 namespace：

```bash
npm run kv:create
npm run kv:create:preview
```

Wrangler 会输出 namespace ID。把它们填写到 [wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml)：

```toml
[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

### 4. 启动本地开发服务

```bash
npm run dev
```

FlashSeal 本地开发固定使用：

- 应用端口：`8788`
- inspector 端口：`9230`
- 本地状态目录：`./.wrangler/state`

打开：

```text
http://127.0.0.1:8788
```

### 5. 本地验证主流程

1. 创建一个文本或图片秘密
2. 复制生成的链接
3. 在新的标签页或窗口中打开该链接
4. 确认秘密会自动打开
5. 确认倒计时为 60 秒
6. 确认再次打开同一链接会失败

### 本地开发常见问题

- 如果升级后 `wrangler` 命令异常，优先使用 `package.json` 中的脚本或 `npx wrangler ...`
- 如果页面还是旧版本，清除浏览器中的 service worker 和站点缓存
- 如果创建 KV 失败，检查是否已登录或是否设置了 `CLOUDFLARE_API_TOKEN`
- 如果本地开发在旧 Node 版本下失败，升级到 Node 20+

## 部署到 Cloudflare Pages

### 方案 1：在 Cloudflare 控制台连接 GitHub 仓库

1. 先把项目推到 Git 仓库
2. 在 Cloudflare 中进入 `Workers & Pages`
3. 创建新的 `Pages` 项目并连接仓库
4. 使用以下构建配置：
   - Build command：留空
   - Build output directory：`public`
5. 创建或选择一个生产环境的 KV namespace
6. 在 Pages 项目设置中添加 KV 绑定：
   - Variable name：`SECRETS`
   - Namespace：你的生产 namespace
7. 保存并部署

### 方案 2：先准备配置，再连接 Pages

在连接仓库之前，先确认 [wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml) 已写入真实 namespace ID：

```toml
name = "flashseal"
compatibility_date = "2025-11-20"
pages_build_output_dir = "./public"

[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

然后在 Pages 中连接仓库，并保持：

- Build command：留空
- Output directory：`public`
