<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import DangerAlert from '@/components/ui/alert/DangerAlert.vue'
import UserAvatar from './UserAvatar.vue'
import type { UserDropdownMenuProps } from '@/types/props/navbar.props'

const props = defineProps<UserDropdownMenuProps>()
const emit = defineEmits<{
  logout: []
}>()

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <HoverCard :open-delay="200" :close-delay="100">
    <HoverCardTrigger as-child>
      <button
        class="cursor-pointer flex items-center gap-2 rounded-full p-1 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <UserAvatar :user="user" size="sm" />
      </button>
    </HoverCardTrigger>
    <HoverCardContent
      align="end"
      :side-offset="8"
      class="w-56 bg-popover text-popover-foreground border border-border rounded-md shadow-md p-1"
    >
      <!-- User info header -->
      <div class="px-2 py-1.5 text-sm font-semibold border-b border-border mb-1">
        {{ user?.firstname }} {{ user?.lastname }}
        <div class="text-xs text-muted-foreground font-normal">
          {{ user?.email }}
        </div>
      </div>

      <!-- Menu items -->
      <div class="flex flex-col">
        <a
          v-for="item in menuItems"
          :key="item.title"
          :href="item.url"
          class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-muted focus:bg-muted outline-none transition-colors"
        >
          <component :is="item.icon" class="size-4" />
          {{ item.title }}
        </a>
      </div>

      <div class="my-1 h-px bg-border" />

      <!-- Logout -->
      <button
        @click="handleLogout"
        :disabled="isLoggingOut"
        class="flex w-full items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-muted focus:bg-muted outline-none text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut class="size-4" />
        {{ isLoggingOut ? 'Logging out...' : 'Log Out' }}
      </button>

      <!-- Logout Error Alert -->
      <div v-if="logoutError.length > 0" class="px-1.5">
        <DangerAlert :errors="logoutError" />
      </div>
    </HoverCardContent>
  </HoverCard>
</template>