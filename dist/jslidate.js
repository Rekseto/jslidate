(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.JSLidate = factory());
}(this, (function () { 'use strict';

class EventListener {
    constructor() {
        this.observers = [];
    }

    add(observer) {
        observer.obsId = this.observers.length;
        this.observers.push(observer);
        return this;
    }

    remove(observer) {
        this.observers.splice(observer.obsId, 1);
        delete observer.obsId;
        return this;
    }

    notifySuccess() {
        this.observers.forEach(observer => observer.success());
    }

    notifyReject() {
        this.observers.forEach(observer => observer.reject());
    }

}

class Form {
    /**
     * Form constructor
     * @param {Object[]} inputs - array of selectors
     * @param {String} inputs.selector - selector for Elements
     * @param {Array} inputs.rules - Array of rules
     * @param {Function} rejected - function to call after reject
     * @memberof Form
     */
    constructor({ inputs, form, rejected = () => { }, config = { alwaysCancelSubmit: true } }) {
        const map = new Map();
        const formNode = document.querySelector(form.selector);
        Array.from(inputs)
            .map(({ selector, rules }) => [selector, rules])
            .forEach(([selector, rules]) =>
                map.set(formNode.querySelectorAll(selector), rules));

        this.map = map;
        this.config = config;
        this.form = formNode;
        this.eventListener = new EventListener();
        this.bindEvents(rejected);
    }

    validate({ value }, rules) {

        return rules
            .map(rule => rule(value))
            .filter(({ validate }) => !validate)
            .map(({ message }) => message)
            .map(([message, pattern]) => `${message}: ${pattern}`);
    }

    validInputs() {
        const isIterable = value => (
            value instanceof Array
            || value instanceof HTMLCollection
            || value instanceof NodeList
        );
        return Array.from(this.map)
            .filter(([value]) => isIterable(value) || (value instanceof Element))
            .map(([value, rules]) => [(isIterable(value) ? Array.from(value) : value), rules])
            .map(([value, rules]) => {
                if (isIterable(value)) {
                    const [errors] = value
                        .map(input => this.validate(input, rules));
                    return errors;
                }
                return this.validate(value, rules);
            })
            .reduce((errors, error) => [...errors, ...error], []);
    }

    bindEvents(rejected) {
        this.form.addEventListener('submit', (e) => {
            const wrongFilled = this.validInputs();
            if (wrongFilled.length > 0) {
                e.preventDefault();
                this.eventListener.notifyReject(wrongFilled);
                rejected(wrongFilled);
            } else if (this.config.alwaysCancelSubmit) {
                e.preventDefault();
                this.eventListener.notifySuccess();
            }
        });
    }

}

return Form;

})));
