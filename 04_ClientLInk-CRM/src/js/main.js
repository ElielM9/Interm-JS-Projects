/* Importaciones */
import { createDataBase } from "./db/dataBaseActions.js";
import { bindDeleteEvent } from "./events/bindEvents.js";
import { checkDatabaseAndGetCustomers } from "./modules/getCustomers.js";

(function () {
  // Inicializar la app
  document.addEventListener(`DOMContentLoaded`, startApp);

  function startApp() {
    // Crear la base de datos si no existe
    createDataBase();

    // Llamar a la función de eventos
    bindDeleteEvent();

    // Verificar la existencia de la base de datos y obtener los clientes si es necesario
    checkDatabaseAndGetCustomers();
  }
})();
