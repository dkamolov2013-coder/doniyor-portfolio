import { useEffect, useRef, useState } from "react";

// ── Particles canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#00ffff", "#ff00ff", "#00ff00", "#ff0080"];
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      tabIndex={-1}
    />
  );
}

// ── Typing text hook ───────────────────────────────────────────────────────────
function useTyping(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { displayed, done };
}

// ── CountUp hook ───────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

// ── useInView hook ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Skill badge ────────────────────────────────────────────────────────────────
type SkillProps = {
  name: string;
  pct: number;
  color: string;
  glowClass: string;
  textClass: string;
  borderClass: string;
  index: number;
};

function SkillBadge({
  name,
  pct,
  color,
  textClass,
  borderClass,
  index,
}: SkillProps) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      data-ocid={`skills.item.${index + 1}`}
      className={`glass-card rounded-2xl p-5 flex flex-col gap-3 ${borderClass} transition-smooth hover:scale-105`}
      style={{
        animation: inView ? `slide-up 0.5s ease ${index * 0.1}s both` : "none",
      }}
    >
      <div className="flex items-center justify-between">
        <span className={`font-display font-bold text-lg ${textClass}`}>
          {name}
        </span>
        <span className={`font-mono text-sm font-semibold ${textClass}`}>
          {pct}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: inView ? `${pct}%` : "0%",
            background: color,
            boxShadow: `0 0 8px ${color}, 0 0 20px ${color}60`,
            transitionDelay: `${index * 0.12 + 0.3}s`,
          }}
        />
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
type StatProps = {
  value: number;
  suffix: string;
  label: string;
  color: string;
  glowClass: string;
  borderClass: string;
  index: number;
  active: boolean;
};

