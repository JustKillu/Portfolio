import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PROJECT_TAGS = [
  ["React", "Express", "Node.js", "Figma"],
  ["Python", "Networking"]
];

const PROJECT_IMAGES = [
  `${import.meta.env.BASE_URL}images/projects/ventas.png`,
  `${import.meta.env.BASE_URL}images/projects/redes.png`
];

const getVideoEmbedUrl = (videoUrl) => {
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "drive.google.com") {
      const pathParts = url.pathname.split("/");
      const fileIndex = pathParts.indexOf("d");
      const fileId = fileIndex !== -1 ? pathParts[fileIndex + 1] : url.searchParams.get("id");
      return fileId ? `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview` : null;
    }

    let videoId;

    if (hostname === "youtu.be") {
      videoId = url.pathname.slice(1).split("/")[0];
    } else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(hostname)) {
      videoId = url.searchParams.get("v");
      if (!videoId) {
        const pathParts = url.pathname.split("/");
        if (["embed", "shorts", "live"].includes(pathParts[1])) {
          videoId = pathParts[2];
        }
      }
    }

    return videoId ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` : null;
  } catch {
    return null;
  }
};

const ProjectCard = ({ project, isDark, viewText, onOpen }) => {
  return (
    <article
      className={`group relative flex h-full w-full flex-col rounded-2xl overflow-hidden border backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
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

      <div className="flex flex-1 flex-col p-5 sm:p-6 text-left">
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

        <button
          type="button"
          onClick={onOpen}
          className={`mt-auto pt-5 inline-flex text-sm transition ${
            isDark ? "text-purple-300 hover:text-purple-200" : "text-purple-600 hover:text-purple-500"
          }`}
        >
          {viewText}
        </button>
      </div>
    </article>
  );
};

const ProjectDetail = ({ project, isDark, onBack, backText, videoTitle, missingVideoText, invalidVideoText }) => {
  const embedUrl = getVideoEmbedUrl(project.videoUrl);
  const hasInvalidVideoUrl = Boolean(project.videoUrl) && !embedUrl;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        type="button"
        onClick={onBack}
        className={`mb-6 inline-flex items-center gap-2 text-sm transition-colors ${
          isDark ? "text-purple-300 hover:text-white" : "text-purple-600 hover:text-slate-900"
        }`}
      >
        <span aria-hidden="true">←</span>
        {backText}
      </button>

      <div className={`grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start rounded-3xl border p-5 sm:p-8 ${
        isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"
      }`}>
        <div>
          <h2 className={`mb-4 text-sm font-medium uppercase tracking-[0.2em] ${
            isDark ? "text-white/70" : "text-slate-600"
          }`}>
            {videoTitle}
          </h2>
          <div className="aspect-video overflow-hidden rounded-2xl bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${videoTitle}: ${project.title}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/70">
                {hasInvalidVideoUrl ? invalidVideoText : missingVideoText}
              </div>
            )}
          </div>
        </div>

        <div className="text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-purple-400">
            {project.company}
          </span>
          <h1 className={`mt-3 text-2xl sm:text-3xl font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            {project.title}
          </h1>
          <p className={`mt-5 text-sm leading-relaxed sm:text-base ${
            isDark ? "text-white/70" : "text-slate-600"
          }`}>
            {project.description}
          </p>

          <h3 className={`mt-7 text-sm font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            {project.featuresTitle}
          </h3>
          <ul className="mt-3 space-y-3">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className={`flex gap-3 text-sm leading-relaxed ${
                  isDark ? "text-white/70" : "text-slate-600"
                }`}
              >
                <span className="text-purple-400" aria-hidden="true">▹</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 text-xs ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/70"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects({ isDark = true, isActive = true }) {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!isActive) setSelectedProject(null);
  }, [isActive]);
  
  const projectsData = t("projects.items", { returnObjects: true });

  const projects = projectsData.map((item, index) => ({
    ...item,
    tags: PROJECT_TAGS[index],
    image: PROJECT_IMAGES[index]
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

      <div className={`${selectedProject ? "max-w-4xl" : "max-w-5xl"} mx-auto relative`}>
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            isDark={isDark}
            onBack={() => setSelectedProject(null)}
            backText={t("projects.back_to_projects")}
            videoTitle={t("projects.video_title")}
            missingVideoText={t("projects.video_missing")}
            invalidVideoText={t("projects.video_invalid")}
          />
        ) : (
          <>
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
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </>
        )}
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