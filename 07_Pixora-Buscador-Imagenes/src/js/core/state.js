/* Estado de la aplicación */

export let appState = getInitialState();

function getInitialState() {
  return {
    images: [],
    currentPage: 1,
    totalPages: 0,
  };
}
