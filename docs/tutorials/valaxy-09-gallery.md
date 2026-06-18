# valaxy博客全局美化教程（九）：相册页面 + WebDAV 图源

原文链接：https://daily.yybb.us/posts/valaxy-9
作者：AIOVTUE

## 效果预览

新增 `/gallery` 相册入口与 `/gallery/{slug}` 相册详情页：

- 相册列表页展示封面、标题、描述、地点、标签与照片数量。
- 相册详情页按「年-月」时间轴分组展示照片/视频。
- 支持**本地图床相册**（`source: local`）和 **WebDAV 云端相册**（`source: webdav`）。
- 支持相册级加密访问（`encrypted: true` + `password`）。
- 点击图片/视频进入灯箱，复用 Stage 4 的缩放、滑动切换、键盘导航能力。

## 修改文件

### `valaxy.config.ts`

- 引入相册 WebDAV 相关 Vite 插件。
- `safelist` 增加 `i-ri-gallery-line` 导航图标。
- 顶部导航增加「相册」入口。
- `vite.plugins` 追加 `albumWebdavConfigPlugin()` 和 `albumWebdavProxy()`。

### `.gitignore`

- 保留 `.env.example` 作为环境变量模板。
- 忽略 `server/albumWebdavPublicConfig.ts`（该文件由构建插件自动生成，避免提交作者个人 WebDAV 配置）。

### `README.md`

- 在功能表、路线图、更新日志中标记 Stage 9 已完成。

## 新增文件

### 类型定义

#### `types/album.ts`

相册相关 TypeScript 类型：

- `AlbumSource`: `'local' | 'webdav'`
- `AlbumPhoto`: 单张照片/视频，含 `url`、`type`、`poster`、`date`
- `AlbumSummary`: 相册列表卡片元数据
- `AlbumDetailFrontmatter`: 相册详情页 front matter 结构
- `GalleryHubFrontmatter`: 相册汇总页 front matter 结构
- `AlbumWebDavFrontmatterConfig` / `AlbumWebDavConfig`: WebDAV 公开/完整配置

### 组件

#### `components/AlbumViewer.vue`

相册详情核心组件：

- 根据 `source` 切换本地/远程数据源。
- 若 `encrypted: true`，先显示 `AlbumPasswordGate`。
- WebDAV 相册通过 `/api/album-webdav/list` 拉取文件列表。
- 按月份分组渲染照片/视频网格。
- 点击媒体项调用 `openAlbumMediaGallery` 打开灯箱。

#### `components/AlbumPasswordGate.vue`

加密相册的密码输入门：

- 输入框 + 解锁按钮。
- 验证通过后通过 `sessionStorage` 记录解锁状态（当前会话有效）。
- 触发 `@unlocked` 事件供父组件加载媒体。

#### `components/AlbumMediaLightbox.vue`

媒体灯箱组件：

- 支持图片与视频全屏预览。
- 复用 Stage 4 的 `useLightboxZoom` / `useLightboxSwipe` 能力。
- 支持键盘 `Esc` 关闭、左右箭头切换。

#### `components/AlbumVideoThumb.vue`

视频封面/缩略图组件：

- 优先使用 `poster` 作为封面。
- 无封面时从视频中截取第一帧。

#### `components/layouts/SakuraGalleryLayout.vue` / `SakuraGalleryAlbumLayout.vue`

相册列表页与相册详情页的布局覆盖：

- 自定义页面头部，支持 `cover` 头图。
- 在 `#main-content` 插槽中渲染相册内容。

#### `layouts/gallery.vue` / `layouts/gallery-album.vue`

布局注册文件，将上述组件包装为主题可识别的布局。

### 工具函数

#### `utils/albumAuth.ts`

- `toAlbumAccessParams`: 把 front matter 中的加密配置转换为请求参数。

#### `utils/albumMedia.ts`

- `isAlbumVideo` / `resolveAlbumMediaType`: 根据 URL 后缀或显式 `type` 判断媒体类型。

#### `utils/albumMediaGallery.ts`

- `openAlbumMediaGallery`: 打开相册灯箱的全局入口。

