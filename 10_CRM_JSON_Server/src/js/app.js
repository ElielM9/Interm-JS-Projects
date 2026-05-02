/* Archivo principal de la aplicación */

// Importaciones
import { showClients } from "./components/clientsUI.js";

// Funciones
function startApp() {
  showClients();
}

// Inicialización de la app
document.addEventListener(`DOMContentLoaded`, startApp);
