'use client';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const serviciosSubItems = [
  { label: 'Desarrollo Web', to: '/servicios/desarrollo-web' },
  { label: 'Apps Móviles', to: '/servicios/apps-moviles' },
  { label: 'Campañas Ads', to: '/servicios/campanas-ads' },
  { label: 'Consultoría', to: '/servicios/consultoria' },
];

const empresaSubItems = [
  { label: 'Sobre nosotros', to: '/empresa/sobre-nosotros' },
  { label: 'Proceso', to: '/empresa/proceso' },
];

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios', subItems: serviciosSubItems },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Empresa', to: '/empresa', subItems: empresaSubItems },
  { label: 'Contacto', to: '/contacto' },
];

function isNavLinkActive(link: typeof navLinks[0], pathname: string): boolean {
  if (link.subItems) {
    return link.subItems.some((sub) => pathname.startsWith(sub.to));
  }
  if (link.to === '/') return pathname === '/';
  return pathname.startsWith(link.to);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/assets/logo.svg" alt="EditFlowAI" className="w-8 h-8 rounded-lg" />
            <span className="font-display font-bold text-lg text-white tracking-tight">
              EditFlow<span className="text-brand-purple">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center h-full">
            {navLinks.map((link) => (
              <div key={link.to} className="relative group flex items-center">
                {link.subItems ? (
                  <>
                    <Link
                      to={link.to}
                      className={`px-3.5 py-2 text-sm transition-colors inline-flex items-center gap-1 ${
                        isNavLinkActive(link, location.pathname)
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-40" />
                    </Link>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-brand-card border border-white/[0.08] rounded-xl py-2 min-w-[200px] shadow-xl">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              location.pathname === sub.to
                                ? 'text-white bg-white/[0.05]'
                                : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.to}
                    className={`px-3.5 py-2 text-sm transition-colors ${
                      isNavLinkActive(link, location.pathname)
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-brand text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Empezar Proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/[0.06] mobile-menu-enter">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => !link.subItems && setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isNavLinkActive(link, location.pathname)
                      ? 'text-white bg-white/[0.05]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
                {link.subItems && (
                  <div className="pl-6">
                    {link.subItems.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                          location.pathname === sub.to
                            ? 'text-brand-purple bg-brand-purple/10'
                            : 'text-gray-500 hover:text-white'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-brand text-white font-medium rounded-lg"
            >
              Empezar Proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}