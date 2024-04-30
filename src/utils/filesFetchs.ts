import axios from "axios"

export const getFilesByAssignature = async (assignatureId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/file/assignature/${assignatureId}`
    )
    return res.data
  } catch (error) {
    throw new Error("error al obtener los archivos de la asignatura")
  }
}
