<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger asChild>
      <span></span>
    </DialogTrigger>
    <DialogContent class="max-w-lg w-full">
      <DialogHeader>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogDescription>
          Write your post and submit it.
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 flex flex-col gap-4">
        <Input v-model="title" placeholder="Post title" />
        <Textarea v-model="content" placeholder="Post content" />
        <Button
          @click="submitPost"
          class="w-full bg-black text-white hover:bg-gray-900 transition"
        >
          Submit
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useNewPostModal } from '@/composables/useNewPostModal'

// Utilisation du composable pour contrôler le modal globalement
const { isOpen, closeModal } = useNewPostModal()

const title = ref('')
const content = ref('')

const submitPost = () => {
  if (!title.value || !content.value) return

  console.log('New Post:', { title: title.value, content: content.value })

  title.value = ''
  content.value = ''
  closeModal()
}
</script>
