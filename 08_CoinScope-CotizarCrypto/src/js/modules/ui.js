/* Módulo para gestionar la interfaz de usuario */

// Importaciones
import { CRYPTO_SELECT, QUOTE_FORM } from "../utils/selectors.js";
import { clearHTML } from "../utils/helpers.js";

// Funciones

export function fillSelects(cryptocurrencies) {
  cryptocurrencies.forEach((crypto) => {
    const { FullName, Name } = crypto.CoinInfo;

    const option = document.createElement(`option`);
    option.value = Name;
    option.textContent = FullName;

    CRYPTO_SELECT.appendChild(option);
  });
}

export function showQuoteHTML(quote) {
  // Extraer los valores necesarios del objeto quote
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quote;

  // Crear el contenedor de resultados
  const resultsCard = prepareContainer();

  // Crear un arreglo de objetos para almacenar la informacion para mostrar
  const quoteData = [
    { label: `Precio`, value: PRICE },
    { label: `Precio más alto del día`, value: HIGHDAY },
    { label: `Precio más bajo del día`, value: LOWDAY },
    { label: `Últimas 24 horas`, value: `${CHANGEPCT24HOUR}%` },
    { label: `Última actualización`, value: LASTUPDATE },
  ];

  // Iterar sobre el arreglo de objetos para crear los elementos HTML de forma dinamica y evitar repetir codigo
  quoteData.forEach((item) => {
    const { label, value } = item;

    const paragraph = document.createElement(`p`);
    paragraph.classList.add(`results-card__text`);
    paragraph.innerHTML = `${label}: <span class="results-card__highlight">${value}</span>`;

    resultsCard.appendChild(paragraph);
  });
}

function prepareContainer() {
  let resultsCard = document.querySelector(`.results-card`);

  if (!resultsCard) {
    resultsCard = document.createElement(`div`);
    resultsCard.classList.add(`results-card`);
    QUOTE_FORM.parentElement.appendChild(resultsCard);

    return resultsCard;
  }

  clearHTML(resultsCard);

  return resultsCard;
}

export function showSpinner() {
  const resultsCard = prepareContainer();

  const spinner = document.createElement(`div`);
  spinner.classList.add(`sk-folding-cube`);
  spinner.innerHTML = `
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>`;

  resultsCard.appendChild(spinner);
}
