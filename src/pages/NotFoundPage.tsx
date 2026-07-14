import { Link } from 'react-router';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display font-bold text-8xl sm:text-9xl lg:text-[12rem] text-gradient leading-none mb-6">
          404
        </h1>
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación. Puedes volver al inicio para seguir navegando.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-all"
        >
          <Home className="w-5 h-5" />
          Volver al inicio
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}