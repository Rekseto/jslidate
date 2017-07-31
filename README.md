### JSLidate

JSLidate is libraray for JS validation

## Sample usage


Code below creates Form object

```javascript
       const impForm = new jslidate ({
           inputs: [{
               selector: '.input' ,
               rules   : [minLength (1) , maxLength (5)] ,
           } ,{
               selector: '.inpute' ,
               rules   : [minLength (2) , maxLength (19)] ,
           } ] ,
           form:{
               selector: '.form',
           }
       },function () {
       console.log('Form rejected');
       });
```

Rules are based on currying functions (sample functions are visible in RuleTypes.js file)

Sample maxLength function on ES6 syntax

```javascript
const maxLength = length => value => value.length <= length;
```