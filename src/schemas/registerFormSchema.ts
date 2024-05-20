import z from "zod"

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(35, {
      message: "El nombre de usuario debe tener como máximo 35 caracteres",
    }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  majorId: z.string(),
})

export type RegisterFormType = z.infer<typeof registerFormSchema>
