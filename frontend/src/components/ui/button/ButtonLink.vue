<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { RouteLocationRaw } from "vue-router"
import type { ButtonVariants } from "."
import { RouterLink } from "vue-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props {
  to: RouteLocationRaw
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
})
</script>

<template>
  <RouterLink
    data-slot="button-link"
    :to="to"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </RouterLink>
</template>