import "./TeamPage.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../App/components/Footer/Footer";
import Team from "../App/components/Team/Team";

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <main className="team-page-main">
        <section className="team-page-intro" aria-labelledby="team-page-title">
          <h1 id="team-page-title" className="display">Team</h1>
          <p>
            Meet the student organisers behind KiwiHacks.
          </p>
        </section>

        <div className="team-page-team-section">
          <Team heading="" />
        </div>
      </main>

      <Footer />
    </>
  );
}
