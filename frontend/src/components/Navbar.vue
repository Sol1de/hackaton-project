<script setup lang="ts">
import { Home, Compass, PlusCircle, Users, User, FileText, Settings, Info } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { logoutFetch } from '@/api/logout.fetch'
import { useRouter } from 'vue-router'
import MenuLogo from '@/components/logos/MenuLogo.vue'
import UserDropdownMenu from '@/components/navbar/UserDropdownMenu.vue'
import AuthButtons from '@/components/navbar/AuthButtons.vue'
import MobileNavMenu from '@/components/navbar/MobileNavMenu.vue'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import type { MenuItem } from '@/types/menu.types'
import type { NavbarProps } from '@/types/navbar.types'

const authStore = useAuthStore()
const router = useRouter()
const isLoggingOut = ref(false)
const logoutError = ref<string[]>([])

const props = withDefaults(defineProps<NavbarProps>(), {
  isAuthenticated: false,
  logo: () => ({
    url: '/',
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
    alt: 'logo',
    title: 'Social App',
  }),
  auth: () => ({
    login: { title: 'Log In', url: '/login' },
    signup: { title: 'Sign Up', url: '/register' },
  }),
})

// Authenticated menu
const authenticatedMenu: MenuItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: Compass,
  },
  {
    title: 'Create Post',
    url: '/posts/create',
    icon: PlusCircle,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
  },
]

// Non-authenticated
const nonAuthenticatedMenu: MenuItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: Compass,
  },
  {
    title: 'About',
    url: '/about',
    icon: Info,
  },
]

// Use authStore values, with props as optional override
// Make isLogged reactive to authStore changes
const isLogged = computed(() => authStore.isAuthenticated)


const currentUser = computed(() => props.user || authStore.user)

// Use custom menu if provided, otherwise use default based on auth status
const currentMenu = computed(() => {
  if (props.menu && props.menu.length > 0) {
    return props.menu
  }
  return isLogged.value ? authenticatedMenu : nonAuthenticatedMenu
})

// User menu items for authenticated users
const userMenuItems = computed(() => [
  {
    title: 'My Profile',
    url: `/users/${currentUser.value?.email || ''}`,
    icon: User,
  },
  {
    title: 'My Posts',
    url: '/posts/my-posts',
    icon: FileText,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
])

const handleLogout = async () => {
  // Clear any previous errors
  logoutError.value = []

  try {
    isLoggingOut.value = true
    await logoutFetch()
    authStore.clearAuth()

    if (props.onLogout) {
      props.onLogout()
    }

    await router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to logout. Please try again.'
    logoutError.value = [errorMessage]
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <section class="py-4">
    <div class="container mx-auto">
      <!-- Desktop Menu -->
      <nav class="hidden justify-between items-center lg:flex">
        <div class="flex items-center gap-6">
          <!-- Logo -->
          <MenuLogo :url="logo.url" :src="logo.src" :alt="logo.alt" :title="logo.title" />
          <NavigationMenu class="items-center">
            <NavigationMenuList>
              <template v-for="item in currentMenu" :key="item.title">
                <!-- Menu item with subitems -->
                <NavigationMenuItem v-if="item.items">
                  <NavigationMenuTrigger>{{ item.title }}</NavigationMenuTrigger>
                  <NavigationMenuContent class="bg-popover text-popover-foreground">
                    <NavigationMenuLink
                      v-for="subItem in item.items"
                      :key="subItem.title"
                      as-child
                      class="w-80"
                    >
                      <a
                        class="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
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
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <!-- Simple menu item -->
                <NavigationMenuItem v-else>
                  <NavigationMenuLink
                    :href="item.url"
                    class="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <component :is="item.icon" v-if="item.icon" class="size-5 mr-2" />
                    {{ item.title }}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </template>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <!-- Right side: Auth buttons or User menu -->
        <div class="flex gap-2 items-center">
          <!-- Non-authenticated: Show login/signup buttons -->
          <AuthButtons v-if="!isLogged" :auth="auth" variant="desktop" />

          <!-- Authenticated: Show user dropdown menu -->
          <UserDropdownMenu
            v-else
            :user="currentUser"
            :menu-items="userMenuItems"
            :is-logging-out="isLoggingOut"
            :logout-error="logoutError"
            @logout="handleLogout"
          />
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div class="block lg:hidden">
        <MobileNavMenu
          :logo="logo"
          :menu="currentMenu"
          :user="currentUser"
          :is-authenticated="isLogged"
          :user-menu-items="userMenuItems"
          :auth="auth"
          :is-logging-out="isLoggingOut"
          :logout-error="logoutError"
          @logout="handleLogout"
        />
      </div>
    </div>
  </section>
</template>
