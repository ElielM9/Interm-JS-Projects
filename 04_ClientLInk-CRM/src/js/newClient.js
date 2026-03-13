/* Importaciones */
import { connectDb } from "./db/dataBaseActions.js";
import { bindNewClientEvents } from "./events/bindEvents.js";

(function () {
  // Inicializar la app
  document.addEventListener(`DOMContentLoaded`, startApp);

  function startApp() {
    // Conectar a la base de datos
    connectDb();

    // Llamar a la función de eventos
    bindNewClientEvents();
  }
})();
