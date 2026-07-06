<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

import NoteCard from '~/components/notes/NoteCard.vue'
import CreateNoteModal from '~/components/notes/CreateNoteModal.vue'

const store = useNotesStore()

const openCreate = ref(false)

function createNote() {
  store.selectedNote = null
  openCreate.value = true
}

onMounted(async () => {
  await store.fetchNotes()
})

async function changePage(page: number) {
  await store.fetchNotes(page)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">
          My Notes
        </h1>

        <p class="text-muted">
          {{ store.total }} Notes
        </p>
      </div>

      <UButton
        icon="i-lucide-plus"
        @click="createNote"
      >
        New Note
      </UButton>
    </div>

    <!-- Create Note Modal -->
    <CreateNoteModal v-model="openCreate" />

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

    <!-- Empty State -->
    <div
      v-else-if="store.notes.length === 0"
      class="py-20 text-center"
    >
      <UIcon
        name="i-lucide-notebook-text"
        class="mx-auto mb-4 h-16 w-16 text-muted"
      />

      <h2 class="text-2xl font-semibold">
        No Notes Found
      </h2>

      <p class="mt-2 text-muted">
        Create your first note to get started.
      </p>

      <UButton
        class="mt-6"
        icon="i-lucide-plus"
        @click="createNote"
      >
        Create First Note
      </UButton>
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
      class="mt-10 flex justify-center"
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