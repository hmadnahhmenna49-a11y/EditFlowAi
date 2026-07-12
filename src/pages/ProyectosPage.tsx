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
        description="Cada proyecto es una historia de éxito. Descubre cómo transformamos las ideas de nuestros clientes en experiencias digitales excepcionales."
      />

      <section className="pb-24 sm:pb-32 aurora-triple">
        <div
          ref={ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Category filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'bg-brand-purple/20 border-brand-purple/40 text-white shadow-glow'
                    : 'tech-badge text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <div
                key={project.title}
                className="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/5 hover:border-brand-purple/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl holographic card-hover-lift shine-sweep gradient-border-box"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Proyecto ${project.title} - ${project.category}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-brand-cyan text-xs font-medium uppercase tracking-wider mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>

                {/* Info below image */}
                <div className="p-5">
                  <span className="text-brand-purple text-xs font-medium uppercase tracking-wider">
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
          <div className="text-center p-8 sm:p-12 rounded-2xl glass-premium aurora-bg gradient-border-box border border-white/5">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-4">
              ¿Quieres que tu proyecto sea el siguiente?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Cuéntanos tu idea y la convertiremos en una experiencia digital que impresione a tus clientes y genere resultados medibles para tu negocio.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-all btn-glow"
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