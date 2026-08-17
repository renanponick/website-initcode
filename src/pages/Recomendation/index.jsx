import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { fetchProducts } from "../../utils/products";

const categoryLabels = {
  1: "Notebooks recomendados",
  2: "Produtos recomendados",
};

function normalizeCategory(value) {
  return String(value ?? "").trim();
}

function normalizeTitle(item) {
  return item?.nome || item?.title || item?.titulo || item?.name || "Produto";
}

function normalizeLink(item, keys) {
  for (const key of keys) {
    if (item?.[key]) return item[key];
  }
  return "";
}

function normalizeItem(item) {
  const category = normalizeCategory(item.category ?? item.categoria);
  return {
    id: item.id ?? item.ID ?? normalizeTitle(item),
    title: normalizeTitle(item),
    category,
    img: item.img || item.imagem || "",
    linkAmazon: normalizeLink(item, ["link_amazon", "linkAmazon", "amazon"]),
    linkMercadoLivre: normalizeLink(item, ["link_mercadolivre", "linkMercadoLivre", "mercadolivre", "ml"]),
  };
}

export default function Recomendation() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const fetched = await fetchProducts();
        if (mounted) setProducts((fetched ?? []).map(normalizeItem));
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

  const setupItems = useMemo(
    () => products.filter((item) => item.category === "0"),
    [products],
  );

  const recommendedNotebooks = useMemo(
    () => products.filter((item) => item.category === "1"),
    [products],
  );

  const recommendedProducts = useMemo(
    () => products.filter((item) => item.category === "2"),
    [products],
  );

  const sections = [
    {
      id: "notebooks",
      title: categoryLabels[1],
      intro:
        "Aqui estão os notebooks que eu realmente recomendo para estudar, trabalhar e evoluir sem dor de cabeça.",
      items: recommendedNotebooks,
    },
    {
      id: "produtos",
      title: categoryLabels[2],
      intro:
        "Produtos que valem a pena independente do preço, porque a variação deles muda muito ao longo do tempo.",
      items: recommendedProducts,
    },
  ];

  function productCard(item) {
    return (
      <article className="thing" key={item.id}>
        <div className="thing-image-wrapper">
          {item.img ? (
            <img src={item.img} alt={item.title} loading="lazy" />
          ) : (
            <div className="thing-image-placeholder">Sem imagem</div>
          )}
        </div>
        <h4>{item.title}</h4>
        <div className="links">
          {item.linkAmazon && (
            <a href={item.linkAmazon} target="_blank" rel="noreferrer nofollow sponsored">
              Amazon
            </a>
          )}
          {item.linkMercadoLivre && (
            <a href={item.linkMercadoLivre} target="_blank" rel="noreferrer nofollow sponsored">
              Mercado Livre
            </a>
          )}
        </div>
      </article>
    );
  }

  return (
    <main className="recomendation-page">
      <header className="hero">
        <p className="eyebrow">Recomendações reais, sem letra miúda</p>
        <h1>
          Cada <span>holofote</span>, uma recomendação.
        </h1>
        <p className="hero-text">
          Uma vitrine virtual baseada na minha curadoria: notebooks, produtos úteis e itens que eu considero valiosos para diferentes perfis.
        </p>
      </header>

      <section className="content-card">
        <h2>Pensando em comprar um Notebook?</h2>
        <p>
          Tem um tempo que alguns alunos me pediram uma sugestão de computador para começar a programar. A pergunta que eu sempre faço é: quanto você quer pagar? O valor influencia bastante na vida útil do notebook.
        </p>

        {loading && <p className="state-text">Carregando produtos...</p>}
        {error && <p className="state-text error">{error}</p>}

        {!loading && !error && sections.map((section) => (
          <div key={section.id} className="category-block" id={section.id}>
            <h3>{section.title}</h3>
            <p className="category-intro">{section.intro}</p>
            {section.items.length ? (
              <div className="category-grid">{section.items.map(productCard)}</div>
            ) : (
              <p className="state-text">Nenhum item encontrado nesta categoria.</p>
            )}
          </div>
        ))}
      </section>

      <section className="content-card">
        <h2 className="setup">Caso tenha interesse em conhecer o meu Setup</h2>
        {setupItems.length ? (
          <div className="things-list space-bottom">{setupItems.map(productCard)}</div>
        ) : (
          <p className="state-text">Nenhum item de setup encontrado.</p>
        )}
      </section>

      <footer className="page-footer">
        <div>
          <h3>Vitrine</h3>
          <p>Curadoria independente. Produtos e preços podem mudar.</p>
        </div>
        <div className="footer-note">
          <span>Sem sessão de redes sociais aqui para manter a página limpa no mobile.</span>
        </div>
      </footer>
    </main>
  );
}
