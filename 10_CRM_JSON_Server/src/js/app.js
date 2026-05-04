/* Archivo principal de la aplicación */

// Importaciones
import { renderClientForm } from "./components/clientFormUI.js";
import { showClients } from "./components/clientsUI.js";
import { loadClientData } from "./core/logic.js";

// Variables globales
const routes = {
  "index.html": showClients,
  "new-client.html": renderClientForm,
  "edition.html": loadClientData,
};

// Funciones
function startApp() {
  // Obtener la página actual
  const currentPage = window.location.pathname.split(`/`).pop() || `index.html`;

  // Cargar la función correspondiente a la página actual
  const routeFunction = routes[currentPage];

  if (routeFunction) {
    routeFunction();

    return;
  }

  // Si no se encuentra la ruta, mostrar un mensaje de error
  console.error(`No se encontró una función para la página: ${currentPage}`);
}

// Inicialización de la app
document.addEventListener(`DOMContentLoaded`, startApp);
