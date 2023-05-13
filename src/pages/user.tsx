import Content from '@/components/template/Content'
import Header from '@/components/template/Header'
import Page from '@/components/template/Page'
import PageTitle from '@/components/template/PageTitle'
import Forms from '@/components/user/Forms'
import AuthenticationContext from '@/data/contexts/Authentication'

import { IconForms } from '@tabler/icons-react'
import { useContext } from 'react'

export default function UserRegistration() {
  const { user } = useContext(AuthenticationContext)
  return (
    <Page>
      <Header />
      <Content>
        <PageTitle
          ico={<IconForms />}
          main="Dados Cadastrais"
          secondary={`Informações de ${user?.email}`}
        />
        <Forms />
      </Content>
    </Page>
  )
}
