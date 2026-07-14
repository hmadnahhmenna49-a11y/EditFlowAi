interface PageHeroProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description?: string;
}

export default function PageHero({ badge, title, titleHighlight, description }: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-24 sm:pt-48 sm:pb-32">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-purple/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <span className="inline-block text-brand-purple font-medium text-sm uppercase tracking-wider mb-6">
            {badge}
          </span>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {title} <span className="text-gradient">{titleHighlight}</span>
          </h1>

          {description && (
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}