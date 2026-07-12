import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CookieConsent from './CookieConsent';

export default function Layout() {
  return (
    <div className="min-h-screen bg-brand-dark text-white relative">
      {/* Subtle background texture for entire site */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.04)_0%,transparent_50%)]" />
      </div>
      <div className="relative z-10">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}