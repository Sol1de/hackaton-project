<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'

interface HeroProps {
  badge?: string
  heading: string
  description: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
  image: {
    src: string
    alt: string
  }
}

const props = withDefaults(defineProps<HeroProps>(), {
  badge: '( Your Website Builder',
  heading: 'Blocks Built With Shadcn & Tailwind',
  description:
    'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
  buttons: () => ({
    primary: {
      text: 'Discover all components',
      url: 'https://www.shadcnblocks.com'
    },
    secondary: {
      text: 'View on GitHub',
      url: 'https://www.shadcnblocks.com'
    }
  }),
  image: () => ({
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
    alt: 'Hero section demo image showing interface components'
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
            <a
              v-if="buttons?.primary"
              :href="buttons.primary.url"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full sm:w-auto"
            >
              {{ buttons.primary.text }}
            </a>
            <a
              v-if="buttons?.secondary"
              :href="buttons.secondary.url"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full sm:w-auto"
            >
              {{ buttons.secondary.text }}
              <ArrowRight class="size-4" />
            </a>
          </div>
        </div>
        <img :src="image.src" :alt="image.alt" class="max-h-96 w-full rounded-md object-cover" />
      </div>
    </div>
  </section>
</template>
