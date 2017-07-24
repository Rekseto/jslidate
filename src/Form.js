

export default class Form {
    /*
    *
    *  @param {Object} map - map of objects
    *  @param {Element} map.key - Element associated with rules
    *  @param {Array} map.value - Array of rules
     */
    constructor(map) {
        for (let [key, value] of map.entries()) {
            if(key instanceof Element) {
                
            } else {
                return new Error('Map key must be an Element!');
            }
        }
    }
    
    add () {
        
    }
    
    bindEvents(el, rules) {
        for(let i =0; i<rules.length; i++) {
            
        }
    }
    
}