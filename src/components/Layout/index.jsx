import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import './styles.css';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.focus({ preventScroll: true });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <Header />
      <main id="main-content" className="app-shell__content" tabIndex="-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
