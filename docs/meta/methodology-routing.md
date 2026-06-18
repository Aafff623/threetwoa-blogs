# Matt Pocock 方法论：命令与产出文档路由

本文件记录本仓库使用的 Matt Pocock skills 中各 `/` 命令会触发什么、产出什么文档、以及这些文档应该放在哪里。

> 来源：`mattpocock/skills` 官方模板。`LANGUAGE.md` 在新版中已合并进 `CONTEXT.md`，不再单独维护。

---

## 一、用户主动调用的命令（user-invoked）

| 命令 | 触发场景 | 产出文档/产物 | 存放位置 |
|---|---|---|---|
| `/setup-matt-pocock-skills` | 首次配置工程技能 | `## Agent skills` 配置段落 | `CLAUDE.md`（若已存在）或 `AGENTS.md` |
| | | `issue-tracker.md` | `docs/agents/issue-tracker.md` |
| | | `triage-labels.md` | `docs/agents/triage-labels.md` |
| | | `domain.md` | `docs/agents/domain.md` |
| `/grill-with-docs` | 已有代码库，通过访谈澄清计划/设计 | `CONTEXT.md`（领域术语表） | 仓库根目录 |
| | | `docs/adr/000N-*.md`（架构决策记录） | `docs/adr/` |
| `/grill-me` | 没有代码库时，纯访谈澄清想法 | 无文件产物 | — |
| `/to-prd` | 已有足够上下文，合成 PRD | PRD | issue tracker（本地 `.scratch/<feature>/PRD.md` 或 GitHub issue） |
| `/to-issues` | 把计划/PRD 拆分为可跟踪 issue | issues | `.scratch/<feature>/issues/NN-*.md` 或 GitHub issues |
| `/triage` | 维护者对 issue 进行分诊 | triage 标签更新 + 评论/摘要 | issue tracker |
| `/improve-codebase-architecture` | 扫描代码库架构深化机会 | HTML 架构审视报告 | OS 临时目录（`$TMPDIR` / `%TEMP%`） |
| | | 可选：更新 `CONTEXT.md`、新建 ADR | 仓库内 |
| `/prototype` | 用可抛弃代码回答逻辑/UI 问题 | 临时原型代码/页面 | 靠近目标模块或页面 |
| `/handoff` | 跨会话交接工作 | handoff 文档 | OS 临时目录（不存仓库） |
| `/ask-matt` | 想听取 Matt 风格的建议 | 无文件产物 | — |

---

## 二、模型自动调用的命令（model-invoked）

这些命令由 agent 在识别到特定语境时自动触发，不需要用户手动输入。

| 命令 | 触发条件 | 产出文档/产物 | 存放位置 |
|---|---|---|---|
| `/grilling` | 用户说 "grill me"、"stress-test this plan" 等 | 无直接文件产物；驱动 relentness interview | — |
| `/domain-modeling` | 术语冲突、模糊语言、讨论领域关系、代码与术语矛盾 | 更新/创建 `CONTEXT.md` | 仓库根目录 |
| | | 满足三条件时创建 `docs/adr/000N-*.md` | `docs/adr/` |
| `/codebase-design` | 设计模块接口、找 seam、提高可测试性 | 可能引用 `DEEPENING.md`、`DESIGN-IT-TWICE.md` 概念 | 无固定产物 |
| `/tdd` | 用户提到 TDD、red-green-refactor、写集成测试 | 测试文件 + 实现代码 | 项目测试目录与源码目录 |
| `/diagnosing-bugs` | 用户说 diagnose/debug/报告 bug/失败/慢 | 回归测试、调试日志、最简复现、假设清单 | 仓库内 + 临时日志 |

---

## 三、项目文件路由结构

```text
/
├── CLAUDE.md                       ← Agent skills 配置段落（/setup-matt-pocock-skills）
├── CONTEXT.md                      ← /grill-with-docs、/domain-modeling 产出
├── CONTEXT-MAP.md                  ← 多上下文时（可选）
├── docs/
│   ├── adr/
│   │   ├── 0001-event-sourced-orders.md   ← ADR（/grill-with-docs、/domain-modeling、/improve-codebase-architecture）
│   │   └── 0002-...md
│   └── agents/
│       ├── issue-tracker.md        ← issue tracker 说明（/setup-matt-pocock-skills）
│       ├── triage-labels.md        ← 标签映射（/setup-matt-pocock-skills）
│       └── domain.md               ← 领域文档消费规则（/setup-matt-pocock-skills）
└── .scratch/                       ← 本地 markdown issue tracker（无 GitHub remote 时）
    └── <feature-slug>/
        ├── PRD.md                  ← /to-prd 产出
        └── issues/
            ├── 01-xxx.md           ← /to-issues 产出
            └── 02-xxx.md
```

### 临时产物（不进入仓库）

- `/improve-codebase-architecture` → `architecture-review-<timestamp>.html`（OS 临时目录）
- `/handoff` → handoff 文档（OS 临时目录）
- `/prototype` → 可抛弃代码，最终决定是否保留由用户做

---

## 四、典型工作流

```text
1. 配置
   /setup-matt-pocock-skills
   └── 生成 docs/agents/* + 更新 CLAUDE.md

2. 澄清
   /grill-with-docs 或 /grill-me
   └── 产出/更新 CONTEXT.md、docs/adr/

3. 写规格
   /to-prd
   └── 产出 PRD（issue tracker）

4. 拆任务
   /to-issues
   └── 产出 issues（issue tracker）

5. 分诊
   /triage
   └── issue 标签 → ready-for-agent

6. 实现
   agent 自动触发 /tdd、/prototype、/diagnosing-bugs
   └── 测试、原型、回归测试

7. 架构审视
   /improve-codebase-architecture
   └── HTML 报告 + 可选 ADR

8. 交接
   /handoff
   └── OS 临时 handoff 文档
```

---

## 五、关键规则

- `CONTEXT.md` **只放领域术语表**，不放实现细节。
- ADR 只在同时满足三条件时才写：
  1. 难撤销
  2. 没有上下文会令人意外
  3. 存在真实取舍
- `.scratch/` 用于本地 markdown issue tracker；有 GitHub remote 时优先用 GitHub Issues。
- `LANGUAGE.md` 已废弃，所有领域语言统一进 `CONTEXT.md`。
