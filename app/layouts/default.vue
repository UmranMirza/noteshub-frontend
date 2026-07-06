<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue'

const auth = useAuthStore()

const items = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dashboard',
  },
  {
    label: 'Notes',
    icon: 'i-lucide-notebook-text',
    to: '/notes',
  },
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    to: '/profile',
  },
]

function logout() {
  auth.logout()
}
</script>

<template>
  <div class="min-h-screen bg-default">

    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-default bg-default">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-2 text-xl font-bold text-default"
        >
          📝 NotesHub
        </NuxtLink>

       <div class="flex items-center gap-3">

  <ThemeToggle />

  <UDropdownMenu
    :items="[
      [
        {
          label: auth.user?.name || 'User',
          icon: 'i-lucide-user'
        }
      ],
      [
        {
          label: 'Profile',
          icon: 'i-lucide-user-circle',
          to: '/profile'
        }
      ],
      [
        {
          label: 'Logout',
          icon: 'i-lucide-log-out',
          click: logout
        }
      ]
    ]"
  >
<UAvatar
  :alt="auth.user?.name"
  :text="
    auth.user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  "
/>  </UDropdownMenu>

</div>

      </div>
    </header>

    <div class="mx-auto flex max-w-7xl">

      <!-- Sidebar -->
      <aside
        class="hidden w-64 border-r border-default bg-default lg:block"
      >
        <nav class="space-y-2 p-4">

          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-4 py-3 text-default transition hover:bg-muted"
          >
            <UIcon :name="item.icon" />

            <span>{{ item.label }}</span>
          </NuxtLink>

        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <slot />
      </main>

    </div>

  </div>
</template>