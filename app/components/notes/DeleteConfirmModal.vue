<script setup lang="ts">
const open = defineModel<boolean>({
  default: false,
})

const props = defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  confirm: []
}>()

function closeModal() {
  open.value = false
}

function confirmDelete() {
  emit('confirm')
}
</script>

<template>
  <UModal v-model:open="open">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              name="i-lucide-trash-2"
              class="text-red-500 text-2xl"
            />

            <h2 class="text-xl font-bold">
              Delete Note
            </h2>
          </div>
        </template>

        <div class="py-4">
          <p class="text-gray-600">
            Are you sure you want to delete this note?
          </p>

          <p class="mt-2 text-sm text-red-500">
            This action cannot be undone.
          </p>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton
              color="neutral"
              variant="outline"
              @click="closeModal"
            >
              Cancel
            </UButton>

            <UButton
              color="error"
              :loading="props.loading"
              @click="confirmDelete"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>