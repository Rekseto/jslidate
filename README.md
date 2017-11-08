# JSLidate
JSLidate is libraray for JS validation

## Sample usage
Code below creates Form object

```javascript
    const impForm = new JSLidate({
        inputs: [{
            selector: '.input_1' ,
            rules: [minLength (1), maxLength (5)] ,
        }, {
            selector: '.input_2' ,
            rules: [minLength (2), maxLength (4), patternRule(/[a-b]/img, 'a-b alphanumeric')] ,
        }],
         form: {
            selector: '.form',
        },
        rejected: (wrongFilled) => document.getElementById('output').innerText = wrongFilled,
        config: {alwaysCancelSubmit : false}
    });
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
var maxLength = function(length, pattern) {
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

### EventListener
JSlidate object has EventListener (Observer).

eventListener is fully chainable.

```javascript
class callbackObject {
    constructor() {

    }

    success() {
        console.log('We did it, form has been passed.');
    }
    
    reject() {
        console.log('We got some problems here!');
    }
}

impForm.eventListener
.add(new callbackObject())
.add(new callbackObject())
```

#### Adding callbackObject
```javascript
impForm.eventListener
.add(new callbackObject());
```

callbackObject must contain success and reject functions.

#### Removing callbackObject

```javascript
impForm.eventListener
.remove(callbackObject);
```

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
