/* UI para el formulario de edición de clientes */

// Importaciones
import { validateEditForm } from "../core/logic.js";

// Funciones
export function renderClientForm(client) {
  const { name, email, phone, company, id } = client;

  // Campos del formulario
  const nameInput = document.querySelector(`#name`);
  const emailInput = document.querySelector(`#email`);
  const phoneInput = document.querySelector(`#phone`);
  const companyInput = document.querySelector(`#company`);
  const idInput = document.querySelector(`#id`);

  // Asignar los valores a los campos del formulario
  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;
  companyInput.value = company;
  idInput.value = id;

  const form = document.querySelector(`#form`);
  form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const validate = validateEditForm(
      nameInput.value,
      emailInput.value,
      phoneInput.value,
      companyInput.value,
      idInput.value,
    );

    if (validate) {
      showAlert(validate);

      return;
    }
  });
}
