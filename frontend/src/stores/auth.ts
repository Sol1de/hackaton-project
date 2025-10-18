import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface User {
  _id: string
  email: string
  firstname: string
  lastname: string
  avatar?: string
  description?: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => (token.value?.length ?? 0) > 0)

  function setAuth(authToken: string, userData: User) {
    token.value = authToken
    user.value = userData
  }

  function clearAuth() {
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth
  }
}, {
  persist: true
})
