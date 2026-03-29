/* Aplicación principal */

// Importaciones
import { initOrderListener } from "./core/orderLogic.js";

// Funciones
function startApp() {
  initOrderListener();
}

/* Inicializacion de la app */
document.addEventListener(`DOMContentLoaded`, startApp);
