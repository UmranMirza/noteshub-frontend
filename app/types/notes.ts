export interface Note {
  id: string
  title: string
  description: string
  userId: string
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface NotesResponse {
  data: Note[]
  page: number
  limit: number
  total: number
  totalPages: number
}