<script setup lang="ts">
import { Button } from '@/components/ui/button'

interface AuthConfig {
  login: {
    title: string
    url: string
  }
  signup: {
    title: string
    url: string
  }
}

interface AuthButtonsProps {
  auth: AuthConfig
  variant?: 'desktop' | 'mobile'
}

const props = withDefaults(defineProps<AuthButtonsProps>(), {
  variant: 'desktop',
})
</script>

<template>
  <!-- Desktop variant -->
  <template v-if="variant === 'desktop'">
    <Button
      variant="outline"
      :href="auth.login.url"
    >
      {{ auth.login.title }}
    </Button>
    <Button
      variant="default"
      :href="auth.signup.url">
      {{ auth.signup.title }}
    </Button>
  </template>

  <!-- Mobile variant -->
  <template v-else>
    <Button
      variant="outline"
      :href="auth.login.url">
      {{ auth.login.title }}
    </Button>
    <Button
      variant="default"
      :href="auth.signup.url"
    >
      {{ auth.signup.title }}
    </Button>
  </template>
</template>
