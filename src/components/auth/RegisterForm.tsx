"use client"

import {
  RegisterFormType,
  registerFormSchema,
} from "@/schemas/registerFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Input from "../ui/Input"
import ErrorSpan from "../ui/ErrorSpan"
import { fetchAllMajors } from "@/utils/majorFetchs"
import { Major } from "@/types/majorInterface"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { UserResponseInterface } from "@/types/userInterface"
import { showNotification } from "@/utils/showNotification"

export default function RegisterForm() {
  const [majorsData, setMajorsData] = useState<Major[]>([])
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ resolver: zodResolver(registerFormSchema) })

  const handleRegister = async (data: RegisterFormType) => {
    const major = data.majorId?.length > 0 ? data.majorId : undefined
    try {
      const res = await axios.post<UserResponseInterface>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          username: data.username,
          email: data.email,
          majorId: major,
        }
      )
      showNotification(res.data.message, res.data.ok)
      router.push("/login")
    } catch (error) {
      if (error instanceof AxiosError) {
        showNotification(error.response?.data.message, false)
      }
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchMajors = async () => {
      const majors = await fetchAllMajors()
      if (majors.data) {
        setMajorsData(majors.data)
      }
    }
    fetchMajors()
  }, [])

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-6"
    >
      <Input
        placeholder="Nombre de usuario"
        type="text"
        id="username"
        register={register("username")}
      />
      <ErrorSpan error={errors.username?.message} />

      <Input
        placeholder="Email"
        type="text"
        id="email"
        register={register("email")}
      />
      <ErrorSpan error={errors.email?.message} />

      <select
        id="majorId"
        className="select select-bordered lg:select-md select-sm"
        defaultValue=""
        {...register("majorId")}
      >
        <option value="" disabled>
          Selecciona tu carrera (opcional)
        </option>
        {majorsData.map((major) => (
          <option key={major._id} value={major._id}>
            {major.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-success lg:btn-md btn-sm">
        Registrarse
      </button>
    </form>
  )
}
