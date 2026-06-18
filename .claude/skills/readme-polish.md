---
name: readme-polish
description: |
  统一规范的 GitHub 项目 README 打磨 skill。
  当用户说"帮我写 README"、"打磨 README"、"生成项目首页"、"规范 README"、"按 AgentCFO 风格写 README"时触发。
  即使只提到"项目首页"、"repo 首页"、"README 美化"、"README 标准化"也要使用。
  输出结构：核心模块必须到位、可选模块按需挑选、自动补充模块由项目类型自动决定。
---

# README Polish — 统一规范的 GitHub 项目 README 打磨

把任何项目 README 打磨成 **AgentCFO 风格**：一眼看懂、表格驱动、边界清晰、可验证、双语呈现、视觉统一。

## 触发场景

- "帮我写 README"
- "打磨一下 README"
- "生成项目首页"
- "把 README 规范化"
- "按 AgentCFO 风格写 README"
- "README 美化 / 标准化"

## 输出产物

```
project-root/
├── README.md                          ← 打磨后的 README
└── assets/images/readme/
    ├── banner.png
    ├── hero.png
    ├── pipeline.png
    └── ...
```

---

## 模块体系

所有模块分为三类：

1. **核心模块（Core）**：每个项目都必须执行的标准化操作。
2. **可选模块（Optional）**：由用户明确挑选是否展示的内容。
3. **自动补充模块（Auto）**：根据项目类型/定位自动判断是否需要补充。

---

## 核心模块（必须执行）

| # | 模块 | 标题 | 作用 |
|---|------|------|------|
| 0 | **Header** | （无 `##`） | 标题、英文定位、中文解释、Banner、徽章、导航锚点 |
| 1 | **Why** | `## 🤔 为什么需要 {项目名}` | 痛点清单 + 核心边界表 + 流程图 |
| 2 | **Features** | `## ✨ 功能` | 功能表 + 场景/赛道匹配表 |
| 3 | **Demo** | `## 🎬 演示` | 场景数据表 + 截图网格 + 视频/物料链接 |
| 4 | **Quick Start** | `## 🚀 快速开始` | 30 秒 demo、验证线上、smoke test、阅读顺序 |
| 5 | **Architecture** | `## 🏗️ 架构` | 分层图 + 技术栈表 + 关键原则 |
| 6 | **Docs** | `## 📚 文档` | 文档索引表 + 文档纪律 |
| 7 | **Team** | `## 👥 团队` | 成员/角色/职责表 |
| 8 | **License** | `## 📄 许可证` | MIT / 其他 |

### Header 规范

```html
<a name="top"></a>

<p align="center">
  <h1 align="center">{项目全名}</h1>
  <p align="center"><em>{一句话英文定位}</em></p>
  <p align="center">{中文解释：面向谁、解决什么问题、核心流程、关键集成}</p>
</p>

<p align="center">
  <img src="assets/images/readme/banner.png" alt="{项目名} Banner" width="100%">
</p>
```

- Banner 比例 3:1（1200×400），无文字叠加，≤300KB，dark-theme 优先
- 徽章按语义分 3 组：入口/状态、构建/质量、社区/许可
- 统一 `shields.io`、`style=for-the-badge`、`labelColor=0f172a`
- 导航锚点用中文章节名：`#功能`、`#演示`

### Why / Features / Demo / Quick Start / Architecture / Docs / Team / License

沿用 AgentCFO 默认格式：表格驱动、可验证 curl、边界明确、mock/real 声明、专业克制。

每个核心模块末尾加 back-to-top：

```html
<p align="right">(<a href="#top">回到顶部</a>)</p>
```

---

## 可选模块（用户挑选）

以下模块按需加入。默认询问用户，或在 `polish` 模式下根据现有 README 推断。

