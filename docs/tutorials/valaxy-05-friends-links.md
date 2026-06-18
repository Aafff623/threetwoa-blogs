# valaxy博客全局美化教程（五）：友链页面美化，修改了友链样式以及增加留言板

原文链接：https://daily.yybb.us/posts/valaxy-5
作者：AIOVTUE

## 效果预览

友链页面新增卡片式站点预览、申请规则说明、YML 格式复制区，以及底部留言板。

## 新增文件

### components/FriendLinkNotice.vue

友链申请说明组件：

- 顶部标题与副标题。
- 代码块展示推荐 YML 友链格式，并提供一键复制按钮。
- 友链申请规则列表（图标 + 文字）。
- 本站友链信息展示，自动从 `site.config.ts` 读取站点名、URL、头像、描述；站点截图通过 props 传入。

### components/SakuraLinks.vue

友链卡片组件：

- 支持 `links`（一维数组）或 `linkGroups`（分组数组）。
- 支持 `random` 随机排序。
- 每个卡片显示站点截图（优先使用 `siteshot`，否则用 WordPress mshots 服务）、头像、站点名、描述。
- 移动端适配为 2 列网格 + 底部文字叠加。

### components/layouts/SakuraLinksLayout.vue

友链页布局覆盖：

- 使用自定义页面头部，支持 `cover` 头图。
- 在 `RouterView` 的 `#main-content` 插槽中放入 `SakuraLinks` 和 `FriendLinkNotice`。
- 由于 `comment: true`，主题会自动渲染评论组件作为留言板。

### pages/links/index.md

友链页面内容：

- `layout: links` 使用覆盖后的友链布局。
- `comment: true` 开启评论/留言板。
- `linkGroups` 配置分组友链信息。

## 占位图片

本实现使用 `https://picsum.photos` 作为封面和站点截图占位图，方便立即预览效果。后续请替换为你自己的图床或生成素材。

## 验证

1. `pnpm dev` 启动后访问 `/links`。
2. 页面应显示友链卡片、规则说明、YML 复制区、评论组件（留言板）。
3. `pnpm build` 构建成功。

## 提交信息建议

```
feat(links): redesign friend links page with cards and notice board
```
