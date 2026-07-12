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
   HOOK: useInView — detecta cuando un elemento
   entra en el viewport para animar fade-in
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
   HOOK: useCountUp — animación de contadores
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
      // easing easeOutQuart
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
   COMPONENTE: Hero3DCanvas — Stunning 3D Particle Sphere
   ────────────────────────────────────────────── */
export function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const particles: {
      x: number; y: number; z: number;
      ox: number; oy: number; oz: number;
      size: number;
      hue: number;
    }[] = [];

    const PARTICLE_COUNT = 220;
    const SPHERE_RADIUS = 280;
    const CONNECTION_DIST = 90;
    const FOCAL = 600;

    function resize() {
      w = canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      h = canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Fibonacci sphere distribution
        const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = SPHERE_RADIUS * (0.6 + Math.random() * 0.4);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        particles.push({
          x, y, z, ox: x, oy: y, oz: z,
          size: 1.2 + Math.random() * 2,
          hue: 260 + Math.random() * 60, // purple to cyan range
        });
      }
    }

    function project(px: number, py: number, pz: number) {
      const scale = FOCAL / (FOCAL + pz);
      return {
        x: (w / window.devicePixelRatio / 2) + px * scale,
        y: (h / window.devicePixelRatio / 2) + py * scale,
        scale,
      };
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w / window.devicePixelRatio, h / window.devicePixelRatio);

      const t = time * 0.0003;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update particles
      for (const p of particles) {
        // Base rotation
        const cosY = Math.cos(t * 0.5 + my * 0.3);
        const sinY = Math.sin(t * 0.5 + my * 0.3);
        const cosX = Math.cos(t * 0.3 + mx * 0.3);
        const sinX = Math.sin(t * 0.3 + mx * 0.3);

        // Apply rotation around Y then X
        let rx = p.ox * cosY - p.oz * sinY;
        let rz = p.ox * sinY + p.oz * cosY;
        let ry = p.oy * cosX - rz * sinX;
        rz = p.oy * sinX + rz * cosX;

        // Mouse attraction / distortion
        const distortStrength = 30;
        rx += mx * distortStrength * (1 + Math.sin(t * 2 + p.ox * 0.01) * 0.5);
        ry += my * distortStrength * (1 + Math.cos(t * 2 + p.oy * 0.01) * 0.5);

        // Breathing effect
        const breathe = 1 + Math.sin(t * 1.5) * 0.05;
        rx *= breathe;
        ry *= breathe;
        rz *= breathe;

        p.x = rx;
        p.y = ry;
        p.z = rz;
      }

      // Sort by Z for painter's algorithm
      particles.sort((a, b) => a.z - b.z);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECTION_DIST) {
            const pa = project(a.x, a.y, a.z);
            const pb = project(b.x, b.y, b.z);
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25 * Math.min(pa.scale, pb.scale);
            const hue = (a.hue + b.hue) / 2;
            ctx!.beginPath();
            ctx!.moveTo(pa.x, pa.y);
            ctx!.lineTo(pb.x, pb.y);
            ctx!.strokeStyle = `hsla(${hue}, 80%, 65%, ${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const proj = project(p.x, p.y, p.z);
        const size = p.size * proj.scale;
        const alpha = Math.max(0.15, Math.min(1, (proj.scale - 0.3) * 1.5));

        // Glow
        const gradient = ctx!.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 85%, 70%, ${alpha * 0.6})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.15})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 50%, 0)`);
        ctx!.beginPath();
        ctx!.arc(proj.x, proj.y, size * 4, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 90%, 80%, ${alpha})`;
        ctx!.fill();
      }

      // Draw central glow
      const centerGrad = ctx!.createRadialGradient(
        w / window.devicePixelRatio / 2, h / window.devicePixelRatio / 2, 0,
        w / window.devicePixelRatio / 2, h / window.devicePixelRatio / 2, SPHERE_RADIUS * 0.8
      );
      centerGrad.addColorStop(0, 'rgba(124, 58, 237, 0.04)');
      centerGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
      centerGrad.addColorStop(1, 'transparent');
      ctx!.beginPath();
      ctx!.arc(w / window.devicePixelRatio / 2, h / window.devicePixelRatio / 2, SPHERE_RADIUS * 0.8, 0, Math.PI * 2);
      ctx!.fillStyle = centerGrad;
      ctx!.fill();

      animRef.current = requestAnimationFrame(draw);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleResize = () => {
      resize();
    };

    resize();
    initParticles();
    animRef.current = requestAnimationFrame(draw);
    canvas!.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas!.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] w-full h-full pointer-events-auto"
      style={{ cursor: 'default' }}
    />
  );
}

/* ──────────────────────────────────────────────
   COMPONENTE: Hero — BREATHTAKING overhaul
   ────────────────────────────────────────────── */
export function Hero() {
  const [parallaxY, setParallaxY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="aurora-bg relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Background image con parallax */}
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/80" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-[4] mesh-bg opacity-60" />

      {/* Morph blob decorative element */}
      <div
        className="morph-blob absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none z-[3]"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, 0)`,
          transition: 'transform 0.6s ease-out',
        }}
      />
      <div
        className="morph-blob absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-brand-cyan/15 rounded-full blur-[80px] pointer-events-none z-[3]"
        style={{
          animationDelay: '2s',
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -20}px, 0)`,
          transition: 'transform 0.6s ease-out',
        }}
      />

      {/* Floating particles — pure CSS */}
      <div className="floating-particles absolute inset-0 z-[4] pointer-events-none">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Rotating orbit dot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] pointer-events-none"
        style={{ '--orbit-radius': '340px' } as React.CSSProperties}
      >
        <div className="orbit-dot w-2 h-2 rounded-full bg-brand-purple/60 shadow-[0_0_12px_rgba(124,58,237,0.5)]" />
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] pointer-events-none"
        style={{ '--orbit-radius': '280px' } as React.CSSProperties}
      >
        <div className="orbit-dot w-1.5 h-1.5 rounded-full bg-brand-cyan/50 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
      </div>

      {/* Depth noise texture overlay */}
      <div className="absolute inset-0 z-[6] depth-noise pointer-events-none" />

      {/* Vignette effect */}
      <div className="absolute inset-0 z-[6] vignette pointer-events-none" />

      {/* 3D Canvas Animation */}
      <Hero3DCanvas />

      {/* Animated gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/15 rounded-full blur-[120px] animate-pulse"
        style={{
          transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 10}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-cyan/10 rounded-full blur-[100px] animate-pulse"
        style={{
          animationDelay: '1s',
          transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -15}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      />

      {/* Content with 3D tilt effect */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${mousePos.y * -1.5}deg) rotateY(${mousePos.x * 1.5}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="animate-fade-in-up" style={{ transformStyle: 'preserve-3d' }}>
          {/* Hero badge with sonar-pulse */}
          <div className="relative inline-flex mb-8">
            <div className="sonar-pulse absolute inset-0 rounded-full" />
            <div
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-tinted-purple border border-white/10 backdrop-blur-sm"
              style={{
                transform: 'translateZ(30px)',
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-200 font-medium">Soluciones Digitales con IA</span>
            </div>
          </div>

          <h1
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
            style={{
              transform: 'translateZ(50px)',
              textShadow: '0 0 80px rgba(124, 58, 237, 0.4), 0 0 160px rgba(6, 182, 212, 0.2)',
            }}
          >
            Transformo tu
            <br />
            <span className="text-shimmer">Visión Digital</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ transform: 'translateZ(35px)' }}
          >
            Desarrollo web, aplicaciones móviles y campañas publicitarias
            diseñadas para escalar tu negocio y generar resultados medibles.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ transform: 'translateZ(45px)' }}
          >
            <a
              href="/contacto"
              className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-glow text-lg"
              style={{
                transform: 'translateZ(55px)',
                transition: 'all 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateZ(75px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateZ(55px) scale(1)';
              }}
            >
              Iniciar Proyecto
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/proyectos"
              className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all text-lg"
              style={{
                transform: 'translateZ(55px)',
                transition: 'all 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateZ(75px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateZ(55px) scale(1)';
              }}
            >
              Ver Proyectos
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Tech stack badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2" style={{ transform: 'translateZ(30px)' }}>
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'].map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>

        {/* Stats preview — enhanced with glass-premium + gradient-border-box */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto" style={{ transform: 'translateZ(25px)' }}>
          {[
            { value: '150+', label: 'Proyectos' },
            { value: '80+', label: 'Clientes' },
            { value: '24/7', label: 'Disponibilidad' },
            { value: '99%', label: 'Satisfacción' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="gradient-border-box glass-premium rounded-2xl text-center py-4 px-3 border border-white/[0.06]"
            >
              <div className="font-display font-bold text-2xl sm:text-3xl text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator with mouse icon */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="mouse-icon" />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   COMPONENTE: Servicios — More impressive cards
   ────────────────────────────────────────────── */
export function Servicios() {
  const { ref, inView } = useInView(0.1);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  const services = [
    {
      slug: 'desarrollo-web',
      icon: Code,
      title: 'Desarrollo Web',
      description:
        'Creo sitios web corporativos, e-commerce y plataformas SaaS con tecnologías de última generación. Rendimiento excepcional, diseño impecable y escalabilidad garantizada.',
      gradient: 'from-brand-purple to-brand-purple-light',
      tag: '01',
    },
    {
      slug: 'apps-moviles',
      icon: Smartphone,
      title: 'Aplicaciones Móviles',
      description:
        'Desarrollo apps nativas y multiplataforma para iOS y Android. Experiencias fluidas, interfaces intuitivas y código optimizado para el máximo rendimiento.',
      gradient: 'from-brand-cyan to-brand-cyan-light',
      tag: '02',
    },
    {
      slug: 'campanas-ads',
      icon: Megaphone,
      title: 'Campañas Publicitarias',
      description:
        'Estrategias de marketing digital en Google Ads, Meta Ads y LinkedIn. Optimización continua, remarketing avanzado y reporting en tiempo real de tus campañas.',
      gradient: 'from-pink-500 to-rose-400',
      tag: '03',
    },
    {
      slug: 'consultoria-ia',
      icon: BarChart3,
      title: 'Consultoría IA',
      description:
        'Integro inteligencia artificial en tu negocio: automatizaciones, chatbots avanzados, análisis predictivo y flujos de trabajo inteligentes que multiplican tu productividad.',
      gradient: 'from-amber-500 to-orange-400',
      tag: '04',
    },
  ];

  return (
    <section id="servicios" className="aurora-triple py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative large number */}
      <div className="absolute -top-20 -right-20 text-[20rem] font-display font-bold text-white/[0.015] leading-none select-none pointer-events-none">S</div>
      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-purple font-medium text-sm uppercase tracking-wider">
            Mis Servicios
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {services.map((service, i) => (
            <Link
              key={service.title}
              to={`/servicios/${service.slug}`}
              onMouseMove={handleSpotlight}
              className="group relative p-7 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-purple/30 transition-all duration-500 card-hover-lift holographic spotlight-card animated-gradient-border shine-sweep gradient-border-box block"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Corner number tag */}
              <span className="absolute top-4 right-5 font-display font-black text-6xl text-white/[0.03] leading-none select-none pointer-events-none">
                {service.tag}
              </span>

              {/* Icono — bigger with sonar-pulse */}
              <div className="relative inline-block mb-6">
                <div className="sonar-pulse absolute inset-0 rounded-2xl" />
                <div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform icon-glow`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="font-display font-semibold text-xl text-white mb-3 relative z-10">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm relative z-10">
                {service.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-brand-purple relative z-10">
                <span className="text-sm font-medium animated-underline">Saber más</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Separator glow divider */}
        <div className="separator-glow mt-20" />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   COMPONENTE: Métricas — More dramatic counters
   ────────────────────────────────────────────── */