| 模块 | 标题 | 何时加入 |
|------|------|----------|
| API 参考 | `## 🔌 API 参考` | 后端/工具库/SDK |
| 路线图 | `## 🗺️ 路线图` | 有明确阶段规划 |
| 常见问题 | `## ❓ 常见问题` | 反复被问的问题 ≥3 个 |
| 更新日志 | `## 📝 更新日志` | 有版本迭代 |
| 贡献指南 | `## 🤲 贡献指南` | 接受外部 PR |
| 安全说明 | `## 🔐 安全说明` | 处理密钥/资金/敏感数据 |
| 致谢 | `## 🙏 致谢` | 引用开源库/参考项目 |
| 赞助鸣谢 | `## 🤝 赞助鸣谢` | 有赞助方/云资源支持 |
| Built With | `## 🛠️ Built With` | 想突出技术栈 |
| 代码示例 | `## 💻 示例` | 框架/库需要可运行 snippet |
| 联系方式 | `## 📮 联系方式` | 需要公开邮箱/社交媒体 |
| 贡献者/Star | `## ⭐ 贡献者与 Star 历史` | 想展示社区增长 |
| 社交媒体 | `## 🌐 Stay in the loop` | 有官方社媒账号 |
| 下载矩阵 | `## ⬇️ 下载` | 桌面/CLI 应用跨平台分发 |
| 认证合规 | `## 🎓 认证` | 通过 OpenID/ISO 等认证 |
| 版本亮点 | `## ✨ What's New` | 新版本有重大特性或 Breaking Changes |
| 学术引用 | `## 📖 Citation` | 论文/DOI/期刊 |
| 技术伙伴 | `## 🤖 支持模型/平台` | AI/LLM 或多云集成 |
| YouTube Demo | `## 🎥 视频演示` | 有演示视频 |
| 架构图/流程图 | 嵌入 Architecture 或独立章节 | 需要可视化系统结构 |
| License Logo | 嵌入 License 章节 | 想放 License 图标 |

### 常用可选模块示例

**Built With**

```markdown
## 🛠️ Built With

* [![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)](https://nextjs.org/)
* [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)
```

**代码示例**

```markdown
## 💻 示例

```go
app := fiber.New()
app.Get("/", func(c fiber.Ctx) error {
    return c.SendString("Hello, World!")
})
log.Fatal(app.Listen(":3000"))
```

更多示例见 [`examples/`](examples/)。
```

**路线图（任务列表）**

```markdown
## 🗺️ 路线图

- [x] 完成基础功能
- [ ] 多语言支持
    - [ ] 中文
    - [ ] 英文
```

**Contributors + Star History**

```html
<a href="https://github.com/{owner}/{repo}/graphs/contributors">
  <img src="https://contrib.rocks/image?repo={owner}/{repo}" alt="contributors" />
</a>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos={owner}/{repo}&type=Date&theme=dark" />
  <img src="https://api.star-history.com/svg?repos={owner}/{repo}&type=Date" alt="Star History" />
</picture>
```

**联系方式**

```markdown
## 📮 联系方式

- **Email**: [hello@example.com](mailto:hello@example.com)
- **Website**: [https://example.com](https://example.com)
- **Twitter/X**: [@example](https://x.com/example)
```

---

## 自动补充模块（按项目类型）

检测到对应场景时**自动加入**，不需要逐一向用户确认。

