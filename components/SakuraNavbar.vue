<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useLayout, useThemeConfig } from 'valaxy-theme-sakura/client'

interface NavItem {
  text?: string
  locale?: string | number
  link: string
  icon?: string
  animated?: string
  target?: '_blank' | '_self' | '_parent' | '_top' | ''
  items?: NavItem[]
}

interface NavbarOptions {
  title?: string | string[]
  subTitle?: string
  favicon?: boolean
  animIn?: string
  animOut?: string
  autoHide?: boolean | string | string[]
  showMarker?: boolean
  offset?: number
  enableHover?: boolean
  invert?: boolean | string | string[]
  tools?: ('toggleLocale' | 'toggleDark' | 'search')[]
}

const props = defineProps<{
  navbar?: NavItem[]
  options?: NavbarOptions
}>()

const themeConfig = useThemeConfig()
const { isIncludes } = useLayout()
const { y } = useWindowScroll()

const noAnimation = ref(true)
const hoverNavbar = ref(false)

const navbar = computed(() => props.navbar || themeConfig.value.navbar as NavItem[])
const navbarOptions = computed(() => props.options || themeConfig.value.navbarOptions as NavbarOptions)

const { favicon, animIn, animOut, showMarker, title, subTitle, enableHover, offset } = navbarOptions.value

const isScrolled = computed(() => y.value > (offset || 100))

const isHeaderHighlighted = computed(() => {
  const autoHide = isIncludes(navbarOptions.value.autoHide)
  if (!autoHide)
    return true

  const invert = isIncludes(navbarOptions.value.invert)

  if (enableHover)
    return hoverNavbar.value || (invert ? isScrolled.value : !isScrolled.value)
  return invert ? isScrolled.value : !isScrolled.value
})
</script>

<template>
  <header flex="~" w="full" fixed top-0 z-100 class="sakura-navbar" @mouseover="hoverNavbar = true" @mouseleave="hoverNavbar = false">
    <div class="sakura-safe-padding navbar-content" flex="~ items-center justify-between" w="full" :class="{ 'active-header': isHeaderHighlighted, 'has-scrolled': isScrolled, 'no-animation': noAnimation }">
      <slot name="brand">
        <div flex="~ items-center">
          <SakuraNavbarBrand :favicon :title :sub-title />
        </div>
      </slot>

      <slot name="link">
        <SakuraNavbarLink :class="navbarOptions.value?.autoHide && (isHeaderHighlighted ? animIn : animOut)" :navbar :show-marker />
      </slot>

      <slot name="tool">
        <div h-full print:op0 flex="~ center" class="sakura-navbar-tools">
          <SakuraToggleDark v-if="navbarOptions.tools?.includes('toggleDark')" />
          <SakuraToggleLocale v-if="navbarOptions.tools?.includes('toggleLocale')" />
          <SakuraSearchTrigger v-if="navbarOptions.tools?.includes('search')" />
          <slot name="tool-ext" />
        </div>
      </slot>
    </div>
  </header>
</template>

<style lang="scss">
.sakura-navbar {
  .navbar-content {
    height: var(--sakura-navbar-height);
    transition: all var(--va-transition-duration) ease-in;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        color-mix(in srgb, var(--sakura-color-primary) 35%, transparent) 20%,
        color-mix(in srgb, var(--sakura-color-primary) 55%, transparent) 50%,
        color-mix(in srgb, var(--sakura-color-primary) 35%, transparent) 80%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    &.active-header {
      background: var(--sakura-navbar-bg);

      &::after {
        opacity: 1;
      }

      &.has-scrolled {
        box-shadow: 0 1px 40px -8px oklch(0% 0 0 / 50%);
      }
    }

    &:not(.active-header) {
      background: color-mix(in srgb, var(--sakura-navbar-bg, #fff) 72%, transparent);
      backdrop-filter: blur(12px) saturate(140%);
      -webkit-backdrop-filter: blur(12px) saturate(140%);

      &::after {
        opacity: 0.6;
      }
    }
  }

  &-tools {
    gap: 8px;

    & > *:not(:last-child) {
      margin-right: 0;
    }

    :deep(.sakura-toggle-dark),
    :deep(.sakura-toggle-locale),
    :deep(.sakura-search-trigger) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 999px;
      border: 1px solid var(--sakura-navbar-tool-border, color-mix(in srgb, var(--sakura-color-divider, rgb(0 0 0 / 12%)) 60%, transparent));
      background: var(--sakura-navbar-tool-bg, color-mix(in srgb, var(--sakura-navbar-bg, #fff) 82%, transparent));
      color: var(--sakura-navbar-item-color);
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        border-color: var(--sakura-color-primary);
        background: color-mix(in srgb, var(--sakura-color-primary) 10%, transparent);
        color: var(--sakura-color-primary);
        box-shadow: 0 0 14px -3px color-mix(in srgb, var(--sakura-color-primary) 35%, transparent);
      }
    }

    :deep(.sakura-icon) {
      width: 16px;
      height: 16px;
    }
  }

  .sakura-nav-link-icon {
    height: 1em;
    width: 1em;
    margin-right: 0.2rem;
  }

  .sakura-navbar-tools {
    color: var(--sakura-navbar-item-color);
  }
}

.has-home-layout .sakura-navbar {
  &.active-header {
    box-shadow: 0 1px 40px -8px oklch(0% 0 0 / 50%);
  }
}
</style>
