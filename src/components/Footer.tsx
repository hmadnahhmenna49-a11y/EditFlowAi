import { Link } from 'react-router';

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
  return (
    <footer className="relative bg-brand-dark pt-16 pb-8">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src="/assets/logo.svg" alt="EditFlowAI" className="w-8 h-8 rounded-lg" />
              <span className="font-display font-bold text-lg text-white tracking-tight">
                EditFlow<span className="text-brand-purple">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-7 max-w-md mb-6">
              Soluciones digitales con inteligencia artificial: desarrollo web,
              aplicaciones móviles y campañas publicitarias.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-brand-purple/30 transition-all text-xs font-medium"
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
              <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-500 text-sm hover:text-white transition-colors link-underline"
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
        <div className="border-t border-white/[0.06] pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} EditFlowAI. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            C/ Perú, 61, 46701 Gandia, València, España
          </p>
        </div>
      </div>
    </footer>
  );
}