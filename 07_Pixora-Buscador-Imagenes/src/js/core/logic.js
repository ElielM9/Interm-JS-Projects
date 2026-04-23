/* Importaciones */
import { appState } from "./state.js";
import { SEARCH_INPUT } from "../utils/selectors.js";
import { showAlert } from "../utils/alerts.js";
import { searchImages } from "../api/searchImages.js";

export function validateForm(event) {
  event.preventDefault();

  const searchTerm = SEARCH_INPUT.value;

  if (searchTerm === ``) {
    showAlert(`El término de búsqueda está vacío`);

    return;
  }

  // Reiniciar a la página 1 para nuevas búsquedas
  appState.currentPage = 1;

  // Si el término de búsqueda es válido, buscar las imágenes
  searchImages();
}

// Generador que registra los elementos de acuerdo a la cantidad de páginas
export function* createPaginator(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}
