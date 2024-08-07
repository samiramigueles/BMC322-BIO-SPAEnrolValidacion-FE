// EventManager.js
const eventListeners = {};

const subscribe = (eventName, callback) => {
    if (!eventListeners[eventName]) {
        eventListeners[eventName] = [];
    }
    eventListeners[eventName].push(callback);
};

const unsubscribe = (eventName, callback) => {
    if (eventListeners[eventName]) {
        eventListeners[eventName] = eventListeners[eventName].filter(
            (listener) => listener !== callback
        );
    }
};

const emit = (eventName, data) => {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach((listener) => listener(data));
    }
};

export { subscribe, unsubscribe, emit };
