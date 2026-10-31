import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { languageDetails, languageQuestions, scoreAnswers } from '../../data/languageQuestions';
import './styles.css';

export default function LanguageRecommendationForm() {
  const [answers, setAnswers] = useState(Array(languageQuestions.length).fill(''));
  const [result, setResult] = useState(null);
  const [errorIndex, setErrorIndex] = useState(-1);
  const questionRefs = useRef([]);
  const resultRef = useRef(null);
  const answered = useMemo(() => answers.filter(Boolean).length, [answers]);

  const handleChange = (index, value) => {
    setAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? value : answer));
    setResult(null);
    if (index === errorIndex) setErrorIndex(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const missingIndex = answers.findIndex((answer) => !answer);
    if (missingIndex >= 0) {
      setErrorIndex(missingIndex);
      questionRefs.current[missingIndex]?.focus();
      return;
    }
    setErrorIndex(-1);
    setResult(scoreAnswers(answers));
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const restart = () => {
    setAnswers(Array(languageQuestions.length).fill(''));
    setResult(null);
    setErrorIndex(-1);
    questionRefs.current[0]?.focus();
  };

  return (
    <div className="language-page page-section">
      <PageMeta title="Descubra uma linguagem" description="Questionário para comparar interesses e conhecer uma trilha de programação." />
      <div className="app-container language-layout">
        <header className="page-header">
          <p className="eyebrow">Questionário de orientação</p>
          <h1>Qual linguagem combina com seus interesses?</h1>
          <p>O resultado é um ponto de partida, não uma regra. Você pode aprender qualquer uma das trilhas.</p>
          <p className="language-progress" aria-live="polite">{answered} de {languageQuestions.length} respondidas</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {languageQuestions.map((item, index) => (
            <fieldset key={item.question} className={`question-card${errorIndex === index ? ' question-card--error' : ''}`} ref={(element) => { questionRefs.current[index] = element; }} tabIndex="-1" aria-describedby={`${item.help ? `help-${index} ` : ''}${errorIndex === index ? `error-${index}` : ''}`.trim() || undefined}>
              <legend><span>{index + 1}.</span> {item.question}</legend>
              {item.help && <p id={`help-${index}`} className="question-help">{item.help}</p>}
              <div className="question-options">
                {item.options.map((option) => (
                  <label key={option.value}>
                    <input type="radio" name={`question-${index}`} value={option.value} checked={answers[index] === option.value} onChange={() => handleChange(index, option.value)} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errorIndex === index && <p id={`error-${index}`} className="question-error">Escolha uma opção para continuar.</p>}
            </fieldset>
          ))}
          <button className="button button--primary language-submit" type="submit">Ver resultado</button>
        </form>

        {result && (
          <section ref={resultRef} className="language-result" tabIndex="-1" aria-live="polite">
            <p className="eyebrow">Resultado</p>
            <h2>{result.recommendations.length > 1 ? 'Você tem mais de uma boa opção' : `Sua indicação: ${result.recommendations[0]}`}</h2>
            <div className="language-result__options">
              {result.recommendations.map((language) => (
                <article key={language}>
                  <h3>{language}</h3>
                  <p>{languageDetails[language].description}</p>
                  <Link className="button button--secondary" to={`/courses#${languageDetails[language].courseId}`}>Ver curso de {language}</Link>
                </article>
              ))}
            </div>
            <button className="button button--text" type="button" onClick={restart}>Refazer questionário</button>
          </section>
        )}
      </div>
    </div>
  );
}
