import { Link } from 'react-router';
import { Search, Target, Palette, Code2, Rocket, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useInView } from '../AppSections';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Descubrimiento',
    duration: '1-2 semanas',
    description: 'Todo proyecto exitoso comienza con una comprensión profunda. En esta fase realizo entrevistas contigo, analizo tu mercado y competencia, defino los usuarios objetivos con detalle y establezco los objetivos de negocio medibles que guiarán todo el proyecto. También identifico riesgos potenciales y defino el presupuesto y cronograma preliminar.',
  },
  {
    icon: Target,
    number: '02',
    title: 'Estrategia',
    duration: '1 semana',
    description: 'Con la información recopilada en la fase de descubrimiento, diseño un roadmap técnico y creativo detallado. Defino la arquitectura tecnológica, las funcionalidades del MVP, los milestones del proyecto y los entregables de cada sprint. Creo un documento de especificación técnica que servirá como guía de referencia durante todo el desarrollo, asegurando alineación total contigo.',
  },
  {
    icon: Palette,
    number: '03',
    title: 'Diseño',
    duration: '2-3 semanas',
    description: 'Con la ayuda de herramientas de inteligencia artificial, creo prototipos interactivos de alta fidelidad que visualizan cada pantalla y flujo de usuario del producto. Realizo pruebas de usabilidad para validar las decisiones de diseño antes de empezar a programar. El resultado es un sistema de diseño completo que incluye tipografía, paleta de colores, componentes UI y guías de interacción.',
  },
  {
    icon: Code2,
    number: '04',
    title: 'Desarrollo',
    duration: '4-8 semanas',
    description: 'Programo tu producto utilizando código limpio, arquitectura escalable y las mejores prácticas del sector, con el apoyo de inteligencia artificial. Trabajo en sprints de 2 semanas con demostraciones al final de cada uno, para que puedas ver el progreso en tiempo real y dar feedback temprano. Implemento testing continuo, integración continua y revisión de código para garantizar la máxima calidad.',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Lanzamiento',
    duration: '1-2 semanas',
    description: 'Preparo el entorno de producción, realizo un QA exhaustivo, configuro el monitorizado y las alertas, y ejecuto el despliegue planificado. Tras el lanzamiento, realizo un seguimiento intensivo durante las primeras semanas para detectar y resolver cualquier incidencia rápidamente. Tu éxito es mi métrica principal y no considero un proyecto finalizado hasta que los resultados lo demuestran.',
  },
];

export default function ProcesoPage() {
  const { ref, inView } = useInView(0.1);

  return (
    <>
      <PageHero
        badge="Nuestro Proceso"
        title="De la idea al"
        titleHighlight="producto final"
        description="Un método probado en más de 150 proyectos que garantiza resultados excepcionales en cada fase del desarrollo."
      />

      <section className="pb-24 sm:pb-32">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-purple via-brand-cyan to-brand-purple" />

            <div className="space-y-12">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="relative flex items-start gap-6 pl-2"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    {/* Circle */}
                    <div className="w-12 h-12 rounded-full bg-brand-card border-2 border-brand-purple/50 flex items-center justify-center relative z-10 shrink-0 hover:border-brand-purple hover:shadow-glow transition-all duration-300">
                      <Icon className="w-5 h-5 text-brand-purple" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">
                          Paso {step.number}
                        </span>
                        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-brand-purple/10 via-brand-card to-brand-cyan/10 border border-white/5">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-4">
              ¿Listo para empezar tu proyecto?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Cuéntanos tu idea y te prepararemos una propuesta personalizada con cronograma, presupuesto y alcance detallado sin ningún compromiso.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-glow"
            >
              Empezar proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}