function StatCard({
  value,
  suffix,
  label,
  color,
  glowClass,
  borderClass,
  index,
  active,
}: StatProps) {
  const count = useCountUp(value, active);
  return (
    <div
      data-ocid={`stats.item.${index + 1}`}
      className={`glass-card rounded-2xl p-6 text-center ${borderClass} ${glowClass} transition-smooth hover:scale-105`}
      style={{
        animation: active ? `slide-up 0.5s ease ${index * 0.12}s both` : "none",
      }}
    >
      <div
        className="font-display font-black text-4xl"
        style={{ color, textShadow: `0 0 20px ${color}` }}
      >
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-foreground/60 font-body">{label}</div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function HomePage() {
  // Profile image
  const [profileSrc, setProfileSrc] = useState<string>("/assets/profile.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("doniyor_profile");
    if (saved) setProfileSrc(saved);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      localStorage.setItem("doniyor_profile", base64);
      setProfileSrc(base64);
    };
    reader.readAsDataURL(file);
  };

  // Typing hero text
  const { displayed: heroText, done: heroDone } = useTyping(
    "Salom, men Doniyor Kamolovman",
    70,
  );

  // Section reveal refs
  const { ref: aboutRef, inView: aboutVisible } = useInView();
  const { ref: skillsRef } = useInView();
  const { ref: mentorRef, inView: mentorVisible } = useInView();
  const { ref: statsRef, inView: statsVisible } = useInView();

  const skills: Omit<SkillProps, "index">[] = [
    {
      name: "HTML",
      pct: 75,
      color: "#ff6a00",
      glowClass: "neon-glow-pink",
      textClass: "neon-text-pink",
      borderClass: "neon-border-pink",
    },
    {
      name: "CSS",
      pct: 80,
      color: "#00ffff",
      glowClass: "neon-glow-cyan",
      textClass: "neon-text-cyan",
      borderClass: "neon-border-cyan",
    },
    {
      name: "JavaScript",
      pct: 65,
      color: "#ffe000",
      glowClass: "",
      textClass: "",
      borderClass: "neon-border-lime",
    },
    {
      name: "Python",
      pct: 40,
      color: "#4fc3f7",
      glowClass: "",
      textClass: "neon-text-cyan",
      borderClass: "neon-border-purple",
    },
  ];

  const stats: Array<{
    value: number;
    suffix: string;
    label: string;
    color: string;
    glowClass: string;
    borderClass: string;
  }> = [
    {
      value: 3,
      suffix: "+",
      label: "Loyihalar",
      color: "#00ffff",
      glowClass: "neon-glow-cyan",
      borderClass: "neon-border-cyan",
    },
    {
      value: 1,
      suffix: "+",
      label: "Yil Tajriba",
      color: "#ff00ff",
      glowClass: "neon-glow-purple",
      borderClass: "neon-border-purple",
    },
    {
      value: 12,
      suffix: "",
      label: "Yosh",
      color: "#00ff00",
      glowClass: "neon-glow-lime",
      borderClass: "neon-border-lime",
    },
  ];

  return (
    <div className="min-h-screen" data-ocid="home.page">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden cyber-grid"
        style={{
          background:
            "linear-gradient(135deg, #080812 0%, #0d0d24 50%, #080820 100%)",
        }}
      >
        <ParticleCanvas />

        {/* Ambient glow blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 70%)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,255,0.08) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: text */}
            <div
              className="flex-1 text-center lg:text-left"
              style={{ animation: "slide-up 0.8s ease both" }}
            >
              <div className="mb-4 inline-flex items-center gap-2 glass-card neon-border-cyan rounded-full px-4 py-1.5 text-sm font-mono">
                <span className="neon-text-cyan">{"</>"}</span>
                <span className="text-foreground/70">Frontend dasturchi</span>
              </div>

              <h1
                className="font-display font-black leading-none mb-6"
                style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
              >
                <span className="gradient-text typing-cursor block min-h-[1.2em]">
                  {heroText}
                  {!heroDone && (
                    <span
                      className="neon-text-cyan"
                      style={{
                        animation: "blink-cursor 0.75s step-end infinite",
                      }}
                    >
                      |
                    </span>
                  )}
                </span>
              </h1>

              <p
                className="neon-text-cyan font-display font-semibold text-lg mb-3"
                data-ocid="home.hero.subtitle"
              >
                Frontend dasturchisi | Kelajakdagi dasturiy ta'minot muhandisi
              </p>
              <p className="text-foreground/60 text-base mb-10 font-body">
                12 yoshli ishtiyoqli dasturchi 🚀 O'zbekiston, Toshkent
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/projects"
                  data-ocid="home.hero.projects_button"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-display font-semibold text-base transition-smooth cursor-pointer neon-border-cyan neon-glow-cyan"
                  style={{
                    background: "rgba(0,255,255,0.1)",
                    color: "#00ffff",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(0,255,255,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(0,255,255,0.1)";
                  }}
                >
                  <span>🚀</span> Loyihalarni ko'rish
                </a>
                <a
                  href="/contact"
                  data-ocid="home.hero.contact_button"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-display font-semibold text-base transition-smooth cursor-pointer neon-border-purple"
                  style={{
                    background: "rgba(255,0,255,0.08)",
                    color: "#ff00ff",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,0,255,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,0,255,0.08)";
                  }}
                >
                  <span>✉️</span> Men bilan bog'laning
                </a>
              </div>
            </div>

            {/* Right: profile */}
            <div
              className="flex flex-col items-center gap-5"
              style={{ animation: "fade-in 1s ease 0.4s both" }}
            >
              {/* Rotating ring */}
              <div className="relative" data-ocid="home.profile.card">
                <div
                  className="absolute inset-0 rounded-full neon-border-animated"
                  style={{ padding: "4px", zIndex: 0 }}
                />
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{
                    width: 180,
                    height: 180,
                    boxShadow:
                      "0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.2)",
                    border: "3px solid rgba(0,255,255,0.4)",
                    zIndex: 1,
                    animation: "float 4s ease-in-out infinite",
                  }}
                >
                  <img
                    src={profileSrc}
                    alt="Doniyor Kamolov profil rasmi"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/image-019dbfb6-bbcf-776e-b6a3-00c0bd9c89c2.png";
                    }}
                  />
                </div>
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: "0 0 0 2px rgba(0,255,255,0.3)",
                    animation: "pulse-neon 2s ease-in-out infinite",
                    zIndex: 0,
                  }}
                />
              </div>

              {/* Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="home.profile.file_input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="home.profile.upload_button"
                className="glass-card neon-border-cyan px-5 py-2 rounded-lg text-sm font-mono neon-text-cyan transition-smooth hover:scale-105 cursor-pointer"
              >
                📷 Rasm yuklash
              </button>

              {/* Floating tags */}
              <div className="flex gap-2 flex-wrap justify-center max-w-[200px]">
                {["HTML", "CSS", "JS"].map((tag) => (
                  <span
                    key={tag}
                    className="glass-card neon-border-lime px-3 py-1 rounded-full text-xs font-mono neon-text-lime"
                    style={{
                      animation: "float 3s ease-in-out infinite",
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40 text-xs font-mono"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <span>scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <section
        className="py-24 relative"
        style={{
          background: "linear-gradient(180deg, #080812 0%, #0a0a1a 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div ref={aboutRef}>
            <div
              className="text-center mb-12"
              style={{
                animation: aboutVisible ? "slide-down 0.6s ease both" : "none",
              }}
            >
              <h2
                className="font-display font-black text-4xl mb-3 gradient-text inline-block"
                data-ocid="about.section.title"
              >
                Men Haqimda
              </h2>
              <div
                className="mx-auto mt-2 h-1 w-24 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                  boxShadow: "0 0 10px #00ffff, 0 0 20px #ff00ff",
                }}
              />
            </div>

            <div
              className="max-w-2xl mx-auto glass-card neon-border-cyan rounded-3xl p-8 scanlines"
              style={{
                animation: aboutVisible
                  ? "slide-up 0.7s ease 0.2s both"
                  : "none",
              }}
              data-ocid="about.card"
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-4xl"
                  style={{ filter: "drop-shadow(0 0 10px #00ffff)" }}
                >
                  👨‍💻
                </span>
                <p className="text-foreground/80 font-body leading-relaxed text-base">
                  Men{" "}
                  <span className="neon-text-cyan font-semibold">
                    Doniyor Kamolov
                  </span>
                  , 12 yoshli frontend dasturchiман. Kodlash va loyihalar
                  yaratishni juda yaxshi ko'raman. Hozirda maktabning{" "}
                  <span className="neon-text-purple font-semibold">
                    6-sinfida
                  </span>{" "}
                  o'qiyman va dasturlashni mustaqil o'rganib kelaman. Kelajakda
                  katta dasturiy ta'minot muhandisi bo'lishni orzu qilaman! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        className="py-24 relative"
        style={{
          background: "linear-gradient(180deg, #0a0a1a 0%, #080818 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="font-display font-black text-4xl mb-3 inline-block"
              data-ocid="skills.section.title"
            >
              <span className="neon-text-lime">Ko'nikmalarim</span>
            </h2>
            <div
              className="mx-auto mt-2 h-1 w-24 rounded-full"
              style={{
                background: "linear-gradient(90deg, #00ff00, #00ffff)",
                boxShadow: "0 0 10px #00ff00, 0 0 20px #00ffff",
              }}
            />
          </div>

          <div
            ref={skillsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
            data-ocid="skills.list"
          >
            {skills.map((s, i) => (
              <SkillBadge key={s.name} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MENTOR ── */}
      <section
        className="py-24 relative"
        style={{
          background: "linear-gradient(180deg, #080818 0%, #0d0820 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div ref={mentorRef} className="max-w-xl mx-auto">
            <div
              className="glass-card neon-border-purple rounded-3xl p-8 text-center scanlines"
              style={{
                animation: mentorVisible ? "slide-up 0.7s ease both" : "none",
              }}
              data-ocid="mentor.card"
            >
              <div
                className="text-5xl mb-4 inline-block"
                style={{ filter: "drop-shadow(0 0 16px #ff00ff)" }}
              >
                🎓
              </div>
              <h2
                className="font-display font-black text-2xl mb-4 neon-text-purple"
                data-ocid="mentor.title"
              >
                Mening Ustozim
              </h2>
              <p className="text-foreground/80 font-body text-base mb-2">
                <span className="neon-text-cyan font-semibold">
                  Abror Avazov
                </span>{" "}
                tomonidan dasturlash asoslarini o'rganmoqdaman
              </p>
              <p className="text-foreground/50 text-sm font-body italic">
                "U mening birinchi va eng yaxshi o'qituvchim"
              </p>
              <div
                className="mt-5 h-0.5 w-20 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(90deg, #ff00ff, #00ffff)",
                  boxShadow: "0 0 8px #ff00ff",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CODING STATS ── */}
      <section
        className="py-24 relative"
        style={{
          background: "linear-gradient(180deg, #0d0820 0%, #080812 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="font-display font-black text-4xl mb-3 gradient-text inline-block"
              data-ocid="stats.section.title"
            >
              Statistika
            </h2>
            <div
              className="mx-auto mt-2 h-1 w-24 rounded-full"
              style={{
                background: "linear-gradient(90deg, #ff0080, #ff00ff)",
                boxShadow: "0 0 10px #ff0080",
              }}
            />
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
            data-ocid="stats.list"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} active={statsVisible} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
