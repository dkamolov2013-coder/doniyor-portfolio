const educationCards = [
  {
    id: "school",
    icon: "🏫",
    title: "Umumiy O'rta Maktab",
    borderClass: "neon-border-cyan",
    statusLabel: "Hozirda o'qiyapman",
    statusColor: "#00ff00",
    statusGlow: "0 0 8px #00ff00, 0 0 16px rgba(0,255,0,0.5)",
    details: "6-sinf o'quvchisi (2026-yil bitirish)",
    location: "O'zbekiston",
    extra: null,
  },
  {
    id: "programming",
    icon: "💻",
    title: "Dasturlash Ta'limi",
    borderClass: "neon-border-purple",
    statusLabel: "Davom etmoqda",
    statusColor: "#00ffff",
    statusGlow: "0 0 8px #00ffff, 0 0 16px rgba(0,255,255,0.5)",
    details: null,
    location: null,
    extra: "mentor",
  },
  {
    id: "online",
    icon: "🌐",
    title: "Onlayn Ta'lim",
    borderClass: "neon-border-lime",
    statusLabel: "Davom etmoqda",
    statusColor: "#00ff00",
    statusGlow: "0 0 8px #00ff00, 0 0 16px rgba(0,255,0,0.5)",
    details:
      "YouTube, documentatsiya va onlayn kurslar orqali mustaqil o'rganish",
    location: null,
    extra: "online",
  },
];

const skillBadges = [
  { label: "HTML", color: "#ff6600" },
  { label: "CSS", color: "#00ccff" },
  { label: "JavaScript", color: "#ffdd00" },
  { label: "Python", color: "#4caf50" },
];

const onlineResources = [
  { label: "YouTube Tutorials", icon: "▶" },
  { label: "MDN Web Docs", icon: "📖" },
  { label: "freeCodeCamp", icon: "🏕" },
];

const goals = [
  {
    id: "goal-frontend",
    icon: "🎯",
    text: "Professional Frontend Developer bo'lish",
    neonClass: "neon-text-cyan",
    delay: "0s",
  },
  {
    id: "goal-startup",
    icon: "🚀",
    text: "O'z startapimni yaratish",
    neonClass: "neon-text-purple",
    delay: "0.4s",
  },
  {
    id: "goal-international",
    icon: "🌍",
    text: "Xalqaro miqyosda ishlash",
    neonClass: "neon-text-lime",
    delay: "0.8s",
  },
];

const timeline = [
  { year: "2024", label: "HTML & CSS boshlandi", color: "#00ffff" },
  { year: "2025", label: "JavaScript & Python", color: "#ff00ff" },
  { year: "2026", label: "Ilk loyihalar", color: "#00ff00" },
  { year: "Kelajak", label: "Professional Dasturchi", color: "#ff0080" },
];

