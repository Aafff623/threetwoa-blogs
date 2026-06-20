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

### 推荐草稿路径

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

**实际发布时，草稿也可能出现在其他位置**（例如 `About Me/info/个人信息-测试文章.md`）。Skill 应支持任意 Obsidian 路径，优先在 `Blog/Drafts/` 搜索，找不到时按用户描述或路径定位。

### 博客仓库目标路径

```text
D:\OneDrive\Desktop\project\threetwoa-blogs\
└── pages\posts\<slug>.md
```

## 发布流程

### Step 1：定位草稿

1. **用户给了明确路径**：直接读取对应 `.md` 文件。
2. **用户只说文章名/描述**：
   - 先搜索 `Blog/Drafts/` 下的文件夹名
   - 再按文件名、文件夹名、内容匹配
   - 找到多个候选时列出让用户确认
3. **确认配图目录**：通常与 `.md` 同级的 `assets/`，也可能是 `images/`、`attachments/` 等

### Step 2：推断 slug

slug 是博客 URL 的一部分，优先用英文。推断顺序：

1. 用户明确指定
2. 文件名（去掉扩展名）
3. 文件夹名
4. 用户描述中的关键词

**中文标题处理**：
- 可保留拼音（如 `ge-ren-xin-xi-ce-shi-wen-zhang`）
- 也可按用户描述翻译为英文（如 "About Me 测试文章" → `about-me-test`）
- 如果无法确定，**必须询问用户**，不要擅自决定

### Step 3：读取并规范化

读取 `.md` 后处理：

- **frontmatter**：
  - `title`：优先 frontmatter 里的 `title`，其次第一个 H1，再次文件名
  - `date`：默认当天 `YYYY-MM-DD`，原文有则保留
  - `categories` / `tags` / `description`：从 frontmatter 读取，缺失则询问用户或用合理默认值（测试文章可填 `测试`）
- **正文规范化**：
  - 清理中英文标点间距（如 `"你好 , 我是"` → `"你好，我是"`）
  - 移除多余空行
  - 保留emoji
- **文件名规范化**：小写、空格变连字符、合并连续连字符、保留 Unicode 字母

### Step 4：上传配图

扫描正文中所有 Obsidian wikilink：

```markdown
![[image-1.png]]
```

对每一张配图执行：

1. 在配图目录下找到对应文件
2. 使用 `scripts/upload-to-r2.ps1` 上传：
   ```powershell
   .\scripts\upload-to-r2.ps1 -FilePath "<配图路径>" -Type blog -Slug "<slug>"
   ```
3. 将 wikilink 替换为标准 Markdown 图片链接：
   ```markdown
   ![image-1.png](https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev/blog/2026/06/<slug>/image-1.png)
   ```

**中文文件名注意**：上传脚本已通过 `[^\p{L}0-9\-.]` 保留 Unicode 字母，中文文件名不会变成 `untitled`。如果仍出现文件名异常，先修脚本再上传。

### Step 5：生成博客文章

将处理后的内容写入：

```text
D:\OneDrive\Desktop\project\threetwoa-blogs\pages\posts\<slug>.md
```

检查项：
- [ ] frontmatter 完整
- [ ] 配图链接可访问
- [ ] 正文无未处理的 wikilink
- [ ] slug 与文件路径一致

### Step 6：提交、推送与验证

```bash
cd D:\OneDrive\Desktop\project\threetwoa-blogs
git add pages/posts/<slug>.md
git commit -m "feat(post): add <title>"
git push
```

可选：
- 运行 `pnpm fuse` 更新搜索索引
- 访问 `https://threetwoa-blogs.vercel.app/posts/<slug>` 确认渲染正常
- 如构建失败，检查 frontmatter 格式和配图 URL

### Step 7：发布后归档（可选）

仅当用户明确同意：

1. 在 Obsidian 仓库创建 `Blog/Published/<article-folder>/`
2. 将原草稿 `.md` 和 `assets/` 移动到该目录
3. 在 `Blog/Drafts/` 中删除原文件夹
4. 提交 Obsidian 仓库变更

## 经验沉淀（来自 2026-06-20 首次发布）

- **中文文件名必须保留**：早期脚本用 `[^a-z0-9\-.]` 过滤会导致中文文件名变成 `untitled`，已修复为 `[^\p{L}0-9\-.]`。
- **草稿位置不固定**：首次测试文章在 `About Me/info/`，不在 `Blog/Drafts/`。发布前要先确认实际路径。
- **frontmatter 可能缺失**：测试文章只有正文和 wikilink，title 应从 H1 或文件名推断。
- **slug 需要上下文**：文件名是中文时，结合用户描述（如 "About Me"）翻译为英文 slug 更合理。
- **标点要规范化**：原文 `"你好, 我是threetwoa 👋, 这是一篇博客测试文章"` 应清理为 `"你好，我是 threetwoa 👋，这是一篇博客测试文章。"`
- **发布后验证**：Vercel 自动部署后访问 URL 确认图片和样式正常。

## 注意事项

- **不要修改** Obsidian 仓库 `threetwoa-ob-brain` 里的原始草稿（除非用户要求归档）
- 发布前必须确认 slug、categories、tags
- 单张图片建议 ≤ 5MB
- 如果文章无配图，跳过 Step 4
- 临时/测试图上传到 R2 `draft/` 目录，正式发布时移到 `blog/YYYY/MM/<slug>/`

## 参考

- 图片上传规范：`docs/image-assets-guide.md`
- 图片上传 Skill：`.claude/skills/upload-image-to-r2.md`
- 上传脚本：`scripts/upload-to-r2.ps1`
