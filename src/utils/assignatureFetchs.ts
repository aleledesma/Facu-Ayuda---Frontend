import { AssignaturesRequestResponse } from "@/types/assignatureIterface"
import axios, { AxiosError } from "axios"

export const fetchAssignaturesByMajor = async (
  majorId: string
): Promise<AssignaturesRequestResponse> => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/assignature/major/${majorId}`
    )
    return result.data
  } catch (error) {
    const axiosError = error as AxiosError<AssignaturesRequestResponse>
    if (axiosError.response?.data.message) {
      throw new Error(axiosError.response?.data.message)
    }
    throw new Error("error al obtener las asignaturas")
  }
}
