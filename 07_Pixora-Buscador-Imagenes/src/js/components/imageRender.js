/* Importaciones */
import { appState } from "../core/state.js";
import { RESULTS_CONTAINER_ID } from "../utils/selectors.js";
import { clearPreviousResults } from "../utils/helpers.js";
import { renderPaginator } from "./paginator.js";

/* Funciones */
export function renderImages() {
  const { images } = appState;
  // Limpiar resultados anteriores
  clearPreviousResults(RESULTS_CONTAINER_ID);

  // Iterar sobre las imágenes y mostrarlas en el DOM
  images.forEach((image) => {
    const { likes, views, largeImageURL, pageURL } = image;

    const imgItem = document.createElement(`div`);
    imgItem.classList.add(`gallery-item`);
    imgItem.setAttribute(`tabindex`, `0`);
    imgItem.innerHTML = `
      <img src="${largeImageURL}" class="gallery-item__img" />
      <div class="gallery-item__info">
        <p class="gallery-item__likes">👍 ${likes}</p>
        <p class="gallery-item__views">👁️ ${views}</p>
        <a
           href="${pageURL}"
           target="_blank"
           rel="noopener noreferrer"
           class="gallery-item__btn">
            Ver imágen
        </a>
      </div>
    `;

    // Mostrar imagenes inmediatamente
    RESULTS_CONTAINER_ID.appendChild(imgItem);
  });

  // Imprimir el paginador
  renderPaginator();
}
