import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchProducts, normalizeRows, parseCsv } from './productSource.js';

test('parseCsv preserva vírgulas, aspas e quebras em campos citados', () => {
  const rows = parseCsv('id,nome,descricao\n1,"Notebook, leve","Linha 1\nLinha 2"');
  assert.deepEqual(rows, [
    ['id', 'nome', 'descricao'],
    ['1', 'Notebook, leve', 'Linha 1\nLinha 2'],
  ]);
});

test('fetchProducts usa catálogo local sem endpoint', async () => {
  const result = await fetchProducts('');
  assert.equal(result.source, 'local');
  assert.ok(result.products.length > 0);
  assert.equal(result.products.filter((product) => product.category === 'Livros').length, 2);
});

test('fetchProducts rejeita fonte sem HTTPS', async () => {
  await assert.rejects(() => fetchProducts('http://example.com/products.csv'), /HTTPS/);
});

test('normalizeRows remove duplicados, ofertas inválidas e registros incompletos', () => {
  const rows = parseCsv([
    'id,nome,categoria,preco,amazon,mercado livre,ativo',
    'note-1,Notebook,Notebooks,"2.499,90",https://example.com/note,javascript:alert(1),sim',
    'note-1,Duplicado,Notebooks,100,https://example.com/dup,,sim',
    'sem-oferta,Sem oferta,Outros,100,,,sim',
    'inativo,Inativo,Outros,100,https://example.com/inativo,,não',
  ].join('\n'));

  assert.deepEqual(normalizeRows(rows), [{
    id: 'note-1',
    name: 'Notebook',
    category: 'Notebooks',
    priceRange: 'Outros',
    imageUrl: '',
    price: 2499.9,
    currency: 'BRL',
    updatedAt: '',
    description: '',
    badge: '',
    offers: [{ store: 'Amazon', url: 'https://example.com/note' }],
    active: true,
  }]);
});

