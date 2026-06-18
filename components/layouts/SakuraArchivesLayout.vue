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
