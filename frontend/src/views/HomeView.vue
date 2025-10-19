<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue'
  import Hero from '@/components/Hero.vue'
  import Blog from '@/components/Blog.vue'
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
  <Blog
    tagline="Dernières Actualités"
    heading="Articles de Blog"
    description="Découvrez les dernières tendances, conseils et bonnes pratiques en développement web moderne. De l'UI aux systèmes de design, restez à jour avec nos articles d'experts."
    buttonText="Voir tous les articles"
    buttonUrl="/blog"
    :posts="[
      {
        id: 'post-1',
        title: 'Débuter avec Vue 3 et TypeScript',
        summary: 'Apprenez à configurer rapidement un projet Vue 3 avec TypeScript. Nous couvrirons l\'installation, la configuration et les meilleures pratiques pour construire des interfaces modernes.',
        label: 'Tutoriel',
        author: 'Sophie Martin',
        published: '15 Oct 2025',
        url: '/blog/vue3-typescript',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg'
      },
      {
        id: 'post-2',
        title: 'Créer des Applications Web Accessibles',
        summary: 'Explorez comment créer des expériences web inclusives en utilisant des composants accessibles. Découvrez des astuces pratiques pour implémenter les labels ARIA et la navigation au clavier.',
        label: 'Accessibilité',
        author: 'Lucas Dubois',
        published: '12 Oct 2025',
        url: '/blog/accessibilite-web',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg'
      },
      {
        id: 'post-3',
        title: 'Systèmes de Design Modernes avec Tailwind',
        summary: 'Plongez dans la création de systèmes de design évolutifs avec Tailwind CSS. Apprenez à maintenir la cohérence tout en construisant des bibliothèques de composants flexibles.',
        label: 'Design',
        author: 'Emma Leroy',
        published: '10 Oct 2025',
        url: '/blog/design-systems-tailwind',
        image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg'
      }
    ]"
  />
</template>
