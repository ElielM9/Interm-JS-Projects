/* Aplicación principal */

// Importaciones
import { fetchCryptocurrencies } from "./api/cryptoApi.js";
import {
  CRYPTO_SELECT,
  CURRENCY_SELECT,
  QUOTE_FORM,
} from "./utils/selectors.js";
import { submitForm, readValue } from "./core/logic.js";

/* Funciones */
function startApp() {
  fetchCryptocurrencies();
  eventListeners();
}

function eventListeners() {
  QUOTE_FORM.addEventListener(`submit`, submitForm);
  CRYPTO_SELECT.addEventListener(`change`, readValue);
  CURRENCY_SELECT.addEventListener(`change`, readValue);
}

/* Ejecución */
document.addEventListener(`DOMContentLoaded`, startApp);
