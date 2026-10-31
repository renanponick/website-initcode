import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import ProductCatalog from '../../components/ProductCatalog';
import './styles.css';

export default function RecomendationShowcase() {
  return (
    <div className="products-page">
      <PageMeta title="Minhas indicações" description="Notebooks, itens de setup, equipamentos e livros indicados pela Init Code. A Init Code não vende estes itens." />
      <section className="products-page__hero page-section">
        <div className="app-container">
          <div className="page-header">
            <p className="eyebrow">Indicações da Init Code</p>
            <h1>Itens que recomendo para estudar, trabalhar e criar</h1>
            <p>Esta página não é uma loja. Reuni notebooks, itens de setup, equipamentos e livros que uso ou indico. A compra acontece em sites externos.</p>
          </div>
          <div className="products-page__quick-links">
            <Link className="button button--secondary" to="/notebooks">Ler guia de notebooks</Link>
          </div>
        </div>
      </section>
      <section className="app-container products-page__catalog" aria-label="Itens indicados pela Init Code">
        <ProductCatalog />
      </section>
    </div>
  );
}

