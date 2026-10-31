import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import './styles.css';

const courses = [
  {
    id: 'node', title: 'Node.js', summary: 'JavaScript no servidor, fundamentos da plataforma e criação de APIs.',
    description: 'Comece pela instalação e pelos primeiros scripts. Depois, avance por variáveis, funções, controle de fluxo e fundamentos usados em servidores e APIs.',
    embed: 'https://www.youtube.com/embed/videoseries?si=zfO9UOs51tMxMneN&list=PLI8zu4XrMjAxe5dGI2tiQ8MQAfdT4fGjM',
    playlist: 'https://www.youtube.com/playlist?list=PLI8zu4XrMjAxe5dGI2tiQ8MQAfdT4fGjM',
  },
  {
    id: 'c-plus-plus', title: 'C++', summary: 'Fundamentos, lógica e controle mais próximo do sistema.',
    description: 'Aprenda variáveis, operações e estruturas de controle de forma gradual, com exemplos para consolidar cada conceito.',
    embed: 'https://www.youtube.com/embed/videoseries?si=w8IacHiT3RCUqYbh&list=PLI8zu4XrMjAy3MBlM7qyPq6OTOA_iZ7tG',
    playlist: 'https://www.youtube.com/playlist?list=PLI8zu4XrMjAy3MBlM7qyPq6OTOA_iZ7tG',
  },
  {
    id: 'c-sharp', title: 'C#', summary: 'Tipos, orientação a objetos e ecossistema .NET.',
    description: 'Comece com variáveis, condições e repetições. Depois, avance para funções e os fundamentos da orientação a objetos.',
    embed: 'https://www.youtube.com/embed/videoseries?si=xPUvbUZ89p4gzoVq&list=PLI8zu4XrMjAwbI0qpgEMKF4PotrvWhkKh',
    playlist: 'https://www.youtube.com/playlist?list=PLI8zu4XrMjAwbI0qpgEMKF4PotrvWhkKh',
  },
  {
    id: 'git', title: 'Git, GitHub e GitHub Pages', summary: 'Versionamento, colaboração e publicação de sites estáticos.',
    description: 'Entenda o versionamento, gerencie repositórios, conheça o fluxo de colaboração e publique um projeto no GitHub Pages.',
    embed: 'https://www.youtube.com/embed/videoseries?si=rEphQscu-RhfeD5x&list=PLI8zu4XrMjAzva6GTrDPiWd_RwXZFzKj6',
    playlist: 'https://www.youtube.com/playlist?list=PLI8zu4XrMjAzva6GTrDPiWd_RwXZFzKj6',
  },
];

export default function Courses() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    }
  }, [location.hash]);

  return (
    <div className="courses-page">
      <PageMeta title="Cursos gratuitos" description="Playlists gratuitas de Node.js, C++, C#, Git, GitHub e GitHub Pages." />
      <section className="courses-page__hero page-section">
        <div className="app-container">
          <div className="page-header">
            <p className="eyebrow">Cursos gratuitos</p>
            <h1>Escolha uma trilha e comece a praticar</h1>
            <p>Playlists organizadas para acompanhar no seu ritmo. Se estiver em dúvida, use o questionário para comparar interesses.</p>
          </div>
          <nav className="course-index" aria-label="Índice de cursos">
            {courses.map((course) => <a key={course.id} href={`#${course.id}`}>{course.title}</a>)}
          </nav>
          <Link to="/language-recomendation" className="button button--secondary">Descobrir uma linguagem</Link>
        </div>
      </section>

      <div className="app-container course-list">
        {courses.map((course) => (
          <article id={course.id} key={course.id} className="course-card page-section" tabIndex="-1">
            <div className="course-card__copy">
              <p className="eyebrow">Playlist gratuita</p>
              <h2>{course.title}</h2>
              <strong>{course.summary}</strong>
              <p>{course.description}</p>
              <a className="button button--secondary" href={course.playlist} target="_blank" rel="noopener noreferrer">Abrir playlist no YouTube</a>
              {course.id === 'node' && <Link className="button button--text" to="/#udemy">Ver opção com certificado</Link>}
            </div>
            <div className="course-card__video">
              <iframe src={course.embed} title={`Playlist de ${course.title} no YouTube`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
