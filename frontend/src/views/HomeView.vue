<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue'
  import Hero from '@/components/Hero.vue'
</script>

<template>
  <Navbar />
  <Hero
    badge="🚀 Bienvenue"
    heading="Construisez Votre Application Moderne"
    description="Une plateforme complète pour créer des applications web modernes avec Vue 3, TypeScript et Tailwind CSS. Commencez dès maintenant avec nos composants prêts à l'emploi."
    :buttons="{
      primary: {
        text: 'Commencer',
        url: '/getting-started'
      },
      secondary: {
        text: 'En savoir plus',
        url: '/about'
      }
    }"
    :image="{
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
      alt: 'Image de démonstration de la page d\'accueil'
    }"
  />
</template>
