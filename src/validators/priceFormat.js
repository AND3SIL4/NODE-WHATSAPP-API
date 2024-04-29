/**
 * This function takes a number and return it formatted as a price way
 * @param {number} numero
 * @returns
 */
export function formatoPrecio(number) {
  return "$" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
