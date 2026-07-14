import { useState, type FormEvent } from 'react';
import { CheckCircle, Send, Mail, Phone, MapPin } from 'lucide-react';
import { useInView } from '../AppSections';

export default function Contacto() {
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/hmadnahhmenna49@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          _subject: `Nuevo mensaje de ${formData.get('name')} — EditFlowAI`,
        }),
      });

      if (response.ok) {
        setFormState('sent');
        form.reset();
      } else {
        setFormState('error');
        setErrorMsg('Hubo un error al enviar. Intenta de nuevo.');
      }
    } catch {
      setFormState('error');
      setErrorMsg('Error de conexión. Verifica tu internet e intenta de nuevo.');
    }
  };

  return (
    <section id="contacto" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/3 to-transparent" />
      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-purple font-medium text-sm uppercase tracking-wider">
            Contacto
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4">
            Hablemos de tu <span className="text-gradient">próximo proyecto</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cuéntanos qué necesitas y te responderemos en menos de 24 horas.
            Tu éxito empieza con una conversación.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Formulario */}
          <div className="lg:col-span-3">
            <div className="bg-brand-card border border-white/5 rounded-2xl p-6 sm:p-8">
              {formState === 'sent' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Te responderemos en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="text-brand-purple hover:text-brand-purple-light text-sm underline underline-offset-4 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-300 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-brand-dark border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
                        Email corporativo
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-brand-dark border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                        placeholder="tu@empresa.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm text-gray-300 mb-2">
                      Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-brand-dark border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="web">Desarrollo Web</option>
                      <option value="app">Aplicación Móvil</option>
                      <option value="marketing">Campañas Publicitarias</option>
                      <option value="other">Otro proyecto</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-300 mb-2">
                      Cuéntanos sobre tu proyecto
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-brand-dark border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none"
                      placeholder="¿Qué necesitas? ¿Cuáles son tus objetivos?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {formState === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {formState === 'error' && (
                    <div className="text-center">
                      <p className="text-red-400 text-sm">{errorMsg}</p>
                      <button
                        type="button"
                        onClick={() => setFormState('idle')}
                        className="text-brand-purple hover:text-brand-purple-light text-sm underline underline-offset-4 mt-2 transition-colors"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Info + Mapa */}
          <div className="lg:col-span-2 space-y-6">
            {/* Datos de contacto */}
            <div className="bg-brand-card border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-display font-semibold text-lg text-white">
                Información de contacto
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:contact@editflowai.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-brand-purple transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple/20 transition-colors">
                    <Mail className="w-5 h-5 text-brand-purple" />
                  </div>
                  <span className="text-sm">contact@editflowai.com</span>
                </a>
                <a
                  href="tel:+34642055235"
                  className="flex items-center gap-4 text-gray-300 hover:text-brand-purple transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
                    <Phone className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <span className="text-sm">+34 642 055 235</span>
                </a>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-purple" />
                  </div>
                  <span className="text-sm">C/ Perú, 61, 46701 Gandia, València</span>
                </div>
              </div>
            </div>

            {/* Mapa embebido */}
            <div className="rounded-2xl overflow-hidden border border-white/5 aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.0!2d-0.1833!3d38.9667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU4JzAwLjAiTiAwwrAxMCcwMC4wIlc!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de EditFlowAI en Gandia, València"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}