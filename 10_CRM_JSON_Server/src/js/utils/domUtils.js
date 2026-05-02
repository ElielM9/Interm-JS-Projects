/*  */

// Importaciones

// Funciones
export function showAlert(message) {
  const existingAlert = document.querySelector(`.alert`);

  if (existingAlert) {
    existingAlert.remove();
  }

  const alert = document.createElement(`p`);
  alert.classList.add(
    `alert`,
    `bg-red-100`,
    `border-red-400`,
    `text-red-700`,
    `px-4`,
    `py-3`,
    `rounded`,
    `relative`,
    `mb-4`,
    `mx-auto`,
    `text-center`,
  );
  alert.textContent = message;

  const form = document.querySelector(`#form`);
  form.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}
