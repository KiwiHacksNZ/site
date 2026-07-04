import "./App.css";
import Navbar from "../Navbar/Navbar";
//Branding
import Logo from "../assets/kiwihackslogo.png";
// Components
import Hero from "./components/Hero/Hero";
import BasicInfo from "./components/BasicInfo/BasicInfo";
import About from "./components/About/About";
import Swag from "./components/Swag/Swag";
import Prizes from "./components/Prizes/Prizes";
import FAQ from "./components/FAQ/FAQ";
import Partners from "./components/Partners/Partners";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";

//React being react
import { useEffect } from "react";

export default function App() {
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".faq-box");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />

      {/*<a
        className="date-change-chip"
        href="/date-change"
        aria-label="Learn more about the KiwiHacks date change"
      >
        <strong>DATE CHANGE</strong>
        <span className="date-change-main">
          May 2nd - 3rd, 2026 (was March 28th - 29th)
        </span>
        <span>
          We apologize for the inconvenience, but we are working hard to make
          this the best hackathon possible.
        </span>
        <span className="date-change-cta">Click to learn more</span>
      </a>
    */}

      <img
        className="logo"
        src={Logo}
        alt="KiwiHacks Kiwi Bird"
        fetchPriority="high"
        width="150"
        height="150"
        draggable="false"
      />

      <main>
        <Hero />

        <div className="button-container">
          <a
            className="nova-sign-up-link nova-big-button"
            href="https://nova.kiwihacks.org"
            target="_blank"
          >
            <b>Explore KiwiHacks Nova!</b>
          </a>
          {/* <a
          className="sign-up-link calendar-button"
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=KiwiHacks+2026&dates=20260320T210000Z/20260321T210000Z&details=Auckland%E2%80%99s+free+24hr+hackathon+for+teenage+coders+and+innovators.+Join+us+for+a+weekend+of+coding%2C+mentorship%2C+and+fun!&location=GridAKL+%2F+John+Lysaght+Building%2C+Auckland"
          target="_blank"
        >
          <b>Add to Calendar</b>
        </a> */}
        </div>

        <About />
        <FAQ />
        <Partners />
        <CTA />
      </main>
      <Footer />
      {/* <AnnouncementVideoPlayer {...announcementVideoConfig} /> */}
    </>
  );
}
