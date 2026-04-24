import { SiInstagram, SiTelegram } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-neon-cyan/20 bg-card/80 glassmorphic">
      {/* Neon top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60" />
      <div className="absolute top-0 left-1/4 right-1/4 h-px blur-sm bg-neon-cyan opacity-40" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-foreground/60">
              © {year}{" "}
              <span className="neon-text-cyan font-semibold">
                Doniyor Kamolov
              </span>
              . Barcha huquqlar himoyalangan.
            </p>
            <p className="text-xs text-foreground/40 mt-1">
              Mentor: <span className="text-neon-purple/80">Abror Avazov</span>{" "}
              tomonidan o'rganilmoqda
            </p>
          </div>

          {/* Center: built with */}
          <div className="text-center">
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors duration-200"
            >
              Built with love using caffeine.ai
            </a>
          </div>

          {/* Right: socials */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-foreground/40 hidden sm:inline">
              Ijtimoiy tarmoqlar:
            </span>
            <a
              href="https://t.me/dasturchi0929"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram @dasturchi0929"
              data-ocid="footer.telegram_link"
              className="group flex items-center justify-center w-9 h-9 rounded-lg border border-foreground/10 bg-foreground/5 text-foreground/50 transition-all duration-300 hover:text-neon-cyan hover:border-neon-cyan/40 hover:shadow-neon-cyan-sm hover:bg-neon-cyan/5"
            >
              <SiTelegram size={16} />
            </a>
            <a
              href="https://www.instagram.com/kh.kamolov9/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram kh.kamolov9"
              data-ocid="footer.instagram_link"
              className="group flex items-center justify-center w-9 h-9 rounded-lg border border-foreground/10 bg-foreground/5 text-foreground/50 transition-all duration-300 hover:text-neon-pink hover:border-neon-pink/40 hover:shadow-neon-pink-sm hover:bg-neon-pink/5"
            >
              <SiInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
