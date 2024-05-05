import LoginForm from "@/components/auth/LoginForm"

export default function Page() {
  return (
    <div className="card card-bordered lg:w-[700px] md:w-[560px] w-[90%] mt-12 mx-auto py-5 px-7">
      <h1 className="lg:text-2xl text-lg font-semibold text-center mb-3">
        Inicio de Sesión
      </h1>
      <p className="text-sm mb-3 text-center">
        Accede con tus datos o <span className="link">Registrate</span> si aún
        no tienes una cuenta
      </p>
      <LoginForm />
    </div>
  )
}
