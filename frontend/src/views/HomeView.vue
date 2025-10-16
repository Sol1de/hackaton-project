<template>
  <div class="flex h-screen w-full relative">
    <!-- Mobile Menu Button -->
    <button
      @click="toggleMenu"
      class="absolute top-4 left-4 md:hidden bg-gray-800 text-white p-2 rounded-lg z-20"
    >
      ⋮
    </button>

    <!-- Left Sidebar -->
    <transition name="slide">
      <div
        v-if="menuOpen || isDesktop"
        class="fixed md:static top-0 left-0 h-full md:h-auto w-[70%] md:w-[10%] bg-gray-50 flex flex-col items-center py-8 z-10 shadow-lg md:shadow-none"
      >
        <img src="../assets/image/logo.png" alt="logo" class="w-12 mb-10" />
        <nav class="flex flex-col gap-6 w-full items-center">
          <button
            class="bg-blue-600 text-white text-sm px-3 py-2 rounded-lg w-4/5 hover:bg-blue-700 transition"
          >
            New Post
          </button>
          <button
            class="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg w-4/5 hover:bg-gray-900 transition"
          >
            My Profile
          </button>
        </nav>
        <div class="hidden md:block absolute top-0 right-0 h-full w-[2px] bg-black"></div>
      </div>
    </transition>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col items-center bg-gray-50 overflow-hidden">
      <p class="text-lg my-6 font-semibold">SOCIAL MEDIA</p>

      <!-- Zone scrollable -->
      <div class="flex flex-col gap-8 w-full max-w-2xl overflow-y-auto px-4 pb-10"
          style="max-height: calc(100vh - 100px);">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PostCard from '@/components/PostCard.vue'

const menuOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Animation d’ouverture du menu mobile */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
