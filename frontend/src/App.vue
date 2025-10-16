<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- Left Part -->
    <div class="flex-1 flex flex-col p-10">
      <!-- Logo et titres en haut -->
      <div class="flex flex-col mb-10">
        <img src="./assets/image/logo.png" alt="logo" class="w-15 mb-5" />
        <h1 class="text-5xl font-bold m-0">SOCIAL MEDIA</h1>
        <h2 class="text-lg text-gray-500 m-0 font-normal">Here, everyone is right (especially you).</h2>

        <div class="mt-4">
          <Button @click="$router.push('/home')" class="bg-blue-600 text-white py-2 px-4">
            Go to Home
          </Button>
        </div>

      </div>

      <!-- Formulaire centré -->
      <div class="flex-1 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>

    <!-- Right Part (Image) -->
    <div class="flex-1 hidden md:flex justify-center items-center">
      <img src="./assets/image/Home.png" alt="home" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import LoginForm from '@/components/LoginForm.vue'
</script>
