import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';

export default function NotFound() {
  return (
    <section className="page-section app-container">
      <PageMeta title="Página não encontrada" description="A página solicitada não foi encontrada na Init Code." />
      <div className="page-header">
        <p className="eyebrow">Erro 404</p>
        <h1>Página não encontrada</h1>
        <p>O endereço pode ter mudado ou não existir.</p>
      </div>
      <Link className="button button--primary" to="/">Voltar ao início</Link>
    </section>
  );
}