export default function EducationPage() {
  return (
    <div
      className="min-h-screen bg-background relative overflow-x-hidden"
      data-ocid="education.page"
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-80 right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ── PAGE HEADER ── */}
        <header className="text-center mb-16" data-ocid="education.section">
          <h1
            className="text-5xl sm:text-6xl font-display font-black gradient-text mb-4"
            style={{ lineHeight: 1.15 }}
          >
            Ta'lim
          </h1>
          <p className="text-lg text-foreground/60 font-body tracking-wide">
            Bilim va o'sish yo'lim
          </p>
          <div
            className="mt-4 mx-auto h-px w-32"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent)",
            }}
          />
        </header>

        {/* ── EDUCATION CARDS ── */}
        <section
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          data-ocid="education.list"
        >
          {educationCards.map((card, idx) => (
            <article
              key={card.id}
              className={`glass-card rounded-2xl p-6 flex flex-col gap-4 transition-smooth hover:-translate-y-1 ${card.borderClass}`}
              data-ocid={`education.card.${idx + 1}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0 select-none">
                  {card.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-display font-bold text-foreground/90 leading-tight">
                    {card.title}
                  </h2>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className="self-start text-xs font-mono font-semibold px-3 py-1 rounded-full"
                style={{
                  color: card.statusColor,
                  border: `1px solid ${card.statusColor}`,
                  boxShadow: card.statusGlow,
                  background: `${card.statusColor}14`,
                }}
              >
                ● {card.statusLabel}
              </span>

              {/* Card body */}
              {card.id === "school" && (
                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">{card.details}</p>
                  <div className="flex items-center gap-1 text-sm text-foreground/50">
                    <span>📍</span>
                    <span>{card.location}</span>
                  </div>
                </div>
              )}

              {card.id === "programming" && (
                <div className="space-y-3">
                  {/* Mentor highlight */}
                  <div
                    className="rounded-xl p-3"
                    style={{
                      background: "rgba(255,0,255,0.07)",
                      border: "1px solid rgba(255,0,255,0.2)",
                    }}
                  >
                    <p className="text-sm font-semibold neon-text-purple font-display">
                      Ustozim: Abror Avazov
                    </p>
                    <p className="text-xs text-foreground/55 mt-1">
                      U mening dasturlash sayohatimda ilk qo'llanmam bo'ldi
                    </p>
                  </div>
                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2">
                    {skillBadges.map((badge) => (
                      <span
                        key={badge.label}
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{
                          color: badge.color,
                          border: `1px solid ${badge.color}55`,
                          background: `${badge.color}18`,
                          boxShadow: `0 0 6px ${badge.color}55`,
                        }}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {card.id === "online" && (
                <div className="space-y-3">
                  <p className="text-sm text-foreground/65">{card.details}</p>
                  <div className="flex flex-col gap-1.5">
                    {onlineResources.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="text-base">{r.icon}</span>
                        <span className="text-foreground/70">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>

        {/* ── FUTURE GOALS ── */}
        <section className="mb-20" data-ocid="education.goals.section">
          <h2 className="text-3xl sm:text-4xl font-display font-black gradient-text text-center mb-10">
            Kelajakdagi Maqsadlarim
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {goals.map((goal, idx) => (
              <div
                key={goal.id}
                className="glass-card rounded-2xl p-6 flex flex-col items-center gap-4 text-center neon-border-animated transition-smooth"
                style={{
                  animation: "float 3s ease-in-out infinite",
                  animationDelay: goal.delay,
                }}
                data-ocid={`education.goal.${idx + 1}`}
              >
                <span className="text-4xl select-none">{goal.icon}</span>
                <p
                  className={`text-base font-display font-bold ${goal.neonClass} leading-snug`}
                >
                  {goal.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEARNING TIMELINE ── */}
        <section
          className="glass-card rounded-2xl p-8"
          data-ocid="education.timeline.section"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-black gradient-text text-center mb-10">
            O'rganish jarayonim
          </h2>

          {/* Horizontal timeline — desktop */}
          <div className="hidden sm:block relative">
            {/* track line */}
            <div
              className="absolute top-5 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, #00ffff, #ff00ff, #00ff00, #ff0080)",
                boxShadow: "0 0 8px rgba(0,255,255,0.5)",
              }}
            />

            <div className="grid grid-cols-4 gap-4 relative z-10">
              {timeline.map((item, idx) => (
                <div
                  key={item.year}
                  className="flex flex-col items-center gap-3"
                  data-ocid={`education.timeline.item.${idx + 1}`}
                >
                  {/* Neon dot */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                    style={{
                      background: `${item.color}22`,
                      border: `2px solid ${item.color}`,
                      boxShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}55`,
                      color: item.color,
                    }}
                  >
                    {idx + 1}
                  </div>

                  <div className="text-center">
                    <p
                      className="text-sm font-display font-black"
                      style={{
                        color: item.color,
                        textShadow: `0 0 8px ${item.color}`,
                      }}
                    >
                      {item.year}
                    </p>
                    <p className="text-xs text-foreground/60 mt-1 leading-tight">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical timeline — mobile */}
          <div className="sm:hidden flex flex-col gap-6">
            {timeline.map((item, idx) => (
              <div
                key={item.year}
                className="flex items-start gap-4"
                data-ocid={`education.timeline.mobile.item.${idx + 1}`}
              >
                {/* dot + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                    style={{
                      background: `${item.color}22`,
                      border: `2px solid ${item.color}`,
                      boxShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}55`,
                      color: item.color,
                    }}
                  >
                    {idx + 1}
                  </div>
                  {idx < timeline.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{
                        background: `linear-gradient(${item.color}, ${timeline[idx + 1].color})`,
                        minHeight: "2rem",
                      }}
                    />
                  )}
                </div>

                <div className="pb-4">
                  <p
                    className="text-sm font-display font-black"
                    style={{
                      color: item.color,
                      textShadow: `0 0 8px ${item.color}`,
                    }}
                  >
                    {item.year}
                  </p>
                  <p className="text-xs text-foreground/60 mt-0.5">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
