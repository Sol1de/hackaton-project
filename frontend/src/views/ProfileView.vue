<template>
  <div class="flex h-screen w-full relative">
    <SidebarMenu />

    <div class="flex-1 flex flex-col items-center bg-gray-50 overflow-auto p-6">
      <h1 class="text-3xl font-bold">{{ user.firstName }} {{ user.lastName }}</h1>
      <PostCard
        v-for="(post, index) in user.posts"
        :key="index"
        :title="post.title"
        :content="post.content"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
import PostCard from '@/components/PostCard.vue'
import { ref } from 'vue'

const user = ref({
  firstName: 'Jean',
  lastName: 'Dupont',
  posts: [
    { title: 'Mon premier post', content: 'Voici le contenu de mon premier post !' },
    { title: 'Un autre post', content: 'Encore un post sympa pour tester le profil.' }
  ]
})
</script>
