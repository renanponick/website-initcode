import "../../pages/Recomendation/styles.css";

export default function ProductCard({ item }) {
  return (
    <article className="card">
      <div className="card__media">
        {item?.img ? (
          <img src={item.img} alt={item.title} loading="lazy" />
        ) : (
          <div className="card__noimg">Sem imagem</div>
        )}
      </div>
      <div className="card__body">
        <h4 className="card__name">{item?.title}</h4>
        <div className="card__links">
          {item?.linkAmazon && (
            <a href={item.linkAmazon} target="_blank" rel="noreferrer nofollow sponsored">
              Amazon
            </a>
          )}
          {item?.linkMercadoLivre && (
            <a
              className="secondary"
              href={item.linkMercadoLivre}
              target="_blank"
              rel="noreferrer nofollow sponsored"
            >
              Mercado Livre
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
