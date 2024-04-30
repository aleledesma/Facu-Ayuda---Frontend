"use client"
import Link from "next/link"
import TabBarsIcon from "../icons/TabBarsIcon"
import SearchIcon from "../icons/SearchIcon"
import MajorSearch from "../ui/MajorSearch"
import useUserContext from "@/hooks/useUserContext"

export default function Navbar() {
  const { user, setUser } = useUserContext()
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <TabBarsIcon />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          FacuAyuda
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div>
          <MajorSearch />
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2 mr-10">
          <Link href="/carreras" className="btn btn-ghost">
            Carreras
          </Link>
          <Link href="/subir" className="btn btn-ghost">
            Subir Material
          </Link>
        </div>
        {!user && (
          <Link href="/login" className="btn btn-success btn-md">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  )
}
