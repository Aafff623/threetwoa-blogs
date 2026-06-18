# Valaxy 博客全局美化教程（一）：分类、标签、归档三个页面的美化

> 来源：[https://daily.yybb.us/posts/valaxy-1](https://daily.yybb.us/posts/valaxy-1)  
> 作者：AIOVTUE  
> 许可：CC BY-NC-SA

本系列教程共十篇：

1. 分类、标签、归档三个页面的美化教程（本文）
2. 首页公告栏美化，新增随机文章展示板块
3. 给网页增加加载动画
4. 增加图片预览功能
5. 友链页面美化，修改了友链样式以及增加留言板
6. 留言页面增加信封展开效果
7. 新增网址导航页面
8. 页脚倒计时、搜索问题修复
9. 新增相册页面，支持使用 WebDAV 作为相册
10. 修复构建结束的时候会卡住

---

## 简介

Valaxy = V + Galaxy，旨在成为下一代静态博客框架，提供更好的热更新与用户加载体验、更强大更便捷的自定义开发可能性。

- Valaxy 开源地址：[valaxy](https://github.com/YunYouJun/valaxy)
- 本系列教程使用的主题：Sakura 主题：[sakura](https://github.com/WRXinYue/valaxy-theme-sakura)

本教程基于 Windows 端。

---

## 开始部署

1. 新建一个文件夹（路径不要出现中文，避免后续奇奇怪怪的问题）。
2. 使用管理员身份打开 PowerShell 终端。
3. `cd` 到该文件夹。
4. 安装 Valaxy 和主题：
   ```bash
   pnpm create valaxy
   ```
   - 选择 **blog**
   - 主题选择 **custom**，然后输入 `sakura`
   - 项目名称随便起英文
   - 是否运行：输入 `y`
   - 选择 `pnpm`
5. 安装完成后出现的链接就是本地预览地址，`Ctrl + 鼠标点击` 在浏览器打开。

---

## 开始美化

一共分为两大步：

- **新增文件**：6 个文件（4 个 Vue 组件 + 2 个辅助文件）
- **修改文件**：`valaxy.config.ts` 的主题配置 + 三个页面的 `index.md`

> 注意：大部分教程后续会重复类似操作，第一次出现的地方会详细说明，后面忘记了可以回来看前面。

---

## 一、分类页面

分类页面新增 2 个文件。

### 1. 新增 `components/SakuraCategoriesChart.vue`

作用：在分类页渲染一个环状图（玫瑰图或旭日图），点击分类可筛选文章。

```vue
<script lang="ts" setup>
import type { Categories, CategoryList } from 'valaxy'
import { isCategoryList, useAppStore } from 'valaxy'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { loadEcharts, observeChartResize, type EChartsInstance } from '../utils/echarts'

interface ChartDataItem {
  name: string
  value: number
  categoryKey: string
  children?: ChartDataItem[]
}

interface ChartClickParams {
  data?: {
    categoryKey?: string
  }
}

const props = defineProps<{
  categories: Categories
}>()

const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore()
const chartRef = ref<HTMLElement>()
let chartInstance: EChartsInstance | null = null
let stopObserveResize: (() => void) | undefined

const textColor = computed(() =>
  appStore.isDark ? 'rgba(255,255,255,0.7)' : '#4c4948',
)

function getCategoryName(name: string) {
  return name === 'Uncategorized' ? t('category.uncategorized') : name
}

function hasNestedCategories(categories: Categories) {
  for (const category of categories.values()) {
    if (!isCategoryList(category))
      continue
    for (const child of category.children.values()) {
      if (isCategoryList(child))
        return true
    }
  }
  return false
}

function buildFlatData(categories: Categories): ChartDataItem[] {
  const data: ChartDataItem[] = []
  for (const category of categories.values()) {
    if (!isCategoryList(category))
      continue
    data.push({
      name: getCategoryName(category.name),
      value: category.total,
      categoryKey: category.name,
    })
  }
  return data
}

function buildTreeNode(category: CategoryList, parentKey = ''): ChartDataItem {
  const categoryKey = parentKey ? `${parentKey}/${category.name}` : category.name
  const node: ChartDataItem = {
    name: getCategoryName(category.name),
    value: category.total,
    categoryKey,
  }

  const children: ChartDataItem[] = []
  for (const child of category.children.values()) {
    if (isCategoryList(child))
      children.push(buildTreeNode(child, categoryKey))
  }

  if (children.length > 0)
    node.children = children

  return node
}

function buildTreeData(categories: Categories) {
  return Array.from(categories.values())
    .filter(isCategoryList)
    .map(category => buildTreeNode(category))
}

function buildChartOption(hasParentCategory: boolean) {
  const flatData = buildFlatData(props.categories)
  const treeData = buildTreeData(props.categories)
  const color = textColor.value

  const option: Record<string, unknown> = {
    title: {
      text: '文章分类统计图',
      x: 'center',
      textStyle: { color },
    },
    legend: {
      top: 'bottom',
      data: flatData.map(item => item.name),
      textStyle: { color },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}篇 ({d}%)',
    },
    series: [],
  }

  if (hasParentCategory) {
    ;(option.series as unknown[]).push({
      nodeClick: false,
      name: '文章篇数',
      type: 'sunburst',
      radius: ['15%', '90%'],
      center: ['50%', '55%'],
      sort: 'desc',
      data: treeData,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
        emphasis: {
          focus: 'ancestor',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    })
  }
  else {
    ;(option.series as unknown[]).push({
      name: '文章篇数',
      type: 'pie',
      radius: [30, 80],
      roseType: 'area',
      label: {
        color,
        formatter: '{b} : {c} ({d}%)',
      },
      data: flatData,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    })
  }

  return option
}

function renderChart() {
  if (!chartInstance || !chartRef.value)
    return

  const hasParentCategory = hasNestedCategories(props.categories)
  chartInstance.setOption(buildChartOption(hasParentCategory), true)
}

function handleChartResize() {
  chartInstance?.resize()
}

async function initChart() {
  if (!chartRef.value)
    return

  const echarts = await loadEcharts()
  chartInstance = echarts.init(chartRef.value, 'light')
  renderChart()
  chartInstance.resize()

  chartInstance.on('click', 'series', (event: ChartClickParams) => {
    if (event.data?.categoryKey) {
      router.push({
        query: { category: event.data.categoryKey },
      })
    }
  })

  stopObserveResize = observeChartResize(chartRef.value, handleChartResize)
}

const categorySignature = computed(() =>
  Array.from(props.categories.entries())
    .map(([key, value]) => (isCategoryList(value) ? `${key}:${value.total}` : key))
    .join('|'),
)

watch(categorySignature, renderChart)
watch(textColor, renderChart)

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  stopObserveResize?.()
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<template>
  <div
    id="categories-chart"
    ref="chartRef"
    class="sakura-stat-chart sakura-categories-chart"
    data-parent="true"
  />
</template>

<style lang="scss" scoped>
.sakura-categories-chart {
  display: block;
  height: 360px;
  padding: 10px;
  margin-bottom: 1rem;
}
</style>
```

### 2. 新增 `components/layouts/SakuraCategoriesLayout.vue`

作用：覆盖主题分类页布局，根据配置选择显示图表或列表，并支持按分类筛选文章。

```vue
<script lang="ts" setup>
import { useCategories, useConfig, useSiteStore } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

type CategoriesStyle = 'list' | 'chart'

interface CategoriesThemeConfig {
  style?: CategoriesStyle
}

const site = useSiteStore()
const config = useConfig()

const { t } = useI18n()
const route = useRoute()
const curCategory = computed(() => (route.query.category || '') as string)
const categories = useCategories()

const categoryStyle = computed(() => {
  const themeConfig = config.value?.themeConfig as { categories?: CategoriesThemeConfig } | undefined
  return themeConfig?.categories?.style ?? 'list'
})

const posts = computed(() => {
  const list = site.postList.filter((post) => {
    if (post.categories && curCategory.value !== 'Uncategorized') {
      if (typeof post.categories === 'string')
        return post.categories === curCategory.value
      else
        return post.categories.join('/').startsWith(curCategory.value) && post.categories[0] === curCategory.value.split('/')[0]
    }
    if (!post.categories && curCategory.value === 'Uncategorized')
      return post.categories === undefined
    return false
  })
  return list
})
</script>

<template>
  <SakuraPage class="sakura-categories-page">
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <div>
              <div text="center" class="yun-text-light" p="2">
                {{ t('counter.categories', Array.from(categories.children).length) }}
              </div>

              <SakuraCategoriesChart
                v-if="categoryStyle === 'chart'"
                :categories="categories.children"
              />
              <SakuraCategories
                v-else
                :categories="categories.children"
              />
            </div>
          </slot>
        </template>

        <template #main-nav-before>
          <slot name="posts">
            <div v-if="curCategory">
              <SakuraPostList w="full" :posts />
            </div>
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>

<style lang="scss">
.sakura-categories-page {
  .sakura-triple-columns {
    width: 100%;
  }
}
</style>
```

---

## 二、归档页面

归档页面新增 2 个文件。

### 1. 新增 `components/SakuraArchivesChart.vue`

作用：按月统计文章发布数量，渲染折线面积图。

```vue
<script lang="ts" setup>
import type { Post } from 'valaxy'
import { useAppStore } from 'valaxy'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createGradient, loadEcharts, observeChartResize, type EChartsInstance } from '../utils/echarts'

const props = withDefaults(defineProps<{
  posts: Post[]
  startMonth?: string
}>(), {
  startMonth: '2020-01',
})

const router = useRouter()
const appStore = useAppStore()
const chartRef = ref<HTMLElement>()
let chartInstance: EChartsInstance | null = null
let echartsLib: NonNullable<Window['echarts']> | null = null
let stopObserveResize: (() => void) | undefined

const textColor = computed(() =>
  appStore.isDark ? 'rgba(255,255,255,0.7)' : '#4c4948',
)

function generateMonthArray(startMonth: string) {
  const [startYear, startMon] = startMonth.split('-').map(Number)
  const now = new Date()
  const endYear = now.getFullYear()
  const endMon = now.getMonth() + 1

  const months: string[] = []
  let year = startYear
  let month = startMon

  while (year < endYear || (year === endYear && month <= endMon)) {
    months.push(`${year}-${String(month).padStart(2, '0')}`)
    month += 1
    if (month > 12) {
      month = 1
      year += 1
    }
  }

  return months
}

function getPostMonth(post: Post) {
  if (!post.date)
    return null
  if (post.hide && post.hide !== 'index')
    return null

  const date = post.date instanceof Date ? post.date : new Date(post.date)
  if (Number.isNaN(date.getTime()))
    return null

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function countPostsByMonth(posts: Post[], monthArr: string[]) {
  const monthMap = new Map(monthArr.map(month => [month, 0]))

  posts.forEach((post) => {
    const month = getPostMonth(post)
    if (month && monthMap.has(month))
      monthMap.set(month, (monthMap.get(month) || 0) + 1)
  })

  return monthArr.map(month => monthMap.get(month) || 0)
}

const monthArr = computed(() => generateMonthArray(props.startMonth))
const monthValueArr = computed(() => countPostsByMonth(props.posts, monthArr.value))

const chartSignature = computed(() =>
  `${props.startMonth}|${monthArr.value.at(-1)}|${monthValueArr.value.join(',')}`,
)

function buildChartOption() {
  const color = textColor.value
  const gradient = echartsLib ? createGradient(echartsLib) : 'rgba(128, 255, 165)'

  return {
    title: {
      text: '文章发布统计图',
      x: 'center',
      textStyle: { color },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '16%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>文章篇数: {c}',
    },
    xAxis: {
      name: '日期',
      type: 'category',
      boundaryGap: false,
      nameTextStyle: { color },
      axisTick: { show: false },
      axisLabel: { show: true, color },
      axisLine: {
        show: true,
        lineStyle: { color },
      },
      data: monthArr.value,
    },
    yAxis: {
      name: '文章篇数',
      type: 'value',
      nameTextStyle: { color },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true, color },
      axisLine: {
        show: true,
        lineStyle: { color },
      },
    },
    series: [{
      name: '文章篇数',
      type: 'line',
      smooth: true,
      lineStyle: { width: 0 },
      showSymbol: false,
      itemStyle: {
        opacity: 1,
        color: gradient,
      },
      areaStyle: {
        opacity: 1,
        color: gradient,
      },
      data: monthValueArr.value,
      markLine: {
        data: [{
          name: '平均值',
          type: 'average',
          label: { color },
        }],
      },
    }],
  }
}

function renderChart() {
  if (!chartInstance)
    return

  chartInstance.setOption(buildChartOption(), true)
}

async function initChart() {
  if (!chartRef.value)
    return

  echartsLib = await loadEcharts()
  chartInstance = echartsLib.init(chartRef.value, 'light')
  renderChart()
  chartInstance.resize()

  chartInstance.on('click', 'series', (event) => {
    if (event.componentType !== 'series' || typeof event.name !== 'string')
      return

    const [year] = event.name.split('-')
    router.push({
      path: '/archives',
      hash: `##archive-year-${year}`,
    })
  })

  stopObserveResize = observeChartResize(chartRef.value, () => {
    chartInstance?.resize()
  })
}

