<script setup lang="ts">
interface LogoProps {
  url: string
  src: string
  alt: string
  title?: string
  showTitle?: boolean
}

const props = withDefaults(defineProps<LogoProps>(), {
  showTitle: true,
})
</script>

<template>
  <a :href="url" class="flex items-center gap-2">
    <img :src="src" class="max-h-8 dark:invert" :alt="alt" />
    <span v-if="showTitle && title" class="text-lg font-semibold tracking-tighter">
      {{ title }}
    </span>
  </a>
</template>