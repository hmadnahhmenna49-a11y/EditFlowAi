interface PageHeroProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description?: string;
}

export default function PageHero({ badge, title, titleHighlight, description }: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-24 sm:pt-48 sm:pb-32 overflow-hidden aurora-bg">
      {/* Floating particles */}
      <div className="floating-particles absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-brand-purple/40" />
        <span className="absolute top-[40%] right-[25%] w-1.5 h-1.5 rounded-full bg-brand-cyan/30" />
        <span className="absolute bottom-[25%] left-[50%] w-1 h-1 rounded-full bg-white/20" />
      </div>

      {/* Mesh/grid background pattern */}
      <div className="absolute inset-0 mesh-bg" />

      {/* Background gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/8 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-purple/12 rounded-full blur-[180px] opacity-40" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-cyan/8 rounded-full blur-[120px] opacity-30" />

      {/* Morph blob decorative element */}
      <div className="morph-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/8 rounded-full blur-[150px] opacity-30 pointer-events-none" />

      {/* Additional floating decorative elements */}
      <div className="absolute top-16 right-[8%] w-2 h-2 rounded-full bg-brand-purple/30 float-slow" style={{ animationDelay: '0.2s' }} />
      <div className="absolute top-44 left-[8%] w-1.5 h-1.5 rounded-full bg-brand-cyan/25 float-medium" style={{ animationDelay: '0.7s' }} />
      <div className="absolute bottom-20 right-[15%] w-1 h-1 rounded-full bg-white/30 float-fast" style={{ animationDelay: '1.3s' }} />
      <div className="absolute top-56 right-[35%] text-brand-cyan/20 float-slow" style={{ animationDelay: '0.9s' }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="4" width="2" height="10" rx="1" /><rect y="4" width="10" height="2" rx="1" /></svg>
      </div>
      <div className="absolute bottom-32 right-[40%] text-brand-purple/15 float-medium" style={{ animationDelay: '1.8s' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="6" width="2" height="14" rx="1" /><rect y="6" width="14" height="2" rx="1" /></svg>
      </div>
      <div className="absolute top-36 left-[65%] w-2.5 h-2.5 rounded-full border border-brand-purple/20 float-slow" style={{ animationDelay: '0.5s' }} />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-[15%] w-1.5 h-1.5 rounded-full bg-brand-purple/40 float-slow" />
      <div className="absolute top-32 right-[20%] w-1 h-1 rounded-full bg-brand-cyan/50 float-medium" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-48 left-[25%] w-2 h-2 rounded-full bg-brand-purple/20 float-fast" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-24 right-[30%] w-1.5 h-1.5 rounded-full bg-brand-cyan/30 float-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-36 left-[40%] w-1 h-1 rounded-full bg-white/20 float-medium" style={{ animationDelay: '0.8s' }} />

      {/* Cross decorations */}
      <div className="absolute top-28 right-[12%] text-brand-purple/20 float-slow" style={{ animationDelay: '0.3s' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="5" width="2" height="12" rx="1" /><rect y="5" width="12" height="2" rx="1" /></svg>
      </div>
      <div className="absolute bottom-28 left-[18%] text-brand-cyan/15 float-medium" style={{ animationDelay: '1.2s' }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="4" width="2" height="10" rx="1" /><rect y="4" width="10" height="2" rx="1" /></svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge with animated rotating gradient border */}
        <div className="inline-block mb-8">
          <span className="relative inline-block text-brand-purple font-medium text-sm uppercase tracking-wider px-5 py-2 rounded-full rotating-gradient-border bg-brand-card/80 backdrop-blur-sm sonar-pulse holographic">
            {badge}
          </span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
          {title} <span className="text-shimmer">{titleHighlight}</span>
        </h1>

        {description && (
          <div className="relative">
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed blur-reveal">
              {description}
            </p>
            {/* Pulsing gradient separator below description */}
            <div className="mt-6 mx-auto w-32 h-0.5 separator-glow rounded-full" />
          </div>
        )}
      </div>
    </section>
  );
}