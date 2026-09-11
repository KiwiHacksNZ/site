import Navbar from "../Navbar/Navbar";
// Components
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import About from "./components/About/About";
import Nova from "./components/Nova/Nova";
import Benefits from "./components/Benefits/Benefits";
import FAQ from "./components/FAQ/FAQ";
import Partners from "./components/Partners/Partners";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";

//React being react
import { useEffect } from "react";

export default function App({ projects = [] }) {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const stars = document.querySelectorAll(".stars");
      stars.forEach((star) => {
        const rect = star.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          star.classList.add("star-hovered");
        } else {
          star.classList.remove("star-hovered");
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Navbar />

      <img
        className="logo"
        src="/assets/kiwihackslogo.png"
        alt="KiwiHacks Kiwi Bird"
        fetchPriority="high"
        width="150"
        height="150"
        draggable="false"
      />

      <main>
        <Hero />
        <Nova />
        <About />
        <Projects projects={projects} />
        <Benefits />
        <Partners />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
