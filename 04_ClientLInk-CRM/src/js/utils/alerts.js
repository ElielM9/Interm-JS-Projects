/* Importacines */
import { FORM } from "../utils/selectors.js";

export function printAlert(message, type) {
  const ALERT = document.querySelector(`.alert`);

  // Si no existe una alerta previa, entonces muestra la nueva.
  if (!ALERT) {
    const ALERT_ELEMENT = document.createElement(`DIV`);
    ALERT_ELEMENT.textContent = message;

    ALERT_ELEMENT.classList.add(
      `alert`,
      `px-4`,
      `py-3`,
      `rounded-xl`,
      `max-w-lg`,
      `mx-auto`,
      `mt-2`,
      `text-center`
    );

    // Validar el tipo de alerta
    if (type === `error`) {
      ALERT_ELEMENT.classList.add(
        `border`,
        `border-red-400`,
        `bg-red-100`,
        `text-red-700`
      );
    } else {
      ALERT_ELEMENT.classList.add(
        `border`,
        `border-green-400`,
        `bg-green-100`,
        `text-green-700`
      );
    }

    // Insertar el alerta en el documento
    FORM.appendChild(ALERT_ELEMENT);

    // Eliminar el alerta después de 3 segundos
    setTimeout(() => {
      ALERT_ELEMENT.remove();
    }, 3000);
  }
}
