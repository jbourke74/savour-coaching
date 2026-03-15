/*
 * SAVOUR — Home / Sales Page
 * Design: Organic Modernism — structured yet soft, editorial asymmetry, warm linen palette.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 * Images: All CDN-hosted via webdev-static-assets
 */

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Image URLs ───────────────────────────────────────────────────────────────
const IMG_HERO   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-hero-v2-aqQ6MX77sfUDg33gAX6jMa.webp";
const IMG_ABOUT  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/joanna-headshot_007324b7.png";
const IMG_NOURISH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-nourish-v2-UASTqgU9vMwAoZHr3v3eap.webp";
const IMG_CTA    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-cta-v2-KsnawgavbFe2oQ3W8Ht7eM.webp";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Section wrapper with fade-up reveal ─────────────────────────────────────
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

// ─── Thin decorative rule ─────────────────────────────────────────────────────
function Rule() {
  return <hr className="savour-rule my-0" />;
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({ label = "Book Your Free Consultation", className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href="https://tidycal.com/jbourke74/30-minute-discovery-call" target="_blank" rel="noopener noreferrer"
      className={`inline-block font-body text-sm tracking-widest uppercase px-8 py-4 bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)] hover:bg-[oklch(0.26_0.06_135)] transition-colors duration-300 ${className}`}
    >
      {label}
    </a>
  );
}

// ─── Transformation table row ─────────────────────────────────────────────────
function TransformRow({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-[oklch(0.32_0.06_135/0.12)] last:border-0">
      <div className="py-5 px-6 md:border-r border-[oklch(0.32_0.06_135/0.12)] text-[oklch(0.50_0.02_65)] font-body text-sm leading-relaxed">
        {before}
      </div>
      <div className="py-5 px-6 text-[oklch(0.32_0.06_135)] font-body text-sm leading-relaxed font-medium">
        {after}
      </div>
    </div>
  );
}

// ─── Program pillar card ──────────────────────────────────────────────────────
function PillarCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="bg-[oklch(0.98_0.010_75)] p-8 border border-[oklch(0.88_0.015_75)] hover:border-[oklch(0.72_0.10_75)] transition-colors duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h4 className="font-display text-xl text-[oklch(0.32_0.06_135)] mb-3">{title}</h4>
      <p className="font-body text-sm text-[oklch(0.40_0.02_65)] leading-relaxed">{body}</p>
    </div>
  );
}

