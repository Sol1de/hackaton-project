<script lang="ts">
export const description = "A Register page with a muted background color."
</script>

<script setup lang="ts">
import { GalleryVerticalEnd, ArrowLeft } from "lucide-vue-next"
import { RouterLink } from "vue-router"
import RegisterForm from '@/components/forms/RegisterForm.vue'
</script>

<template>
  <div class="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <RouterLink
      to="/"
      class="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:underline"
    >
      <ArrowLeft class="size-4" />
      <span>Back</span>
    </RouterLink>
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd class="size-4" />
        </div>
        Acme Inc.
      </a>
      <RegisterForm />
    </div>
  </div>
</template>
