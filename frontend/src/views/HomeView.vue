<template>
  <div class="flex h-screen w-full relative">
    <SidebarMenu />

    <div class="flex-1 flex flex-col items-center bg-gray-50 overflow-hidden">
      <p class="text-lg my-6 font-semibold">SOCIAL MEDIA</p>

      <div
        class="flex flex-col gap-8 w-full max-w-2xl overflow-y-auto px-4 pb-10"
        style="max-height: calc(100vh - 100px);"
      >
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
import PostCard from '@/components/PostCard.vue'
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
