<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const auth = useAuthStore()
const notesStore = useNotesStore()

onMounted(async () => {
  await notesStore.fetchNotes()
})
</script>

<template>
  <div class="max-w-5xl mx-auto">

    <h1 class="mb-8 text-4xl font-bold">
      My Profile
    </h1>

    <div class="grid gap-8 lg:grid-cols-3">

      <!-- Profile Card -->
      <UCard class="text-center">

        <div class="flex flex-col items-center">

          <UAvatar
            :alt="auth.user?.name"
            size="3xl"
          />

          <h2 class="mt-4 text-2xl font-bold">
            {{ auth.user?.name }}
          </h2>

          <p class="text-muted">
            {{ auth.user?.email }}
          </p>

          <UBadge
            class="mt-4"
            color="primary"
            variant="soft"
          >
            Active User
          </UBadge>

        </div>

      </UCard>

      <!-- Details -->
      <div class="space-y-6 lg:col-span-2">

        <UCard>

          <template #header>
            <h2 class="font-semibold text-lg">
              Account Information
            </h2>
          </template>

          <div class="space-y-6">

            <div class="flex justify-between">
              <span class="text-muted">
                Name
              </span>

              <span class="font-medium">
                {{ auth.user?.name }}
              </span>
            </div>

            <UDivider />

            <div class="flex justify-between">
              <span class="text-muted">
                Email
              </span>

              <span class="font-medium">
                {{ auth.user?.email }}
              </span>
            </div>

            <UDivider />

            <div class="flex justify-between">
              <span class="text-muted">
                Total Notes
              </span>

              <UBadge color="primary">
                {{ notesStore.total }}
              </UBadge>
            </div>

            <UDivider />

            <div class="flex justify-between">
              <span class="text-muted">
                Member Since
              </span>

              <span>
                July 2026
              </span>
            </div>

          </div>

        </UCard>

        <!-- Actions -->
        <UCard>

          <template #header>
            <h2 class="font-semibold">
              Account Actions
            </h2>
          </template>

          <div class="flex flex-wrap gap-4">

            <UButton
              icon="i-lucide-notebook"
              to="/notes"
            >
              My Notes
            </UButton>

            <UButton
              color="error"
              icon="i-lucide-log-out"
              @click="auth.logout()"
            >
              Logout
            </UButton>

          </div>

        </UCard>

      </div>

    </div>

  </div>
</template>