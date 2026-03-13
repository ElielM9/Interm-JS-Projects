/* Impotaciones */
import { dataBase, customerId } from "../utils/variables.js";
import {
  NAME_INPUT,
  EMAIL_INPUT,
  PHONE_INPUT,
  COMPANY_INPUT,
} from "../utils/selectors.js";
import { printAlert } from "../utils/alerts.js";

export function processCustomerId() {
  const urlParams = new URLSearchParams(window.location.search);
  customerId.value = urlParams.get(`id`);

  // Validar id
  if (customerId.value) {
    setTimeout(() => {
      getCustomer(customerId.value);
    }, 100);
  }
}

function getCustomer(id) {
  const transaction = dataBase.value.transaction(`crm`, `readwrite`);
  const objectStore = transaction.objectStore(`crm`);

  const customer = objectStore.openCursor();
  customer.onsuccess = (e) => {
    const cursor = e.target.result;

    if (cursor) {
      if (cursor.value.id === Number(id)) {
        fillForm(cursor.value);
      }
      cursor.continue();
    }
  };
}

function fillForm(customerData) {
  // Obtener los datos del cliente seleccionado para llenar el formulario
  const { name, email, phone, company } = customerData;

  // Llenar los inputs con los datos del cliente seleccionado
  NAME_INPUT.value = name;
  EMAIL_INPUT.value = email;
  PHONE_INPUT.value = phone;
  COMPANY_INPUT.value = company;
}

export function updateCustomer(e) {
  e.preventDefault();

  // Validar que los inputs no están vacíos
  if (
    !NAME_INPUT.value ||
    !EMAIL_INPUT.value ||
    !PHONE_INPUT.value ||
    !COMPANY_INPUT.value
  ) {
    printAlert(`Todos los campos son obligatorios`, `error`);

    return;
  }

  // Actualizar el cliente
  const upgradedCustomer = {
    name: NAME_INPUT.value,
    email: EMAIL_INPUT.value,
    phone: PHONE_INPUT.value,
    company: COMPANY_INPUT.value,
    id: Number(customerId.value),
  };

  // Abrir una transacción para escribir en la base de datos
  const transaction = dataBase.value.transaction(`crm`, `readwrite`);
  const objectStore = transaction.objectStore(`crm`);

  // Actualizar el cliente en la base de datos
  objectStore.put(upgradedCustomer);

  transaction.oncomplete = function () {
    printAlert(`Cliente actualizado correctamente`, `success`);

    // Redireccionar al usuario a la sección de clientes despues de 3 seg
    setTimeout(() => {
      window.location.href = `index.html`;
    }, 3000);
  };

  transaction.onerror = function () {
    printAlert(`Hubo un error`, `error`);
  };
}
