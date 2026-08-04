# README 配图 Brief · threetwoa-blogs

契约层：章节地图 + 资产清单 + 设计语言 + 验收。执行层 Prompt 见同目录 `readme-image-prompts.md`。

## 产品一句话

Valaxy + Sakura 增强静态博客模板：可视化归档、首页动态、灯箱、导航、搜索、相册与可落地部署。

## 章节地图 ↔ 配图

| README 章节 | 图 | 必需 |
|-------------|-----|:----:|
| Header | `banner.png` | ✓ |
| 功能 | `features.png` | ✓ |
| Preview | （声明省略 Gallery） | — |
| Showcase | `showcase-home.jpg` 等实机图 | ✓（已有） |
| 架构 | `architecture.png` | ✓ |
| 技术栈 | `tech-stack.png` | ✓ |
| 写作流 / 主链路 | `workflow.png` | ✓ |
| 目录结构 | `structure.png` + README 代码树 | ✓ |

## 资产清单（落盘）

路径：`assets/images/readme/`

| 文件 | 来源 | 状态 |
|------|------|------|
| banner.png | GenerateImage（MiniMax API key 无效回退） | ✅ |
| features.png | GenerateImage 回退 | ✅ |
| architecture.png | GenerateImage 回退 | ✅ |
| tech-stack.png | GenerateImage 回退 | ✅ |
| workflow.png | GenerateImage 回退 | ✅ |
| structure.png | GenerateImage 回退 | ✅ |
| showcase-*.jpg | 既有真机截图 | ✅ |
| banner.jpg / screenshot-* | 历史资产 | 保留 |

## 设计语言

| 项 | 取值 |
|----|------|
| 气质 | 数字花园 · 克制樱色 · 技术信息图（非插画堆叠） |
| 主色 | Sakura rose `#E89AB5` |
| 辅色 | Ink `#1E2430` · Soft paper `#F7F4F2` · Slate `#5C667A` · Accent mint `#3D9B8F` |
| 否决 | 紫靛渐变墙、彩虹图标、蜘蛛网连线、假 UI 冒充 Showcase |
| Architecture 标杆 | layered / client-server 混合为「内容→框架→主题→扩展→SSG→托管」水平流 |
| Preview | **省略** Gallery；仅 README 预览壳 `preview-readme.html` |

## Preview / Showcase

- Preview Gallery：不适用（单产品博客）  
- Showcase：首页 / 分类 / 导航实机截图  
- README 壳：端口 **8094**

## 验收

- [x] 六张契约 PNG 已落盘并引用  
- [x] Showcase 为真机图，非生图  
- [x] README 声明 Preview Gallery 省略理由 + README 预览壳  
- [x] 目录树直接呈现（无 `<details>`） 
