/* Importaciones */
import { FORM, CUSTOMER_LIST } from "../utils/selectors.js";
import { validateCustomer } from "../modules/createCustomer.js";
import { updateCustomer } from "../modules/updateCustomer.js";
import { deleteCustomer } from "../modules/deleteCustomer.js";

export function bindNewClientEvents() {
  FORM.addEventListener(`submit`, validateCustomer);
}

export function bindEditionCustomerEvents() {
  FORM.addEventListener(`submit`, updateCustomer);
}

export function bindDeleteEvent() {
  CUSTOMER_LIST.addEventListener(`click`, deleteCustomer);
}
