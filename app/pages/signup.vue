<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { AxiosInstance } from 'axios'

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const { $api } = useNuxtApp()
const api = $api as AxiosInstance

async function signup() {
  if (!name.value.trim()) {
    toast.error('Name is required')
    return
  }

  if (!email.value.trim()) {
    toast.error('Email is required')
    return
  }

  if (password.value.length < 6) {
    toast.error('Password must be at least 6 characters')
    return
  }

  if (password.value !== confirmPassword.value) {
    toast.error('Passwords do not match')
    return
  }

  loading.value = true

  try {
    await api.post('/auth/signup', {
      name: name.value,
      email: email.value,
      password: password.value,
    })

    toast.success('Account created successfully')

    await navigateTo('/login')
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || 'Unable to create account'
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">

    <!-- Left Side -->
    <div
      class="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-16 text-white"
    >
      <div class="max-w-md">

        <div class="mb-8 text-6xl">
          🚀
        </div>

        <h1 class="mb-6 text-5xl font-bold">
          Join NotesHub
        </h1>

        <p class="text-lg leading-8 opacity-90">
          Create your account and organize your ideas, tasks and daily notes in one secure place.
        </p>

        <div class="mt-12 space-y-4">
          <div>✅ Secure Authentication</div>
          <div>✅ Unlimited Notes</div>
          <div>✅ Responsive Design</div>
          <div>✅ Dark Mode Support</div>
        </div>

      </div>
    </div>

    <!-- Right Side -->
    <div class="flex items-center justify-center p-6">

      <UCard class="w-full max-w-md shadow-xl">

        <template #header>
          <div>
            <h2 class="text-3xl font-bold">
              Create Account ✨
            </h2>

            <p class="mt-2 text-muted">
              Start using NotesHub today
            </p>
          </div>
        </template>

        <div class="space-y-5">

          <UFormGroup label="Full Name">
            <UInput
              v-model="name"
              icon="i-lucide-user"
              placeholder="John Doe"
            />
          </UFormGroup>

          <UFormGroup label="Email">
            <UInput
              v-model="email"
              icon="i-lucide-mail"
              placeholder="john@example.com"
            />
          </UFormGroup>

          <UFormGroup label="Password">
            <UInput
              v-model="password"
              type="password"
              icon="i-lucide-lock"
              placeholder="Minimum 6 characters"
            />
          </UFormGroup>

          <UFormGroup label="Confirm Password">
            <UInput
              v-model="confirmPassword"
              type="password"
              icon="i-lucide-lock-keyhole"
              placeholder="Confirm password"
            />
          </UFormGroup>

          <UButton
            block
            color="primary"
            :loading="loading"
            @click="signup"
          >
            Create Account
          </UButton>

          <div class="text-center text-sm">
            Already have an account?

            <NuxtLink
              to="/login"
              class="font-semibold text-primary hover:underline"
            >
              Login
            </NuxtLink>
          </div>

        </div>

      </UCard>

    </div>

  </div>
</template>