import { motion } from "motion/react";
import { useState } from "react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Ism kiritish majburiy";
    if (!form.email.trim())
      newErrors.email = "Elektron pochta kiritish majburiy";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "To'g'ri elektron pochta manzil kiriting";
    if (!form.message.trim()) newErrors.message = "Xabar kiritish majburiy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      const existing: ContactMessage[] = JSON.parse(
        localStorage.getItem("contact_messages") || "[]",
      );
      const newMsg: ContactMessage = {
        id: Date.now().toString(),
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        timestamp: new Date().toISOString(),
      };
      existing.push(newMsg);
      localStorage.setItem("contact_messages", JSON.stringify(existing));
      console.log("Yangi xabar saqlandi:", newMsg);
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setSubmitted(true);
      setSubmitting(false);
    }, 800);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden"
      data-ocid="contact.page"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#00ffff]/5 blur-3xl" />
        <div className="absolute top-60 right-20 w-80 h-80 rounded-full bg-[#ff00ff]/5 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 rounded-full bg-[#00ff00]/4 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 gradient-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aloqa
          </h1>
          <p className="text-xl sm:text-2xl neon-text-cyan font-medium">
            Men bilan bog'laning
          </p>
          <div
            className="mt-4 h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#00ff00]"
            style={{ boxShadow: "0 0 10px #00ffff, 0 0 20px #ff00ff" }}
          />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card neon-border-cyan rounded-2xl p-6 sm:p-8 relative overflow-hidden scanlines">
              <h2
                className="text-2xl font-bold neon-text-cyan mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Xabar Yuboring
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                  data-ocid="contact.success_state"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-lg font-semibold neon-text-lime leading-relaxed">
                    Xabaringiz muvaffaqiyatli saqlandi!
                  </p>
                  <p className="text-foreground/70 text-base mt-1">
                    Tez orada javob beraman.
                  </p>
                  <button
                    type="button"
                    data-ocid="contact.send_another_button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 rounded-xl border border-[#00ffff]/40 neon-text-cyan text-sm transition-smooth hover:bg-[#00ffff]/10"
                  >
                    Yana xabar yuboring
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  data-ocid="contact.form"
                >
                  {/* Name */}
                  <div className="mb-5">
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Ism
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ismingizni kiriting"
                      data-ocid="contact.name_input"
                      className={[
                        "w-full px-4 py-3 rounded-xl bg-background/60 text-foreground placeholder-foreground/40",
                        "border transition-smooth outline-none font-mono text-sm",
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.4)]"
                          : "border-[#00ffff]/30 focus:border-[#00ffff] focus:shadow-[0_0_12px_rgba(0,255,255,0.35),0_0_4px_rgba(0,255,255,0.6)]",
                      ].join(" ")}
                    />
                    {errors.name && (
                      <p
                        data-ocid="contact.name_field_error"
                        className="mt-1 text-xs font-medium"
                        style={{
                          color: "#ff4444",
                          textShadow: "0 0 6px #ff4444",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Elektron pochta
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      data-ocid="contact.email_input"
                      className={[
                        "w-full px-4 py-3 rounded-xl bg-background/60 text-foreground placeholder-foreground/40",
                        "border transition-smooth outline-none font-mono text-sm",
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.4)]"
                          : "border-[#00ffff]/30 focus:border-[#00ffff] focus:shadow-[0_0_12px_rgba(0,255,255,0.35),0_0_4px_rgba(0,255,255,0.6)]",
                      ].join(" ")}
                    />
                    {errors.email && (
                      <p
                        data-ocid="contact.email_field_error"
                        className="mt-1 text-xs font-medium"
                        style={{
                          color: "#ff4444",
                          textShadow: "0 0 6px #ff4444",
                        }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Xabar
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Xabaringizni yozing..."
                      data-ocid="contact.message_textarea"
                      className={[
                        "w-full px-4 py-3 rounded-xl bg-background/60 text-foreground placeholder-foreground/40",
                        "border transition-smooth outline-none font-mono text-sm resize-none",
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.4)]"
                          : "border-[#00ffff]/30 focus:border-[#00ffff] focus:shadow-[0_0_12px_rgba(0,255,255,0.35),0_0_4px_rgba(0,255,255,0.6)]",
                      ].join(" ")}
                    />
                    {errors.message && (
                      <p
                        data-ocid="contact.message_field_error"
                        className="mt-1 text-xs font-medium"
                        style={{
                          color: "#ff4444",
                          textShadow: "0 0 6px #ff4444",
                        }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    data-ocid="contact.submit_button"
                    className={[
                      "w-full py-4 rounded-xl font-bold text-base transition-smooth",
                      "bg-gradient-to-r from-[#00ffff]/20 to-[#00ff00]/20",
                      "border border-[#00ffff]/60 neon-text-cyan",
                      "hover:bg-[#00ffff]/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.5),0_0_40px_rgba(0,255,255,0.2)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span
                          className="inline-block w-4 h-4 rounded-full border-2 border-[#00ffff]/40 border-t-[#00ffff]"
                          style={{ animation: "spin 0.8s linear infinite" }}
                        />
                        Saqlanmoqda...
                      </span>
                    ) : (
                      "Yuborish →"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Info cards */}
          <div className="flex flex-col gap-6">
            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="glass-card neon-border-purple rounded-2xl p-6 scanlines">
                <h3
                  className="text-lg font-bold neon-text-purple mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ijtimoiy Tarmoqlar
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://t.me/dasturchi0929"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.telegram_link"
                    className="flex items-center gap-4 p-3 rounded-xl border border-[#00ffff]/20 bg-background/30 transition-smooth group hover:border-[#00ffff]/60 hover:shadow-[0_0_14px_rgba(0,255,255,0.3)]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-smooth group-hover:shadow-[0_0_14px_rgba(0,255,255,0.6)] shrink-0"
                      style={{
                        background: "rgba(0,255,255,0.1)",
                        border: "1px solid rgba(0,255,255,0.3)",
                      }}
                    >
                      ✈️
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground/50 mb-0.5">
                        Telegram
                      </p>
                      <p className="font-semibold neon-text-cyan text-sm truncate">
                        @dasturchi0929
                      </p>
                    </div>
                    <span className="ml-auto text-foreground/30 group-hover:text-[#00ffff] transition-smooth text-sm shrink-0">
                      →
                    </span>
                  </a>

                  <a
                    href="https://www.instagram.com/kh.kamolov9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.instagram_link"
                    className="flex items-center gap-4 p-3 rounded-xl border border-[#ff00ff]/20 bg-background/30 transition-smooth group hover:border-[#ff00ff]/60 hover:shadow-[0_0_14px_rgba(255,0,255,0.3)]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-smooth group-hover:shadow-[0_0_14px_rgba(255,0,255,0.6)] shrink-0"
                      style={{
                        background: "rgba(255,0,255,0.1)",
                        border: "1px solid rgba(255,0,255,0.3)",
                      }}
                    >
                      📸
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground/50 mb-0.5">
                        Instagram
                      </p>
                      <p className="font-semibold neon-text-purple text-sm truncate">
                        kh.kamolov9
                      </p>
                    </div>
                    <span className="ml-auto text-foreground/30 group-hover:text-[#ff00ff] transition-smooth text-sm shrink-0">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <div className="glass-card neon-border-lime rounded-2xl p-6 scanlines">
                <h3
                  className="text-lg font-bold neon-text-lime mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ma'lumotlar
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: "📍",
                      label: "Manzil",
                      value: "O'zbekiston, Toshkent",
                    },
                    { icon: "🎂", label: "Yosh", value: "12 yosh (2013-yil)" },
                    {
                      icon: "💼",
                      label: "Holat",
                      value: "Loyihalarga ochiqman",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-background/30 border border-[#00ff00]/15"
                    >
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-foreground/50">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="glass-card neon-border-pink rounded-2xl p-6 scanlines">
                <h3
                  className="text-lg font-bold neon-text-pink mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Qachon bog'lanish mumkin?
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">
                  Har doim xabar yozishingiz mumkin! Odatda{" "}
                  <span className="neon-text-cyan font-semibold">24 soat</span>{" "}
                  ichida javob beraman.
                </p>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-background/30 border border-[#00ff00]/25">
                  <span
                    className="inline-block w-3 h-3 rounded-full bg-[#00ff00] shrink-0"
                    style={{
                      animation: "pulse-neon 2s ease-in-out infinite",
                      boxShadow: "0 0 8px #00ff00, 0 0 16px rgba(0,255,0,0.5)",
                    }}
                  />
                  <span className="text-sm font-semibold neon-text-lime">
                    Faol
                  </span>
                  <span className="text-xs text-foreground/50 ml-auto">
                    Hozir onlayn
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom neon quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div
            className="inline-block glass-card rounded-2xl px-8 py-6 neon-border-animated"
            data-ocid="contact.quote_section"
          >
            <p
              className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "Har bir kod satri — bu kelajakka qadam!"
            </p>
            <p className="mt-3 text-sm neon-text-cyan opacity-80">
              — Doniyor Kamolov
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
