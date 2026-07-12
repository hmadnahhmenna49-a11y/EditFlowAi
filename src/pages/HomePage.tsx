import {
  Hero, Servicios, Metricas, Portfolio, Proceso, Testimonios
} from '../AppSections';
import Contacto from '../components/Contacto';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Servicios />
      <Metricas />
      <Portfolio />
      <Proceso />
      <Testimonios />
      <Contacto />
    </>
  );
}