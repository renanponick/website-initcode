import "./styles.css";

export default function ProductCard({ item }) {
  return (
    <article className="thing">
      <div className="thing-image-wrapper">
        {item?.img ? (
          <img src={item.img} alt={item.title} loading="lazy" />
        ) : (
          <div className="thing-image-placeholder">Sem imagem</div>
        )}
      </div>
      <h4>{item?.title}</h4>
      <div className="links">
        {item?.linkAmazon && (
          <a
            href={item.linkAmazon}
            target="_blank"
            rel="noreferrer nofollow sponsored"
          >
            Amazon
          </a>
        )}
        {item?.linkMercadoLivre && (
          <a
            href={item.linkMercadoLivre}
            target="_blank"
            rel="noreferrer nofollow sponsored"
          >
            Mercado Livre
          </a>
        )}
      </div>
    </article>
  );
}
