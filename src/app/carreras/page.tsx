"use client"
import { useQuery } from "@tanstack/react-query"
import { MajorRequestResponse } from "@/types/majorInterface"
import MajorCard from "@/components/ui/MajorCard"
import { fetchAllMajors } from "@/utils/majorFetchs"
import ErrorAlert from "@/components/ui/ErrorAlert"

export default function Page() {
  const { isLoading, isError, data } = useQuery<MajorRequestResponse>({
    queryKey: ["majors"],
    queryFn: fetchAllMajors,
  })

  const allIsGood = !isError && data?.ok

  return (
    <div className="flex flex-col gap-7 items-center mt-10">
      {isLoading && <span className="loading loading-dots loading-lg"></span>}
      {isError && (
        <ErrorAlert
          errorMessage="Error al obtener las carreras, recarga la página para intentar nuevamente."
          className="w-[750px]"
        />
      )}
      {allIsGood &&
        data.data?.map((major) => (
          <MajorCard
            id={major._id}
            key={major._id}
            name={major.name}
            totalHs={major.total_hours}
            years={major.duration_years}
          />
        ))}
    </div>
  )
}
