<script setup lang="ts">
import type { Note } from '~/types/notes'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <UCard
    class="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold truncate">
          {{ note.title }}
        </h3>

        <UBadge color="primary">
          Note
        </UBadge>
      </div>
    </template>

    <p class="line-clamp-3 text-gray-600">
      {{ note.description }}
    </p>

    <template #footer>
      <div class="flex items-center justify-between">

        <span class="text-xs text-gray-500">
          {{ new Date(note.updatedAt).toLocaleDateString() }}
        </span>

        <div class="flex gap-2">

          <UButton
            icon="i-lucide-pencil"
            color="neutral"
            variant="ghost"
            @click="emit('edit', note.id)"
          />

          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            @click="emit('delete', note.id)"
          />

        </div>

      </div>
    </template>

  </UCard>
</template>