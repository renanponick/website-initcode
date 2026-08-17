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
      category: String(item.categoria || "").trim(),
    }));

    return products;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    return [];
  }
}
