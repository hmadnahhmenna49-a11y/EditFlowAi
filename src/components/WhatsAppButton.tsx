import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/34642055235?text=Hola%20EditFlowAI,%20me%20interesa%20conversar%20sobre%20un%20proyecto"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Label that appears on hover */}
      <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap text-sm font-medium text-white bg-brand-card/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 pointer-events-none shadow-lg">
        WhatsApp
      </span>
      {/* Button with glass premium background */}
      <span
        className="relative w-16 h-16 rounded-full flex items-center justify-center glass-premium sonar-pulse transition-transform duration-300 group-hover:scale-110"
        style={{
          boxShadow: '0 4px 24px rgba(34, 197, 94, 0.25), inset 0 0 0 2px rgba(34, 197, 94, 0.3)',
        }}
      >
        <MessageCircle className="w-8 h-8 text-green-400" />
      </span>
    </a>
  );
}