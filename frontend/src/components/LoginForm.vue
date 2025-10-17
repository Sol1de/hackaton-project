<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const isLogin = ref(true)
function toggleForm() {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="flex-1 flex justify-center items-center p-4">
    <Card class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <CardHeader class="text-center">
        <CardTitle class="text-xl sm:text-2xl md:text-3xl">
          {{ isLogin ? 'Welcome back' : 'Create your account' }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid gap-4 sm:gap-6">
            <div v-if="isLogin" class="grid gap-4 sm:gap-6">
              <div class="grid gap-2 sm:gap-3">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div class="grid gap-2 sm:gap-3">
                <Label for="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" class="w-full py-2 sm:py-3 text-sm sm:text-lg">Login</Button>
              <div class="text-center text-xs sm:text-sm">
                Don't have an account?
                <Button class="py-1 px-2" @click.prevent="toggleForm">
                  Sign Up
                </Button>
              </div>
            </div>

            <div v-else class="grid gap-4 sm:gap-6">

            <div class="grid grid-cols-2 gap-3">
              <div class="grid gap-2 sm:gap-3">
                <Label for="firstname">Firstname</Label>
                <Input id="firstname" type="text" required />
              </div>
              <div class="grid gap-2 sm:gap-3">
                <Label for="lastname">Lastname</Label>
                <Input id="lastname" type="text" required />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="grid gap-2 sm:gap-3">
                <Label for="email-signup">Email</Label>
                <Input id="email-signup" type="email" required />
              </div>
              <div class="grid gap-2 sm:gap-3">
                <Label for="password-signup">Password</Label>
                <Input id="password-signup" type="password" required />
              </div>
            </div>

            
              <Button type="submit" class="w-full py-2 sm:py-3 text-sm sm:text-lg">Sign Up</Button>
              <div class="text-center text-xs sm:text-sm">
                Already have an account?
                <Button class="py-1 px-2" @click.prevent="toggleForm">
                  Login
                </Button>
              </div>
            </div>

          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
