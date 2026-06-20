---
name: publish-obsidian-post
description: |
  将 Obsidian 知识库中的博客草稿发布到 Valaxy 博客仓库。
  当用户说"发布文章"、"把这篇发到博客"、"同步 Obsidian 草稿"、"发表博客"或处理从 Obsidian vault 到博客的发布流程时触发。
---

# Publish Obsidian Post — 从 Obsidian 发布博客文章

## 触发场景

- "把这篇 Obsidian 草稿发到博客"
- "发布文章"
- "同步 Blog/Drafts/xxx 到博客"
- "发表这篇博客"
- "处理这篇文章并发布"

## 仓库定位

| 仓库 | 角色 | 可见性 | 存放内容 |
|---|---|---|---|
| `threetwoa-ob-brain` | 知识库 / 草稿源站 | Private | Obsidian 笔记、灵感、未发布草稿、原始素材 |
| `threetwoa-blogs` | 正式发布站点 | Public | 整理后的 Markdown、frontmatter、构建后的静态博客 |
| `threetwoa-blog-assets` | 图床 | Public-read | Cloudflare R2 上的配图与站点资源 |

**协作原则**：你在 Obsidian 里写草稿，我把草稿转成可构建的博客文章并发布到博客仓库。不自动扫描、不擅自发布。

## 本地目录约定

### Obsidian 草稿路径

```text
D:\OneDrive\Desktop\Notes\threetwoa_ob\
└── Blog\
    ├── Drafts\                              # 待发布草稿
    │   └── <article-folder>\
    │       ├── article.md                    # 文章正文
    │       └── assets\                       # 配图目录
    │           ├── image-1.png
    │           └── image-2.png
    ├── Published\                            # 已发布文章归档（可选）
    └── Templates\
        └── blog-post-template.md             # 发布模板
```

### 博客仓库目标路径

```text
D:\OneDrive\Desktop\project\threetwoa-blogs\
└── pages\posts\<slug>.md
```

## 发布流程

### Step 1：定位草稿

1. 如果用户给了路径，直接读取 `D:\OneDrive\Desktop\Notes\threetwoa_ob\Blog\Drafts\<folder>\article.md`
2. 如果没给路径，列出 `Blog/Drafts/` 下的文件夹，让用户确认要发布哪篇

### Step 2：读取并规范化

读取 `article.md` 后处理：

- **frontmatter**：
  - `title`：优先用 frontmatter 里的 `title`，缺失则取文章第一个 H1
  - `date`：默认使用当天日期 `YYYY-MM-DD`
  - `categories` / `tags` / `description`：从 frontmatter 读取，缺失则询问用户
- **slug**：
  - 默认与文章 Markdown 文件名一致
  - 例如 `fate-stay-night-review.md` → slug `fate-stay-night-review`
  - 中文标题可转拼音，或保留用户指定的英文 slug
- **文件名规范化**：小写、空格变连字符、合并连续连字符、移除特殊字符

### Step 3：上传配图

扫描正文中所有 Obsidian wikilink：

```markdown
![[image-1.png]]
```

对每一张配图执行：

1. 在 `assets/` 目录下找到对应文件
2. 使用 `scripts/upload-to-r2.ps1` 上传到 R2：
   ```powershell
   .\scripts\upload-to-r2.ps1 -FilePath "D:\OneDrive\Desktop\Notes\threetwoa_ob\Blog\Drafts\<folder>\assets\image-1.png" -Type blog -Slug "<slug>"
   ```
3. 将 wikilink 替换为标准 Markdown 图片链接：
   ```markdown
   ![image-1.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/<slug>/image-1.png)
   ```

### Step 4：生成博客文章

将处理后的内容写入：

```text
D:\OneDrive\Desktop\project\threetwoa-blogs\pages\posts\<slug>.md
```

确保 frontmatter 完整、配图链接可访问、正文无未处理的 wikilink。

### Step 5：提交与推送

```bash
cd D:\OneDrive\Desktop\project\threetwoa-blogs
git add pages/posts/<slug>.md
git commit -m "feat(post): add <title>"
git push
```

可选：运行 `pnpm fuse` 更新搜索索引（如用户要求）。

## 发布后归档（可选）

发布完成后，可将 Obsidian 草稿从 `Blog/Drafts/<folder>` 移动到 `Blog/Published/<folder>`，仅当用户明确同意。

## 注意事项

- **不要修改** Obsidian 仓库 `threetwoa-ob-brain` 里的原始草稿
- 发布前必须确认 slug、categories、tags
- 单张图片建议 ≤ 5MB
- 如果文章无配图，跳过 Step 3
- 临时/测试图上传到 R2 `draft/` 目录，正式发布时移到 `blog/YYYY/MM/<slug>/`

## 参考

- 图片上传规范：`docs/image-assets-guide.md`
- 图片上传 Skill：`.claude/skills/upload-image-to-r2.md`
- 上传脚本：`scripts/upload-to-r2.ps1`
