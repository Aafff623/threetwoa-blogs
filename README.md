<p align="center">
  <h1 align="center">threetwoa-blogs</h1>
  <p align="center"><em>A Valaxy static blog with Sakura theme and progressive UI enhancements</em></p>
  <p align="center">基于 <strong>Valaxy + Sakura 主题</strong> 的静态博客模板，从分类/标签/归档可视化，到公告栏、随机文章、灯箱、友链、导航、搜索修复、相册页面与构建优化，系统性地把默认主题打磨成一套可直接落地的个人博客方案。</p>
</p>

<p align="center">
  <img src="assets/images/readme/banner.jpg" alt="threetwoa-blogs banner" width="100%">
</p>

<p align="center">
  <a href="https://daily.yybb.us/"><img src="https://img.shields.io/badge/Demo-Live-059669?style=for-the-badge&labelColor=0f172a" alt="Live Demo"></a>
  <a href="https://github.com/Aafff623/threetwoa-blogs/actions/workflows/gh-pages.yml"><img src="https://img.shields.io/github/actions/workflow/status/Aafff623/threetwoa-blogs/gh-pages.yml?branch=master&style=for-the-badge&labelColor=0f172a" alt="GitHub Pages CI"></a>
  <a href="https://github.com/Aafff623/threetwoa-blogs/stargazers"><img src="https://img.shields.io/github/stars/Aafff623/threetwoa-blogs.svg?style=for-the-badge&labelColor=0f172a" alt="GitHub Stars"></a>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&labelColor=0f172a" alt="License">
</p>

<p align="center">
  <a href="#为什么需要-threetwoa-blogs">为什么</a> ·
  <a href="#功能">功能</a> ·
  <a href="#演示">演示</a> ·
  <a href="#从-obsidian-到博客">写作流</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="#架构">架构</a> ·
  <a href="#路线图">路线图</a> ·
  <a href="#文档">文档</a> ·
  <a href="#作者">作者</a> ·
  <a href="#许可证">许可证</a>
</p>

---

## 为什么需要 threetwoa-blogs

Valaxy 是一款优秀的 Vue 静态博客框架，但默认 Sakura 主题开箱即用的功能和视觉细节，往往无法满足个人博客的个性化需求。如果你希望：

- 分类、标签、归档页面有数据可视化，而不是纯文本列表
- 首页有公告栏、随机文章轮播等动态模块
- 图片预览、友链、留言板、网址导航、相册等交互更精致
- 搜索稳定可用，构建流程不再卡死

那么一个已经过系统增强的博客模板，能显著降低从零折腾的成本。

**threetwoa-blogs 的核心边界：**

| 文件/目录 | 职责 |
| --------- | ---- |
| `site.config.ts` | 站点元数据：URL、语言、标题、作者、社交链接、搜索、评论 |
| `valaxy.config.ts` | 框架/主题配置：主题、UnoCSS safelist、导航、Hero、插件、构建选项 |
| `pages/` | 文件系统路由：文章、归档、分类、标签、友链、导航、搜索、相册等 |
| `components/` | 自动注册的自定义组件，覆盖或扩展主题默认组件 |
| `styles/` | 自定义样式与 CSS 变量，覆盖 Sakura 主题默认风格 |
| `plugins/` | 自定义 Vite 插件：FOUC 加载动画、WebDAV 相册配置与代理 |

```text
Markdown 文章 → Valaxy 构建 → Vite/Vue SSG → 静态站点 → GitHub Pages / Vercel / Netlify / Docker
```

---

## 功能

### 功能演进时间线

| Stage | 主题 | 能力 |
| :---: | ---- | ---- |
| **🌸 1** | 数据可视化 | 分类 / 标签 / 归档 ECharts 图表 |
| **✨ 2** | 首页动态 | 公告栏 + 随机文章轮播 |
| **🛡️ 3** | 加载体验 | FOUC Guard 加载过渡，告别白屏 |
| **🔍 4** | 交互增强 | 文章图片灯箱预览、缩放、滑动 |
| **🤝 5** | 友链页面 | 卡片式友链 + 留言板 |
| **💌 6** | 留言板 | 信封展开动画 |
| **🧭 7** | 网址导航 | 站点导航 + 随机网站跳转抽卡 |
| **⏱️ 8** | 搜索修复 | 页脚运行倒计时 + Fuse 搜索 |
| **🖼️ 9** | 相册页面 | 本地 / WebDAV 图源、加密访问、时间轴 |
| **🚀 10** | 构建优化 | SSG 构建卡死修复 |

