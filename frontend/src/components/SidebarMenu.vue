<template>
  <div>
    <button
      @click="toggleMenu"
      class="absolute top-4 left-4 md:hidden bg-black text-white p-2 rounded-lg z-20"
    >
      ⋮
    </button>

    <transition name="slide">
      <div
        v-if="menuOpen || isDesktop"
        class="fixed md:static top-0 left-0 h-full md:h-screen w-[70%] md:w-60 
               bg-white flex flex-col items-start py-8 z-10 shadow-lg md:shadow-none 
               border-r-2 border-black"
      >
        <img
          src="../assets/image/logo.png"
          alt="logo"
          class="w-12 mb-10 mx-auto md:mx-0"
        />

        <nav class="flex flex-col gap-6 w-full px-4">
          <Button
            @click="openModal"
            class="w-full bg-black text-white hover:bg-gray-900"
          >
            New Post
          </Button>

          <Button
            v-if="currentRoute.path === '/home'"
            variant="secondary"
            class="w-full bg-black text-white hover:bg-gray-900"
            @click="$router.push('/profil')"
          >
            My Profile
          </Button>

          <Button
            v-if="currentRoute.path === '/profil'"
            variant="secondary"
            class="w-full bg-black text-white hover:bg-gray-900"
            @click="$router.push('/home')"
          >
            Home
          </Button>
        </nav>
      </div>
    </transition>

    <NewPostModal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import NewPostModal from '@/components/NewPostModal.vue'
import { useNewPostModal } from '@/composables/useNewPostModal'

const menuOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)
const currentRoute = useRoute()

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const { openModal } = useNewPostModal()

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) menuOpen.value = false
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
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
