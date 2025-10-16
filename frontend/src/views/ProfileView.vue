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
            @click="$router.push('/profil')"
            class="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg w-4/5 hover:bg-gray-900 transition"
          >
            My Profile
          </button>
        </nav>
        <div class="hidden md:block absolute top-0 right-0 h-full w-[2px] bg-black"></div>
      </div>
    </transition>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col items-center bg-gray-50 overflow-auto p-6">
      <!-- User Info -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">{{ user.firstName }} {{ user.lastName }}</h1>
      </div>

      <!-- User Posts -->
      <div class="flex flex-col gap-6 w-full max-w-2xl">
        <PostCard 
          v-for="(post, index) in user.posts" 
          :key="index" 
          :title="post.title" 
          :content="post.content"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PostCard from '@/components/PostCard.vue'

const menuOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// Simuler un utilisateur (à remplacer par votre API)
const user = ref({
  firstName: 'Jean',
  lastName: 'Dupont',
  posts: [
    { title: 'Mon premier post', content: 'Voici le contenu de mon premier post !' },
    { title: 'Un autre post', content: 'Encore un post sympa pour tester le profil.' }
  ]
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
