/* Importaciones */
import { dataBase } from "../utils/variables.js";
import {
  NAME_INPUT,
  EMAIL_INPUT,
  PHONE_INPUT,
  COMPANY_INPUT,
} from "../utils/selectors.js";
import { printAlert } from "../utils/alerts.js";

export function validateCustomer(e) {
  e.preventDefault();

  // Validar que los inputs no estén vacíos
  if (
    !NAME_INPUT.value ||
    !EMAIL_INPUT.value ||
    !PHONE_INPUT.value ||
    !COMPANY_INPUT.value
  ) {
    printAlert(`Todos los campos son obligatorios`, `error`);

    return;
  }

  // Crear un objeto con la información
  const client = {
    name: NAME_INPUT.value,
    email: EMAIL_INPUT.value,
    phone: PHONE_INPUT.value,
    company: COMPANY_INPUT.value,
    id: Date.now(),
  };

  // Funcion que crea un nuevo cliente
  createClient(client);
}

function createClient(client) {
  // Abrir una transacción para escribir en la base de datos
  const transaction = dataBase.value.transaction(`crm`, `readwrite`);
  const objectStore = transaction.objectStore(`crm`);

  // Añadir el cliente a la base de datos
  objectStore.add(client);

  transaction.onerror = () => {
    printAlert(`Hubo un error`, `error`);
  };

  transaction.oncomplete = () => {
    printAlert(`Cliente añadido correctamente`);

    // Envía al usuario a la sección de clientes despues de 3 seg
    setTimeout(() => {
      window.location.href = `index.html`;
    }, 3000);
  };
}
