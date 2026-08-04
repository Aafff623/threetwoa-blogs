# 调研报告 · project-init 五维（Full · 老项目）

日期：2026-08-04 · 仓：`threetwoa-blogs` · 策略：**迁移**  
参照：`canvases/threetwoa-blogs-deep-analysis.canvas.tsx` + 仓库实勘（非臆测）

## §2.2 对齐（全默认）

| 项 | 取值 |
|----|------|
| Issue tracker | 本地 `.scratch/<feature>/` |
| Triage | 五种 canonical 标签 |
| CONTEXT 形态 | 单文档 `CONTEXT.md` + `docs/adr/` |
| 外部资产 | 无新增 zip；既有截图留在 `assets/images/readme/` |
| 产品层根 | 仓库根（非 `src/`） |
| 首个业务 theme | 只做骨架 |
| 项目预期 | 个人博客模板 / 数字花园（对外可复用） |
| Handoff | 默认只 A |
| voice.md | 已建 |

轻量化：**否**（完整资产）。

---

## 1. 项目结构分析

### 产品层（仓库根）

| 目录/文件 | 事实 |
|-----------|------|
| `pages/` | 文件系统路由；`posts/` 下 **7** 篇 Markdown（含 `about-me-test.md`） |
| `components/` | **20** 个根级 Vue + `layouts/` 下 **9** 个布局组件（合计约 **29**） |
| `layouts/` | 根级 **3** 个：`gallery` / `gallery-album` / `navigation` |
| `plugins/` | `va-fouc-loader` · `album-webdav-config` · `album-webdav-proxy` |
| `api/` + `server/` | WebDAV 列表/文件代理（Vercel 函数 + 共享 HTTP 实现） |
| `utils/` · `types/` | 相册、灯箱、图表、导航抽卡等 **12** 个工具模块 |
| `styles/` | `index.scss` · `css-vars.scss` |
| `scripts/build-ssg.mjs` | SSG 挂起兜底包装 |
| 配置 | `site.config.ts` · `valaxy.config.ts` · `pnpm-workspace.yaml`（`packages: [.]`） |

### Agent / 文档层（本轮迁移后）

| 路径 | 状态 |
|------|:----:|
| `.cursor/rules/` 五份 MDC | ✅ 与用户级一致 |
| `AGENTS.md` · `CLAUDE.md` · `CONTEXT.md` · `LANGUAGES.md` | ✅ |
| `docs/agents/`（无 language/context） | ✅ |
| `docs/outputs/{report,prd,handoff,commit-history}` | ✅（按需有产物） |
| `docs/adr/0000` + 既有 0001/0002 | ✅ |
| `preview-readme.{html,css,js}` 端口 8094 | ✅ |
| `assets/images/readme/` 契约六图 + Showcase | ✅ |
| `CONTEXT-MAP.md` | 省略（单端） |

```text
threetwoa-blogs/
├── pages/ · components/ · layouts/ · plugins/ · styles/
├── api/ · server/ · utils/ · types/ · scripts/
├── site.config.ts · valaxy.config.ts
├── AGENTS.md · CLAUDE.md · CONTEXT.md · LANGUAGES.md · README.md
├── docs/{agents,adr,glossary,knowledge,outputs,tutorials}/
├── assets/images/readme/
└── preview-readme.{html,css,js}
```

---

## 2. 技术栈识别

| 层级 | 技术 | 证据 |
|------|------|------|
| 框架 | Valaxy **0.28.11**（钉死） | `package.json` |
| 主题 | `valaxy-theme-sakura`：**package.json=`latest`**，lock 解析为 **0.10.2** | `pnpm-lock.yaml` `@0.10.2` |
| 运行时 | Vue 3 + Vite + TypeScript · `type: module` | 配置与依赖 |
| 样式 | UnoCSS + SCSS + CSS Vars · Iconify safelist | `valaxy.config.ts` |
| 可视化 | ECharts **6.x** | 依赖 + `Sakura*Chart` |
| 评论 | `@giscus/vue` | `package.json` + `SakuraComment` |
| 搜索 | Fuse（Valaxy 内置） | `site.config.ts` · ADR-0001 |
| 工具 | `@vueuse/core` | 依赖 |
| 包管理 | pnpm + workspace 单包 | `pnpm-workspace.yaml` · `.npmrc` |
| 部署 | GH Pages / Vercel / Netlify / Docker+nginx | 各配置文件齐备 |
| 相册运行时 | WebDAV 代理（dev 插件 + Vercel `api/`） | ADR-0002 |

