/*
* @param {Number} length - maximum length
* @param {String} value - value to validate
*
* @returns {Boolean} - if value has passed the test function returns true
 */
export const maxLength = length => value => value.length <= length;

/*
 * @param {Number} length - maximum length
 * @param {String} value - value to validate
 *
 * @returns {Boolean} - if value has passed the test function returns true
 */
export const minLength = length => value => value.length >= length;

/*
 * @param {Object} regexObj - regExp Object
 * @param {String} value - value to validate
 *
 * @returns {Boolean} - if value has passed the test function returns true
 */
export const patternRule = regexObj => value => regexObj.test(value);