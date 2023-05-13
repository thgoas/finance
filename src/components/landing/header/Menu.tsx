import { IconBrandGoogle } from "@tabler/icons-react";
import MenuItem from "./MenuItem";
import { useContext } from "react";
import AuthenticationContext from "@/data/contexts/Authentication";

export default function Menu () {

  const {loginGoogle} = useContext(AuthenticationContext)

 
  return (
    <div className="flex gap-2">
      <MenuItem url="#start" className="hidden sm:flex">
        Início
      </MenuItem>
      <MenuItem url="#advantages" className="hidden sm:flex">
        Vantagens
      </MenuItem>
      <MenuItem url="#depositions" className="hidden sm:flex">
        Depoimentos
      </MenuItem>
      <MenuItem className="bg-gradient-to-r from-indigo-600 to-cyan-600">
        <div onClick={loginGoogle} className="flex items-center gap-2">
          <IconBrandGoogle size={15}/>
          <span>Login</span>
        </div>
      </MenuItem>
    </div>
  )
}