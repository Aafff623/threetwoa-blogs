<script lang="ts" setup>
import Giscus from '@giscus/vue'
</script>

<template>
  <SakuraCard w="full" class="sakura-comment" mt-6>
    <Giscus
      repo="Aafff623/threetwoa-blogs"
      repo-id="R_kgDOS-UR5w"
      category="Announcements"
      category-id="DIC_kwDOS-UR584C_dOM"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      theme="preferred_color_scheme"
      lang="zh-CN"
      loading="lazy"
    />
  </SakuraCard>
</template>

<style lang="scss" scoped>
.sakura-comment {
  --sakura-card-padding: 1rem;
}
</style>
