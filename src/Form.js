export default class Form {
    /*
     *  @param {Object} targets - map of objects
     *  @param {Element} targets.key - Element associated with rules
     *  @param {Array} targets.value - Array of rules
     */
    constructor ( targets , form ) {
        this.map = new Map (targets);
        this.form = form;
                this.bindEvents ();
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
    
    bindEvents ( ) {
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
                        return false;
                    }
        
                }
                 if (key instanceof Element) {
                    
                    if (this.validate (key , value) === false) {
                        e.preventDefault ();
                        return false;
                    }
                }
            }
        });
    }
}