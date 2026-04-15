import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isDark, setIsDark }) {
  return (
    <button
      onClick={() => setIsDark((v) => !v)}
      className={`fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full border px-3 py-2 text-xs backdrop-blur transition hover:scale-105 ${
        isDark
          ? "border-white/10 bg-black/20 text-white"
          : "border-black/10 bg-white/70 text-slate-900"
      }`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {isDark ? "Claro" : "Oscuro"}
    </button>
  );
}