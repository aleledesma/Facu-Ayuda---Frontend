import { MajorRequestResponse } from "@/types/majorInterface"
import axios from "axios"

export const fetchAllMajors = async (): Promise<MajorRequestResponse> => {
  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/major/`)
    return result.data
  } catch (error) {
    throw new Error("error al obtener las carreras")
  }
}

export const fetchMajorsByName = async (name: string) => {
  try {
    const result = await axios.get<MajorRequestResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/major/search/${name}`
    )
    return result.data
  } catch (error) {
    throw new Error("error al obtener las carreras")
  }
}
