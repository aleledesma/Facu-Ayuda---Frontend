import LoginForm from "@/components/auth/LoginForm"

export default function Page() {
  return (
    <div className="card card-bordered w-[650px] mt-12 mx-auto py-5 px-7">
      <h1 className="text-2xl font-semibold text-center mb-3">
        Inicio de Sesión
      </h1>
      <p className="text-sm mb-3 text-center">
        Accede con tus datos o <span className="link">Registrate</span> si no
        tienes una cuenta automaticamente
      </p>
      <LoginForm />
    </div>
  )
}
