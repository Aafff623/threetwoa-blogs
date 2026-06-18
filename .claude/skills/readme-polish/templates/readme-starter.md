<a name="top"></a>

# {项目全名}

<p align="center">
  <h1 align="center">{项目全名}</h1>
  <p align="center"><em>{一句话英文定位}</em></p>
  <p align="center">{中文解释：面向谁、解决什么问题、核心流程、关键集成}</p>
</p>

<p align="center">
  <img src="assets/images/readme/banner.png" alt="{项目名} Banner" width="100%">
</p>

<!-- 入口与状态徽章 -->
<p align="center">
  <a href="{demo-url}"><img src="https://img.shields.io/badge/Demo-Live-059669?style=for-the-badge&labelColor=0f172a" alt="Live Demo"></a>
  <a href="{api-url}"><img src="https://img.shields.io/badge/API-Online-3B82F6?style=for-the-badge&labelColor=0f172a" alt="API"></a>
  <img src="https://img.shields.io/badge/赛道-{赛道名}-8B5CF6?style=for-the-badge&labelColor=0f172a" alt="Track">
</p>

<!-- 构建与质量徽章（有 CI / 测试 / 覆盖率时启用） -->
<p align="center">
  <a href="{ci-url}"><img src="https://img.shields.io/github/actions/workflow/status/{owner}/{repo}/ci.yml?branch=main&style=for-the-badge&labelColor=0f172a" alt="CI"></a>
  <a href="{coverage-url}"><img src="https://img.shields.io/codecov/c/github/{owner}/{repo}?style=for-the-badge&labelColor=0f172a" alt="Coverage"></a>
</p>

<!-- 社区与许可徽章 -->
<p align="center">
  <a href="{repo-url}/stargazers"><img src="https://img.shields.io/github/stars/{owner}/{repo}.svg?style=for-the-badge&labelColor=0f172a" alt="GitHub stars"></a>
  <img src="https://img.shields.io/badge/License-{MIT}-yellow.svg?style=for-the-badge" alt="License">
</p>

<p align="center">
  <a href="#功能">功能</a> ·
  <a href="#演示">演示</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="#架构">架构</a> ·
  <a href="#api-参考">API 参考</a> ·
  <a href="#常见问题">常见问题</a> ·
  <a href="#文档">文档</a> ·
  <a href="#团队">团队</a> ·
  <a href="#更新日志">更新日志</a> ·
  <a href="#贡献指南">贡献指南</a> ·
  <a href="#安全说明">安全说明</a> ·
  <a href="#致谢">致谢</a>
</p>

---

<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#为什么需要">为什么需要</a></li>
    <li><a href="#功能">功能</a></li>
    <li><a href="#演示">演示</a></li>
    <li><a href="#快速开始">快速开始</a></li>
    <li><a href="#架构">架构</a></li>
    <li><a href="#api-参考">API 参考</a></li>
    <li><a href="#路线图">路线图</a></li>
    <li><a href="#常见问题">常见问题</a></li>
    <li><a href="#文档">文档</a></li>
    <li><a href="#团队">团队</a></li>
    <li><a href="#许可证">许可证</a></li>
  </ol>
</details>

---

<!-- 核心模块：每个 README 都必须保留 -->

## 🤔 为什么需要 {项目名}

{目标用户} 经常遇到：

- {痛点 1}
- {痛点 2}
- {痛点 3}

**{项目名} 的核心边界：**

| 组件 | 职责 |
| ---- | ---- |
| {组件 A} | {职责} |
| {组件 B} | {职责} |
| {组件 C} | {职责} |

```text
{输入} → {处理} → {输出}
```

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## ✨ 功能

| 功能 | 说明 |
| ---- | ---- |
| **{功能 1}** | {说明} |
| **{功能 2}** | {说明} |
| **{功能 3}** | {说明} |

**{场景} 匹配：**

| 方向 | {项目名} 如何匹配 |
| ---- | ---------------- |
| {方向 1} | {匹配说明} |
| {方向 2} | {匹配说明} |

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 🎬 演示

### Demo 场景

| 对象 | 类型 | 说明 | 金额 |
| ---- | ---- | ---- | ---: |
| {对象 A} | {类型} | {说明} | {数值} |
| {对象 B} | {类型} | {说明} | {数值} |

### Showcase — Landing Page

| | | |
|:---:|:---:|:---:|
| [![Hero](assets/images/readme/landing-hero.png)](assets/images/readme/landing-hero.png)<br><br>**Hero**<br>首屏价值主张与 CTA<br>[Live Demo]({demo-url}) | [![Pipeline](assets/images/readme/landing-pipeline.png)](assets/images/readme/landing-pipeline.png)<br><br>**Pipeline**<br>核心流程可视化<br>[Live Demo]({demo-url}) | [![Feature](assets/images/readme/landing-feature.png)](assets/images/readme/landing-feature.png)<br><br>**Feature**<br>关键能力展示<br>[Live Demo]({demo-url}) |

### Demo Video

**[▶ 在线观看]({video-url})** — {一句话说明}。

源文件：[`assets/video/demo.mp4`](assets/video/demo.mp4)

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 🚀 快速开始

### 30 秒看 Demo

