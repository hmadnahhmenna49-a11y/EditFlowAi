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
      'Creamos sitios web corporativos, plataformas e-commerce y aplicaciones SaaS con las últimas tecnologías. Rendimiento excepcional, diseño impecable y arquitectura escalable.',
    color: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
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
      'Desarrollamos aplicaciones nativas y multiplataforma para iOS y Android. Experiencias fluidas, interfaces intuitivas y rendimiento óptimo.',
    color: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
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
      'Estrategias de marketing digital en Google Ads, Meta Ads y LinkedIn. Optimización continua, remarketing avanzado y reporting en tiempo real.',
    color: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
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
      'Asesoramiento estratégico para transformar digitalmente tu empresa. Analizamos tu situación y diseñamos un roadmap claro hacia la transformación digital.',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
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

      <section className="pb-24 sm:pb-32">
        <div
          ref={ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/servicios/${service.slug}`}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-purple/25 card-lift block"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.color} border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}
                >
                  <service.icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-brand-purple group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium link-underline">Ver detalles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}