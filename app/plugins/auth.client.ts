export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  const token = localStorage.getItem('token')

  if (!token) return

  auth.token = token

  try {
    await auth.getProfile()
  } catch {
    auth.logout()
  }
})