const validate = function(el, rules) {
    let rulesLength = rules.length;
    let val = el.value;
    let counter =0;
    for(let i = 0; i<rulesLength; i++) {
        if(rules[i](val)) {
            counter++;
        }
    }
    if(counter === rulesLength) {
        return true;
    } else {
        return false;
    }
}

let obj = {
    value  : 5
}
const maxLength = length => value => value <= length;
console.log(validate(obj, [maxLength(4+1)]))