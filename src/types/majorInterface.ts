export interface Major {
  _id: string
  name: string
  total_hours: number
  duration_years: number
  assignatures: []
}

export interface MajorRequestResponse {
  ok: boolean
  message: string
  data?: Major[]
}
