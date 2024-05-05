import { File } from "@/types/fileInterface"
import Link from "next/link"
import DownloadIcon from "../icons/DownloadIcon"

export default function FileCard({ file }: { file: File }) {
  const { name, createdAt, url } = file
  const fecha = new Date(createdAt).toLocaleDateString()
  return (
    <div className="card card-bordered flex flex-row items-center px-4 h-14 lg:w-[700px] md:w-[500px] w-[90%]">
      <Link
        href={url}
        target="_blank"
        className="flex-1 flex items-center gap-2 link link-hover lg:text-lg md:text-base text-sm"
      >
        {name}
        <DownloadIcon />
      </Link>
      <div className="text-xs text-gray-400 md:block hidden">{fecha}</div>
    </div>
  )
}
