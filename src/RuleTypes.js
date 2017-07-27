//TODO JSDoc

/*
* @param {Number} length - maximum length
* @param {Numer} value - value to validate
*
* @returns {Boolean} - if value has passed the test function returns true
 */
export const maxLength = length => value => value.length <= length;

export const minLength = length => value => value.length >= length;

export const patternRule = regexObj => value => regexObj.test(value);