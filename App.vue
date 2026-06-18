<script setup lang="ts">
import { onMounted } from 'vue'
import ImageGalleryViewer from './components/ImageGalleryViewer.vue'
import { initImageGallery } from './utils/imageGallery'

onMounted(() => {
  initImageGallery()
})
</script>

<template>
  <ImageGalleryViewer />
</template>