watch(chartSignature, renderChart)
watch(textColor, renderChart)

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  stopObserveResize?.()
  chartInstance?.dispose()
  chartInstance = null
  echartsLib = null
})
</script>

<template>
  <div
    id="posts-chart"
    ref="chartRef"
    class="sakura-stat-chart sakura-archives-chart"
    :data-start="startMonth"
  />
</template>

<style lang="scss" scoped>
.sakura-archives-chart {
  display: block;
  height: 360px;
  padding: 10px;
  margin-bottom: 1rem;
}
</style>
```

### 2. 新增 `components/layouts/SakuraArchivesLayout.vue`

作用：覆盖主题归档页布局，选择显示时间线或统计图。

```vue
<script lang="ts" setup>
import { useConfig, useSiteStore } from 'valaxy'
import { computed } from 'vue'

type ArchivesStyle = 'list' | 'chart'

interface ArchivesThemeConfig {
  style?: ArchivesStyle
  startMonth?: string
}

const site = useSiteStore()
const config = useConfig()

const archiveStyle = computed(() => {
  const themeConfig = config.value?.themeConfig as { archives?: ArchivesThemeConfig } | undefined
  return themeConfig?.archives?.style ?? 'list'
})

const startMonth = computed(() => {
  const themeConfig = config.value?.themeConfig as { archives?: ArchivesThemeConfig } | undefined
  return themeConfig?.archives?.startMonth ?? '2020-01'
})
</script>

