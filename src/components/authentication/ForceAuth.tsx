import AuthenticationContext from "@/data/contexts/Authentication"
import { useRouter } from "next/router"
import { useContext } from "react"
import Loading from "../template/Loading"


interface ForceAuthProps {
  children: any
}

export default function ForceAuth (props: ForceAuthProps) {
  const router = useRouter()
  const { user, loading } = useContext(AuthenticationContext)

  if(loading) {
    return <Loading />
  } else if(user?.email) {
    return props.children
  } else {
    router.push('/')
    return <Loading />
  }
}