# CLAUDE.md

> **Output Style**: `humanizer-output-style` — see `~/.claude/skills/humanizer-output-style/SKILL.md`  
> **项目语气覆盖**：`docs/agents/voice.md`  
> **Windows Rules / Answer Format / AGENTS 镜像 / commit-history**：见 `.cursor/rules/*.mdc`  
> 跨工具硬约束与路径表以根 `AGENTS.md` 为准；本文件补充 Claude Code 维护协议与本仓操作细节。

## 三层加载

1. 根 `AGENTS.md`（门禁 · 事实源表 · MDC）  
2. 本文件（命令 · 架构习惯 · 发布 skill）  
3. `CONTEXT.md` + `LANGUAGES.md` + 相关 ADR / handoff  

## 项目概述

使用 Sakura 主题（`valaxy-theme-sakura`）的 [Valaxy](https://valaxy.site) 静态博客。Vite/Vue、文件系统路由、组件自动注册、UnoCSS。配置分两文件：

- `valaxy.config.ts`：框架/主题（主题名、safelist、插件、构建）
- `site.config.ts`：站点元数据（url、lang、title、author、社交、search、sponsor）

## 常用命令

包管理：`pnpm`（`.npmrc`：`shamefully-hoist`，关闭严格 peer）。

```bash
pnpm install
pnpm dev          # http://localhost:4859
pnpm build        # SSG → dist/（scripts/build-ssg.mjs 包装）
pnpm build:ssg
pnpm build:spa
pnpm build:ssg:raw
pnpm serve
pnpm rss
pnpm fuse
```

当前无 lint / test 脚本。Docker：`docker build . -t your-valaxy-blog-name:latest`。

README 预览壳：`python -m http.server 8094` → `http://127.0.0.1:8094/preview-readme.html`（须 HTTP，勿 `file://`）。

## 架构与约定

- **文件系统路由**：`pages/` → 路由；`pages/posts/*.md` 为 Post；特殊页如 `archives/`、`categories/`、`tags/`、`links/`、`gallery/`、`navigation/`、`search/`。类型见 `.valaxy/route-map.d.ts`。
- **布局覆盖**：`layouts/` 或 front matter `layout: xxx`。
- **组件自动注册**：`components/` + 主题组件；见 `.valaxy/components.d.ts`。
- **样式**：`styles/index.scss` · `styles/css-vars.scss`。
- **图标**：Iconify（如 `i-ri-home-line`）；动态类名必须进 `valaxy.config.ts` 的 `safelist`。
- **国际化**：`locales/en.yml` · `locales/zh-CN.yml`。

## Agent skills

### Issue tracker

本地 Markdown：`.scratch/<feature>/`。见 `docs/agents/issue-tracker.md`。

### Triage labels

五种 canonical 标签。见 `docs/agents/triage-labels.md`。

### Domain docs

单上下文：`CONTEXT.md` + `docs/adr/`。见 `docs/agents/domain.md`。

## 从 Obsidian 发布文章

草稿源：Obsidian 知识库（本机路径勿写入对外文档唯一说明）。Skill：`.claude/skills/publish-obsidian-post.md`。

| 仓库 | 角色 | 可见性 |
|------|------|--------|
| `threetwoa-ob-brain` | Obsidian 草稿源 | Private |
| `threetwoa-blogs` | 正式发布站点 | Public |
| `threetwoa-blog-assets` | R2 配图托管 | Public-read |

流程：Drafts → 规范化 frontmatter → 配图上 R2 → `pages/posts/<slug>.md` → CI。

## 图片资源管理

Cloudflare R2（bucket: `threetwoa-blog-assets`）+ rclone。Skill：`.claude/skills/upload-image-to-r2.md`。目录约定：`docs/image-assets-guide.md`。脚本：`scripts/upload-to-r2.ps1`。

## 部署

- `.github/workflows/gh-pages.yml`：推送 `main` / `master` / `valaxy` 构建部署（注意：workflow 仍可能用 npm，与 pnpm 仓不一致，改前先 ADR / Issue）
- `netlify.toml` · `vercel.json` · `Dockerfile` + `nginx.conf`

## 偏好归档

- 领域词以 `CONTEXT.md` 为准；任务流词以 `LANGUAGES.md` 为准  
- 不写 `docs/agents/language.md` / `context.md`  
- init / README 配图落 `assets/images/readme/`  
- 业务功能须经 PRD 批准后再改 `components/` / `pages/` 等产品代码  