<template>
  <SakuraPage class="sakura-archivers-page">
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <div v-if="archiveStyle === 'chart'" class="sakura-archives-chart-section">
              <SakuraArchivesChart
                :posts="site.postList"
                :start-month="startMonth"
              />
              <SakuraTimeLine :posts="site.postList" />
            </div>
            <SakuraTimeLine v-else :posts="site.postList" />
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>

<style lang="scss">
.sakura-archivers-page {
  .sakura-one-columns,
  .sakura-triple-columns {
    width: 100%;
  }

  .sakura-page-content {
    width: 100%;
    max-width: none;
  }

  main {
    width: 100%;
  }

  .sakura-archives-chart-section {
    width: 100%;
    overflow: visible;
  }
}
</style>
```

---

## 三、标签页面

标签页面新增 2 个文件。

### 1. 新增 `components/SakuraTagsChart.vue`

作用：渲染 Top N 标签文章数量的柱状图。

```vue
<script lang="ts" setup>
import { useAppStore, useTags } from 'valaxy'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createGradient, loadEcharts, observeChartResize, type EChartsInstance } from '../utils/echarts'

interface TagDataItem {
  name: string
  value: number
  tagKey: string
}

const props = withDefaults(defineProps<{
  displayLength?: number
}>(), {
  displayLength: 10,
})

