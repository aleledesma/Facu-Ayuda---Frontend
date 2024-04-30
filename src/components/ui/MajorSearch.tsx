"use client"
import { useEffect, useRef, useState } from "react"
import SearchIcon from "../icons/SearchIcon"
import { useDebounce } from "@/hooks/useDebounce"
import { fetchMajorsByName } from "@/utils/majorFetchs"
import { Major } from "@/types/majorInterface"
import Link from "next/link"

export default function MajorSearch() {
  const [inputValue, setInputValue] = useState("")
  const [data, setData] = useState<Major[]>([])
  const [isError, setIsError] = useState(false)
  const [inputIsSelected, setInputIsSelected] = useState(false)
  const [resultsIsHovered, setResultsIsHovered] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const handleFocus = () => {
    setInputIsSelected(true)
  }
  const handleBlur = () => {
    setInputIsSelected(false)
  }
  const handleHover = () => {
    setResultsIsHovered(true)
  }
  const handleMouseOut = () => {
    setResultsIsHovered(false)
  }
  const debounceValue = useDebounce(inputValue)

  useEffect(() => {
    setData([])
    const fetchData = async () => {
      setIsError(false)
      try {
        const res = await fetchMajorsByName(debounceValue)
        if (res.data) {
          setData(res.data)
        }
      } catch (error) {
        setIsError(true)
      } finally {
      }
    }
    if (debounceValue) {
      fetchData()
    }
  }, [debounceValue])
  return (
    <>
      <label className="input input-bordered input-md w-80 flex items-center gap-2">
        <SearchIcon />
        <input
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputValue}
          type="text"
          className="grow"
          placeholder="Buscar carrera"
        />
      </label>
      {data.length > 0 && (
        <div
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
          className={`w-80 mt-1 p-4 bg-base-200 z-10 rounded-b-md absolute block ${
            !inputIsSelected && !resultsIsHovered && "hidden"
          }`}
        >
          {data.map((major) => (
            <Link
              onClick={() => setInputValue("")}
              key={major._id}
              href={`/carreras/${major._id}`}
              className="btn btn-ghost btn-block justify-start mb-2"
            >
              {major.name}
            </Link>
          ))}
        </div>
      )}
      {/* <div className="w-80 bg-base-100 rounded-b-md h-60 absolute block"></div> */}
    </>
  )
}
