# 调研报告 · project-init 抽检补缺

日期：2026-08-05 · 仓：`threetwoa-blogs` · 前置：Full 已 push（`59d9076` · `679364c`）  
对照：`C:\Users\Lenovo\.agents\skills\project-init\SKILL.md` · Canvas：`canvases/threetwoa-blogs-deep-analysis.canvas.tsx`

## 结论

Phase A/B **骨架与文档入口基本齐全**；抽检发现 **3 张契约图内容错位**（他仓 Spring Boot 图），已重出。业务 Vue/样式 WIP **未纳入**本轮。

## Phase A 抽检

| 项 | 结果 |
|----|:----:|
| `.cursor/rules/` 五份 MDC · `alwaysApply: true` · SHA=用户级 | ✅ |
| 根 `AGENTS` / `CLAUDE` / `CONTEXT` / `LANGUAGES`；humanizer + voice | ✅ |
| `docs/agents` 无 `language.md` / `context.md` | ✅ |
| ADR-0000 · knowledge/project-init 与全局 skill 等长 | ✅ |
| `CONTEXT-MAP.md` | 省略（单端，domain.md 已声明） |
| `docs/outputs/handoff/` | 按需未建空壳（符合规范） |
| Issue tracker 默认 `.scratch/` | ✅（与旧 GitHub 约定已纠正） |

## Phase B 抽检

| 项 | 结果 |
|----|:----:|
| README 章节 / 无 `<details>` 折叠目录树 | ✅ |
| Preview Gallery 省略声明 + README 壳 8094 | ✅ |
| Showcase 真机图 | ✅ |
| 契约六图文件存在 | ✅ |
| `banner` / `features` / `architecture` **内容** | ❌→✅ 重出（MiniMax 2049 → GenerateImage） |
| `tech-stack` / `workflow` / `structure` 内容 | ✅ 保留 |

## 文档漂移修复（本轮）

- Canvas：`LANGUAGE.md` → `LANGUAGES.md`，标注 project-init Full  
- ADR-0001：标注 Implemented，避免 Context 段被读成「现状仍关闭」  
- `docs/meta/methodology-routing.md`：对齐 LANGUAGES + 本地 tracker 默认  
- `assets/README.md` · brief：记录错图重出  

## 明确不纳入

- `components/*.vue` · `styles/*` · `valaxy.config.ts` · `package.json`（含 `@vueuse/core` WIP）· `.valaxy/route-map.d.ts`  
- CI 改 pnpm / 主题钉死 / canonical URL（Gate 后业务 theme + ADR）

## Gate

init 抽检补缺可合入；**首个业务 theme 仍须用户 Review 后再开**。
