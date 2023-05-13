import Finance from "@/components/finance";
import Landing from "@/components/landing";
import Loading from "@/components/template/Loading";
import AuthenticationContext from "@/data/contexts/Authentication";
import { useContext } from "react";

export default function Home() {
  const {user, loading} = useContext(AuthenticationContext)

  if(loading) return <Loading />
  return user ? (
    <Finance />
  ) : (
    <Landing />
  )
}
