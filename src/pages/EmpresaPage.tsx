import { Link } from 'react-router';
import { TrendingUp, Users, Zap, Award, ArrowRight, Sparkles, Lightbulb, Handshake, Bot } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useInView } from '../AppSections';

const stats = [
  { icon: TrendingUp, value: '150+', label: 'Proyectos completados' },
  { icon: Users, value: '80+', label: 'Clientes satisfechos' },
  { icon: Zap, value: '24/7', label: 'Disponibilidad' },
  { icon: Award, value: '99%', label: 'Tasa de satisfacción' },
];

const values = [
  {
    icon: Sparkles,
    title: 'Excelencia técnica',
    description: 'Me comprometo con las mejores prácticas de la industria y las tecnologías más avanzadas. Cada línea de código cumple los más altos estándares de calidad, rendimiento y seguridad. La excelencia no es una aspiración, es mi forma de trabajar en cada proyecto.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación constante',
    description: 'Investigo y adopto nuevas tecnologías y metodologías de forma continua para ofrecer soluciones vanguardistas que den ventaja competitiva a mis clientes. No sigo tendencias, las anticipo para que tu proyecto siempre esté un paso adelante.',
  },
  {
    icon: Handshake,
    title: 'Compromiso total',
    description: 'Me involucro profundamente en cada proyecto como si fuera mío propio. Entiendo que el éxito de mi cliente es mi éxito, y por eso me comprometo al 100% con los resultados y la satisfacción en cada entrega que realizo.',
  },
  {
    icon: Bot,
    title: 'Sinergia Humano-IA',
    description: 'Combino la creatividad y visión humana con el poder de la inteligencia artificial para lograr resultados que ni uno ni otro podrían alcanzar por separado. Las herramientas de IA me permiten trabajar con la precisión y velocidad de un equipo multidisciplinar, entregando proyectos de alta calidad con una eficiencia excepcional.',
  },
];

export default function EmpresaPage() {
  const { ref: valuesRef, inView: valuesInView } = useInView(0.1);
  const { ref: statsRef, inView: statsInView } = useInView(0.2);

  return (
    <>
      <PageHero
        badge="La Empresa"
        title="Sobre"
        titleHighlight="EditFlowAI"
        description="Conoce la historia detrás de EditFlowAI: un emprendedor que transforma ideas en experiencias digitales excepcionales con la ayuda de la inteligencia artificial."
      />

      {/* History Section */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="bg-brand-card border border-white/5 rounded-2xl p-8 sm:p-10">
              <p className="text-gray-300 leading-relaxed text-lg">
                EditFlowAI es un proyecto emprendedor nacido de la pasión por la tecnología y el diseño digital. Como profesional autónomo basado en Gandia, València, he construido este emprendimiento con una filosofía clara: ofrecer soluciones digitales de alta calidad adaptadas a las necesidades reales de cada cliente, sin las estructuras y costes de una agencia tradicional. La clave está en la combinación única entre la visión creativa humana y las herramientas más avanzadas de inteligencia artificial.
              </p>
            </div>
            <div className="bg-brand-card border border-white/5 rounded-2xl p-8 sm:p-10">
              <p className="text-gray-300 leading-relaxed text-lg">
                Lo que diferencia a EditFlowAI es la forma de trabajar: como emprendedor individual, cuento con un equipo virtual de inteligencia artificial que me asiste en diferentes fases de cada proyecto, desde el diseño y la programación hasta el análisis de datos y la optimización de campañas publicitarias. Esto me permite ofrecer un servicio integral —desarrollo web, aplicaciones móviles y marketing digital— con la agilidad de un profesional independiente y la capacidad técnica de un gran estudio, todo a un coste competitivo.
              </p>
            </div>
            <div className="bg-brand-card border border-white/5 rounded-2xl p-8 sm:p-10">
              <p className="text-gray-300 leading-relaxed text-lg">
                Con más de 150 proyectos completados y una tasa de satisfacción del 99%, mi compromiso con cada cliente es total: dedicación completa, comunicación directa y transparente sin intermediarios, y resultados que superan las expectativas. Las herramientas evolucionan constantemente, la IA avanza cada día, pero la esencia sigue siendo la misma: la pasión por crear productos digitales que generan un impacto real y medible en los negocios de mis clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-24 sm:pb-32">
        <div
          ref={statsRef}
          className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative rounded-3xl bg-gradient-to-r from-brand-purple/10 via-brand-card to-brand-cyan/10 border border-white/5 p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 mt-2 text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-cyan font-medium text-sm uppercase tracking-wider">
              Mis Valores
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
              Lo que me <span className="text-gradient">define</span>
            </h2>
          </div>

          <div
            ref={valuesRef}
            className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${
              valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {values.map((value, i) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-purple/30 transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-brand-purple" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-brand-purple/10 via-brand-card to-brand-cyan/10 border border-white/5">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-4">
              ¿Quieres conocer cómo trabajamos?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Descubre nuestro proceso de trabajo paso a paso y cómo aseguramos resultados excepcionales en cada proyecto.
            </p>
            <Link
              to="/empresa/proceso"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-all"
            >
              Ver nuestro proceso
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}