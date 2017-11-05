# JSLidate
JSLidate is libraray for JS validation

## Sample usage
Code below creates Form object

```javascript
const impForm = new JSLidate ({
    inputs: [{
        selector: '.input_1' ,
        rules   : [minLength (1) , maxLength (5)] ,
    }, {
        selector: '.input_2' ,
        rules   : [minLength (2) , maxLength (4), patternRule(/[a-b]/img, 'a-b alphanumeric')] ,
    }],
    form:{
        selector: '.form',
    }
}, (wrongFilled) => console.log('Form rejected'));
```
## API
### Creating rules
Rules are based on currying functions (sample functions are visible in RuleTypes.js file)

Example:

```javascript
// ES6
const minLength = (length, pattern = length) => value => ({
    validate: value.length >= length,
    message: ['Minimal length', pattern],
});
// ES5
var maxLenth = function(length, pattern) {
    return function(value) {
        return {
            validate: value.length <= length,
            message: ['Minimal length', pattern || length]
        };
    }
}
```
### Callback function
JSlidate object applies callback for wrong filled form.
```javascript
(wrongFilled) => console.log(wrongFilled);
```
+ wrongFilled: Array
   This contains an array of elements which did not get through the validation process.


## Contribution
### Install packages
```
npm install
```
### Rollup CLI
```
npm install -g rollup
```
### Build
```
rollup -c
```
### Development
```
rollup -c -w
```
