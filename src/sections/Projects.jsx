const projects = [
  {
    title: "Sistema de Ventas Automatizado",
    company: "FerreVargas C.A",
    description:
      "Desarrollo de una plataforma integral para mejorar la sustentabilidad financiera y la eficiencia comercial.",
    features: [
      "FullStack con Express y React",
      "UI centrada en conversión",
      "Optimización del flujo de ventas"
    ],
    tags: ["React", "Express", "Node.js", "Figma"],
    link: "#"
  },
  {
    title: "Gestión de Redes e Infraestructura",
    company: "Corpoelec",
    description:
      "Programa especializado en la administración de dispositivos y puertos para optimizar el flujo de datos.",
    features: [
      "Manejo de multiple dispositivos",
      "Resolución de infraestructura crítica",
      "Optimizacion de Información"
    ],
    tags: ["Python", "Networking"],
    link: "#"
  }
];

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white/60 backdrop-blur-md hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">

      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.25em] text-white bg-sky-500/70 px-2 py-1 rounded-md backdrop-blur">
          {project.company}
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="text-xl font-light text-slate-900 group-hover:text-sky-600 transition-colors">
          {project.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-4 space-y-1">
          {project.features.map((f, i) => (
            <li key={i} className="text-xs text-slate-500 flex gap-2">
              <span className="text-sky-500">▹</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] rounded-full bg-slate-100 text-slate-600 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          className="mt-5 inline-flex text-sm text-sky-600 hover:text-sky-500 transition"
        >
          Ver proyecto →
        </a>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-linear-to-r from-sky-500/5 to-transparent" />
    </div>
  );
};

const Projects = () => {
  return (
    <section id="proyectos" className="py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900">
            Proyectos & Experiencia
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl">
            Una colección de sistemas, soluciones y experiencias desarrolladas
            en entornos reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;