**风险（代码事实）**：GH Pages workflow 仍 `npm i`（与 pnpm 仓不一致）；`site.config.url` 为 vercel 域名，演示站为 `daily.yybb.us`。

---

## 3. 资产现状评估

| 资产 | 完整性 | 说明 |
|------|:------:|------|
| Cursor MDC ×5 | 完整 | SHA 与用户级一致 |
| 根入口四件套 | 完整 | `LANGUAGE.md` → `LANGUAGES.md` |
| docs/agents 流程件 | 完整 | workflow/deliver/archive/domain/issue-tracker/triage/voice |
| ADR | 完整 | 0000 制度 + 0001 搜索 + 0002 WebDAV |
| tutorials Stage 1–10 | 完整 | 既有，保留 |
| README 契约图 | 完整 | 六张 PNG（MiniMax 失败 → GenerateImage 回退） |
| Showcase 截图 | 完整 | `showcase-*.jpg`（与 `screenshot-*` 并存） |
| Preview Gallery | 省略 | 单产品博客；README 预览壳另建 |
| 外部 zip/backup | 无 | 未建空 `backup/` |
| Lint / Test | 缺口 | `package.json` 无对应脚本（业务债，非 init 必改） |

---

## 4. 业务领域分析

**定位**：可落地的 Sakura 增强静态博客模板 + 作者数字花园演示站。

**用户主链路**：

```text
读者：首页动态 → 文章/灯箱 → 分类·标签·归档图表 → 导航/友链/相册/搜索/评论
作者：Obsidian Draft → publish skill → R2 配图 → pages/posts → Valaxy SSG → CI → Live
```

**领域核心对象**（定义见 `CONTEXT.md`）：Post · Page · Route · Layout · Theme · Component · Site config · Valaxy config · Search provider · Safelist · SSG。

**内容仓库三角**：

| 仓 | 角色 |
|----|------|
| `threetwoa-ob-brain` | Obsidian 草稿（Private） |
| `threetwoa-blogs` | 正式站点（Public） |
| `threetwoa-blog-assets` | R2 配图（Public-read） |

---

## 5. 规范差距分析 → 本轮修复

| 差距（调研初态） | 修复动作 | 验收 |
|------------------|----------|:----:|
| 无 `.cursor/rules/` | 同步五份 MDC | ✅ |
| `LANGUAGE.md` 旧名 | 迁 `LANGUAGES.md` 并删旧文件 | ✅ |
| AGENTS/CLAUDE 未挂 humanizer / 门禁 | 重写根入口 | ✅ |
| docs/agents 缺 workflow 等 | 补齐；禁 language/context | ✅ |
| 无 `docs/outputs/` | 建 report/prd + commit-history 按需 | ✅ |
| 无 ADR-0000 | 写入采用 ADR | ✅ |
| issue-tracker 曾写 GitHub | 改本地 `.scratch/` | ✅ |
| 缺契约 PNG | GenerateImage 回退落盘 | ✅ |
| README 未对齐 Polish / Preview 声明 | Phase B 重写 | ✅（本轮） |
| 无 preview-readme 壳 | 8094 三文件 | ✅ |

**本轮明确不纳入 commit 的脏工作区**：`components/*.vue`、`styles/*`、`valaxy.config.ts` 等业务改动（init 范围外）。

---

## 策略结论

**迁移成功路径**：保留 tutorials / ADR-0001·0002 / 产品代码 / 既有截图；重建 Agent 骨架与 README 契约层；五维事实写入 `CONTEXT.md`；Phase B 完成结构 · 样式 · 配图 · Preview 省略声明 · Showcase · README 预览壳。

**下一业务 theme（Gate 后）建议**：主题依赖钉死、CI 改 pnpm、canonical URL 统一——各写 ADR 后再改。
