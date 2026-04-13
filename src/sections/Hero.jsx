import { useEffect, useRef, useState } from "react";
const WORDS = ["Xavier Rojas", "Just Killu"];

const FLOATING_SHAPES = Array.from({ length: 45 }).map(() => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 20 + Math.random() * 60,
  speed: 0.2 + Math.random() * 0.4,
  angle: Math.random() * Math.PI * 2,
  radius: 10 + Math.random() * 25,
  rot: Math.random() * 360,
  rotSpeed: (Math.random() - 0.5) * 0.2,
  shape: Math.floor(Math.random() * 3)
}));

export default function Hero() {
  const [text, setText] = useState("");
  const [particles, setParticles] = useState(FLOATING_SHAPES);

  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const current = WORDS[indexRef.current];

      if (!deletingRef.current) {
        charRef.current++;
        setText(current.slice(0, charRef.current));

        if (charRef.current === current.length) {
          deletingRef.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charRef.current--;
        setText(current.slice(0, charRef.current));

        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % WORDS.length;
        }
      }

      setTimeout(tick, deletingRef.current ? 120 : 160);
    };

    const start = setTimeout(tick, 500);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.0003;

      setParticles((prev) =>
        prev.map((p) => {
          const angle = p.angle + time * p.speed;

          return {
            ...p,
            x: p.x + Math.cos(angle) * 0.03,
            y: p.y + Math.sin(angle) * 0.03,
            rot: p.rot + p.rotSpeed
          };
        })
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[90px_90px]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute border border-sky-400/40 bg-transparent opacity-60"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: `rotate(${p.rot}deg)`,
              borderRadius:
                p.shape === 0
                  ? "6px"
                  : p.shape === 1
                    ? "9999px"
                    : "0px",
              clipPath:
                p.shape === 2
                  ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                  : "none"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-900 min-h-16 sm:min-h-20">
          {text}
          <span className="text-sky-500 animate-[blink_1.2s_infinite]">|</span>
        </h1>

        <h2 className="mt-4 sm:mt-5 text-lg sm:text-2xl md:text-4xl font-light text-slate-800">
          Ingeniero en Computación
        </h2>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-500">
          <span className="relative pb-1">
            Full Stack Developer
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-sky-500/60 animate-roleA" />
          </span>

          <span className="hidden sm:block h-1 w-1 rounded-full bg-sky-500" />

          <span className="relative pb-1">
            UX Designer
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-sky-500/60 animate-roleB" />
          </span>
        </div>

        <p className="mx-auto mt-8 sm:mt-10 max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 leading-7 px-2">
          Me dedico al{" "}
          <span className="text-sky-600 font-medium">
            desarrollo de software
          </span>
          , con experiencia en diseño, implementación y mantenimiento de
          soluciones digitales eficientes. Mi enfoque es transformar ideas en
          herramientas tecnológicas sólidas y funcionales.
        </p>

        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
          <a
            href="#proyectos"
            className="px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-900 relative group"
          >
            Ver Proyectos
            <span className="absolute left-0 -bottom-1 h-px w-0 bg-sky-500 transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="https://www.linkedin.com/in/justkillu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-900 relative group flex items-center gap-2"
          >
            <img src="/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
            Hablemos de tu Proyecto
            <span className="absolute left-0 -bottom-1 h-px w-0 bg-sky-500 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>

      <a
        href="#proyectos"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em]"
      >
        <span className="animate-scrollSyncText">Deslizar</span>
        <span className="relative h-10 w-px overflow-hidden">
          <span className="absolute inset-0 bg-sky-500 animate-scrollLine" />
        </span>
      </a>
    </section>
  );
}