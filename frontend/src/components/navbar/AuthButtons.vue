<script setup lang="ts">
import { ButtonLink } from '@/components/ui/button'
import type { AuthButtonsProps } from '@/types/props/navbar.props'

const props = withDefaults(defineProps<AuthButtonsProps>(), {
  variant: 'desktop',
})
</script>

<template>
  <!-- Desktop variant -->
  <template v-if="variant === 'desktop'">
    <ButtonLink
      variant="outline"
      :to="auth.login.url"
    >
      {{ auth.login.title }}
    </ButtonLink>
    <ButtonLink
      variant="default"
      :to="auth.signup.url">
      {{ auth.signup.title }}
    </ButtonLink>
  </template>

  <!-- Mobile variant -->
  <template v-else>
    <ButtonLink
      variant="outline"
      :to="auth.login.url">
      {{ auth.login.title }}
    </ButtonLink>
    <ButtonLink
      variant="default"
      :to="auth.signup.url"
    >
      {{ auth.signup.title }}
    </ButtonLink>
  </template>
</template>