### 场景匹配

| 方向 | threetwoa-blogs 如何匹配 |
| ---- | ------------------------ |
| 个人技术博客 | 文章 + 标签/分类/归档体系，RSS 与 Fuse 搜索 |
| 视觉向博客 | Sakura 主题 + ECharts + 动画 + 灯箱 |
| 多平台部署 | GitHub Pages / Vercel / Netlify / Docker 配置内置 |

---

## 演示

### 在线站点

| 页面 | 说明 | 预览 |
| ---- | ---- | ---- |
| 首页 | 公告栏、随机文章、文章列表、页脚倒计时 | [Live](https://daily.yybb.us/) |
| 分类页 | ECharts 环状图 / 列表视图 | [Live](https://daily.yybb.us/categories) |
| 导航页 | 站点导航 + 随机网站跳转 | [Live](https://daily.yybb.us/navigation) |
| 相册页 | 本地/WebDAV 相册、加密访问、时间轴 | [Live](https://daily.yybb.us/gallery) |

### Showcase

| | | |
|:---:|:---:|:---:|
| [![首页](assets/images/readme/screenshot-home.jpg)](assets/images/readme/screenshot-home.jpg)<br><br>**首页**<br>公告栏与文章列表<br>[查看 Live](https://daily.yybb.us/) | [![分类页](assets/images/readme/screenshot-categories.jpg)](assets/images/readme/screenshot-categories.jpg)<br><br>**分类页**<br>ECharts 可视化<br>[查看 Live](https://daily.yybb.us/categories) | [![导航页](assets/images/readme/screenshot-navigation.jpg)](assets/images/readme/screenshot-navigation.jpg)<br><br>**导航页**<br>网址导航与随机跳转<br>[查看 Live](https://daily.yybb.us/navigation) |

---

## 从 Obsidian 到博客

文章在 Obsidian 知识库中以草稿形式编写，通过 `.claude/skills/publish-obsidian-post.md` 发布到本仓库。

```text
Obsidian Draft
  → publish-obsidian-post Skill
    → 配图上传 R2
    → frontmatter 规范化
    → 写入 pages/posts/<slug>.md
      → Valaxy 构建
        → 静态站点发布
```

| 仓库 | 角色 | 可见性 |
| ---- | ---- | ---- |
| `threetwoa-ob-brain` | Obsidian 知识库 / 草稿源站 | Private |
| `threetwoa-blogs` | 正式发布站点 | Public |
| `threetwoa-blog-assets` | 配图与资源托管（Cloudflare R2） | Public-read |

**发布流程：**

1. 在 Obsidian 的 `Blog/Drafts/<article-folder>/` 下创建 `article.md` 和 `assets/` 配图。
2. 触发发布 skill，读取草稿并补全 frontmatter（title、date、categories、tags、description）。
3. 将 `![[image.png]]` 中的配图上传到 R2，替换为标准 Markdown 图片链接。
4. 写入 `pages/posts/<slug>.md` 并提交到博客仓库。
5. CI 自动构建并部署到线上站点。

单张图片上传也可使用 `.claude/skills/upload-image-to-r2.md`。详见 [`docs/image-assets-guide.md`](docs/image-assets-guide.md)。

---

## 快速开始

### 30 秒本地预览

```bash
git clone https://github.com/Aafff623/threetwoa-blogs.git
cd threetwoa-blogs
pnpm install
pnpm dev
```

打开 [http://localhost:4859](http://localhost:4859)。

### 常用命令

| 命令 | 作用 |
| ---- | ---- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建 SSG 站点到 `dist/` |
| `pnpm build:spa` | 构建 SPA 版本 |
| `pnpm serve` | 预览生产构建 |
| `pnpm rss` | 生成 RSS 订阅 |
| `pnpm fuse` | 生成 Fuse 搜索索引 |

### 生产构建验证

```bash
pnpm build
pnpm serve
```

预期结果：

- `dist/` 目录生成完整静态站点
- `pnpm serve` 后访问默认端口可正常浏览

---

## 架构

```text
┌─────────────────────────────────────────────────────────────┐
│                         静态站点输出                            │
│                     (dist/ → GitHub Pages)                    │
└───────────────────────────┬─────────────────────────────────┘
                            │ Valaxy CLI (build --ssg)
┌───────────────────────────▼─────────────────────────────────┐
│                     Valaxy Framework                          │
│  文件系统路由 · 组件自动注册 · Vite · Vue 3 · UnoCSS           │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   valaxy-theme-sakura                         │
│  首页 · 文章页 · 列表页 · 搜索 · 布局系统                      │
└───────────────────────────┬─────────────────────────────────┘
                            │ 组件覆盖 / 主题配置
┌───────────────────────────▼─────────────────────────────────┐
│                      用户自定义层                              │
│  components/ · pages/ · layouts/ · styles/ · valaxy.config.ts │
└─────────────────────────────────────────────────────────────┘
```

| 层 | 技术 | 说明 |
| -- | ---- | ---- |
| 框架层 | Valaxy 0.28.11 | 静态博客生成、路由、构建 |
| 主题层 | valaxy-theme-sakura | Sakura 视觉风格与基础页面 |
| 扩展层 | Vue 3 / TypeScript / UnoCSS | 自定义组件、布局覆盖、样式变量 |
| 可视化 | ECharts 6.x | 分类/标签/归档图表 |
| 部署层 | GitHub Actions / Vercel / Netlify / Docker | 多平台静态托管 |

**关键原则：**

- **配置分离**：`site.config.ts` 管站点元数据，`valaxy.config.ts` 管框架/主题
- **组件覆盖优先**：通过 `components/` 和 `layouts/` 覆盖主题默认组件，避免改源码
- **图标安全清单**：动态 Iconify 图标必须加入 `valaxy.config.ts` 的 `safelist`
- **搜索索引**：发布前运行 `pnpm fuse` 生成 Fuse 搜索数据

---

## 路线图

| 阶段 | 状态 | 要点 |
| ---- | ---- | ---- |
| **Stage 1-7** | ✅ 完成 | 分类/标签/归档图表、公告栏、随机文章、加载动画、图片灯箱、友链、留言板、导航页 |
| **Stage 8** | ✅ 完成 | 页脚运行倒计时、Fuse 搜索修复、搜索页面 |
| **Stage 9** | ✅ 完成 | 相册页面，支持本地图床与 WebDAV 图源、加密访问、时间轴展示 |
| **Stage 10** | ✅ 完成 | 修复 SSG 构建结束卡死问题 |
| **Next** | 📝 计划中 | 内容个性化、更多原创文章、搜索体验进一步优化 |

---

## 文档

| 文档 | 说明 |
| ---- | ---- |
| `CLAUDE.md` | 项目概述、常用命令、架构约定、部署说明 |
| `CONTEXT.md` | 项目语境与领域语言定义 |
| `LANGUAGE.md` | 词汇表与命名约定 |
| `docs/image-assets-guide.md` | 图片资源管理规范：R2 目录结构、命名规则、上传脚本用法 |
| `.claude/skills/publish-obsidian-post.md` | 从 Obsidian 知识库发布博客文章的完整流程 |
| `.claude/skills/upload-image-to-r2.md` | 单张图片上传到 Cloudflare R2 的 Skill |
| `docs/adr/` | 架构决策记录 |
| `docs/tutorials/` | 各阶段美化教程笔记 |

### 图片资源管理

博客图片托管在 **Cloudflare R2**（bucket: `threetwoa-blog-assets`），通过 `scripts/upload-to-r2.ps1` 上传。

文章配图按 `blog/YYYY/MM/<post-slug>/image.png` 组织，上传后返回 Markdown 链接直接插入文章。详见 [`docs/image-assets-guide.md`](docs/image-assets-guide.md)。

---

## 作者

| Avatar | 姓名 | 角色 | 职责 |
| ------ | ---- | ---- | ---- |
| <img src="https://github.com/Aafff623.png" width="80" alt="Aafff623 avatar"> | **threetwoa** | 作者/维护者 | 项目规划、前端美化、部署、内容 |

- GitHub: [@Aafff623](https://github.com/Aafff623)
- 博客: [daily.yybb.us](https://daily.yybb.us/)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Aafff623/threetwoa-blogs&type=Date)](https://star-history.com/#Aafff623/threetwoa-blogs&Date)

---

## 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

---

Made with ❤️ by [threetwoa](https://github.com/Aafff623)