| 项目类型 | 自动补充模块 | 判断依据 |
|----------|--------------|----------|
| **SDK / Library / CLI 工具** | Installation、Examples、API Reference | 存在 `package.json`/`pyproject.toml`/`Cargo.toml`/go module；项目名像库；用户提到"install" |
| **Desktop / Mobile 应用** | Download 矩阵、Installation、截图画廊 | 存在 release/`.dmg`/`.exe`/`.apk`；跨平台分发 |
| **Web app / SaaS** | Demo 链接、Architecture、Quick Start | 存在 `frontend/`、`app/`、部署配置 |
| **AI / LLM 工具** | Provider Logo 墙、Privacy 对比表、支持模型表 | 调用 OpenAI/Anthropic/Ollama 等；`models/` 或 `llm/` 目录 |
| **Security / Auth / Crypto** | Certification 表、Security 说明、Breaking Changes | 涉及 OIDC/JWT/签名/链上交易/密钥 |
| **学术 / 研究项目** | DOI badge、Citation、License Logo | 存在论文、Zenodo、JORS 引用 |
| **开源社区项目** | Contributors、Star History、Contact、Social links | 公开接受 PR；有 Discussion/Discord |
| **有赞助/资助** | Sponsors、Supporters tier、Star CTA | 用户提到赞助方、云资源、GitHub Sponsors |
| **性能敏感型** | Benchmarks、Metrics 证据 | 框架/引擎/数据库；用户提到性能 |
| **中间件 / 插件生态** | Middleware/Feature 大表、Awesome List 链接 | 存在 `middleware/`/`plugins/` 目录 |
| **多语言 / 国际化** | 翻译旗帜入口、i18n 说明 | 存在 `locales/`、翻译 issue |
| **近期有重大版本变更** | What's New、Breaking Changes | `CHANGELOG.md` 或 releases 中有 breaking changes |

### 自动补充规则示例

- **SDK/Library**: Header 后紧接 `## 📦 安装` 和 `## 💻 示例`，再加 API 参考。
- **Desktop app**: Demo 后加 `## ⬇️ 下载`，包含 Windows/macOS/Linux 架构矩阵。
- **AI tool**: Features 后加 Provider Logo 墙和隐私对比表（Cloud vs Local）。
- **Security/Auth**: Architecture 后加 `## 🎓 认证` 表格，License 前加 Security 说明。
- **Sponsored**: Team 前加 `## 🤝 赞助鸣谢` 和 `## ☕ Supporters`。

### 模块插入顺序

所有模块按以下相对顺序排列（核心模块固定，可选/自动模块插入到最近的核心模块附近）：

```
Header
├── Built With（可选/自动：SDK/Web）
├── 折叠 TOC（可选）
├── Star CTA / Social share（可选：开源社区/有赞助）
├── Why
├── Features
├── Provider Logo 墙 / Privacy 表（自动：AI tool）
├── Demo
├── 下载矩阵（自动：Desktop app）
├── Quick Start
├── 安装（自动：SDK/Library/Desktop）
├── 示例（自动：SDK/Library）
├── Architecture
├── API 参考（自动：SDK/Library/后端）
├── 认证（自动：Security）
├── 路线图（可选）
├── FAQ（可选）
├── Docs
├── 赞助鸣谢 / Supporters（可选/自动）
├── 团队
├── Contributors / Star History（可选：开源社区）
├── 联系方式 / Social links（可选/自动）
├── 更新日志 / What's New（可选）
├── 贡献指南（可选）
├── 安全说明（自动/可选：Security/密钥）
├── 致谢（可选）
├── Citation（自动：学术）
└── License
```

---

## 执行流程

### Phase 1：理解项目

1. 读取项目骨架：`package.json` / `Cargo.toml` / `pyproject.toml` / `go.mod` / `foundry.toml` 等
2. 读取已有 `README.md`（`polish` 模式）
3. 确认：
   - 项目全称 + 一句话英文定位 + 中文解释
   - 技术栈、核心功能、目标受众
   - Demo/API/License 链接
   - 赞助方、合作方、常见问题
4. **判断项目类型**（可多选）：SDK / Web app / Desktop app / AI tool / Security / Academic / Community / Sponsored / Performance / Middleware / i18n
5. **信息纪律**：只使用从项目文件或用户处获得的真实信息。不要编造版本号、URL、端点、文件路径。缺失信息用 `{占位符}` 标注，例如 `{owner}/{repo}`、`{demo-url}`、`{api-url}`。

向用户简要列出：项目类型 + 将自动补充的模块 + 建议的可选模块。确认后进入 Phase 2。

### Phase 2：组装 README

按以下顺序生成：

1. **核心模块**：按固定顺序输出 Header → Why → Features → Demo → Quick Start → Architecture → Docs → Team → License
2. **自动补充模块**：根据项目类型插入到合适位置
3. **可选模块**：询问用户或从现有 README 推断
4. **视觉资产**：生成/确认 Banner、截图、Logo、Provider icons

