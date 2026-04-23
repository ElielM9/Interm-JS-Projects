/* Funciones para mostrar alertas */

// Importaciones
import { QUOTE_FORM } from "./selectors.js";

// Funciones
export function showAlert(message, container = QUOTE_FORM) {
  // Verificar si ya existe una alerta para evitar mostrar múltiples alertas
  const existingAlert = document.querySelector(`.alert`);

  // Prevenir que se muestren más de una alerta
  if (!existingAlert) {
    const alert = document.createElement(`p`);
    alert.classList.add(`alert`, `alert--error`);
    alert.textContent = message;

    container.appendChild(alert);

    // Eliminar la alerta después de 2 segundos
    setTimeout(() => {
      alert.remove();
    }, 2000);
  }
}
