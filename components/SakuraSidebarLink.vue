<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from 'valaxy-theme-sakura/composables/index'

const props = defineProps<{
  sidebar?: any[]
}>()

const themeConfig = useThemeConfig()
const route = useRoute()

const marker = ref<HTMLElement | null>()

const sidebar = computed(() =>
  props.sidebar
  || (Array.isArray(themeConfig.value.sidebar) && themeConfig.value.sidebar.length > 0 ? themeConfig.value.sidebar : themeConfig.value.navbar),
) as unknown as any[]

watch(() => route.path, () => nextTick(() => updateMarker()))

function updateMarker() {
  if (!marker.value)
    return

  const routeActive = document.querySelector('.sakura-sidebar-link .router-link-active') as HTMLElement | null
  marker.value.style.top = `${routeActive?.offsetTop || 0}px`
  marker.value.style.height = `${routeActive?.offsetHeight || 0}px`
}

onMounted(() => {
  // 先拿到 marker 元素，再计算位置，避免 nextTick 回调里 marker 还是 undefined。
  marker.value = document.querySelector('.sakura-sidebar #marker')
  nextTick(() => updateMarker())
})
</script>

<template>
  <nav class="sakura-sidebar-link">
    <SakuraSidebarLinkItem :items="sidebar" class="mx-auto" />
    <div id="marker" />
  </nav>
</template>

<style lang="scss" scoped>
.sakura-sidebar-link {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}
</style>
