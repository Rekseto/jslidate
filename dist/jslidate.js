(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.JSLidate = factory());
}(this, (function () { 'use strict';

class Form {
    /*
     * Form constructor
     *
     *  @param {Object} obj - object that contains all of inputs and rules
     *  @param {String} obj.inputs[i].selector - selector for Elements
     *  @param {Array} obj.inputs[i].rules - Array of rules
     *  @param {Function} rejected - function to call after reject
     */
    constructor ( obj , rejected = function ( ) { }) {
        this.map = new Map ();
        for(let i =0; i<obj.inputs.length; i++) {
            this.map.set(document.querySelectorAll(obj.inputs[i].selector), obj.inputs[i].rules);
        }
        this.form = document.querySelector(obj.form.selector);
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
