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
