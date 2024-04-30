"use client"

import { UserPayload } from "@/types/userInterface"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"

export interface ContextValue {
  user: UserPayload | null
  setUser: Dispatch<SetStateAction<UserPayload | null>>
}
export const UserAuthContext = createContext<ContextValue | null>(null)

export default function UserAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserPayload | null>(null)

  useEffect(() => {
    const userFromLS = localStorage.getItem("user")
    const userParsed = userFromLS ? JSON.parse(userFromLS) : null
    setUser(userParsed)
    console.log(userParsed)
  }, [])

  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  )
}
