export default class Form {
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
        this.bindEvents (rejected);
    }

    validate ({ value }, rules) {
        const matched = rules.filter(rule => rule(value));
        return matched.length === rules.length;
    }
    
    bindEvents (rejected) {
        const { form, validate, map } = this;
        form.addEventListener ('submit', (e) => {
            for (const [value, rules] of map) {
                if (value instanceof Array
                || value instanceof HTMLCollection
                || value instanceof NodeList) {
                    const matched = Array.from(value)
                        .filter(item => validate(item, rules));
                        
                    if (matched.length !== value.length) {
                        e.preventDefault ();
                        rejected(value);
                        return false;
                    }
                }
                if (value instanceof Element
                || value instanceof HTMLElement) {
                    if (!validate (value, rules)) {
                        e.preventDefault ();
                        rejected(value);
                        return false;
                    }
                }
            }
        });
    }
}