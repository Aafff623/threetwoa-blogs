<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const containerRef = ref<HTMLElement>()
let injected = false

watchEffect(() => {
  const el = containerRef.value
  if (!el || injected)
    return
  injected = true

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Aafff623/threetwoa-blogs')
  script.setAttribute('data-repo-id', 'R_kgDOS-UR5w')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOS-UR584C_dOM')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true

  el.appendChild(script)
})
</script>

<template>
  <ClientOnly>
    <SakuraCard w="full" class="sakura-comment" mt-6>
      <div ref="containerRef" class="giscus" />
    </SakuraCard>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.sakura-comment {
  --sakura-card-padding: 1rem;
}
</style>
