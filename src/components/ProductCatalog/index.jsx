import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../../services/productSource';
import ProductCard from './ProductCard';
import './styles.css';

const sourceUrl = import.meta.env.VITE_PRODUCTS_CSV_URL?.trim();

export default function ProductCatalog() {
  const [state, setState] = useState({ status: 'loading', products: [], source: '' });
  const [category, setCategory] = useState('Todas');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', products: [], source: '' });
    fetchProducts(sourceUrl, { signal: controller.signal })
      .then(({ products, source }) => setState({ status: 'success', products, source }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', products: [], error: error.message, source: '' });
      });
    return () => controller.abort();
  }, [reloadKey]);

  const categories = useMemo(() => ['Todas', ...new Set(state.products.map((product) => product.category))], [state.products]);
  const visibleProducts = category === 'Todas' ? state.products : state.products.filter((product) => product.category === category);

  if (state.status === 'loading') {
    return <div className="status-panel" role="status">Carregando indicações…</div>;
  }

  if (state.status === 'error') {
    return (
      <div className="status-panel status-panel--error" role="alert">
        <p>{state.error}</p>
        <button className="button button--primary" type="button" onClick={() => setReloadKey((key) => key + 1)}>Tentar novamente</button>
      </div>
    );
  }

  if (!state.products.length) {
    return <div className="status-panel"><p>Nenhuma indicação disponível no momento.</p></div>;
  }

  return (
    <div className="product-catalog">
      <div className="catalog-toolbar">
        <label htmlFor="category-filter">Categoria</label>
        <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <span aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? 'item indicado' : 'itens indicados'}</span>
      </div>

      {!visibleProducts.length ? (
        <div className="status-panel">
          <p>Nenhuma indicação corresponde a este filtro.</p>
          <button className="button button--secondary" type="button" onClick={() => setCategory('Todas')}>Limpar filtro</button>
        </div>
      ) : (
        <div className="catalog-sections">
          {categories.filter((item) => item !== 'Todas' && (category === 'Todas' || category === item)).map((item) => {
            const products = visibleProducts.filter((product) => product.category === item);
            return (
              <section className="catalog-section" key={item} aria-labelledby={`category-${item.replace(/\W+/g, '-').toLowerCase()}`}>
                <div className="catalog-section__header">
                  <h2 id={`category-${item.replace(/\W+/g, '-').toLowerCase()}`}>{item}</h2>
                  <p>Seleção pessoal por uso. Confira preço, disponibilidade e detalhes no site externo.</p>
                </div>
                <div className="catalog-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
              </section>
            );
          })}
        </div>
      )}

      <p className="catalog-disclosure">
        A Init Code não vende estes itens. Os links levam a lojas externas e alguns podem gerar comissão, sem alterar o preço para você. Fonte: {state.source === 'sheet' ? 'planilha publicada' : 'lista local de indicações'}.
      </p>
    </div>
  );
}

