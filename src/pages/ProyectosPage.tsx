import { Link } from 'react-router';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useInView } from '../AppSections';

const projects = [
  { image: '/assets/portfolio-1.jpg', title: 'Luxury Estates', category: 'Desarrollo Web', description: 'Plataforma inmobiliaria de lujo con buscador avanzado' },
  { image: '/assets/portfolio-2.jpg', title: 'TechDrop', category: 'App Móvil', description: 'E-commerce de productos tecnológicos multiplataforma' },
  { image: '/assets/portfolio-3.jpg', title: 'FitTrack Pro', category: 'Dashboard SaaS', description: 'Panel de analytics para centros de fitness' },
  { image: '/assets/portfolio-4.jpg', title: "L'Or Gourmand", category: 'Diseño Web', description: 'Experiencia digital gastronómica premium' },
  { image: '/assets/portfolio-5.jpg', title: 'Novus Digital', category: 'Fintech App', description: 'Aplicación bancaria con gestión de inversiones' },
  { image: '/assets/portfolio-6.jpg', title: 'Adapt Analytics', category: 'Marketing', description: 'Plataforma de métricas de campañas publicitarias' },
];

export default function ProyectosPage() {
  const { ref, inView } = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const categories = ['Todos', 'Desarrollo Web', 'App Móvil', 'Dashboard', 'Marketing'];

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Proyectos que hablan"
        titleHighlight="por sí solos"
        description="Cada proyecto es una historia de éxito. Descubre cómo transformamos las ideas en experiencias digitales excepcionales."
      />

      <section className="pb-24 sm:pb-32">
        <div
          ref={ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  activeFilter === cat
                    ? 'bg-brand-purple text-white border-brand-purple'
                    : 'bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.title}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-brand-purple/25 card-lift"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Proyecto ${project.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-brand-cyan text-xs font-medium uppercase tracking-wider mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-white mt-1 group-hover:text-brand-purple transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-8 sm:p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-4">
              ¿Quieres que tu proyecto sea el siguiente?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Cuéntanos tu idea y la convertiremos en una experiencia digital que impresione a tus clientes.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Empezar proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}