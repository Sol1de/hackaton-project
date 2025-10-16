<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- Left Part -->
    <div class="flex-1 flex flex-col justify-between items-start p-10 gap-5">
      <div class="flex flex-col">
        <img src="./assets/image/logo.png" alt="logo" class="w-15 mb-5" />
        <h1 class="text-5xl font-bold m-0">SOCIAL MEDIA</h1>
        <h2 class="text-lg text-gray-500 m-0 font-normal">Here, everyone is right (especially you).</h2>
      </div>

      <div class="flex flex-col gap-5">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline" class="bg-black text-white">
              Sign in
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>
                Sign up here.
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="firstname" class="text-right">
                  Firstname
                </Label>
                <Input id="firstname" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="lastname" class="text-right">
                  Lastname
                </Label>
                <Input id="lastname" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="email" class="text-right">
                  Email
                </Label>
                <Input id="email" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="password" class="text-right">
                  Password
                </Label>
                <Input id="password" type="password" class="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                Sign in
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline">
              Log in
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log in</DialogTitle>
              <DialogDescription>
                Connect you here.
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="email-login" class="text-right">
                  Email
                </Label>
                <Input id="email-login" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="password-login" class="text-right">
                  Password
                </Label>
                <Input id="password-login" type="password" class="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                Log in
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    <!-- Right Part -->
    <div class="flex-1 flex justify-center items-center">
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
</script>
