# CONTEXT · threetwoa-blogs

> 领域术语与硬约束的**单一事实源**。共享任务流用词见 `LANGUAGES.md`。  
> Full 模式调研日：2026-08-04；备份：`.scratch/context-backup-20260804.md`。

## 项目定位

基于 **Valaxy + Sakura** 的个人静态博客模板（SSG）。不是从零博客框架，而是可落地的 Sakura 增强方案：配置分离、组件覆盖、自定义 Vite 插件，配合 Obsidian → R2 → CI 的内容流水线。

| 项 | 事实 |
|----|------|
| 产品形态 | 静态站点（`dist/`）+ 可选 WebDAV 相册代理 |
| 受众 | 个人博客作者 / 想复用 Sakura 增强模板的开发者 |
| 演示站 | https://daily.yybb.us/ |
| site.config.url | https://threetwoa-blogs.vercel.app/（与演示域名不一致，【待确认】统一） |
| 包管理 | pnpm（workspace 单包 `packages: [.]`） |
| 产品层根 | 仓库根（`pages/` · `components/` · `layouts/` · 配置文件），非 `src/` |

## 技术栈

| 层级 | 技术 | 备注 |
|------|------|------|
| 框架 | Valaxy `0.28.11`（钉死） | Vite + Vue 3 + TypeScript · `type: module` |
| 主题 | `valaxy-theme-sakura` | `package.json` 为 `latest`；`pnpm-lock.yaml` 当前解析 **0.10.2**（风险：应钉死，【待确认】） |
| 样式 | UnoCSS + SCSS + CSS Vars | 动态 Iconify 进 `safelist` |
| 可视化 | ECharts 6.x | 分类 / 标签 / 归档图表 |
| 评论 | `@giscus/vue` | GitHub Discussions |
| 搜索 | Fuse（Valaxy 内置） | build 时生成索引；ADR-0001 |
| 相册 | 本地 / WebDAV | 代理见 `api/` · `server/` · ADR-0002 |
| 部署 | GH Pages / Vercel / Netlify / Docker+nginx | 多平台配置齐备 |

## 核心模块

| 模块 | 入口 | 职责 |
|------|------|------|
| 配置层 | `site.config.ts` · `valaxy.config.ts` | 站点元数据 vs 框架/主题（禁止混称 blog config） |
| 内容层 | `pages/**` | 文件系统路由；文章在 `pages/posts/` |
| UI 覆盖 | `components/` · `layouts/` | 按名覆盖 Sakura，不 fork 主题 |
| 灯箱 | `App.vue` → ImageGalleryViewer | 文章图片预览 |
| 导航抽卡 | Navigation* | 加权随机站点跳转 |
| FOUC Guard | `plugins/va-fouc-loader` | 首屏加载遮罩 |
| SSG 包装 | `scripts/build-ssg.mjs` | 检测完成标记并强制结束进程 |
| 发布流水线 | `.claude/skills/*` + rclone | Obsidian → R2 → posts → CI |

## Language（领域术语）

**Post**：`pages/posts/` 下的单篇 Markdown 文章。_Avoid_: article, blog entry

**Page**：`pages/` 下任意路由文件（含 posts、归档、分类等）。_Avoid_: route, view（作页面义时）

**Route**：Valaxy 从 `pages/` 生成的 URL 路径（见 `.valaxy/route-map.d.ts`）。

**Layout**：包裹页面的 Vue 布局（主题提供或 `layouts/` 覆盖）。_Avoid_: template, wrapper

**Theme**：`valaxy-theme-sakura` 主题包。_Avoid_: skin

**Component**：`components/` 或主题提供的 Vue 组件。_Avoid_: widget

**Front matter**：Markdown 顶部 YAML 元数据。

**Site config**：`site.config.ts` 站点元数据。_Avoid_: blog config

**Valaxy config**：`valaxy.config.ts` 框架/主题配置。_Avoid_: blog config

**Search index** / **Search provider**：构建期 JSON 索引 / 回答查询的本地 Fuse 机制。_Avoid_: search engine（歧义）

**Safelist**：UnoCSS 必须保留的 Iconify 类名列表。_Avoid_: whitelist

**SSG**：产出 `dist/` 的静态站点生成。_Avoid_: static build（歧义）

**Category** / **Tag** / **Archive** / **Excerpt** / **Social link** / **Sponsor** / **Locale**：分类、标签、归档、摘要、社交链接、赞助区、`locales/` 文案覆盖。

## Relationships

- Post 是 Page 的一种；Page 使用恰好一个 Layout。
- Theme 提供默认 Layout 与 Component；用户层覆盖优先于改主题源码。
- Front matter 属于 Page；Search index 由 Pages 生成、由 Search provider 消费。
- Post 可有一个 Category 与多个 Tags；Archive 按日期聚合 Posts。

## Invariants（硬约束）

1. 内容只写在 `pages/`（Markdown 或 Vue）。
2. 站点元数据 ↔ `site.config.ts`；框架/主题 ↔ `valaxy.config.ts`。
3. 自定义样式走 `styles/index.scss` · `styles/css-vars.scss`。
4. `components/` 由 `unplugin-vue-components` 自动注册。
5. 默认 SSG，输出 `dist/`；发布前按需 `pnpm fuse` / `pnpm rss`。
6. WebDAV 密码仅服务端（`.env`）；相册 frontmatter password 仅门禁 UI，不可当真保密。
7. Agent 资产：领域事实只写本文件；任务流用词只写 `LANGUAGES.md`；**禁止** `docs/agents/language.md` / `context.md`。
8. 媒体进 `assets/`；**禁止**新建 `docs/images/`。
9. PRD 未批准不写业务功能代码；handoff 覆盖式更新。

## 内容与发布仓库

| 仓库 | 角色 |
|------|------|
| `threetwoa-ob-brain` | Obsidian 草稿源（Private） |
| `threetwoa-blogs` | 本仓 · 正式站点（Public） |
| `threetwoa-blog-assets` | Cloudflare R2 配图（Public-read） |

图片目录约定见 `docs/image-assets-guide.md`。

## Flagged ambiguities

- 「blog config」曾混指两配置文件 → 已拆为 Site config / Valaxy config。
- 「search engine」曾混指 UI 与 provider → 用 Search provider + 搜索 UI。
- site.url 与演示域名不一致 → 【待确认】canonical。
- `valaxy-theme-sakura: latest` → 【待确认】钉死版本。
- GH Pages workflow 仍 `npm i`，与 pnpm 仓不一致 → 【待确认】对齐 CI。

## Open questions

- 是否统一演示域名为 canonical URL。
- 主题依赖钉死策略与 CI 包管理统一。
- 搜索高亮 / 近期查询等体验增强是否列入下一 theme。
