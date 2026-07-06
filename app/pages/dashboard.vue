<script setup lang="ts">
import CreateNoteModal from '~/components/notes/CreateNoteModal.vue'
import { toast } from 'vue-sonner'
import DeleteConfirmModal from '~/components/notes/DeleteConfirmModal.vue'

definePageMeta({
  middleware: 'auth',
})
const openDelete = ref(false)
const deleteId = ref('')
const deleting = ref(false)
const auth = useAuthStore()
const notesStore = useNotesStore()

const openCreate = ref(false)

onMounted(async () => {
  await notesStore.fetchNotes()
})
const debounce = ref<number>()

function searchNotes() {
  clearTimeout(debounce.value)

  debounce.value = window.setTimeout(async () => {
    await notesStore.fetchNotes(1)
  }, 400)
}

function createNote() {
  notesStore.selectedNote = null
  openCreate.value = true
}

function editNote(id: string) {
  const note = notesStore.notes.find((n) => n.id === id)

  if (!note) return

  notesStore.selectedNote = note

  openCreate.value = true
}

function deleteNote(id: string) {
  deleteId.value = id
  openDelete.value = true
}

async function confirmDelete() {
  deleting.value = true

  try {
    await notesStore.deleteNote(deleteId.value)

    toast.success('Note deleted successfully')

    openDelete.value = false
  } catch {
    toast.error('Unable to delete note')
  } finally {
    deleting.value = false
  }
}

</script>

<template>
  <div>
    <div class="mb-8">

  <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

    <div>
      <h1 class="text-4xl font-bold">
        Welcome back,
        {{ auth.user?.name }} 👋
      </h1>

      <p class="mt-2 text-gray-500">
        You have {{ notesStore.total }} notes
      </p>
    </div>

    <div class="flex gap-3">

      <UInput
        v-model="notesStore.search"
        icon="i-lucide-search"
        placeholder="Search notes..."
        class="w-72"
        @update:model-value="searchNotes"
      />

      <UButton
        icon="i-lucide-plus"
        @click="createNote"
      >
        New Note
      </UButton>

    </div>

  </div>

</div>

<CreateNoteModal v-model="openCreate" />

    <!-- Loading -->

    <div
      v-if="notesStore.loading"
      class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      <USkeleton
        v-for="i in 6"
        :key="i"
        class="h-56 rounded-xl"
      />
    </div>

    <!-- Empty -->

    <div
      v-else-if="notesStore.notes.length === 0"
    >
      <UCard>

        <div class="py-16 text-center">

          <UIcon
            name="i-lucide-notebook"
            class="mx-auto mb-4 h-16 w-16 text-gray-400"
          />

          <h3 class="text-lg font-semibold">
            No notes yet
          </h3>

          <p class="mt-2 text-gray-500">
            Create your first note.
          </p>

          <!-- <UButton
            class="mt-6"
            icon="i-lucide-plus"
          >
            Create First Note
          </UButton> -->
 <UButton
 class="mt-6"
        icon="i-lucide-plus"
        @click="createNote"
      >
        Create your first note.
      </UButton>
        </div>

      </UCard>
    </div>

    <!-- Notes -->

    <div
      v-else
      class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      <UCard
        v-for="note in notesStore.notes"
        :key="note.id"
        class="transition hover:shadow-xl"
      >
        <template #header>
          <h2 class="font-bold text-lg">
            {{ note.title }}
          </h2>
        </template>

        <p class="text-gray-600">
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
                @click="editNote(note.id)"
              />

              <UButton
                icon="i-lucide-trash"
                color="error"
                variant="ghost"
                @click="deleteNote(note.id)"
              />

            </div>

          </div>
        </template>

      </UCard>
    </div>
    <div
  v-if="notesStore.totalPages > 1"
  class="mt-10 flex justify-center"
>
  <UPagination
    v-model:page="notesStore.page"
    :total="notesStore.total"
    :items-per-page="notesStore.limit"
    @update:page="notesStore.fetchNotes"
  />
</div>
<DeleteConfirmModal
  v-model="openDelete"
  :loading="deleting"
  @confirm="confirmDelete"
/>
  </div>
</template>