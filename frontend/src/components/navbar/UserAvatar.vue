<script setup lang="ts">
import { computed } from 'vue'

interface UserData {
  firstname: string
  lastname: string
  avatar?: string
}

interface UserAvatarProps {
  user: UserData | null | undefined
  size?: 'sm' | 'md' | 'lg'
}

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
  <div v-if="user?.avatar" :class="[sizeClasses, 'rounded-full overflow-hidden']">
    <img
      :src="user.avatar"
      :alt="`${user.firstname} ${user.lastname}`"
      class="w-full h-full object-cover"
    />
  </div>
  <div
    v-else
    :class="[
      sizeClasses,
      textSizeClasses,
      'rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold',
    ]"
  >
    {{ getUserInitials }}
  </div>
</template>