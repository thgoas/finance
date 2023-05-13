import Content from "@/components/template/Content";
import Header from "@/components/template/Header";
import Page from "@/components/template/Page";
import PageTitle from "@/components/template/PageTitle";
import Forms from "@/components/user/Forms";
import user from "@/data/constants/userFake";
import { IconForms } from "@tabler/icons-react";

export default function UserRegistration() {
  return (
    <Page>
      <Header />
      <Content>
        <PageTitle ico={<IconForms />} main="Dados Cadastrais" secondary={`Informações de ${user.email}`}  />
        <Forms />
        Usuário
      </Content>
    </Page>
  )
}