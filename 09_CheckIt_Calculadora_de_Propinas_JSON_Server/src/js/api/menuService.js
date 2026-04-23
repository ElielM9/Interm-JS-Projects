/* Servicio para interactuar con la API del menú */

// Importaciones
import { appState } from "../core/state.js";
import { renderCategoryFilter, renderMenu } from "../components/menuUI.js";

export async function loadMenu() {
  const URL_MENU = `http://localhost:3000/menu`;

  try {
    const response = await fetch(URL_MENU);
    const data = await response.json();

    // Asignar los datos al estado global de la app
    appState.dishes = data.dishes;
    appState.categories = data.categories;

    // Destructuring del estado de la app
    const { dishes, categories } = appState;

    // Función para llenar el filtro de categorías
    renderCategoryFilter(categories);

    // Función para renderizar el Menú
    renderMenu(dishes, categories);
  } catch (error) {
    console.error(error);
  }
}
