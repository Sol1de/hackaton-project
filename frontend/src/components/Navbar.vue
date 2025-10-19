<script setup lang="ts">
import {
  Book,
  Menu,
  Sunset,
  Trees,
  Zap,
  Home,
  Compass,
  PlusCircle,
  Users,
  User,
  FileText,
  Settings,
  LogOut,
  Info,
} from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { logoutFetch } from '@/api/logout.fetch'
import { useRouter } from 'vue-router'
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'radix-vue'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const authStore = useAuthStore()
const router = useRouter()
const isLoggingOut = ref(false)

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: any
  items?: MenuItem[]
}

interface UserData {
  firstname: string
  lastname: string
  avatar?: string
  email: string
}

interface NavbarProps {
  isAuthenticated?: boolean
  user?: UserData
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  menu?: MenuItem[]
  auth?: {
    login: {
      title: string
      url: string
    }
    signup: {
      title: string
      url: string
    }
  }
  onLogout?: () => void
}

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

const isSheetOpen = ref(false)

// Authenticated menu: Home/Feed, Explore, Create Post, Users
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

// Non-authenticated menu: Home, Explore, About
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
  if (isLoggingOut.value) return // Prevent double-clicking

  try {
    isLoggingOut.value = true

    // Call the logout API
    await logoutFetch()

    // Clear auth store after successful logout
    authStore.clearAuth()

    // Call the optional onLogout callback
    if (props.onLogout) {
      props.onLogout()
    }

    // Redirect to home page
    await router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
    // Even if the API call fails, clear local auth for security
    authStore.clearAuth()
    await router.push('/')
  } finally {
    isLoggingOut.value = false
  }
}

const getUserInitials = computed(() => {
  const user = currentUser.value
  if (!user) return 'U'
  return `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase()
})
</script>

<template>
  <section class="py-4">
    <div class="container mx-auto">
      <!-- Desktop Menu -->
      <nav class="hidden justify-between items-center lg:flex">
        <div class="flex items-center gap-6">
          <!-- Logo -->
          <a :href="logo.url" class="flex items-center gap-2">
            <img :src="logo.src" class="max-h-8 dark:invert" :alt="logo.alt" />
            <span class="text-lg font-semibold tracking-tighter">
              {{ logo.title }}
            </span>
          </a>
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
          <template v-if="!isLogged">
            <Button
              variant="outline"
              :href="auth.login.url"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
            >
              {{ auth.login.title }}
            </Button>
            <Button
              variant="default"
              :href="auth.signup.url"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3"
            >
              {{ auth.signup.title }}
            </Button>
          </template>

          <!-- Authenticated: Show user hover card menu -->
          <template v-else>
            <HoverCard :open-delay="200" :close-delay="100">
              <HoverCardTrigger as-child>
                <button
                  class="cursor-pointer flex items-center gap-2 rounded-full p-1 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <div v-if="currentUser?.avatar" class="size-8 rounded-full overflow-hidden">
                    <img
                      :src="currentUser.avatar"
                      :alt="`${currentUser.firstname} ${currentUser.lastname}`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    v-else
                    class="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm"
                  >
                    {{ getUserInitials }}
                  </div>
                </button>
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                :side-offset="8"
                class="w-56 bg-popover text-popover-foreground border border-border rounded-md shadow-md p-1"
              >
                <!-- User info header -->
                <div class="px-2 py-1.5 text-sm font-semibold border-b border-border mb-1">
                  {{ currentUser?.firstname }} {{ currentUser?.lastname }}
                  <div class="text-xs text-muted-foreground font-normal">
                    {{ currentUser?.email }}
                  </div>
                </div>

                <!-- Menu items -->
                <div class="flex flex-col">
                  <a
                    v-for="item in userMenuItems"
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
              </HoverCardContent>
            </HoverCard>
          </template>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div class="block lg:hidden">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a :href="logo.url" class="flex items-center gap-2">
            <img :src="logo.src" class="max-h-8 dark:invert" :alt="logo.alt" />
          </a>
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
                  <a :href="logo.url" class="flex items-center gap-2">
                    <img :src="logo.src" class="max-h-8 dark:invert" :alt="logo.alt" />
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div class="flex flex-col gap-6 p-4">
                <!-- User info for authenticated users (mobile) -->
                <div
                  v-if="isLogged && currentUser"
                  class="flex items-center gap-3 pb-4 border-b border-border"
                >
                  <div v-if="currentUser?.avatar" class="size-12 rounded-full overflow-hidden">
                    <img
                      :src="currentUser.avatar"
                      :alt="`${currentUser.firstname} ${currentUser.lastname}`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    v-else
                    class="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold"
                  >
                    {{ getUserInitials }}
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold">
                      {{ currentUser.firstname }} {{ currentUser.lastname }}
                    </div>
                    <div class="text-sm text-muted-foreground">{{ currentUser.email }}</div>
                  </div>
                </div>

                <!-- Navigation menu -->
                <AccordionRoot type="single" collapsible class="flex w-full flex-col gap-4">
                  <template v-for="item in currentMenu" :key="item.title">
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
                    <a
                      v-else
                      :href="item.url"
                      class="text-md font-semibold flex items-center gap-2"
                    >
                      <component :is="item.icon" v-if="item.icon" class="size-5" />
                      {{ item.title }}
                    </a>
                  </template>
                </AccordionRoot>

                <!-- User menu items for authenticated users (mobile) -->
                <div v-if="isLogged" class="flex flex-col gap-2 border-t border-border pt-4">
                  <div class="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    Account
                  </div>
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
                </div>

                <!-- Auth buttons for non-authenticated users (mobile) -->
                <div v-else class="flex flex-col gap-3">
                  <a
                    :href="auth.login.url"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  >
                    {{ auth.login.title }}
                  </a>
                  <a
                    :href="auth.signup.url"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                  >
                    {{ auth.signup.title }}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </section>
</template>
