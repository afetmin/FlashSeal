<div align="center">

# 🛡️ FlashSeal

**基于 Cloudflare Pages 与 KV 的加密阅后即焚文本和图片分享工具**

[English](./README.md) | 简体中文 | [日本語](./README_JA.md) | [한국어](./README_KO.md)

[![GitHub license](https://img.shields.io/github/license/afetmin/FlashSeal?style=flat-square)](https://github.com/afetmin/FlashSeal/blob/master/LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)
[![Cloudflare KV](https://img.shields.io/badge/Cloudflare-KV-F38020?style=flat-square&logo=cloudflare)](https://developers.cloudflare.com/kv/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[在线演示](https://flashseal.space/) | [源码](https://github.com/afetmin/FlashSeal) | [部署说明](https://github.com/afetmin/FlashSeal#部署到-cloudflare-pages) | [问题反馈](https://github.com/afetmin/FlashSeal/issues) | [许可证](https://github.com/afetmin/FlashSeal/blob/master/LICENSE)

</div>

---

FlashSeal 是一个基于 Cloudflare Pages、Pages Functions 和 KV 的加密阅后即焚文本与图片分享工具。
页面不依赖重型运行时框架。

## 预览

![FlashSeal 预览](./images/preview.png)

## 功能特性

- `🛡️ 端到端加密` 内容在浏览器内完成加密后再上传，服务端只存储密文。
- `🔥 阅后即焚` 每条秘密只允许首次成功访问者打开一次，让分享天然具备一次性。
- `📝 文本与图片支持` 统一支持文本和图片分享，单张图片上传上限为 `15MB`。
- `📋 粘贴即上传` 支持直接从剪贴板粘贴图片，减少手动选择文件的步骤。
- `🔗 密钥留在链接片段` 分享链接采用 `/s/:id#k=<base64url-key>` 形式，解密密钥保留在客户端。
- `⏱️ 延时开启` 可预设在 `5`、`15`、`30` 分钟后才允许打开。
- `⌛ 限时可见` 一旦成功打开，明文内容仅显示 `60 秒` 后自动消失。
- `🗑️ 自动过期` 未被打开的秘密会在创建 `1 小时` 后自动失效，延时开启同样遵循该规则。
- `⚡ 轻量前端` 页面不依赖重型客户端运行时框架，加载更快，体验更聚焦。

## 技术栈

- Svelte 5
- Vite 7
- Tailwind CSS 4
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare KV
- 前端应用与 Pages Functions 使用 TypeScript

## 项目结构

- `src/`：Svelte 应用源码、UI 组件、浏览器端共享逻辑与样式
- `static/`：构建时直接复制的静态资源
- `public/`：部署到 Cloudflare Pages 的构建产物
- `functions/api/secrets/index.ts`：带延迟打开配置的创建秘密接口
- `functions/api/secrets/[id]/open.ts`：强制校验可打开时间的首次打开接口
- `functions/api/i18n.ts`：接口侧多语言字典
- `vite.config.js`：Vite 构建配置
- `svelte.config.js`：Svelte 编译配置
- `wrangler.toml`：Pages 与 KV 配置

## 环境要求

- Node.js `20+`
- npm
- 一个 Cloudflare 免费版账号
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

创建 KV namespace 前必须先完成 Cloudflare 认证。

### 3. 创建 KV namespace

分别创建生产和预览用的 namespace：

```bash
npm run kv:create
npm run kv:create:preview
```

Wrangler 会输出 namespace ID。把它们填入 [wrangler.toml](/Users/yilun/Desktop/FlashSeal/wrangler.toml)：

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

FlashSeal 本地开发使用以下固定配置：

- 应用端口：`8788`
- inspector 端口：`9230`
- 本地状态目录：`./.wrangler/state`
- 前端构建输出目录：`public/`

然后访问：

```text
http://127.0.0.1:8788
```

### 5. 本地验证主流程

1. 创建一个文本或图片秘密
2. 按需设置 `5`、`15` 或 `30` 分钟延迟打开
3. 复制生成的链接
4. 在新的标签页或窗口中打开该链接
5. 如果设置了延迟打开，确认界面提示该秘密暂时不可打开
6. 到达可打开时间后，确认秘密会自动打开
7. 确认倒计时为 60 秒
8. 确认同一链接无法再次打开

### 本地开发常见问题

- 如果升级后 `wrangler` 命令异常，优先使用 `package.json` 中的脚本或 `npx wrangler ...`
- 如果页面还是旧版本，清除浏览器中的 service worker 和站点缓存
- 如果创建 KV 失败，检查是否已登录或是否设置了 `CLOUDFLARE_API_TOKEN`
- 如果本地开发在旧 Node 版本下失败，升级到 Node 20+
- 不要把 `public/index.html` 当成静态文件直接预览。这个项目依赖 Cloudflare Pages 路由和构建后的资源路径。

## 部署到 Cloudflare Pages

### 方案 1：在 Cloudflare 控制台连接 GitHub 仓库

1. 先把项目推到 Git 仓库
2. 在 Cloudflare 中进入 `Workers & Pages`
3. 创建新的 `Pages` 项目并连接仓库
4. 使用以下构建配置：
   - Build command：`npm run build`
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
compatibility_date = "2026-03-11"
pages_build_output_dir = "./public"

[[kv_namespaces]]
binding = "SECRETS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

然后在 Pages 中连接仓库，并保持：

- Build command：`npm run build`
- Output directory：`public`
