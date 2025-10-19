<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import type { UserAvatarProps } from '@/types/props/navbar.props'

const props = withDefaults(defineProps<UserAvatarProps>(), {
  size: 'sm',
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'size-12'
    case 'md':
      return 'size-10'
    case 'sm':
    default:
      return 'size-8'
  }
})

const textSizeClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'text-base'
    case 'md':
      return 'text-base'
    case 'sm':
    default:
      return 'text-sm'
  }
})

const getUserInitials = computed(() => {
  if (!props.user) return 'U'
  return `${props.user.firstname.charAt(0)}${props.user.lastname.charAt(0)}`.toUpperCase()
})
</script>

<template>
  <Avatar :class="sizeClasses">
    <AvatarImage
      v-if="user?.avatar"
      :src="user.avatar"
      :alt="`${user.firstname} ${user.lastname}`"
    />
    <AvatarFallback
      :class="[
        textSizeClasses,
        'bg-primary text-primary-foreground font-semibold',
      ]"
    >
      {{ getUserInitials }}
    </AvatarFallback>
  </Avatar>
</template>