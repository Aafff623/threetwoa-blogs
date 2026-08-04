# assets · 媒体约定

本目录存放 README / 演示用媒体。**禁止**新建 `docs/images/`。

## 当前结构

```text
assets/
├── README.md
└── images/
    └── readme/
        ├── banner.jpg / banner.png     # 页首横幅（迁移期可并存）
        ├── features.png
        ├── architecture.png
        ├── tech-stack.png
        ├── workflow.png
        ├── structure.png
        ├── showcase-home.jpg
        ├── showcase-categories.jpg
        ├── showcase-navigation.jpg
        └── screenshot-*.jpg            # 历史截图名（保留；Showcase 优先 showcase-*）
```

按需再建（有内容时）：`backup/` · `images/avatar/` · `images/icon/` · `video/` · `ppt/` · `speeches/`。  
**不要**用 `.gitkeep` 占空目录。

## 契约文件名

见 `docs/outputs/prd/readme-diagrams/readme-diagram-brief.md`。

## 本仓策略

- 单产品博客：**省略 Preview Gallery**；以 **Showcase**（真机截图）为主。  
- 六张说明图已按契约落盘（`banner|features|architecture|tech-stack|workflow|structure.png`）；旧 `banner.jpg` 保留对照。  
- Showcase 来自线上/本地实机截图，**禁止**用说明图冒充。  
- 出图：MiniMax `text_to_image` 若鉴权失败则回退 Cursor `GenerateImage`。  
- **2026-08-05 抽检**：`banner` / `features` / `architecture` 曾错引用他仓图，已按 prompts 重出；`tech-stack` / `workflow` / `structure` 抽检合格保留。
