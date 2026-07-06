import { defineStore } from 'pinia'
import type { AxiosInstance } from 'axios'
import type { Note, NotesResponse } from '~/types/notes'

export const useNotesStore = defineStore('notes', {
 state: () => ({
  notes: [] as Note[],
  selectedNote: null as Note | null,
  page: 1,
  limit: 6,
  total: 0,
  totalPages: 1,
  loading: false,
  search: '',
}),

  actions: {
    async fetchNotes(page = 1) {
      const { $api } = useNuxtApp()
      const api = $api as AxiosInstance

      this.loading = true

      try {
        const { data } = await api.get('/notes', {
  params: {
    page,
    limit: this.limit,
    search: this.search,
  },
})

        this.notes = data.data
        this.page = data.page
        this.limit = data.limit
        this.total = data.total
        this.totalPages = data.totalPages
      } finally {
        this.loading = false
      }
    },

    async createNote(payload: {
      title: string
      description: string
    }) {
      const { $api } = useNuxtApp()
      const api = $api as AxiosInstance

      await api.post('/notes', payload)

      await this.fetchNotes(this.page)
    },

    async updateNote(
  id: string,
  payload: {
    title: string
    description: string
  },
) {
  const { $api } = useNuxtApp()
  const api = $api as AxiosInstance

  await api.patch(`/notes/${id}`, payload)

  await this.fetchNotes(this.page)
},

    async deleteNote(id: string) {
      const { $api } = useNuxtApp()
      const api = $api as AxiosInstance

      await api.delete(`/notes/${id}`)

      await this.fetchNotes(this.page)
    },
  },
})