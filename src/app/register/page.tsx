import RegisterForm from "@/components/auth/RegisterForm"

export default function Page() {
  return (
    <div className="card card-bordered lg:w-[700px] md:w-[560px] w-[90%] mt-12 mx-auto py-5 px-7">
      <h1 className="lg:text-2xl text-lg font-semibold text-center mb-3">
        Crear una cuenta
      </h1>
      <RegisterForm />
    </div>
  )
}
