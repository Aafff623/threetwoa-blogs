# valaxy博客全局美化教程（四）：增加图片预览功能

原文链接：https://daily.yybb.us/posts/valaxy-4
作者：AIOVTUE

## 效果预览

为文章中的图片增加点击放大预览功能：底部缩略图栏可点击切换，移动端支持滑动切换，支持图片缩放（双击、滚轮、双指捏合）。

> 提示：后续相册页面与图片预览共用部分能力，建议先完成本节。

## 修改文件

### styles/index.scss

增加文章图片光标和画廊打开时的页面滚动锁定：

```scss
/* 文章图片点击放大 */
.markdown-body img,
.prose img {
  cursor: zoom-in;
}

html.image-gallery-open {
  overflow: hidden;
}
```

### site.config.ts

关闭 Valaxy 自带的 `mediumZoom` 预览，避免与本功能冲突：

```ts
// 关闭自带的图片预览
mediumZoom: {
  enable: false,
},
```

## 新增文件

### App.vue

根组件覆盖，初始化图片画廊并全局挂载预览组件。模板中需要保留主题的 `<ValaxyApp />`，否则页面主体内容会消失。

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import ImageGalleryViewer from './components/ImageGalleryViewer.vue'
import { initImageGallery } from './utils/imageGallery'

onMounted(() => {
  initImageGallery()
})
</script>

<template>
  <ValaxyApp />
  <ImageGalleryViewer />
</template>
```

### utils/imageGallery.ts

画廊状态与交互入口：

- `galleryVisible` / `galleryImages` / `galleryIndex`：全局响应式状态。
- `isGalleryImage`：过滤规则，只收集 `.markdown-body` 内的图片，并排除代码块、评论区、导航栏、页脚等区域。
- `collectImages`：收集文章内的图片列表。
- `openGallery` / `closeGallery`：打开/关闭画廊，并锁定/恢复页面滚动。
- `prevImage` / `nextImage` / `goToImage`：切换图片。
- `initImageGallery`：在 `document` 上监听点击事件，点击文章图片时打开画廊。

### components/ImageGalleryViewer.vue

画廊 UI 组件：

- `Teleport to="body"` + `Transition` 实现全屏遮罩。
- 顶部关闭按钮、左右导航箭头、图片计数器。
- 主图区支持双击缩放、滚轮缩放、鼠标拖拽平移、双指捏合缩放。
- 底部缩略图栏，当前项高亮并自动居中。
- 键盘事件：`Escape` 关闭，`ArrowLeft` / `ArrowRight` 切换。
- 移动端：点击背景关闭，滑动切换（通过 `useLightboxSwipe`）。

### utils/useLightboxSwipe.ts

创建移动端滑动手势处理器，支持 `threshold` 阈值和忽略条件（缩放/拖拽/捏合时不触发）。

### utils/useLightboxZoom.ts

封装图片缩放逻辑：

- 双击/双指捏合进入/退出缩放。
- 滚轮以鼠标指针为中心缩放。
- 拖拽平移已放大图片。
- 切换图片时自动重置缩放状态。
- 缩放比例限制在 `1x ~ 4x`。

## 验证

1. `pnpm dev` 启动后打开一篇含图片的文章。
2. 鼠标悬停文章图片，光标变为 `zoom-in`。
3. 点击图片，弹出全屏预览；底部缩略图栏可切换；键盘左右键切换、Esc 关闭。
4. 移动端：左右滑动切换，双指捏合/双击缩放。
5. `pnpm build` 构建成功。

## 提交信息建议

```
feat(image): add article image lightbox preview
```
