import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  computeDAGLayout,
  useHostTheme,
} from "cursor/canvas";

// 架构 DAG：内容 → 框架 → 主题 → 扩展 → 输出 → 部署
const archNodes = [
  { id: "md" },
  { id: "valaxy" },
  { id: "sakura" },
  { id: "custom" },
  { id: "ssg" },
  { id: "host" },
];
const archEdges = [
  { from: "md", to: "valaxy" },
  { from: "valaxy", to: "sakura" },
  { from: "sakura", to: "custom" },
  { from: "custom", to: "ssg" },
  { from: "ssg", to: "host" },
];
const archLabels: Record<string, string> = {
  md: "Markdown / pages",
  valaxy: "Valaxy 0.28",
  sakura: "Sakura Theme",
  custom: "扩展层",
  ssg: "SSG dist/",
  host: "多平台部署",
};

function ArchitectureDag() {
  const theme = useHostTheme();
  const layout = computeDAGLayout({
    nodes: archNodes,
    edges: archEdges,
    direction: "horizontal",
    nodeWidth: 120,
    nodeHeight: 36,
    rankGap: 48,
    nodeGap: 24,
    padding: 12,
  });

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      style={{ display: "block", maxWidth: 720 }}
    >
      {layout.edges.map((e) => (
        <line
          key={`${e.from}-${e.to}`}
          x1={e.sourceX}
          y1={e.sourceY}
          x2={e.targetX}
          y2={e.targetY}
          stroke={theme.stroke.secondary}
          strokeWidth={1.5}
        />
      ))}
      {layout.nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width={120}
            height={36}
            rx={4}
            fill={theme.fill.secondary}
            stroke={theme.stroke.primary}
          />
          <text
            x={n.x + 60}
            y={n.y + 22}
            textAnchor="middle"
            fill={theme.text.primary}
            fontSize={11}
          >
            {archLabels[n.id]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function ThreetwoaBlogsDeepAnalysis() {
  return (
    <Stack gap={24} style={{ padding: 20, maxWidth: 960 }}>
      {/* 标题区 */}
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1>threetwoa-blogs 深度分析</H1>
          <Pill tone="info">Valaxy SSG</Pill>
          <Pill tone="neutral">pnpm workspace</Pill>
        </Row>
        <Text tone="secondary">
          基于 Valaxy + Sakura 的个人静态博客模板；系统性增强分类/标签/归档可视化、首页动态、灯箱、友链、导航、搜索、相册与 SSG 构建稳定性。
        </Text>
        <Text tone="tertiary" size="small">
          分析范围：D:\OneDrive\Desktop\project\threetwoa-blogs · 只读探索 · 未改业务代码
        </Text>
      </Stack>

      {/* 关键指标 */}
      <Grid columns={4} gap={12}>
        <Stat value="7" label="文章 posts" />
        <Stat value="29" label="Vue 组件" />
        <Stat value="10" label="Stage 已完成" tone="success" />
        <Stat value="0" label="Lint / Test 脚本" tone="warning" />
      </Grid>

      <Callout tone="info" title="一句话定位">
        不是从零博客框架，而是「可落地的 Sakura 增强模板」：配置分离 + 组件覆盖 + 自定义 Vite 插件，配合 Obsidian→R2→CI 的内容流水线。
      </Callout>

      <Divider />

      {/* 技术栈 */}
      <Stack gap={12}>
        <H2>技术栈</H2>
        <Table
          headers={["层级", "技术", "版本 / 备注"]}
          rows={[
            ["框架", "Valaxy", "0.28.11（钉死）"],
            ["主题", "valaxy-theme-sakura", "latest → 锁定 0.10.2（风险）"],
            ["运行时", "Vue 3 + Vite + TypeScript", "type: module"],
            ["样式", "UnoCSS + SCSS + CSS Vars", "safelist 管理 Iconify"],
            ["可视化", "ECharts 6.1", "分类/标签/归档图表"],
            ["评论", "@giscus/vue 3.1", "GitHub Discussions"],
            ["工具库", "@vueuse/core 14.3", "前端组合式逻辑"],
            ["包管理", "pnpm workspace", "packages: [.] 单包"],
            ["搜索", "Fuse（Valaxy 内置）", "build 时生成索引"],
            ["部署", "GH Pages / Vercel / Netlify / Docker", "多平台配置齐备"],
          ]}
        />
      </Stack>

      {/* 目录结构 */}
      <Stack gap={12}>
        <H2>目录结构（核心）</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>内容与配置</CardHeader>
            <CardBody>
              <Stack gap={4}>
                <Text size="small">site.config.ts — 站点元数据 / 搜索 / 评论</Text>
                <Text size="small">valaxy.config.ts — 主题 / 导航 / Vite 插件</Text>
                <Text size="small">pages/ — 文件系统路由（posts、gallery…）</Text>
                <Text size="small">locales/ — zh-CN / en 主题文案覆盖</Text>
                <Text size="small">public/ — feed、fuse 索引等静态产物</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>扩展与运行时</CardHeader>
            <CardBody>
              <Stack gap={4}>
                <Text size="small">components/ — 29 个覆盖/增强组件</Text>
                <Text size="small">layouts/ — gallery / navigation 布局</Text>
                <Text size="small">plugins/ — FOUC、WebDAV 配置与代理</Text>
                <Text size="small">server/ + api/ — WebDAV 服务端与 Vercel 函数</Text>
                <Text size="small">utils/ + types/ — 相册、灯箱、图表工具</Text>
                <Text size="small">scripts/build-ssg.mjs — SSG 卡死兜底</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
        <Card>
          <CardHeader>文档与 Agent 体系</CardHeader>
          <CardBody>
            <Text size="small">
              README / CLAUDE.md / AGENTS.md / CONTEXT.md / LANGUAGE.md · docs/adr · docs/tutorials（Stage 1–10）· docs/agents（Matt Pocock 工作流）· .claude/skills（Obsidian 发布、R2 上传）
            </Text>
          </CardBody>
        </Card>
      </Stack>

      {/* 核心模块 */}
      <Stack gap={12}>
        <H2>核心模块</H2>
        <Table
          headers={["模块", "入口", "职责"]}
          columnAlign={["left", "left", "left"]}
          rows={[
            ["配置层", "site / valaxy.config.ts", "元数据与框架/主题分离"],
            ["内容层", "pages/**/*.md", "文章与特殊页（归档/友链/相册…）"],
            ["UI 覆盖", "components/* · layouts/*", "按名覆盖 Sakura 组件与布局"],
            ["图表", "Sakura*Chart + utils/echarts", "分类环图 / 标签柱图 / 归档面积图"],
            ["灯箱", "App.vue → ImageGalleryViewer", "文章图片预览、缩放、滑动"],
            ["首页动态", "SakuraNoticeBoard 等", "公告轮播、随机文章（主题配置）"],
            ["导航抽卡", "NavigationRandomDraw", "加权视频 + 随机站点跳转"],
            ["搜索", "Fuse + /search", "本地索引，ADR-0001"],
            ["评论", "SakuraComment + Giscus", "按 pathname 映射 Discussions"],
            ["相册", "Album* + layouts/gallery*", "本地/WebDAV、加密门、时间轴"],
            ["WebDAV 代理", "api/ + plugins/ + server/", "CORS 隔离、密码仅服务端"],
            ["FOUC Guard", "plugins/va-fouc-loader", "首屏加载遮罩，防白屏闪烁"],
            ["构建包装", "scripts/build-ssg.mjs", "检测完成标记并强制结束进程"],
            ["发布流水线", "Claude skills + rclone", "Obsidian → R2 → posts → CI"],
          ]}
        />
      </Stack>

      {/* 架构 */}
      <Stack gap={12}>
        <H2>架构</H2>
        <Text tone="secondary" size="small">
          数据流：Markdown 文章 → Valaxy（Vite/Vue SSG）→ Sakura 主题 → 用户扩展层 → dist/ → 托管平台
        </Text>
        <ArchitectureDag />
        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader trailing={<Pill size="sm">原则</Pill>}>配置分离</CardHeader>
            <CardBody>
              <Text size="small">站点元数据 vs 框架/主题配置；避免「blog config」歧义（CONTEXT.md）</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm">原则</Pill>}>覆盖优先</CardHeader>
            <CardBody>
              <Text size="small">改 components/layouts，不 fork 主题源码；图标进 UnoCSS safelist</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm" tone="warning">缝合点</Pill>}>Serverless 代理</CardHeader>
            <CardBody>
              <Text size="small">WebDAV 共用 server/albumWebdavHttp；Vercel api/ 与 Vite 插件适配（ADR-0002）</Text>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      {/* 如何运行 */}
      <Stack gap={12}>
        <H2>如何运行</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>本地开发</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">pnpm install</Text>
                <Text size="small">pnpm dev → http://localhost:4859</Text>
                <Text size="small">pnpm fuse / pnpm rss（按需）</Text>
                <Text size="small">WebDAV：复制 .env.example → WEBDAV_PASSWORD</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>构建与预览</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">pnpm build（包装 SSG，输出 dist/）</Text>
                <Text size="small">pnpm build:spa / build:ssg:raw</Text>
                <Text size="small">pnpm serve（vite preview）</Text>
                <Text size="small">docker build . -t blog:latest</Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
        <Callout tone="neutral" title="演示与配置 URL">
          线上演示：https://daily.yybb.us/ · site.config.url 当前为 https://threetwoa-blogs.vercel.app/（存在不一致）
        </Callout>
      </Stack>

      {/* 亮点 */}
      <Stack gap={12}>
        <H2>亮点</H2>
        <Grid columns={2} gap={12}>
          <Stack gap={8}>
            <H3>产品与体验</H3>
            <Text size="small">· Stage 1–10 完整演进：图表 → 首页动态 → FOUC → 灯箱 → 友链/留言 → 导航 → 搜索 → 相册 → 构建修复</Text>
            <Text size="small">· 相册双图源（local / WebDAV）+ 加密访问 + 时间轴 + Range 视频代理</Text>
            <Text size="small">· 写作流闭环：Obsidian 草稿 → Skill → R2 配图 → CI 发布</Text>
          </Stack>
          <Stack gap={8}>
            <H3>工程与文档</H3>
            <Text size="small">· ADR + CONTEXT/LANGUAGE + tutorials，Agent 友好</Text>
            <Text size="small">· build-ssg.mjs：针对 Valaxy SSG 挂起的工程化兜底（心跳、超时、dist 内容检测）</Text>
            <Text size="small">· 多平台部署清单齐全（GH Pages / Vercel / Netlify / Docker+nginx）</Text>
          </Stack>
        </Grid>
      </Stack>

      {/* 风险与改进 */}
      <Stack gap={12}>
        <H2>风险与改进</H2>
        <Table
          headers={["优先级", "问题", "建议"]}
          columnAlign={["left", "left", "left"]}
          rowTone={[
            "danger",
            "danger",
            "warning",
            "warning",
            "warning",
            "warning",
            "neutral",
            "neutral",
            "neutral",
            "neutral",
          ]}
          rows={[
            ["高", "valaxy-theme-sakura 使用 latest", "钉死版本并写入 lock 策略说明"],
            ["高", "相册 password 写在 frontmatter（客户端可见）", "仅作门禁 UI；敏感相册勿依赖前端密码"],
            ["中", "GH Pages workflow 用 npm i，与 pnpm 仓库不一致", "改用 pnpm/action-setup + frozen-lockfile"],
            ["中", "Actions 用 checkout/setup-node@v2", "升级到 v4，减少弃用风险"],
            ["中", "site.url 与演示域名不一致", "统一 canonical URL / SEO / RSS"],
            ["中", "WebDAV 强绑定 Vercel serverless", "补 Netlify/Workers 适配或文档标明限制"],
            ["低", "package.json name 前导空格", "改为 \"threetwoa-blogs\""],
            ["低", "无 lint / test 脚本", "加 ESLint/Vue TSC 与关键工具单测"],
            ["低", "ADR-0001 仍写 search.enable:false", "与现状对齐，避免 Agent 误读"],
            ["低", "内容量仅 7 篇，含测试文", "清理 about-me-test；充实原创"],
          ]}
        />
        <Callout tone="warning" title="CI / 包管理断层">
          README/Dockerfile/Vercel 走 pnpm，但 .github/workflows/gh-pages.yml 仍 npm i + npm run build，在 shamefully-hoist 环境下可能偶发不一致构建。
        </Callout>
      </Stack>

      <Divider />

      <Stack gap={6}>
        <H3>功能成熟度（Stage）</H3>
        <Row gap={6} wrap>
          <Pill tone="success" size="sm">1 图表</Pill>
          <Pill tone="success" size="sm">2 首页动态</Pill>
          <Pill tone="success" size="sm">3 FOUC</Pill>
          <Pill tone="success" size="sm">4 灯箱</Pill>
          <Pill tone="success" size="sm">5 友链</Pill>
          <Pill tone="success" size="sm">6 留言板</Pill>
          <Pill tone="success" size="sm">7 导航</Pill>
          <Pill tone="success" size="sm">8 搜索</Pill>
          <Pill tone="success" size="sm">9 相册</Pill>
          <Pill tone="success" size="sm">10 构建</Pill>
          <Pill tone="info" size="sm">Next 内容与搜索体验</Pill>
        </Row>
        <Spacer height={8} />
        <Text tone="tertiary" size="small">
          结论：模板工程完成度高、文档与 Agent 工作流突出；主要风险集中在依赖钉死、CI 一致性、相册前端密码语义与 WebDAV 平台耦合。
        </Text>
      </Stack>
    </Stack>
  );
}
