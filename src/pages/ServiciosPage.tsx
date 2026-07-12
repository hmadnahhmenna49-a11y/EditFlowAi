import { Link } from 'react-router';
import { Code, Smartphone, Megaphone, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useInView } from '../AppSections';

const services = [
  {
    slug: 'desarrollo-web',
    icon: Code,
    title: 'Desarrollo Web',
    description:
      'Creamos sitios web corporativos, plataformas e-commerce y aplicaciones SaaS con las últimas tecnologías. Nuestros proyectos destacan por su rendimiento excepcional, diseño impecable y arquitectura escalable que acompaña el crecimiento de tu negocio.',
    gradient: 'from-brand-purple to-brand-purple-light',
    features: [
      'Sitios web corporativos y landing pages',
      'Plataformas e-commerce optimizadas',
      'Aplicaciones SaaS multi-tenant',
      'Integración con APIs y servicios externos',
    ],
  },
  {
    slug: 'apps-moviles',
    icon: Smartphone,
    title: 'Apps Móviles',
    description:
      'Desarrollamos aplicaciones nativas y multiplataforma para iOS y Android que ofrecen experiencias fluidas, interfaces intuitivas y un rendimiento óptimo. Cada app está diseñada para escalar y retaining a tus usuarios.',
    gradient: 'from-brand-cyan to-brand-cyan-light',
    features: [
      'Apps nativas iOS y Android',
      'Desarrollo multiplataforma con React Native',
      'Integración con APIs REST y GraphQL',
      'Publicación en App Store y Google Play',
    ],
  },
  {
    slug: 'campanas-ads',
    icon: Megaphone,
    title: 'Campañas Ads',
    description:
      'Diseñamos y gestionamos estrategias de marketing digital en Google Ads, Meta Ads y LinkedIn. Optimización continua basada en datos, remarketing avanzado y reporting en tiempo real para maximizar tu ROI.',
    gradient: 'from-pink-500 to-rose-400',
    features: [
      'Google Ads (Search, Display, Shopping)',
      'Meta Ads (Facebook e Instagram)',
      'LinkedIn Ads para B2B',
      'Remarketing y segmentación avanzada',
    ],
  },
  {
    slug: 'consultoria',
    icon: BarChart3,
    title: 'Consultoría',
    description:
      'Asesoramiento estratégico para transformar digitalmente tu empresa. Analizamos tu situación actual, identificamos oportunidades de mejora y diseñamos un roadmap claro hacia la transformación digital completa.',
    gradient: 'from-amber-500 to-orange-400',
    features: [
      'Auditoría digital integral',
      'Estrategia de transformación digital',
      'Optimización de procesos de negocio',
      'Análisis de competencia y mercado',
    ],
  },
];

export default function ServiciosPage() {
  const { ref, inView } = useInView(0.1);

  return (
    <>
      <PageHero
        badge="Nuestros Servicios"
        title="Soluciones digitales"
        titleHighlight="integrales"
        description="Combinamos estrategia, diseño y tecnología para crear productos digitales que impulsan el crecimiento de tu empresa."
      />

      <section className="pb-24 sm:pb-32 aurora-triple">
        <div
          ref={ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                to={`/servicios/${service.slug}`}
                className="group relative p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-purple/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow/20 holographic spotlight-card card-hover-lift animated-gradient-border shine-sweep"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gradient border box inner wrapper */}
                <div className="gradient-border-box rounded-xl">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform sonar-pulse`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-brand-purple shrink-0 mt-0.5 icon-glow" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-brand-purple group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium animated-underline">Ver detalles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}