import Header from "../../components/Header";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Menu from "../../components/Menu";
import Promo from "../../components/Promo";
import BranchesAndReservation from "../../components/BranchesAndReservation";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Promo />
        <BranchesAndReservation />
      </main>
      <Footer />
    </>
  );
}
