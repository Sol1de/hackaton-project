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
import { useAuthStore } from '@/stores/auth'
import { registerFetch } from '@/api/register.fetch.ts'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const router = useRouter()

const email = ref('')
const password = ref('')
const firstname = ref('')
const lastname = ref('')
const avatar = ref('')
const description = ref('')
const errors = ref<string[]>([])
const isLoading = ref(false)

const handleRegister = async () => {
  errors.value = []
  isLoading.value = true

  try {
    await registerFetch({
      email: email.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
      avatar: avatar?.value,
      description: description?.value,
    })

    await router.push({ name: 'login' })
  } catch (err: any) {
    const responseData = err.response?.data

    if (responseData?.errors && Array.isArray(responseData.errors)) {
      errors.value = responseData.errors.map((error: any) => error.message)
    } else {
      errors.value = [responseData.message]
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
          Welcome aboard
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleRegister">
          <div class="grid gap-6">
            <div class="grid gap-4">
              <div v-if="errors.length > 0" class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                <ul v-if="errors.length > 1" class="list-disc list-inside space-y-1">
                  <li v-for="(errorMsg, index) in errors" :key="index">{{ errorMsg }}</li>
                </ul>
                <p v-else>{{ errors[0] }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="grid gap-3">
                  <Label for="firstname">First name</Label>
                  <Input
                    id="firstname"
                    v-model="firstname"
                    type="text"
                    placeholder="John"
                    required
                  />
                </div>
                <div class="grid gap-3">
                  <Label for="lastname">Last name</Label>
                  <Input
                    id="lastname"
                    v-model="lastname"
                    type="text"
                    placeholder="Doe"
                    required />
                </div>
              </div>
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
                <Label for="password">Password</Label>
                <Input id="password" v-model="password" type="password" required />
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <Button type="submit" class="w-full" :disabled="isLoading">
                {{ isLoading ? 'Creating account...' : 'Create an account' }}
              </Button>
              <div class="text-center text-sm">
                Already have an account?
                <RouterLink to="/login" class="underline underline-offset-4">Sign in</RouterLink>
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
