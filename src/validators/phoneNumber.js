/**
 * This function return false y the number does not start with '3'
 * @param {number} number
 * @param {number} digit
 * @returns boolean
 */
export function startWhitThree(number) {
  // Regular expression to check the length of the phone number, I gotta start with number 3 and contains 10 digits
  var regex = /^3\d{9}$/;

  // Check the regular expression
  return regex.test(number);
}
