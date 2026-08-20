import "./About.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="text">
        <h2>About KiwiHacks</h2>
        <p className="about-text">
          KiwiHacks is New Zealand's first high school hackathon club, running
          hackathons for high school students 18 and under. Our events's are a
          chance to meet new people, learn some new skills, and build something
          you're actually proud of, whether that's an app, game, website, robot,
          or a chair that runs away from you.
        </p>
        <p className="about-text">
          KiwiHacks is run by high schoolers, for high schoolers, meaning every
          site (yes, even this one!), piece of art, event, and everything else
          was made by like-minded Kiwi high schoolers who are building a
          community of like-minded Kiwi high schoolers through KiwiHacks!
        </p>
        <p className="about-text">
          No matter your skill level, you're welcome. Just sign up, show up, and
          give it a go.
        </p>
      </div>
      <img
        className="example"
        src="/assets/example.jpg"
        alt="Students hacking at previous events"
        loading="lazy"
      />
    </section>
  );
}
