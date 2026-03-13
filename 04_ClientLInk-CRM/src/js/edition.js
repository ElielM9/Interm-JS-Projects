/* Importaciones */
import { connectDb } from "./db/dataBaseActions.js";
import { bindEditionCustomerEvents } from "./events/bindEvents.js";
import { processCustomerId } from "./modules/updateCustomer.js";

(function () {
  document.addEventListener(`DOMContentLoaded`, startApp);

  function startApp() {
    // Conectar a la base de datos
    connectDb();

    // Llamar a las funciones de eventos
    bindEditionCustomerEvents();

    // Obtener el id del cliente y llenar el formulario con sus datos para edición
    processCustomerId();
  }
})();
