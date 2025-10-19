<script setup lang="ts">
import { Menu, LogOut } from 'lucide-vue-next'
import { ref } from 'vue'
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'radix-vue'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import DangerAlert from '@/components/ui/alert/DangerAlert.vue'
import MenuLogo from '../logos/MenuLogo.vue'
import UserAvatar from './UserAvatar.vue'
import AuthButtons from './AuthButtons.vue'
import type { UserData } from '@/types/user.types'
import type { MenuItem } from '@/types/menu.types'
import type { LogoConfig } from '@/types/logo.types'
import type { AuthConfig } from '@/types/auth.types'

interface MobileNavMenuProps {
  logo: LogoConfig
  menu: MenuItem[]
  user: UserData | null | undefined
  isAuthenticated: boolean
  userMenuItems: MenuItem[]
  auth: AuthConfig
  isLoggingOut: boolean
  logoutError: string[]
}

const props = defineProps<MobileNavMenuProps>()
const emit = defineEmits<{
  logout: []
}>()

const isSheetOpen = ref(false)

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="flex items-center justify-between">
    <!-- Logo -->
    <MenuLogo :url="logo.url" :src="logo.src" :alt="logo.alt" :show-title="false" />

    <Sheet v-model:open="isSheetOpen">
      <SheetTrigger as-child>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground size-9"
        >
          <Menu class="size-4" />
        </button>
      </SheetTrigger>
      <SheetContent class="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <MenuLogo :url="logo.url" :src="logo.src" :alt="logo.alt" :show-title="false" />
          </SheetTitle>
        </SheetHeader>
        <div class="flex flex-col gap-6 p-4">
          <!-- User info for authenticated users (mobile) -->
          <div
            v-if="isAuthenticated && user"
            class="flex items-center gap-3 pb-4 border-b border-border"
          >
            <UserAvatar :user="user" size="lg" />
            <div class="flex-1">
              <div class="font-semibold">{{ user.firstname }} {{ user.lastname }}</div>
              <div class="text-sm text-muted-foreground">{{ user.email }}</div>
            </div>
          </div>

          <!-- Navigation menu -->
          <AccordionRoot type="single" collapsible class="flex w-full flex-col gap-4">
            <template v-for="item in menu" :key="item.title">
              <!-- Menu item with subitems -->
              <AccordionItem v-if="item.items" :value="item.title" class="border-b-0">
                <AccordionTrigger class="text-md py-0 font-semibold hover:no-underline">
                  <div class="flex items-center gap-2">
                    <component :is="item.icon" v-if="item.icon" class="size-5" />
                    {{ item.title }}
                  </div>
                </AccordionTrigger>
                <AccordionContent class="mt-2">
                  <a
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    class="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                    :href="subItem.url"
                  >
                    <div class="text-foreground">
                      <component
                        :is="subItem.icon"
                        v-if="subItem.icon"
                        class="size-5 shrink-0"
                      />
                    </div>
                    <div>
                      <div class="text-sm font-semibold">{{ subItem.title }}</div>
                      <p
                        v-if="subItem.description"
                        class="text-muted-foreground text-sm leading-snug"
                      >
                        {{ subItem.description }}
                      </p>
                    </div>
                  </a>
                </AccordionContent>
              </AccordionItem>

              <!-- Simple menu item -->
              <a v-else :href="item.url" class="text-md font-semibold flex items-center gap-2">
                <component :is="item.icon" v-if="item.icon" class="size-5" />
                {{ item.title }}
              </a>
            </template>
          </AccordionRoot>

          <!-- User menu items for authenticated users (mobile) -->
          <div v-if="isAuthenticated" class="flex flex-col gap-2 border-t border-border pt-4">
            <div class="text-xs font-semibold text-muted-foreground uppercase mb-2">Account</div>
            <a
              v-for="item in userMenuItems"
              :key="item.title"
              :href="item.url"
              class="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
            >
              <component :is="item.icon" class="size-4" />
              {{ item.title }}
            </a>
            <button
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors text-destructive disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut class="size-4" />
              {{ isLoggingOut ? 'Logging out...' : 'Log Out' }}
            </button>

            <!-- Logout Error Alert (mobile) -->
            <div v-if="logoutError.length > 0" class="mt-2">
              <DangerAlert :errors="logoutError" />
            </div>
          </div>

          <!-- Auth buttons for non-authenticated users (mobile) -->
          <div v-else class="flex flex-col gap-3">
            <AuthButtons :auth="auth" variant="mobile" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
