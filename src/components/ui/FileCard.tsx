import { File } from "@/types/fileInterface"
import Link from "next/link"
import DownloadIcon from "../icons/DownloadIcon"

export default function FileCard({ file }: { file: File }) {
  console.log(file)
  const { name, createdAt, url } = file
  const fecha = new Date(createdAt).toLocaleDateString()
  return (
    <div className="card card-bordered flex flex-row items-center px-4 h-14 w-[650px]">
      <Link
        href={url}
        target="_blank"
        className="flex-1 flex items-center gap-2 link link-hover text-lg"
      >
        {name}
        <DownloadIcon />
      </Link>
      <div className="text-xs text-gray-400">{fecha}</div>
    </div>
  )
}
