# Valaxy 博客全局美化教程（二）：首页公告栏美化，新增随机文章展示板块

> 来源：[https://daily.yybb.us/posts/valaxy-2](https://daily.yybb.us/posts/valaxy-2)  
> 作者：AIOVTUE  
> 许可：CC BY-NC-SA

本系列教程共十篇：

1. 分类、标签、归档三个页面的美化教程
2. 首页公告栏美化，新增随机文章展示板块（本文）
3. 给网页增加加载动画
4. 增加图片预览功能
5. 友链页面美化，修改了友链样式以及增加留言板
6. 留言页面增加信封展开效果
7. 新增网址导航页面
8. 页脚倒计时、搜索问题修复
9. 新增相册页面，支持使用 WebDAV 作为相册
10. 修复构建结束的时候会卡住

---

## 最终效果

左侧部分是公告栏，会自动识别链接，点击跳转；右侧部分是随机文章，会随时间自动切换，也可以用滚轮手动切换。

---

## 开始美化

大部分操作和上一篇类似，忘记的可以回看第一篇。

---

## 一、修改文件

### `valaxy.config.ts`

在 `themeConfig: {}` 内新增 `notice` 配置：

```ts
themeConfig: {
  // ...
  notice: {
    rotateInterval: 5000,
    title: '公告栏',
    sections: [
      {
        label: '--- 主域名 ---',
        lines: [
          'daily.yybb.us',
          'hexo.yybb.us',
          // 也支持对象：{ text: '显示文字', url: 'https://example.com' }
        ],
      },
      {
        label: '--- 备用域名 ---',
        lines: [
          'vercel.yybb.us',
          'aiovtue.onrender.com',
          'aiovtue.zeabur.app',
        ],
      },
    ],
  },
  // ...
}
```

---

## 二、新增文件

### `components/SakuraNoticeBoard.vue`

作用：在首页渲染左侧公告栏 + 右侧随机文章轮播卡片。

```vue
<script setup lang="ts">
import { useConfig, usePostList } from 'valaxy'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const DOT_COUNT = 5
const CENTER_DOT = 2
const DOT_SIZE = 8
const DOT_GAP = 14
const DOT_STEP = DOT_SIZE + DOT_GAP
const DOT_ANIM_MS = 380

const props = defineProps<{
  rotateInterval?: number
}>()

const config = useConfig()
const posts = usePostList()

const themeConfig = computed(() => config.value.themeConfig as {
  notice?: {
    rotateInterval?: number
    title?: string
    sections?: Array<{
      label: string
      lines: NoticeLineConfig[]
    }>
  }
  postList?: { defaultImage?: string | string[] }
})

type NoticeLineConfig = string | {
  text: string
  url?: string
}

interface ResolvedNoticeLine {
  text: string
  url?: string
  external?: boolean
}

function guessNoticeUrl(text: string): string | undefined {
  const value = text.trim()
  if (!value)
    return undefined
  if (/^https?:\/\//i.test(value))
    return value
  if (value.startsWith('/'))
    return value
  if (/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(value))
    return `https://${value}`
  return undefined
}

function resolveNoticeLine(line: NoticeLineConfig): ResolvedNoticeLine {
  if (typeof line === 'object') {
    const url = line.url || guessNoticeUrl(line.text)
    return {
      text: line.text,
      url,
      external: url ? /^https?:\/\//i.test(url) : false,
    }
  }

  const url = guessNoticeUrl(line)
  return {
    text: line,
    url,
    external: url ? /^https?:\/\//i.test(url) : false,
  }
}

const intervalMs = computed(() => props.rotateInterval || themeConfig.value.notice?.rotateInterval || 5000)

const noticeTitle = computed(() => themeConfig.value.notice?.title || '公告栏')

const noticeSections = computed(() => {
  const sections = themeConfig.value.notice?.sections
  if (!sections?.length)
    return []

  return sections.map(section => ({
    label: section.label,
    lines: section.lines.map(line => resolveNoticeLine(line)),
  }))
})
const hasPosts = computed(() => posts.value.length > 0)

