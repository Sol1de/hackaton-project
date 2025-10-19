<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: string;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const props = withDefaults(defineProps<FooterProps>(), {
  logo: () => ({
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  }),
  sections: () => [
    {
      title: "Product",
      links: [
        { name: "Overview", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Marketplace", href: "#" },
        { name: "Features", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help", href: "#" },
        { name: "Sales", href: "#" },
        { name: "Advertise", href: "#" },
        { name: "Privacy", href: "#" },
      ],
    },
  ],
  description: () => "A collection of components for your startup business or side project.",
  socialLinks: () => [
    { icon: "simple-icons:instagram", href: "#", label: "Instagram" },
    { icon: "simple-icons:facebook", href: "#", label: "Facebook" },
    { icon: "simple-icons:x", href: "#", label: "Twitter" },
    { icon: "simple-icons:linkedin", href: "#", label: "LinkedIn" },
  ],
  copyright: () => "� 2024 Shadcnblocks.com. All rights reserved.",
  legalLinks: () => [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
});
</script>

<template>
  <section class="py-32">
    <div class="container mx-auto">
      <div class="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
        <div class="flex w-full flex-col justify-between gap-6 lg:items-start">
          <!-- Logo -->
          <div class="flex items-center gap-2 lg:justify-start">
            <a :href="props.logo.url">
              <img
                :src="props.logo.src"
                :alt="props.logo.alt"
                :title="props.logo.title"
                class="h-8"
              />
            </a>
            <h2 class="text-xl font-semibold">{{ props.logo.title }}</h2>
          </div>
          <p class="text-muted-foreground max-w-[70%] text-sm">
            {{ props.description }}
          </p>
          <ul class="text-muted-foreground flex items-center space-x-6">
            <li
              v-for="(social, idx) in props.socialLinks"
              :key="idx"
              class="hover:text-primary font-medium"
            >
              <a :href="social.href" :aria-label="social.label">
                <Icon :icon="social.icon" class="size-5" />
              </a>
            </li>
          </ul>
        </div>
        <div class="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
          <div v-for="(section, sectionIdx) in props.sections" :key="sectionIdx">
            <h3 class="mb-4 font-bold">{{ section.title }}</h3>
            <ul class="text-muted-foreground space-y-3 text-sm">
              <li
                v-for="(link, linkIdx) in section.links"
                :key="linkIdx"
                class="hover:text-primary font-medium"
              >
                <a :href="link.href">{{ link.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
        <p class="order-2 lg:order-1">{{ props.copyright }}</p>
        <ul class="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
          <li
            v-for="(link, idx) in props.legalLinks"
            :key="idx"
            class="hover:text-primary"
          >
            <a :href="link.href"> {{ link.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
