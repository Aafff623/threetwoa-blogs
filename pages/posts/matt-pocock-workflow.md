---
title: Matt Pocock Workflow：从想法到提交的 7 阶段工作流
date: 2026-06-21
categories:
  - 工作流
  - 方法论
tags:
  - Matt Pocock
  - Workflow
  - Agentic Coding
  - PRD
  - TDD
  - GitHub Issues
  - Review
description: 介绍 Matt Pocock 风格的 Agentic Coding 工作流：从想法、对齐、PRD、Issues、分类、TDD 到 Review 与提交的完整流程。
cover: https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/covers/2026/06/matt-pocock-workflow/sakura-digital-garden-hero.png
---

## 核心 Workflow：7 个阶段
*想法 → 对齐（Grill） → 写成 PRD → 拆成 Issues → 分类 → 实现（TDD） → Review → 验证 → 提交*
![matt-pocock-workflow-1.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-1.png)


1) Step 1: 对齐 — /grill-me
![matt-pocock-workflow-2.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-2.png)

2) Step 2: 写需求 — /create-prd
![matt-pocock-workflow-3.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-3.png)


3) Step 3：拆任务 — /to-issues
![matt-pocock-workflow-4.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-4.png)

4) Step 4：分类 — /triage
![matt-pocock-workflow-5.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-5.png)

5) Step 5：实现 — /tdd
![matt-pocock-workflow-6.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-6.png)


6) Step 6：评审 — /review
![matt-pocock-workflow-7.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-7.png)

7) Step 7：收尾 — /commit + /verify
![matt-pocock-workflow-8.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/matt-pocock-workflow/matt-pocock-workflow-8.png)



### AFK-ready issue flow: 
 *想法/bug → 创建 issue → 分类标签 → 明确后交给 agent → agent 实现 → 关闭 issue*

**场景 A：发现一个 bug**
`/triage 博客评论组件在暗色模式下文字看不见`
Claude 在 GitHub 创建 issue #12，贴上 needs-triage, 你确认后改成 ready-for-agent，Claude 去读代码、修 bug、提交 PR。

**场景 B：想加一个功能**
`/to-prd 给博客加一个相册页面，支持 WebDAV 图源`
Claude 写一份 PRD-album.md，然后你可以转成 issue。

**场景 C：PRD 拆任务**
`/to-issues PRD-album.md`
Claude 把 PRD 拆成多个 GitHub issues：
```Markdown
 #15 搭建相册路由
 #16 实现 WebDAV 图片抓取
 #17 做相册前端组件
```
每个都贴上 ready-for-agent 或 ready-for-human。

**场景 D：你自己直接改**
如果只是改个 typo、调个颜色，不需要走 issue。直接说：
`把导航栏字体改大一号`
Claude 直接改。Issue tracker 是给需要追踪、多步骤、可能跨会话的工作用的。

---

## 按场景分的常用流程

下面是我在这个博客里实际会用的几条线。把 `/grill-me`、`/create-prd`、`/to-issues`、`/triage`、`/tdd`、`/review` 这些技能串起来用，而不是每次都想“现在要调用哪个”。

### 场景 1：接到一个新需求 / 要加功能

这是完整走法，适合任何需要多步骤、跨会话、或者以后可能要回来看的需求。

1. **`/grill-with-docs`** — 把需求聊清楚，确认范围、约束、验收标准，顺便生成/更新 `CONTEXT.md`
2. **`/create-prd`** — 写产品需求文档（`PRD-<功能>.md`）
3. **`/to-issues`** — 把 PRD 拆成 GitHub issues
4. **`/tdd`** — 红绿重构：写测试 → 写代码 → 重构
5. **`/review`** — 检查改动
6. **`/commit`** 或 `git commit`（用 `git-commit-helper`）— 提交

> **什么时候可以偷懒？** 如果需求很小、你很清楚要做什么，直接用 **`/grill-me`** 替代 `/grill-with-docs`，甚至可以跳过 PRD，直接 `/tdd`。
>
> **例子**：
> ```text
> /grill-with-docs 给博客加一个文章系列功能
> /create-prd 文章系列功能
> /to-issues PRD-series.md
> /tdd #20
> /review
> /commit
> ```

### 场景 2：有人报 bug

1. **`/triage`** — 给 issue 打标签、判断优先级、是否需要补充信息
2. **`/diagnose`** — 定位根因
3. **`/tdd`** — 先写复现测试，再修复
4. **`/review`** — 检查修复

> **关键区别**：bug 一定要先写**复现测试**。没有测试的修复，下次升级框架大概率又冒出来。
>
> **例子**：
> ```text
> /triage 暗色模式下 Giscus 评论文字看不见
> /diagnose #25
> /tdd #25
> /review
> ```

### 场景 3：代码审查

- **`/review`** — 通用代码审查，会看正确性、可复用性、简化空间
- **`/code-review`** — 更偏 PR 审查，可以加 `--comment` 写评论或 `--fix` 直接修
- **`/simplify`** — 专门做简化、复用、效率清理（不找 bug）

> **建议顺序**：先 `/review` 找 bug，再 `/simplify` 清代码。反过来容易把有 bug 的代码改得更隐蔽。

### 场景 4：重构或架构治理

- **`/improve-codebase-architecture`** — 周期性跑，防止代码变成泥球
- 它会读 `CONTEXT.md` 和 `docs/adr/`，然后给出重构建议

> **多久跑一次？** 每做完 2-3 个功能跑一次，或者你觉得“这块代码越改越别扭”的时候跑。
>
> **例子**：
> ```text
> /improve-codebase-architecture
> ```
> Claude 会读 `CONTEXT.md`、`docs/adr/0001-enable-local-search.md`、`docs/adr/0002-album-webdav-proxy.md`，然后告诉你哪里该拆、哪里该合。

### 场景 5：想验证某次改动

- **`/verify`** — 跑起来看效果
- **`/run`** — 启动项目（比如 `pnpm dev`）

> 对于 Valaxy 博客，`/run` 会帮你开 `pnpm dev`，然后你可以自己在浏览器里看。`/verify` 则更主动，会直接去检查改动是否生效。

### 场景 6：写文案 / 文档

- **`/readme-polish`** — 润色 README
- **`/create-prd`** — 写 PRD
- **`/release-notes`** — 写发布说明

> 这些不算编码，但同样属于“把想法变成可交付物”，所以也算工作流的一部分。

---

## 这些技能会读哪些配置文件？

刚才 setup 时配的三个文件，其实就是给这些技能看的“使用说明书”：

| 技能 | 会读的配置 |
|---|---|
| `/triage`、`/to-issues`、`/to-prd`、`/qa` | `docs/agents/issue-tracker.md` + `docs/agents/triage-labels.md` |
| `/improve-codebase-architecture`、`/diagnose`、`/tdd` | `docs/agents/domain.md` → `CONTEXT.md` + `docs/adr/` |

所以如果你以后想：

- **换 issue tracker**（比如从 GitHub 换回本地 markdown），改 `docs/agents/issue-tracker.md`
- **改 triage 标签名**，改 `docs/agents/triage-labels.md`
- **增加新的领域术语或 ADR**，改 `CONTEXT.md` 或加 `docs/adr/000X-xxx.md`

这些文件是活的，跟着项目一起演进就好。
