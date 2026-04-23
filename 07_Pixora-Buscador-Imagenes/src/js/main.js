/* Importaciones */
import { SEARCHER_FORM_ID } from "./utils/selectors.js";
import { validateForm } from "./core/logic.js";

function startApp() {
  // Funcion para el formulario de busqueda
  handleSearcherForm();
}

function handleSearcherForm() {
  SEARCHER_FORM_ID.addEventListener(`submit`, validateForm);
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener(`DOMContentLoaded`, startApp);
