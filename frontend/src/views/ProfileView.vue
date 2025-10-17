<template>
  <div class="flex h-screen w-full relative">
    <SidebarMenu />

    <div class="flex-1 flex flex-col items-center bg-gray-50 overflow-hidden">
      <p class="text-lg my-6 font-semibold">{{ user.firstName }} {{ user.lastName }}</p>
      
      
      <div
        class="flex flex-col gap-8 w-full max-w-2xl overflow-y-auto px-4 pb-10"
        style="max-height: calc(100vh - 100px);"
      >
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
import SidebarMenu from '@/components/SidebarMenu.vue'
import PostCard from '@/components/PostCard.vue'
import { ref } from 'vue'

const user = ref({
  firstName: 'Romain',
  lastName: 'Daguet',
  posts: [
    { title: 'Mon premier post', content: 'Voici le contenu de mon premier post !' },
    { title: 'Un autre post', content: 'Encore un post sympa pour tester le profil.' }
  ]
})
</script>