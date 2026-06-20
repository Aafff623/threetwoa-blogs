---
name: upload-image-to-r2
description: |
  上传博客图片到 Cloudflare R2，返回 Markdown 引用链接。
  当用户说"传图到 R2"、"上传图片"、"博客配图"、"插入图片"、"R2 图床"、"发表文章"或处理博客文章中的图片资源时触发。
  使用 scripts/upload-to-r2.ps1 脚本，按 docs/image-assets-guide.md 的目录结构和命名规范执行。
---

# Upload Image to R2 — 博客图片上传 Skill

## 触发场景

- "帮我把这张图传到 R2"
- "上传图片到博客"
- "文章里这张配图处理一下"
- "R2 图床传图"
- "发表这篇文章"（文章包含本地图片时）
- "插入图片"
- "博客配图"

## 目录结构

```
threetwoa-blog-assets/
├── blog/YYYY/MM/<post-slug>/      # 文章正文配图
├── covers/YYYY/MM/<post-slug>/   # 文章封面图
├── mascot/                       # Saku-chan 吉祥物
├── assets/                       # 站点通用资源
├── pages/<page-name>/            # 独立页面配图
└── draft/                        # 临时/测试图
```

## 执行流程

### Step 1：确定图片用途和目录

根据图片用途选择 `-Type`：

| 用途 | Type | 目标目录 |
|---|---|---|
| 文章正文配图 | `blog` | `blog/YYYY/MM/<post-slug>/` |
| 文章封面图 | `covers` | `covers/YYYY/MM/<post-slug>/` |
| Saku-chan 吉祥物 | `mascot` | `mascot/` |
| 站点通用资源 | `assets` | `assets/` |
| about/links 等页面 | `pages` | `pages/<page-name>/` |
| 临时/测试图 | `draft` | `draft/` |

如果用户没指定类型，默认用 `blog`。

### Step 2：确定文章 slug

对于 `blog` 和 `covers` 类型，需要 `-Slug` 参数：

- slug 应该与文章 Markdown 文件名一致
- 例如文章 `fate-stay-night-review.md`，slug 就是 `fate-stay-night-review`
- 脚本会自动规范化：小写、空格变连字符、移除特殊字符

如果用户没提供 slug，从上下文推断文章的 slug，或询问用户。

### Step 3：规范化文件名

脚本会自动处理：
- 转小写
- 空格变连字符
- 移除特殊字符
- 合并多个连字符

例如：`Test Image 1.png` → `test-image-1.png`

### Step 4：执行上传

使用项目脚本：

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "<图片路径>" -Type <类型> -Slug "<文章slug>"
```

示例：

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\saber.png" -Type blog -Slug "fate-stay-night-review"
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\saku-chan.png" -Type mascot
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\profile.png" -Type pages -SubPath "about"
```

### Step 5：返回 Markdown

脚本会输出 Public URL 和 Markdown：

```markdown
![saber.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/fate-stay-night-review/saber.png)
```

直接将该 Markdown 插入到博客文章中。

## 注意事项

- 上传前确认图片路径存在
- 如果用户没有指定类型，先问一句确认，或按 `blog` 默认处理
- `blog` 和 `covers` 类型必须提供 `-Slug`，否则上传到 `misc`
- 临时/测试图上传到 `draft/`，发布后可删除
- 不要上传敏感信息、版权不明或过大的图片（单张建议 ≤ 5MB）
- 当前使用 R2 默认 Public URL，后续若绑定自定义域名需更新脚本中的 `$PublicUrl`

## 参考文档

- 完整目录结构和命名规范：`docs/image-assets-guide.md`
- 上传脚本：`scripts/upload-to-r2.ps1`
