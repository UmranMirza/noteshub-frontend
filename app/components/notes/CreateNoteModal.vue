<script setup lang="ts">
import { toast } from 'vue-sonner'

const store = useNotesStore()

const open = defineModel<boolean>({
  default: false,
})

const title = ref("")
const description = ref("")
const loading = ref(false)
watch(
  () => store.selectedNote,
  (note) => {
    if (note) {
      title.value = note.title
      description.value = note.description
    } else {
      title.value = ""
      description.value = ""
    }
  },
  {
    immediate: true,
  }
)

async function save() {
  loading.value = true

  try {
    if (store.selectedNote) {
      await store.updateNote(store.selectedNote.id, {
        title: title.value,
        description: description.value,
      })

      toast.success('Note updated successfully')
    } else {
      await store.createNote({
        title: title.value,
        description: description.value,
      })

      toast.success('Note created successfully')
    }

    title.value = ''
    description.value = ''

    store.selectedNote = null

    open.value = false
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || 'Something went wrong'
    )
  } finally {
    loading.value = false
  }
}

function closeModal() {
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open">
    <template #content>
      <UCard class="border border-default">

        <template #header>
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
            >
              <UIcon
                :name="store.selectedNote ? 'i-lucide-pencil' : 'i-lucide-plus'"
                class="h-5 w-5 text-primary"
              />
            </div>

            <div>
              <h2 class="text-xl font-bold text-default">
                {{ store.selectedNote ? 'Edit Note' : 'Create Note' }}
              </h2>

              <p class="text-sm text-muted">
                {{
                  store.selectedNote
                    ? 'Update your existing note'
                    : 'Create a new note'
                }}
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-5">

          <UFormGroup label="Title">
            <UInput
              v-model="title"
              icon="i-lucide-pencil"
              placeholder="Enter note title"
              size="lg"
            />
          </UFormGroup>

          <UFormGroup label="Description">
            <UTextarea
              v-model="description"
              placeholder="Write your note here..."
              :rows="6"
              autoresize
            />
          </UFormGroup>

        </div>

        <template #footer>
          <div class="flex justify-end gap-3">

            <UButton
              color="neutral"
              variant="soft"
              icon="i-lucide-x"
              @click="closeModal"
            >
              Cancel
            </UButton>

            <UButton
              color="primary"
              :loading="loading"
              :icon="store.selectedNote ? 'i-lucide-save' : 'i-lucide-plus'"
              @click="save"
            >
              {{ store.selectedNote ? 'Update Note' : 'Save Note' }}
            </UButton>

          </div>
        </template>

      </UCard>
    </template>
  </UModal>
</template>