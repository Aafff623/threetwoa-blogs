# valaxy博客全局美化教程（三）：给网页增加加载动画

原文链接：https://daily.yybb.us/posts/valaxy-3
作者：AIOVTUE

## 效果预览

在页面加载完成前显示加载动画，替代 FOUC 开启后的白屏。

## 前置步骤：开启 FOUC 防护

Valaxy 内置 `foucGuard` 服务，全称 FOUC（Flash of Unstyled Content）防护。它会在 `<head>` 中内联 `body { opacity: 0 !important }` 隐藏页面，待样式表加载完成后移除隐藏标签，防止首屏样式闪烁。

在 `valaxy.config.ts` 的 `defineValaxyConfig` 中增加：

```ts
build: {
  ssgForPagination: false,
  foucGuard: {
    enabled: true,
    maxDuration: 5000,
  },
},
```

配置项说明：

- `enabled`（默认 `true`）：是否启用 FOUC 防护。
- `maxDuration`（默认 `5000`）：最大等待时间（毫秒），作为 CSS 加载失败的安全兜底；设为 `0` 可禁用超时兜底。

## 开始美化

### 修改 valaxy.config.ts

增加两部分内容：

1. 顶部引入：

```ts
import { vaFoucLoader } from './plugins/va-fouc-loader'
import siteConfig from './site.config'
```

2. 配置对象中加入：

```ts
vite: {
  plugins: [
    vaFoucLoader({
      avatar: siteConfig.author?.avatar,
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      primary: '#E9CCCC',
    }),
  ],
},
```

### 新增插件文件 plugins/va-fouc-loader.ts

实现一个 Vite 插件，通过 `transformIndexHtml` 在 `index.html` 中注入：

- 加载动画所需的 CSS；
- 包含头像、旋转环、跳动圆点和站点名称的 HTML 结构；
- 一段内联脚本，监听 `window.load` 并在 `#app` 有子元素后隐藏/移除 loader，同时设置 8s 兜底超时。

插件对外接口 `VaFoucLoaderOptions`：

```ts
export interface VaFoucLoaderOptions {
  avatar?: string
  title?: string
  subtitle?: string
  primary?: string
}
```

关键实现细节：

- `escapeHtml` 转义插入到 HTML 属性/文本中的动态值。
- 使用 `color-mix(in srgb, ...)` 基于 `primary` 生成环、背景和文字色。
- 通过 `html.dark #va-fouc-loader` 支持暗色背景。
- 替换 Valaxy 内置的 `FOUC_STYLE`（`<style id="valaxy-fouc">body{opacity:0!important}</style>`），在其后追加 loader 的样式和脚本；若未找到则直接写入 `<head>`。
- 将 loader 标记插入 `<body>` 开头。
- 脚本逻辑：
  - `appReady()` 检查 `#app` 是否存在且包含子元素。
  - `window.load` 触发后尝试隐藏 loader；若未隐藏则每 50ms 轮询，最多 120 次（约 6s）。
  - 8s 兜底强制隐藏。

## 验证

1. 运行 `pnpm dev`。
2. 刷新页面，应看到加载动画（头像 + 旋转环 + 跳动圆点 + 站点名）。
3. 页面渲染完成后 loader 淡出并移除。
4. 运行 `pnpm build`，构建成功且无 FOUC/loader 相关报错。

## 提交信息建议

```
feat(loading): add fouc-based page loader animation
```
