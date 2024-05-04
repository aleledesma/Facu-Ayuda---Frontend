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
    <div className="card card-bordered lg:card-normal card-compact lg:w-[650px] md:w-[70%] w-[90%]">
      <div className="card-body flex-row items-center gap-4">
        <Link className="flex-1 hover:text-slate-200" href={`/carreras/${id}`}>
          <h4 className="link lg:text-xl md:text-base text-sm underline-offset-2">
            {name}
          </h4>
        </Link>
        <div className="flex lg:flex-row lg:gap-4 flex-col gap-2">
          <span
            className="badge badge-neutral lg:badge-lg md:badge-md badge-sm tooltip"
            data-tip="duración"
          >
            {years} años
          </span>
          <span
            className="badge badge-neutral lg:badge-lg md:badge-md badge-sm tooltip"
            data-tip="carga horaria"
          >
            {totalHs} hs
          </span>
        </div>
      </div>
    </div>
  )
}
