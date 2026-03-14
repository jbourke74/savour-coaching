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
const IMG_HERO   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-hero-JPvhuApR6ZprGZX7RzzUxy.webp";
const IMG_ABOUT  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-about-HGGsZNasfrcxBPaNcp7rnC.webp";
const IMG_NOURISH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-nourish-PFPGUejJB6VHG7Qan6L2Pt.webp";
const IMG_RETREAT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663350001830/3Hve5y7seecPiQhWVm867k/savour-retreat-MzWbMf3R7EVHKHtXuktry9.webp";

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
      href="#consultation"
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
              A deeply personal coaching partnership for women who are ready to move from managing food to a nourishing, satisfying life that truly fills them up.
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
              <p className="font-body text-base text-[oklch(0.32_0.06_135)] leading-relaxed font-medium">
                What if the answer isn't in controlling your food, but in nourishing your life?
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

      {/* ── DEEPER TRUTH ── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <Reveal className="lg:col-span-5 order-2 lg:order-1" delay={100}>
              <img
                src={IMG_RETREAT}
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
              A 1:1 coaching partnership designed to guide you home to yourself.
            </h2>
            <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed max-w-xl mb-16">
              This isn't another diet. It's a journey back to yourself — a chance to gather around the table of your own life and savour what you find there.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[oklch(0.97_0.005_75/0.15)]">
            {[
              { week: "Week 1", title: "Your Food Story", body: "We explore your unique eating personality, habits, and history with curiosity — not criticism. This is where your transformation begins." },
              { week: "Week 2", title: "Hunger & Fullness", body: "You'll learn to recognise and trust the signals your body sends — understanding the difference between physical hunger and emotional hunger." },
              { week: "Week 3", title: "Satisfaction & Permission", body: "We explore what true nourishment feels like, and begin to dismantle the rules that have kept you at war with food." },
              { week: "Week 4", title: "What Are You Really Hungry For?", body: "The heart of the work. We identify the deeper needs that food has been standing in for, and find more nourishing ways to meet them." },
              { week: "Weeks 5–6", title: "Your Nourishment Map", body: "We co-create your personalised Savour System — a set of tools and practices built around the five Savour Pillars." },
              { week: "For Life", title: "The Savour Pillars", body: "Care · Rest · Experiences · Pleasure · Peace. A compass for a life that truly nourishes you, to return to again and again." },
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
                  title="6 × Weekly 1:1 Coaching Sessions"
                  description="Consistent, personalised guidance to help you understand your habits, overcome challenges, and stay on track with your goals."
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
                    "You know you're using food to cope with stress, boredom, or exhaustion — and you're ready to find a more nourishing way.",
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
                    a: "I hear you. It's exhausting to feel like you've tried it all and nothing has worked. The Savour Method is different because it's not a one-size-fits-all approach. It's a personalised, high-touch coaching experience where we get to the root of your unique challenges with food — not just the symptoms.",
                  },
                  {
                    q: "Is this a diet programme?",
                    a: "Not at all. Savour is the opposite of a diet. We work from the inside out — understanding your relationship with food, your emotional patterns, and your deeper needs. There are no rules, no meal plans, and no forbidden foods. Just curiosity, compassion, and lasting change.",
                  },
                  {
                    q: "What happens after the 6 weeks?",
                    a: "The tools and practices you build during Savour are yours for life. There is no falling off the wagon or getting off track — this is a set of practices you can slowly build, integrate, and return to again and again to guide you through life.",
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
                The Savour Method is a 6-week, high-touch 1:1 coaching experience. This investment includes our weekly private sessions, your personalised Savour System, and dedicated support between our calls.
              </p>
              <p className="font-body text-base text-[oklch(0.80_0.010_75)] leading-relaxed mb-10 max-w-lg">
                It is an investment in your well-being, your peace of mind, and the joyful, energised life that is waiting for you. Payment plans are available.
              </p>
              <a
                href="mailto:hello@joannabourkelawlor.com"
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
                  {["6 × Weekly 1:1 Sessions", "Personalised Savour System", "In-Depth Food Story Exploration", "Practical Tools & Resources", "Unlimited Between-Session Support"].map((item, i) => (
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
