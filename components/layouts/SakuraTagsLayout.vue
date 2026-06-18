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
