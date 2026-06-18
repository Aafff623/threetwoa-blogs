<script setup lang="ts">
import type { NavItem } from 'valaxy-theme-sakura'
import { useRoute } from 'vue-router'

const props = defineProps<{
  navbar: NavItem[]
}>()

const route = useRoute()

function isActive(link: string) {
  if (link === '/')
    return route.path === '/'
  return route.path.startsWith(link)
}
</script>

<template>
  <nav class="sakura-navbar-link sakura-navbar-link--pill">
    <SakuraNavbarLinkItem
      v-for="(item, i) in props.navbar"
      :key="i"
      v-bind="item"
      :active="isActive(item.link)"
    />
  </nav>
</template>

<style lang="scss" scoped>
.sakura-navbar-link--pill {
  display: none;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--sakura-navbar-pill-border, color-mix(in srgb, var(--sakura-color-divider, rgb(0 0 0 / 12%)) 60%, transparent));
  background: var(--sakura-navbar-pill-bg, color-mix(in srgb, var(--sakura-navbar-bg, rgb(255 255 255 / 90%)) 82%, transparent));
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  box-shadow:
    inset 0 1px 1px color-mix(in srgb, var(--sakura-color-text) 4%, transparent),
    0 4px 20px -8px color-mix(in srgb, var(--sakura-color-primary) 18%, transparent);

  @media (min-width: 768px) {
    display: flex;
  }
}
</style>