const tags = useTags()
const router = useRouter()
const appStore = useAppStore()
const chartRef = ref<HTMLElement>()
let chartInstance: EChartsInstance | null = null
let echartsLib: NonNullable<Window['echarts']> | null = null
let stopObserveResize: (() => void) | undefined

const textColor = computed(() =>
  appStore.isDark ? 'rgba(255,255,255,0.7)' : '#4c4948',
)

const displayData = computed(() => {
  const tagArr: TagDataItem[] = Array.from(tags.value.entries()).map(([key, tag]) => ({
    name: key,
    value: tag.count,
    tagKey: key,
  }))

  tagArr.sort((a, b) => b.value - a.value)
  return tagArr.slice(0, Math.min(tagArr.length, props.displayLength))
})

const chartSignature = computed(() =>
  displayData.value.map(item => `${item.tagKey}:${item.value}`).join('|'),
)

function buildChartOption() {
  const color = textColor.value
  const data = displayData.value
  const gradient = echartsLib ? createGradient(echartsLib) : 'rgba(128, 255, 165)'
  const emphasisGradient = echartsLib
    ? createGradient(echartsLib, 'rgba(128, 255, 195)', 'rgba(1, 211, 255)')
    : 'rgba(128, 255, 195)'

  const option: Record<string, unknown> = {
    title: {
      text: data.length ? `Top ${data.length} 标签统计图` : '标签统计图',
      x: 'center',
      textStyle: { color },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: data.length > 6 ? '20%' : '14%',
      top: '16%',
      containLabel: true,
    },
    tooltip: {
      formatter: '{b}<br/>文章篇数: {c}',
    },
    xAxis: {
      name: '标签',
      type: 'category',
      nameTextStyle: { color },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        color,
        interval: 0,
        rotate: 0,
      },
      axisLine: {
        show: true,
        lineStyle: { color },
      },
      data: data.map(item => item.name),
    },
    yAxis: {
      name: '文章篇数',
      type: 'value',
      splitLine: { show: false },
      nameTextStyle: { color },
      axisTick: { show: false },
      axisLabel: { show: true, color },
      axisLine: {
        show: true,
        lineStyle: { color },
      },
    },
    series: [{
      name: '文章篇数',
      type: 'bar',
      data,
      itemStyle: {
        color: gradient,
      },
      emphasis: {
        itemStyle: {
          color: emphasisGradient,
        },
      },
    }],
  }

  if (data.length > 0) {
    ;(option.series as Array<Record<string, unknown>>)[0].markLine = {
      data: [{
        name: '平均值',
        type: 'average',
        label: { color },
      }],
    }
  }

  return option
}

