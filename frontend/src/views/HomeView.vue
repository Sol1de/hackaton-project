<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue'
  import Hero from '@/components/Hero.vue'
  import Blog from '@/components/Blog.vue'
  import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col px-5 lg:px-0">
    <Navbar />
    <Hero />
    <Blog />
    <Footer />
  </div>

</template>