const currentIndex = ref(0)
const dotTrackRef = ref<HTMLElement | null>(null)
const dotTrackY = ref(0)
const trackTransition = ref(true)
const extraDotEnd = ref<'top' | 'bottom' | null>(null)
const isDotAnimating = ref(false)
const isArticleHovered = ref(false)

let timer: ReturnType<typeof setInterval> | undefined
let scrollQueue = 0
let scrollWorkerRunning = false
let skipTransition: (() => void) | null = null

const currentPost = computed(() => {
  const list = posts.value
  if (!list.length)
    return null
  return list[currentIndex.value]
})

const currentCover = computed(() => {
  const post = currentPost.value
  if (!post)
    return ''

  const fallback = themeConfig.value.postList?.defaultImage
  const defaultImage = Array.isArray(fallback) ? fallback[0] : fallback
  return post.cover || defaultImage || ''
})

const visibleDots = computed(() => {
  const dots = Array.from({ length: DOT_COUNT }, (_, dotIndex) => ({
    key: `dot-${dotIndex}`,
    dotIndex,
    offset: dotIndex - CENTER_DOT,
  }))

  if (extraDotEnd.value === 'bottom') {
    dots.push({
      key: 'dot-extra-bottom',
      dotIndex: DOT_COUNT,
      offset: CENTER_DOT + 1,
    })
  }

  if (extraDotEnd.value === 'top') {
    dots.unshift({
      key: 'dot-extra-top',
      dotIndex: -1,
      offset: -(CENTER_DOT + 1),
    })
  }

  return dots
})

function normalizeIndex(index: number) {
  const len = posts.value.length
  if (!len)
    return 0
  return ((index % len) + len) % len
}

function waitTrackTransition(): Promise<void> {
  return new Promise((resolve) => {
    const track = dotTrackRef.value
    if (!track) {
      resolve()
      return
    }

    let settled = false
    const finish = () => {
      if (settled)
        return
      settled = true
      track.removeEventListener('transitionend', onEnd)
      skipTransition = null
      resolve()
    }

    skipTransition = finish

    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform')
        return
      finish()
    }

    track.addEventListener('transitionend', onEnd)
    window.setTimeout(finish, DOT_ANIM_MS + 60)
  })
}

async function animateDotStep(direction: 'next' | 'prev') {
  if (direction === 'next') {
    extraDotEnd.value = 'bottom'
    await nextTick()

    trackTransition.value = true
    dotTrackY.value = -DOT_STEP
    await waitTrackTransition()

    trackTransition.value = false
    currentIndex.value = normalizeIndex(currentIndex.value + 1)
    extraDotEnd.value = null
    dotTrackY.value = 0
    await nextTick()
    trackTransition.value = true
    return
  }

  extraDotEnd.value = 'top'
  await nextTick()

  trackTransition.value = false
  dotTrackY.value = -DOT_STEP
  await nextTick()

  trackTransition.value = true
  dotTrackY.value = 0
  await waitTrackTransition()

  trackTransition.value = false
  currentIndex.value = normalizeIndex(currentIndex.value - 1)
  extraDotEnd.value = null
  dotTrackY.value = 0
  await nextTick()
  trackTransition.value = true
}

function skipTrackTransition() {
  if (!skipTransition)
    return

  trackTransition.value = false
  skipTransition()
}

async function runScrollWorker() {
  if (scrollWorkerRunning)
    return

  scrollWorkerRunning = true
  isDotAnimating.value = true
  try {
    while (scrollQueue !== 0) {
      const direction = scrollQueue > 0 ? 'next' : 'prev'
      scrollQueue += direction === 'next' ? -1 : 1
      await animateDotStep(direction)
    }
  }
  finally {
    scrollWorkerRunning = false
    isDotAnimating.value = false
  }
}

