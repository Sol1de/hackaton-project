<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Welcome back
        </CardTitle>
        <CardDescription>
          Login with your email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid gap-6">
            <div class="grid gap-4">
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                  <a
                    href="#"
                    class="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <Button type="submit" class="w-full">
                Login
              </Button>
              <div class="text-center text-sm">
                Don't have an account?
                <a href="#" class="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
