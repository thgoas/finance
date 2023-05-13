import useForm from '@/data/hooks/useForm'
import MiniForm from '../template/MiniForm'
import User from '@/logic/core/user/User'
import { TextInput } from '@mantine/core'
import Text from '@/logic/utils/text'
import Cpf from '@/logic/utils/Cpf'
import Telephone from '@/logic/utils/Telephone'
import AuthenticationContext from '@/data/contexts/Authentication'
import { useContext, useEffect } from 'react'

export default function Forms() {
  const { user, updateUser } = useContext(AuthenticationContext)
  const { data, changeAttribute, changeData  } = useForm<User>()

  useEffect(()=>{
    if(!user) return
    changeData(user)
  },[user, changeData])

  async function save () {
    if(!user) return
    await updateUser(data)
  }

  return (
    <div className="flex flex-col gap-5 mt-7">
      <MiniForm
        title="Seu Nome"
        description="Esse é o nome usado pela plataforma em todas as suas interações."
        msgFooter="O nome deve possuir entre 3 e 80 caracteres, mais que isso já é um texto!"
        canSave={Text.between(data.name, 3, 80)}
        save={save}
      >
        <TextInput value={data.name} onChange={changeAttribute('name')} />
      </MiniForm>
      <MiniForm
        title="CPF"
        description="Seu CPF é usado internamente pelo sistema."
        msgFooter="Pode relaxar daqui ele não sai!"
        canSave
        save={save}
      >
        <TextInput
          value={Cpf.format(data.cpf ?? '')}
          onChange={changeAttribute('cpf', Cpf.unFormat)}
        />
      </MiniForm>
      <MiniForm
        title="Telefone"
        description="Usado para notificações importantes sobre a sua conta."
        msgFooter="Se receber ligação a cobrar, não foi a gente!"
        canSave
        save={save}
      >
        <TextInput
          value={Telephone.format(data.telefone ?? '')}
          onChange={changeAttribute('telefone', Telephone.unFormat)}
        />
      </MiniForm>
    </div>
  )
}