function renderChart() {
  if (!chartInstance)
    return

  chartInstance.setOption(buildChartOption(), true)
}

async function initChart() {
  if (!chartRef.value)
    return

  try {
    echartsLib = await loadEcharts()
    chartInstance = echartsLib.init(chartRef.value, 'light')
    renderChart()
    chartInstance.resize()

    chartInstance.on('click', 'series', (event) => {
      const data = event.data as TagDataItem | number | undefined
      const tagKey = typeof data === 'object' && data?.tagKey
        ? data.tagKey
        : typeof event.name === 'string'
          ? event.name
          : undefined

      if (tagKey) {
        router.push({
          query: { tag: tagKey },
        })
      }
    })

    stopObserveResize = observeChartResize(chartRef.value, () => {
      chartInstance?.resize()
    })
  }
  catch (error) {
    console.error('[SakuraTagsChart] init failed:', error)
  }
}

watch(chartSignature, renderChart)
watch(textColor, renderChart)
watch(() => props.displayLength, renderChart)

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  stopObserveResize?.()
  chartInstance?.dispose()
  chartInstance = null
  echartsLib = null
})
</script>

<template>
  <div
    id="tags-chart"
    ref="chartRef"
    class="sakura-stat-chart sakura-tags-chart"
    :data-length="displayLength"
  />
</template>

<style lang="scss" scoped>
.sakura-tags-chart {
  display: block;
  height: 360px;
  padding: 10px;
  margin-bottom: 1rem;
}
</style>
```

### 2. 新增 `components/layouts/SakuraTagsLayout.vue`

作用：覆盖主题标签页布局，选择显示按钮列表或柱状图，并支持按标签筛选文章。

```vue
<script lang="ts" setup>
import { useConfig, useSiteStore, useTags } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

type TagsStyle = 'list' | 'chart'

interface TagsPageThemeConfig {
  style?: TagsStyle
  chartLength?: number
}

const route = useRoute()
const router = useRouter()
const site = useSiteStore()
const tags = useTags()
const config = useConfig()
const { t } = useI18n()

