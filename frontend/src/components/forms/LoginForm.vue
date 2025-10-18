<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
import { loginFetch } from '@/api/login.fetch'
import { useAuthStore } from '@/stores/auth'
import type { ApiError } from '@/types/error.type.ts'
import DangerAlert from '@/components/alerts/DangerAlert.vue'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errors = ref<string[]>([])
const isLoading = ref(false)

const handleLogin = async () => {
  errors.value = []
  isLoading.value = true

  try {
    const response = await loginFetch({
      email: email.value,
      password: password.value
    })

    authStore.setAuth(response.token, response.user)
    await router.push({ name: 'home' })
  } catch (err) {
    const responseData = (err as ApiError).response?.data

    if (responseData?.errors && Array.isArray(responseData.errors)) {
      errors.value = responseData.errors.map((error) => error.message)
    } else if (responseData?.message) {
      errors.value = [responseData.message]
    } else {
      errors.value = ['An unexpected error occurred']
    }
  } finally {
    isLoading.value = false
  }
}
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
        <form @submit.prevent="handleLogin">
          <div class="grid gap-6">
            <div class="grid gap-4">
              <DangerAlert :errors="errors" />
              <div class="grid gap-3">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  v-model="email"
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
                <Input id="password" v-model="password" type="password" required />
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <Button type="submit" class="w-full" :disabled="isLoading">
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </Button>
              <div class="text-center text-sm">
                Don't have an account?
                <RouterLink to="/register" class="underline underline-offset-4">Sign up</RouterLink>
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
