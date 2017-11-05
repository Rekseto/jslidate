/**
  * @param {Number} length
  * @returns {(value: string) => ({validate: Boolean, message: Array})} - if value has passed the test function returns true
  */
export const maxLength = (length, pattern = length) => value => ({
    validate: value.length <= length,
    message: ['Maximal length', pattern],
});

/**
  * @param {Number} length
  * @returns {(value: string) => ({validate: Boolean, message: Array})} - if value has passed the test function returns true
  */
export const minLength = (length, pattern = length) => value => ({
    validate: value.length >= length,
    message: ['Minimal length', pattern],
});

/**
  * @param {RegExp} regexObj
  * @returns {(value: string) => ({validate: Boolean, message: Array})} - if value has passed the test function returns true
  */
export const patternRule = (regexObj, pattern = regexObj) => value => ({
    validate: regexObj.test(value),
    message: ['Field should match pattern', pattern],
});

const RuleTypes = { maxLength, minLength, patternRule };

export default RuleTypes;