function enqueueScroll(delta: number) {
  if (delta === 0)
    return

  scrollQueue += delta
  if (scrollWorkerRunning)
    skipTrackTransition()
  else
    runScrollWorker()
}

async function goToOffset(offset: number, animateDots = false) {
  if (!hasPosts.value || offset === 0)
    return

  if (!animateDots) {
    currentIndex.value = normalizeIndex(currentIndex.value + offset)
    return
  }

  const direction = offset > 0 ? 1 : -1
  for (let step = 0; step < Math.abs(offset); step++)
    enqueueScroll(direction)
}

function goToDot(offset: number) {
  goToOffset(offset, offset !== 0)
}

function initRandomIndex() {
  const len = posts.value.length
  if (len)
    currentIndex.value = Math.floor(Math.random() * len)
}

function onArticleMouseEnter() {
  isArticleHovered.value = true
  stopAutoRotate()
}

function onArticleMouseLeave() {
  isArticleHovered.value = false
  startAutoRotate()
}

function onWheel(event: WheelEvent) {
  if (!hasPosts.value)
    return

  event.preventDefault()

  if (Math.abs(event.deltaY) < 8)
    return

  enqueueScroll(event.deltaY > 0 ? 1 : -1)
}

function startAutoRotate() {
  stopAutoRotate()
  if (!hasPosts.value || posts.value.length <= 1 || isArticleHovered.value)
    return

  timer = setInterval(() => {
    if (!isArticleHovered.value)
      enqueueScroll(1)
  }, intervalMs.value)
}

function stopAutoRotate() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

watch(hasPosts, (available) => {
  if (available) {
    initRandomIndex()
    startAutoRotate()
  }
  else {
    stopAutoRotate()
    currentIndex.value = 0
  }
}, { immediate: true })

onMounted(() => {
  if (hasPosts.value)
    initRandomIndex()
})

onUnmounted(() => {
  stopAutoRotate()
})
</script>

