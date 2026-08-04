# README 出图规范 · threetwoa-blogs

可投喂 GPT image-to-image / MiniMax。视觉标准对齐 `readme-polish/references/visual-standards.md`。

## §0 全局规范

**项目定位**：Valaxy + Sakura 静态博客增强模板（数字花园）。

**视觉总调**：

- 色板（≤6）：Sakura rose `#E89AB5` · Ink `#1E2430` · Paper `#F7F4F2` · Slate `#5C667A` · Mint `#3D9B8F` · White
- 材质：扁平信息图、统一圆角 8–12px、细正交连线
- 光影：克制；无霓虹、无玻璃拟态堆叠

**命名契约**：`banner|features|architecture|tech-stack|workflow|structure.png` → `assets/images/readme/`

**系统指令模板**：

```
You are generating a professional README diagram for a developer blog template.
Palette only: #E89AB5, #1E2430, #F7F4F2, #5C667A, #3D9B8F, #FFFFFF.
Flat infographic, consistent stroke weight, orthogonal arrows, readable English+Chinese labels.
No purple gradients, no fake UI screenshots, no spider-web lines, no decorative clutter.
```

**出图优先级**：banner → features → architecture → tech-stack → workflow → structure

---

## 1. banner.png

- **比例**：21:9 或 16:9（README 横幅）
- **一句话**：樱色数字花园横幅，品牌 threetwoa-blogs + 一句价值主张
- **英文 Prompt**：
  `Wide README banner 21:9, soft paper background #F7F4F2, left large wordmark "threetwoa-blogs", subtitle "Valaxy + Sakura digital garden", subtle sakura petal geometric motif in #E89AB5, ink accents #1E2430, generous whitespace, professional brand system look, flat vector, no screenshots, no purple`
- **中文补充**：少字、大留白；勿堆 Stage 列表

## 2. features.png

- **一句话**：六宫格核心能力（图表 / 首页动态 / 灯箱 / 导航 / 搜索 / 相册）
- **英文 Prompt**：
  `README features infographic, 2x3 cards on #F7F4F2, unified line icons, titles: Categories Charts, Home Dynamics, Image Lightbox, Site Navigation, Fuse Search, Gallery WebDAV, short one-line captions, palette sakura rose ink slate mint, flat, no photos`
- **中文补充**：图标同一描边体系

## 3. architecture.png

- **标杆倾向**：水平分层流（非微服务大杂烩）
- **一句话**：Markdown → Valaxy → Sakura → 扩展层 → SSG dist → 多平台托管
- **英文 Prompt**：
  `Horizontal layered architecture diagram for static blog: boxes Markdown/pages → Valaxy 0.28 → Sakura Theme → Custom components/plugins → SSG dist/ → GitHub Pages/Vercel/Netlify/Docker, orthogonal arrows left to right, labels clear, palette #E89AB5 #1E2430 #F7F4F2 #3D9B8F, ByteByteGo clarity, no spider web`
- **中文补充**：节点名用真实技术名

## 4. tech-stack.png

- **一句话**：技术栈分层条或图标墙
- **英文 Prompt**：
  `Tech stack layered strip diagram: Framework Valaxy Vue3 Vite TypeScript | Theme Sakura UnoCSS SCSS | Libs ECharts Giscus Fuse VueUse | Deploy pnpm GitHub Actions Vercel Netlify Docker, icon wall or horizontal layers, labels exact, soft paper bg, sakura rose accents, flat`
- **中文补充**：与 architecture 构图区分（栈 vs 拓扑）

## 5. workflow.png

- **一句话**：Obsidian 草稿 → Skill → R2 → posts → Valaxy build → 线上站点
- **英文 Prompt**：
  `Linear workflow flowchart: Obsidian Draft → publish skill → Cloudflare R2 images → pages/posts Markdown → Valaxy SSG build → Live site daily.yybb.us, start/end rounded, one main path, max one decision diamond optional, sakura rose and mint accents, paper background, clean SIPOC-like clarity`
- **中文补充**：主路径一条，分支≤1

## 6. structure.png

- **一句话**：仓库关键目录树可视化
- **英文 Prompt**：
  `Repository folder tree diagram: root threetwoa-blogs with pages/, components/, layouts/, plugins/, styles/, docs/, assets/, site.config.ts, valaxy.config.ts, color-coded folders vs files, orthogonal connectors, paper background, ink labels, sakura accent on root, clean org-chart tree style`
- **中文补充**：README 仍须另附 Markdown 树（本图辅助）

## Showcase（截图，不生图）

| 文件 | method |
|------|--------|
| showcase-home.jpg | screenshot（已有） |
| showcase-categories.jpg | screenshot（已有） |
| showcase-navigation.jpg | screenshot（已有） |

**禁止**用说明图冒充 Showcase。Preview Gallery 本仓省略，无 `preview-shell.png`。
