import React from "react";
import { useTranslation } from "react-i18next";

const colorMap = {
  sky: "group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]",
  emerald: "group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]",
  purple: "group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.3)]",
  amber: "group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]",
};

const accentMap = {
  sky: "bg-sky-400",
  emerald: "bg-emerald-400",
  purple: "bg-purple-400",
  amber: "bg-amber-400",
};

const SkillCard = ({ category, isDark }) => {
  return (
    <div
      className={`group relative p-6 rounded-xl border backdrop-blur-md transition-all duration-500 shadow-sm hover:-translate-y-2 ${
        isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"
      } ${colorMap[category.color]} ${category.wide ? "md:col-span-2" : ""}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${accentMap[category.color]}`}
      />

      <h3
        className={`text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors ${
          isDark ? "text-white/60 group-hover:text-white" : "text-slate-500 group-hover:text-slate-900"
        }`}
      >
        {category.title}
      </h3>

      <div className="mt-4 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-all duration-300 ${
              isDark
                ? "bg-white/5 border-white/10 text-white/60 group-hover:text-white group-hover:bg-white/10"
                : "bg-slate-50 border-slate-200 text-slate-600 group-hover:text-slate-900 group-hover:bg-slate-100"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Skills({ isDark = true }) {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t("skills.categories.fullstack"),
      skills: ["JavaScript", "Python", "React", "Express", "Node.js"],
      color: "sky",
      wide: true,
    },
    {
      title: t("skills.categories.databases"),
      skills: ["SQL (MySQL)", "NoSQL (MongoDB)", t("skills.items.optimization")],
      color: "emerald",
      wide: false,
    },
    {
      title: t("skills.categories.design"),
      skills: ["Figma", t("skills.items.prototyping"), t("skills.items.architecture")],
      color: "purple",
      wide: false,
    },
    {
      title: t("skills.categories.languages"),
      skills: [t("skills.items.spanish"), t("skills.items.english"), t("skills.items.reading")],
      color: "amber",
      wide: false,
    },
  ];

  return (
    <section
      id="skills"
      className={`relative min-h-screen w-full flex items-center justify-center snap-start px-6 py-20 overflow-hidden ${
        isDark ? "bg-[#0f0b14]" : "bg-[#f6f7fb]"
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.25),transparent_60%)] ${
          isDark ? "" : "opacity-50"
        }`}
      />
      <div
        className={`absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(239,68,68,0.18),transparent_70%)] ${
          isDark ? "opacity-100" : "opacity-40"
        }`}
      />
      <div
        className={`absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_60%)] ${
          isDark ? "opacity-100" : "opacity-30"
        }`}
      />

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center relative">
        <div className="mb-12 inline-block text-center">
          <h2
            className={`text-2xl md:text-3xl font-light tracking-[0.15em] relative pb-4 uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {t("skills.title")} <span className="text-red-400 font-normal">{t("skills.highlight")}</span>

            <div
              className={`absolute left-0 bottom-0 h-[1.5px] w-full overflow-hidden ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            >
              <div className="h-full w-[101%] bg-linear-to-r from-red-500 via-red-400 to-transparent animate-line" />
            </div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} isDark={isDark} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideLine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        .animate-line {
          animation: slideLine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}