import { z } from "zod"

export const loginFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
    .max(35, {
      message: "El nombre debe tener máximo 35 caracteres",
    }),
  email: z.string().email({
    message: "El email debe ser válido",
  }),
  code: z.string().length(6, {
    message: "El código debe tener 6 caracteres",
  }),
})

export type LoginFormType = z.infer<typeof loginFormSchema>
