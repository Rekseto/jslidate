(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.jslidate = factory());
}(this, (function () { 'use strict';

class Form {
    /*
     *  @param {Object} targets - map of objects
     *  @param {Element} targets.key - Element associated with rules
     *  @param {Array} targets.value - Array of rules
     */
    constructor ( targets , form , rejected = function ( ) { }) {
        this.map = new Map (targets);
        this.form = form;
        this.bindEvents (rejected);
    }
    
    validate ( el , rules ) {
        let rulesLength = rules.length;
        let counter = 0;
        if (el instanceof Element || HTMLElement) {
            let val = el.value;
            for (let i = 0; i < rulesLength; i++) {
                if (rules[ i ] (val)) {
                    counter++;
                }
            }
            if (counter === rulesLength) {
                return true;
            } else {
                return false;
            }
        }
        
    }
    
    bindEvents ( rejected ) {
        this.form.addEventListener ('submit' , e => {
            for (let [key, value] of this.map) {
                if (key instanceof Array || key instanceof HTMLCollection || key instanceof NodeList) {
                    let counter = 0;
                    for (let i = 0; i < key.length; i++) {
                        if (this.validate (key[ i ] , value) === true) {
                            counter++;
                        }
                    }
                    if ((counter === key.length) === false) {
                        e.preventDefault ();
                        rejected.call(key);
                        return false;
                    }
                    
                }
                if (key instanceof Element) {
                    
                    if (this.validate (key , value) === false) {
                        e.preventDefault ();
                        rejected.call(key);
                        return false;
                    }
                }
            }
        });
    }
}

return Form;

})));
