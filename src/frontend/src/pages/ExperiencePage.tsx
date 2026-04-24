import { useEffect, useRef, useState } from "react";

interface Experience {
  period: string;
  title: string;
  description: string;
  icon: string;
  accent: "cyan" | "purple" | "lime" | "pink";
  side: "left" | "right";
}

const experiences: Experience[] = [
  {
    period: "2024 — Hozir",
    title: "Mustaqil Dasturlash",
    description:
      "O'z-o'zimni o'rgatish usuli bilan dasturlashni boshlash. HTML va CSS asoslarini o'rganish.",
    icon: "🚀",
    accent: "cyan",
    side: "left",
  },
  {
    period: "2024 — Hozir",
    title: "JavaScript va Python Mashq",
    description:
      "JavaScript va Python tillarida amaliy mashqlar va kichik loyihalar yaratish.",
    icon: "⚡",
    accent: "purple",
    side: "right",
  },
  {
    period: "2025 — Hozir",
    title: "VS Code Loyihalari",
    description:
      "VS Code muharririda professional loyihalar yaratish. Git va versiya boshqaruvini o'rganish.",
    icon: "💻",
    accent: "lime",
    side: "left",
  },
  {
    period: "2025 — Hozir",
    title: "Shaxsiy Veb-saytlar",
    description:
      "Responsive va zamonaviy shaxsiy veb-saytlar yaratish. Portfolyo loyihalarini yaratish.",
    icon: "🌐",
    accent: "pink",
    side: "right",
  },
];

const skills = [
  { name: "HTML", percent: 75, accent: "cyan" },
  { name: "CSS", percent: 80, accent: "purple" },
  { name: "JavaScript", percent: 65, accent: "lime" },
  { name: "Python", percent: 40, accent: "pink" },
] as const;

const accentStyles: Record<
  string,
  {
    neonText: string;
    neonBorder: string;
    neonGlow: string;
    bar: string;
    dot: string;
  }
> = {
  cyan: {
    neonText: "neon-text-cyan",
    neonBorder: "neon-border-cyan",
    neonGlow: "neon-glow-cyan",
    bar: "from-cyan-400 to-cyan-300",
    dot: "bg-cyan-400",
  },
  purple: {
    neonText: "neon-text-purple",
    neonBorder: "neon-border-purple",
    neonGlow: "neon-glow-purple",
    bar: "from-fuchsia-400 to-purple-400",
    dot: "bg-fuchsia-400",
  },
  lime: {
    neonText: "neon-text-lime",
    neonBorder: "neon-border-lime",
    neonGlow: "neon-glow-lime",
    bar: "from-lime-400 to-green-400",
    dot: "bg-lime-400",
  },
  pink: {
    neonText: "neon-text-pink",
    neonBorder: "neon-border-pink",
    neonGlow: "neon-glow-pink",
    bar: "from-pink-500 to-rose-400",
    dot: "bg-pink-500",
  },
};

const borderColors: Record<string, string> = {
  cyan: "border-l-cyan-400",
  purple: "border-l-fuchsia-400",
  lime: "border-l-lime-400",
  pink: "border-l-pink-500",
};

const glowBorders: Record<string, string> = {
  cyan: "hover:shadow-[0_0_24px_rgba(0,255,255,0.5),0_0_48px_rgba(0,255,255,0.2)]",
  purple:
    "hover:shadow-[0_0_24px_rgba(255,0,255,0.5),0_0_48px_rgba(255,0,255,0.2)]",
  lime: "hover:shadow-[0_0_24px_rgba(0,255,0,0.5),0_0_48px_rgba(0,255,0,0.2)]",
  pink: "hover:shadow-[0_0_24px_rgba(255,0,128,0.5),0_0_48px_rgba(255,0,128,0.2)]",
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function TimelineCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const { ref, visible } = useScrollReveal();
  const styles = accentStyles[exp.accent];
  const isLeft = exp.side === "left";

  return (
    <div
      ref={ref}
      data-ocid={`experience.item.${index + 1}`}
      className={[
        "relative flex w-full items-center justify-center mb-12 transition-all duration-700 ease-out",
        visible
          ? "opacity-100 translate-x-0"
          : isLeft
            ? "opacity-0 -translate-x-16"
            : "opacity-0 translate-x-16",
        isLeft ? "md:justify-start" : "md:justify-end",
      ].join(" ")}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Card — desktop: half width, offset; mobile: full width */}
      <div
        className={`relative w-full md:w-[45%] glass-card rounded-xl border-l-4 ${borderColors[exp.accent]} p-5 transition-all duration-300 cursor-default
          ${glowBorders[exp.accent]}`}
        style={{
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Period badge */}
        <span
          className={`inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full mb-3 bg-black/40 border border-white/10 ${styles.neonText}`}
        >
          {exp.period}
        </span>

        {/* Title row */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-2xl select-none"
            role="img"
            aria-label={exp.title}
          >
            {exp.icon}
          </span>
          <h3
            className={`font-display font-bold text-lg leading-tight ${styles.neonText}`}
          >
            {exp.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-sm leading-relaxed">
          {exp.description}
        </p>
      </div>

      {/* Timeline dot — centered on desktop */}
      <div
        className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center
          w-6 h-6 rounded-full ${styles.dot} ${styles.neonGlow}`}
        aria-hidden="true"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-background" />
      </div>
    </div>
  );
}

function SkillBar({
  name,
  percent,
  accent,
  index,
}: {
  name: string;
  percent: number;
  accent: string;
  index: number;
}) {
  const { ref, visible } = useScrollReveal();
  const styles = accentStyles[accent];

  return (
    <div
      ref={ref}
      data-ocid={`experience.skill.${index + 1}`}
      className="mb-6"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`font-mono font-semibold text-sm ${styles.neonText}`}>
          {name}
        </span>
        <span className={`font-mono text-sm ${styles.neonText}`}>
          {percent}%
        </span>
      </div>
      <div className="h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${styles.bar} transition-all duration-1000 ease-out`}
          style={{
            width: visible ? `${percent}%` : "0%",
            boxShadow: "0 0 12px currentColor, 0 0 24px currentColor",
            transitionDelay: `${index * 150 + 200}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen bg-background cyber-grid relative overflow-hidden"
      data-ocid="experience.page"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #ff00ff 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* ── Page Header ── */}
        <div
          ref={headerRef}
          data-ocid="experience.header"
          className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black mb-4 gradient-text">
            Tajriba
          </h1>
          <p className="text-foreground/60 text-lg font-body tracking-wide">
            Mening dasturlash sayohatim
          </p>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400 neon-glow-cyan" />
        </div>

        {/* ── Vertical Timeline ── */}
        <div className="relative" data-ocid="experience.timeline">
          {/* Center line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, #00ffff, #ff00ff, #00ff00, #ff0080)",
              boxShadow: "0 0 10px #00ffff, 0 0 20px rgba(0,255,255,0.3)",
            }}
            aria-hidden="true"
          />

          {experiences.map((exp, i) => (
            <TimelineCard key={exp.title} exp={exp} index={i} />
          ))}
        </div>

        {/* ── Skills Progress ── */}
        <div
          ref={skillsRef}
          data-ocid="experience.skills"
          className={`mt-20 transition-all duration-700 ${skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="glass-card rounded-2xl p-8 neon-border-cyan">
            {/* Section title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-2">
                Asosiy ko'nikmalar darajasi
              </h2>
              <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>

            <div className="max-w-2xl mx-auto">
              {skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percent={skill.percent}
                  accent={skill.accent}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
