export const webgazer = window.webgazer;
const subscribers = [];

export const subscribe = (callback) => {
    subscribers.push(callback);
};

export const unsubscribe = (callback) => {
    const callbackIndex = subscribers.indexOf(callback);
    subscribers.splice(callbackIndex, 1);
};

webgazer.setGazeListener(function renderLoop(data, elapsedTime) {
    subscribers.map(subscriber => subscriber(data, elapsedTime));
}).begin();
