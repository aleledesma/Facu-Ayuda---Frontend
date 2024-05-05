"use client"
import { useQuery } from "@tanstack/react-query"
import { File, FileRequestResponse } from "@/types/fileInterface"
import { getFilesByAssignature } from "@/utils/filesFetchs"
import ErrorAlert from "@/components/ui/ErrorAlert"
import FileCard from "@/components/ui/FileCard"

export default function Page({
  params,
}: {
  params: { assignatureId: string }
}) {
  const { assignatureId } = params
  const { isLoading, isError, data } = useQuery<FileRequestResponse>({
    queryKey: ["files", assignatureId],
    queryFn: async () => await getFilesByAssignature(assignatureId),
  })

  const allIsGood = !isError && data?.ok

  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      {isLoading && <span className="loading loading-dots loading-lg"></span>}
      {isError && (
        <ErrorAlert
          errorMessage="Ocurrio un error al obtener los archivos :("
          className="w-[750px]"
        />
      )}
      {allIsGood && (
        <div className="flex flex-col gap-6 w-full items-center">
          <h2 className="lg:text-2xl md:text-xl text-lg text-center">
            Archivos de la asignatura
          </h2>
          {data.data?.map((file) => (
            <FileCard key={file._id} file={file} />
          ))}
        </div>
      )}
    </div>
  )
}
