"use client"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormType } from "@/schemas/loginFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Input from "../ui/Input"
import ErrorSpan from "../ui/ErrorSpan"
import { useRouter } from "next/navigation"
import useUserContext from "@/hooks/useUserContext"

export default function LoginForm() {
  const [loginIsActive, setLoginIsActive] = useState(false)
  const { user, setUser } = useUserContext()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  const getLoginCode = async () => {
    try {
      const validations = await trigger(["name", "email"])
      if (validations) {
        const { name, email } = watch()
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/${email}/code`,
          {
            username: name,
          }
        )
        setLoginIsActive(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin: SubmitHandler<LoginFormType> = async (data) => {
    const { email, name } = data
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/${email}`,
        {
          email,
          username: name,
          login_code: data.code,
        },
        {
          withCredentials: true,
        }
      )
      localStorage.setItem("user", JSON.stringify(res.data.data))
      setUser(res.data.data)
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="form-control flex flex-col gap-4"
    >
      <Input
        type="text"
        id="name"
        placeholder="Nombre"
        error={errors.name?.message}
        register={register("name")}
      />
      <ErrorSpan error={errors.name?.message} className="ml-1" />

      <div className="flex gap-2">
        <div className="flex flex-col flex-1 gap-2">
          <Input
            type="text"
            id="email"
            placeholder="Email"
            error={errors.email?.message}
            register={register("email")}
          />
          <ErrorSpan error={errors.email?.message} className="ml-1" />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            type="text"
            id="code"
            placeholder="código"
            error={errors.code?.message}
            register={register("code")}
            disabled={!loginIsActive}
          />
          <ErrorSpan
            error={errors.code && "El codigo debe tener 6 caracteres"}
            className="ml-1"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className={`btn btn-primary flex-1 ${
            !loginIsActive && "btn-disabled"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={getLoginCode}
          type="button"
          className="btn btn-neutral"
        >
          Obtener Código
        </button>
      </div>
    </form>
  )
}
