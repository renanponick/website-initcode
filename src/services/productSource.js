import { localProducts } from '../data/products.js';

const SAFE_URL = /^https:\/\//i;

export function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(cell.trim());
      cell = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && nextCharacter === '\n') index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function validUrl(value) {
  return SAFE_URL.test(value || '');
}

export function normalizeRows(rows) {
  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => slugify(header).replaceAll('-', ''));
  const seen = new Set();

  return rows.slice(1).flatMap((values) => {
    const source = Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
    const name = source.nome || source.name;
    const id = source.id || slugify(name || '');
    if (!name || !id || seen.has(id)) return [];

    const offers = [
      { store: 'Amazon', url: source.amazon || source.amazonurl },
      { store: 'Mercado Livre', url: source.mercadolivre || source.mercadolivreurl },
    ].filter((offer) => validUrl(offer.url));

    if (!offers.length) return [];
    seen.add(id);

    const priceText = String(source.preco || source.price || '').replace(/[^0-9,.-]/g, '');
    const normalizedPrice = priceText.includes(',') ? priceText.replaceAll('.', '').replace(',', '.') : priceText;
    const price = Number(normalizedPrice);
    return [{
      id,
      name,
      category: source.categoria || source.category || 'Outros',
      priceRange: source.faixadepreco || source.pricerange || 'Outros',
      imageUrl: validUrl(source.imagem || source.imageurl) ? (source.imagem || source.imageurl) : '',
      price: Number.isFinite(price) && price > 0 ? price : null,
      currency: source.moeda || source.currency || 'BRL',
      updatedAt: source.atualizadoem || source.updatedat || '',
      description: source.descricao || source.description || '',
      badge: source.selo || source.badge || '',
      offers,
      active: !['false', '0', 'nao', 'não'].includes(String(source.ativo || source.active).toLowerCase()),
    }];
  }).filter((product) => product.active);
}

export async function fetchProducts(sourceUrl, options = {}) {
  if (!sourceUrl) return { products: localProducts.filter((product) => product.active), source: 'local' };
  if (!SAFE_URL.test(sourceUrl)) throw new Error('A fonte de produtos precisa usar HTTPS.');

  const timeoutSignal = AbortSignal.timeout(8000);
  const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal;

  const response = await fetch(sourceUrl, {
    signal,
    headers: { Accept: 'text/csv' },
  });
  if (!response.ok) throw new Error(`Não foi possível carregar os produtos (${response.status}).`);

  const products = normalizeRows(parseCsv(await response.text()));
  return { products, source: 'sheet' };
}

