import z from "zod"

const fileIsDefined = typeof FileList !== undefined

export const uploadFileSchema = z.object({
  file: fileIsDefined
    ? z.instanceof(FileList).refine((value) => value[0] instanceof File, {
        message: "Debe seleccionar un archivo",
      })
    : z.object({
        name: z.string(),
        lastModified: z.number(),
        size: z.number(),
        type: z.string(),
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
