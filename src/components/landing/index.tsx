import Page from "../template/Page";
import Advantages from "./advantages";
import Depositions from "./depositions";
import Emphasis from "./emphasis";
import Footer from "./footer";
import Header from "./header";

export default function Landing() {
  return (
    <Page external>
        <Header />
        <Emphasis />
        <Advantages />
        <Depositions />
        <Footer />
    </Page>
  )
}