<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { HeroProps } from '@/types/props/layout.props'

const props = withDefaults(defineProps<HeroProps>(), {
  badge: 'Share Your Stories',
  heading: 'Welcome to PostScriptum',
  description:
    'A modern blogging platform where your thoughts matter. Share your stories, connect with readers, and build your community. Express yourself with elegant writing tools designed for creators.',
  buttons: () => ({
    primary: {
      text: 'Start Writing',
      url: '/posts/create'
    },
    secondary: {
      text: 'Explore Posts',
      url: '/explore'
    }
  }),
  image: () => ({
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
    alt: 'PostScriptum blog platform interface'
  })
})
</script>

<template>
  <section class="py-32">
    <div class="container mx-auto">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge v-if="badge" variant="outline">
            {{ badge }}
            <ArrowUpRight class="ml-2 size-4" />
          </Badge>
          <h1 class="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            {{ heading }}
          </h1>
          <p class="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            {{ description }}
          </p>
          <div class="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            <Button
              variant="default"
              v-if="buttons?.primary"
              :href="buttons.primary.url"
            >
              {{ buttons.primary.text }}
            </Button>
            <Button
              variant="outline"
              v-if="buttons?.secondary"
              :href="buttons.secondary.url"
            >
              {{ buttons.secondary.text }}
              <ArrowRight class="size-4" />
            </Button>
          </div>
        </div>
        <img :src="image.src" :alt="image.alt" class="max-h-96 w-full rounded-md object-cover" />
      </div>
    </div>
  </section>
</template>
