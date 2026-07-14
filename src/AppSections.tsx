import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { Link } from 'react-router';
import {
  Menu, X, ArrowRight, Code, Smartphone, Megaphone,
  ChevronLeft, ChevronRight, MapPin, Phone, Mail,
  ExternalLink, CheckCircle, MessageCircle, Send,
  TrendingUp, Users, Calendar, Award, Sparkles,
  Search, Target, Palette, Rocket, BarChart3, Cookie
} from 'lucide-react';

export { useState, useEffect, useRef, useCallback };
export type { FormEvent };
export {
  Menu, X, ArrowRight, Code, Smartphone, Megaphone,
  ChevronLeft, ChevronRight, MapPin, Phone, Mail,
  ExternalLink, CheckCircle, MessageCircle, Send,
  TrendingUp, Users, Calendar, Award, Sparkles,
  Search, Target, Palette, Rocket, BarChart3, Cookie
};

/* ──────────────────────────────────────────────
   HOOK: useInView
   ────────────────────────────────────────────── */
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ──────────────────────────────────────────────
   HOOK: useCountUp
   ────────────────────────────────────────────── */
export function useCountUp(end: number, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [end, duration, inView]);

  return count;
}

/* ──────────────────────────────────────────────
   Hero — Clean, bold, human-designed
   ────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-purple/[0.07] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-brand-cyan/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-sm text-gray-300">Soluciones Digitales con IA</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 tracking-tight">
            Transformo tu
            <br />
            <span className="text-gradient">Visión Digital</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Desarrollo web, aplicaciones móviles y campañas publicitarias
            diseñadas para escalar tu negocio y generar resultados medibles.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg"
            >
              Iniciar Proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/proyectos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.04] border border-white/10 text-white font-semibold rounded-xl hover:bg-white/[0.08] transition-colors text-lg"
            >
              Ver Proyectos
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
          {[
            { value: '150+', label: 'Proyectos' },
            { value: '80+', label: 'Clientes' },
            { value: '24/7', label: 'Disponibilidad' },
            { value: '99%', label: 'Satisfacción' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl sm:text-3xl text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
        <div className="mouse-icon" />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Servicios — Clean, intentional cards
   ────────────────────────────────────────────── */
