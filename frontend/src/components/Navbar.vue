<script setup lang="ts">
import { Book, Menu, Sunset, Trees, Zap } from 'lucide-vue-next'
import { ref } from 'vue'
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger
} from 'radix-vue'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: any
  items?: MenuItem[]
}

interface NavbarProps {
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
}

const props = withDefaults(defineProps<NavbarProps>(), {
  logo: () => ({
    url: 'https://www.shadcnblocks.com',
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
    alt: 'logo',
    title: 'Shadcnblocks.com'
  }),
  menu: () => [
    { title: 'Home', url: '#' },
    {
      title: 'Products',
      url: '#',
      items: [
        {
          title: 'Blog',
          description: 'The latest industry news, updates, and info',
          icon: Book,
          url: '#'
        },
        {
          title: 'Company',
          description: 'Our mission is to innovate and empower the world',
          icon: Trees,
          url: '#'
        },
        {
          title: 'Careers',
          description: 'Browse job listing and discover our workspace',
          icon: Sunset,
          url: '#'
        },
        {
          title: 'Support',
          description: 'Get in touch with our support team or visit our community forums',
          icon: Zap,
          url: '#'
        }
      ]
    },
    {
      title: 'Resources',
      url: '#',
      items: [
        {
          title: 'Help Center',
          description: 'Get all the answers you need right here',
          icon: Zap,
          url: '#'
        },
        {
          title: 'Contact Us',
          description: 'We are here to help you with any questions you have',
          icon: Sunset,
          url: '#'
        },
        {
          title: 'Status',
          description: 'Check the current status of our services and APIs',
          icon: Trees,
          url: '#'
        },
        {
          title: 'Terms of Service',
          description: 'Our terms and conditions for using our services',
          icon: Book,
          url: '#'
        }
      ]
    },
    { title: 'Pricing', url: '#' },
    { title: 'Blog', url: '#' }
  ],
  auth: () => ({
    login: { title: 'Login', url: '#' },
    signup: { title: 'Sign up', url: '#' }
  })
})

const isSheetOpen = ref(false)
</script>

<template>
  <section class="py-4">
    <div class="container mx-auto">
      <!-- Desktop Menu -->
      <nav class="hidden justify-between lg:flex">
        <div class="flex items-center gap-6">
          <!-- Logo -->
          <a :href="logo.url" class="flex items-center gap-2">
            <img :src="logo.src" class="max-h-8 dark:invert" :alt="logo.alt" />
            <span class="text-lg font-semibold tracking-tighter">
              {{ logo.title }}
            </span>
          </a>
          <div class="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <template v-for="item in menu" :key="item.title">
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
                            <component :is="subItem.icon" v-if="subItem.icon" class="size-5 shrink-0" />
                          </div>
                          <div>
                            <div class="text-sm font-semibold">{{ subItem.title }}</div>
                            <p v-if="subItem.description" class="text-muted-foreground text-sm leading-snug">
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
                      {{ item.title }}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </template>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div class="flex gap-2">
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
                <AccordionRoot type="single" collapsible class="flex w-full flex-col gap-4">
                  <template v-for="item in menu" :key="item.title">
                    <!-- Menu item with subitems -->
                    <AccordionItem v-if="item.items" :value="item.title" class="border-b-0">
                      <AccordionTrigger class="text-md py-0 font-semibold hover:no-underline">
                        {{ item.title }}
                      </AccordionTrigger>
                      <AccordionContent class="mt-2">
                        <a
                          v-for="subItem in item.items"
                          :key="subItem.title"
                          class="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                          :href="subItem.url"
                        >
                          <div class="text-foreground">
                            <component :is="subItem.icon" v-if="subItem.icon" class="size-5 shrink-0" />
                          </div>
                          <div>
                            <div class="text-sm font-semibold">{{ subItem.title }}</div>
                            <p v-if="subItem.description" class="text-muted-foreground text-sm leading-snug">
                              {{ subItem.description }}
                            </p>
                          </div>
                        </a>
                      </AccordionContent>
                    </AccordionItem>

                    <!-- Simple menu item -->
                    <a v-else :href="item.url" class="text-md font-semibold">
                      {{ item.title }}
                    </a>
                  </template>
                </AccordionRoot>

                <div class="flex flex-col gap-3">
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
