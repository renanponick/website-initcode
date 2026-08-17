import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import Midia from "../../components/Midia";
import { fetchProducts } from "../../utils/products";

const categoryLabels = {
  1: "R$ 1.000 - R$ 3.000",
  2: "R$ 3.000 - R$ 6.000",
  3: "Acima de R$ 6.000",
};

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "TikTok", href: "#" },
];

export default function Recomendation() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const fetched = await fetchProducts();
        if (mounted) setProducts(fetched ?? []);
      } catch (err) {
        if (mounted) setError(err?.message || "Erro ao carregar produtos");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(
    () =>
      [...new Set(products.filter((item) => item.category !== "0").map((item) => item.category))].sort(),
    [products],
  );

  const setupItems = useMemo(
    () => products.filter((item) => item.category === "0"),
    [products],
  );

  return (
    <main className="recomendation-page">
      <header className="hero">
        <p className="eyebrow">Recomendações reais, sem letra miúda</p>
        <h1>
          Cada <span>holofote</span>, uma recomendação.
        </h1>
        <p className="hero-text">
          Nada aqui é aleatório: só produtos que eu testei, uso no dia a dia e
          voltaria a comprar. Explore por faixa de preço ou dê uma olhada no meu
          setup completo.
        </p>
      </header>

      <section className="social-strip">
        <div className="social-copy">
          <strong>Não perca nenhuma novidade</strong>
          <span>
            Acompanhe minhas redes sociais para ver o que entra na vitrine
            primeiro.
          </span>
        </div>
        <div className="social-icons">
          <Midia size={44} />
        </div>
      </section>

      <section className="content-card">
        <h2>Pensando em comprar um Notebook?</h2>
        <p>
          Tem um tempo que alguns alunos me pediram uma sugestão de computador
          para começar a programar. A pergunta que eu sempre faço é: quanto você
          quer pagar? O valor irá influenciar bastante na vida útil do notebook.
        </p>

        {loading && <p>Carregando produtos...</p>}
        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          categories.map((category) => (
            <div key={category} className="category-block">
              <h3>{categoryLabels[category] ?? `Categoria ${category}`}</h3>
              <div className="category-grid">
                {products
                  .filter((item) => item.category === category)
                  .map((item, index) => (
                    <article className="thing" key={`${item.title}-${index}`}>
                      <div className="thing-image-wrapper">
                        <img src={item.img} alt={item.title} loading="lazy" />
                      </div>
                      <h4>{item.title}</h4>
                      <div className="links">
                        {item.linkAmazon && (
                          <a
                            href={item.linkAmazon}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Amazon
                          </a>
                        )}
                        {item.linkMercadoLivre && (
                          <a
                            href={item.linkMercadoLivre}
                            target="_blank"
                            rel="noreferrer"
                          >
                            ML
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          ))}
      </section>

      <section className="content-card">
        <h2 className="setup">Caso tenha interesse em conhecer o meu Setup</h2>
        <div className="things-list space-bottom">
          {setupItems.map((item, index) => (
            <article className="thing" key={`${item.title}-${index}`}>
              <div className="thing-image-wrapper">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <h4>{item.title}</h4>
              <div className="links">
                {item.linkAmazon && (
                  <a href={item.linkAmazon} target="_blank" rel="noreferrer">
                    Amazon
                  </a>
                )}
                {item.linkMercadoLivre && (
                  <a
                    href={item.linkMercadoLivre}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ML
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="page-footer">
        <div>
          <h3>Vitrine</h3>
          <p>Curadoria independente. Produtos e preços podem mudar.</p>
        </div>
        <nav className="footer-socials">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
