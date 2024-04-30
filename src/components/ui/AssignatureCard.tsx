import { Assignature } from "@/types/assignatureIterface"
import Link from "next/link"

interface AssignatureCardProps {
  assignature: Assignature
}

export default function AssignatureCard({ assignature }: AssignatureCardProps) {
  return (
    <div className="collapse collapse-arrow bg-base-200 w-7/12">
      <input type="radio" name="assignaturesList" id="assignaturesList" />
      <div className="collapse-title text-xl font-semibold">
        {assignature.name}
      </div>
      <div className="collapse-content">
        <div className="text-sm flex flex-col gap-2">
          <p>Año: {assignature.year}</p>
          <p>Tipo: {assignature.type}</p>
          {assignature.teachers?.length != 0 && (
            <p>Profesores: {assignature.teachers?.join(", ")}</p>
          )}
        </div>
        <Link
          href={`/carreras/${assignature.major_id}/${assignature._id}`}
          className="btn btn-active btn-ghost btn-md btn-block mt-7"
        >
          Ver Archivos
        </Link>
      </div>
    </div>
  )
}
