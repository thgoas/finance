import services from "@/logic/core"
import User from "@/logic/core/user/User"
import Authentication from "@/logic/firebase/auth/Authentication"
import { createContext, useEffect, useState } from "react"

interface AuthenticationProps {
  loading: boolean
  user: User | null
  loginGoogle: () => Promise<User | null>
  logout: () => Promise<void>
  updateUser: (newUser: User) => Promise<void>
}

const AuthenticationContext = createContext<AuthenticationProps>({
  loading: true,
  user: null,
  loginGoogle: async () => null,
  logout: async () => {},
  updateUser: async () => {},
})


export function AuthenticationProvider(props: any) {

  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)



  useEffect(() =>{
    const cancel = services.user.monitorAuthentication((user)=>{
      setUser(user)
      setLoading(false)
    })
      return () => cancel()
  },[])

  async function updateUser(newUser: User) {
    if (user && user.email !== newUser.email) return logout()
    if (user && newUser && user.email === newUser.email) {
        await services.user.save(newUser)
        setUser(newUser)
    }
  }


  async function loginGoogle() {
    const user = await services.user.loginGoogle()
    setUser(user)
    return user
  }

  async function logout() {
    await services.user.logout()
    setUser(null)
  }

  return (
    <AuthenticationContext.Provider value={{
      user,
      loading,
      loginGoogle,
      logout,
      updateUser
    }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext