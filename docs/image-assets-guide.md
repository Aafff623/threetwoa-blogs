# 图片资源管理规范

本项目的图片/静态资源托管在 **Cloudflare R2**，通过 **rclone** 上传。

- Bucket: `threetwoa-blog-assets`
- Public URL 前缀: `https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev`
- 上传脚本: `scripts/upload-to-r2.ps1`
- 上传 Skill: `.claude/skills/upload-image-to-r2.md`

---

## 目录结构

```
threetwoa-blog-assets/
├── blog/                                    # 文章正文配图
│   ├── 2026/
│   │   └── 06/
│   │       ├── fate-stay-night-review/
│   │       │   ├── saber.png
│   │       │   └── saber-excalibur.png
│   │       └── valaxy-r2-image-hosting/
│   │           └── rclone-config.png
│   └── .../
├── covers/                                  # 文章封面图
│   ├── 2026/
│   │   └── 06/
│   │       ├── fate-stay-night-review/
│   │       │   └── cover.png
│   │       └── valaxy-r2-image-hosting/
│   │           └── cover.png
│   └── .../
├── mascot/                                  # Saku-chan 吉祥物
│   ├── saku-chan-hero.png
│   ├── saku-chan-reading.png
│   └── ...
├── assets/                                  # 站点通用资源
│   ├── logo.png
│   ├── favicon.ico
│   ├── avatar.png
│   ├── banner.png
│   └── ...
├── pages/                                   # 独立页面配图
│   ├── about/
│   │   └── profile-photo.png
│   ├── links/
│   │   └── friends-banner.png
│   └── .../
└── draft/                                   # 临时/测试图，发布后可删除
    └── temp-test.png
```

---

## 目录用途说明

| 目录 | 用途 | 子目录规则 |
|---|---|---|
| `blog/YYYY/MM/<post-slug>/` | 文章正文配图 | 按发布年月 + 文章 slug 归档 |
| `covers/YYYY/MM/<post-slug>/` | 文章封面图 | 与正文图分开，便于统一封面风格 |
| `mascot/` | Saku-chan 吉祥物 | 扁平存放，按角色/动作命名 |
| `assets/` | 全站通用资源 | logo、头像、favicon、banner 等 |
| `pages/<page-name>/` | 独立页面配图 | about、links、tags 等页面 |
| `draft/` | 临时/测试图 | 正式发布前可删，避免污染主目录 |

---

## 命名规范

- **小写字母 + 连字符**，不用空格
- **不用中文、特殊符号**，只保留 `a-z`、`0-9`、`-`、`.`
- **文件名要有意义**，例如 `saber-excalibur.png` 优于 `IMG_1234.png`
- **文章 slug 同样规范化**，例如 `Fate/Stay Night Review` → `fate-stay-night-review`
- **多个连字符自动合并**，例如 `saber -- 1.png` → `saber-1.png`

脚本会自动完成文件名和 slug 的规范化。

---

## 上传脚本用法

### 传文章配图

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\saber.png" -Type blog -Slug "fate-stay-night-review"
```

实际路径: `blog/2026/06/fate-stay-night-review/saber.png`

### 传封面图

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\fate-cover.png" -Type covers -Slug "fate-stay-night-review"
```

实际路径: `covers/2026/06/fate-stay-night-review/fate-cover.png`

### 传吉祥物

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\saku-chan.png" -Type mascot
```

实际路径: `mascot/saku-chan.png`

### 传站点资源

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\logo.png" -Type assets
```

实际路径: `assets/logo.png`

### 传独立页面配图

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\profile.png" -Type pages -SubPath "about"
```

实际路径: `pages/about/profile.png`

### 传临时/测试图

```powershell
.\scripts\upload-to-r2.ps1 -FilePath "D:\图片\test.png" -Type draft
```

实际路径: `draft/test.png`

---

## 博客中引用

上传成功后，脚本会输出 Markdown：

```markdown
![saber.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/fate-stay-night-review/saber.png)
```

直接复制到文章 Markdown 中即可。

---

## Claude Code Skill

项目已配置 `.claude/skills/upload-image-to-r2.md`。触发关键词：

- "传图到 R2"
- "上传图片"
- "博客配图"
- "插入图片"
- "R2 图床"
- "发表这篇文章"

加载 skill 后，Claude Code 会自动按本规范上传图片并返回 Markdown 链接。

---

## 当前域名说明

目前使用 R2 默认的 Public Access URL（`pub-xxx.r2.dev`）。后续如果购买了自定义域名，需要：

1. 在 R2 中绑定自定义域名（如 `img.threetwoa.com`）
2. 更新 `scripts/upload-to-r2.ps1` 中的 `$PublicUrl`
3. 批量替换博客中已有的 `pub-xxx.r2.dev` 链接
