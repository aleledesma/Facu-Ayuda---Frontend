import z from "zod"

const isBrowser = typeof window !== "undefined"

interface IFileList {
  [index: number]: File
  length: number
  item(index: number): File | null
}

const FileList = isBrowser
  ? window.FileList
  : (class {} as any as { new (): IFileList })

export const uploadFileSchema = z.object({
  file: z.instanceof(FileList).refine((value) => value[0] instanceof File, {
    message: "Debe seleccionar un archivo",
  }),
  name: z
    .string()
    .min(5, { message: "El nombre debe tener al menos 5 caracteres" })
    .max(50, { message: "El nombre debe tener como máximo 50 caracteres" }),
  majorId: z.string().min(1, { message: "Debe seleccionar una carrera" }),
  assignatureId: z
    .string()
    .min(1, { message: "Debe seleccionar una asignatura" }),
})

export type UploadFileType = z.infer<typeof uploadFileSchema>
