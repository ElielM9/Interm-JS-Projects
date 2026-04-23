/* Funciones auxiliares */

export function clearHTML(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
