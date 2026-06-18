# Valaxy 博客全局美化教程（六）：留言页面增加信封展开效果

> 来源：[https://daily.yybb.us/posts/valaxy-6](https://daily.yybb.us/posts/valaxy-6)  
> 作者：AIOVTUE  
> 许可：CC BY-NC-SA

本系列教程共十篇：

1. 分类、标签、归档三个页面的美化教程
2. 首页公告栏美化，新增随机文章展示板块
3. 给网页增加加载动画
4. 增加图片预览功能
5. 友链页面美化，修改了友链样式以及增加留言板
6. 留言页面增加信封展开效果（本文）
7. 新增网址导航页面
8. 页脚倒计时、搜索问题修复
9. 新增相册页面，支持使用 WebDAV 作为相册
10. 修复构建结束的时候会卡住

---

## 效果预览

留言页顶部展示一封可交互的信封：

- 未滚动到可视区域时，信封保持闭合。
- 当信封完整进入视口后，自动展开露出信笺内容。
- 点击闭合的信封也可以手动展开。
- 滚动回页面顶部（小于 `scrollCloseTop`）时，信封自动闭合。
- 移动端隐藏信封动画，直接显示信笺内容。

---

## 需要你提供的内容

- **信封图片 4 张**：信笺封面、底部装饰条、信封底层、信封顶层。
- **留言页封面图 1 张**：用于页面头部背景。
- **信笺文案**：标题前缀（自动读取站长名）、留言段落、底部小字。

图片建议尺寸：

| 图片 | 路径 | 作用 |
| ---- | ---- | ---- |
| 信笺封面 | `/images/comment/paper.png` | 信笺顶部装饰 |
| 底部装饰条 | `/images/comment/bar.png` | 信笺底部装饰 |
| 信封底层 | `/images/comment/bottom.png` | 信封展开前位于信笺下方 |
| 信封顶层 | `/images/comment/top.png` | 信封展开后位于最上方 |
| 页面头图 | `/images/comment/cover.jpg` | 留言页 `cover` |

---

## 修改/新增文件

### 1. 新增 `pages/comment/index.md`

```yaml
---
layout: comment
title: 不留下点什么吗
icon: i-ri-chat-1-line
nav: false
cover: /images/comment/cover.jpg
comment: true
---
```

- `layout: comment` 使用自定义留言布局。
- `comment: true` 在信笺下方渲染主题评论组件作为留言板。
- `nav: false` 避免该页面出现在自动导航中。

### 2. 新增 `components/layouts/SakuraCommentLayout.vue`

该组件覆盖主题的留言页布局，核心逻辑：

- 从 `site.config.ts` 读取 `author.name` 作为信笺标题。
- 通过 `envelopeConfig` 配置图片路径、闭合/展开高度、展开偏移、自动闭合阈值。
- 监听 `scroll` / `resize`，在信封完全进入视口时展开。
- 提供桌面端信封动画与移动端纯信笺降级。
- 在 `#comment` 插槽中放置 `<SakuraComment />` 作为留言板。

组件内可自定义的文案：

```ts
const message = [
  '本站有哪些做得好或者不好的地方？',
  '或者你有什么改进的建议？',
  '又或者你有什么具体的问题需要咨询？',
  '都可以在下方评论区留言哦~~~',
]

const bottomText = '小站站长亲自为您服务！'
```

以及信封尺寸与图片配置：

```ts
const envelopeConfig = {
  images: {
    cover: '/images/comment/paper.png',
    line: '/images/comment/bar.png',
    beforeimg: '/images/comment/bottom.png',
    afterimg: '/images/comment/top.png',
  },
  wrapHeight: 447,   // 闭合高度
  openHeight: 1050,  // 展开高度
  openOffset: -200,  // 展开时向上偏移
  scrollCloseTop: 80,// 回到顶部多少像素时闭合
}
```

> 如果你的图片比例不同，需要同步调整 `wrapHeight`、`openHeight`、`openOffset`，避免展开后露出白边或错位。

---

## 验证

1. 把 4 张信封图片和 1 张封面图放入 `public/images/comment/`。
2. 运行 `pnpm dev`。
3. 访问 `/comment`。
4. 向下滚动，观察信封是否自动展开。
5. 滚动回顶部，观察信封是否闭合。
6. 缩小窗口到 600px 以下，确认移动端直接显示信笺。
7. 运行 `pnpm build` 构建成功。

---

## 提交信息建议

```
feat(comment): add envelope expand effect on message page
```

```
docs(tutorial): add Stage 6 comment envelope tutorial
```
