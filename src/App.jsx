import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <main>
        <Hero />
        <Skills />
        <Projects />
      </main>
      
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Xavier Rojas — Ingeniero en Computación
        </p>
        <div className="mt-4 flex justify-center gap-6 text-slate-500 text-sm">
          <a href="https://linkedin.com/in/justkillu" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</a>
          <a href="mailto:nightcorekillu@gmail.com" className="hover:text-blue-600 transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
}

export default App;