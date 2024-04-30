import Link from "next/link"

export default function MajorCard({
  id,
  name,
  totalHs,
  years,
}: {
  id: string
  name: string
  totalHs: number
  years: number
}) {
  return (
    <div className="card card-bordered w-7/12">
      <div className="card-body flex-row items-center gap-4">
        <Link className="flex-1 hover:text-slate-200" href={`/carreras/${id}`}>
          <h4 className="link text-xl underline-offset-2">{name}</h4>
        </Link>
        <span
          className="badge badge-neutral badge-lg tooltip"
          data-tip="duración"
        >
          {years} años
        </span>
        <span
          className="badge badge-neutral badge-lg tooltip"
          data-tip="carga horaria"
        >
          {totalHs} hs
        </span>
      </div>
    </div>
  )
}
