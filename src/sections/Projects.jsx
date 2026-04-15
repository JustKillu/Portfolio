import React from "react";
import { useTranslation } from "react-i18next";

const PROJECT_TAGS = [
  ["React", "Express", "Node.js", "Figma"],
  ["Python", "Networking"]
];

const PROJECT_IMAGES = [
  "https://via.placeholder.com/600x400",
  "https://via.placeholder.com/600x400"
];

const ProjectCard = ({ project, isDark, viewText }) => {
  return (
    <article
      className={`group relative rounded-2xl overflow-hidden border backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
        isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"
      }`}
    >
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.25em] text-white bg-black/40 px-2 py-1 rounded backdrop-blur">
          {project.company}
        </span>
      </div>

      <div className="p-5 sm:p-6 text-left">
        <h3
          className={`text-base sm:text-lg font-medium transition-colors ${
            isDark ? "text-white group-hover:text-purple-300" : "text-slate-900 group-hover:text-purple-500"
          }`}
        >
          {project.title}
        </h3>

        <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          {project.description}
        </p>

        <ul className="mt-4 space-y-1">
          {project.features.map((f, i) => (
            <li
              key={i}
              className={`text-xs flex gap-2 ${isDark ? "text-white/60" : "text-slate-500"}`}
            >
              <span className="text-purple-400">▹</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 text-[10px] rounded-full border transition ${
                isDark
                  ? "bg-white/5 text-white/70 border-white/10 hover:border-purple-400/40"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-purple-400/40"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link || "#"}
          className={`mt-5 inline-flex text-sm transition ${
            isDark ? "text-purple-300 hover:text-purple-200" : "text-purple-600 hover:text-purple-500"
          }`}
        >
          {viewText}
        </a>
      </div>
    </article>
  );
};

export default function Projects({ isDark = true }) {
  const { t } = useTranslation();
  
  const projectsData = t("projects.items", { returnObjects: true });

  const projects = projectsData.map((item, index) => ({
    ...item,
    tags: PROJECT_TAGS[index],
    image: PROJECT_IMAGES[index],
    link: "#"
  }));

  return (
    <section
      id="proyectos"
      className={`relative min-h-screen overflow-hidden py-16 sm:py-20 px-4 ${
        isDark ? "bg-[#120c1f]" : "bg-[#f6f7fb]"
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.25),transparent_60%)] ${
          isDark ? "" : "opacity-20"
        }`}
      />
      <div
        className={`absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.15),transparent_60%)] ${
          isDark ? "" : "opacity-10"
        }`}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="mb-8 mt-10 text-center">
          <div className="inline-block relative pb-4 overflow-hidden">
            <h2
              className={`text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] uppercase ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {t("projects.section_title")}{" "}
              <span className="text-purple-400">{t("projects.section_highlight")}</span>
            </h2>
            <span className="scan-bar" />
            <span className="scan-sweep" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center sm:place-items-stretch">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              isDark={isDark} 
              viewText={t("projects.view_project")} 
            />
          ))}
        </div>
      </div>

      <style>{`
        .scan-bar {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
        }
        .scan-sweep {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 35%;
          height: 2px;
          background: linear-gradient(90deg, #a855f7, #6366f1, #a855f7);
          background-size: 200% 100%;
          border-radius: 9999px;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.5);
          animation: scanMove 5s linear infinite;
        }
        @keyframes scanMove {
          0% { transform: translateX(-120%); opacity: 0; }
          10% { opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translateX(340%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}