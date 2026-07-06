<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

import NoteCard from '~/components/notes/NoteCard.vue'

const store = useNotesStore()

onMounted(async () => {
  await store.fetchNotes()
})

async function changePage(page: number) {
  await store.fetchNotes(page)
}
</script>

<template>
  <div>

    <div class="mb-8 flex items-center justify-between">

      <div>
        <h1 class="text-3xl font-bold">
          My Notes
        </h1>

        <p class="text-gray-500">
          {{ store.total }} Notes
        </p>
      </div>

      <UButton icon="i-lucide-plus">
        New Note
      </UButton>

    </div>

    <!-- Loading -->

    <div
      v-if="store.loading"
      class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      <USkeleton
        v-for="i in 6"
        :key="i"
        class="h-56 rounded-xl"
      />
    </div>

    <!-- Notes -->

    <div
      v-else
      class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      <NoteCard
        v-for="note in store.notes"
        :key="note.id"
        :note="note"
      />
    </div>

    <!-- Pagination -->

    <div
      v-if="store.totalPages > 1"
      class="mt-8 flex justify-center"
    >
      <UPagination
        v-model:page="store.page"
        :total="store.total"
        :items-per-page="store.limit"
        @update:page="changePage"
      />
    </div>

  </div>
</template>