#### `utils/albumPhotos.ts`

- `groupPhotosByMonth`: 将照片按 `YYYY 年 M 月` 分组。

#### `utils/webdavAlbum.ts`

- `fetchWebDavPhotos`: 调用 `/api/album-webdav/list` 获取 WebDAV 文件并转换为 `AlbumPhoto[]`。

#### `utils/useAlbumDetailMeta.ts` / `utils/useAlbumSummaries.ts`

- 处理相册详情元数据（如照片总数）与列表页摘要。

### 服务端与代理

#### `server/albumWebdav.ts`

WebDAV 核心逻辑：

- `handleAlbumWebDavList`: 对 WebDAV 目录发起 `PROPFIND`，解析 XML 得到文件列表。
- `handleAlbumWebDavFile`: 代理单文件请求，支持 `Range` 分片（视频播放需要）。

#### `server/albumWebdavEnv.ts`

- 读取 `WEBDAV_PASSWORD` 环境变量并注入运行时。

#### `server/albumWebdavHttp.ts`

- 统一的 HTTP 请求处理器，供 Vercel / Netlify / 本地开发代理复用。

#### `api/album-webdav/list.ts` / `api/album-webdav/file.ts`

Vercel Serverless Functions：

- `list.ts`: 处理 `/api/album-webdav/list`，返回相册文件列表。
- `file.ts`: 处理 `/api/album-webdav/file`，代理媒体文件流。

#### `plugins/album-webdav-config.ts`

构建插件：

- 扫描 `pages/gallery/*/index.md`。
- 提取 WebDAV 公开配置（`url`、`username`），生成 `server/albumWebdavPublicConfig.ts`。
- 密码不会进入该文件，仅通过环境变量在服务端读取。

#### `plugins/album-webdav-proxy.ts`

开发服务器代理插件：

- 将 `/api/album-webdav/*` 转发到本地 Vite 服务中的 `server/albumWebdavHttp.ts`。
- 保证开发环境与 Vercel 生产环境行为一致。

### 页面与示例

#### `pages/gallery/index.md`

相册汇总页：

```yaml
---
layout: gallery
title: 相册
icon: i-ri-gallery-line
cover: /images/links/cover.jpg
comment: false
albums:
  - demo
---
```

#### `pages/gallery/demo/index.md`

本地示例相册：

```yaml
---
layout: gallery-album
title: 示例相册
date: 2026-06-18
cover: /images/navigation/cover.jpg
desc: 这是一个本地示例相册，用于验证相册页面和灯箱效果。
location: 本地
tags:
  - 示例
comment: false
encrypted: false
source: local
photos:
  - url: /images/links/cover.jpg
    date: 2026-06-18
  - url: /images/navigation/cover.jpg
    date: 2026-06-17
---
```

### WebDAV 相册示例

```yaml
---
layout: gallery-album
title: 云端相册
source: webdav
encrypted: true
password: your-album-password
webdav:
  url: https://your-webdav-server.com/remote.php/dav/files/user/album/
  username: user
photos: []
---
```

> WebDAV 登录密码**不写在 front matter 中**，统一通过服务端环境变量 `WEBDAV_PASSWORD` 读取。

### 环境变量模板

#### `.env.example`

```bash
WEBDAV_PASSWORD=your_password
```

开发时复制为 `.env.local` 并填入密码；Vercel / Netlify 请在后台设置同名环境变量并重新部署。

## 验证

1. `pnpm dev` 启动后访问 `/gallery`。
2. 页面应显示「示例相册」卡片，点击进入 `/gallery/demo`。
3. 详情页按月份展示照片网格；点击照片打开灯箱，可缩放/切换/键盘操作。
4. （可选）配置一个 `source: webdav` 的相册，设置 `WEBDAV_PASSWORD` 后，确认照片能从 WebDAV 加载。
5. `pnpm build` 构建成功，`dist/` 包含 `gallery/index.html` 与 `gallery/demo/index.html`。

## 提交信息建议

```
feat(gallery): add album page with local and WebDAV support
```

```
docs(tutorial): add Stage 9 gallery tutorial
```
