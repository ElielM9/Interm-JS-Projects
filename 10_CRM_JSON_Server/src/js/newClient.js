/* Archivo para manejar la creación de nuevos clientes */

// Importaciones
import { renderNewClientForm } from "./components/newClientFormUI.js";

// Funciones
function startApp() {
  renderNewClientForm();
}

// Inicialización de la app
document.addEventListener("DOMContentLoaded", startApp);