```bash
git clone {repo-url}
cd {project}/frontend
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。

### 验证线上服务

```bash
curl {api-url}/health
```

预期返回：`{"status":"ok"}`

### 新队友阅读顺序

| 顺序 | 路径 | 目的 |
| ---- | ---- | ---- |
| 1 | `README.md` | 项目概览 |
| 2 | `CLAUDE.md` / `AGENTS.md` | 团队边界 |
| 3 | `docs/` | 技术文档 |

<details>
<summary>Windows — 本地开发</summary>

```powershell
git clone {repo-url}
cd {project}
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python -m pytest -q
.venv\Scripts\python -m uvicorn app.main:app --reload
```

</details>

<details>
<summary>macOS / Linux — 本地开发</summary>

```bash
git clone {repo-url}
cd {project}
python -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -m pytest -q
.venv/bin/python -m uvicorn app.main:app --reload
```

</details>

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

<!-- 自动补充模块：SDK / Library / CLI 工具 / 桌面应用时才启用 -->

## 📦 安装

<!-- 如不需要本章节，直接删除 -->

```bash
# 示例：npm
npm install {package-name}

# 示例：pip
pip install {package-name}

# 示例：go
go get github.com/{owner}/{repo}
```

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 🏗️ 架构

```text
Frontend
  → Backend API
    → Module A
    → Module B
    → Module C
```

| 层 | 技术 | 部署 |
| -- | ---- | ---- |
| Frontend | {技术栈} | {平台} |
| Backend | {技术栈} | {平台} |

**关键原则：**

- {原则 1}
- {原则 2}
- {原则 3}

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 🔌 API 参考

### 核心端点

| Endpoint | Method | 说明 |
| -------- | ------ | ---- |
| `/api/{endpoint}` | POST | {说明} |

<details>
<summary>curl 示例</summary>

```bash
curl -X POST {api-url}/api/{endpoint} \
  -H "Content-Type: application/json" \
  -d '{"key":"value"}'
```

</details>

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

<!-- 可选模块：框架/库/SDK 建议启用 -->

## 💻 示例

<!-- 如不需要本章节，直接删除 -->

### 基础用法

```python
from {package} import {Client}

client = {Client}()
result = client.run("hello")
print(result)
```

更多示例见 [`examples/`](examples/)。

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 🗺️ 路线图

| 阶段 | 状态 | 要点 |
| ---- | ---- | ---- |
| **P0** | ✅ 完成 | {要点} |
| **P1** | 🚧 进行中 | {要点} |
| **P2** | 🔜 待规划 | {要点} |

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## ❓ 常见问题

<details>
<summary>Q: {问题 1}？</summary>

A: {回答，必须有事实依据}。
</details>

<details>
<summary>Q: {问题 2}？</summary>

A: {回答}。
</details>

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 📚 文档

| 文档 | 说明 |
| ---- | ---- |
| `docs/ARCHITECTURE.md` | 架构详情 |
| `docs/DEPLOYMENT.md` | 部署说明 |
| `docs/ENV_VARS.md` | 环境变量 |

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 🤝 赞助鸣谢

<!-- 如不需要本章节，直接删除 -->

感谢以下伙伴为本项目提供资源与支持：

| 赞助方 | 支持内容 | 关系说明 |
| ------ | -------- | -------- |
| [{赞助方}]({url}) | {支持内容} | {关系} |

> **非商业赞助声明**：上表所列仅为技术集成或资源支持方，不构成投资、代言或商业合作关系。

<p align="right">(<a href="#top">回到顶部</a>)</p>

---

## 👥 团队

| 头像 | 姓名 | 角色 | 职责 |
| ---- | ---- | ---- | ---- |
| <img src="assets/images/readme/team/{avatar}.png" width="80" alt="{姓名} avatar"> | **{姓名}** | {角色} | {职责} |

---

## ⭐ 贡献者与 Star 历史

<!-- 如不需要本章节，直接删除 -->

<a href="https://github.com/{owner}/{repo}/graphs/contributors">
  <img src="https://contrib.rocks/image?repo={owner}/{repo}" alt="contributors" />
</a>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos={owner}/{repo}&type=Date&theme=dark" />
  <img src="https://api.star-history.com/svg?repos={owner}/{repo}&type=Date" alt="Star History" />
</picture>

---

## 📝 更新日志

| 版本 | 日期 | 变更 |
| ---- | ---- | ---- |
| **v0.1.0** | 2026-06-18 | 初始版本 |

---

## 🤲 贡献指南

欢迎 Issue 和 PR。

1. Fork 本仓库
2. 创建分支：`git checkout -b feat/your-feature`
3. 提交改动：`git commit -m "feat: ..."`
4. 推送分支：`git push origin feat/your-feature`
5. 创建 Pull Request

---

## 🔐 安全说明

- 本仓库默认以 `mock` mode 运行
- 不要将 `.env`、API key 提交到 Git
- 发现安全漏洞请邮件 `{security-email}`，不要公开提 Issue

---

## 🙏 致谢

感谢以下开源项目/社区为本项目提供灵感或基础能力：

| 名称 | 关系 |
| ---- | ---- |
| [{project}]({url}) | {关系说明} |

---

## 📮 联系方式

<!-- 如不需要本章节，直接删除 -->

- **Email**: [hello@example.com](mailto:hello@example.com)
- **Website**: [https://example.com](https://example.com)
- **Twitter/X**: [@example](https://x.com/example)

项目地址：[https://github.com/{owner}/{repo}](https://github.com/{owner}/{repo})

---

## 📄 许可证

[{License}](LICENSE)

---

<p align="right">(<a href="#top">回到顶部</a>)</p>

Made with ❤️ by {团队名}
