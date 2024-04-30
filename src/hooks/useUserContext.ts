import {
  UserAuthContext,
  ContextValue,
} from "@/components/global/UserAuthProvider"
import { useContext } from "react"

const useUserContext = () => {
  const context = useContext(UserAuthContext)
  return context as ContextValue
}

export default useUserContext