const tagStyle = computed(() => {
  const themeConfig = config.value?.themeConfig as { tagsPage?: TagsPageThemeConfig } | undefined
  return themeConfig?.tagsPage?.style ?? 'list'
})

const chartLength = computed(() => {
  const themeConfig = config.value?.themeConfig as { tagsPage?: TagsPageThemeConfig } | undefined
  return themeConfig?.tagsPage?.chartLength ?? 10
})

const curTag = computed(() => route.query.tag as string || '')
const posts = computed(() => {
  const list = site.postList.filter((post) => {
    if (post.tags) {
      if (typeof post.tags === 'string')
        return post.tags === curTag.value
      else
        return post.tags.includes(curTag.value)
    }
    return false
  })
  return list
})

function displayTag(tag: string) {
  router.push({ query: { tag } })
}
</script>

<template>
  <SakuraPage class="sakura-tags-page">
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <div>
              <div class="sakura-text-light" text="center" p="2">
                {{ t('counter.tags', Array.from(tags).length) }}
              </div>

              <template v-if="tagStyle === 'chart'">
                <SakuraTagsChart :display-length="chartLength" />

                <div class="sakura-tags-list items-end justify-center" flex="~ wrap" gap="1">
                  <SakuraButton
                    v-for="([key, tag]) in Array.from(tags).sort()"
                    :key="key"
                    class="sakura-tag-button"
                    :class="{ clicked: curTag === key.toString() }"
                    @click="displayTag(key.toString())"
                  >
                    <span mx-1 inline-flex>{{ key }}</span>
                    <span inline-flex text="xs">[{{ tag.count }}]</span>
                  </SakuraButton>
                </div>

                <SakuraDivider icon="i-fa6-solid:water" text="文章列表" :divider="false" />
              </template>

              <template v-else>
                <div class="items-end justify-center" flex="~ wrap" gap="1">
                  <SakuraButton
                    v-for="([key, tag]) in Array.from(tags).sort()"
                    :key="key"
                    class="sakura-tag-button"
                    :class="{ clicked: curTag === key.toString() }"
                    @click="displayTag(key.toString())"
                  >
                    <span mx-1 inline-flex>{{ key }}</span>
                    <span inline-flex text="xs">[{{ tag.count }}]</span>
                  </SakuraButton>
                </div>

                <SakuraDivider icon="i-fa6-solid:water" text="文章列表" :divider="false" />
              </template>
            </div>
          </slot>
        </template>

        <template #main-nav-before>
          <slot name="post">
            <div v-if="curTag">
              <SakuraPostList :posts />
            </div>
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>

<style lang="scss" scoped>
.sakura-tags-list {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.sakura-tag-button {
  color: var(--sakura-tag-color) !important;
  background-color: var(--sakura-tag-bg);
  line-height: 1.75rem;
  transition:
    color 0.3s ease-in-out,
    color-border 0.2s ease-in-out;

  &:hover {
    color: var(--sakura-tag-color, var(--sakura-color-primary)) !important;
    border-color: var(--sakura-tag-color, var(--sakura-color-primary));
  }

  &.clicked {
    color: var(--sakura-tag-color, var(--sakura-color-primary)) !important;
    border-color: var(--sakura-tag-color, var(--sakura-color-primary));
  }

  &::before {
    content: '#';
  }
}
</style>

<style lang="scss">
.sakura-tags-page {
  .sakura-one-columns,
  .sakura-triple-columns {
    width: 100%;
  }

  .sakura-page-content {
    width: 100%;
    max-width: none;
  }

  main {
    width: 100%;
  }
}
</style>
```

---

## 四、其他新增文件

### 1. 新增 `utils/echarts.ts`

作用：封装 echarts 动态加载、渐变生成和图表 ResizeObserver 逻辑。

```ts
import type { ECharts } from 'echarts'

export type EChartsInstance = ECharts
export type EchartsLib = typeof import('echarts')

export function loadEcharts() {
  return import('echarts')
}

export function createGradient(
  echartsLib: Awaited<ReturnType<typeof loadEcharts>>,
  topColor = 'rgba(128, 255, 165)',
  bottomColor = 'rgba(1, 191, 236)',
) {
  return echartsLib.graphic?.LinearGradient
    ? new echartsLib.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: topColor },
        { offset: 1, color: bottomColor },
      ])
    : topColor
}

