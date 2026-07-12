import { Link } from 'react-router';
import { Sparkles, ArrowUp } from 'lucide-react';

const footerLinks = {
  Servicios: [
    { label: 'Desarrollo Web', to: '/servicios/desarrollo-web' },
    { label: 'Apps Móviles', to: '/servicios/apps-moviles' },
    { label: 'Campañas Ads', to: '/servicios/campanas-ads' },
    { label: 'Consultoría', to: '/servicios/consultoria' },
  ],
  Empresa: [
    { label: 'Sobre nosotros', to: '/empresa/sobre-nosotros' },
    { label: 'Proceso', to: '/empresa/proceso' },
    { label: 'Proyectos', to: '/proyectos' },
    { label: 'Contacto', to: '/contacto' },
  ],
  Legal: [
    { label: 'Política de privacidad', to: '/legal/politica-de-privacidad' },
    { label: 'Términos de servicio', to: '/legal/terminos-de-servicio' },
    { label: 'Aviso legal', to: '/legal/aviso-legal' },
    { label: 'Cookies', to: '/legal/cookies' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'GitHub', href: '#' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-darker pt-16 pb-8 aurora-triple">
      {/* Separator glow at top */}
      <div className="separator-glow absolute top-0 left-0 right-0" />

      {/* Floating particles */}
      <div className="floating-particles absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[20%] left-[10%] w-1 h-1 rounded-full bg-brand-purple/30" />
        <span className="absolute top-[50%] right-[15%] w-1.5 h-1.5 rounded-full bg-brand-cyan/20" />
        <span className="absolute bottom-[30%] left-[45%] w-1 h-1 rounded-full bg-white/15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                EditFlow<span className="text-brand-purple">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-7 max-w-md mb-7">
              Soluciones digitales con inteligencia artificial: desarrollo web,
              aplicaciones móviles y campañas publicitarias. Transformo
              ideas en experiencias digitales excepcionales.
            </p>
            {/* Social links with hover glow */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-purple/20 hover:border-brand-purple/40 hover:shadow-[0_0_16px_rgba(124,58,237,0.3)] hover:holographic card-hover-lift transition-all duration-300 text-xs font-medium"
                  aria-label={link.name}
                >
                  {link.name.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-white mb-5 relative">
                {title}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full" />
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 text-sm hover:text-white transition-colors animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="glass-premium border border-white/5 rounded-xl px-6 sm:px-8 pt-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EditFlowAI. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            C/ Perú, 61, 46701 Gandia, València, España
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="back-to-top fixed bottom-8 right-8 w-11 h-11 rounded-full bg-brand-card border border-brand-purple/30 flex items-center justify-center text-brand-purple hover:text-white hover:bg-brand-purple/20 hover:border-brand-purple z-50 btn-glow sonar-pulse"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}