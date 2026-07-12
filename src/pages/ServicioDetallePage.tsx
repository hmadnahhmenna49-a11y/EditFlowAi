import { Link, useParams } from 'react-router';
import {
  Code, Smartphone, Megaphone, BarChart3,
  CheckCircle, ArrowLeft, ArrowRight,
  Search, Target, Palette, Rocket, Settings,
  Lightbulb, Layers, Database, Zap, Shield, Globe, TrendingUp, Users, BarChart2, FileText
} from 'lucide-react';
import PageHero from '../components/PageHero';

const serviceData: Record<string, {
  icon: typeof Code;
  title: string;
  badge: string;
  paragraphs: string[];
  features: string[];
  technologies: string[];
  steps: { icon: typeof Search; title: string; description: string }[];
}> = {
  'desarrollo-web': {
    icon: Code,
    title: 'Desarrollo Web',
    badge: 'Desarrollo Web',
    paragraphs: [
      'En EditFlowAI creo experiencias web excepcionales que van más allá de un simple sitio. Combino las últimas tecnologías como React, Next.js, Node.js y bases de datos modernas con herramientas de inteligencia artificial para construir plataformas robustas, seguras y escalables que soportan el crecimiento de tu negocio sin comprometer el rendimiento.',
      'Cada proyecto comienza con una fase exhaustiva de descubrimiento donde analizamos tu sector, tu competencia y las necesidades específicas de tus usuarios. A partir de ahí, diseñamos una arquitectura limpia y modular que permite futuras ampliaciones, garantizando que tu inversión tecnológica se amortice a largo plazo con una plataforma que evoluciona contigo.',
      'Desde landing pages de alta conversión hasta complejas plataformas SaaS multi-tenant, mi portfolio demuestra la capacidad para abordar proyectos de cualquier envergadura. Trabajo con metodologías ágiles, entregas incrementales y comunicación constante para que tengas visibilidad total sobre el progreso en cada sprint.',
    ],
    features: [
      'Sitios web corporativos responsive',
      'Plataformas e-commerce con pasarelas de pago',
      'Aplicaciones SaaS multi-tenant',
      'Progressive Web Apps (PWA)',
      'Integración con APIs REST y GraphQL',
      'CMS personalizados (WordPress, Strapi, Headless)',
      'Optimización SEO técnica avanzada',
      'Despliegue en cloud (AWS, Vercel, Cloudflare)',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
    steps: [
      { icon: Search, title: 'Análisis de requisitos', description: 'Recopilamos y analizamos todos los requisitos funcionales y técnicos del proyecto, definiendo el alcance, las historias de usuario y los criterios de aceptación.' },
      { icon: Target, title: 'Arquitectura y diseño UX/UI', description: 'Diseñamos la arquitectura del sistema y creamos prototipos de alta fidelidad que validamos con usuarios reales antes de escribir una sola línea de código.' },
      { icon: Layers, title: 'Desarrollo frontend', description: 'Construimos la interfaz de usuario con componentes reutilizables, animaciones fluidas y un rendimiento optimizado que garantiza una experiencia excepcional.' },
      { icon: Database, title: 'Desarrollo backend y APIs', description: 'Implementamos la lógica de negocio, las APIs RESTful o GraphQL, las bases de datos y todas las integraciones con servicios de terceros necesarios.' },
      { icon: Rocket, title: 'Testing, despliegue y lanzamiento', description: 'Realizamos testing exhaustivo (unitario, integración, E2E), configuramos CI/CD y desplegamos en producción con monitorización continua.' },
    ],
  },
  'apps-moviles': {
    icon: Smartphone,
    title: 'Aplicaciones Móviles',
    badge: 'Apps Móviles',
    paragraphs: [
      'Desarrollo aplicaciones móviles que tus usuarios amarán usar. Ya sea una app nativa para iOS con Swift, una app nativa para Android con Kotlin, o una solución multiplataforma con React Native o Flutter, cuento con la experiencia y las herramientas de IA necesarias para materializar tu visión en una experiencia móvil excepcional.',
      'Mi enfoque se centra en el rendimiento y la usabilidad. Optimizo cada aspecto de la aplicación, desde el tiempo de carga hasta el consumo de batería, asegurando que tu app sea rápida, fluida y eficiente en todos los dispositivos. Implemento patrones de diseño nativos y animaciones que se sienten naturales en cada plataforma.',
      'Desde la conceptualización hasta la publicación en App Store y Google Play, acompaño todo el ciclo de vida de tu aplicación. Gestiono las configuraciones de publicación, los certificados de seguridad y las actualizaciones posteriores al lanzamiento, para que tú solo te preocupes de hacer crecer tu base de usuarios.',
    ],
    features: [
      'Apps nativas iOS (Swift/SwiftUI)',
      'Apps nativas Android (Kotlin/Compose)',
      'Desarrollo multiplataforma (React Native/Flutter)',
      'Integración con APIs REST y GraphQL',
      'Autenticación biométrica (Face ID, huella)',
      'Notificaciones push segmentadas',
      'Integración con pasarelas de pago móviles',
      'Analytics y crash reporting',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
    steps: [
      { icon: Search, title: 'Definición del producto', description: 'Analizamos el mercado, definimos el MVP y creamos un product backlog priorizado con todas las funcionalidades clave de la aplicación.' },
      { icon: Palette, title: 'Diseño UX/UI mobile-first', description: 'Diseñamos las pantallas, flujos de navegación e interacciones específicas para móvil, validando con prototipos interactivos y pruebas de usabilidad.' },
      { icon: Layers, title: 'Desarrollo iterativo', description: 'Desarrollamos en sprints de 2 semanas con entregables incrementales, permitiéndote validar funcionalidades y dar feedback continuo.' },
      { icon: Settings, title: 'Integración y testing', description: 'Integramos servicios de backend, pasarelas de pago, notificaciones push y realizamos testing exhaustivo en dispositivos reales.' },
      { icon: Rocket, title: 'Publicación y soporte', description: 'Gestionamos la publicación en App Store y Google Play, incluyendo la configuración de perfiles, certificados y el cumplimiento de las políticas de las tiendas.' },
    ],
  },
  'campanas-ads': {
    icon: Megaphone,
    title: 'Campañas Ads',
    badge: 'Campañas Ads',
    paragraphs: [
      'En EditFlowAI no solo gestiono tus campañas publicitarias, las transformo en motores de crecimiento. Combino creatividad con análisis de datos e inteligencia artificial para crear estrategias que maximizan cada euro invertido, generando leads cualificados y ventas directas para tu negocio.',
      'Trabajo con las principales plataformas de publicidad digital: Google Ads (Search, Display, Shopping, YouTube), Meta Ads (Facebook e Instagram), LinkedIn Ads y TikTok Ads. Cada plataforma requiere un enfoque único y sé cómo exprimir al máximo cada una de ellas para alcanzar tus objetivos específicos.',
      'La clave del éxito es la optimización basada en datos. Utilizo herramientas avanzadas de tracking, atribución y análisis para entender exactamente qué funciona, qué no y por qué. Mis informes semanales y mensuales te dan total transparencia sobre el rendimiento de tus campañas y el retorno de tu inversión.',
    ],
    features: [
      'Google Ads (Search, Display, Shopping, YouTube)',
      'Meta Ads (Facebook e Instagram)',
      'LinkedIn Ads para campañas B2B',
      'TikTok Ads para alcance generacional',
      'Remarketing y retargeting multi-plataforma',
      'A/B testing de creatividades y copys',
      'Tracking avanzado con conversiones y atribución',
      'Reporting semanal y mensual personalizado',
    ],
    technologies: ['Google Analytics 4', 'Google Tag Manager', 'Meta Pixel', 'LinkedIn Insight Tag', 'Google Ads API', 'Hotjar', 'Data Studio', 'SEMrush'],
    steps: [
      { icon: Search, title: 'Auditoría y estrategia', description: 'Analizamos tu sector, competencia y público objetivo para diseñar una estrategia publicitaria personalizada con objetivos SMART y presupuesto optimizado.' },
      { icon: Target, title: 'Configuración de campañas', description: 'Creamos la estructura de campañas, grupos de anuncios, segmentaciones de audiencia, palabras clave y extensiones de anuncios optimizadas.' },
      { icon: Lightbulb, title: 'Creación de creatividades', description: 'Diseñamos banners, videos, copys y landing pages optimizadas para la conversión, realizando A/B testing continuo para encontrar las mejores combinaciones.' },
      { icon: Zap, title: 'Optimización continua', description: 'Monitoreamos y ajustamos pujas, segmentaciones y creatividades diariamente para mejorar el rendimiento y reducir el coste por adquisición.' },
      { icon: BarChart2, title: 'Reporting y escalado', description: 'Elaboramos informes detallados con métricas clave, ROAS y recomendaciones estratégicas para escalar las campañas exitosas.' },
    ],
  },
  'consultoria': {
    icon: BarChart3,
    title: 'Consultoría',
    badge: 'Consultoría',
    paragraphs: [
      'Mi servicio de consultoría digital te ayuda a tomar las decisiones tecnológicas correctas. Con más de 150 proyectos completados y la asistencia de inteligencia artificial avanzada, tengo el conocimiento y la perspectiva necesaria para guiarte a través de la complejidad del ecosistema digital actual.',
      'Realizo auditorías integrales de tu presencia digital, desde tu infraestructura técnica hasta tu estrategia de marketing y experiencia de usuario. Identifico cuellos de botella, oportunidades de mejora y áreas donde la tecnología puede generar un impacto real y medible en tus resultados de negocio.',
      'No soy un consultor teórico: soy un profesional que construye soluciones. Mi consultoría está respaldada por mi capacidad de implementación. Cuando identifico una oportunidad, no solo te digo qué hacer, sino que te ayudo a hacerlo, asegurando una ejecución impecable de principio a fin.',
    ],
    features: [
      'Auditoría digital integral (tecnología, UX, marketing)',
      'Estrategia de transformación digital',
      'Análisis de competencia y benchmarking',
      'Definición de roadmap tecnológico',
      'Optimización de arquitectura y rendimiento',
      'Consultoría de seguridad y compliance',
      'Formación y capacitación de equipos',
      'Selección y evaluación de proveedores tecnológicos',
    ],
    technologies: ['Figma', 'Jira', 'Confluence', 'AWS', 'Google Cloud', 'Miro', 'Notion', 'Slack'],
    steps: [
      { icon: Search, title: 'Diagnóstico inicial', description: 'Realizo un análisis exhaustivo de tu situación actual: tecnología, procesos, presencia digital y posición competitiva en el mercado.' },
      { icon: Target, title: 'Identificación de oportunidades', description: 'Priorizo las áreas de mejora basándome en impacto potencial, viabilidad técnica y alineación con tus objetivos de negocio a corto y largo plazo.' },
      { icon: FileText, title: 'Plan estratégico', description: 'Elaboro un plan detallado con milestones, recursos necesarios, plazos estimados y KPIs de éxito para cada iniciativa de transformación identificada.' },
      { icon: Users, title: 'Implementación acompañada', description: 'Trabajo codo a codo contigo para implementar las mejoras, compartiendo conocimiento y buenas prácticas durante todo el proceso.' },
      { icon: TrendingUp, title: 'Seguimiento y ajustes', description: 'Establezco reuniones periódicas de seguimiento, mido resultados contra los KPIs definidos y ajusto la estrategia según la evolución del proyecto.' },
    ],
  },
};

const serviceSlugs = ['desarrollo-web', 'apps-moviles', 'campanas-ads', 'consultoria'];

export default function ServicioDetallePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : undefined;

  if (!service) {
    return (
      <div className="pt-40 pb-20 text-center">
        <p className="text-gray-400 text-lg">Servicio no encontrado.</p>
        <Link to="/servicios" className="text-brand-purple hover:underline mt-4 inline-block">
          Volver a servicios
        </Link>
      </div>
    );
  }

  const currentIndex = serviceSlugs.indexOf(slug!);
  const prevSlug = currentIndex > 0 ? serviceSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < serviceSlugs.length - 1 ? serviceSlugs[currentIndex + 1] : null;

  const Icon = service.icon;

  return (
    <>
      <PageHero
        badge={service.badge}
        title={service.title}
        titleHighlight="en detalle"
      />

      <section className="pb-24 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-10">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-purple transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Servicios
            </Link>
          </div>

          {/* Service icon + title */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {service.title}
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-6 mb-16">
            {service.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-300 leading-relaxed text-lg">
                {p}
              </p>
            ))}
          </div>

          {/* Features */}
          <div className="mb-16">
            <h3 className="font-display font-semibold text-xl text-white mb-6">
              ¿Qué incluye este servicio?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-brand-card border border-white/5">
                  <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-16">
            <h3 className="font-display font-semibold text-xl text-white mb-6">
              Tecnologías que utilizamos
            </h3>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-brand-card border border-white/10 text-gray-300 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Process steps */}
          <div className="mb-16">
            <h3 className="font-display font-semibold text-xl text-white mb-6">
              Nuestro proceso de trabajo
            </h3>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-purple via-brand-cyan to-brand-purple" />
              <div className="space-y-8">
                {service.steps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.title} className="relative flex items-start gap-6 pl-2">
                      <div className="w-10 h-10 rounded-full bg-brand-card border-2 border-brand-purple/50 flex items-center justify-center relative z-10 shrink-0">
                        <StepIcon className="w-5 h-5 text-brand-purple" />
                      </div>
                      <div className="pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold text-brand-purple">PASO {i + 1}</span>
                          <h4 className="font-display font-semibold text-lg text-white">{step.title}</h4>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Previous / Next navigation */}
          <div className="flex items-center justify-between border-t border-white/5 pt-8 mb-12">
            {prevSlug ? (
              <Link
                to={`/servicios/${prevSlug}`}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {serviceData[prevSlug].title}
              </Link>
            ) : (
              <div />
            )}
            {nextSlug ? (
              <Link
                to={`/servicios/${nextSlug}`}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                {serviceData[nextSlug].title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* CTA */}
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-brand-purple/10 via-brand-card to-brand-cyan/10 border border-white/5">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-4">
              ¿Interesado en {service.title.toLowerCase()}?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Cuéntanos sobre tu proyecto y te prepararemos una propuesta personalizada sin compromiso en menos de 24 horas.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-glow"
            >
              Solicitar presupuesto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}