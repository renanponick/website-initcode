import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { fetchProducts } from "../../utils/products";
import ProductCard from "../../components/ProductCard";

const sectionConfig = [
  {
    id: "setup",
    title: "Meu Setup",
    subtitle: "Os itens que eu uso e que fazem parte da minha bancada.",
    category: "0",
  },
  {
    id: "notebooks",
    title: "Notebooks recomendados",
    subtitle: "Modelos que eu indico para estudar, trabalhar e evoluir com segurança.",
    category: "1",
    link: "/notebooks",
    linkLabel: "Como escolher um notebook",
  },
  {
    id: "produtos",
    title: "Produtos recomendados",
    subtitle: "Itens úteis que valem a pena acompanhar, mesmo com variação de preço.",
    category: "2",
  },
  {
    id: "livros",
    title: "Livros que eu indico",
    subtitle: "Leituras que ajudam a construir base, visão e consistência ao longo da jornada.",
    category: "9",
  },
];

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

  const groupedSections = useMemo(
    () =>
      sectionConfig.map((section) => ({
        ...section,
        items: products.filter((item) => item.category === section.category),
      })),
    [products],
  );

  return (
    <main className="recomendation-page">
      <header className="hero">
        <p className="eyebrow">Recomendações reais, sem letra miúda</p>
        <h1>Vitrine virtual de recomendações.</h1>
      </header>

      {groupedSections.map((section) => (
        <section key={section.id} className="content-card" id={section.id}>
          <div className="category-head">
            <div>
              <h2>{section.title}</h2>
              <p className="category-intro">{section.subtitle}</p>
            </div>
            {section.link && (
              <a className="category-link" href={section.link}>
                {section.linkLabel}
              </a>
            )}
          </div>

          {loading && <p className="state-text">Carregando produtos...</p>}
          {error && <p className="state-text error">{error}</p>}

          {!loading && !error && section.items.length ? (
            <div className="category-grid">
              {section.items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : !loading && !error ? (
            <p className="state-text">Nenhum item encontrado nesta seção.</p>
          ) : null}
        </section>
      ))}
    </main>
  );
}
