<script setup lang="ts">
import type { LogoProps } from '@/types/props/logo.props'

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