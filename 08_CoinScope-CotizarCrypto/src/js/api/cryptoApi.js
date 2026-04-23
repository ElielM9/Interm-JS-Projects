/* API para obtener información de criptomonedas */

// Importaciones
import { fillSelects, showQuoteHTML } from "../modules/ui.js";
import { objSearch } from "../core/state.js";
import { showAlert } from "../utils/alerts.js";

// Funciones
function getCryptocurrencies(cryptocurrencies) {
  return new Promise((resolve) => {
    resolve(cryptocurrencies);
  });
}

export async function fetchCryptocurrencies() {
  const API_URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    const cryptocurrencies = await getCryptocurrencies(result.Data);

    fillSelects(cryptocurrencies);
  } catch (error) {
    console.error(error);
  }
}

export async function consultAPI() {
  // Destructuring para obtener los valores de cryptocurrency y currency
  const { cryptocurrency, currency } = objSearch;

  const API_URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;

  try {
    const response = await fetch(API_URL);
    const quote = await response.json();

    showQuoteHTML(quote.DISPLAY[cryptocurrency][currency]);
  } catch (error) {
    showAlert("Error al conectar con el servidor de cotizaciones");
    console.error(error);
  }
}
