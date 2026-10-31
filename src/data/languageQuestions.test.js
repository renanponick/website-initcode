import assert from 'node:assert/strict';
import test from 'node:test';
import { languageQuestions, scoreAnswers } from './languageQuestions.js';

test('não calcula resultado incompleto', () => {
  assert.equal(scoreAnswers(Array(languageQuestions.length).fill('')), null);
});

test('retorna somente recomendações com pontuação máxima', () => {
  const result = scoreAnswers(['jogos', 'sim', 'nao', 'nao', 'nao', 'sim', 'sim', 'nao', 'nao', 'nao', 'sim', 'nao']);
  const max = Math.max(...Object.values(result.scores));
  assert.ok(result.recommendations.length >= 1);
  assert.ok(result.recommendations.every((language) => result.scores[language] === max));
});

