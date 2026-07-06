<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    class="!w-auto !px-2 shrink-0"
    @click="toggleTheme"
  >
    <UIcon
      :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      class="h-5 w-5"
    />

    <span class="ml-2 hidden md:inline">
      {{ isDark ? 'Light' : 'Dark' }}
    </span>
  </UButton>
</template>