每完成一个模块，向用户确认一次，再进入下一模块。

### Phase 3：最终检查

运行「自检清单」，修复问题后交付。

---

## 格式规范

### Banner

- 3:1 比例，例如 1200×400，保存到 `assets/images/readme/banner.png`
- 无文字叠加，dark-theme 优先，≤300KB，必须写 `alt`

### Badges

- 统一 `shields.io`、`style=for-the-badge`、`labelColor=0f172a`
- 分组：入口/状态、构建/质量、社区/许可
- 配色语义：绿=完成/Live、蓝=技术/API、紫=赛道、黄=License/注意、红=警告、灰=实验

### 表格

- 状态列居中 `|:---:|`
- 数字/金额右对齐 `|---:|`
- 表头中英文对照

### 图片网格

- 3 列默认：`|:---:|:---:|:---:|`
- 点击放大：`[![alt](thumb)](full)`
- 每张图配标题 + 一句话说明 + 链接

### `<details>` 折叠

- 只放细节/分支/可选信息
- `summary` 一句话概括
- 避免嵌套超过一层

### 专业表达

- 边界清晰："默认 mock mode"、"blocked 项不进 adapter"
- 可验证：curl 给出预期返回值，tx hash 链到 explorer
- 专业克制：不用 "revolutionary"、"seamless"、"best-in-class"；用具体指标

---

## 已有 README 时的处理（polish 模式）

1. 读取现有 `README.md` 的完整内容
2. 标记缺失的核心模块
3. **保留有效内容**：项目故事、特殊表达、已有截图、团队信息、联系方式等不要删除
4. 推断可选模块：现有 README 中已有的章节（如 FAQ、Changelog、Contributing）应保留或升级，不要无故删除
5. 按 AgentCFO 风格补全，并应用自动补充模块
6. 生成变更清单和 diff 给用户确认

### 反幻觉规则

- 不要为项目编造不存在的版本号、域名、API 端点、CI 链接或测试覆盖率
- 如果 `package.json` / `pyproject.toml` 不存在 `requirements.txt`，不要编造 `pip install -r requirements.txt`
- 如果项目没有真实 Demo 链接，使用 `{demo-url}` 占位并提示用户填写
- API 端点优先从代码中的路由推断；无法推断时使用 `/api/{endpoint}` 占位
- 所有 curl 示例必须给出预期返回值，但返回值必须合理（不确定时标注 `{expected-response}`）

---

## 自检清单

交付前逐项确认：

- [ ] Header 有标题 + 英文定位 + 中文解释 + Banner + 徽章 + 导航
- [ ] 顶部有 `<a name="top"></a>` 锚点
- [ ] 每个一级章节末尾有 back-to-top
- [ ] Banner 无文字叠加、`alt` 正确、≤300KB
- [ ] 徽章分组合理、≤5 个/行、配色语义一致
- [ ] 所有外部链接使用 HTTPS
- [ ] 内部相对链接路径正确
- [ ] 所有 curl 都有预期返回值
- [ ] 表格列对齐，状态居中，数字右对齐
- [ ] mock / real 边界明确
- [ ] 敏感信息没有硬编码
- [ ] 截图路径指向 `assets/images/readme/`
- [ ] 图片网格每张图有 alt、标题、说明、可点击放大
- [ ] `<details>` 只放细节，核心信息外露
- [ ] FAQ 每个回答有事实依据
- [ ] 赞助鸣谢有免责声明和明确关系
- [ ] 二级标题不加 emoji，没有 `####`
- [ ] 中文与技术英文混排自然
- [ ] 没有夸张营销词汇
- [ ] 代码示例可直接复制运行
- [ ] 自动补充模块已按项目类型加入

---

## 路由

1. 解析 `$ARGUMENTS` 第一个词：`create` 或 `polish`
2. `create`：从零生成，先询问项目类型，再按模块体系组装
3. `polish`：读取现有 README.md，标记缺失模块，迭代优化
4. 缺省参数时询问用户
