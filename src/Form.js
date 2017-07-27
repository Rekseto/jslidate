export default class Form {
    /*
     *  @param {Object} targets - map of objects
     *  @param {Element} targets.key - Element associated with rules
     *  @param {Array} targets.value - Array of rules
     */
    constructor ( targets , form ) {
        this.map = new Map (targets);
        this.form = form;
        for (let [key, value] of this.map.entries ()) {
            if (key instanceof Element || NodeList || HTMLCollection || Array) {
                this.bindEvents (key , value);
            }
        }
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
    
    bindEvents ( el , rules ) {
        this.form.addEventListener ('submit' , e => {
            if (el ) {
                let counter = 0;
                for (let i = 0; i < el.length; i++) {
                    if (this.validate (el[ i ] , rules) === true) {
                        counter++;
                    }
                }
                if (counter === el.length) {
                } else {
                    e.preventDefault ();
                    return false;
                }
                
            }
            else if(el instanceof Element) {
                if (this.validate (el , rules) === false) {
                    e.preventDefault();
                    return false;
                }
            }
        });
    }
}