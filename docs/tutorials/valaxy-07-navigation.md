# Valaxy 博客全局美化教程（七）：新增网址导航页面

> 来源：[https://daily.yybb.us/posts/valaxy-7](https://daily.yybb.us/posts/valaxy-7)  
> 作者：AIOVTUE  
> 许可：CC BY-NC-SA

本系列教程共十篇：

1. 分类、标签、归档三个页面的美化教程
2. 首页公告栏美化，新增随机文章展示板块
3. 给网页增加加载动画
4. 增加图片预览功能
5. 友链页面美化，修改了友链样式以及增加留言板
6. 留言页面增加信封展开效果
7. 新增网址导航页面（本文）
8. 页脚倒计时、搜索问题修复
9. 新增相册页面，支持使用 WebDAV 作为相册
10. 修复构建结束的时候会卡住

---

## 效果预览

新增 `/navigation` 页面：

- 顶部支持 `cover` 头图。
- 页面中部是「随机网站跳转」抽卡区域：背景是滚动站点卡片，中间有一个触发按钮，点击后播放一段过渡视频，然后以剪影动画形式抽出随机站点，可选择前往或取消。
- 下方按分组展示导航站点卡片，包含头像、名称、描述。

---

## 需要你提供的内容

- **导航页封面图**：`cover`（建议 1200×400 以上）。
- **导航站点数据**：分组名称、描述、站点列表（名称、URL、描述、头像、主题色）。
- **抽卡过渡视频**（可选但建议）：若干段短视频，用于随机跳转的动画。没有视频时抽卡按钮会被禁用。

---

## 新增文件

### 1. 类型定义

#### `types/navigation.ts`

```ts
export interface NavDrawVideo {
  url: string
  /** 抽取权重，数值越大出现概率越高 */
  weight: number
}

export interface NavSiteItem {
  name: string
  url: string
  desc?: string
  avatar?: string
  color?: string
  siteshot?: string
}

export interface NavSiteGroup {
  name?: string
  desc?: string
  sites: NavSiteItem[]
}
```

### 2. 工具函数

#### `utils/parseNavDrawVideos.ts`

解析抽卡视频配置，支持字符串数组或 `{ url, weight }` 对象数组：

```ts
import type { NavDrawVideo } from '../types/navigation'

export function parseNavDrawVideos(input: unknown): NavDrawVideo[] {
  if (!Array.isArray(input))
    return []

  const result: NavDrawVideo[] = []
  for (const item of input) {
    if (typeof item === 'string' && item.length > 0) {
      result.push({ url: item, weight: 1 })
      continue
    }
    if (!item || typeof item !== 'object')
      continue
    const record = item as { url?: unknown, weight?: unknown }
    if (typeof record.url !== 'string' || !record.url.length)
      continue
    const weight = typeof record.weight === 'number' && record.weight > 0
      ? record.weight
      : 1
    result.push({ url: record.url, weight })
  }
  return result
}
```

### 3. 组件

#### `components/NavigationSiteList.vue`

按分组渲染站点卡片。每个站点显示：

- 头像（未提供时使用占位图）。
- 站点名称。
- 描述（最多两行）。
- 悬停时边框和阴影使用站点的 `color`。

#### `components/NavigationRandomDraw.vue`

随机抽卡交互组件：

- 背景是若干行横向滚动的站点卡片。
- 中间触发按钮点击后：
  1. 随机选出一个站点。
  2. 随机选出一个抽卡视频并播放。
  3. 视频结束后进入「剪影掉落」动画。
  4. 剪影展开，显示站点信息，可选择「前往访问」或「暂不跳转」。
- 支持 `Escape` 跳过视频。

#### `components/layouts/SakuraNavigationLayout.vue`

导航页布局覆盖：

- 读取页面 `frontmatter` 的 `cover`、`navGroups`、`randomDrawVideos`。
- 在 `#main-content` 中依次渲染 `NavigationRandomDraw` 和 `NavigationSiteList`。

### 4. 页面

#### `pages/navigation/index.md`

```yaml
---
layout: navigation
title: 导航
icon: i-ri-compass-3-line
comment: false
cover: /images/navigation/cover.jpg
navGroups:
  - name: 软件资源
    desc: 绿色软件、应用下载与资源分享
    sites:
      - name: 果核剥壳
        url: https://www.ghxi.com
        desc: 精品软件分享与绿色资源下载站
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=ghxi
        color: "#e67e22"
  - name: 在线工具
    desc: 格式转换、查询与趣味实用服务
    sites:
      - name: Shields.io
        url: https://shields.io
        desc: 为开源项目生成状态徽章
        avatar: https://api.dicebear.com/7.x/shapes/svg?seed=shields
        color: "#2d3436"
---
```

> `navGroups` 也可以直接写在 `valaxy.config.ts` 的 `themeConfig.navigation.navGroups` 中，页面级配置会优先使用。

---

## 配置抽卡视频

### 全局配置（推荐）

在 `valaxy.config.ts` 的 `themeConfig` 中：

```ts
navigation: {
  randomDrawVideos: [
    { url: 'https://example.com/draw1.mp4', weight: 1 },
    { url: 'https://example.com/draw2.mp4', weight: 2 },
  ],
},
```

### 单页面配置

在 `pages/navigation/index.md` 中追加：

```yaml
randomDrawVideos:
  - https://example.com/draw1.mp4
  - url: https://example.com/draw2.mp4
    weight: 2
```

页面级配置会覆盖全局配置。

---

## 站点头像与配色建议

- `avatar` 建议使用站点 Logo 或 1:1 头像图。未提供时，组件会回退到 `Dicebear` 占位图。
- `color` 使用站点品牌色，影响卡片悬停边框和阴影。
- 如果站点较多，建议按用途分组，每组 6–15 个为宜。

---

## 验证

1. 准备封面图并放入 `public/images/navigation/cover.jpg`。
2. 填写 `pages/navigation/index.md` 的站点分组。
3. （可选）上传抽卡视频并在 `valaxy.config.ts` 配置。
4. 运行 `pnpm dev`，访问 `/navigation`。
5. 点击「点我到处转转吧」按钮，确认抽卡动画、剪影掉落、站点信息展示正常。
6. 运行 `pnpm build` 构建成功。

---

## 提交信息建议

```
feat(navigation): add navigation page with random site draw
```

```
docs(tutorial): add Stage 7 navigation page tutorial
```
