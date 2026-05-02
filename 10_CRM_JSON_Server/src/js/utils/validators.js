/* Validadores */

export function validateHasEmptyFields(obj) {
  return !Object.values(obj).every((input) => input !== ``);
}
