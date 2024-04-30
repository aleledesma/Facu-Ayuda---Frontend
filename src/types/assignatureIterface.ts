export interface Assignature {
  _id: string
  name: string
  major_id: string
  year: number
  teachers?: string[]
  type: "ANUAL" | "C1" | "C2"
}

export interface AssignaturesRequestResponse {
  ok: boolean
  message: string
  data?: Assignature[]
}
