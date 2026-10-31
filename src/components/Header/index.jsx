import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoDark from '../../assets/logo-dark.svg';
import './styles.css';

const navigation = [
  { to: '/', label: 'Início', end: true },
  { to: '/courses', label: 'Cursos' },
  { to: '/recomendation-showcase', label: 'Indicações' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navigationRef = useRef(null);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (menuOpen) navigationRef.current?.querySelector('button')?.focus();
    const handleKeyboard = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === 'Tab' && menuOpen) {
        const focusable = [...navigationRef.current.querySelectorAll('button, a')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner app-container">
        <Link className="site-header__brand" to="/" aria-label="Init Code — página inicial">
          <img src={logoDark} alt="" className="site-header__logo" width="120" height="72" />
        </Link>
        <button ref={menuButtonRef} className="site-header__menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen((current) => !current)}>
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        {menuOpen && <button className="site-header__backdrop" type="button" aria-label="Fechar menu" onClick={closeMenu} />}
        <nav ref={navigationRef} id="primary-navigation" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Navegação principal">
          <button className="site-nav__close" type="button" onClick={closeMenu} aria-label="Fechar menu"><span aria-hidden="true">×</span></button>
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : undefined}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="site-nav__secondary">
            <Link to="/language-recomendation" onClick={closeMenu}>Descobrir linguagem</Link>
            <Link to="/notebooks" onClick={closeMenu}>Guia de notebooks</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
