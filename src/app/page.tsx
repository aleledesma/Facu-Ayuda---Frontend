import ErrorAlert from "@/components/ui/ErrorAlert"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="lg:text-8xl md:text-6xl text-5xl font-extrabold text-slate-100">
        <span className="text-emerald-400">Facu</span> Ayuda
      </h1>
      <h2 className="lg:text-3xl text-xl text-slate-100 font-medium mt-4">
        Potencia tu estudio
      </h2>
      <h3 className="lg:text-lg text-base text-slate-300 lg:w-[800px] md:w-[650px] w-[350px] text-center mt-8">
        Sube tus apuntes y accede a recursos compartidos por otros estudiantes
        para tener el material de estudio al alcance de tu mano.
      </h3>
      <Link href="/carreras" className="btn btn-success btn-wide text-lg mt-8">
        Busca Apuntes
      </Link>
    </div>
  )
}
