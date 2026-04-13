const skillCategories = [
  {
    title: "Desarrollo Full Stack",
    skills: ["JavaScript", "Python", "React", "Express", "Node.js"],
    color: "sky"
  },
  {
    title: "Bases de Datos",
    skills: ["SQL (MySQL)", "NoSQL (MongoDB)", "Optimización"],
    color: "emerald"
  },
  {
    title: "Diseño y UX",
    skills: ["Figma", "Prototipado", "Arquitectura UI"],
    color: "purple"
  },
  {
    title: "Idiomas",
    skills: [
      "Español (Nativo)",
      "Inglés (Intermedio - B1)",
      "Lectura técnica",
      "Comunicación oral en desarrollo"
    ],
    color: "amber"
  }
];

const colorMap = {
  sky: "from-sky-500/10 to-sky-500/0 text-sky-600 border-sky-200",
  emerald: "from-emerald-500/10 to-emerald-500/0 text-emerald-600 border-emerald-200",
  purple: "from-purple-500/10 to-purple-500/0 text-purple-600 border-purple-200",
  amber: "from-amber-500/10 to-amber-500/0 text-amber-600 border-amber-200"
};

const SkillCard = ({ category }) => {
  return (
    <div className="group relative p-6 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-md hover:-translate-y-2 hover:shadow-lg transition-all duration-300 overflow-hidden">

      <div
        className={`absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition ${
          colorMap[category.color]
        }`}
      />

      <h3 className="relative text-sm uppercase tracking-[0.25em] font-semibold text-slate-700 group-hover:text-slate-900">
        {category.title}
      </h3>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs rounded-full bg-slate-100 border border-slate-200 text-slate-600 group-hover:bg-white group-hover:scale-105 transition"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-sky-400/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900">
            Habilidades Técnicas
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Tecnologías y conocimientos aplicados en proyectos reales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;