export function Servicios() {
  const { ref, inView } = useInView(0.1);

  const services = [
    {
      slug: 'desarrollo-web',
      icon: Code,
      title: 'Desarrollo Web',
      description:
        'Sitios web corporativos, e-commerce y plataformas SaaS con tecnologías modernas. Rendimiento, diseño y escalabilidad.',
      color: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
    },
    {
      slug: 'apps-moviles',
      icon: Smartphone,
      title: 'Aplicaciones Móviles',
      description:
        'Apps nativas y multiplataforma para iOS y Android. Interfaces intuitivas y código optimizado.',
      color: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
    },
    {
      slug: 'campanas-ads',
      icon: Megaphone,
      title: 'Campañas Publicitarias',
      description:
        'Estrategias en Google Ads, Meta Ads y LinkedIn con optimización continua y reporting en tiempo real.',
      color: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    },
    {
      slug: 'consultoria-ia',
      icon: BarChart3,
      title: 'Consultoría IA',
      description:
        'Integración de inteligencia artificial: automatizaciones, chatbots y análisis predictivo para tu negocio.',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <section id="servicios" className="py-24 sm:py-32 relative">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-purple font-medium text-sm uppercase tracking-wider">
            Servicios
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            Soluciones digitales <span className="text-gradient">integrales</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Combino estrategia, diseño y tecnología para crear productos digitales
            que impulsan el crecimiento de tu empresa.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <Link
              key={service.title}
              to={`/servicios/${service.slug}`}
              className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-purple/30 card-lift"
            >
              <div
                className={`w-12 h-12 rounded-xl ${service.color} border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}
              >
                <service.icon className="w-6 h-6" />
              </div>

              <h3 className="font-display font-semibold text-lg text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-brand-purple">
                <span className="text-sm font-medium link-underline">Saber más</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Métricas — Clean, typographic
   ────────────────────────────────────────────── */
export function Metricas() {
  const { ref, inView } = useInView(0.3);

  const metrics = [
    { icon: Calendar, value: 150, suffix: '+', label: 'Proyectos Entregados' },
    { icon: Users, value: 80, suffix: '+', label: 'Clientes Satisfechos' },
    { icon: Sparkles, value: 99, suffix: '%', label: 'Tasa de Satisfacción' },
    { icon: Award, value: 24, suffix: '/7', label: 'Disponibilidad' },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      {/* Top divider */}
      <div className="section-divider mb-24 sm:mb-32" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-cyan font-medium text-sm uppercase tracking-wider">
            Resultados
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            Números que <span className="text-gradient">hablan</span>
          </h2>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric) => (
            <MetricItem key={metric.label} {...metric} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MetricItem({
  icon: Icon,
  value,
  suffix,
  label,
  inView,
}: {
  icon: typeof TrendingUp;
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, 2000, inView);

  return (
    <div className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
      <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center mx-auto mb-5">
        <Icon className="w-6 h-6 text-brand-purple" />
      </div>

      <div className="font-display font-bold text-3xl sm:text-4xl text-white">
        {count}
        {suffix}
      </div>
      <div className="text-gray-400 mt-2 text-sm">{label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Portfolio — Clean image cards
   ────────────────────────────────────────────── */
export function Portfolio() {
  const { ref, inView } = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const categories = ['Todos', 'Desarrollo Web', 'App Móvil', 'Dashboard', 'Marketing'];

  const projects = [
    { image: '/assets/portfolio-1.jpg', title: 'Luxury Estates', category: 'Desarrollo Web', description: 'Plataforma inmobiliaria de lujo con buscador avanzado' },
    { image: '/assets/portfolio-2.jpg', title: 'TechDrop', category: 'App Móvil', description: 'E-commerce de productos tecnológicos multiplataforma' },
    { image: '/assets/portfolio-3.jpg', title: 'FitTrack Pro', category: 'Dashboard', description: 'Panel de analytics para centros de fitness' },
    { image: '/assets/portfolio-4.jpg', title: "L'Or Gourmand", category: 'Desarrollo Web', description: 'Experiencia digital gastronómica premium' },
    { image: '/assets/portfolio-5.jpg', title: 'Novus Digital', category: 'App Móvil', description: 'Aplicación bancaria con gestión de inversiones' },
    { image: '/assets/portfolio-6.jpg', title: 'Adapt Analytics', category: 'Marketing', description: 'Plataforma de métricas de campañas publicitarias' },
  ];

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="proyectos" className="py-24 sm:py-32 relative">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-cyan font-medium text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            Proyectos que hablan <span className="text-gradient">por sí solos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cada proyecto es una historia de éxito. Descubre cómo transformo
            las ideas en experiencias digitales excepcionales.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
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

        {/* Grid */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-brand-cyan text-xs font-medium uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-display font-semibold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{project.description}</p>
                </div>
              </div>

              <div className="p-5">
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-display font-semibold text-white mt-1 group-hover:text-brand-purple transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Proceso — Clean timeline
   ────────────────────────────────────────────── */
export function Proceso() {
  const { ref, inView } = useInView(0.1);

  const steps = [
    {
      icon: Search,
      title: 'Descubrimiento',
      description: 'Analizo tu negocio, audiencia y objetivos para definir la estrategia óptima.',
    },
    {
      icon: Target,
      title: 'Estrategia',
      description: 'Diseño el roadmap técnico y creativo con milestones claros y entregables.',
    },
    {
      icon: Palette,
      title: 'Diseño',
      description: 'Creo prototipos interactivos y el sistema de diseño completo de tu producto.',
    },
    {
      icon: Code,
      title: 'Desarrollo',
      description: 'Programo con código limpio, arquitectura escalable y mejores prácticas.',
    },
    {
      icon: Rocket,
      title: 'Lanzamiento',
      description: 'Despliego, monitoreo y optimizo. Tu éxito es mi métrica principal.',
    },
  ];

  return (
    <section id="proceso" className="py-24 sm:py-32 relative">
      {/* Top divider */}
      <div className="section-divider mb-24 sm:mb-32" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-purple font-medium text-sm uppercase tracking-wider">
            Proceso
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            De la idea al <span className="text-gradient">producto final</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Un método probado en más de 150 proyectos que garantiza resultados
            excepcionales en cada fase.
          </p>
        </div>

        {/* Timeline — Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-px bg-white/[0.06]" />

            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="relative w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-purple/40 flex items-center justify-center mx-auto mb-6 z-10">
                    <step.icon className="w-5 h-5 text-brand-purple" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline — Mobile */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.06]" />

            <div className="space-y-10">
              {steps.map((step, i) => (
                <div key={i} className="relative flex items-start gap-5 pl-2">
                  <div className="w-10 h-10 rounded-full bg-brand-dark border-2 border-brand-purple/40 flex items-center justify-center shrink-0 z-10">
                    <step.icon className="w-4 h-4 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Testimonios — Clean card carousel
   ────────────────────────────────────────────── */
export function Testimonios() {
  const { ref, inView } = useInView(0.1);
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: 'Carlos Martínez',
      role: 'CEO, InmoLux',
      text: 'EditFlowAI transformó completamente nuestra presencia digital. Entregó una plataforma inmobiliaria que superó todas nuestras expectativas. Profesionalismo y resultados excepcionales.',
    },
    {
      name: 'Laura Sánchez',
      role: 'Directora de Marketing, TechDrop',
      text: 'La app que desarrolló incrementó nuestras ventas un 340% en el primer trimestre. Su enfoque en UX y rendimiento marca la diferencia. Totalmente recomendable.',
    },
    {
      name: 'Miguel Ángel Ruiz',
      role: 'Fundador, FitTrack Pro',
      text: 'Trabajar con EditFlowAI fue una experiencia impecable. Entendió nuestra visión desde el primer día y el dashboard que entregó es simplemente espectacular.',
    },
    {
      name: 'Ana Belén Ferrer',
      role: 'Directora, Grupo L\'Or',
      text: 'Captó perfectamente la esencia de nuestra marca. La web que creó es elegante, rápida y ha recibido elogios de todos nuestros clientes.',
    },
  ];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-24 sm:py-32 relative">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-cyan font-medium text-sm uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            Lo que dicen <span className="text-gradient">mis clientes</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12 text-center">
                    <div className="quote-mark">&ldquo;</div>

                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan p-[2px]">
                        <div className="w-full h-full rounded-full bg-brand-dark flex items-center justify-center">
                          <span className="font-display font-bold text-base text-white">{t.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-display font-semibold text-white">{t.name}</div>
                        <div className="text-gray-400 text-sm">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-5 w-10 h-10 rounded-full border border-white/10 bg-brand-dark/80 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-purple/40 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-5 w-10 h-10 rounded-full border border-white/10 bg-brand-dark/80 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-purple/40 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-brand-purple'
                    : 'w-2 bg-white/15 hover:bg-white/30'
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}