(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.JSLidate = factory());
}(this, (function () { 'use strict';

class Form {
    /**
     * Form constructor
     * @param {Array} inputs - array of selectors
     * @param {String} inputs.selector - selector for Elements
     * @param {Array} inputs.rules - Array of rules
     * @param {Function} rejected - function to call after reject
     * @memberof Form
     */
    constructor ({ inputs, form }, rejected = () => {}) {
        const map = new Map ();
        const formNode = document.querySelector(form.selector);
        Array.from(inputs)
            .map(({ selector, rules }) => [ selector, rules ])
            .forEach(([ selector, rules ]) =>
                map.set(formNode.querySelectorAll(selector), rules));
        this.map = map;
        this.form = formNode;
        this.errors = new Map ();
        this.bindEvents (rejected);
    }

    validate ({ value }, rules) {
        const nonMatched = rules.filter(rule => !rule(value));
        return nonMatched.length === 0;
    }

    bindEvents (rejected) {
        const { form, validate, map } = this;
        form.addEventListener ('submit', (e) => {
            let valid;
            const wrongFilled = [];
            for (const [value, rules] of map) {
                if (value instanceof Array
                || value instanceof HTMLCollection
                || value instanceof NodeList) {
                    const nonMatched = Array.from(value)
                        .filter(item => !validate(item, rules));
                    if (nonMatched.length > 0) {
                        wrongFilled.push(nonMatched);
                        valid = false;
                    }
                }
                if (value instanceof Element
                || value instanceof HTMLElement) {
                    if (!validate (value, rules)) {
                        wrongFilled = value;
                        valid = false;

                    }
                }
            }
            if (valid === false) {
                e.preventDefault ();
                rejected(wrongFilled);
                return false;
            }
        });
    }
}

return Form;

})));
