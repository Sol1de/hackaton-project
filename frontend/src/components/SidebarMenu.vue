<template>
  <div>
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
        class="fixed md:static top-0 left-0 h-full md:h-auto w-[70%] md:w-60 bg-gray-50 flex flex-col items-start py-8 z-10 shadow-lg md:shadow-none"
      >
        <img src="../assets/image/logo.png" alt="logo" class="w-12 mb-10 mx-auto md:mx-0" />
        <nav class="flex flex-col gap-6 w-full px-4">
          <!-- New Post toujours visible via composable -->
          <button
            @click="openModal"
            class="bg-blue-600 text-white text-sm px-3 py-2 rounded-lg w-full hover:bg-blue-700 transition"
          >
            New Post
          </button>

          <button
            v-if="currentRoute.path === '/home'"
            @click="$router.push('/profil')"
            class="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg w-full hover:bg-gray-900 transition"
          >
            My Profile
          </button>

          <button
            v-if="currentRoute.path === '/profil'"
            @click="$router.push('/home')"
            class="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg w-full hover:bg-gray-900 transition"
          >
            Home
          </button>
        </nav>
        <div class="hidden md:block absolute top-0 right-0 h-full w-[2px] bg-black"></div>
      </div>
    </transition>

    <!-- New Post Modal -->
    <NewPostModal />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NewPostModal from '@/components/NewPostModal.vue'
import { useNewPostModal } from '@/composables/useNewPostModal'

const menuOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)
const currentRoute = useRoute()

const toggleMenu = () => menuOpen.value = !menuOpen.value

// Utilisation du composable global pour le modal
const { openModal } = useNewPostModal()
</script>
