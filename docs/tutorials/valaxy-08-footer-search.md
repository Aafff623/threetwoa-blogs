# Valaxy 博客全局美化教程（八）：页脚倒计时、搜索问题修复

> 来源：[https://daily.yybb.us/posts/valaxy-8](https://daily.yybb.us/posts/valaxy-8)  
> 作者：AIOVTUE  
> 许可：CC BY-NC-SA

本系列教程共十篇：

1. 分类、标签、归档三个页面的美化教程
2. 首页公告栏美化，新增随机文章展示板块
3. 给网页增加加载动画
4. 增加图片预览功能
5. 友链页面美化，修改了友链样式以及增加留言板
6. 留言页面增加信封展开效果
7. 新增网址导航页面
8. 页脚倒计时、搜索问题修复（本文）
9. 新增相册页面，支持使用 WebDAV 作为相册
10. 修复构建结束的时候会卡住

---

## 效果预览

- **页脚倒计时**：实时显示站点已运行「X 天 X 小时 X 分钟 X 秒」。
- **搜索修复**：进入 `/search?q=关键词` 时，先拉取 Fuse 索引，再进行搜索，避免首次搜索无结果。

---

## 需要你提供的内容

- **站点运行起始日期**：用于倒计时，例如 `2024-03-15`。
- **ICP 备案号**（可选）：在页脚展示。
- **搜索页面**无需额外内容，但发布前需要运行 `pnpm fuse` 生成索引。

---

## 页脚倒计时

### 新增 `components/SakuraFooter.vue`

覆盖主题页脚组件，新增 `runtimeSince` 解析与实时倒计时。

支持的时间格式：

- `YYYY-MM-DD`：按当天 00:00:00 计算。
- 任意可被 `new Date()` 解析的字符串。

组件会每秒更新一次倒计时，并使用等宽数字样式显示。

### 配置 `valaxy.config.ts`

在 `themeConfig` 中加入：

```ts
footer: {
  // 站点运行起始日期
  runtimeSince: '2024-03-15',

  // 可选：ICP 备案号
  icp: '粤ICP备xxxxxxxx号',

  // 是否显示 Powered by 信息
  powered: true,
},
```

> 如果 `runtimeSince` 为未来日期或格式错误，倒计时不会显示。

---

## 搜索修复

### 问题

主题默认搜索页在 `/search?q=xxx` 首次进入时，Fuse 索引可能尚未加载，导致搜索结果为空或报错。

### 解决

覆盖搜索布局，在路由 `q` 参数变化时，先调用 `fetchFuseListData()` 拉取索引，再赋值搜索词。

### 新增 `components/layouts/SakuraSearchLayout.vue`

核心逻辑：

```ts
const input = ref('')
const { results, fetchFuseListData } = useFuseSearch(input)
const route = useRoute()

watch(
  () => route.query.q as string,
  async (query) => {
    if (isClient) {
      await fetchFuseListData()
      await nextTick()
    }
    input.value = query || ''
  },
  { immediate: true },
)
```

### 新增 `pages/search/index.md`

```yaml
---
layout: search
title: 搜索
icon: i-ri-search-line
comment: false
---
```

### 生成 Fuse 索引

开发或部署前运行：

```bash
pnpm fuse
```

该命令会生成 `public/valaxy-fuse-list.json`，供搜索组件读取。

---

## 配置搜索

在 `site.config.ts` 中确认：

```ts
search: {
  enable: true,
  provider: 'fuse',
},

fuse: {
  options: {
    keys: ['title', 'tags', 'categories', 'excerpt', 'content'],
    ignoreLocation: true,
  },
},
```

---

## 验证

### 页脚倒计时

1. 设置 `themeConfig.footer.runtimeSince`。
2. 运行 `pnpm dev`，滚动到页面底部。
3. 确认显示「本站已经流畅运行 X 天 X 小时 X 分钟 X 秒」。
4. 数字应每秒刷新。

### 搜索

1. 运行 `pnpm fuse` 生成索引。
2. 运行 `pnpm dev`。
3. 在搜索框输入关键词，或直接在地址栏访问 `/search?q=关键词`。
4. 确认返回相关文章结果。
5. 运行 `pnpm build` 构建成功。

---

## 提交信息建议

```
feat(footer): add runtime counter and ICP support
```

```
fix(search): fetch fuse list before searching on /search page
```

```
docs(tutorial): add Stage 8 footer counter and search fix tutorial
```
