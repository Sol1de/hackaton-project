<template>
  <Card class="max-w-2xl w-full mx-auto mt-10 p-6 shadow-md">
    <CardHeader>
      <CardTitle class="text-2xl font-bold">
        Review - One Battle After Another
      </CardTitle>
      <CardDescription class="whitespace-pre-wrap break-words">
        feel like i haven’t watched a film in aaaaages coz of being on honeymoon
        and being in paris and having a weird body clock at the moment where im
        just sort of up all hours of the day working but i finally went to see
        the pta in paris with finn after being in the studio. it was literally
        the hottest theatre ive ever been to which just sort of added to the
        stress but yeah this was super cool and everyone came through with big
        big swings in their performances which i love and i feel we need more of
        in general. teyana and chase were on fire, leo’s timing killssssss me
        he’s so damn funny and i think im beginning to realize that i am just
        obsessed with benicio. honorable mention to sean penn’s physicality!
        nice to watch a movie again!
      </CardDescription>
    </CardHeader>

    <CardContent class="mt-6 space-y-4">
      <h3 class="font-semibold text-lg">Commentaires :</h3>

      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="border p-3 rounded-lg bg-gray-50"
      >
        <p class="font-semibold text-sm text-gray-700 mb-1">
          {{ comment.author }}
        </p>
        <p class="break-words whitespace-pre-wrap">
          {{ comment.text }}
        </p>
      </div>

      <div class="mt-4">
        <Textarea
          v-model="newComment"
          placeholder="Écrire un commentaire..."
          class="mb-3"
        />
        <Button
          @click="addComment"
          class="w-full bg-black text-white hover:bg-gray-900 transition"
        >
          Ajouter un commentaire
        </Button>
      </div>
    </CardContent>
  </Card>

  <!-- <Card class="max-w-2xl w-full mx-auto mt-10 p-6 shadow-md">
    <CardHeader>
      <CardTitle class="text-2xl font-bold">
        {{ title }}
      </CardTitle>
      <CardDescription class="whitespace-pre-wrap break-words">
        {{ description }}
      </CardDescription>
    </CardHeader>

    <CardContent class="mt-6 space-y-4">
      <h3 class="font-semibold text-lg">Commentaires :</h3>

      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="border p-3 rounded-lg bg-gray-50"
      >
        <p class="font-semibold text-sm text-gray-700 mb-1">
          {{ comment.author }}
        </p>
        <p class="break-words whitespace-pre-wrap">
          {{ comment.text }}
        </p>
      </div>

      <div class="mt-4">
        <Textarea
          v-model="newComment"
          placeholder="Écrire un commentaire..."
          class="mb-3"
        />
        <Button
          @click="addComment"
          class="w-full bg-black text-white hover:bg-gray-900 transition"
        >
          Ajouter un commentaire
        </Button>
      </div>
    </CardContent>
  </Card> -->

</template>

<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

// const title = ref("")
// const description = ref("")

// const response = await fetch("")
//   const data = await response.json()

//   title.value = data.title
//   description.value = data.description

const comments = ref<{ author: string; text: string }[]>([])
const newComment = ref('')

const currentUser = { firstName: 'Romain', lastName: 'Daguet' }

const addComment = () => {
  if (newComment.value.trim() !== '') {
    comments.value.push({
      author: `${currentUser.firstName} ${currentUser.lastName}`,
      text: newComment.value.trim(),
    })
    newComment.value = ''
  }
}
</script>
