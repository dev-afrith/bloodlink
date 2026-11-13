import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Search,
  Siren,
  Droplet,
  ShieldCheck,
  Users,
  HandHeart,
  CheckCircle2,
  Building2,
  BookOpen,
  Star,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/donation-hero.jpg";
import { bloodGroups, education, stories } from "@/data/demo";
import { Reveal, SectionHeading, FinalCTA, TrustItem } from "./shared";
import { DonorSearch, Requests } from "./discovery";
import { RegistrationForm } from "./registration";
export function HowSteps() {
  return (
    <div className="how-grid">
      {[
        {
          number: "01",
          title: "Discover",
          icon: Search,
          text: "Find potential donors or explore blood bank information in your community.",
        },
        {
          number: "02",
          title: "Connect",
          icon: Link2,
          text: "Identify relevant contacts and understand the next steps with confidence.",
        },
        {
          number: "03",
          title: "Make an Impact",
          icon: Heart,
          text: "Coordinate through appropriate healthcare providers and authorised facilities.",
        },
      ].map((s) => (
        <div className="step" key={s.number}>
          <div className="step-number">{s.number}</div>
          <h3>
            <s.icon />
            {s.title}
          </h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}
export function Awareness() {
  const icons = [ShieldCheck, Droplet, Heart, BookOpen];
  return (
    <>
      <div className="awareness-grid">
        {education.map((e, i) => {
          const Icon = icons[i] || BookOpen;
          return (
            <details className="awareness-item" key={e.title}>
              <summary>
                <Icon />
                <h3>{e.title}</h3>
                <span>
                  Learn More <ArrowUpRight />
                </span>
              </summary>
              <p>{e.text}</p>
            </details>
          );
        })}
      </div>
      <p className="demo-notice">
        General awareness aligned with WHO voluntary donation guidance. Actual eligibility is
        determined by qualified medical personnel and applicable local guidelines.
      </p>
    </>
  );
}
function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1400, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);
  return <span ref={ref}>{count.toLocaleString("en-IN")}+</span>;
}
export function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-photo"
          src={hero}
          width={1536}
          height={1024}
          alt="A volunteer donating blood with a caring nurse at a bright modern clinic"
          fetchPriority="high"
        />
        <div className="container hero-content">
          <Reveal>
            <span className="hero-tag">
              <Heart size={12} /> A CONNECTION THAT COULD CHANGE EVERYTHING
            </span>
            <h1>
              One Drop Can Make
              <br />A{" "}
              <em>
                World of
                <br />
                Difference.
              </em>
            </h1>
            <p className="hero-copy">
              Connecting blood donors, hospitals, and communities to make lifesaving connections
              faster, simpler, and more accessible.
            </p>
            <div className="button-row">
              <Button asChild size="lg">
                <Link to="/find-donors">
                  <Search />
                  Find Blood Donors <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/become-a-donor">
                  <Heart />
                  Become a Donor
                </Link>
              </Button>
            </div>
            <div className="hero-trust">
              <TrustItem>Built Around Voluntary Donation</TrustItem>
              <TrustItem>Community Driven</TrustItem>
              <TrustItem>Every Connection Matters</TrustItem>
            </div>
            <div className="hero-proof">
              <div className="mini-avatars">
                <span>AR</span>
                <span>PM</span>
                <span>SK</span>
                <span>RD</span>
              </div>
              <p>
                <strong>Small acts. Extraordinary people.</strong>
                <br />A community connected by kindness.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="photo-label">
          <span>
            <Heart size={20} />
          </span>
          <div>
            <strong>Someone’s hope starts with you.</strong>
            <small>Every drop connects a life.</small>
          </div>
          <CheckCircle2 size={22} className="check-icon" />
        </div>
      </section>
      <div className="values-bar">
        <div className="container">
          <span>
            <ShieldCheck />
            Voluntary. Compassionate. Community-first.
          </span>
          <span>
            <Users />
            People helping people
          </span>
          <span>
            <Droplet />
            All blood groups welcome
          </span>
          <span>
            <HandHeart />
            Every connection matters
          </span>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="A LITTLE HELP GOES A LONG WAY"
              title="Where would you like to start?"
              description="Whether you’re looking for support or ready to give, you’re in the right place."
            />
            <div className="quick-grid">
              {[
                {
                  title: "Find a Donor",
                  text: "Discover potential donors based on blood group and location.",
                  icon: Search,
                  to: "/find-donors" as const,
                  cta: "Explore Donors",
                },
                {
                  title: "Urgent Blood Requests",
                  text: "Explore blood requirements shared by the community.",
                  icon: Siren,
                  to: "/requests" as const,
                  cta: "View Sample Requests",
                },
                {
                  title: "Register as a Donor",
                  text: "Become a voluntary donor and help make a difference.",
                  icon: Heart,
                  to: "/become-a-donor" as const,
                  cta: "Join the Community",
                },
              ].map((a) => (
                <article className="quick-card" key={a.title}>
                  <div className="quick-icon">
                    <a.icon size={22} />
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  <Button variant="link" asChild>
                    <Link to={a.to}>
                      {a.cta}
                      <ArrowUpRight />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section blood-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="DIFFERENT GROUPS. ONE SHARED PURPOSE."
              title="Every Blood Group Matters."
              description="Find your group. Find your connection. There’s a place for everyone."
            />
            <div className="group-grid">
              {bloodGroups.map((g) => (
                <Link className="group-card" key={g} to="/find-donors" search={{ group: g }}>
                  <span className="group-drop">
                    <Droplet />
                  </span>
                  <strong>{g}</strong>
                  <small>
                    Explore Donors <ArrowUpRight />
                  </small>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="FIND A CONNECTION"
              title="Find the Right Donor. When It Matters Most."
              description="Search for potential blood donors using your preferred blood group and location."
            >
              <Button asChild variant="link">
                <Link to="/find-donors">
                  View All Donors <ArrowUpRight />
                </Link>
              </Button>
            </SectionHeading>
            <DonorSearch compact />
          </Reveal>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="A MOMENT TO MAKE A DIFFERENCE"
              title="Your Help Could Make a Difference Today."
              description="Explore sample blood requirements and understand where support may be needed."
            >
              <Button variant="link" asChild>
                <Link to="/requests">
                  View All Requests <ArrowUpRight />
                </Link>
              </Button>
            </SectionHeading>
            <Requests compact />
          </Reveal>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="SIMPLE STEPS. MEANINGFUL CONNECTIONS."
              title="A little simpler. A lot more human."
              description="The path from willingness to making a difference starts with a connection."
            />
            <HowSteps />
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal>
            <RegistrationForm />
          </Reveal>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="A NETWORK OF CARE"
              title="Connecting You to Blood Bank Networks."
              description="Explore fictional blood bank listings and learn about the services donation centres can offer."
            >
              <Button asChild variant="outline">
                <Link to="/blood-banks">
                  <Building2 />
                  Explore the Directory <ArrowRight />
                </Link>
              </Button>
            </SectionHeading>
            <div className="how-grid">
              {["Whole Blood Donation", "Blood Components", "Community Donation Drives"].map(
                (t, i) => (
                  <div className="step" key={t}>
                    <div className="quick-icon">
                      {i === 0 ? <Droplet /> : i === 1 ? <Building2 /> : <Users />}
                    </div>
                    <h3>{t}</h3>
                    <p>
                      {
                        [
                          "Learn about voluntary whole blood donation at appropriate healthcare facilities.",
                          "Explore sample listings featuring plasma and platelet services.",
                          "Discover how community participation supports a sustainable blood supply.",
                        ][i]
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="AWARENESS IS THE FIRST STEP"
              title="Knowledge Saves Lives Too."
              description="A little clarity can turn uncertainty into the confidence to help."
            />
            <Awareness />
          </Reveal>
        </div>
      </section>
      <section className="impact">
        <div className="container">
          <div>
            <span className="eyebrow">
              <span />
              THE POWER OF COMING TOGETHER
            </span>
            <h2>
              Together, We Can
              <br />
              Make a Difference.
            </h2>
            <p className="impact-note">
              Illustrative prototype statistics. Not verified achievements.
            </p>
          </div>
          <div className="impact-grid">
            {[
              { value: 12500, label: "Registered Donors" },
              { value: 8200, label: "Donations Supported" },
              { value: 150, label: "Partner Locations" },
              { value: 25000, label: "Community Reach" },
            ].map((s) => (
              <div key={s.label}>
                <div className="impact-number">
                  <Count value={s.value} />
                </div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="THE PEOPLE BEHIND THE PURPOSE"
              title="Every Donor Has a Story."
              description="Different lives. A shared belief in showing up for someone else."
            />
            <div className="story-grid">
              {stories.map((s, i) => (
                <article className="story" key={s.name}>
                  <div className="stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, j) => (
                      <Star key={j} />
                    ))}
                  </div>
                  <blockquote>“{s.quote}”</blockquote>
                  <div className="story-person">
                    <span className={`avatar avatar-${i}`}>{s.name.slice(0, 1)}</span>
                    <div>
                      <strong>{s.name}</strong>
                      <p>{s.city} · Voluntary donor story</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="demo-notice">
              Fictional donor stories and illustrative ratings, created for this demonstration.
            </p>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
