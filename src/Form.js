export default class Form {
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
    
    bindEvents ( el , rules ) {
        this.form.addEventListener ('submit' , e => {
            if (el instanceof Element || Array || NodeList) {
                if (el instanceof Element) {
                    for (let i = 0; i < rules.length; i++) {
                        rules[ i ] (el.value);
                    }
                } else {
                    for (let i = 0; i < el.length; i++) {
                        for (let i = 0; i < rules.length; i++) {
                            rules[ i ] (el.value);
                        }
                    }
                }
            } else {
                return new Error ('el must to be an Element, Array or NodeList')
            }
        });
    }
}