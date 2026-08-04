# LANGUAGES · 共享用词

Agent 输出（Issue / PRD / handoff / commit / Review）必须使用本表词汇。领域术语定义见 `CONTEXT.md`；此处只列**共享任务流与协作用词**，避免与 CONTEXT 抢事实源。

> 原根文件 `LANGUAGE.md` 已迁移至此（2026-08-04）。架构 Depth/Seam 词表并入下方「架构讨论用词」。

---

## Issue / Triage

| 用词 | 含义 |
|------|------|
| **Issue** | 本地 `.scratch/<feature>/` 下的 markdown 工单（默认 tracker） |
| **needs-triage** | 新进尚未分类 |
| **needs-info** | 缺复现 / 缺验收标准 |
| **ready-for-agent** | 可交 Agent 实施 |
| **ready-for-human** | 需人拍板或验收 |
| **wontfix** | 明确不做 |

---

## 任务流

| 用词 | 含义 |
|------|------|
| **report** | 调研分析，`docs/outputs/report/{theme}/` |
| **PRD** | 产品需求，`docs/outputs/prd/{theme}/prd.md` |
| **handoff** | 任务交接快照，`docs/outputs/handoff/{theme}/`；**覆盖式**更新 |
| **awaiting-review** | 实施完成、停等用户 Review |
| **commit-history** | 攒批摘要，`docs/outputs/commit-history/{branch}/YYYY-MM-DD.md` |
| **ADR** | `docs/adr/000N-kebab-title.md` |
| **theme** | 业务主题目录名（kebab-case） |

---

## 产品与路径用词

| 用词 | 必须写为 |
|------|----------|
| 产品层根 | 仓库根（`pages/` · `components/` · `layouts/` · `site.config.ts` · `valaxy.config.ts`） |
| 文章 | `pages/posts/<slug>.md`（领域词 **Post**） |
| 文档产物根 | `docs/outputs/`（**复数**；禁止 `docs/output/`） |
| README 配图 | `assets/images/readme/` |
| 站点配置 | **Site config**（`site.config.ts`） |
| 框架配置 | **Valaxy config**（`valaxy.config.ts`） |
| 静态输出 | `dist/` |
| 开发端口 | `http://localhost:4859`（`pnpm dev`） |
| README 预览壳端口 | `8094`（`python -m http.server 8094`） |
| 演示站 | https://daily.yybb.us/ |
| 配图托管 | Cloudflare R2 · bucket `threetwoa-blog-assets` |

---

## Preview vs Showcase

| 用词 | 本仓用法 |
|------|----------|
| **Preview** | 资产 Gallery —— **本仓省略**（单产品博客，无可翻组件库） |
| **Showcase** | 产品主链路实机相册 `showcase-*.jpg` / `showcase-*.png` |
| **README 预览壳** | `preview-readme.html`（渲染 README 本身，不是博客站） |

---

## 架构讨论用词（improve-codebase-architecture 等）

| Term | Definition |
|------|------------|
| **Module** | 有接口与实现的单元（函数、文件、配置切片等） |
| **Interface** | 调用方必须知道的一切（类型、不变量、错误模式、顺序、配置） |
| **Implementation** | 模块内部代码 |
| **Depth** | 接口杠杆：小接口承载大行为 |
| **Seam** | 可不改模块本体而改变行为的切入点（优先于 boundary） |
| **Adapter** | 在 seam 上满足接口的具体物 |
| **Leverage** / **Locality** | 调用方收益 / 维护方收益 |

Avoid：service→module/provider/adapter；API（泛称）→interface/config surface；boundary→seam；whitelist→safelist；search engine→search provider；blog config→site config / Valaxy config。

---

## 禁止漂移

- 不要写 `docs/agents/language.md` / `docs/agents/context.md`
- 不要把 Site config 与 Valaxy config 混称「blog config」
- 不要把 README 预览壳写成 Preview Gallery，或用生图冒充 Showcase
