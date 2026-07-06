import axios from 'axios'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const api = axios.create({
    baseURL: runtimeConfig.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  return {
    provide: {
      api,
    },
  }
})