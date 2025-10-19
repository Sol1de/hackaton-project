<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface Post {
  id: string
  title: string
  summary: string
  label: string
  author: string
  published: string
  url: string
  image: string
}

interface BlogProps {
  tagline: string
  heading: string
  description: string
  buttonText: string
  buttonUrl: string
  posts: Post[]
}

const props = withDefaults(defineProps<BlogProps>(), {
  tagline: 'Latest Updates',
  heading: 'Blog Posts',
  description:
    'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  buttonText: 'View all articles',
  buttonUrl: 'https://shadcnblocks.com',
  posts: () => [
    {
      id: 'post-1',
      title: 'Getting Started with shadcn/ui Components',
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: 'Tutorial',
      author: 'Sarah Chen',
      published: '1 Jan 2024',
      url: 'https://shadcnblocks.com',
      image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg'
    },
    {
      id: 'post-2',
      title: 'Building Accessible Web Applications',
      summary:
        "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
      label: 'Accessibility',
      author: 'Marcus Rodriguez',
      published: '1 Jan 2024',
      url: 'https://shadcnblocks.com',
      image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg'
    },
    {
      id: 'post-3',
      title: 'Modern Design Systems with Tailwind CSS',
      summary:
        'Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.',
      label: 'Design Systems',
      author: 'Emma Thompson',
      published: '1 Jan 2024',
      url: 'https://shadcnblocks.com',
      image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg'
    }
  ]
})
</script>

<template>
  <section class="py-32">
    <div class="container mx-auto flex flex-col items-center gap-16 lg:px-16">
      <div class="text-center">
        <Badge variant="secondary" class="mb-6">
          {{ tagline }}
        </Badge>
        <h2
          class="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl"
        >
          {{ heading }}
        </h2>
        <p class="text-muted-foreground mb-8 md:text-base lg:max-w-2xl lg:text-lg">
          {{ description }}
        </p>
        <a
          :href="buttonUrl"
          target="_blank"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 underline-offset-4 hover:underline text-primary h-9 px-0 w-full sm:w-auto"
        >
          {{ buttonText }}
          <ArrowRight class="ml-2 size-4" />
        </a>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <Card v-for="post in posts" :key="post.id" class="grid grid-rows-[auto_auto_1fr_auto] pt-0">
          <div class="aspect-16/9 w-full">
            <a
              :href="post.url"
              target="_blank"
              class="fade-in transition-opacity duration-200 hover:opacity-70"
            >
              <img
                :src="post.image"
                :alt="post.title"
                class="h-full w-full object-cover object-center"
              />
            </a>
          </div>
          <CardHeader>
            <h3 class="text-lg font-semibold hover:underline md:text-xl">
              <a :href="post.url" target="_blank">
                {{ post.title }}
              </a>
            </h3>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ post.summary }}</p>
          </CardContent>
          <CardFooter>
            <a
              :href="post.url"
              target="_blank"
              class="text-foreground flex items-center hover:underline"
            >
              Read more
              <ArrowRight class="ml-2 size-4" />
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>
</template>