export function observeChartResize(
  el: HTMLElement | undefined,
  onResize: () => void,
) {
  if (!el)
    return () => {}

  let resizeTimer: ReturnType<typeof setTimeout> | undefined

  const scheduleResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(onResize, 100)
  }

  const observer = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(scheduleResize)
    : null

  observer?.observe(el)
  window.addEventListener('resize', scheduleResize)

  return () => {
    observer?.disconnect()
    window.removeEventListener('resize', scheduleResize)
    clearTimeout(resizeTimer)
  }
}
```

### 2. 新增/更新 `styles/index.scss`

作用：给统计图容器统一设置背景、黑色描边、圆角，并铺满视口宽度。

```scss
/* 统计图容器：与文章卡片一致的背景与黑色描边，横向铺满视口并保留边距 */

.sakura-stat-chart {
  --chart-edge: max(20px, env(safe-area-inset-left, 0px));

  box-sizing: border-box;
  width: calc(100vw - 2 * var(--chart-edge));
  max-width: none;
  margin-inline: calc(50% - 50vw + var(--chart-edge));

  border-radius: var(--sakura-post-card-rd, 12px);
  background: var(--sakura-post-card-bg, var(--va-c-bg-soft));
  border: 1px solid rgba(0, 0, 0, 0.85);
}

@media (min-width: 640px) {
  .sakura-stat-chart {
    --chart-edge: max(40px, env(safe-area-inset-left, 0px));
  }
}

html.dark .sakura-stat-chart {
  border-color: var(--sakura-color-divider, rgba(255, 255, 255, 0.2));
}
```

---

## 五、修改 `valaxy.config.ts`

在 `themeConfig: {}` 的 `{}` 内增加以下配置：

```ts
// 分类页样式：list 列表 / chart 环状图（玫瑰图或旭日图）
categories: {
  style: 'chart',
},

// 归档页样式：list 时间线 / chart 发布统计折线面积图
archives: {
  style: 'chart',
  startMonth: '2020-01',
},

// 标签页样式：list 按钮列表 / chart 柱状统计图
tagsPage: {
  style: 'chart',
  chartLength: 10,
},

tags: {
  rainbow: false,
},
```

最终效果示例：

```ts
export default defineValaxyConfig({
  theme: 'sakura',
  themeConfig: {
    // ...
    categories: {
      style: 'chart',
    },
    archives: {
      style: 'chart',
      startMonth: '2020-01',
    },
    tagsPage: {
      style: 'chart',
      chartLength: 10,
    },
    tags: {
      rainbow: false,
    },
  },
  unocss: { safelist },
})
```

---

## 六、创建三个页面

在 `pages/` 下创建三个文件夹，每个文件夹内新建 `index.md`。

### `pages/categories/index.md`

```yaml
---
layout: categories
title: 分类
icon: i-ri-folder-line
cover: https://你的图床.png
comment: false
---
```

### `pages/tags/index.md`

```yaml
---
layout: tags
title: 标签
icon: i-ri-price-tag-3-line
cover: https://你的图床.png
comment: false
---
```

### `pages/archives/index.md`

```yaml
---
layout: archives
title: 归档
icon: i-ri-archive-line
cover: https://你的图床.png
comment: false
---
```

> `layout` 决定页面类型；`title` 为页面标题；`icon` 为图标；`cover` 为顶部头图；`comment: false` 关闭评论。

---

## 七、验证

1. 如果终端服务还启动着，直接按 `r` 刷新。
2. 如果终端关掉了，`cd` 到项目目录，运行：
   ```bash
   pnpm dev
   ```
3. 打开浏览器访问分类、标签、归档页面，查看图表效果。

---

## 依赖说明

本阶段需要安装 `echarts` 作为依赖：

```bash
pnpm add echarts
```

三个图表组件通过 `import('echarts')` 动态加载 echarts，因此 `echarts` 必须存在于 `node_modules`。

---

## 下一篇

[Valaxy 博客全局美化教程（二）：首页公告栏美化，新增随机文章展示板块](https://daily.yybb.us/posts/valaxy-2)
