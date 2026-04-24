import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

type NeonColor = "cyan" | "purple" | "lime" | "pink";

interface Service {
  icon: string;
  title: string;
  description: string;
  color: NeonColor;
  tags: string[];
}

const SERVICES: Service[] = [
  {
    icon: "💻",
    title: "Veb-ishlab chiqish",
    description:
      "Zamonaviy va chiroyli veb-saytlar yaratish. HTML, CSS va JavaScript yordamida responsive dizayn.",
    color: "cyan",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    icon: "🎨",
    title: "Frontend dizayni",
    description:
      "UI/UX tamoyillariga asoslangan zamonaviy interfeys yaratish. Glassmorphism va neon effektlar bilan.",
    color: "purple",
    tags: ["UI/UX", "Figma", "Animations"],
  },
  {
    icon: "🤖",
    title: "Telegram botlarini ishlab chiqish",
    description:
      "Python yordamida avtomatlashtirilgan Telegram botlar yaratish. Oddiy va foydali funksiyalar.",
    color: "lime",
    tags: ["Python", "Telegram API", "Automation"],
  },
  {
    icon: "📱",
    title: "Boshlang'ich ilovalarni ishlab chiqish",
    description:
      "Kichik va foydali veb-ilovalar yaratish. Sodda, lekin samarali yechimlar.",
    color: "pink",
    tags: ["Web Apps", "Responsive", "Fast"],
  },
];

const neonBorderClass: Record<NeonColor, string> = {
  cyan: "neon-border-cyan",
  purple: "neon-border-purple",
  lime: "neon-border-lime",
  pink: "neon-border-pink",
};

const neonTextClass: Record<NeonColor, string> = {
  cyan: "neon-text-cyan",
  purple: "neon-text-purple",
  lime: "neon-text-lime",
  pink: "neon-text-pink",
};

const neonBtnStyle: Record<NeonColor, React.CSSProperties> = {
  cyan: {
    border: "1px solid #00ffff",
    color: "#00ffff",
    boxShadow: "0 0 8px #00ffff, 0 0 16px rgba(0,255,255,0.3)",
  },
  purple: {
    border: "1px solid #ff00ff",
    color: "#ff00ff",
    boxShadow: "0 0 8px #ff00ff, 0 0 16px rgba(255,0,255,0.3)",
  },
  lime: {
    border: "1px solid #00ff00",
    color: "#00ff00",
    boxShadow: "0 0 8px #00ff00, 0 0 16px rgba(0,255,0,0.3)",
  },
  pink: {
    border: "1px solid #ff0080",
    color: "#ff0080",
    boxShadow: "0 0 8px #ff0080, 0 0 16px rgba(255,0,128,0.3)",
  },
};

const tagColorStyle: Record<NeonColor, React.CSSProperties> = {
  cyan: {
    color: "#00ffff",
    borderColor: "rgba(0,255,255,0.3)",
    background: "rgba(0,255,255,0.07)",
  },
  purple: {
    color: "#ff00ff",
    borderColor: "rgba(255,0,255,0.3)",
    background: "rgba(255,0,255,0.07)",
  },
  lime: {
    color: "#00ff00",
    borderColor: "rgba(0,255,0,0.3)",
    background: "rgba(0,255,0,0.07)",
  },
  pink: {
    color: "#ff0080",
    borderColor: "rgba(255,0,128,0.3)",
    background: "rgba(255,0,128,0.07)",
  },
};

