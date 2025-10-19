<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { BlogProps, PostPreview } from '@/types/props/layout.props'
import { getPostsFetch } from '@/api/posts.fetch.ts'
import type { ApiError } from '@/types/error.type.ts'
import { ref, onMounted } from 'vue'
import DangerAlert from '@/components/ui/alert/DangerAlert.vue'

const props = withDefaults(defineProps<BlogProps>(), {
  tagline: 'Latest Updates',
  heading: 'Blog Posts',
  description:
    'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  buttonText: 'View all articles',
  buttonUrl: 'https://shadcnblocks.com',
})

const posts = ref<PostPreview[]>([])
const errors = ref<string[]>([])
const isLoading = ref(false)

const truncateContent = (content: string, maxLength: number = 100): string => {
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength) + '...'
}

const handleGetPosts = async () => {
  errors.value = []
  isLoading.value = true

  try {
    const response = await getPostsFetch()
    posts.value = response.posts.map((post) => ({
      id: post._id,
      title: post.title,
      summary: truncateContent(post.content),
      author: `${post.userId.firstname} ${post.userId.lastname}`,
      url: '/login',
      image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
    }))
  } catch (err) {
    const responseData = (err as ApiError).response?.data

    if (responseData?.errors && Array.isArray(responseData.errors)) {
      errors.value = responseData.errors.map((error) => error.message)
    } else if (responseData?.message) {
      errors.value = [responseData.message]
    } else {
      errors.value = ['An unexpected error occurred']
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  handleGetPosts()
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
      <!-- Error Messages -->
      <div v-if="errors.length > 0" class="w-full max-w-2xl">
        <DangerAlert :errors="errors" />
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="w-full text-center">
        <p class="text-muted-foreground text-lg">Loading posts...</p>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="posts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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

      <!-- Empty State -->
      <div
        v-else-if="!isLoading && posts.length === 0 && errors.length === 0"
        class="w-full text-center"
      >
        <p class="text-muted-foreground text-lg">No posts available yet.</p>
      </div>
    </div>
  </section>
</template>
