import User from "@/logic/core/user/User"
import Authentication from "@/logic/firebase/auth/Authentication"
import { createContext, useEffect, useState } from "react"

interface AuthenticationProps {
  loading: boolean
  user: User | null
  loginGoogle: () => Promise<User | null>
  logout: () => Promise<void>
}

const AuthenticationContext = createContext<AuthenticationProps>({
  loading: true,
  user: null,
  loginGoogle: async () => null,
  logout: async () => {}
})


export function AuthenticationProvider(props: any) {

  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  const authentication = new Authentication()

  useEffect(() =>{
    const cancel = authentication.toMonitor((user)=>{
      setUser(user)
      setLoading(false)
    })
      return () => cancel()
  },[])

  async function loginGoogle() {
    const user = await authentication.loginGoogle()
    setUser(user)
    return user
  }

  async function logout() {
    await authentication.logout()
    setUser(null)
  }

  return (
    <AuthenticationContext.Provider value={{
      user,
      loading,
      loginGoogle,
      logout

    }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext