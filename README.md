### JSLidate

JSLidate is libraray for JS validation

## Sample usage

// TODO README.md

Code below creates Form object that applies array for map with [element, [array of rules]]

```javascript
    const impForm = new jslidate([[document.querySelectorAll('.input'), [minLength(1) , maxLength(5)]], [document.querySelector('.inpute'),  [maxLength(5)] ]], document.querySelector('.form'));
```

Rules are based on currying functions (sample functions are visible in RuleTypes.js file)

Sample maxLength function on ES6 syntax

```javascript
const maxLength = length => value => value.length <= length;
```