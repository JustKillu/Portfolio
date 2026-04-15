import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import ThemeToggle from "./components/ThemeToggle";

const sections = [
  { id: "hero", color: "sky", type: "dot" },
  { id: "skills", color: "red", type: "dot" },
  { id: "projects", color: "purple", type: "dot" },
  { id: "footer", color: "gradient", type: "line" },
];

const colorMap = {
  sky: "bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]",
  red: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
  purple: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
};

const LanguageSwitch = ({ isDark }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="fixed top-6 left-10 z-100 flex gap-2">
      <button
        onClick={() => i18n.changeLanguage(currentLang === "es" ? "en" : "es")}
        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md border transition-all duration-300 ${
          isDark 
            ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white" 
            : "border-black/10 bg-black/5 text-slate-600 hover:bg-black/10 hover:text-slate-900"
        }`}
      >
        {currentLang === "es" ? "EN" : "ES"}
      </button>
    </div>
  );
};

function App() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const [isDark, setIsDark] = useState(true);

  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const currentIndexRef = useRef(0);

  const scrollToSection = (index) => {
    const container = containerRef.current;
    const el = document.getElementById(sections[index].id);
    if (!container || !el) return;

    isScrollingRef.current = true;
    currentIndexRef.current = index;
    const top = el.getBoundingClientRect().top + container.scrollTop;

    container.scrollTo({ top, behavior: "smooth" });

    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (isScrollingRef.current) {
        e.preventDefault?.();
        return;
      }
      const direction = e.deltaY > 0 ? 1 : -1;
      let nextIndex = currentIndexRef.current + direction;
      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex > sections.length - 1) nextIndex = sections.length - 1;

      if (nextIndex !== currentIndexRef.current) {
        e.preventDefault();
        scrollToSection(nextIndex);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    const index = sections.findIndex((s) => s.id === id);
    if (index !== -1) scrollToSection(index);
  };

  return (
    <div className={`font-sans overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0b0a12]" : "bg-white"}`}>
      
      <LanguageSwitch isDark={isDark} />
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-100 flex flex-col gap-2 items-center">
        {sections.map((section, index) => {
          const isActive = activeSection === index;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={handleNavClick(section.id)}
              className="group p-2 flex items-center justify-center transition-transform hover:scale-125"
            >
              {section.type === "line" ? (
                <div className={`transition-all duration-300 ${isActive ? "w-6 h-0.5 bg-linear-to-r from-sky-500 via-red-500 to-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]" : isDark ? "w-3 h-3 rounded-full bg-white/20" : "w-3 h-3 rounded-full bg-slate-300"}`} />
              ) : (
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? colorMap[section.color] : isDark ? "bg-white/20" : "bg-slate-300"}`} />
              )}
            </a>
          );
        })}
      </nav>

      <main ref={containerRef} className="h-svh overflow-y-auto snap-y snap-mandatory overscroll-y-contain touch-pan-y scroll-smooth">
        <section id="hero" className="min-h-svh snap-start">
          <Hero isDark={isDark} />
        </section>

        <section id="skills" className="min-h-svh snap-start">
          <Skills isDark={isDark} />
        </section>

        <section id="projects" className="min-h-svh snap-start">
          <Projects isDark={isDark} />
        </section>

        <section id="footer" className="min-h-svh snap-start pb-[15svh] flex items-center justify-center px-6 py-12">
          <div className={`text-center max-w-md w-full space-y-4 sm:space-y-6 ${isDark ? "text-white/60" : "text-slate-500"}`}>
            <h2 className="text-sm sm:text-lg tracking-[0.3em] uppercase">
              {t('footer.title')}
            </h2>
            <p className="text-xs sm:text-sm opacity-70 leading-relaxed px-2 sm:px-0">
              {t('footer.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-xs">
              <a href="https://linkedin.com/in/justkillu" target="_blank" className="hover:text-sky-500 transition">LinkedIn</a>
              <a href="mailto:test@email.com" className="hover:text-sky-500 transition">Email</a>
            </div>
            <div className="pt-6 text-[10px] uppercase tracking-[0.25em] opacity-50">
              © {new Date().getFullYear()} Xavier Rojas
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;