import UploadFileForm from "@/components/ui/UploadFileForm"

export default function Page() {
  return (
    <div className="card card-bordered lg:w-[700px] md:w-[560px] w-[90%] mt-12 mx-auto py-5 px-7">
      <h1 className="lg:text-2xl md:text-lg text-base font-semibold text-center mb-3">
        Subir archivo
      </h1>
      <UploadFileForm />
    </div>
  )
}
