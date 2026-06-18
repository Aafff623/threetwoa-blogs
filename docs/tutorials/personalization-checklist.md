# 博客个性化内容清单

本清单汇总了 10 个美化阶段中**需要你本人提供或决定**的内容。已经实现的代码里大多使用了示例/占位数据，若不改掉，线上显示的还是原作者或默认模板信息。

---

## 🔴 最高优先级：站点基础信息

这些配置在 `site.config.ts` 中，当前仍是默认的 `Valaxy Theme Yun / 云游君` 示例数据：

| 字段 | 当前值 | 建议替换为 |
| ---- | ------ | ---------- |
| `url` | `https://valaxy.site/` | 你的真实站点域名，如 `https://daily.yybb.us/` |
| `title` | `Valaxy Theme Yun` | 你的博客标题 |
| `description` | `Valaxy Theme Yun Preview.` | 你的站点描述 |
| `author.name` | `云游君` | 你的名字/笔名 |
| `author.avatar` | （未设置） | 你的头像 URL，会用于加载动画、侧边栏、导航抽卡按钮等 |
| `social` | 云游君的社交链接 | 你的 RSS、GitHub、微博、邮箱等 |
| `sponsor` | 云游君收款码 | 如不需要可 `enable: false`，需要则换成你的收款码 |

> 修改后 Stage 3 的加载动画、Stage 7 的导航抽卡按钮、侧边栏头像等会自动同步更新。

---

## 🟡 各阶段需要你替换的内容

### Stage 1 · 分类 / 标签 / 归档页面

- **三个页面的 `cover` 头图**
  - 文件：`pages/categories/index.md`、`pages/tags/index.md`、`pages/archives/index.md`
  - 当前：`cover: https://你的图床.png`（教程占位符）
  - 操作：换成你自己的图床或 `public/images/xxx.jpg` 路径。

- **归档统计起始月份**
  - 文件：`valaxy.config.ts`
  - 当前：`startMonth: '2020-01'`
  - 操作：改为你开始写博客的年月，如 `2022-04`。

### Stage 2 · 首页公告栏

- **公告内容与链接**
  - 文件：`valaxy.config.ts` → `themeConfig.notice`
  - 当前是你自己的域名示例（`daily.yybb.us` 等），但后续新增域名或变更时需要同步更新。
  - 操作：把 `sections.lines` 改成你真正想公告的信息。

### Stage 3 · 页面加载动画

- **加载动画主色**
  - 文件：`valaxy.config.ts` → `vite.plugins.vaFoucLoader.primary`
  - 当前：`#E9CCCC`
  - 操作：可替换为你的主题色。

- **加载动画头像 / 标题 / 副标题**
  - 继承自 `site.config.ts`，参见最高优先级部分。

### Stage 4 · 图片灯箱

- 无需额外提供内容，只要文章里有图片即可自动生效。

### Stage 5 · 友链页面

- **友链页面封面**
  - 文件：`pages/links/index.md`
  - 当前：`/images/links/cover.jpg`（图片已存在，可替换）

- **真正的友链数据**
  - 文件：`pages/links/index.md` → `linkGroups`
  - 当前是示例占位站（部分用 `picsum.photos` 或默认截图）。
  - 操作：替换为你的真实友链，每个站点建议提供 `name`、`url`、`desc`、`avatar`、`color`、`siteshot`。

- **本站友链信息**
  - 文件：`components/FriendLinkNotice.vue`
  - 当前从 `site.config.ts` 自动读取，所以改好 `site.config.ts` 即可。

### Stage 6 · 留言页信封

- **信封图片 4 张 + 封面图 1 张**
  - 路径：
    - `public/images/comment/paper.png`
    - `public/images/comment/bar.png`
    - `public/images/comment/bottom.png`
    - `public/images/comment/top.png`
    - `public/images/comment/cover.jpg`
  - 当前：仓库里已有默认素材。
  - 操作：如想定制风格，替换为同尺寸/同构图的图片，并同步调整 `components/layouts/SakuraCommentLayout.vue` 中的 `envelopeConfig` 尺寸。

- **信笺文案**
  - 文件：`components/layouts/SakuraCommentLayout.vue` 中的 `message` 和 `bottomText`
  - 当前是默认欢迎语。
  - 操作：改成你自己想对访客说的话。

### Stage 7 · 网址导航页

- **导航页封面**
  - 文件：`pages/navigation/index.md`
  - 当前：`/images/navigation/cover.jpg`（图片已存在，可替换）

- **导航站点数据**
  - 文件：`pages/navigation/index.md` → `navGroups`
  - 当前是示例站点（软件资源、网络工具、在线工具等）。
  - 操作：换成你真正常用的站点收藏，每个站点提供 `name`、`url`、`desc`、`avatar`、`color`。

- **随机跳转抽卡视频**
  - 文件：`valaxy.config.ts` → `themeConfig.navigation.randomDrawVideos`
  - 当前已配置 2 段示例视频。
  - 操作：可替换为你自己喜欢的转场视频；若删除该配置，抽卡按钮会禁用。

### Stage 8 · 页脚倒计时 + 搜索

- **站点运行起始日期**
  - 文件：`valaxy.config.ts` → `themeConfig.footer.runtimeSince`
  - 当前：`2026-06-01`
  - 操作：改为你建站或开始记录的真实日期，如 `2022-04-01`。

- **ICP 备案号**（可选）
  - 文件：`valaxy.config.ts` → `themeConfig.footer.icp`
  - 当前未配置。
  - 操作：国内服务器备案站点填写，如 `'粤ICP备xxxxxxxx号'`。

- **Fuse 搜索索引**
  - 命令：`pnpm fuse`
  - 操作：每次新增/修改文章后重新运行，否则搜索可能搜不到最新文章。

### Stage 9 · 相册页面

- **相册汇总页封面**
  - 文件：`pages/gallery/index.md`
  - 当前：`/images/links/cover.jpg`
  - 操作：可换成独立封面。

- **本地示例相册照片**
  - 文件：`pages/gallery/demo/index.md`
  - 当前只有 2 张示例图。
  - 操作：替换为你自己的照片，或删除 `demo` 相册后新建真实相册。

- **WebDAV 相册配置**（可选）
  - 文件：新建 `pages/gallery/your-album/index.md`
  - 需要：WebDAV 目录地址、用户名、相册访问密码、服务端环境变量 `WEBDAV_PASSWORD`。
  - 操作：参考 `valaxy-09-gallery.md` 中的 WebDAV 示例。

### Stage 10 · 构建卡死修复

- 无需额外提供内容。`pnpm build` 已自动走 wrapper 脚本。

---

## ✅ 建议的替换顺序

1. **先改 `site.config.ts`**：域名、标题、作者、头像、社交链接。影响范围最大。
2. **再改 `valaxy.config.ts`**：公告栏、导航抽卡视频、页脚运行日期、加载动画主色。
3. **替换页面封面图**：`categories`、`tags`、`archives`、`links`、`navigation`、`gallery`。
4. **填写真实数据**：友链 `linkGroups`、导航 `navGroups`、相册 `photos`。
5. **可选定制**：信封文案、信封素材、ICP 备案号。
6. **每次发文章后**：运行 `pnpm fuse`。

---

## 🛠️ 快速自检命令

```bash
# 1. 本地预览
pnpm dev

# 2. 检查搜索索引是否需要更新
pnpm fuse

# 3. 构建验证
pnpm build
```
