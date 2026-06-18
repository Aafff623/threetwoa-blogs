# CLAUDE.md

本文件为 Claude Code（claude.ai/code）提供在本仓库中工作的指导。

## 项目概述

这是一个使用 Sakura 主题（`valaxy-theme-sakura`）的 [Valaxy](https://valaxy.site) 静态博客。它基于 Vite/Vue，采用文件系统路由、组件自动注册，并使用 UnoCSS。配置分为两个文件：

- `valaxy.config.ts`：框架/主题配置（主题名称、UnoCSS safelist、插件、构建选项等）。
- `site.config.ts`：站点级元数据（URL、语言、标题、作者、描述、社交链接、搜索、赞助等）。

## 常用命令

本项目使用 `pnpm`。`.npmrc` 已启用 `shamefully-hoist` 并关闭严格对等依赖检查。

安装依赖：

```bash
pnpm install
```

启动开发服务器（Valaxy CLI，默认 http://localhost:4859）：

```bash
pnpm dev
```

构建站点。默认使用 SSG，输出到 `dist/`：

```bash
pnpm build
pnpm build:ssg   # 显式 SSG 构建
pnpm build:spa   # SPA 构建
```

预览生产构建：

```bash
pnpm serve
```

生成 RSS 订阅：

```bash
pnpm rss
```

当前未配置 lint 或 test 脚本。

构建 Docker 镜像：

```bash
docker build . -t your-valaxy-blog-name:latest
```

## 架构与约定

- **文件系统路由**：`pages/` 下的文件会自动生成路由。`pages/posts/*.md` 会被识别为博客文章；`about/`、`archives/`、`categories/`、`links/`、`tags/` 等文件夹为特殊/列表页面。生成的路由类型定义在 `.valaxy/route-map.d.ts` 中。
- **布局**：主题提供了 `SakuraHomeLayout`、`SakuraPost`、`SakuraArchivesLayout`、`SakuraTagsLayout` 等布局。你可以在 `layouts/` 中放置 Vue 组件进行覆盖，或在 Markdown 的 front matter 中设置 `layout: xxx`。
- **组件自动注册**：`components/` 中的组件通过 `unplugin-vue-components` 按需自动注册。主题组件也全局可用，当前生成的注册表见 `.valaxy/components.d.ts`。
- **样式**：Valaxy 会自动加载 `styles/index.scss` 和 `styles/css-vars.scss`。自定义 CSS 和 CSS 变量写在这里；如需拆分文件，可从 `styles/index.scss` 中导入。
- **图标**：使用 Iconify 类名，例如 `i-ri-home-line`。如果动态图标未渲染，把对应的类名添加到 `valaxy.config.ts` 中的 `safelist` 数组。
- **国际化**：`locales/en.yml` 和 `locales/zh-CN.yml` 用于覆盖主题翻译。
- **配置分工**：
  - `valaxy.config.ts`：Valaxy 框架配置（主题、UnoCSS safelist、插件、构建选项）。
  - `site.config.ts`：站点元数据（url、lang、title、author、description、社交链接、search、sponsor）。

## 部署

- `.github/workflows/gh-pages.yml`：在推送到 `main`、`master` 或 `valaxy` 分支时自动构建，并将 `dist/` 部署到 GitHub Pages。
- `netlify.toml`：执行 `pnpm run build` 并发布 `dist/`，同时设置 Node 20 和 SPA fallback 重定向。
- `vercel.json`：启用 clean URLs。
- `Dockerfile`：使用 pnpm 构建站点，并通过 nginx 提供服务。

## Agent skills（Matt Pocock 工作流）

本仓库使用本地 markdown issue tracker。相关配置见：

- `docs/agents/issue-tracker.md` — issue tracker 约定
- `docs/agents/triage-labels.md` — 五个 triage 角色映射
- `docs/agents/domain.md` — 领域文档消费规则

