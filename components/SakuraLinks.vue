<script lang="ts" setup>
import { computed } from 'vue'

interface FriendLinkItem {
  url: string
  avatar: string
  name: string
  blog?: string
  desc?: string
  descr?: string
  color?: string
  siteshot?: string
}

interface FriendLinkGroup {
  name?: string
  desc?: string
  links: FriendLinkItem[]
}

const props = defineProps<{
  links?: string | FriendLinkItem[]
  linkGroups?: FriendLinkGroup[]
  random?: boolean
  errorImg?: string
}>()

const previewFallback = 'https://picsum.photos/seed/valaxy-siteshot/800/450'

function normalizeLink(link: FriendLinkItem) {
  return {
    url: link.url,
    avatar: link.avatar,
    name: link.name,
    blog: link.blog || link.name,
    desc: link.desc || link.descr || '',
    color: link.color || '#0078e7',
    siteshot: getSiteshot(link),
  }
}

function getSiteshot(link: FriendLinkItem) {
  if (link.siteshot)
    return link.siteshot

  if (!link.url)
    return previewFallback

  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(link.url)}?w=800&h=450`
}

function shuffleLinks<T>(list: T[]) {
  return [...list].sort(() => Math.random() - 0.5)
}

const groupList = computed(() => {
  if (Array.isArray(props.linkGroups) && props.linkGroups.length > 0) {
    return props.linkGroups.map((group) => {
      const links = props.random ? shuffleLinks(group.links) : [...group.links]
      return {
        name: group.name || '',
        desc: group.desc || '',
        links: links.map(normalizeLink),
      }
    })
  }

  if (typeof props.links === 'string' || !Array.isArray(props.links))
    return []

  const links = props.random ? shuffleLinks(props.links) : [...props.links]
  return [{
    name: '',
    desc: '',
    links: links.map(normalizeLink),
  }]
})

function onPreviewError(event: Event) {
  const img = event.target as HTMLImageElement
  if (img.dataset.fallbackApplied)
    return

  img.dataset.fallbackApplied = '1'
  img.src = props.errorImg || previewFallback
}
</script>

<template>
  <div class="links-preview">
    <section
      v-for="(group, groupIndex) in groupList"
      :key="groupIndex"
      class="links-preview-group"
    >
      <header
        v-if="group.name"
        class="links-preview-group__header"
      >
        <h2 class="links-preview-group__title">
          <span class="links-preview-group__pin" aria-hidden="true">📌</span>
          {{ group.name }}
        </h2>
        <p
          v-if="group.desc"
          class="links-preview-group__desc"
        >
          分类描述 🌸：{{ group.desc }}
        </p>
      </header>

      <ul class="links-preview-grid">
        <li
          v-for="(link, i) in group.links"
          :key="`${groupIndex}-${i}`"
          class="links-preview-item"
          :style="{ '--link-color': link.color }"
        >
          <a
            class="links-preview-card"
            :href="link.url"
            :title="link.name"
            rel="friend noopener"
            target="_blank"
          >
            <div class="links-preview-shot">
              <img
                :src="link.siteshot"
                :alt="`${link.name} 站点预览`"
                loading="lazy"
                decoding="async"
                @error="onPreviewError"
              >
            </div>

            <div class="links-preview-meta">
              <img
                class="links-preview-avatar"
                :src="link.avatar"
                :alt="link.name"
                loading="lazy"
                decoding="async"
              >

              <div class="links-preview-text">
                <div class="links-preview-name">
                  {{ link.blog }}
                </div>
                <div class="links-preview-desc">
                  {{ link.desc }}
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.links-preview {
  --link-card-width: 210px;
  width: 100%;
  box-sizing: border-box;
}

.links-preview-group + .links-preview-group {
  margin-top: 40px;
}

.links-preview-group__header {
  margin-bottom: 20px;
}

.links-preview-group__title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 8px;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--sakura-color-primary, #fe9500);
}

.links-preview-group__pin {
  font-size: 1rem;
  line-height: 1;
}

.links-preview-group__desc {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--sakura-color-text-muted, #888);
}

.links-preview-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 18px 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.links-preview-item {
  width: var(--link-card-width, 210px);
  max-width: 100%;
  flex: 0 0 auto;
  min-width: 0;
}

.links-preview-card {
  display: block;
  color: inherit;
  text-decoration: none;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-3px);

    .links-preview-shot {
      box-shadow: 0 14px 28px oklch(0% 0 0 / 18%);
    }

    .links-preview-name {
      color: var(--link-color, var(--sakura-color-primary, #fe9500));
    }
  }
}

.links-preview-shot {
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: 10px;
  background: var(--va-c-bg-mute, oklch(94% 0 0));
  box-shadow: 0 4px 12px oklch(0% 0 0 / 9%);
  transition: box-shadow 0.25s ease;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
}

.links-preview-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  min-width: 0;
}

.links-preview-avatar {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--link-color, var(--sakura-color-primary, #fe9500));
  background: var(--va-c-bg, #fff);
}

.links-preview-text {
  min-width: 0;
  flex: 1;
}

.links-preview-name {
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--sakura-color-text-deep, #333);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
}

.links-preview-desc {
  margin-top: 1px;
  font-size: 0.68rem;
  line-height: 1.45;
  color: var(--sakura-color-text-muted, #888);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .links-preview-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .links-preview-item {
    width: 100%;
  }

  .links-preview-card {
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    overflow: hidden;

    &:hover {
      transform: none;

      .links-preview-name {
        color: #fff;
      }
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(to top, oklch(0% 0 0 / 62%) 0%, oklch(0% 0 0 / 12%) 45%, transparent 70%);
      pointer-events: none;
    }
  }

  .links-preview-shot {
    position: absolute;
    inset: 0;
    aspect-ratio: unset;
    height: 100%;
    border-radius: 10px;
    box-shadow: none;
  }

  .links-preview-meta {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    margin-top: 0;
    padding: 8px;
    gap: 6px;
  }

  .links-preview-avatar {
    width: 32px;
    height: 32px;
    border-width: 1.5px;
  }

  .links-preview-name {
    font-size: 0.74rem;
    color: #fff;
  }

  .links-preview-desc {
    font-size: 0.62rem;
    color: oklch(92% 0 0 / 88%);
  }
}

:global(html.dark) {
  .links-preview-shot {
    background: oklch(28% 0.01 270);
    box-shadow: 0 8px 22px oklch(0% 0 0 / 35%);
  }

  .links-preview-card:hover .links-preview-shot {
    box-shadow: 0 14px 30px oklch(0% 0 0 / 45%);
  }

  .links-preview-name {
    color: var(--sakura-color-text, #eee);
  }
}
</style>
