<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const props = defineProps<{
  errors: string[]
}>()
</script>

<template>
  <Alert v-if="props.errors.length > 0" variant="destructive">
    <AlertCircle class="w-4 h-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      <ul v-if="props.errors.length > 1" class="list-disc list-outside space-y-1 ">
        <li v-for="(errorMsg, index) in props.errors" :key="index">{{ errorMsg }}</li>
      </ul>
      <p v-else>{{ props.errors[0] }}</p>
    </AlertDescription>
  </Alert>
</template>
