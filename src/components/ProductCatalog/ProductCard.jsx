import { useState } from 'react';
import PropTypes from 'prop-types';

const productShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  priceRange: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string,
  updatedAt: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.string,
  offers: PropTypes.arrayOf(PropTypes.shape({ store: PropTypes.string.isRequired, url: PropTypes.string.isRequired })).isRequired,
});

function formatPrice(product) {
  if (!product.price) return 'Consulte o preço na loja externa';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: product.currency || 'BRL' }).format(product.price);
}

export default function ProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="catalog-card">
      <div className="catalog-card__media">
        {product.imageUrl && !imageFailed ? (
          <img src={product.imageUrl} alt="" loading="lazy" width="300" height="220" onError={() => setImageFailed(true)} />
        ) : (
          <div className="catalog-card__placeholder" role="img" aria-label={`Imagem indisponível para ${product.name}`}>Init Code</div>
        )}
      </div>
      <div className="catalog-card__content">
        {product.badge && <span className="catalog-card__badge">{product.badge}</span>}
        <h3>{product.name}</h3>
        {product.description && <p>{product.description}</p>}
        <p className="catalog-card__price">{formatPrice(product)}</p>
        {product.updatedAt && <small>Referência atualizada em {product.updatedAt}</small>}
        <div className="catalog-card__links">
          {product.offers.length ? product.offers.map((offer) => (
            <a className="button button--primary" key={`${product.id}-${offer.store}`} href={offer.url} target="_blank" rel="noopener noreferrer sponsored" aria-label={`${product.name} na ${offer.store} (abre em nova aba)`}>
              Ver na {offer.store}
            </a>
          )) : <p className="catalog-card__unavailable">Link externo em atualização.</p>}
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = { product: productShape.isRequired };

