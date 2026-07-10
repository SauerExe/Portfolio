import A11yWidget from "./components/A11yWidget.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import StatusBar from "./components/StatusBar.jsx";
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
      <a className="skip-link" href="#top">Zum Inhalt springen</a>
      <SmoothScroll />
      <ScrollProgressBar />
      <StatusBar />
      <Nav />
      <main id="top" tabIndex={-1}>
        <Hero />
        <Manifesto />
        <Marquee />
        <Work />
        <Skills />
        <BuildPath />
        <HowIWork />
        <Contact />
      </main>
      <A11yWidget />
    </>
  );
}
