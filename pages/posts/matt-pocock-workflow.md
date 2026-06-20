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
cover: https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/covers/2026/06/matt-pocock-workflow/matt-pocock-workflow.png
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