<template>
  <div m="b-5 t-10" class="notice-board-wrap">
    <div class="notice-board-wrap__notice sakura-card">
      <h3 class="notice-board-wrap__title">
        {{ noticeTitle }}
      </h3>

      <template
        v-for="(section, sectionIndex) in noticeSections"
        :key="`${section.label}-${sectionIndex}`"
      >
        <div class="notice-board-wrap__section">
          {{ section.label }}
        </div>
        <p
          v-for="(line, lineIndex) in section.lines"
          :key="`${sectionIndex}-${lineIndex}`"
          class="notice-board-wrap__line"
        >
          <a
            v-if="line.url"
            :href="line.url"
            class="notice-board-wrap__link"
            :target="line.external ? '_blank' : undefined"
            :rel="line.external ? 'noopener noreferrer' : undefined"
          >
            {{ line.text }}
          </a>
          <template v-else>
            {{ line.text }}
          </template>
        </p>
      </template>
    </div>

    <div
      v-if="hasPosts && currentPost"
      class="notice-board-wrap__article sakura-card"
      @mouseenter="onArticleMouseEnter"
      @mouseleave="onArticleMouseLeave"
      @wheel="onWheel"
    >
      <RouterLink
        class="notice-board-wrap__article-link"
        :to="currentPost.path"
        :aria-label="`查看文章：${currentPost.title}`"
      />

      <div
        class="notice-board-wrap__cover-col"
      >
        <div
          class="notice-board-wrap__dots"
          role="tablist"
          aria-label="文章切换"
        >
          <div
            class="notice-board-wrap__dot-center"
            :class="{ 'is-animating': isDotAnimating }"
            aria-hidden="true"
          />
          <div
            ref="dotTrackRef"
            class="notice-board-wrap__dots-track"
            :class="{ 'is-no-transition': !trackTransition }"
            :style="{ transform: `translateY(${dotTrackY}px)` }"
          >
            <button
              v-for="dot in visibleDots"
              :key="dot.key"
              type="button"
              class="notice-board-wrap__dot"
              :style="{ '--dot-index': dot.dotIndex }"
              :aria-label="dot.offset === 0 ? '当前文章' : `切换${dot.offset > 0 ? '后' : '前'}${Math.abs(dot.offset)}篇`"
              :aria-selected="dot.offset === 0"
              role="tab"
              @click="goToDot(dot.offset)"
            />
          </div>
        </div>

        <div class="notice-board-wrap__cover-frame">
          <Transition name="notice-post-fade" mode="out-in">
            <div
              :key="currentPost.path"
              class="notice-board-wrap__cover"
            >
              <img
                v-if="currentCover"
                :src="currentCover"
                :alt="currentPost.title"
                loading="lazy"
              >
              <span v-else class="notice-board-wrap__cover-placeholder" />
            </div>
          </Transition>
        </div>
      </div>

      <div
        class="notice-board-wrap__meta-col"
      >
        <Transition name="notice-post-fade" mode="out-in">
          <div
            :key="currentPost.path"
            class="notice-board-wrap__meta sakura-post-card-info"
          >
            <SakuraPostDate
              :date="currentPost.updated || currentPost.date"
              class="post-date order-1"
              pb-4
              text-sm
            />
            <h2
              pb-4
              class="order-2 sakura-post-title notice-board-wrap__post-heading"
            >
              {{ currentPost.title }}
            </h2>
            <SakuraPostMeta
              pb-2
              class="order-3"
              :post="currentPost"
            />
            <SakuraPostExcerpt
              v-if="currentPost.excerpt"
              pb-2
              class="order-4"
              :excerpt="currentPost.excerpt"
            />
          </div>
        </Transition>
      </div>
    </div>

    <div
      v-else
      class="notice-board-wrap__article notice-board-wrap__article--empty sakura-card"
    >
      <p class="notice-board-wrap__empty">
        暂无文章
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notice-board-wrap {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 7fr);
  gap: 12px;
  width: 100%;

  &__notice,
  &__article {
    box-sizing: border-box;
    min-height: var(--sakura-post-card-height, 250px);
    height: var(--sakura-post-card-height, 250px);
    color: var(--sakura-color-text);
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.85);
    border-radius: var(--sakura-post-card-rd, 12px);
    background: var(--sakura-card-bg, var(--sakura-post-card-bg));
  }

  @at-root html.dark & {
    &__notice,
    &__article {
      border-color: var(--sakura-color-divider, rgb(255 255 255 / 20%));
    }
  }

  &__notice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 16px 14px;
    text-align: center;
  }

  &__article {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 6fr) minmax(0, 4fr);
    transition: transform 0.16s ease, border-color 0.2s ease;

    &:hover {
      border-color: var(--sakura-color-primary);
    }

    &:has(.notice-board-wrap__article-link:active) {
      transform: scale(0.992);
    }

    &--empty {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-template-columns: none;
    }
  }

  &__article-link {
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:active {
      background-color: color-mix(in srgb, var(--sakura-color-primary) 12%, transparent);
    }
  }

  &__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--sakura-color-text-deep, inherit);
    letter-spacing: 0.06em;
    text-align: center;
  }

  &__section {
    margin-top: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--sakura-color-primary);
    letter-spacing: 0.04em;
    text-align: center;

    &:first-of-type {
      margin-top: 0;
    }
  }

  &__line {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.55;
    color: var(--sakura-color-text);
    word-break: break-all;
    text-align: center;
  }

  &__link {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--sakura-color-primary);
      text-decoration: underline;
    }
  }

  &__cover-col {
    --cover-height: calc(var(--sakura-post-card-height, 250px) - 24px);
    --cover-width: calc(var(--cover-height) * 16 / 9);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    height: 100%;
    padding: 12px 10px 12px 34px;
  }

  &__cover-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 0;
    height: 100%;
  }

  &__meta-col {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    padding: 16px 14px 16px 10px;
    overflow: hidden;
  }

  &__dots {
    --dot-size: 8px;
    --dot-gap: 14px;
    --dot-step: calc(var(--dot-size) + var(--dot-gap));
    --dots-viewport-height: calc(var(--dot-size) * 5 + var(--dot-gap) * 4);
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 3;
    width: 30px;
    height: var(--dots-viewport-height);
    margin-top: calc(var(--dots-viewport-height) / -2);
    overflow: hidden;
    pointer-events: none;
  }

  &__dot-center {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    width: 10px;
    height: 10px;
    margin-top: -5px;
    margin-left: -5px;
    border-radius: 50%;
    background: var(--sakura-color-primary);
    pointer-events: none;
    transition: background-color 0.2s ease;

    &.is-animating {
      background: color-mix(in srgb, var(--sakura-color-primary) 28%, transparent);
    }
  }

  &__dots-track {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--dot-gap);
    pointer-events: auto;
    will-change: transform;
    transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);

    &.is-no-transition {
      transition: none;
    }
  }

  &__dot {
    flex-shrink: 0;
    width: var(--dot-size);
    height: var(--dot-size);
    padding: 0;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--sakura-color-primary) 28%, transparent);
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;

    &:hover {
      background: color-mix(in srgb, var(--sakura-color-primary) 55%, transparent);
      transform: scale(1.15);
    }
  }

  &__cover-col,
  &__meta-col {
    position: relative;
    z-index: 0;
  }

  &__cover {
    display: block;
    flex-shrink: 0;
    width: min(var(--cover-width), 100%);
    aspect-ratio: 16 / 9;
    height: auto;
    max-height: var(--cover-height);
    max-width: 100%;
    border-radius: 10px;
    overflow: hidden;
    background: color-mix(in srgb, var(--sakura-color-primary) 10%, var(--sakura-card-bg));

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__cover-placeholder {
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--sakura-color-primary) 18%, transparent),
      color-mix(in srgb, var(--sakura-color-primary) 6%, transparent)
    );
  }

  &__meta {
    width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    &.sakura-post-card-info {
      .post-date {
        font-size: 12px;
        color: var(--sakura-color-text);
      }

      :deep(.notice-board-wrap__post-heading) {
        margin: 0;
        display: -webkit-box;
        overflow: hidden;
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.45;
        color: var(--sakura-color-text-deep, inherit);
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      :deep(.sakura-post-meta) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :deep(.sakura-post-excerpt) {
        margin-bottom: 0;

        * {
          display: -webkit-box;
          overflow: hidden;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--sakura-color-text);
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }

    :deep(.pb-4) {
      padding-bottom: 0.5rem !important;
    }

    :deep(.pb-2) {
      padding-bottom: 0.25rem !important;
    }
  }

  &__empty {
    margin: 0;
    color: var(--sakura-color-text-muted, #888);
    font-size: 0.9rem;
  }
}

.notice-post-fade-enter-active,
.notice-post-fade-leave-active {
  transition: opacity 0.3s ease;
}

.notice-post-fade-enter-from,
.notice-post-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .notice-board-wrap {
    grid-template-columns: 1fr;
    gap: 10px;

    &__notice,
    &__article {
      height: auto;
      min-height: auto;
    }

    &__notice {
      min-height: 160px;
      padding: 16px 18px;
    }

    &__article {
      grid-template-columns: 1fr;
      min-height: var(--sakura-post-card-height, 250px);
    }

    &__cover-col {
      --cover-height: 160px;
      --cover-width: calc(var(--cover-height) * 16 / 9);
      min-height: 200px;
      padding: 12px 12px 12px 34px;
    }

    &__meta-col {
      min-height: 120px;
      padding: 14px 16px;
    }
  }
}
</style>
```

---

## 三、验证

刷新终端（如果 dev 服务器还在运行则按 `r`；否则 `pnpm dev`），打开首页查看左侧公告栏和右侧随机文章板块。

---

## 下一篇

[Valaxy 博客全局美化教程（三）：给网页增加加载动画](https://daily.yybb.us/posts/valaxy-3)
