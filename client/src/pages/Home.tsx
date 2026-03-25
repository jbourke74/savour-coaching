/*
 * SAVOUR — Sales Page (Updated March 2026)
 * Design: Organic Modernism — structured yet soft, editorial asymmetry, warm linen palette.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 * Copy: Joanna Bourke Lawlor — final approved version
 */

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trpc } from "@/lib/trpc";

// ─── Image URLs ───────────────────────────────────────────────────────────────
const IMG_HERO    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-hero-joanna_564b02d6.webp";
const IMG_ABOUT   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/joanna-headshot-real_d0d7d3dc.webp";
const IMG_NOURISH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/finca-daytime-table_b1ef51ce.webp";
const IMG_CTA     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/finca-dusk-gathering_a23b5407.webp";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.10 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Rule() {
  return <hr className="savour-rule my-0" />;
}

function CTAButton({ label = "Book a Call", className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href="https://tidycal.com/jbourke74/30-minute-discovery-call"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block font-body text-sm tracking-widest uppercase px-8 py-4 bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)] hover:bg-[oklch(0.26_0.06_135)] transition-colors duration-300 ${className}`}
    >
      {label}
    </a>
  );
}

// ─── Savour Ingredients SVG Diagram ──────────────────────────────────────────
function SavourIngredientsDiagram() {
  return (
    <div className="flex flex-col items-center py-10">
      <svg viewBox="0 0 500 500" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Petal gradients */}
          <radialGradient id="gradMind" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.08 155)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.72 0.08 155)" stopOpacity="0.20" />
          </radialGradient>
          <radialGradient id="gradBody" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.10 40)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.65 0.10 40)" stopOpacity="0.20" />
          </radialGradient>
          <radialGradient id="gradHeart" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.08 310)" stopOpacity="0.50" />
            <stop offset="100%" stopColor="oklch(0.72 0.08 310)" stopOpacity="0.18" />
          </radialGradient>
          <radialGradient id="gradSoul" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.08 240)" stopOpacity="0.50" />
            <stop offset="100%" stopColor="oklch(0.65 0.08 240)" stopOpacity="0.18" />
          </radialGradient>
          <radialGradient id="gradCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.97 0.010 75)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.90 0.015 75)" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Outer compass ring */}
        <circle cx="250" cy="250" r="220" fill="none" stroke="oklch(0.75 0.06 135 / 0.25)" strokeWidth="1" />
        <circle cx="250" cy="250" r="215" fill="none" stroke="oklch(0.75 0.06 135 / 0.12)" strokeWidth="0.5" />

        {/* Compass tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const isMajor = i % 6 === 0;
          const r1 = isMajor ? 205 : 210;
          const r2 = 220;
          return (
            <line
              key={i}
              x1={250 + r1 * Math.sin(angle)}
              y1={250 - r1 * Math.cos(angle)}
              x2={250 + r2 * Math.sin(angle)}
              y2={250 - r2 * Math.cos(angle)}
              stroke="oklch(0.60 0.06 135 / 0.35)"
              strokeWidth={isMajor ? 1.5 : 0.8}
            />
          );
        })}

        {/* Cardinal point circles */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={250 + 220 * Math.sin(rad)}
              cy={250 - 220 * Math.cos(rad)}
              r="5"
              fill="oklch(0.96 0.015 75)"
              stroke="oklch(0.60 0.06 135 / 0.40)"
              strokeWidth="1"
            />
          );
        })}

        {/* MIND petal — top (vertical ellipse) */}
        <ellipse cx="250" cy="175" rx="65" ry="105" fill="url(#gradMind)" />

        {/* BODY petal — right (horizontal ellipse) */}
        <ellipse cx="325" cy="250" rx="105" ry="65" fill="url(#gradBody)" />

        {/* HEART petal — left (horizontal ellipse) */}
        <ellipse cx="175" cy="250" rx="105" ry="65" fill="url(#gradHeart)" />

        {/* SOUL petal — bottom (vertical ellipse) */}
        <ellipse cx="250" cy="325" rx="65" ry="105" fill="url(#gradSoul)" />

        {/* Centre circle */}
        <circle cx="250" cy="250" r="62" fill="url(#gradCenter)" stroke="oklch(0.75 0.06 135 / 0.30)" strokeWidth="1" />
        <circle cx="250" cy="250" r="4" fill="oklch(0.60 0.06 135 / 0.50)" />

        {/* SAVOUR centre text */}
        <text x="250" y="246" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="13" letterSpacing="4" fill="oklch(0.32 0.06 135)" fontWeight="500">SAVOUR</text>

        {/* MIND label */}
        <text x="250" y="128" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="oklch(0.28 0.08 155)" fontWeight="600" fontStyle="italic">Mind</text>
        <text x="250" y="148" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9" fill="oklch(0.40 0.06 155)" letterSpacing="1">calm · ease · quiet</text>

        {/* BODY label */}
        <text x="390" y="246" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="oklch(0.35 0.10 40)" fontWeight="600" fontStyle="italic">Body</text>
        <text x="390" y="262" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fill="oklch(0.45 0.08 40)" letterSpacing="0.8">nourishment · rest · fuel</text>

        {/* HEART label */}
        <text x="110" y="246" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="oklch(0.38 0.08 310)" fontWeight="600" fontStyle="italic">Heart</text>
        <text x="110" y="262" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fill="oklch(0.45 0.06 310)" letterSpacing="0.8">confidence · freedom · ease</text>

        {/* SOUL label */}
        <text x="250" y="376" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill="oklch(0.32 0.08 240)" fontWeight="600" fontStyle="italic">Soul</text>
        <text x="250" y="394" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="9" fill="oklch(0.40 0.06 240)" letterSpacing="1">aliveness · connection · joy</text>
      </svg>
    </div>
  );
}

// ─── Hunger card ──────────────────────────────────────────────────────────────
function HungerCard({
  color,
  label,
  title,
  quote,
  intro,
  bullets,
}: {
  color: string;
  label: string;
  title: string;
  quote?: string;
  intro: string;
  bullets: string[];
}) {
  return (
    <div className={`border-l-4 ${color} pl-8 py-2`}>
      <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.55_0.02_65)] mb-1">{label}</p>
      <h3 className="font-display text-2xl md:text-3xl text-[oklch(0.18_0.01_65)] mb-3">{title}</h3>
      {quote && (
        <blockquote className="font-display text-base italic text-[oklch(0.40_0.02_65)] leading-relaxed mb-4 max-w-xl">
          "{quote}"
        </blockquote>
      )}
      <p className="font-body text-sm text-[oklch(0.40_0.02_65)] leading-relaxed mb-4 max-w-xl">{intro}</p>
      <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.55_0.02_65)] mb-3">This might look like:</p>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.10_75)] shrink-0" />
            <span className="font-body text-sm text-[oklch(0.40_0.02_65)] leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
// ─── Newsletter Section ───────────────────────────────────────────────────────
function NotifyMeSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribe = trpc.notify.subscribe.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email, interest: "both" });
  };

  return (
    <section className="py-20 md:py-28 bg-[oklch(0.98_0.010_75)]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">Newsletter</p>
            <h2 className="font-display text-3xl md:text-4xl text-[oklch(0.18_0.01_65)] leading-[1.15] mb-4">
              The Savour Series
            </h2>
            <p className="font-body text-base text-[oklch(0.50_0.02_65)] leading-relaxed mb-10 max-w-lg mx-auto">
              Join the newsletter for conversations about food, life, and what it means to truly nourish yourself. Retreat and workshop dates, new programme announcements, and the occasional recipe.
            </p>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div className="bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)] px-8 py-10 inline-block">
                <p className="font-display text-2xl italic mb-2">You're on the list.</p>
                <p className="font-body text-sm text-[oklch(0.80_0.010_75)]">Welcome to The Savour Series. I'll be in touch soon.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={80}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                <div className="flex gap-0 w-full max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 font-body text-sm px-5 py-4 bg-white border border-[oklch(0.32_0.06_135/0.20)] border-r-0 text-[oklch(0.18_0.01_65)] placeholder:text-[oklch(0.65_0.02_65)] focus:outline-none focus:border-[oklch(0.32_0.06_135/0.50)]"
                  />
                  <button
                    type="submit"
                    disabled={subscribe.isPending}
                    className="font-body text-xs tracking-widest uppercase px-6 py-4 bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)] hover:bg-[oklch(0.26_0.06_135)] transition-colors disabled:opacity-60 shrink-0"
                  >
                    {subscribe.isPending ? "Sending…" : "Subscribe"}
                  </button>
                </div>

                {subscribe.isError && (
                  <p className="font-body text-xs text-red-600">
                    {subscribe.error?.message || "Something went wrong. Please try again."}
                  </p>
                )}
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.96_0.015_75)] text-[oklch(0.18_0.01_65)]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.96_0.015_75/0.92)] backdrop-blur-sm border-b border-[oklch(0.32_0.06_135/0.08)]">
        <div className="container flex items-center justify-between h-16">
          <span className="font-display text-2xl text-[oklch(0.32_0.06_135)] tracking-wide">Savour</span>
          <CTAButton label="Book a Call" className="hidden md:inline-block py-2.5 px-6 text-xs" />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG_HERO})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.01_65/0.72)] via-[oklch(0.12_0.01_65/0.20)] to-transparent" />
        <div className="relative container pb-20 md:pb-28">
          <div className="max-w-2xl">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-[oklch(0.88_0.015_75)] mb-5 animate-fade-up">
              1:1 Coaching with Joanna Bourke Lawlor
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up animate-fade-up-delay-1">
              What are you<br />
              <em>really</em> hungry for?
            </h1>
            <p className="font-body text-base md:text-lg text-[oklch(0.90_0.010_75)] leading-relaxed max-w-lg mb-10 animate-fade-up animate-fade-up-delay-2">
              A 1:1 coaching partnership for women who want to feel at ease with food — and create a whole life that truly nourishes them.
            </p>
            <div className="animate-fade-up animate-fade-up-delay-3">
              <CTAButton label="Book a Call" />
            </div>
          </div>
        </div>
      </section>

      {/* ── OPENING NARRATIVE ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-7">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-8">What is Savour?</p>
              <p className="font-display text-3xl md:text-4xl text-[oklch(0.18_0.01_65)] leading-[1.3] mb-8">
                Our lives are driven by what we're hungry for.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-8">
                Growing up working in our family fast-food business in Dublin, going to cookery school, writing a food blog, catering for events and retreats, cooking and hosting at home — I've long been driven by hunger for great food, fun and adventures. Usually trying to combine all three.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-4">
                There are also kinds of hunger that food can't satisfy.
              </p>
              <p className="font-body text-lg text-[oklch(0.40_0.02_65)] leading-relaxed mb-2">
                The kind that asks for rest.
              </p>
              <p className="font-body text-lg text-[oklch(0.40_0.02_65)] leading-relaxed mb-2">
                For comfort.
              </p>
              <p className="font-body text-lg text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                For reward.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-8">
                And sometimes, it's hunger for something bigger in your life — a new job, a challenge or adventure, a relationship, a family.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                <strong className="text-[oklch(0.18_0.01_65)]">Savour</strong> is a 1:1 coaching partnership for women who want to feel at ease with food, and create a whole life that truly nourishes them — mind, body, heart and soul.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-8">
                Not through discipline or diets. And not by giving up on the part of you that wants to feel confident and energetic.
              </p>
              <p className="font-display text-2xl text-[oklch(0.32_0.06_135)] leading-relaxed italic">
                This is the middle way.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={150}>
              <div className="relative">
                <img
                  src={IMG_NOURISH}
                  alt="A nourishing seasonal meal"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />

              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ── PHOTO GALLERY STRIP ── */}
      <section className="py-0 overflow-hidden">
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {[
            { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-hero-joanna_564b02d6.webp", alt: "Evening dinner at Finca Buenvino" },
            { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/finca-daytime-table_b1ef51ce.webp", alt: "Daytime table at Finca Buenvino" },
            { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/finca-dusk-gathering_a23b5407.webp", alt: "Dusk gathering at Finca Buenvino" },
            { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/finca-pool-view_5cb7eb11.webp", alt: "Pool and valley view at Finca Buenvino" },
            { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/calm-kitchen-class_36b19f9b.webp", alt: "Calm Kitchen class, Dublin 2017" },
            { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/calm-kitchen-welcome_97a28247.jpeg", alt: "Welcome to the Calm Kitchen" },
            { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/calm-kitchen-shelves_007abc31.jpg", alt: "Calm Kitchen shelves with herbs and jars" },
          ].map((img, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: "clamp(260px, 28vw, 400px)", height: "clamp(320px, 35vw, 480px)" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <Rule />

      {/* ── IS THIS FOR YOU ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.98_0.010_75)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">Sound familiar?</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] mb-12 max-w-2xl leading-[1.15]">
              Savour is for you if…
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-0 border border-[oklch(0.32_0.06_135/0.12)]">
              {[
                "You've spent years trying to manage your eating through willpower, discipline, or being \"good\" — only to feel stuck in a cycle.",
                "You might feel like you know what to do… but life gets in the way and you can't quite do it.",
                "By the end of the day, you're depleted. You've given your time, energy, and attention to everyone else. Food has become the place you finally get to switch off.",
                "You find yourself at the fridge — not because you're physically hungry, but because you need relief or a moment to yourself.",
                "You want to feel better in your body — more at ease, more energised, more like yourself — but you don't want to go back to rigid rules or start over again.",
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start px-8 py-5 border-b border-[oklch(0.32_0.06_135/0.08)] last:border-0 bg-white hover:bg-[oklch(0.97_0.010_75)] transition-colors">
                  <span className="mt-1 font-display text-lg text-[oklch(0.72_0.10_75)] shrink-0 italic">—</span>
                  <p className="font-body text-base text-[oklch(0.32_0.02_65)] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="font-display text-xl md:text-2xl text-[oklch(0.25_0.02_65)] italic leading-relaxed mt-8 px-2">
              And underneath it all, there's a quiet sense that what you're really craving… might be more than food.
            </p>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ── DEEPER TRUTH ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <Reveal className="lg:col-span-5 order-2 lg:order-1" delay={100}>
              <img
                src={IMG_CTA}
                alt="Women gathered around a table"
                className="w-full object-cover"
                style={{ aspectRatio: "16/10" }}
              />
            </Reveal>
            <Reveal className="lg:col-span-7 order-1 lg:order-2">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-6">The deeper truth</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.15] mb-8">
                What's actually going on.
              </h2>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                The truth is, comfort eating isn't really about food — it's hunger that has nowhere else to go.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                This is why trying to be more disciplined, motivated, or "in control" rarely works for very long. And even when it does… it's not how you want to live.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                Because when our deeper needs go unmet for long enough, food can become the quickest and most reliable way to soothe, distract, or fill the gap. It actually makes sense — because something in you is trying to help.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-8">
                Food freedom doesn't come from being "good" with food. It comes from learning to understand and respond to your real hungers — with curiosity, compassion, and care. And from creating a life that nourishes you deeply, so that food no longer has to do that job alone.
              </p>
              <p className="font-body text-sm font-medium text-[oklch(0.32_0.06_135)] tracking-wide uppercase mb-8">
                This is the work we do in Savour.
              </p>
              <blockquote className="border-l-2 border-[oklch(0.72_0.10_75)] pl-6">
                <p className="font-display text-xl italic text-[oklch(0.18_0.01_65)] leading-relaxed mb-3">
                  "I want to be a fun, sexy woman at a party in a nice outfit, not giving a f*** about an unflattering photo that has just been taken. And I also want to be hungry. Being hungry is not only a huge part of my life and relationships, but a huge part of my personality. For me, the feeling of craving and then satiation and satisfaction is one of the gorgeous rhythms of daily life."
                </p>
                <cite className="font-body text-xs text-[oklch(0.50_0.02_65)] tracking-wide uppercase not-italic">— Dolly Alderton</cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── THE SAVOUR INGREDIENTS ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.98_0.010_75)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">The Savour Ingredients</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] mb-4 max-w-2xl leading-[1.15]">
              In Savour, we work with your four core hungers.
            </h2>
            <p className="font-body text-base text-[oklch(0.50_0.02_65)] leading-relaxed max-w-2xl mb-4">
              The deeper needs that shape your relationship with food, your body and your life — what emotional eating, comfort eating, or eating from boredom might be standing in for.
            </p>
            <p className="font-body text-base text-[oklch(0.50_0.02_65)] leading-relaxed max-w-2xl mb-16">
              Together, we explore what each of these looks like for you, and how to meet them in ways beyond food that feel realistic, sustainable, and genuinely satisfying.
            </p>
          </Reveal>

          {/* Diagram + hungers layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4" delay={80}>
              <SavourIngredientsDiagram />
              <p className="font-display text-center text-lg italic text-[oklch(0.50_0.02_65)] mt-2">
                Four hungers. One life. Fully nourished.
              </p>
            </Reveal>
            <div className="lg:col-span-8 space-y-12">
              <Reveal delay={100}>
                <HungerCard
                  color="border-[oklch(0.55_0.08_155)]"
                  label="Mind Hunger"
                  title="Calm & Ease"
                  intro="The hunger for calm, quiet, and relief from constant pressure. When this goes unmet, it can feel like your brain never switches off and your nervous system is always activated."
                  bullets={[
                    "Creating space in your day to pause and reconnect with yourself",
                    "Reducing the self-critical food and body noise of \"shoulds\"",
                    "Finding ways to feel calmer and more grounded in your everyday life",
                  ]}
                />
              </Reveal>
              <Reveal delay={120}>
                <HungerCard
                  color="border-[oklch(0.55_0.10_40)]"
                  label="Body Hunger"
                  title="Nourishment & Rest"
                  intro={`The hunger for physical energy, restoration, and being properly fuelled. This is not just about eating "well" — but actually feeling nourished and supported in your body.`}
                  bullets={[
                    "Learning to recognise different types of physical hunger",
                    "Eating what you love and feeling satisfied — not out of control, or that you've fallen off the wagon",
                    "Allowing yourself real rest — not just collapsing at the end of the day",
                  ]}
                />
              </Reveal>
              <Reveal delay={140}>
                <HungerCard
                  color="border-[oklch(0.55_0.08_310)]"
                  label="Heart Hunger"
                  title="Confidence & Freedom"
                  quote={`I want to be a fun, sexy woman at a party in a nice outfit, not giving a f*** about an unflattering photo that has just been taken.`}
                  intro="The hunger to feel good about your body, confident in your skin and free from the internal dialogue when getting dressed or in front of the mirror. The hunger that diets appeal to but never seem to satisfy. It's a hunger for freedom."
                  bullets={[
                    "Softening the way you speak to yourself, especially on the hard days",
                    "Feeling free to wear the summer clothes, get into the swimsuit, be in the photos",
                    "Being at ease in your body — not just tolerating it",
                  ]}
                />
              </Reveal>
              <Reveal delay={160}>
                <HungerCard
                  color="border-[oklch(0.50_0.08_240)]"
                  label="Soul Hunger"
                  title="Aliveness & Connection"
                  intro="The hunger for joy, connection, creativity, and a life that feels bigger than your to-do list — often the quietest hunger, but the one that changes everything when it's heard. The hunger to feel supported, understood, and cared for by others, and by yourself. This often gets pushed aside while you take care of everything (and everyone) else. In Savour, we gently turn some of that care back towards you."
                  bullets={[
                    "Noticing when you're running on empty, and responding with practical kindness instead of criticism",
                    "Asking for support instead of pushing through",
                    "Reconnecting with things that make you feel alive",
                    "Making space for creativity, curiosity, ambition or something new",
                    "Allowing yourself to want more from your life — and taking that seriously",
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── SAVOUR MAP ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">Your Savour Map</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.15] mb-8">
                A personalised guide to your nourished life.
              </h2>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                Together, we bring these insights into a specific and personalised Savour Map — a way of understanding what you're really hungry for, and how to meet those needs in your real, everyday life.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "No rigid plans.",
                  "No one-size-fits-all rules.",
                  "Just a way of living that actually nourishes you.",
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.10_75)] shrink-0" />
                    <p className="font-display text-xl italic text-[oklch(0.32_0.06_135)]">{item}</p>
                  </div>
                ))}
              </div>
              <blockquote className="bg-[oklch(0.32_0.06_135)] p-8 mt-8">
                <p className="font-display text-2xl italic text-white leading-relaxed mb-4">
                  "We don't want to eat hot fudge sundaes as much as we want our lives to be hot fudge sundaes."
                </p>
                <cite className="font-body text-xs text-[oklch(0.72_0.10_75)] tracking-widest uppercase not-italic">— Geneen Roth</cite>
              </blockquote>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={120}>
              <div className="bg-[oklch(0.98_0.010_75)] border border-[oklch(0.32_0.06_135/0.15)] p-10">
                <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-6">Your Savour Map includes</p>
                {[
                  { icon: "◎", title: "Your Hunger Voice profile", desc: "What it sounds like, what it asks for, and how you now respond to it." },
                  { icon: "◈", title: "Your nourishment practices", desc: "The specific, small things that keep you connected to what you actually need." },
                  { icon: "◇", title: "Your early warning signs", desc: "The signals that food is being asked to do too much — and what to do instead." },
                  { icon: "◉", title: "Your daily user manual", desc: "A practical, living guide built around your life, your priorities, your goals." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 py-4 border-b border-[oklch(0.32_0.06_135/0.10)] last:border-0">
                    <span className="font-display text-xl text-[oklch(0.72_0.10_75)] shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-body text-sm font-medium text-[oklch(0.18_0.01_65)] mb-1">{item.title}</p>
                      <p className="font-body text-xs text-[oklch(0.50_0.02_65)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">How the Savour Method works</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.97_0.005_75)] mb-4 max-w-2xl leading-[1.15]">
              Three months. Six sessions. One question.
            </h2>
            <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed max-w-xl mb-16">
              We'll work together over three months with six 1:1 Zoom calls, practical tools, and WhatsApp support between our sessions.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[oklch(0.97_0.005_75/0.12)]">
            {[
              {
                step: "Step 1",
                title: "Our Kickoff Session",
                body: "You'll complete your profile of habits, priorities and goals. We'll meet for our first call and start to create your Map. This is where we meet your Hunger Voice for the first time.",
              },
              {
                step: "Step 2",
                title: "Your Hungers & Goals",
                body: "During our calls, we dig into what's underneath your eating habits and what you're really hungry for. We experiment with new approaches, tools, and practices between sessions.",
              },
              {
                step: "Step 3",
                title: "Your Savour Map",
                body: "We create your personalised user manual — supporting your deeply-held goals and building the habits that help you become your healthiest, most well-resourced self.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} className="bg-[oklch(0.32_0.06_135)] p-10 border border-[oklch(0.97_0.005_75/0.10)]">
                <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-4">{item.step}</p>
                <h3 className="font-display text-2xl text-[oklch(0.97_0.005_75)] mb-4">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.75_0.010_75)] leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>

          {/* What's included bar */}
          <Reveal delay={100}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-[oklch(0.97_0.005_75/0.12)]">
              {[
                { icon: "◎", label: "6 × 1:1 Zoom Sessions", sub: "Private, unhurried, just the two of us" },
                { icon: "◈", label: "WhatsApp Support", sub: "Between sessions for the in-between moments" },
                { icon: "◇", label: "3 Months Together", sub: "Enough time for real, lasting change" },
                { icon: "◉", label: "Your Savour Map", sub: "A personalised guide you keep forever" },
              ].map((item, i) => (
                <div key={i} className="bg-[oklch(0.28_0.05_135)] p-6 border border-[oklch(0.97_0.005_75/0.08)]">
                  <span className="font-display text-2xl text-[oklch(0.72_0.10_75)] block mb-3">{item.icon}</span>
                  <p className="font-body text-sm font-medium text-[oklch(0.97_0.005_75)] mb-1">{item.label}</p>
                  <p className="font-body text-xs text-[oklch(0.70_0.010_75)] leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ── WHAT CHANGES ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">What changes in Savour</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] mb-6 max-w-2xl leading-[1.15]">
              This work is about feeling more at ease — in your body, in yourself, in your life.
            </h2>
            <p className="font-body text-base text-[oklch(0.50_0.02_65)] leading-relaxed max-w-2xl mb-16">
              As the different hungers in your life begin to be met, here's what you might start to notice:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                hunger: "Heart Hunger",
                color: "bg-[oklch(0.72_0.08_310/0.12)] border-[oklch(0.55_0.08_310/0.30)]",
                outcomes: [
                  "More energy to make choices you are proud of in your work, life and relationships — instead of pushing through or turning to food",
                  "You feel more supported and less alone, because you're letting yourself be seen and asking for what you need",
                ],
              },
              {
                hunger: "Body Hunger",
                color: "bg-[oklch(0.72_0.10_40/0.10)] border-[oklch(0.55_0.10_40/0.30)]",
                outcomes: [
                  "You eat, move and rest in ways that feel satisfying and steady — without swinging between restriction and overdoing it",
                  "You feel more at ease in your body, with more energy and less tension around food. You buy the dress.",
                ],
              },
              {
                hunger: "Mind Hunger",
                color: "bg-[oklch(0.72_0.08_155/0.10)] border-[oklch(0.55_0.08_155/0.30)]",
                outcomes: [
                  "Your brain feels quieter — less overthinking, fewer \"shoulds\", and more clarity in your choices",
                  "You're able to pause and check in with yourself, instead of reacting on autopilot",
                ],
              },
              {
                hunger: "Soul Hunger",
                color: "bg-[oklch(0.65_0.08_240/0.10)] border-[oklch(0.50_0.08_240/0.30)]",
                outcomes: [
                  "You start making space for things that light you up — not just getting through the day",
                  "Food becomes less of a focus, because your life is beginning to feel fuller in other ways",
                ],
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`border ${item.color} p-8 h-full`}>
                  <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.55_0.02_65)] mb-4">{item.hunger}</p>
                  <div className="space-y-4">
                    {item.outcomes.map((o, j) => (
                      <div key={j} className="flex gap-3 items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.10_75)] shrink-0" />
                        <p className="font-body text-sm text-[oklch(0.32_0.02_65)] leading-relaxed">{o}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-12 bg-[oklch(0.98_0.010_75)] border border-[oklch(0.32_0.06_135/0.15)] p-10 text-center">
              <p className="font-display text-2xl md:text-3xl italic text-[oklch(0.32_0.06_135)] leading-relaxed max-w-3xl mx-auto">
                Learning to understand your true hungers and meet your deeper needs is a profound gift to your future self. Imagine who you could be if you were well fed in all the ways?
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ── ABOUT ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.98_0.010_75)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-4">
              <img
                src={IMG_ABOUT}
                alt="Joanna Bourke Lawlor"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4" }}
              />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-6">About Joanna</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.15] mb-8">
                Hi, I'm Joanna!
              </h2>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                Following my hunger for food and adventure has guided many of my big life choices. Growing up working in the family fast-food business, Some Like It Hot, I loved cooking, browsing menus, eating out and all things food related.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                After reading Martha Beck's <em>Finding Your Own North Star</em>, I followed my curiosity straight into her Life Coach Training programme. The following year, I left my job in tech, moved home to Ireland from the US, and spent three months in the kitchens of Ballymaloe Cookery School.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                I said yes to everything that followed — building a catering and private chef business, travelling, cooking at coaching retreats run by friends I'd met at coach training. It was at those retreats, in the conversations around the table, that the seeds of Savour were planted.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                Savour grew out of real conversations with women at retreats — about food, about needs, about what they were really hungry for. I created Savour as a space to continue those conversations and support women in bringing their dreams to life.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-8">
                In 2026, I'm following my soul hunger — to create a programme that brings together my favourite things: food, adventure, hosting, and a life that feels like a long Sunday lunch with a full glass of your favourite drink. I live in Dublin with my husband. I was 42 and living with my cocker bichon, Marlo, when we met on Bumble and we married two years later. My twenties and thirties were full of adventure — moving countries, changing careers, online dating — and my forties are settling into being my happiest years yet.
              </p>

              {/* Credentials list */}
              <div className="mt-2 mb-8 border-t border-[oklch(0.32_0.06_135/0.12)] pt-8">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-5">Certifications &amp; Experience</p>
                <div className="space-y-2">
                  {[
                    { role: "Manager and Circle Facilitator at Meta", years: "2018 – 2026" },
                    { role: "Self-Belief Coach Academy", years: "2024" },
                    { role: "Intuitive Eating Counsellor", years: "2021" },
                    { role: "Retreat and Private Catering", years: "2015 – 2018" },
                    { role: "Calm Kitchen Cookery Class Host", years: "2017" },
                    { role: "Ballymaloe Cookery School", years: "2014" },
                    { role: "Martha Beck Life Coach Training", years: "2013" },
                    { role: "Manager at Google Ireland and US", years: "2007 – 2014" },
                    { role: "BBS in Business, MA in Globalisation — Dublin City University", years: "2006" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-4 py-2 border-b border-[oklch(0.32_0.06_135/0.08)] last:border-0">
                      <span className="font-body text-sm text-[oklch(0.32_0.02_65)] leading-relaxed">{item.role}</span>
                      <span className="font-body text-xs text-[oklch(0.60_0.02_65)] shrink-0 tabular-nums">{item.years}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── WAYS TO WORK TOGETHER ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.98_0.010_75)]">
        <div className="container">
          <Reveal className="max-w-3xl mb-6">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">The Savour Method in 2026</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.15] mb-6">
              This isn't about managing food.<br /><em>It's about enjoying it.</em>
            </h2>
            <p className="font-body text-base text-[oklch(0.50_0.02_65)] leading-relaxed">
              Wholly, fully, without the running commentary. The Savour Method is available in three ways this year — each one designed to bring you closer to a life that genuinely nourishes you, in the moment and every day.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[oklch(0.32_0.06_135/0.10)] mt-12">
            {/* 1:1 Coaching */}
            <Reveal delay={0} className="bg-[oklch(0.98_0.010_75)] flex flex-col overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-churros-notebook_501142ab.webp"
                  alt="Churros, hot chocolate and a notebook"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-4">1:1 Coaching</p>
                <h3 className="font-display text-2xl md:text-3xl text-[oklch(0.18_0.01_65)] mb-4 leading-snug">
                  The Savour Method
                </h3>
                <p className="font-body text-sm text-[oklch(0.50_0.02_65)] leading-relaxed mb-6 flex-1">
                  Three months of private 1:1 coaching.<br /><br />Six Zoom sessions, WhatsApp support, and your personalised Savour Map.
                </p>
                <div className="border-t border-[oklch(0.32_0.06_135/0.12)] pt-6">
                  <p className="font-body text-xs text-[oklch(0.55_0.02_65)] mb-1">From</p>
                  <p className="font-display text-3xl text-[oklch(0.32_0.06_135)]">€749</p>
                  <p className="font-body text-xs text-[oklch(0.60_0.02_65)] mt-1">or 3 × €275/month</p>
                </div>
              </div>
            </Reveal>

            {/* Retreats */}
            <Reveal delay={80} className="bg-[oklch(0.32_0.06_135)] flex flex-col overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/finca-pool-view_5cb7eb11.webp"
                  alt="Finca Buenvino pool and valley view, Andalucía"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-4">Retreat</p>
                <h3 className="font-display text-2xl md:text-3xl text-[oklch(0.97_0.005_75)] mb-4 leading-snug">
                  Write and Savour in Spain
                </h3>
                <p className="font-body text-sm text-[oklch(0.80_0.010_75)] leading-relaxed mb-6 flex-1">
                  A small-group retreat combining writing, conversation, and food — the real-life, in-the-moment experience of what it means to truly savour.
                </p>
                <div className="border-t border-[oklch(0.97_0.005_75/0.15)] pt-6 space-y-2">
                  <p className="font-body text-xs text-[oklch(0.72_0.10_75)] uppercase tracking-widest">29 August – 5 September 2026</p>
                   <p className="font-body text-xs text-[oklch(0.65_0.010_75)] italic">Finca Buenvino, Andalucía</p>
                   <p className="font-body text-xs text-[oklch(0.97_0.005_75)] tracking-widest uppercase font-semibold">Only 3 rooms available</p>
                  <a
                    href="https://write-it-down.co.uk/booking-form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 font-body text-xs tracking-[0.15em] uppercase border border-[oklch(0.97_0.005_75/0.5)] text-[oklch(0.97_0.005_75)] px-4 py-2 hover:bg-[oklch(0.97_0.005_75/0.1)] transition-colors"
                  >
                    Book your place
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Workshops */}
            <Reveal delay={160} className="bg-[oklch(0.98_0.010_75)] flex flex-col overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/calm-kitchen-class_36b19f9b.webp"
                  alt="Calm Kitchen cookery class, Dublin 2017"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-4">Workshops</p>
                <h3 className="font-display text-2xl md:text-3xl text-[oklch(0.18_0.01_65)] mb-4 leading-snug">
                  Savour Workshops
                </h3>
                <p className="font-body text-sm text-[oklch(0.50_0.02_65)] leading-relaxed mb-6 flex-1">
                  Let's get around a table! Online and in-person workshops across Ireland in 2026. A way to experience the Savour Method in a group setting — with food, conversation, and connection at the centre.
                </p>
                <div className="border-t border-[oklch(0.32_0.06_135/0.12)] pt-6">
                  <p className="font-body text-xs text-[oklch(0.55_0.02_65)] uppercase tracking-widest">Online and in-person dates in Ireland coming in 2026</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── NOTIFY ME ── */}
      <NotifyMeSection />

      <Rule />

      {/* ── KIND WORDS ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.98_0.010_75)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4 text-center">Kind Words</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.1] mb-16 text-center">
              What people say
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                quote: "Joanna Bourke isn't just a chef, she is a magician who uses food to deeply nourish her clients. Joanna prepared my retreat menu with love and care and delivered masterpieces at each meal. Thank you Joanna for being so amazing.",
                name: "Susan Hyatt",
                role: "Life Coach & Entrepreneur",
              },
              {
                quote: "Joanna Bourke is a powerful blend of talented chef, food artist, and warm-hearted therapist. If you ever have the opportunity to work with her, do it!",
                name: "Peg Kusner",
                role: "Peg Kusner Design",
              },
              {
                quote: "Thanks so much Joanna for the amazing food, excellent service and impeccable taste at our Monalea Yoga & Wellbeing Retreat — it wouldn't have been the magical weekend that it was without you!",
                name: "Gemma Deeney",
                role: "The Yoga Gym",
              },
              {
                quote: "Joanna catered my retreat in England for 16 women. She brought so much thought, attention and care to the whole experience — our Retreat participants fell in love with her JoFlow! Over the four days, Joanna played a vital role in ensuring everyone was nourished, cared for and able to enjoy food that loved them back. This meant they could relax into the deep and important work of the retreat. I can't recommend Jo enough.",
                name: "Sas Petherick",
                role: "Coach & Mentor",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white border border-[oklch(0.90_0.010_75)] p-8 h-full flex flex-col">
                  <span className="font-display text-5xl text-[oklch(0.72_0.10_75)] leading-none mb-4">&ldquo;</span>
                  <p className="font-display text-lg italic text-[oklch(0.28_0.02_65)] leading-relaxed flex-1 mb-6">{t.quote}</p>
                  <div className="border-t border-[oklch(0.90_0.010_75)] pt-4">
                    <p className="font-body text-sm font-medium text-[oklch(0.32_0.06_135)]">{t.name}</p>
                    <p className="font-body text-xs text-[oklch(0.55_0.02_65)] tracking-wide">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ── INVESTMENT / CTA ── */}
      <section id="investment" className="py-24 md:py-32 bg-[oklch(0.32_0.06_135)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">Early access · Founding clients</p>
              <h2 className="font-display text-4xl md:text-6xl text-[oklch(0.97_0.005_75)] leading-[1.1] mb-6">
                Ready to savour<br /><em>your life?</em>
              </h2>
              <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed mb-6 max-w-lg">
                The Savour Method is a 3-month, 1:1 coaching programme. Six private Zoom sessions, WhatsApp support between calls, and your personalised Savour Map to keep.
              </p>
              <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed mb-6 max-w-lg">
                I’m at the beginning of this journey, and I’d love to bring a small group of women with me. I’m offering early access to my first five founding clients at a special rate — as a thank-you for being part of shaping Savour from the start. Once these five spaces are filled, the price moves to €1,200.
              </p>
              <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed mb-10 max-w-lg">
                We'll start with a free 30-minute discovery call to make sure it's the right choice for you.
              </p>

              {/* Pricing */}
              <div className="mb-10 max-w-lg">
                {/* Single payment */}
                <div className="bg-[oklch(0.97_0.005_75/0.08)] border border-[oklch(0.72_0.10_75/0.60)] p-8 mb-4 relative">
                  <span className="absolute top-4 right-4 font-body text-xs tracking-widest uppercase bg-[oklch(0.72_0.10_75)] text-[oklch(0.18_0.01_65)] px-3 py-1">Founding rate · 5 spaces</span>
                  <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-2">Single payment</p>
                  <p className="font-display text-5xl text-[oklch(0.97_0.005_75)] mb-1">€749</p>
                  <p className="font-body text-sm text-[oklch(0.70_0.010_75)] mb-4">Pay once · save €76 on the payment plan</p>
                  <a
                    href="https://buy.stripe.com/14A9ASfXL1M20Sf0mj2Ji00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-body text-xs tracking-widest uppercase px-6 py-3 bg-[oklch(0.72_0.10_75)] text-[oklch(0.18_0.01_65)] hover:bg-[oklch(0.80_0.10_75)] transition-colors duration-300"
                  >
                    Pay in Full — €749
                  </a>
                </div>
                {/* Payment plan */}
                <div className="bg-[oklch(0.97_0.005_75/0.04)] border border-[oklch(0.97_0.005_75/0.18)] p-8 mb-6">
                  <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-2">Monthly plan</p>
                  <p className="font-display text-5xl text-[oklch(0.97_0.005_75)] mb-1">€275<span className="font-body text-lg text-[oklch(0.70_0.010_75)] font-normal">/month</span></p>
                  <p className="font-body text-sm text-[oklch(0.70_0.010_75)] mb-4">3 monthly payments · €825 total</p>
                  <a
                    href="https://buy.stripe.com/bJeaEW5j72Q6dF18SP2Ji01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-body text-xs tracking-widest uppercase px-6 py-3 border border-[oklch(0.97_0.005_75/0.40)] text-[oklch(0.85_0.010_75)] hover:border-[oklch(0.72_0.10_75)] hover:text-[oklch(0.97_0.005_75)] transition-colors duration-300"
                  >
                    Pay Monthly — €275/month
                  </a>
                </div>
                <p className="font-body text-xs text-[oklch(0.65_0.010_75)] italic">Price increases to €1,200 after the first five founding clients.</p>
              </div>

              <CTAButton
                label="Book a Call"
                className="bg-[oklch(0.72_0.10_75)] text-[oklch(0.18_0.01_65)] hover:bg-[oklch(0.80_0.10_75)]"
              />
            </Reveal>
            <Reveal className="lg:col-span-5" delay={150}>
              <div className="bg-[oklch(0.97_0.005_75/0.06)] border border-[oklch(0.97_0.005_75/0.15)] p-10">
                <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-6">What's included</p>
                {[
                  "6 × 1:1 Zoom Coaching Sessions",
                  "3 Months of Guided Support",
                  "WhatsApp Support Between Sessions",
                  "Your Hunger Voice Profile",
                  "Practical Tools & Resources",
                  "Your Savour Map — yours to keep",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-[oklch(0.97_0.005_75/0.08)] last:border-0">
                    <span className="text-[oklch(0.72_0.10_75)] text-xs shrink-0">✓</span>
                    <span className="font-body text-sm text-[oklch(0.85_0.010_75)]">{item}</span>
                  </div>
                ))}
                <div className="mt-8 pt-6 border-t border-[oklch(0.97_0.005_75/0.12)]">
                  <p className="font-display text-lg italic text-[oklch(0.90_0.010_75)] leading-relaxed">
                    "Food doesn't get fired. It gets reassigned — back to the job it was always meant to do."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 bg-[oklch(0.18_0.01_65)]">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl text-[oklch(0.97_0.005_75)] tracking-wide">Savour</span>
          <p className="font-body text-xs text-[oklch(0.50_0.02_65)] text-center">
            © {new Date().getFullYear()} Joanna Bourke Lawlor · Life Coach · Dublin, Ireland
          </p>
          <a
            href="https://www.instagram.com/joanna_bourke_lawlor/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] hover:text-[oklch(0.85_0.10_75)] transition-colors"
          >
            @joanna_bourke_lawlor
          </a>
        </div>
      </footer>

    </div>
  );
}
