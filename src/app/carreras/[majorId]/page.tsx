"use client"
import { useQuery } from "@tanstack/react-query"
import { AssignaturesRequestResponse } from "@/types/assignatureIterface"
import { fetchAssignaturesByMajor } from "@/utils/assignatureFetchs"
import ErrorAlert from "@/components/ui/ErrorAlert"
import AssignatureCard from "@/components/ui/AssignatureCard"

export default function Page({ params }: { params: { majorId: string } }) {
  const { majorId } = params
  const { isLoading, isError, data, error } =
    useQuery<AssignaturesRequestResponse>({
      queryKey: ["assignatures", majorId],
      queryFn: async () => await fetchAssignaturesByMajor(majorId),
    })
  console.log(isLoading, isError, error?.message)

  const errorMessage =
    error?.message === "asignaturas no encontradas"
      ? "No se encontraron asignaturas, asegurate haber ingresado una asignatura valida."
      : "Ocurrio un error al cargar las asignaturas, recarga la página para intentar nuevamente."

  const allIsGood = !isError && data?.ok
  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      {isLoading && <span className="loading loading-dots loading-lg"></span>}
      {isError && (
        <ErrorAlert errorMessage={errorMessage} className="w-[750px]" />
      )}
      {allIsGood &&
        data.data?.map((assignature) => (
          <AssignatureCard key={assignature._id} assignature={assignature} />
        ))}
    </div>
  )
}
