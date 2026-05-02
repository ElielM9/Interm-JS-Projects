/* Componente para el formulario de nuevo cliente */

// Importaciones
import { validateForm } from "../core/logic.js";
import { showAlert } from "../utils/domUtils.js";

// Funciones
export function renderNewClientForm() {
  const form = document.querySelector(`#form`);
  form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const name = document.querySelector(`#name`).value;
    const email = document.querySelector(`#email`).value;
    const phone = document.querySelector(`#phone`).value;
    const company = document.querySelector(`#company`).value;

    const validate = validateForm(name, email, phone, company);

    if (validate) {
      showAlert(validate);

      return;
    }
  });
}
