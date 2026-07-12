'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Cookie, X, Shield, ChevronRight } from 'lucide-react';

const COOKIE_KEY = 'editflowai_cookies_accepted';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user already accepted
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      // Show after a short delay
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'all');
    handleClose();
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, 'essential');
    handleClose();
  };

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 400);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 ${
        exiting ? 'cookie-slide-down' : 'cookie-slide-up'
      }`}
    >
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div className="glass-premium rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40 gradient-border-box overflow-hidden">
          {/* Decorative gradient accent at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-purple" />

          <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
            {/* Icon */}
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 border border-brand-purple/20 flex items-center justify-center sonar-pulse">
              <Cookie className="w-6 h-6 sm:w-7 sm:h-7 text-brand-purple" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display font-semibold text-white text-lg">
                  🍪 Utilizamos Cookies
                </h3>
                <Shield className="w-4 h-4 text-brand-cyan/60" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-1">
                Utilizamos cookies propios y de terceros para mejorar tu experiencia de navegación,
                analizar el tráfico del sitio y personalizar contenido. Puedes aceptar todas las cookies,
                rechazar las no esenciales o configurar tus preferencias.
              </p>

              {/* Expandable details */}
              {showDetails && (
                <div className="mt-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-gray-400 leading-relaxed space-y-2">
                  <p>
                    <span className="text-white font-medium">Cookies esenciales:</span> Necesarias para el funcionamiento básico del sitio.
                  </p>
                  <p>
                    <span className="text-white font-medium">Cookies analíticas:</span> Nos ayudan a entender cómo interactúas con el sitio.
                  </p>
                  <p>
                    <span className="text-white font-medium">Cookies de marketing:</span> Utilizadas para mostrarte anuncios relevantes.
                  </p>
                  <Link
                    to="/legal/cookies"
                    onClick={handleClose}
                    className="inline-flex items-center gap-1 text-brand-purple hover:text-brand-purple-light text-xs mt-2 animated-underline"
                  >
                    Leer política completa de cookies
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={handleAccept}
                  className="btn-glow px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-sm font-medium rounded-xl"
                >
                  Acceptar todas
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-brand-purple hover:text-brand-purple-light text-sm font-medium animated-underline transition-colors"
                >
                  {showDetails ? 'Ocultar detalles' : 'Más información'}
                </button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}