// ─── What's included row ──────────────────────────────────────────────────────
function IncludedRow({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-5 py-5 border-b border-[oklch(0.32_0.06_135/0.10)] last:border-0">
      <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-[oklch(0.72_0.10_75)] self-start mt-2" />
      <div>
        <p className="font-body font-medium text-[oklch(0.18_0.01_65)] mb-1">{title}</p>
        <p className="font-body text-sm text-[oklch(0.50_0.02_65)] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
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
        {/* Gradient overlay — image is light/warm so we use dark text on a light overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.01_65/0.70)] via-[oklch(0.12_0.01_65/0.20)] to-transparent" />
        <div className="relative container pb-20 md:pb-28">
          <div className="max-w-2xl">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-[oklch(0.88_0.015_75)] mb-5 animate-fade-up">
              1:1 Coaching with Joanna Bourke Lawlor
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up animate-fade-up-delay-1">
              Let's discover<br />
              <em>what you're really<br />hungry for.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-[oklch(0.90_0.010_75)] leading-relaxed max-w-lg mb-10 animate-fade-up animate-fade-up-delay-2">
              A deeply personal coaching partnership for women who are ready to move from managing food to a nourishing, satisfying life that truly fills you up.
            </p>
            <div className="animate-fade-up animate-fade-up-delay-3">
              <CTAButton label="Book Your Free Consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* ── OPENING NARRATIVE ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-7">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-8">Sound familiar?</p>
              <p className="font-display text-3xl md:text-4xl text-[oklch(0.18_0.01_65)] leading-[1.3] mb-8">
                It's the end of a long day. You've given everything to everyone else. And now, in the quiet of the evening, you find yourself in front of the fridge, looking for… <em>something.</em>
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                Not because you're hungry. But because you're craving a moment of peace, a small reward for making it through the day. A little relief from the relentless demands of a life that never quite slows down.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                You're not alone. And this isn't a failure of willpower. It's a sign of a deeper hunger — a hunger for rest, for ease, for a life that truly nourishes you.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                Here's what nobody says out loud: food has quietly taken on a second job. A third job. A whole portfolio of jobs it was never hired to do. And no matter how hard it works, it can't quite deliver.
              </p>
              <p className="font-body text-base text-[oklch(0.32_0.06_135)] leading-relaxed font-medium">
                What if the answer isn't in controlling your food — but in finally giving it a new job description?
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
                <div className="absolute -bottom-6 -left-6 bg-[oklch(0.72_0.10_75)] p-6 max-w-xs hidden md:block">
                  <p className="font-display text-lg italic text-[oklch(0.18_0.01_65)] leading-snug">
                    "I'd be shifting food from something that keeps me alive to something that fulfils and brings pleasure."
                  </p>
                  <p className="font-body text-xs text-[oklch(0.35_0.02_65)] mt-3 tracking-wide uppercase">— Survey Respondent</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── TRANSFORMATION TABLE ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.98_0.010_75)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">The transformation</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] mb-4 max-w-xl">
              From food chaos to a life that fills you up.
            </h2>
            <p className="font-body text-base text-[oklch(0.50_0.02_65)] mb-12 max-w-lg leading-relaxed">
              Imagine waking up tomorrow with a sense of ease around food. This isn't a fantasy — it's what happens when we learn to listen to what we're truly hungry for.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="border border-[oklch(0.32_0.06_135/0.15)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)]">
                <div className="py-4 px-6 font-body text-xs tracking-widest uppercase">Instead of this…</div>
                <div className="py-4 px-6 font-body text-xs tracking-widest uppercase md:border-l border-[oklch(0.97_0.005_75/0.15)]">Imagine this…</div>
              </div>
              <TransformRow
                before="Feeling tired, sluggish, and trapped in a cycle of sugar cravings and guilt."
                after="Sustained energy that carries you through your day with lightness and vitality."
              />
              <TransformRow
                before="Your mind is a constant battlefield of food rules, self-criticism, and second-guessing."
                after="A sense of mental freedom — space to pour your energy into your passions, your purpose, and the people you love."
              />
              <TransformRow
                before="You feel disconnected from your body, unsure of what it truly needs or wants."
                after="You are the expert on your own body, confidently nourishing it with foods that make you feel good."
              />
              <TransformRow
                before="Evenings end in mindless snacking and a familiar sense of regret."
                after="You have a toolkit of nourishing ways to unwind — and you can savour a treat without a shred of guilt."
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ── FOOD WORKING OVERTIME ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.15_0.03_65)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-6">The real problem</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.15] mb-8 max-w-3xl">
              Food has been working overtime.<br />
              <em className="text-[oklch(0.72_0.10_75)]">And it's exhausted. And so are you.</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4">
            <Reveal delay={100}>
              <p className="font-body text-base text-[oklch(0.75_0.010_75)] leading-relaxed mb-6">
                Think about how many jobs food has quietly taken on in your life. It comforts you when you're stressed. It relaxes you at the end of a hard day. It eases boredom, soothes tiredness, rewards your effort, and consoles you when things go wrong.
              </p>
              <p className="font-body text-base text-[oklch(0.75_0.010_75)] leading-relaxed mb-6">
                That's a lot of jobs for one thing to hold. No wonder the relationship feels complicated. No wonder you feel out of control around it. Food was never meant to carry all of that.
              </p>
              <p className="font-body text-base text-[oklch(0.75_0.010_75)] leading-relaxed">
                The answer isn't more willpower or a stricter plan. It's learning to meet those real needs — rest, comfort, ease, joy — in ways that actually work. So that food can step back and do what it does best.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="border border-[oklch(0.97_0.005_75/0.10)] p-8 mb-8">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-6">Food's current job description</p>
                <div className="space-y-3">
                  {[
                    "Comforter after a hard day",
                    "Relaxation tool when you can't switch off",
                    "Boredom buster on a slow evening",
                    "Energy substitute when you're running on empty",
                    "Stress reliever when everything feels too much",
                    "Reward for getting through the week",
                    "Consolation when things don't go to plan",
                  ].map((job, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[oklch(0.55_0.02_65)] text-sm mt-0.5">—</span>
                      <p className="font-body text-sm text-[oklch(0.65_0.010_75)] leading-relaxed line-through decoration-[oklch(0.72_0.10_75)/60]">{job}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-[oklch(0.72_0.10_75/0.40)] bg-[oklch(0.72_0.10_75/0.08)] p-8">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-6">Food's new job description</p>
                <div className="space-y-3">
                  {[
                    "Nourish your body with pleasure and ease",
                    "Satisfy your genuine hunger — and delight in it",
                    "Bring joy to the table, literally",
                    "Connect you to the people you love",
                  ].map((job, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[oklch(0.72_0.10_75)] text-sm mt-0.5">✓</span>
                      <p className="font-body text-sm text-white leading-relaxed">{job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY IT HASN'T WORKED BEFORE ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-6">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.32_0.06_135)] mb-6">Why it hasn't worked before</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.12_0.02_65)] leading-[1.15] mb-8">
                You didn't fail the diet.<br />
                <em>The diet failed to replace the worker.</em>
              </h2>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                Every time you've tried to eat less, cut back, or be more disciplined, you were essentially trying to make food redundant. And for a while, it works. Willpower holds. The rules feel manageable.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-6">
                But here's what nobody tells you: you made food redundant without hiring a replacement. The stress still came. The boredom still came. The tiredness, the loneliness, the need for comfort — all still came. And food, ever reliable, ever available, stepped straight back in.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-8">
                This is not a character flaw. It's a staffing problem. You can't downsize a department without a transition plan.
              </p>
              <blockquote className="border-l-4 border-[oklch(0.32_0.06_135)] pl-6 py-1">
                <p className="font-display text-xl italic text-[oklch(0.18_0.01_65)] leading-relaxed">
                  "Restriction is a redundancy notice with no severance package and no one hired to cover the role."
                </p>
              </blockquote>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={150}>
              <div className="space-y-4">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.55_0.02_65)] mb-6">The usual approach vs. the Savour approach</p>
                {[
                  {
                    usual: "Cut out the foods you turn to for comfort",
                    savour: "Understand what comfort you're actually craving — and find it",
                  },
                  {
                    usual: "Use willpower to resist evening snacking",
                    savour: "Create a wind-down ritual that genuinely relaxes you",
                  },
                  {
                    usual: "Track, restrict, and measure what you eat",
                    savour: "Learn to read your body's real signals — hunger, fullness, satisfaction",
                  },
                  {
                    usual: "Be more motivated and disciplined",
                    savour: "Build a life that doesn't constantly need food to cope with it",
                  },
                  {
                    usual: "Follow a plan someone else designed for you",
                    savour: "Design your own nourishment — one that fits your real life",
                  },
                ].map(({ usual, savour }, i) => (
                  <div key={i} className="grid grid-cols-2 border border-[oklch(0.88_0.010_75)] overflow-hidden">
                    <div className="p-5 bg-[oklch(0.96_0.005_65)] border-r border-[oklch(0.88_0.010_75)]">
                      <p className="font-body text-xs text-[oklch(0.55_0.02_65)] uppercase tracking-widest mb-2">Old way</p>
                      <p className="font-body text-sm text-[oklch(0.40_0.02_65)] leading-relaxed">{usual}</p>
                    </div>
                    <div className="p-5 bg-[oklch(0.32_0.06_135/0.06)]">
                      <p className="font-body text-xs text-[oklch(0.32_0.06_135)] uppercase tracking-widest mb-2">Savour way</p>
                      <p className="font-body text-sm text-[oklch(0.22_0.04_135)] leading-relaxed font-medium">{savour}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── FOOD AVATAR / PERFORMANCE REVIEW ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.97_0.015_75)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.32_0.06_135)] mb-4">A key part of the Savour Method</p>
            <h2 className="font-display text-5xl md:text-6xl text-[oklch(0.12_0.02_65)] leading-[1.05] mb-6 max-w-4xl">
              Meet your <em className="text-[oklch(0.32_0.06_135)]">Food Avatar.</em>
            </h2>
            <p className="font-body text-lg text-[oklch(0.35_0.02_65)] leading-relaxed max-w-2xl mb-16">
              One of the most powerful things we do together is give your food a name, a face, and a job description — then conduct an honest performance review. Because once you can see exactly what food is being asked to do, you can start to find better people for the job.
            </p>
          </Reveal>

          {/* Step cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20">
            {[
              {
                step: "01",
                title: "Name & Profile",
                desc: "We give your food avatar a name and a personality. Is it a frantic PA who never clocks off? A loyal but exhausted friend who's always on call? Naming it makes it real — and a little bit funny.",
                color: "bg-[oklch(0.32_0.06_135)]",
                textColor: "text-white",
                subColor: "text-[oklch(0.75_0.05_135)]",
              },
              {
                step: "02",
                title: "The Performance Review",
                desc: "We look at every job food is doing and rate how well it's actually performing. Spoiler: it's working incredibly hard and getting mediocre results. It's not food's fault — it was never trained for this.",
                color: "bg-[oklch(0.72_0.10_75)]",
                textColor: "text-[oklch(0.12_0.02_65)]",
                subColor: "text-[oklch(0.30_0.04_65)]",
              },
              {
                step: "03",
                title: "The Handover Plan",
                desc: "Together we find better candidates for each job. More sleep for tiredness. A walk or a call for stress. A hobby for boredom. A nap, a laugh, a friend — for all the things food was never really equipped to give you.",
                color: "bg-[oklch(0.12_0.02_65)]",
                textColor: "text-white",
                subColor: "text-[oklch(0.65_0.010_75)]",
              },
            ].map(({ step, title, desc, color, textColor, subColor }, i) => (
              <Reveal key={i} delay={i * 120} className="flex">
                <div className={`${color} p-10 flex flex-col justify-between flex-1`}>
                  <div>
                    <p className={`font-display text-7xl font-bold ${subColor} mb-6 leading-none`}>{step}</p>
                    <h3 className={`font-display text-2xl ${textColor} mb-4`}>{title}</h3>
                    <p className={`font-body text-sm ${subColor} leading-relaxed`}>{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Performance review table */}
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.32_0.06_135)] mb-6">A sample performance review</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="overflow-hidden border border-[oklch(0.85_0.010_75)]">
              {/* Header */}
              <div className="grid grid-cols-12 bg-[oklch(0.12_0.02_65)] text-white">
                <div className="col-span-4 py-4 px-6 font-body text-xs tracking-widest uppercase">Job title</div>
                <div className="col-span-3 py-4 px-6 font-body text-xs tracking-widest uppercase border-l border-white/10">Performance rating</div>
                <div className="col-span-5 py-4 px-6 font-body text-xs tracking-widest uppercase border-l border-white/10">Better candidate for the job</div>
              </div>
              {[
                { job: "Stress reliever", rating: 2, ratingLabel: "Poor", better: "Nervous system regulation — breathwork, a walk, a bath, a rant to a friend" },
                { job: "Comforter", rating: 3, ratingLabel: "Adequate", better: "Rest, connection, a hug, a good cry, a conversation that matters" },
                { job: "Boredom buster", rating: 2, ratingLabel: "Poor", better: "Something that genuinely excites you — a creative project, movement, a podcast, a plan" },
                { job: "Energy booster", rating: 2, ratingLabel: "Poor", better: "Sleep, rest, reducing your load, asking for help, saying no" },
                { job: "Reward", rating: 3, ratingLabel: "Adequate", better: "Pleasure that truly replenishes — time, freedom, fun, beauty, celebration" },
                { job: "Relaxation tool", rating: 2, ratingLabel: "Poor", better: "Transition rituals — a walk, music, changing clothes, a bath, screen-free time" },
              ].map(({ job, rating, ratingLabel, better }, i) => (
                <div key={i} className={`grid grid-cols-12 border-t border-[oklch(0.85_0.010_75)] ${
                  i % 2 === 0 ? "bg-white" : "bg-[oklch(0.98_0.008_75)]"
                }`}>
                  <div className="col-span-4 py-5 px-6">
                    <p className="font-body text-sm text-[oklch(0.18_0.01_65)] font-medium">{job}</p>
                  </div>
                  <div className="col-span-3 py-5 px-6 border-l border-[oklch(0.85_0.010_75)]">
                    <div className="flex items-center gap-2 mb-1">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} className={`text-base ${
                          star <= rating ? "text-[oklch(0.72_0.10_75)]" : "text-[oklch(0.85_0.010_75)]"
                        }`}>★</span>
                      ))}
                    </div>
                    <p className="font-body text-xs text-[oklch(0.55_0.02_65)] uppercase tracking-wide">{ratingLabel}</p>
                  </div>
                  <div className="col-span-5 py-5 px-6 border-l border-[oklch(0.85_0.010_75)]">
                    <p className="font-body text-sm text-[oklch(0.35_0.02_65)] leading-relaxed">{better}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Pull quote */}
          <Reveal delay={100}>
            <div className="mt-16 bg-[oklch(0.32_0.06_135)] p-10 md:p-14">
              <p className="font-display text-3xl md:text-4xl italic text-white leading-[1.3] max-w-3xl mb-6">
                "Food doesn't get fired. It gets reassigned. Back to the job it was always meant to do — nourish you, satisfy you, and bring you joy."
              </p>
              <p className="font-body text-xs text-[oklch(0.75_0.05_135)] tracking-widest uppercase">— The Savour Method</p>
            </div>
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
                Comfort eating isn't really about food.<br />
                <em>It's about hunger that has nowhere else to go.</em>
              </h2>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                This is why trying to be more disciplined, motivated, or restrictive rarely works for long — and even when it does, life feels a bit miserable.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                When our deeper needs go unmet for long enough, food becomes a quick and reliable way to soothe, distract, or fill the gap. Food freedom doesn't come from being "good" with food. It comes from learning to honour your real hungers.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-10">
                From understanding what truly fills you up — with curiosity and compassion rather than criticism. And from creating a life that nourishes you deeply.
              </p>
              <blockquote className="border-l-2 border-[oklch(0.72_0.10_75)] pl-6">
                <p className="font-display text-xl italic text-[oklch(0.18_0.01_65)] leading-relaxed mb-3">
                  "I want to be a fun, sexy woman at a party in a nice outfit, not giving a f*** about an unflattering photo. And I also want to be hungry. Being hungry is a huge part of my personality — the feeling of craving and then satiation is one of the gorgeous rhythms of daily life."
                </p>
                <cite className="font-body text-xs text-[oklch(0.50_0.02_65)] tracking-wide uppercase not-italic">— Dolly Alderton</cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── THE METHOD ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)]">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">The Savour Method</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.97_0.005_75)] mb-4 max-w-2xl leading-[1.15]">
              A 6-month 1:1 coaching partnership designed to guide you home to yourself.
            </h2>
            <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed max-w-xl mb-16">
              Eight sessions. Six months. Five pillars. One life that truly nourishes you. This isn't another diet — it's a journey back to yourself, structured around the things that actually fill you up.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[oklch(0.97_0.005_75/0.15)]">
            {[
              { week: "Month 1", title: "Foundation & Food Story", body: "We begin by exploring your unique relationship with food — your history, your habits, your patterns — with curiosity and compassion. We introduce the Food Avatar and conduct your first Performance Review." },
              { week: "Month 2 · Pillar 1", title: "Care", body: "What does it mean to truly care for yourself? We explore self-nourishment beyond food — how you rest, how you speak to yourself, and how you begin to meet your own needs with kindness." },
              { week: "Month 3 · Pillar 2", title: "Rest", body: "Rest is not laziness — it's a biological need. We look at sleep, recovery, and the art of doing less. We find better candidates for the jobs food has been doing in the name of tiredness and depletion." },
              { week: "Month 4 · Pillar 3", title: "Experiences", body: "Boredom and emptiness are often at the root of emotional eating. This month we design a life rich in experiences — things that excite, engage, and genuinely fill you up." },
              { week: "Month 5 · Pillar 4", title: "Pleasure", body: "Pleasure is not a reward — it's a right. We reclaim joy, fun, and sensory delight in your life, so that food can return to being one source of pleasure among many." },
              { week: "Month 6 · Pillar 5", title: "Peace", body: "We bring it all together. Your personalised Savour System — a Nourishment Map built around your five pillars — becomes your compass for life. Peace with food. Peace with yourself." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60} className="bg-[oklch(0.32_0.06_135)] p-8 border border-[oklch(0.97_0.005_75/0.10)]">
                <p className="font-body text-xs tracking-widest uppercase text-[oklch(0.72_0.10_75)] mb-3">{item.week}</p>
                <h3 className="font-display text-xl text-[oklch(0.97_0.005_75)] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[oklch(0.75_0.010_75)] leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <Reveal className="lg:col-span-5">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">What's included</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.15] mb-6">
                Everything you need to create lasting change.
              </h2>
              <p className="font-body text-base text-[oklch(0.50_0.02_65)] leading-relaxed">
                This is a high-touch, supportive container where you will be seen, heard, and guided every step of the way. This is your time. This is your transformation.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={100}>
              <div>
                <IncludedRow
                  title="8 × 1:1 Coaching Sessions"
                  description="Eight private sessions spread across six months — consistent, personalised guidance to help you understand your habits, overcome challenges, and integrate lasting change at a pace that suits your real life."
                />
                <IncludedRow
                  title="A Personalised Savour System"
                  description="We'll co-create a unique nourishment map built around the Savour Pillars — Care, Rest, Experiences, Pleasure, Peace — that fits your real life."
                />
                <IncludedRow
                  title="In-Depth Exploration of Your Food Story"
                  description="We'll gently unpack your history with food to understand the roots of your current patterns and begin to heal them."
                />
                <IncludedRow
                  title="Practical Tools & Resources"
                  description="You'll learn to identify your hunger types, understand your eater personality, and regulate your nervous system for lasting change."
                />
                <IncludedRow
                  title="Unlimited Support Between Sessions"
                  description="Access to me via a private messaging app for those moments when you need a little extra guidance or encouragement."
                />
              </div>
            </Reveal>
          </div>
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
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-6">Meet your guide</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.15] mb-8">
                Hi, I'm Joanna.
              </h2>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                My own North Star has led me on a winding and wonderful path — from a career in tech that took me from Dublin to California, to the kitchens of Ballymaloe Cookery School, and finally, to the heart-centred work of coaching.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                For years, I understood the feeling of being at war with food. I was stuck in a cycle of striving and restriction, only to find myself exhausted and reaching for a quick fix at the end of the day. It was through my own exploration of intuitive eating and compassionate self-care that I finally found peace.
              </p>
              <p className="font-body text-base text-[oklch(0.40_0.02_65)] leading-relaxed mb-5">
                I discovered that the magic doesn't happen when we control our food, but when we gather around the table of our own lives with curiosity and love.
              </p>
              <p className="font-body text-base text-[oklch(0.32_0.06_135)] leading-relaxed font-medium mb-10">
                I created Savour to help you do the same. I'm not here to give you a new set of rules. I'm here to help you tune into your own wisdom.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-body">
                <span className="px-4 py-2 border border-[oklch(0.32_0.06_135/0.25)] text-[oklch(0.32_0.06_135)]">Ballymaloe Trained</span>
                <span className="px-4 py-2 border border-[oklch(0.32_0.06_135/0.25)] text-[oklch(0.32_0.06_135)]">Martha Beck Life Coach</span>
                <span className="px-4 py-2 border border-[oklch(0.32_0.06_135/0.25)] text-[oklch(0.32_0.06_135)]">Intuitive Eating Coach</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── IS THIS FOR YOU ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <Reveal>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">Is this for you?</p>
            <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] mb-12 max-w-xl leading-[1.15]">
              Savour is for you if…
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0}>
              <div className="bg-[oklch(0.32_0.06_135)] p-10 h-full">
                <h3 className="font-display text-2xl text-[oklch(0.97_0.005_75)] mb-6">This is for you</h3>
                <div className="space-y-4">
                  {[
                    "You're tired of the constant mental battle with food and ready for a more compassionate approach.",
                    "You want more energy, more confidence in your body, and to finally let go of the guilt that follows you around.",
                    "You can see that food has been working overtime in your life — doing jobs it was never meant to do — and you're ready to give it a new, simpler role.",
                    "You're ready to invest time and energy to create a truly healthy and sustainable relationship with food, for life.",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="mt-1 text-[oklch(0.72_0.10_75)] font-body text-base shrink-0">✓</span>
                      <p className="font-body text-sm text-[oklch(0.85_0.010_75)] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-[oklch(0.93_0.012_75)] p-10 h-full">
                <h3 className="font-display text-2xl text-[oklch(0.40_0.02_65)] mb-6">This is probably not for you</h3>
                <div className="space-y-4">
                  {[
                    "You're looking for a quick-fix diet or a rigid meal plan.",
                    "You're not ready to explore the emotional side of your eating habits with curiosity and kindness.",
                    "You're not willing to be patient and compassionate with yourself as you learn and grow.",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="mt-1 text-[oklch(0.50_0.02_65)] font-body text-base shrink-0">—</span>
                      <p className="font-body text-sm text-[oklch(0.50_0.02_65)] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32 bg-[oklch(0.98_0.010_75)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <Reveal className="lg:col-span-4">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">Questions</p>
              <h2 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.15]">
                Frequently asked questions.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "I feel like I have no willpower, especially in the evenings. Can this help?",
                    a: "Absolutely. What you're experiencing is not a failure of willpower, but a completely normal response to a lack of true nourishment and rest. In The Savour Method, we don't rely on willpower. Instead, we work on building a foundation of self-care and emotional resilience that makes the evenings feel easier and more peaceful.",
                  },
                  {
                    q: "I'm so busy. I don't have time to cook elaborate healthy meals. Will this work for me?",
                    a: "Yes! Many of the women I work with are juggling demanding careers, families, and a million other things. This program is not about adding more to your plate. It's about finding simple, sustainable ways to nourish yourself that fit into your real life.",
                  },
                  {
                    q: "I've tried everything. How do I know this will be any different?",
                    a: "I hear you. It's exhausting to feel like you've tried it all and nothing has worked. Here's why most approaches fail: they try to make food redundant without hiring a replacement. They remove the comfort, the reward, the stress relief — but leave the underlying need completely unmet. The Savour Method is different because we work on the handover plan, not just the resignation letter.",
                  },
                  {
                    q: "Is this a diet programme?",
                    a: "Not at all. Savour is the opposite of a diet. We work from the inside out — understanding your relationship with food, your emotional patterns, and your deeper needs. There are no rules, no meal plans, and no forbidden foods. Just curiosity, compassion, and lasting change.",
                  },
                  {
                    q: "What happens after the 6 months?",
                    a: "The tools and practices you build during Savour are yours for life. By the end of the programme you'll have a personalised Nourishment Map — a set of practices built around your five Savour Pillars — that you can return to again and again. There is no falling off the wagon. This is a compass, not a plan.",
                  },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-[oklch(0.32_0.06_135/0.12)]">
                    <AccordionTrigger className="font-body text-base text-[oklch(0.18_0.01_65)] text-left py-5 hover:no-underline hover:text-[oklch(0.32_0.06_135)]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-[oklch(0.50_0.02_65)] leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      <Rule />

      {/* ── INVESTMENT / CTA ── */}
      <section id="consultation" className="py-24 md:py-32 bg-[oklch(0.32_0.06_135)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">Your investment</p>
              <h2 className="font-display text-4xl md:text-6xl text-[oklch(0.97_0.005_75)] leading-[1.1] mb-6">
                Ready to savour<br /><em>your life?</em>
              </h2>
              <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed mb-6 max-w-lg">
                The Savour Method is a 6-month, high-touch 1:1 coaching experience. Eight private sessions, structured around the five Savour Pillars, with worksheets to deepen the work between calls and WhatsApp support so you're never navigating the journey alone.
              </p>
              <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed mb-6 max-w-lg">
                It is an investment in your well-being, your peace of mind, and the joyful, energised life that is waiting for you. Payment plans are available.
              </p>
              <p className="font-body text-base text-[oklch(0.72_0.10_75)] leading-relaxed mb-10 max-w-lg italic font-display text-lg">
                Food doesn't get fired. It gets reassigned — back to the job it was always meant to do.
              </p>
              <a
                href="https://tidycal.com/jbourke74/30-minute-discovery-call" target="_blank" rel="noopener noreferrer"
                className="inline-block font-body text-sm tracking-widest uppercase px-8 py-4 bg-[oklch(0.72_0.10_75)] text-[oklch(0.18_0.01_65)] hover:bg-[oklch(0.80_0.10_75)] transition-colors duration-300"
              >
                Book Your Free Consultation
              </a>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={150}>
              <div className="bg-[oklch(0.97_0.005_75/0.06)] border border-[oklch(0.97_0.005_75/0.15)] p-10">
                <p className="font-display text-2xl italic text-[oklch(0.97_0.005_75)] mb-6 leading-snug">
                  "Where you're guided by a deep self-trust instead of an app, knowing what you need in the moment and feeding yourself for replenishment and satisfaction."
                </p>
                <p className="font-body text-xs text-[oklch(0.72_0.10_75)] tracking-widest uppercase">The Savour Promise</p>
                <div className="mt-8 pt-8 border-t border-[oklch(0.97_0.005_75/0.15)]">
                  <p className="font-body text-xs text-[oklch(0.65_0.010_75)] mb-2 uppercase tracking-widest">What's included</p>
                  {["8 × 1:1 Coaching Sessions", "6 Months of Guided Support", "Worksheets for Each Pillar", "Food Avatar & Performance Review", "WhatsApp Support Between Sessions", "Personalised Nourishment Map"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-[oklch(0.97_0.005_75/0.08)] last:border-0">
                      <span className="text-[oklch(0.72_0.10_75)] text-xs">✓</span>
                      <span className="font-body text-sm text-[oklch(0.85_0.010_75)]">{item}</span>
                    </div>
                  ))}
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
            © {new Date().getFullYear()} Joanna Bourke Lawlor · Intuitive Eating Coach · Ireland
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
