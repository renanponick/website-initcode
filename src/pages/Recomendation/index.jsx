import { Link } from "react-router-dom";
import "./styles.css";
import Midia from "../../components/Midia";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/products";

export default function Recomendation() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryLabels = {
    1: "R$ 1.000 - R$ 3.000",
    2: "R$ 3.000 - R$ 6.000",
    3: "Acima de R$ 6.000",
  };

  const categories = [
    ...new Set(
      products.filter((it) => it.category !== "0").map((item) => item.category),
    ),
  ].sort();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const fetched = await fetchProducts();
        if (mounted && fetched) setProducts(fetched);
      } catch (err) {
        if (mounted) setError(err.message || "Erro ao carregar produtos");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="recomendation">
      <div className="social-media">
        <h1>
          Não perca nenhuma <span className="act">novidade</span>, acompanhe as
          nossas redes sociais
        </h1>

        <Midia size={60} />
      </div>

      <div className="notebooks">
        <div className="overlay">
          <h1>Pensando em comprar um Notebook?</h1>
          <p>
            Tem um tempo que alguns alunos me pediram uma sugestão de computador
            para começar a programar, a pergunta que eu sempre faço é,
            &quot;quanto você quer pagar?&quot;. Você precisará ter em mente que
            o valor irá influenciar bastante na vida útil do notebook, afinal os
            apps e jogos vão ficando cada vez mais pesados. Bom, fiz uma lista
            com alguns notes em faixas de preços.
          </p>

          {loading ? (
            <p>Carregando produtos...</p>
          ) : (
            categories.map((category) => (
              <div key={category}>
                <h2>{categoryLabels[category] ?? `Categoria ${category}`}</h2>

                <div className="category-grid">
                  {products
                    .filter((item) => item.category === category)
                    .map((item, index) => (
                      <div className="thing" key={index}>
                        <div className="thing-image-wrapper">
                          <img src={item.img} alt={item.title} />
                        </div>
                        <h2>{item.title}</h2>
                        <div className="links">
                          <a
                            href={item.linkAmazon}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Amazon
                          </a>
                          <a
                            href={item.linkMercadoLivre}
                            target="_blank"
                            rel="noreferrer"
                          >
                            ML
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}

          <h3>
            Da uma olhada{" "}
            <Link to="/notebooks" reloadDocument={true}>
              aqui
            </Link>{" "}
            antes de comprar um note.
          </h3>
        </div>
      </div>

      <div className="overlay">
        <h1 className="setup">Caso tenha interesse em conhecer o meu Setup</h1>
        <div className="things-list space-bottom">
          {products
            .filter((item) => item.category === "0")
            .map((item, index) => (
              <div className="thing" key={index}>
                <div className="thing-image-wrapper">
                  <img src={item.img} alt={item.title} />
                </div>
                <h2>{item.title}</h2>
                <div className="links">
                  <a href={item.linkAmazon} target="_blank" rel="noreferrer">
                    Amazon
                  </a>
                  <a
                    href={item.linkMercadoLivre}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ML
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
