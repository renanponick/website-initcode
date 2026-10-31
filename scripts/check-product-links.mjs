import { localProducts } from '../src/data/products.js';

const expectedDomains = {
  Amazon: /(^|\.)amazon\.com\.br$/,
  'Mercado Livre': /(^|\.)mercadolivre\.com\.br$/,
};

const offers = localProducts.flatMap((product) => product.offers.map((offer) => ({ product: product.name, ...offer })));
const results = [];

for (const offer of offers) {
  try {
    const request = (method) => fetch(offer.url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'Mozilla/5.0 InitCodeLinkCheck/1.0' },
    });
    let response = await request('HEAD');
    if (response.status === 405) {
      response = await request('GET');
      await response.body?.cancel();
    }
    const hostname = new URL(response.url).hostname;
    results.push({ ...offer, status: response.status, finalUrl: response.url, domainMatchesStore: expectedDomains[offer.store]?.test(hostname) ?? false });
  } catch (error) {
    results.push({ ...offer, status: 'ERROR', finalUrl: '', domainMatchesStore: false, error: error.message });
  }
}

console.log(JSON.stringify(results, null, 2));
if (results.some((result) => !result.domainMatchesStore || result.status === 'ERROR' || result.status >= 400)) process.exitCode = 1;
