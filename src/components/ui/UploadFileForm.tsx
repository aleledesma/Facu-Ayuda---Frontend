"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import { uploadFileSchema, UploadFileType } from "@/schemas/uploadFileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "./Input"
import { useEffect, useState } from "react"
import { fetchAllMajors } from "@/utils/majorFetchs"
import { Major } from "@/types/majorInterface"
import { Assignature } from "@/types/assignatureIterface"
import { fetchAssignaturesByMajor } from "@/utils/assignatureFetchs"
import ErrorSpan from "./ErrorSpan"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { FileRequestResponse } from "@/types/fileInterface"
import { showNotification } from "@/utils/showNotification"

export default function UploadFileForm() {
  const [majorsData, setMajorsData] = useState<Major[]>([])
  const [majorSelectedId, setMajorSelectedId] = useState<string>("")
  const [assignaturesData, setAssignaturesData] = useState<Assignature[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFileType>({
    resolver: zodResolver(uploadFileSchema),
  })

  const handleFileSubmit: SubmitHandler<UploadFileType> = async (data) => {
    console.log(data)
    const { name, assignatureId, file } = data
    const formData = new FormData()
    formData.append("name", name)
    formData.append("assignatureId", assignatureId)
    if (file instanceof FileList) {
      formData.append("file", file[0])
    }
    try {
      setIsUploading(true)
      const res = await axios.post<FileRequestResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/file/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      showNotification(res.data.message, res.data.ok)
      router.push("/")
    } catch (error) {
      if (error instanceof AxiosError) {
        showNotification(error.response?.data.message, false)
      }
      console.log(error)
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    //falta gestionar errores // se repite en registerForm (factorizar)
    const fetchMajors = async () => {
      const majors = await fetchAllMajors()
      if (majors.data) {
        setMajorsData(majors.data)
      }
    }
    fetchMajors()
  }, [])

  useEffect(() => {
    if (majorSelectedId) {
      //falta gestionar errores
      const fetchAssignatures = async () => {
        try {
          const assignatures = await fetchAssignaturesByMajor(majorSelectedId)
          if (assignatures.data) {
            setAssignaturesData(assignatures.data)
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            showNotification(error.message, false)
          }
        }
      }
      fetchAssignatures()
    }
  }, [majorSelectedId])

  return (
    <form
      onSubmit={handleSubmit(handleFileSubmit)}
      className="form-control flex flex-col gap-4"
    >
      <Input
        type="text"
        placeholder="Nombre del archivo"
        id="name"
        error={errors.name?.message}
        register={register("name")}
      />
      <ErrorSpan error={errors.name?.message} />

      <select
        defaultValue=""
        className="select select-bordered lg:select-md select-sm"
        {...register("majorId", {
          onChange: (e) => {
            setMajorSelectedId(e.target.value)
            setAssignaturesData([])
          },
        })}
      >
        <option value="" disabled>
          Selecciona una carrera
        </option>
        {majorsData.map((major) => (
          <option key={major._id} value={major._id}>
            {major.name}
          </option>
        ))}
      </select>
      <ErrorSpan error={errors.majorId?.message} />

      <select
        defaultValue=""
        className="select select-bordered lg:select-md select-sm"
        {...register("assignatureId")}
        disabled={majorSelectedId.length === 0}
      >
        <option value="" disabled>
          Selecciona una asignatura
        </option>
        {assignaturesData.map((assignature) => (
          <option key={assignature._id} value={assignature._id}>
            {assignature.name}
          </option>
        ))}
      </select>
      <ErrorSpan
        error={errors.assignatureId && "Debe seleccionar una asignatura"}
      />

      <Input
        type="file"
        id="file"
        multiple={false}
        error={errors.file?.message}
        register={register("file")}
        className="file-input file-input-bordered"
      />
      <ErrorSpan error={errors.file?.message} />
      <button
        className={`btn btn-success lg:btn-md btn-sm ${
          isUploading && "btn-disabled"
        }`}
      >
        {!isUploading ? "Subir" : "Subiendo ..."}
      </button>
    </form>
  )
}
