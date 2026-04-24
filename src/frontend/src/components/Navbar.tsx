import { useTheme } from "@/context/ThemeContext";
import { Link, useLocation } from "@tanstack/react-router";
import { Code2, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Bosh sahifa", to: "/" },
  { label: "Xizmatlar", to: "/services" },
  { label: "Tajriba", to: "/experience" },
  { label: "Loyihalar", to: "/projects" },
  { label: "Ta'lim", to: "/education" },
  { label: "Aloqa", to: "/contact" },
  { label: "Kodlash", to: "/coding-journey" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer when route changes
  if (prevPathname.current !== location.pathname) {
    prevPathname.current = location.pathname;
    setIsOpen(false);
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 glassmorphic shadow-glass-glow border-b border-neon-cyan/20"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="navbar.logo.link"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-neon-cyan/10 border border-neon-cyan/40 group-hover:neon-glow-cyan transition-all duration-300" />
            <Code2 size={18} className="text-neon-cyan relative z-10" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="neon-text-cyan">Doniyor</span>
            <span className="text-foreground">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Asosiy navigatsiya"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`navbar.${link.to.replace("/", "") || "home"}.link`}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 group ${
                isActive(link.to)
                  ? "text-neon-cyan"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                  isActive(link.to)
                    ? "w-4/5 bg-neon-cyan shadow-neon-cyan-sm"
                    : "w-0 group-hover:w-2/3 bg-foreground/40"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Yorug' mavzuga o'tish" : "Qorong'u mavzuga o'tish"
            }
            data-ocid="navbar.theme_toggle"
            className={`relative w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-300 ${
              isDark
                ? "border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan hover:neon-glow-cyan hover:border-neon-cyan/60"
                : "border-border bg-muted text-foreground hover:border-foreground/30"
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            aria-label="Menyuni ochish"
            aria-expanded={isOpen}
            data-ocid="navbar.hamburger_button"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan transition-all duration-300 hover:neon-glow-cyan"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          ref={drawerRef}
          className="lg:hidden animate-slide-down glassmorphic border-b border-neon-cyan/20 mt-1"
          data-ocid="navbar.mobile_menu"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`navbar.mobile.${link.to.replace("/", "") || "home"}.link`}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "neon-text-cyan bg-neon-cyan/5 border border-neon-cyan/20"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