function useScrollReveal() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, revealed } = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  const delayStyle: React.CSSProperties = {
    transitionDelay: `${index * 100}ms`,
    animationDelay: `${index * 120}ms`,
  };

  return (
    <div
      ref={ref}
      data-ocid={`services.card.${index + 1}`}
      className={[
        "glass-card rounded-2xl p-7 flex flex-col gap-4 transition-all duration-500 cursor-default relative overflow-hidden",
        neonBorderClass[service.color],
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        hovered ? "scale-[1.03]" : "scale-100",
      ].join(" ")}
      style={{
        ...(hovered
          ? {
              transform: "translateY(-6px) scale(1.02)",
              boxShadow:
                service.color === "cyan"
                  ? "0 0 24px #00ffff, 0 0 48px rgba(0,255,255,0.35), inset 0 0 20px rgba(0,255,255,0.08)"
                  : service.color === "purple"
                    ? "0 0 24px #ff00ff, 0 0 48px rgba(255,0,255,0.35), inset 0 0 20px rgba(255,0,255,0.08)"
                    : service.color === "lime"
                      ? "0 0 24px #00ff00, 0 0 48px rgba(0,255,0,0.35), inset 0 0 20px rgba(0,255,0,0.08)"
                      : "0 0 24px #ff0080, 0 0 48px rgba(255,0,128,0.35), inset 0 0 20px rgba(255,0,128,0.08)",
            }
          : {}),
        ...delayStyle,
        transition:
          "opacity 0.6s ease, transform 0.5s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines rounded-2xl opacity-40" />

      {/* Icon */}
      <div
        className="text-5xl leading-none select-none"
        style={{
          filter: hovered
            ? service.color === "cyan"
              ? "drop-shadow(0 0 12px #00ffff)"
              : service.color === "purple"
                ? "drop-shadow(0 0 12px #ff00ff)"
                : service.color === "lime"
                  ? "drop-shadow(0 0 12px #00ff00)"
                  : "drop-shadow(0 0 12px #ff0080)"
            : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className={`text-xl font-display font-bold leading-snug ${neonTextClass[service.color]}`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-foreground/70 text-sm leading-relaxed flex-1">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full border font-mono"
            style={tagColorStyle[service.color]}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        to="/contact"
        data-ocid={`services.detail_button.${index + 1}`}
        className="mt-1 w-full py-2 rounded-lg text-sm font-semibold font-display transition-smooth backdrop-blur-sm text-center block"
        style={{
          ...neonBtnStyle[service.color],
          background: "rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          const bg =
            service.color === "cyan"
              ? "rgba(0,255,255,0.12)"
              : service.color === "purple"
                ? "rgba(255,0,255,0.12)"
                : service.color === "lime"
                  ? "rgba(0,255,0,0.12)"
                  : "rgba(255,0,128,0.12)";
          el.style.background = bg;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background =
            "rgba(0,0,0,0.3)";
        }}
      >
        Batafsil →
      </Link>
    </div>
  );
}

function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      data-ocid="services.hero"
      className="relative py-20 px-6 text-center overflow-hidden cyber-grid"
    >
      {/* Decorative glow orbs */}
      <div
        className="absolute top-10 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative z-10 max-w-3xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[rgba(0,255,255,0.3)] bg-[rgba(0,255,255,0.05)]">
          <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
          <span className="text-xs font-mono neon-text-cyan tracking-widest uppercase">
            Professional Xizmatlar
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-display font-black tracking-tight mb-4">
          <span className="gradient-text">Xizmatlar</span>
        </h1>

        <p className="text-lg sm:text-xl text-foreground/60 font-body max-w-xl mx-auto">
          Professional veb-dasturlash xizmatlari
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#00ffff]" />
          <div
            className="w-2 h-2 rounded-full bg-[#00ffff]"
            style={{ boxShadow: "0 0 8px #00ffff" }}
          />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#ff00ff]" />
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section
      ref={ref}
      data-ocid="services.cta"
      className="py-20 px-6 text-center relative"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto glass-card neon-border-cyan rounded-3xl py-14 px-8">
        <div className="text-5xl mb-4 select-none">🚀</div>
        <h2 className="text-3xl sm:text-4xl font-display font-black mb-3 gradient-text">
          Loyiha boshlashga tayyormisiz?
        </h2>
        <p className="text-foreground/60 mb-8 text-base">
          Birgalikda ajoyib narsalar yaratamiz. Hoziroq bog'laning!
        </p>
        <Link
          to="/contact"
          data-ocid="services.cta_link"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-display font-bold text-base transition-smooth"
          style={{
            background: "rgba(0,255,255,0.1)",
            border: "1.5px solid #00ffff",
            color: "#00ffff",
            boxShadow:
              "0 0 16px rgba(0,255,255,0.4), 0 0 32px rgba(0,255,255,0.2)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(0,255,255,0.2)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 24px rgba(0,255,255,0.7), 0 0 48px rgba(0,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(0,255,255,0.1)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 16px rgba(0,255,255,0.4), 0 0 32px rgba(0,255,255,0.2)";
          }}
        >
          Men bilan bog'laning
          <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, rgba(8,8,20,0) 0%, rgba(0,255,255,0.02) 50%, rgba(8,8,20,0) 100%)",
      }}
      data-ocid="services.page"
    >
      <HeroSection />

      {/* Cards Grid */}
      <section
        data-ocid="services.grid"
        className="py-12 px-6 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
