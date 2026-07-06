<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue'

const auth = useAuthStore()

const mobileOpen = ref(false)

function openMenu() {
  mobileOpen.value = true
}

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

const menuItems = [
  [
    {
      label: auth.user?.name || 'User',
      icon: 'i-lucide-user',
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user-circle',
      to: '/profile',
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      click: () => auth.logout(),
    },
  ],
]
</script>

<template>
  <div class="min-h-screen bg-default">

    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-default bg-default">
 <div class="flex h-16 items-center px-4">

  <!-- Left -->
  <div class="flex flex-1 items-center gap-3">

    <UButton
      class="lg:hidden"
      color="neutral"
      variant="ghost"
      leading-icon="i-lucide-menu"
      @click="openMenu"
    />

    <NuxtLink
      to="/dashboard"
      class="flex items-center gap-2"
    >
      <span class="text-2xl">📝</span>

      <span class="hidden md:block text-xl font-bold">
        NotesHub
      </span>
    </NuxtLink>

  </div>

  <!-- Right -->
  <div class="flex shrink-0 items-center gap-2">

    <ThemeToggle />

   <UDropdownMenu :items="menuItems">
  <UAvatar
    size="sm"
    :text="auth.user?.name?.charAt(0).toUpperCase()"
    class="cursor-pointer"
  />
</UDropdownMenu>

  </div>

</div>
</header>
    <div class="flex">

      <!-- Desktop Sidebar -->
      <aside
        class="hidden w-64 border-r border-default bg-default lg:block"
      >
        <nav class="space-y-2 p-4">

          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-muted"
            active-class="bg-primary text-white"
          >
            <UIcon :name="item.icon" />
            <span>{{ item.label }}</span>
          </NuxtLink>

        </nav>
      </aside>

      <!-- Mobile Drawer -->
      <USlideover v-model:open="mobileOpen">

        <template #content>

          <div class="p-6">

            <div class="mb-8 flex items-center gap-3">

              <UAvatar
                :text="auth.user?.name?.charAt(0).toUpperCase()"
              />

              <div>

                <h2 class="font-bold">
                  {{ auth.user?.name }}
                </h2>

                <p class="text-sm text-muted">
                  {{ auth.user?.email }}
                </p>

              </div>

            </div>

            <div class="space-y-2">

              <NuxtLink
                v-for="item in items"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted"
                @click="mobileOpen = false"
              >
                <UIcon :name="item.icon" />
                {{ item.label }}
              </NuxtLink>

            </div>

            <UDivider class="my-6" />

            <UButton
              block
              color="error"
              leading-icon="i-lucide-log-out"
              @click="auth.logout()"
            >
              Logout
            </UButton>

          </div>

        </template>

      </USlideover>

      <!-- Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <slot />
      </main>

    </div>

  </div>
</template>