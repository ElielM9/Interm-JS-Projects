/* Archivo para la edición de clientes */

// Importaciones
import { loadClientData } from "./core/logic.js";

// Funciones
function startApp() {
  loadClientData();
}

// Inicializar la app
document.addEventListener(`DOMContentLoaded`, startApp);
