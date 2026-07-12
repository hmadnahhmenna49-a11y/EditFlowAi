import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServiciosPage from './pages/ServiciosPage';
import ServicioDetallePage from './pages/ServicioDetallePage';
import EmpresaPage from './pages/EmpresaPage';
import ProcesoPage from './pages/ProcesoPage';
import ProyectosPage from './pages/ProyectosPage';
import ContactoPage from './pages/ContactoPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="servicios" element={<ServiciosPage />} />
          <Route path="servicios/:slug" element={<ServicioDetallePage />} />
          <Route path="empresa" element={<EmpresaPage />} />
          <Route path="empresa/sobre-nosotros" element={<EmpresaPage />} />
          <Route path="empresa/proceso" element={<ProcesoPage />} />
          <Route path="proyectos" element={<ProyectosPage />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="legal/:slug" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}