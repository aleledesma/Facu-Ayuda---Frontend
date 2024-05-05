"use client"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormType } from "@/schemas/loginFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import Input from "../ui/Input"
import ErrorSpan from "../ui/ErrorSpan"
import { useRouter } from "next/navigation"
import useUserContext from "@/hooks/useUserContext"
import toast from "react-hot-toast"
import { ResponseInterface } from "@/types/responseInterface"
import { UserResponseInterface } from "@/types/userInterface"

const showNotification = (message: string, ok: boolean) => {
  const toastConfig = {
    duration: 5000,
    position: "top-right",
    style: {
      "margin-top": "50px",
    },
  }
  if (ok) {
    toast.success(message, toastConfig as any) // ta mal
  } else {
    toast.error(message, toastConfig as any) // ta mal
  }
}

export default function LoginForm() {
  const [loginIsActive, setLoginIsActive] = useState(false)
  const [codeIsActive, setCodeIsActive] = useState(true)
  const { setUser } = useUserContext()
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
        setCodeIsActive(false)
        const { name, email } = watch()
        const res = await axios.post<ResponseInterface>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/${email}/code`,
          {
            username: name,
          }
        )
        showNotification(res.data.message, res.data.ok)
        setLoginIsActive(true)
        setTimeout(() => {
          setCodeIsActive(true)
        }, 45000)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showNotification(error.response?.data.message, false)
      }
      console.log(error)
      setCodeIsActive(true)
    }
  }

  const handleLogin: SubmitHandler<LoginFormType> = async (data) => {
    const { email, name } = data
    setLoginIsActive(false)
    try {
      const res = await axios.post<UserResponseInterface>(
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
      showNotification(res.data.message, res.data.ok)
      localStorage.setItem("user", JSON.stringify(res.data.data))
      setUser(res.data.data)
      router.push("/")
    } catch (error) {
      if (error instanceof AxiosError) {
        showNotification(error.response?.data.message, false)
      }
      console.log(error)
      setTimeout(() => {
        setLoginIsActive(true)
      }, 5000)
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
        className="lg:input-md input-sm"
        error={errors.name?.message}
        register={register("name")}
      />
      <ErrorSpan error={errors.name?.message} className="ml-1" />

      <div className="flex gap-3 md:flex-row flex-col">
        <div className="flex flex-col flex-1 gap-2">
          <Input
            type="text"
            id="email"
            placeholder="Email"
            className="lg:input-md input-sm"
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
            className="lg:input-md input-sm"
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
          className={`btn btn-primary lg:btn-md btn-sm flex-1 ${
            !loginIsActive && "btn-disabled"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={getLoginCode}
          type="button"
          className={`btn btn-neutral lg:btn-md btn-sm ${
            !codeIsActive && "btn-disabled"
          }`}
        >
          Obtener Código
        </button>
      </div>
    </form>
  )
}
