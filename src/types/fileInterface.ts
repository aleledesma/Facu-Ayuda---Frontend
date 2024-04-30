export interface File {
  _id: string
  name: string
  originalName: string
  assignatureId: string
  state: "APPROVED"
  url: string
  author: string
  createdAt: string
}

export interface FileRequestResponse {
  ok: boolean
  message: string
  data?: File[]
}
