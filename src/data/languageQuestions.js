export const languageQuestions = [
  { question: 'Você gostaria de trabalhar com jogos ou sistemas web?', help: 'Sistemas web incluem sites, painéis e serviços acessados pelo navegador.', options: [{ label: 'Jogos', value: 'jogos' }, { label: 'Sistemas web', value: 'sistemas' }] },
  { question: 'Você tem interesse em desenvolver aplicações para web?', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você gostaria de trabalhar com APIs?', help: 'Uma API permite que sistemas troquem dados e executem funções entre si.', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você gosta da ideia de controlar memória e recursos do computador?', help: 'Esse controle oferece flexibilidade, mas exige mais atenção durante o desenvolvimento.', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você prefere começar com menos regras de tipos?', help: 'Tipos ajudam a descrever os dados que o programa aceita.', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você gosta de linguagens com verificação rigorosa de tipos?', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você gostaria de criar aplicativos desktop para Windows?', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você se interessa pelo ecossistema .NET?', help: '.NET é uma plataforma usada para criar aplicações web, desktop e serviços.', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você gostaria de programar dispositivos ou sistemas embarcados?', help: 'Sistemas embarcados executam dentro de equipamentos, sensores e outros dispositivos.', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você quer estudar backend para aplicações web?', help: 'Backend processa regras, dados e integrações que funcionam por trás da interface.', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você valoriza uma comunidade open source ampla?', help: 'Open source permite estudar, usar e colaborar com código publicado pela comunidade.', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
  { question: 'Você busca alto desempenho e controle do sistema?', options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }] },
];

export const languageDetails = {
  'C++': { courseId: 'c-plus-plus', description: 'C++ combina desempenho e controle de recursos. Pode ser uma boa trilha para jogos, sistemas e embarcados.' },
  'C#': { courseId: 'c-sharp', description: 'C# integra o ecossistema .NET e atende aplicações web, desktop e jogos.' },
  'Node.js': { courseId: 'node', description: 'Node.js usa JavaScript no backend e tem um ecossistema amplo para aplicações web e APIs.' },
};

export function scoreAnswers(answers) {
  if (answers.length !== languageQuestions.length || answers.some((answer) => !answer)) return null;
  const scores = { 'C++': 0, 'C#': 0, 'Node.js': 0 };
  const add = (language) => { scores[language] += 1; };

  answers.forEach((answer, index) => {
    const yes = answer === 'sim';
    switch (index) {
      case 0: add(answer === 'jogos' ? 'C++' : 'Node.js'); break;
      case 1: add(yes ? 'Node.js' : 'C++'); break;
      case 2: add(yes ? 'Node.js' : 'C++'); break;
      case 3: add(yes ? 'C++' : 'Node.js'); break;
      case 4: add(yes ? 'Node.js' : 'C#'); break;
      case 5: add(yes ? 'C#' : 'Node.js'); break;
      case 6: add(yes ? 'C#' : 'Node.js'); break;
      case 7: add(yes ? 'C#' : 'C++'); break;
      case 8: add(yes ? 'C++' : 'Node.js'); break;
      case 9: add(yes ? 'Node.js' : 'C#'); break;
      case 10: add(yes ? 'Node.js' : 'C#'); break;
      case 11: add(yes ? 'C++' : 'Node.js'); break;
      default: break;
    }
  });

  const maxScore = Math.max(...Object.values(scores));
  return { scores, recommendations: Object.keys(scores).filter((language) => scores[language] === maxScore) };
}

