import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import { fetchProducts } from "../../utils/products";
import ProductCard from "../../components/ProductCard";

const sectionConfig = [
  {
    id: "notebooks",
    title: "Notebooks recomendados",
    subtitle: "Modelos que eu indico para estudar, trabalhar e evoluir com segurança.",
    category: "1",
    link: "/notebooks",
    linkLabel: "Como escolher um notebook",
  },
  {
    id: "livros",
    title: "Livros que eu indico",
    subtitle: "Leituras que ajudam a construir base, visão e consistência ao longo da jornada.",
    category: "9",
  },
  {
    id: "produtos",
    title: "Produtos recomendados",
    subtitle: "Itens úteis que valem a pena acompanhar, mesmo com variação de preço.",
    category: "2",
  },
  {
    id: "setup",
    title: "Meu Setup",
    subtitle: "Os itens que eu uso e que fazem parte da minha bancada.",
    category: "0",
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

function Skeleton() {
  return (
    <div className="grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="skeleton" key={i} />
      ))}
    </div>
  );
}

export default function Recomendation() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finePointer, setFinePointer] = useState(false);

  const shelfRef = useRef(null);
  const spotlightRef = useRef(null);
  const rafRef = useRef(null);

  const loadProducts = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProducts()
      .then((fetched) => {
        if (!cancelled) setProducts((fetched ?? []).map(normalizeItem));
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Erro ao carregar produtos");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const cleanup = loadProducts();
    return cleanup;
  }, [loadProducts]);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setFinePointer(pointerQuery.matches && !motionQuery.matches);
  }, []);

  const groupedSections = useMemo(
    () =>
      sectionConfig.map((section) => ({
        ...section,
        items: products.filter((item) => item.category === section.category),
      })),
    [products],
  );

  const handleMouseMove = (e) => {
    if (!finePointer || !shelfRef.current || !spotlightRef.current) return;
    const { clientX, clientY } = e;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const rect = shelfRef.current.getBoundingClientRect();
      spotlightRef.current.style.setProperty("--mx", `${clientX - rect.left}px`);
      spotlightRef.current.style.setProperty("--my", `${clientY - rect.top}px`);
      rafRef.current = null;
    });
  };

  return (
    <main className="recomendation-page">
      <header className="hero">
        <p className="eyebrow">Recomendações reais, sem letra miúda</p>
        <p className="hero-sub">
          Nada aqui é aleatório: só produtos que eu testei, uso no dia a dia e voltaria a comprar.
        </p>
      </header>

      <section className="shelf-area" ref={shelfRef} onMouseMove={handleMouseMove}>
        <div className="shelf-area__spotlight" ref={spotlightRef} />

        {!loading && !error && (
          <nav className="quicknav">
            {sectionConfig.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        )}

        <div className="shelf-content">
          {loading && (
            <div className="section">
              <Skeleton />
            </div>
          )}

          {!loading && error && (
            <div className="section">
              <div className="state">
                <h3>Não deu para carregar a vitrine agora</h3>
                <p>{error}</p>
                <button className="state__retry" type="button" onClick={loadProducts}>
                  Tentar de novo
                </button>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            groupedSections.map((section) => (
              <div className="section" id={section.id} key={section.id}>
                <div className="section__head">
                  <div>
                    <h2 className="section__title">{section.title}</h2>
                    <p className="section__intro">{section.subtitle}</p>
                  </div>
                  {section.link && (
                    <a className="section__link" href={section.link}>
                      {section.linkLabel} →
                    </a>
                  )}
                </div>

                {section.items.length > 0 ? (
                  <div className="grid">
                    {section.items.map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <p className="state-text">Nenhum item encontrado nesta seção.</p>
                )}
              </div>
            ))}
        </div>
      </section>

      <footer className="disclosure disclosure--footer">
        Esta página contém links de afiliados (Amazon e Mercado Livre). Se você comprar por aqui, eu posso
        receber uma pequena comissão — sem custo extra para você.
      </footer>
    </main>
  );
}
