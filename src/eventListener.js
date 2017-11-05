export default class EventListener {
    
    
        constructor() {
            this.observers = [];
        }
    
        add(observer) {
            observer.obsId = this.observers.length;
            this.observers.push(observer);
            return this;
        }
    
        remove(observer) {
            delete observer.obsId;
            this.observers.splice(observer.obsId, 1);
            return this;
        }
    
        notifySuccess() {
            for (let i=0; i < this.observers.length; i++){
                this.observers[i].success();
            }
        }
    
        notifyReject() {
            for (let i=0; i < this.observers.length; i++){
                this.observers[i].reject();
            }
        }
        
    }