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
    :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
    @click="toggleTheme"
  >
    {{ isDark ? 'Light' : 'Dark' }}
  </UButton>
</template>