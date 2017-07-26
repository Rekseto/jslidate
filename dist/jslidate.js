(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.jslidate = factory());
}(this, (function () { 'use strict';

class Form {
    /*
     *
     *  @param {Object} targets - map of objects
     *  @param {Element} targets.key - Element associated with rules
     *  @param {Array} targets.value - Array of rules
     */
    constructor ( targets , form ) {
        this.map = new Map (targets);
        for (let [key, value] of this.map.entries ()) {
            this.bindEvents (key , value);
        }
    }
    
    validate(el, rules) {
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
    bindEvents ( el , rules ) {
        this.form.addEventListener ('submit' , e => {
            if(this.validate(el, rules) === true ) {
                
            } else {
                e.preventDefault();
            }
        });
    }
}

return Form;

})));
