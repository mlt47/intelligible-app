export const webgazer = window.webgazer;
const subscribers = [];

export const subscribe = (callback) => {
    subscribers.push(callback);
};

export const unsubscribe = (callback) => {
    const callbackIndex = subscribers.indexOf(callback);
    subscribers.splice(callbackIndex, 1);
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

webgazer.setGazeListener(async (data, elapsedTime) => {
    subscribers.map(subscriber => subscriber(data, elapsedTime));
    await sleep(500);
}).begin();
