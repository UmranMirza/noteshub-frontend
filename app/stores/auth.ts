import type { AxiosInstance } from 'axios'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

interface User {
  id: string
  name: string
  email: string
}

interface LoginPayload {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  // state: () => ({
  //   token: import.meta.client ? localStorage.getItem('token') || '' : '',
  //   user: null as User | null,
  //   loading: false,
  // }),

  state: () => ({
  token: '',
  user: null as User | null,
  loading: false,
}),

  actions: {
    async login(payload: LoginPayload) {
      const { $api } = useNuxtApp()
      
      const api = $api as AxiosInstance
      
      this.loading = true

      try {
const response = await api.post('/auth/login', payload)
        this.token = response.data.access_token

        localStorage.setItem('token', this.token)

        await this.getProfile()
        toast.success('Login successful')

        return true
      } finally {
        this.loading = false
      }
    },

    async getProfile() {
      const { $api } = useNuxtApp()

      const api = $api as AxiosInstance

      const response = await api.get('/users/profile')

      this.user = response.data
    },

    logout() {
  this.token = ''
  this.user = null

  localStorage.removeItem('token')

  toast.success('Logged out successfully')

  navigateTo('/login')
}
  },
})