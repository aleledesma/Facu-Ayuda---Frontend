import UploadFileForm from "@/components/ui/UploadFileForm"

export default function Page() {
  return (
    <div className="card card-bordered w-[650px] mt-12 mx-auto py-5 px-7">
      <h1 className="text-2xl font-semibold text-center mb-3">Subir archivo</h1>
      <UploadFileForm />
    </div>
  )
}
