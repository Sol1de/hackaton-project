export interface HeroProps {
  badge?: string
  heading?: string
  description?: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
  image?: {
    src: string
    alt: string
  }
}

export interface Post {
  id: string
  title: string
  summary: string
  author: string
  published: string
  url: string
  image: string
}

export interface PostPreview {
  id: string
  title: string
  summary: string
  url: string
  image: string
}

export interface BlogProps {
  tagline?: string
  heading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  posts?: Post[]
}

export interface FooterProps {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  sections?: Array<{
    title: string
    links: Array<{ name: string; href: string }>
  }>
  description?: string
  socialLinks?: Array<{
    icon: string
    href: string
    label: string
  }>
  copyright?: string
  legalLinks?: Array<{
    name: string
    href: string
  }>
}
