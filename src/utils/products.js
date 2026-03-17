export async function fetchProducts() {
  const SHEET_ID = "1nfAkx-c-N4BC2bgkcldDjbd7k30VJURg0PBTtdnpUmY";
  const SHEET_NAME = "produtos";
  const URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Erro ao buscar dados da planilha");

    const data = await response.json();

    const products = data.map((item) => ({
      id: item.id || crypto.randomUUID(),
      title: item.nome?.trim() || "",
      img: item.img?.trim() || "",
      linkAmazon: item.link_amazon?.trim() || "",
      linkMercadoLivre: item.link_mercadolivre?.trim() || "",
      category: item.categoria || "",
    }));

    return products;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    return [];
  }
}

/**
 * Recebe uma URL de imagem e retorna um link válido para <img>.
 * Se for Google Drive, converte para link direto de visualização.
 * Caso contrário, retorna a URL original.
 */
// function normalizeImageUrl(url) {
//   const driveFileIdRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;
//   const match = url.match(driveFileIdRegex);

//   if (match && match[1]) {
//     return `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
//   }

//   const driveOpenRegex = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
//   const matchOpen = url.match(driveOpenRegex);

//   if (matchOpen && matchOpen[1]) {
//     return `https://lh3.googleusercontent.com/d/${matchOpen[1]}=w1000`;
//   }

//   return url;
// }