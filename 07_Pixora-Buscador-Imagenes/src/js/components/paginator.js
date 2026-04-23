/* Importaciones */
import { appState } from "../core/state.js";
import { createPaginator } from "../core/logic.js";
import { clearPreviousResults } from "../utils/helpers.js";
import { searchImages } from "../api/searchImages.js";

export function renderPaginator() {
  const { totalPages } = appState;

  const paginationContainer = document.querySelector(`#pagination-container`);
  clearPreviousResults(paginationContainer);

  // Generar el paginador
  let iterator = createPaginator(totalPages);

  while (true) {
    const { value, done } = iterator.next();

    if (done) return;

    // Generar un boton por elemento en el generador
    const pageButton = document.createElement(`a`);
    pageButton.href = `#`;
    pageButton.dataset.page = value;
    pageButton.textContent = value;
    pageButton.classList.add(`pagination__btn`);

    pageButton.onclick = () => {
      appState.currentPage = value;

      searchImages();
    };

    paginationContainer.appendChild(pageButton);
  }
}
