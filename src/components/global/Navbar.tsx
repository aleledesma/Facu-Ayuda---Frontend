"use client"
import Link from "next/link"
import TabBarsIcon from "../icons/TabBarsIcon"
import SearchIcon from "../icons/SearchIcon"
import MajorSearch from "../ui/MajorSearch"
import useUserContext from "@/hooks/useUserContext"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { user, setUser } = useUserContext()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    setUser(null)
    router.push("/login")
  }

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
              <Link href="/carreras">Carreras</Link>
            </li>
            <li>
              <Link href="/subir">Subir Material</Link>
            </li>
            <li>
              {!user ? (
                <Link href="/login">Iniciar Sesión</Link>
              ) : (
                <button onClick={handleLogout}>Cerrar Sesión</button>
              )}
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
      <div className="navbar-end hidden lg:flex">
        <div className="flex gap-2 mr-10">
          <Link href="/carreras" className="btn btn-ghost">
            Carreras
          </Link>
          <Link href="/subir" className="btn btn-ghost">
            Subir Material
          </Link>
        </div>
        {!user ? (
          <Link href="/login" className="btn btn-success btn-md">
            Iniciar Sesión
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn btn-sm btn-ghost">
            Cerrar Sesión
          </button>
        )}
      </div>
    </div>
  )
}
