import SmoothScroll from "./components/SmoothScroll.jsx";
import Aurora from "./components/Aurora.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Manifesto from "./components/Manifesto.jsx";
import Marquee from "./components/Marquee.jsx";
import Work from "./components/Work.jsx";
import Skills from "./components/Skills.jsx";
import BuildPath from "./components/BuildPath.jsx";
import HowIWork from "./components/HowIWork.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Aurora />
      <ScrollProgressBar />
      <Nav />
      <main id="top">
        <Hero />
        <Manifesto />
        <Marquee />
        <Work />
        <Skills />
        <BuildPath />
        <HowIWork />
        <Contact />
      </main>
    </>
  );
}