export function Metricas() {
  const { ref, inView } = useInView(0.3);

  const metrics = [
    { icon: Calendar, value: 150, suffix: '+', label: 'Proyectos Entregados', progress: 85 },
    { icon: Users, value: 80, suffix: '+', label: 'Clientes Satisfechos', progress: 72 },
    { icon: Sparkles, value: 99, suffix: '%', label: 'Tasa de Satisfacción', progress: 99 },
    { icon: Award, value: 24, suffix: '/7', label: 'Disponibilidad', progress: 100 },
  ];

  return (
    <section className="aurora-triple py-36 sm:py-44 relative overflow-hidden">
      {/* Section fade divider at top */}
      <div className="section-fade" />
      {/* Mesh pattern overlay */}
      <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-cyan font-medium text-sm uppercase tracking-wider">
            Resultados
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            Números que <span className="text-gradient">hablan</span>
          </h2>
        </div>

        {/* Individual glass cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
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
  progress,
}: {
  icon: typeof TrendingUp;
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  progress: number;
}) {
  const count = useCountUp(value, 2000, inView);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = inView ? circumference * (1 - progress / 100) : circumference;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleSpotlight}
      className="glass-premium rounded-2xl p-6 border border-white/5 holographic spotlight-card card-hover-lift text-center relative overflow-hidden group"
    >
      {/* SVG Circular progress ring */}
      <div className="relative inline-flex items-center justify-center mb-6 w-[120px] h-[120px]">
        <svg
          className="counter-ring w-[120px] h-[120px] absolute"
          viewBox="0 0 120 120"
        >
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="3"
          />
          {/* Gradient progress arc */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#metricGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
          <defs>
            <linearGradient id="metricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Icon in the center */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-purple" />
        </div>
      </div>

      {/* Number with gradient animation */}
      <div className="font-display font-bold text-3xl sm:text-4xl gradient-text-animated relative z-10 mt-1">
        {count}
        {suffix}
      </div>
      <div className="text-gray-400 mt-2 text-sm sm:text-base relative z-10">{label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   COMPONENTE: Portfolio — Premium feel with filters
   ────────────────────────────────────────────── */
export function Portfolio() {
  const { ref, inView } = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const categories = ['Todos', 'Desarrollo Web', 'App Móvil', 'Dashboard', 'Marketing'];

  const projects = [
    { image: '/assets/portfolio-1.jpg', title: 'Luxury Estates', category: 'Desarrollo Web', description: 'Plataforma inmobiliaria de lujo con buscador avanzado' },
    { image: '/assets/portfolio-2.jpg', title: 'TechDrop', category: 'App Móvil', description: 'E-commerce de productos tecnológicos multiplataforma' },
    { image: '/assets/portfolio-3.jpg', title: 'FitTrack Pro', category: 'Dashboard', description: 'Panel de analytics para centros de fitness' },
    { image: '/assets/portfolio-4.jpg', title: 'L\'Or Gourmand', category: 'Desarrollo Web', description: 'Experiencia digital gastronómica premium' },
    { image: '/assets/portfolio-5.jpg', title: 'Novus Digital', category: 'App Móvil', description: 'Aplicación bancaria con gestión de inversiones' },
    { image: '/assets/portfolio-6.jpg', title: 'Adapt Analytics', category: 'Marketing', description: 'Plataforma de métricas de campañas publicitarias' },
  ];

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="proyectos" className="aurora-triple py-24 sm:py-32 relative overflow-hidden">
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
            las ideas de mis clientes en experiencias digitales excepcionales.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === cat
                  ? 'bg-brand-purple/20 border-brand-purple/40 text-white shadow-[0_0_20px_rgba(124,58,237,0.2)]'
                  : 'bg-white/[0.03] border-white/8 text-gray-400 hover:bg-white/[0.06] hover:text-gray-200 hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/5 hover:border-brand-purple/30 transition-all duration-500 holographic card-hover-lift shine-sweep"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Imagen */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={`Proyecto ${project.title} - ${project.category}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Enhanced dramatic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent group-hover:from-brand-dark group-hover:via-brand-dark/80 transition-all duration-500" />
                {/* Purple-cyan glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 via-transparent to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 border border-brand-purple/20 text-brand-cyan text-xs font-medium uppercase tracking-wider mb-1">
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
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 border border-brand-purple/10 text-brand-purple text-xs font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-display font-semibold text-lg text-white mt-2 group-hover:text-brand-purple transition-colors">
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
   COMPONENTE: Proceso — Enhanced timeline
   ────────────────────────────────────────────── */
export function Proceso() {
  const { ref, inView } = useInView(0.1);

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Descubrimiento',
      description: 'Analizo tu negocio, audiencia y objetivos para definir la estrategia óptima.',
    },
    {
      number: '02',
      icon: Target,
      title: 'Estrategia',
      description: 'Diseño el roadmap técnico y creativo con milestones claros y entregables definidos.',
    },
    {
      number: '03',
      icon: Palette,
      title: 'Diseño',
      description: 'Creo prototipos interactivos y el sistema de diseño completo de tu producto.',
    },
    {
      number: '04',
      icon: Code,
      title: 'Desarrollo',
      description: 'Programo con código limpio, arquitectura escalable y las mejores prácticas del sector.',
    },
    {
      number: '05',
      icon: Rocket,
      title: 'Lanzamiento',
      description: 'Despliego, monitoreo y optimizo. Tu éxito es mi métrica principal.',
    },
  ];

  return (
    <section id="proceso" className="aurora-triple py-24 sm:py-32 relative overflow-hidden">
      {/* Section fade divider at top */}
      <div className="section-fade" />
      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-purple font-medium text-sm uppercase tracking-wider">
            Mi Proceso
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            De la idea al <span className="text-gradient">producto final</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Un método probado en más de 150 proyectos que garantiza resultados
            excepcionales en cada fase del desarrollo.
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Línea conectora — separator-glow style */}
            <div className="absolute top-[65px] left-0 right-0 h-[2px] separator-glow" />

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="relative text-center"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Step circle — bigger with holographic + sonar-pulse */}
                  <div className="relative w-[130px] h-[130px] mx-auto">
                    <div className="sonar-pulse absolute inset-0 rounded-full" />
                    <div className="w-full h-full rounded-full bg-brand-card border-2 border-brand-purple/30 flex items-center justify-center relative z-10 hover:border-brand-purple hover:shadow-glow transition-all duration-300 holographic rotating-border-circle">
                      <step.icon className="w-8 h-8 text-brand-cyan/80" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mt-6 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile/Tablet — enhanced with glass cards */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Línea vertical — separator-glow */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] separator-glow" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="relative flex items-start gap-6 pl-2"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="relative w-12 h-12 rounded-full bg-brand-card border-2 border-brand-purple/50 flex items-center justify-center relative z-10 shrink-0 rotating-border-circle">
                    <step.icon className="w-5 h-5 text-brand-cyan/70" />
                  </div>
                  {/* Glass card for mobile step */}
                  <div className="glass-premium rounded-xl p-4 border border-white/5 flex-1">
                    <h3 className="font-display font-semibold text-lg text-white mb-1">
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
   COMPONENTE: Testimonios — Premium carousel
   ────────────────────────────────────────────── */
export function Testimonios() {
  const { ref, inView } = useInView(0.1);
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: 'Carlos Martínez',
      role: 'CEO, InmoLux',
      text: 'EditFlowAI transformó completamente nuestra presencia digital. Entregó una plataforma inmobiliaria que superó todas nuestras expectativas. Profesionalismo, velocidad y resultados excepcionales.',
    },
    {
      name: 'Laura Sánchez',
      role: 'Directora de Marketing, TechDrop',
      text: 'La app que desarrolló para nosotros incrementó nuestras ventas un 340% en el primer trimestre. Su enfoque en UX y rendimiento marca la diferencia. Totalmente recomendable.',
    },
    {
      name: 'Miguel Ángel Ruiz',
      role: 'Fundador, FitTrack Pro',
      text: 'Trabajar con EditFlowAI fue una experiencia impecable. Entendió nuestra visión desde el primer día y el dashboard que entregó es simplemente espectacular. Un socio tecnológico de confianza.',
    },
    {
      name: 'Ana Belén Ferrer',
      role: 'Directora, Grupo Gastronómico L\'Or',
      text: 'Captó perfectamente la esencia de nuestra marca. La web que creó para nuestros restaurantes es elegante, rápida y ha recibido elogios de todos nuestros clientes.',
    },
  ];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="aurora-triple py-24 sm:py-32 relative overflow-hidden">
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

        {/* Carrusel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 px-4"
                >
                  <div className="relative glass-premium holographic gradient-border-box border border-white/5 rounded-2xl p-10 sm:p-14 text-center">
                    {/* Decorative quote mark with shimmer */}
                    <div className="quote-mark">
                      <span className="text-shimmer">&ldquo;</span>
                    </div>

                    <div className="flex justify-center gap-1.5 mb-6 relative z-10">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-5 h-5 text-yellow-400 fill-current star-glow" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 italic relative z-10">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="relative z-10 flex items-center justify-center gap-4">
                      {/* Avatar with animated gradient ring + sonar-pulse */}
                      <div className="relative shrink-0">
                        <div className="sonar-pulse absolute inset-0 rounded-full" />
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan p-[2.5px]">
                          <div className="w-full h-full rounded-full bg-brand-card flex items-center justify-center">
                            <span className="font-display font-bold text-lg text-white">{t.name.charAt(0)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-display font-semibold text-white text-lg">{t.name}</div>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-premium border border-white/10 flex items-center justify-center text-white hover:bg-brand-purple/20 hover:border-brand-purple transition-all hover:shadow-glow"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-premium border border-white/10 flex items-center justify-center text-white hover:bg-brand-purple/20 hover:border-brand-purple transition-all hover:shadow-glow"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Navigation dots with active state glow */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-brand-purple shadow-[0_0_12px_rgba(124,58,237,0.6)]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}