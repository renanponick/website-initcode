import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import './styles.css';

const sections = [
  { id: 'armazenamento', label: 'Armazenamento' },
  { id: 'processador', label: 'Processador' },
  { id: 'memoria', label: 'Memória RAM' },
  { id: 'upgrade', label: 'Possibilidades de upgrade' },
  { id: 'tela', label: 'Tela' },
];

export default function Notebooks() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 600);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="notebook-guide page-section">
      <PageMeta title="Guia de notebooks" description="Guia prático para avaliar armazenamento, processador, memória, upgrades e tela de um notebook." />
      <article className="reading-container notebook-guide__article">
        <header className="page-header">
          <p className="eyebrow">Guia de compra</p>
          <h1>Como escolher um notebook para estudar e programar</h1>
          <p>Comece pelo seu tipo de uso e orçamento. Depois, compare armazenamento, processador, memória, capacidade de expansão e tela.</p>
        </header>

        <nav className="guide-index" aria-label="Sumário do guia">
          <strong>Neste guia</strong>
          <ol>{sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>)}</ol>
        </nav>

        <section id="armazenamento" tabIndex="-1">
          <h2>Armazenamento</h2>
          <p><strong>SSD:</strong> oferece inicialização e abertura de programas mais rápidas. É a escolha recomendada para o sistema e ferramentas de desenvolvimento.</p>
          <p><strong>HDD:</strong> entrega mais espaço por um custo menor, mas responde mais devagar. Pode servir como armazenamento complementar.</p>
          <p><strong>Sistema híbrido:</strong> combina SSD para programas com HDD para arquivos grandes. Verifique também slots M.2 e a possibilidade de expansão.</p>
        </section>

        <section id="processador" tabIndex="-1">
          <h2>Processador</h2>
          <p>Compare a geração, a quantidade de núcleos e o desempenho do modelo, não apenas a frequência em GHz. Projetos grandes, máquinas virtuais e edição de vídeo exigem mais recursos.</p>
        </section>

        <section id="memoria" tabIndex="-1">
          <h2>Memória RAM</h2>
          <p>A RAM mantém programas e dados em uso. Avalie a quantidade instalada, a quantidade máxima aceita e se existem slots livres. Navegador, editor, banco de dados e containers abertos ao mesmo tempo aumentam o consumo.</p>
        </section>

        <section id="upgrade" tabIndex="-1">
          <h2>Possibilidades de upgrade</h2>
          <p>Confirme se memória e armazenamento podem ser substituídos ou ampliados. Alguns modelos usam componentes soldados. Essa informação influencia a vida útil e deve ser conferida na ficha técnica do modelo exato.</p>
        </section>

        <section id="tela" tabIndex="-1">
          <h2>Tela e conforto visual</h2>
          <h3>Tamanho e resolução</h3>
          <p>Telas maiores facilitam o uso de várias janelas, mas reduzem a portabilidade. Full HD costuma oferecer bom espaço de trabalho; resoluções maiores exigem mais do hardware e da bateria.</p>
          <h3>Tipo de painel</h3>
          <p>Painéis IPS costumam oferecer bons ângulos de visão e cores. Painéis TN podem priorizar resposta e preço. Compare o uso pretendido e avaliações do modelo.</p>
          <h3>Taxa de atualização</h3>
          <p>Para estudo e programação, 60Hz atende a maioria das rotinas. Taxas maiores podem melhorar a fluidez em jogos e conteúdos em movimento, com possível impacto no consumo.</p>
        </section>

        <aside className="guide-note">
          <strong>Antes de comprar</strong>
          <p>Confirme especificações, garantia, possibilidade de upgrade e política de devolução diretamente com a loja e o fabricante.</p>
        </aside>

        <Link className="button button--primary" to="/recomendation-showcase">Voltar às indicações</Link>
      </article>

      {showScroll && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Voltar ao topo</button>}
    </div>
  );
}
