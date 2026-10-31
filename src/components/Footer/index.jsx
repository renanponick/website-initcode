import Midia from '../Midia';
import './styles.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner app-container">
        <div><strong>Init Code</strong><p>Programação clara, prática e direta.</p></div>
        <Midia />
        <small>&copy; {new Date().getFullYear()} Init Code. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}
