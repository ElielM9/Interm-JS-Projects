/* Lógica principal de la aplicación */

// Importaciones
import { showAlert } from "../utils/alerts.js";
import { showSpinner } from "../modules/ui.js";
import { consultAPI } from "../api/cryptoApi.js";
import { objSearch } from "../core/state.js";

// Funciones
export function submitForm(e) {
  e.preventDefault();

  // Validar que ambos campos tengan algo seleccionado
  const VOID_VALUE = ``;
  const { cryptocurrency, currency } = objSearch;

  if (cryptocurrency === VOID_VALUE || currency === VOID_VALUE) {
    showAlert(`Ambos campos son obligatorios`);

    return;
  }

  // Mostrar el spinner por 3 segundos antes de consultar la API
  showSpinner();

  setTimeout(() => {
    consultAPI();
  }, 4000);
}

export function readValue(e) {
  objSearch[e.target.name] = e.target.value;
}
