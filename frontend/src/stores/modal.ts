import { ref } from 'vue'

export const newPostModalOpen = ref(false)

export const openNewPostModal = () => {
  newPostModalOpen.value = true
}

export const closeNewPostModal = () => {
  newPostModalOpen.value = false
}

// gère le modal pour gérer les états