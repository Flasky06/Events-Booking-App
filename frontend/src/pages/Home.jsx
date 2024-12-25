import { Link } from "react-router-dom";
import HeroSection from "../component/layout/HeroSection";
import EventSectionComponent from "../component/EventSectionComponent";
import HeaderComponent from "../component/layout/HeaderComponent";

const Home = () => {
  return (
    <main>
      <HeaderComponent />
      <HeroSection />
      <EventSectionComponent />
    </main>
  );
};

export default Home;
