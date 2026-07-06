<script setup lang="ts">
definePageMeta({
  layout: "auth",
})

const auth = useAuthStore()

const email = ref('')
const password = ref('')

async function login() {
  const success = await auth.login({
    email: email.value,
    password: password.value,
  })

  if (success) {
    await navigateTo('/dashboard')
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
        <div class="mb-8 text-6xl">📝</div>

        <h1 class="mb-6 text-5xl font-bold">
          NotesHub
        </h1>

        <p class="text-lg leading-8 opacity-90">
          A modern place to organize your thoughts, ideas and daily work.
        </p>

        <div class="mt-12 space-y-4">
          <div>✅ Secure Authentication</div>
          <div>✅ Fast Note Management</div>
          <div>✅ Beautiful UI</div>
          <div>✅ Mobile Responsive</div>
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="flex items-center justify-center p-6">
      <UCard class="w-full max-w-md shadow-2xl">
        <template #header>
          <div class="space-y-2">
            <h2 class="text-3xl font-bold">
              Welcome Back 👋
            </h2>

            <p class="text-gray-500">
              Login to continue
            </p>
          </div>
        </template>

        <div class="space-y-5">
          <UFormGroup label="Email">
            <UInput
              v-model="email"
              icon="i-lucide-mail"
              placeholder="Enter your email"
            />
          </UFormGroup>

          <UFormGroup label="Password">
            <UInput
              v-model="password"
              type="password"
              icon="i-lucide-lock"
              placeholder="Enter your password"
            />
          </UFormGroup>

         <UButton
  block
  :loading="auth.loading"
  @click="login"
>
  Sign In
</UButton>

          <div class="text-center text-sm">
            Don't have an account?

            <NuxtLink
              to="/signup"
              class="font-semibold text-primary hover:underline"
            >
              Create Account
            </NuxtLink>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>