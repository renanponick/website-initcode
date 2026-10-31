# Init Code Website

SPA React/Vite para divulgar cursos, vídeos e itens indicados pela Init Code. A aplicação não realiza vendas.

## Desenvolvimento

Requisitos: Node.js 20 ou superior e npm.

```bash
npm ci
npm run dev
```

Validação completa:

```bash
npm run lint
npm test
npm run build
```

O `package-lock.json` é a referência usada no CI. O `yarn.lock` permanece no repositório por compatibilidade com instalações anteriores, mas novas atualizações devem usar npm.

## Rotas

- `/`: apresentação e curso pago em destaque.
- `/courses`: playlists gratuitas.
- `/recomendation-showcase`: lista de itens indicados; a Init Code não realiza vendas.
- `/recomendation`: endereço anterior da lista, mantido por compatibilidade.
- `/notebooks`: guia de compra.
- `/language-recomendation`: questionário de orientação.

## Indicações e Google Sheets

Sem configuração externa, a lista de indicações usa `src/data/products.js`. Para usar uma planilha, publique uma aba como CSV e informe a URL em `VITE_PRODUCTS_CSV_URL`. Não use uma planilha privada nem coloque credenciais no frontend.

Colunas reconhecidas, em português ou inglês:

| Campo | Obrigatório | Exemplos de coluna |
|---|---:|---|
| Identificador | Sim | `id` |
| Nome | Sim | `nome`, `name` |
| Categoria | Não | `categoria`, `category` |
| Faixa | Não | `faixa de preco`, `price range` |
| Imagem HTTPS | Não | `imagem`, `image url` |
| Preço numérico | Não | `preco`, `price` |
| Data de atualização | Não | `atualizado em`, `updated at` |
| Ofertas | Uma válida | `amazon`, `mercado livre` |
| Ativo | Não | `ativo`, `active` |

Registros sem nome, ID ou oferta HTTPS válida são ignorados. IDs duplicados mantêm a primeira ocorrência. Falhas da fonte exibem mensagem e ação para tentar novamente.

## Publicação

O projeto assume GitHub Pages no subdiretório `/initcode-website/`. Para domínio próprio na raiz, defina `VITE_BASE_PATH=/` durante o build. O workflow gera `404.html` para preservar rotas diretas na hospedagem estática.
