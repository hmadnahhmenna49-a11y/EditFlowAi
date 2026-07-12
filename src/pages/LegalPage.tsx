import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface LegalSection {
  title: string;
  content: string[];
}

interface LegalData {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const legalData: Record<string, LegalData> = {
  'politica-de-privacidad': {
    title: 'Política de Privacidad',
    lastUpdated: '1 de enero de 2025',
    sections: [
      {
        title: '1. Responsable del tratamiento',
        content: [
          'EditFlowAI, con domicilio social en C/ Perú, 61, 46701 Gandia, València, España, y NIF/CIF correspondiente, es la entidad responsable del tratamiento de los datos personales recogidos a través de este sitio web. En calidad de responsable del tratamiento, nos comprometemos a cumplir con la normativa vigente en materia de protección de datos personales, incluyendo el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD).',
          'Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactarnos a través de la dirección de correo electrónico contact@editflowai.com o mediante el número de teléfono +34 642 055 235. Nuestro delegado de protección de datos está disponible para atender cualquier solicitud o reclamación que desee presentar.',
        ],
      },
      {
        title: '2. Datos que recogemos',
        content: [
          'Recogemos datos personales cuando usted voluntariamente nos los proporciona al rellenar formularios de contacto, solicitar presupuestos, suscribirse a nuestro boletín informativo o contratar nuestros servicios. Los datos típicamente recogidos incluyen su nombre completo, dirección de correo electrónico, número de teléfono, nombre de la empresa y cualquier otra información que usted decida facilitarnos en el marco de la relación comercial.',
          'Asimismo, nuestro sitio web recoge automáticamente ciertos datos técnicos cuando usted lo visita, tales como su dirección IP, el tipo y versión de su navegador, las páginas que visita y la fecha y hora de acceso. Estos datos se recogen mediante cookies y tecnologías similares, cuya finalidad y configuración se detallan en nuestra Política de Cookies.',
          'En ningún caso recogeremos datos especiales o especialmente protegidos (salud, ideología, religión, etc.) sin su consentimiento expreso y, en su caso, sin las garantías adicionales exigidas por la legislación aplicable.',
        ],
      },
      {
        title: '3. Finalidad del tratamiento',
        content: [
          'Los datos personales que recogemos se utilizan exclusivamente para las siguientes finalidades: gestionar su solicitud de contacto o presupuesto, mantener la relación contractual derivada de la contratación de nuestros servicios, enviar comunicaciones comerciales sobre nuestros productos y servicios cuando usted haya dado su consentimiento expreso, y cumplir con las obligaciones legales que nos sean aplicables.',
          'Sus datos no serán utilizados para fines incompatibles con aquellos para los que fueron recogidos inicialmente. En caso de que deseemos utilizar sus datos para una finalidad diferente, le solicitaremos su consentimiento previo e informaremos sobre la nueva finalidad de forma clara y transparente.',
          'Tratamos sus datos de forma legítima, leal y transparente, garantizando siempre la protección de sus derechos y libertades conforme a la normativa vigente en materia de protección de datos personales en España y la Unión Europea.',
        ],
      },
      {
        title: '4. Base legal del tratamiento',
        content: [
          'El tratamiento de sus datos personales se basa en las siguientes bases jurídicas: el consentimiento que usted nos otorga al facilitarnos sus datos o al aceptar el envío de comunicaciones comerciales, la ejecución del contrato de prestación de servicios que usted haya formalizado con nosotros, el interés legítimo de EditFlowAI para gestionar la relación comercial y ofrecerle servicios personalizados, y el cumplimiento de obligaciones legales aplicables a nuestra actividad empresarial.',
          'Cuando el tratamiento se base en su consentimiento, usted tiene derecho a retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento realizado con anterioridad a la retirada del consentimiento. Para ejercer este derecho, puede contactarnos a través de los canales indicados en el apartado 1 de esta política.',
        ],
      },
      {
        title: '5. Conservación de los datos',
        content: [
          'Sus datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para determinar las posibles responsabilidades que se puedan derivar de dicho tratamiento. Los datos derivados de una relación contractual se conservarán durante la vigencia del contrato y, posteriormente, durante los plazos de prescripción legal aplicables.',
          'Una vez finalizado el periodo de conservación, los datos personales serán eliminados o anonimizados de forma segura, salvo que exista una obligación legal que exija su conservación por un plazo adicional. En cualquier caso, aplicaremos medidas de seguridad adecuadas para proteger los datos durante todo el periodo de conservación.',
        ],
      },
      {
        title: '6. Cesión de datos a terceros',
        content: [
          'EditFlowAI no cede ni vende sus datos personales a terceros. Únicamente podremos comunicar sus datos en los siguientes supuestos: a prestadores de servicios que nos asisten en la prestación de nuestros servicios (alojamiento web, envío de correos electrónicos, etc.), siempre bajo condiciones de confidencialidad y seguridad adecuadas; a las autoridades públicas competentes cuando sea requerido por ley o por resolución judicial firme; y a otras entidades del grupo empresarial cuando sea estrictamente necesario para la prestación del servicio contratado.',
          'En todos los casos de cesión, garantizaremos que el destinatario cumple con las obligaciones de protección de datos aplicables y que el tratamiento se realiza conforme a las instrucciones de EditFlowAI y bajo las mismas garantías que nosotros aplicamos.',
        ],
      },
      {
        title: '7. Sus derechos',
        content: [
          'Usted tiene derecho a acceder a sus datos personales, rectificar los datos inexactos o incompletos, solicitar la supresión de sus datos cuando ya no sean necesarios, oponerse al tratamiento cuando existan motivos legítimos, solicitar la limitación del tratamiento en determinadas circunstancias, y solicitar la portabilidad de sus datos en un formato estructurado y de uso común.',
          'Para ejercer cualquiera de estos derechos, puede enviar una solicitud a través de correo electrónico a contact@editflowai.com indicando su nombre, apellidos y la petición concreta que desea realizar. Resolveremos su solicitud en el plazo máximo de un mes desde su recepción. Asimismo, usted tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si considera que el tratamiento de sus datos vulnera la normativa vigente.',
        ],
      },
      {
        title: '8. Seguridad de los datos',
        content: [
          'EditFlowAI adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado. Entre estas medidas se incluyen el uso de protocolos de cifrado SSL/TLS, controles de acceso restrictivos, copias de seguridad periódicas y auditorías de seguridad regulares.',
          'A pesar de haber implementado todas las medidas de seguridad razonables, ningún sistema de transmisión de datos por Internet es completamente infalible. Por ello, no podemos garantizar una seguridad absoluta de la información transmitida a través de nuestra web, y le recomendamos que tome las precauciones necesarias para proteger sus datos personales cuando navegue por Internet.',
        ],
      },
    ],
  },
  'terminos-de-servicio': {
    title: 'Términos de Servicio',
    lastUpdated: '1 de enero de 2025',
    sections: [
      {
        title: '1. Aceptación de los términos',
        content: [
          'Al acceder y utilizar el sitio web de EditFlowAI (editflowai.com), usted acepta quedar vinculado por los presentes Términos de Servicio, así como por nuestra Política de Privacidad y Política de Cookies. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice nuestro sitio web ni nuestros servicios.',
          'EditFlowAI se reserva el derecho de modificar estos Términos de Servicio en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web. El uso continuado del sitio web tras la publicación de las modificaciones constituirá su aceptación de los nuevos términos. Le recomendamos revisar periódicamente esta página para estar al tanto de los cambios.',
        ],
      },
      {
        title: '2. Descripción de los servicios',
        content: [
          'EditFlowAI es un proyecto emprendedor que ofrece servicios de desarrollo web, desarrollo de aplicaciones móviles, gestión de campañas publicitarias y consultoría tecnológica, con el apoyo de herramientas de inteligencia artificial. Los servicios específicos, su alcance, plazo de ejecución y condiciones económicas se detallarán en la propuesta comercial o contrato de prestación de servicios que se firme entre las partes para cada proyecto concreto.',
          'Los servicios se prestarán con la diligencia y profesionalidad adecuadas, siguiendo las mejores prácticas del sector y las metodologías de trabajo acordadas con el cliente. EditFlowAI se compromete a dedicar los recursos técnicos necesarios para la correcta ejecución de cada proyecto según las especificaciones acordadas.',
        ],
      },
      {
        title: '3. Obligaciones del cliente',
        content: [
          'El cliente se compromete a proporcionar a EditFlowAI toda la información, documentación, materiales y accesos necesarios para la correcta ejecución de los servicios contratados en los plazos acordados. La demora en la provisión de estos materiales por parte del cliente podrá implicar la extensión proporcional de los plazos de entrega.',
          'El cliente es responsable de la veracidad y exactitud de la información que facilite a EditFlowAI. Asimismo, el cliente se compromete a respetar los derechos de propiedad intelectual e industrial de terceros en los materiales que proporcione para la ejecución del proyecto, eximiendo a EditFlowAI de cualquier responsabilidad derivada del incumplimiento de esta obligación.',
          'El cliente deberá realizar las revisiones y aprobaciones oportunas en cada fase del proyecto según el cronograma acordado. La falta de respuesta del cliente en los plazos establecidos se considerará como aceptación tácita de los entregables correspondientes.',
        ],
      },
      {
        title: '4. Propiedad intelectual',
        content: [
          'Todos los contenidos del sitio web de EditFlowAI, incluyendo pero no limitándose a textos, gráficos, logotipos, iconos, imágenes, código fuente, diseño y estructura, son propiedad de EditFlowAI o de sus legítimos titulares y están protegidos por las leyes de propiedad intelectual e industrial aplicables. Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra actividad que pueda realizarse con los contenidos sin la autorización previa y por escrito de EditFlowAI.',
          'Salvo acuerdo en contrario expresado en el contrato de prestación de servicios correspondiente, la propiedad intelectual de los productos y entregables generados en el marco de un proyecto se cederá al cliente una vez que se haya producido el pago íntegro de los honorarios acordados. Hasta ese momento, la propiedad intelectual corresponderá a EditFlowAI.',
          'EditFlowAI se reserva el derecho a utilizar los conocimientos técnicos, metodologías, herramientas y experiencias adquiridas durante la ejecución de un proyecto para otros proyectos futuros, siempre que no se divulgue información confidencial del cliente ni se utilice código específico desarrollado a medida para el cliente sin su autorización expresa.',
        ],
      },
      {
        title: '5. Precios y forma de pago',
        content: [
          'Los precios de los servicios de EditFlowAI se detallan en la propuesta comercial o contrato correspondiente para cada proyecto. Salvo acuerdo en contrario, los precios no incluyen impuestos, tasas ni gastos que puedan ser aplicables según la legislación vigente. EditFlowAI se reserva el derecho de modificar sus tarifas generales de servicios en cualquier momento, si bien dichas modificaciones no afectarán a los proyectos ya contratados.',
          'Las condiciones de pago se especificarán en el contrato de prestación de servicios. Habitualmente, los proyectos se facturan mediante pagos fraccionados asociados a los hitos o milestones del proyecto. Los pagos deberán realizarse en la forma y plazos indicados en la factura correspondiente. El retraso en el pago podrá generar intereses de demora y la suspensión temporal de los servicios hasta la regularización del pago.',
        ],
      },
      {
        title: '6. Confidencialidad',
        content: [
          'Ambas partes se comprometen a mantener en estricta confidencialidad toda la información recibida de la otra parte en el marco de la relación comercial, incluyendo información técnica, comercial, financiera o de cualquier otra índole que se considere confidencial o que se identifique como tal. Esta obligación de confidencialidad persistirá durante la vigencia de la relación comercial y durante un plazo de cinco años tras su finalización.',
          'La obligación de confidencialidad no será aplicable a la información que: sea de dominio público al momento de su recepción o pase a serlo posteriormente por causas no imputables a la parte receptora; haya sido recibida de terceros sin obligación de confidencialidad; sea requerida por autoridad judicial o administrativa competente; o deba ser revelada para el ejercicio de derechos legítimos ante tribunales o autoridades administrativas.',
        ],
      },
      {
        title: '7. Limitación de responsabilidad',
        content: [
          'EditFlowAI no será responsable de los daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso del sitio web o de los servicios prestados, incluyendo pero no limitándose a la pérdida de beneficios, pérdida de datos, interrupción del negocio o cualquier otro daño económico, incluso cuando EditFlowAI haya sido advertida de la posibilidad de tales daños.',
          'La responsabilidad total de EditFlowAI frente al cliente por cualquier reclamación derivada del contrato de prestación de servicios no excederá el importe total de los honorarios efectivamente pagados por el cliente en el proyecto que dé lugar a la reclamación. Esta limitación no será aplicable en caso de dolo o negligencia grave de EditFlowAI.',
          'El sitio web puede contener enlaces a sitios web de terceros. EditFlowAI no se responsabiliza del contenido, las políticas de privacidad ni las prácticas de sitios web de terceros. La inclusión de enlaces en nuestro sitio web no implica nuestra aprobación, respaldo o recomendación de dichos sitios web o de sus contenidos.',
        ],
      },
      {
        title: '8. Legislación aplicable y jurisdicción',
        content: [
          'Los presentes Términos de Servicio se rigen por la legislación española. Para la resolución de cualquier controversia que pueda surgir en relación con estos términos o con los servicios prestados por EditFlowAI, las partes se someterán a los Juzgados y Tribunales de Gandia, València, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.',
          'En caso de que alguna de las cláusulas de estos Términos de Servicio sea declarada nula o inaplicable por resolución judicial firme, el resto de las cláusulas continuarán en vigor y se interpretarán de manera que se mantenga el espíritu y propósito de los términos originales en la mayor medida posible conforme a la legislación aplicable.',
        ],
      },
    ],
  },
  'aviso-legal': {
    title: 'Aviso Legal',
    lastUpdated: '1 de enero de 2025',
    sections: [
      {
        title: '1. Datos identificativos',
        content: [
          'En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSICE), se facilitan los siguientes datos identificativos del titular de este sitio web: EditFlowAI, con domicilio social en C/ Perú, 61, 46701 Gandia, València, España. Los datos de contacto incluyen la dirección de correo electrónico contact@editflowai.com y el número de teléfono +34 642 055 235.',
          'EditFlowAI está debidamente constituida como empresa de acuerdo con la legislación española vigente y se encuentra inscrita en el registro mercantil correspondiente. Nuestra actividad principal consiste en la prestación de servicios de desarrollo web, desarrollo de aplicaciones móviles, marketing digital y consultoría tecnológica.',
        ],
      },
      {
        title: '2. Objeto del sitio web',
        content: [
          'El sitio web editflowai.com tiene como finalidad principal la presentación de los servicios que ofrece EditFlowAI, así como facilitar la comunicación con potenciales clientes y el contacto comercial. A través de este sitio web, los usuarios pueden conocer nuestra oferta de servicios, consultar nuestro portfolio de proyectos, acceder a información sobre nuestra empresa y enviar solicitudes de contacto o presupuestos.',
          'El contenido del sitio web tiene carácter meramente informativo y no constituye una oferta vinculante. Las condiciones específicas de cada servicio se detallarán en la propuesta comercial o contrato de prestación de servicios que se elabore para cada proyecto en particular.',
        ],
      },
      {
        title: '3. Condiciones de uso',
        content: [
          'El acceso y la utilización del sitio web de EditFlowAI atribuye la condición de usuario e implica la aceptación plena de todas las condiciones incluidas en este Aviso Legal. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que EditFlowAI ofrece a través de su sitio web, actuando de buena fe, respetando la legislación vigente y los derechos de propiedad intelectual e industrial.',
          'Queda expresamente prohibido cualquier uso del sitio web que contravenga la ley, la moral, el orden público o los derechos de terceros. En particular, queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra actividad que se pueda realizar con los contenidos del sitio web sin autorización previa y por escrito de EditFlowAI.',
        ],
      },
      {
        title: '4. Propiedad intelectual e industrial',
        content: [
          'Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de EditFlowAI o de terceros que han autorizado su uso, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos.',
          'El nombre comercial "EditFlowAI", el logotipo y las marcas asociadas son propiedad de EditFlowAI y están protegidos por las leyes de propiedad industrial aplicables. Su uso sin autorización expresa y por escrito de EditFlowAI constituye una infracción de los derechos de propiedad industrial y será perseguido conforme a la legislación vigente.',
        ],
      },
      {
        title: '5. Exclusión de responsabilidad',
        content: [
          'EditFlowAI no se hace responsable de los daños y perjuicios de cualquier naturaleza que puedan derivarse del uso del sitio web, incluyendo pero no limitándose a errores u omisiones en los contenidos, falta de disponibilidad del sitio web, o la transmisión de virus o programas maliciosos, siempre que no le sean imputables de forma directa. El sitio web se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo.',
          'EditFlowAI no garantiza la disponibilidad continua e ininterrumpida del sitio web. En caso de que el sitio web no esté disponible por cualquier motivo, EditFlowAI hará todo lo razonablemente posible para restaurar el servicio lo antes posible, sin que ello genere derecho a indemnización alguna para el usuario.',
        ],
      },
      {
        title: '6. Política de enlaces',
        content: [
          'El sitio web de EditFlowAI puede contener enlaces a sitios web de terceros. Dichos enlaces se proporcionan únicamente con fines informativos y no implican la aprobación, respaldo o recomendación de los contenidos de los sitios enlazados. EditFlowAI no se responsabiliza del contenido, la política de privacidad, las prácticas ni las opiniones de sitios web de terceros.',
          'Si usted es titular de un sitio web y desea incluir un enlace hacia nuestro sitio web, le rogamos que nos lo comunique a través de contact@editflowai.com. EditFlowAI se reserva el derecho de solicitar la eliminación de cualquier enlace que dirija a su sitio web cuando considere que dicho enlace puede resultar perjudicial para su imagen, reputación o intereses comerciales.',
        ],
      },
      {
        title: '7. Comunicaciones comerciales',
        content: [
          'De acuerdo con la Ley 34/2002 de Servicios de la Sociedad de la Información y el Comercio Electrónico, EditFlowAI solo enviará comunicaciones comerciales por correo electrónico a aquellos usuarios que hayan prestado su consentimiento expreso, previo e informado para recibir dichas comunicaciones. El usuario podrá revocar su consentimiento en cualquier momento a través del enlace de baja incluido en cada comunicación comercial o contactando directamente a contact@editflowai.com.',
          'Las comunicaciones comerciales enviadas por EditFlowAI incluirán siempre una identificación clara del remitente y respetarán en todo momento la normativa vigente en materia de comunicaciones electrónicas comerciales. No se enviarán comunicaciones con contenido engañoso, fraudulento o que pueda inducir a error al destinatario.',
        ],
      },
      {
        title: '8. Resolución de conflictos',
        content: [
          'EditFlowAI y el usuario se comprometen a resolver de forma amistosa cualquier controversia que pueda surgir en relación con el uso de este sitio web o la interpretación de este Aviso Legal. En caso de no alcanzarse un acuerdo amistoso, el conflicto se someterá a los Juzgados y Tribunales de Gandia, València, que será la jurisdicción competente para la resolución de cualquier litigio.',
          'Para los usuarios que actúen en calidad de consumidores, se pondrá a su disposición la plataforma europea de resolución de litigios en línea (ODR) accesible a través del enlace https://ec.europa.eu/consumers/odr, sin perjuicio de la posibilidad de acudir a los tribunales competentes conforme a la legislación española aplicable.',
        ],
      },
    ],
  },
  'cookies': {
    title: 'Política de Cookies',
    lastUpdated: '1 de enero de 2025',
    sections: [
      {
        title: '1. ¿Qué son las cookies?',
        content: [
          'Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario (ordenador, tableta, teléfono móvil) cuando visita un sitio web. Las cookies permiten que el sitio web recuerde información sobre su visita, como sus preferencias de idioma, las páginas que ha visitado anteriormente y otras configuraciones que hacen su experiencia de navegación más cómoda y personalizada.',
          'Las cookies son ampliamente utilizadas en Internet para que los sitios web funcionen de manera más eficiente, para proporcionar información a los propietarios del sitio web y para personalizar la experiencia del usuario. No todas las cookies son iguales: algunas son esenciales para el funcionamiento del sitio web, mientras que otras se utilizan para mejorar el rendimiento o recopilar información sobre el comportamiento del usuario.',
        ],
      },
      {
        title: '2. Tipos de cookies que utilizamos',
        content: [
          'EditFlowAI utiliza los siguientes tipos de cookies en su sitio web: Cookies técnicas necesarias, que son imprescindibles para el funcionamiento del sitio web y permiten la navegación y el uso de funciones básicas como el acceso a áreas seguras. Sin estas cookies, el sitio web no puede funcionar correctamente.',
          'Cookies analíticas, que nos permiten conocer el número de visitantes y cómo estos navegan por nuestro sitio web. Utilizamos Google Analytics para recopilar información de forma anónima sobre las páginas visitadas, el tiempo de permanencia, el dispositivo utilizado y la fuente de tráfico. Esta información nos ayuda a mejorar continuamente nuestro sitio web y los servicios que ofrecemos.',
          'Cookies de preferencias, que permiten que el sitio web recuerde información que cambia la forma en que el sitio web se comporta o se ve, como su idioma preferido o la región en la que se encuentra. Estas cookies no recopilan información que identifique al visitante de forma individual.',
        ],
      },
      {
        title: '3. Cookies de terceros',
        content: [
          'Algunas cookies son instaladas por servicios de terceros que aparecen en nuestras páginas. No controlamos la configuración de estas cookies y le recomendamos que consulte los sitios web de estos terceros para obtener más información sobre sus cookies y cómo gestionarlas. Las principales cookies de terceros que podemos utilizar son las de Google Analytics para el análisis del tráfico web.',
          'EditFlowAI no utiliza cookies publicitarias de terceros ni redes de publicidad comportamental en su sitio web. No compartimos información de navegación de los usuarios con redes publicitarias ni plataformas de remarketing. Nuestro compromiso es mantener la privacidad del usuario como prioridad en todas las interacciones con nuestro sitio web.',
        ],
      },
      {
        title: '4. ¿Cómo gestionar las cookies?',
        content: [
          'Puede configurar su navegador para bloquear o alertar sobre la instalación de cookies en su dispositivo. La mayoría de navegadores permiten configurar el consentimiento de cookies a través de las opciones de configuración. Sin embargo, si bloquea todas las cookies, es posible que algunas funcionalidades del sitio web no funcionen correctamente.',
          'Para configurar las cookies en los navegadores más comunes, puede consultar las secciones de ayuda o configuración de su navegador: Google Chrome, Mozilla Firefox, Safari, Microsoft Edge u Opera. También puede visitar el sitio web allaboutcookies.org para obtener información detallada sobre cómo gestionar las cookies en diferentes navegadores y dispositivos.',
          'Cuando visite nuestro sitio web por primera vez, se le mostrará un banner informativo sobre el uso de cookies, donde podrá aceptar todas las cookies, rechazar las cookies no esenciales, o personalizar su configuración de cookies según sus preferencias. Su elección se guardará para futuras visitas.',
        ],
      },
      {
        title: '5. Actualizaciones de la política de cookies',
        content: [
          'EditFlowAI se reserva el derecho de actualizar la presente Política de Cookies para reflejar cambios en las cookies que utilizamos o por otros motivos operativos, legales o regulatorios. Le recomendamos que visite esta página periódicamente para estar informado sobre el uso de cookies en nuestro sitio web.',
          'Cualquier cambio significativo en esta Política de Cookies será notificado a los usuarios a través de una nota destacada en nuestro sitio web. La fecha de última actualización que aparece al principio de esta página indica cuándo se revisó por última vez la política de forma sustancial.',
        ],
      },
      {
        title: '6. Contacto',
        content: [
          'Si tiene cualquier pregunta, consulta o reclamación sobre nuestra Política de Cookies o sobre el uso que hacemos de las cookies en nuestro sitio web, puede contactarnos a través de la dirección de correo electrónico contact@editflowai.com o mediante el número de teléfono +34 642 055 235. Estaremos encantados de ayudarle a resolver cualquier duda que pueda tener.',
          'Puedo proporcionar información adicional sobre las cookies específicas que utilizo, su finalidad, su duración y cómo puede gestionarlas. Asimismo, si desea ejercer sus derechos en relación con el tratamiento de sus datos personales recogidos a través de cookies, puede hacerlo conforme a lo establecido en nuestra Política de Privacidad.',
        ],
      },
    ],
  },
};

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? legalData[slug] : undefined;

  if (!data) {
    return (
      <div className="pt-40 pb-20 text-center">
        <p className="text-gray-400 text-lg">Página legal no encontrada.</p>
        <Link to="/" className="text-brand-purple hover:underline mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Simple hero for legal pages */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-purple transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            {data.title}
          </h1>
          <p className="text-gray-500 text-sm mt-3">
            Última actualización: {data.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-card rounded-2xl p-8 sm:p-10 space-y-10">
            {data.sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-semibold text-lg sm:text-xl text-white mb-4">
                  {section.title}
                </h2>
                {section.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-gray-400 leading-relaxed mb-3 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}