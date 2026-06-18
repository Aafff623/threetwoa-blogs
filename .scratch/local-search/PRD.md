# PRD：为 Sakura 主题博客添加本地搜索

Status: ready-for-agent

---

## Problem Statement

读者目前无法在本站搜索内容。`site.config.ts` 中 `search.enable` 为 `false`，主题导航栏和首页都没有搜索入口。随着 Post 数量增加，查找历史内容会越来越困难。

## Solution

启用 Valaxy 内置本地搜索能力，并在主题 UI 中暴露一个搜索入口。搜索索引在构建时生成，查询完全在浏览器端完成，不需要外部服务。

主要交互：

- 在导航栏添加一个搜索图标/按钮。
- 点击后打开搜索浮层或跳转至搜索页面。
- 用户输入关键词，实时显示匹配的 Post/Page 列表。
- 点击结果项即可跳转到对应 Page。

## User Stories

- 作为读者，我能在任意 Page 看到搜索入口，以便随时发起搜索。
- 作为读者，我输入关键词后能看到匹配的文章标题、摘要和对应 Page，以便快速判断内容。
- 作为读者，我能通过键盘（`/` 聚焦、Esc 关闭）操作搜索，以便提高效率。
- 作为作者，我无需维护第三方搜索服务或 API key，以便降低维护成本。

## Acceptance Criteria

1. `site.config.ts` 中 `search.enable` 设置为 `true`。
2. `valaxy.config.ts` 的 `unocss.safelist` 包含搜索相关 Iconify 类名（如 `i-ri-search-line`）。
3. 站点任意页面可见搜索入口（导航栏搜索按钮）。
4. 点击搜索入口后弹出搜索 UI（浮层或页面）。
5. 输入已知 Post 标题中的关键词，结果列表包含该 Post。
6. 点击结果项正确跳转到对应 Page。
7. `Esc` 关闭搜索浮层（若主题为浮层实现）。
8. `/` 聚焦搜索输入（若主题支持）。
9. 构建产物 `dist/` 中包含搜索索引 JSON 文件。
10. 暗色模式下搜索 UI 样式正常。

## Implementation Decisions

1. **Search provider**：使用 Valaxy 内置本地搜索，而非 Algolia 或自建后端。依据 ADR-0001。
2. **搜索入口**：复用主题已有的 `SakuraSearchTrigger` 组件；若主题未自动渲染，则在导航栏右侧增加一个搜索按钮。
3. **搜索索引**：由 Valaxy 在构建时自动生成，包含所有 Post 和 Page 的标题、摘要和正文片段。
4. **图标**：搜索相关 Iconify 类名加入 `valaxy.config.ts` 的 `safelist`，避免构建时被 tree-shake。
5. **i18n**：搜索占位符、无结果提示等文案使用 `locales/` 覆盖，支持中文和英文。
6. **样式**：搜索浮层/页面外观与 Sakura 主题保持一致，通过 `styles/` 进行少量微调即可。

## Implementation Plan

### Phase 1 — 启用搜索配置

- `site.config.ts`：设置 `search.enable: true`。
- `valaxy.config.ts`：将 `i-ri-search-line` 加入 `safelist`。
- 运行 `pnpm dev` 验证主题是否自动显示搜索入口。

### Phase 2 — 补齐 UI 与文案

- 若主题未自动渲染搜索入口，在 `components/` 中添加自定义搜索触发按钮，或在布局中覆盖主题组件。
- 在 `locales/zh-CN.yml` 和 `locales/en.yml` 中覆盖搜索相关文案（占位符、无结果提示）。
- 在 `styles/index.scss` 或 `styles/css-vars.scss` 中微调搜索浮层样式。

### Phase 3 — 构建与验证

- 运行 `pnpm build`。
- 检查 `dist/` 中是否生成搜索索引 JSON。
- 运行 `pnpm serve` 或在浏览器打开 `pnpm dev`，执行 Acceptance Criteria 中的手动验证。

## Testing Decisions

- 构建后检查 `dist/` 中是否生成了搜索索引 JSON 文件。
- 在浏览器中打开站点，验证搜索入口可见、可点击。
- 输入已知文章标题中的关键词，验证结果包含该 Post/Page。
- 点击结果，验证跳转到正确 Page。
- 验证 `Esc` 可关闭搜索浮层，`/` 可聚焦搜索输入（若实现）。
- 验证暗色模式下搜索 UI 无样式异常。

## Out of Scope

- Algolia DocSearch 集成。
- 搜索结果分页或无限滚动（Valaxy 本地搜索默认返回全部匹配项）。
- 搜索关键词高亮（可在后续迭代中追加）。
- 搜索统计或热词分析。
- 搜索结果排序调优（使用 Valaxy 默认排序）。

## Further Notes

- 如果主题自带的搜索组件依赖深色模式类名，需同步验证暗色模式下的样式。
- 后续可考虑为搜索框增加最近搜索历史或空状态推荐。
- 站点元数据（标题、作者、描述、社交链接）仍为示例值，建议与搜索功能同步个性化。

## Related documents

- ADR-0001: `docs/adr/0001-enable-local-search.md`
- CONTEXT: `CONTEXT.md`
- LANGUAGE: `LANGUAGE.md`
