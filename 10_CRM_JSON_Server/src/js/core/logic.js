/* Lógica de la aplicación */

// Importaciones
import { validateHasEmptyFields as validate } from "../utils/validators.js";
import { showAlert } from "../utils/domUtils.js";
import { addClient, getClient, updateClient } from "../api/clientsAPI.js";
import { renderClientForm } from "../components/clientFormUI.js";

// Funciones
export function validateForm(name, email, phone, company) {
  const client = {
    name,
    email,
    phone,
    company,
  };

  if (validate(client)) {
    return `Todos los campos son obligatorios`;
  }

  // Agregar cliente a la base de datos
  addClient(client);
}

export async function loadClientData() {
  const urlParams = new URLSearchParams(window.location.search);
  const idClient = urlParams.get(`id`);

  const client = await getClient(idClient);

  renderClientForm(client);
}

export function validateEditForm(name, email, phone, company, id) {
  const clientUpdated = {
    name,
    email,
    phone,
    company,
    id,
  };

  if (validate(clientUpdated)) {
    return `Todos los campos son obligatorios`;
  }

  // Reescribir el objeto cliente con los nuevos datos
  updateClient(clientUpdated);
}
