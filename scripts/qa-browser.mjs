import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const devtoolsUrl = process.env.BROWSER_API_URL || 'http://127.0.0.1:9222';
const siteUrl = process.env.BROWSER_BASE_URL || 'http://127.0.0.1:54114/initcode-website/';
const outputDirectory = path.resolve('docs/qa');

const cases = [
  { name: 'home-320', route: '', width: 320, height: 900 },
  { name: 'home-1440', route: '', width: 1440, height: 1000 },
  { name: 'courses-375', route: 'courses', width: 375, height: 1000 },
  { name: 'products-320', route: 'recomendation-showcase', width: 320, height: 1000 },
  { name: 'products-1440', route: 'recomendation-showcase', width: 1440, height: 1100 },
  { name: 'books-320', route: 'recomendation-showcase', width: 320, height: 1000, category: 'Livros' },
  { name: 'questionnaire-375', route: 'language-recomendation', width: 375, height: 1000 },
  { name: 'guide-375', route: 'notebooks', width: 375, height: 1000 },
  { name: 'not-found-1024', route: 'rota-inexistente', width: 1024, height: 700 },
];

function connect(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 1;

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  };

  const ready = new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = () => reject(new Error('Não foi possível conectar ao Edge via DevTools.'));
  });

  return {
    ready,
    close: () => socket.close(),
    send(method, params = {}) {
      const id = nextId;
      nextId += 1;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
  };
}

await mkdir(outputDirectory, { recursive: true });
const target = await fetch(`${devtoolsUrl}/json/new?${encodeURIComponent(siteUrl)}`, { method: 'PUT' }).then((response) => response.json());
const client = connect(target.webSocketDebuggerUrl);
await client.ready;
await client.send('Page.enable');
await client.send('Runtime.enable');

const results = [];
for (const item of cases) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: item.width,
    height: item.height,
    deviceScaleFactor: 1,
    mobile: item.width < 500,
  });
  await client.send('Page.navigate', { url: new URL(item.route, siteUrl).href });
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (item.category) {
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const select = document.querySelector('#category-filter');
        const setValue = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
        setValue.call(select, ${JSON.stringify(item.category)});
        select.dispatchEvent(new Event('change', { bubbles: true }));
      })()`,
    });
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const evaluation = await client.send('Runtime.evaluate', {
    expression: `({
      title: document.title,
      heading: document.querySelector('h1')?.textContent?.trim(),
      innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      mainCount: document.querySelectorAll('main').length,
      h1Count: document.querySelectorAll('h1').length,
      selectedCategory: document.querySelector('#category-filter')?.value || null,
      catalogSection: document.querySelector('.catalog-section h2')?.textContent?.trim() || null,
      menuButtonVisible: document.querySelector('.site-header__menu-button')
        ? getComputedStyle(document.querySelector('.site-header__menu-button')).display !== 'none'
        : null
    })`,
    returnByValue: true,
  });
  const screenshot = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
  await writeFile(path.join(outputDirectory, `${item.name}.png`), Buffer.from(screenshot.data, 'base64'));
  results.push({ name: item.name, ...evaluation.result.value });
}

client.close();

const invalidResults = results.filter((result) => (
  !result.title
  || !result.heading
  || result.scrollWidth > result.innerWidth
  || result.mainCount !== 1
  || result.h1Count !== 1
  || result.menuButtonVisible === null
  || (result.name === 'books-320' && (result.selectedCategory !== 'Livros' || result.catalogSection !== 'Livros'))
));

if (invalidResults.length > 0) {
  console.error(JSON.stringify(results, null, 2));
  throw new Error(`QA inválido em: ${invalidResults.map(({ name }) => name).join(', ')}`);
}

console.log(JSON.stringify(results, null, 2));
