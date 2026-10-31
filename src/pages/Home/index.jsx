import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import capaUdemy from '../../assets/capa-udemy-optimized.jpg';
import character from '../../assets/character-optimized.png';
import './styles.css';

export default function Home() {
  return (
    <div className="home-page">
      <PageMeta title="Aprenda programação" description="Cursos gratuitos, conteúdo prático e recomendações para quem quer aprender programação." />

      <section className="home-hero page-section">
        <div className="app-container home-hero__inner">
          <div className="home-hero__content">
            <p className="eyebrow">Programação sem enrolação</p>
            <h1>Aprenda programação de forma clara, prática e direta</h1>
            <p>Conteúdo para começar do zero, praticar com projetos e entender as ferramentas usadas no desenvolvimento de software.</p>
            <div className="home-actions">
              <Link to="/courses" className="button button--primary">Ver cursos gratuitos</Link>
              <Link to="/recomendation-showcase" className="button button--secondary">Ver minhas indicações</Link>
            </div>
          </div>
          <img src={character} alt="Ilustração do criador da Init Code" className="home-hero__image" width="480" height="480" fetchPriority="high" />
        </div>
      </section>

      <section className="home-about page-section">
        <div className="reading-container">
          <p className="eyebrow">Sobre a Init Code</p>
          <h2>Conteúdo criado com experiência prática</h2>
          <p>Sou Renan Ponick, coordenador de P&amp;D e desenvolvedor com experiência na criação de APIs, serviços SaaS e soluções para empresas. A Init Code transforma essa vivência em aulas diretas ao ponto.</p>
        </div>
      </section>

      <section id="udemy" className="home-course page-section" tabIndex="-1">
        <div className="app-container home-course__inner">
          <img src={capaUdemy} alt="Capa do curso Do Zero à API" className="home-course__image" width="640" height="360" loading="lazy" />
          <div>
            <p className="eyebrow">Curso pago na Udemy</p>
            <h2>Do Zero à API — Node.js e hospedagem</h2>
            <p>Construa uma API conectada ao banco de dados, com autenticação, testes e publicação na web.</p>
            <ul>
              <li>Node.js e Express</li>
              <li>Sequelize, MySQL e PostgreSQL</li>
              <li>JWT, Bcrypt e autenticação</li>
              <li>Testes e deploy com Docker</li>
            </ul>
            <a className="button button--primary" target="_blank" rel="noopener noreferrer sponsored" href="https://www.udemy.com/course/do-zero-a-api-nodejs/?referralCode=031655834C6F63128255">
              Conhecer o curso na Udemy
            </a>
          </div>
        </div>
      </section>

      <section className="home-next page-section">
        <div className="reading-container">
          <h2>Não sabe por onde começar?</h2>
          <p>Responda ao questionário e veja qual trilha combina melhor com seus interesses atuais.</p>
          <Link className="button button--secondary" to="/language-recomendation">Descobrir uma linguagem</Link>
        </div>
      </section>
    </div>
  );
}
