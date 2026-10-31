import "./CodeOfConduct.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../App/components/Footer/Footer";

export default function CodeOfConduct() {
  return (
    <>
      <Navbar />

      <main className="coc-main">
        <section className="coc-card">
          <h1 className="coc-title mono">Code of Conduct</h1>
          <p className="coc-subtitle">
            KiwiHacks is dedicated to providing a safe, inclusive, and
            harassment-free experience for everyone.
          </p>

          <div className="coc-section">
            <h2 className="coc-heading mono">TLDR</h2>
            <ul className="coc-list">
              <li>Treat everyone with respect and kindness</li>
              <li>Be thoughtful in how you communicate</li>
              <li>Do not be destructive or inflammatory</li>
              <li>
                If you encounter an issue, please email: <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>
              </li>
            </ul>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Why have a Code of Conduct?</h2>
            <p className="coc-text">
              The KiwiHacks community includes people from many different backgrounds. 
              The organizers and contributors of KiwiHacks are committed to providing a friendly, safe, 
              and welcoming environment for everyone, regardless of age, disability, gender, nationality, 
              race, religion, sexuality, or similar personal characteristic.
            </p>
            <p className="coc-text">
              The first goal of this Code of Conduct is to establish a baseline standard of behavior so that 
              people with different social values and communication styles can communicate effectively, 
              productively, and respectfully.
            </p>
            <p className="coc-text">
              The second goal is to provide a mechanism for resolving conflicts in the community when they arise.
            </p>
            <p className="coc-text">
              The third goal is to ensure our community is welcoming to people from different backgrounds. 
              Diversity is critical for building a thriving hacker community, and KiwiHacks benefits 
              from participants with different perspectives and experiences.
            </p>
            <p className="coc-text">
              A healthy community must still allow for disagreement and debate. 
              This Code of Conduct is not intended to silence differing opinions, 
              but rather to ensure that discussions remain respectful and constructive.
            </p>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Where does the Code of Conduct apply?</h2>
            <p className="coc-text">
              If you participate in KiwiHacks in any way, you are expected to follow this Code of Conduct.
            </p>
            <p className="coc-text">
              Explicit enforcement applies to all official KiwiHacks spaces, including:
            </p>
            <ul className="coc-list">
              <li>The KiwiHacks hackathon event</li>
              <li>Any KiwiHacks online platforms (Discord, Slack, etc.)</li>
              <li>KiwiHacks GitHub repositories</li>
              <li>KiwiHacks workshops, meetups, and related events</li>
            </ul>
            <br />
            <p className="coc-text">
              Organizers, volunteers, mentors, and partners are expected to <strong>model this Code of Conduct at all times.</strong>
            </p>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Hacker Values</h2>
            <p className="coc-text">
              These are the values people in the KiwiHacks community should strive toward:
            </p>
            <h3 className="coc-subheading">Be friendly and welcoming</h3>
            <p className="coc-text">
              Be considerate of others. Remember that people have different communication 
              styles and that not everyone is using their native language.
            </p>
            <h3 className="coc-subheading">Be patient</h3>
            <p className="coc-text">
              Misunderstandings happen. Take time to clarify rather than assume bad intent.
            </p>
            <h3 className="coc-subheading">Be thoughtful</h3>
            <p className="coc-text">
              Productive communication requires effort. Consider how your words may be interpreted before sending them.
            </p>
            <p className="coc-text">
              Sometimes it is best not to comment at all.
            </p>
            <h3 className="coc-subheading">Be respectful</h3>
            <p className="coc-text">
              Respect differences of opinion and approach disagreements constructively.
            </p>
            <h3 className="coc-subheading">Be charitable</h3>
            <p className="coc-text">
              Assume good faith when interpreting others' ideas. Try to understand perspectives before disagreeing.
            </p>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Avoid destructive behavior</h2>
            <p className="coc-text">
              The following behaviors harm community discussions and should be avoided:
            </p>
            <ul className="coc-list">
              <li><strong>Derailing conversations</strong> - stay on topic. If you want to discuss something else, start a new conversation.</li>
              <li><strong>Unconstructive criticism</strong> - do not only criticize; suggest improvements.</li>
              <li><strong>Snarky or hostile comments</strong> - short, sarcastic, or dismissive remarks that add no value.</li>
              <li><strong>Unnecessarily inflammatory discussions</strong> about sensitive topics.</li>
              <li><strong>Microaggressions</strong> - subtle insults or dismissive remarks directed toward a person or group.</li>
            </ul>
            <br />
            <p className="coc-text">
              People are complex and misunderstandings happen. When conflict occurs:
            </p>
            <ul className="coc-list">
              <li>Try not to take offense where none was intended</li>
              <li>Avoid escalating arguments</li>
              <li>Give people the benefit of the doubt</li>
              <li>Work toward de-escalation and constructive discussion</li>
            </ul>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Unwelcome behavior</h2>
            <p className="coc-text">
              The following actions are not permitted in KiwiHacks spaces:
            </p>
            <ul className="coc-list">
              <li>Insulting, demeaning, hateful, or threatening remarks</li>
              <li>Discrimination based on age, nationality, race, disability, 
                gender identity or expression, sexuality, religion, or similar personal characteristics</li>
              <li>Bullying or harassment</li>
              <li>Unwelcome sexual attention or sexually explicit content</li>
              <li>Spam or disruptive advertising without permission from KiwiHacks organizers</li>
              <li>Fraud or misrepresentation related to KiwiHacks resources, funding, or prizes</li>
            </ul>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Moderation & Enforcement</h2>
            <p className="coc-text">
              Speech and actions have consequences. Unacceptable behavior will not be tolerated.
            </p>
            <p className="coc-text">
              If behavior violates this Code of Conduct:
            </p>
            <h3 className="coc-subheading">First offense</h3>
            <ul className="coc-list">
              <li>You may receive a warning from organizers or moderators.</li>
              <li>You may be asked to stop the behavior and apologize if appropriate.</li>
            </ul>
            <h3 className="coc-subheading">Second offense</h3>
            <ul className="coc-list">
              <li>You may be temporarily removed from event spaces or online communities.</li>
            </ul>
            <h3 className="coc-subheading">Third offense</h3>
            <ul className="coc-list">
              <li>You may be removed from the event or community entirely.</li>
            </ul>
            <br />
            <p className="coc-text">
              These guidelines are flexible. KiwiHacks organizers may take any action deemed necessary, 
              including immediate removal from an event or platform if the situation warrants it.
            </p>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Reporting an Issue</h2>
            <p className="coc-text">
              If you encounter a Code of Conduct 
              issue, <strong>do not attempt to handle it publicly</strong> or 
              escalate it through social media.
            </p>
            <p className="coc-text">
              Email: <a href="mailto:niko@kiwihacks.org">niko@kiwihacks.org</a>
            </p>
            <p className="coc-text">
              Reports will be handled confidentially by the KiwiHacks organizing team. We aim to respond within 48 hours.
            </p>
            <p className="coc-text">
              When reviewing a report, organizers may:
            </p>
            <ul className="coc-list">
              <li>Gather additional context</li>
              <li>Speak with involved parties</li>
              <li>Determine an appropriate response</li>
            </ul>
            <br />
            <p className="coc-text">
              Possible outcomes include:
            </p>
            <ul className="coc-list">
              <li>No action</li>
              <li>A request for apology</li>
              <li>A warning</li>
              <li>Temporary suspension from the event or community</li>
              <li>Permanent removal from KiwiHacks spaces</li>
            </ul>
            <br />
            <p className="coc-text">
              Our goal is always to resolve conflicts fairly and respectfully. 
              Permanent bans and severe measures are used only when necessary.
            </p>
          </div>

          <div className="coc-section">
            <h2 className="coc-heading mono">Acknowledgments</h2>
            <p className="coc-text">
              This Code of Conduct was <strong>adapted from the <a href="https://github.com/golang/go/commit/aa487e66f869785837275ee20441a53888a51bb2" target="_blank" rel="noopener noreferrer">Hack Club Code of Conduct</a></strong>, which itself 
              was <strong>adapted from the <a href="https://golang.org/conduct" target="_blank" rel="noopener noreferrer">Go Code of Conduct</a>.</strong>
            </p>
            <p className="coc-text">
              It is to be noted that many parts of Go's Code of Conduct are 
              adopted from the Code of Conduct documents of the <strong>Django, FreeBSD, and Rust projects</strong>.
            </p>
          </div>

          <div className="coc-cta-row">
            <a className="coc-primary-cta" href="/">
              <b>Back to Home</b>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
