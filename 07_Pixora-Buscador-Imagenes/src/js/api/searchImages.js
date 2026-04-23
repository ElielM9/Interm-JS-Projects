/* Importaciones */
import { appState } from "../core/state.js";
import { REGISTERS_PER_PAGE, SEARCH_INPUT } from "../utils/selectors.js";
import { calculatePages } from "../utils/helpers.js";
import { renderImages } from "../components/imageRender.js";

/* Funciones */

export async function searchImages() {
  const { currentPage } = appState;
  const term = SEARCH_INPUT.value;

  const API_KEY = `53095941-15c0123b5eb4b92a48a772f33`;
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${term}&per_page=${REGISTERS_PER_PAGE}&page=${currentPage}`;

  try {
    const response = await fetch(URL);
    const resultsData = await response.json();

    const images = resultsData.hits;
    const totalPages = calculatePages(resultsData.totalHits);

    // Actualizar el estado de la aplicación
    appState.images = images;
    appState.totalPages = totalPages;

    // Renderizar las imágenes
    renderImages();
  } catch (error) {
    console.log(error);
  }
}
