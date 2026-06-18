<script setup lang="ts">
import type { NavItem } from 'valaxy-theme-sakura'
import { ref } from 'vue'

const props = defineProps<Partial<NavItem> & { active?: boolean }>()

const isDropdownVisible = ref(false)
const hideTimeout = ref<number | null>(null)
const delay = 50

function showDropdown() {
  isDropdownVisible.value = true
  cancelHideDropdown()
}

function hideDropdown() {
  isDropdownVisible.value = false
}

function scheduleHideDropdown() {
  hideTimeout.value = window.setTimeout(() => {
    hideDropdown()
  }, delay)
}

function cancelHideDropdown() {
  if (hideTimeout.value !== null) {
    clearTimeout(hideTimeout.value)
    hideTimeout.value = null
  }
}
</script>

<template>
  <SakuraDropdown :is-show="!!props.items?.length" class="sakura-navbar-link-item" :class="{ 'is-active': props.active }" @mouseenter="showDropdown" @mouseleave="scheduleHideDropdown">
    <template #button>
      <SakuraNavLink class="sakura-navbar-link-item__link" v-bind="props" />
    </template>

    <template #menu>
      <div class="sakura-dropdown-list" flex="~ col center">
        <SakuraNavLink v-for="subitem in props.items" :key="subitem.text" v-bind="subitem" />
      </div>
    </template>
  </SakuraDropdown>
</template>

<style lang="scss" scoped>
.sakura-navbar-link-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 34px;
  border-radius: 999px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &__link {
    z-index: 1;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 500;
    gap: 5px;
    color: var(--sakura-navbar-item-color);
  }

  :deep(.sakura-nav-link-icon) {
    width: 15px;
    height: 15px;
    margin-right: 0;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  :deep(.sakura-nav-link-text) {
    transition: color 0.2s ease;
  }

  &:hover:not(.is-active) {
    background: var(--sakura-navbar-pill-hover-bg, color-mix(in srgb, var(--sakura-color-text) 5%, transparent));

    :deep(.sakura-nav-link-icon) {
      transform: scale(1.12) translateY(-1px);
    }
  }

  &.is-active {
    --tab-accent: var(--sakura-color-primary);

    background: var(--sakura-navbar-pill-active-bg, color-mix(in srgb, var(--tab-accent) 12%, transparent));
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--sakura-color-text) 6%, transparent),
      0 0 18px -4px color-mix(in srgb, var(--tab-accent) 45%, transparent);

    :deep(.sakura-nav-link) {
      color: var(--tab-accent);
      text-shadow: 0 0 14px color-mix(in srgb, var(--tab-accent) 35%, transparent);
    }

    :deep(.sakura-nav-link-icon) {
      transform: scale(1.15) translateY(-1px);
    }

    &::after {
      content: '';
      position: absolute;
      left: 22%;
      right: 22%;
      bottom: 4px;
      height: 2px;
      border-radius: 999px;
      background: var(--tab-accent);
      box-shadow: 0 0 8px 1px color-mix(in srgb, var(--tab-accent) 70%, transparent);
    }
  }
}

.sakura-dropdown-list {
  :deep(.sakura-nav-link:not(:last-child)) {
    margin-bottom: 12px;
  }
}
</style>
