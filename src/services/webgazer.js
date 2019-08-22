import {useRef, useEffect, useState} from "react";

const OFFSET = {x:20, y:20};
window.webgazer.setGazeListener(async (data, elapsedTime) => {
    subscribers.map(subscriber => subscriber(data, elapsedTime));
    // await sleep(500);
}).begin();

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

export const useAreaOfInterest = (deps) => {
    const elementOfInterest = useRef(null);
    const [lookingAt, setLookingAt] = useState(false);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const listener = (data, elapsedTime) => {
            if (elementOfInterest.current) {
                const boundingBox = elementOfInterest.current && elementOfInterest.current.getBoundingClientRect();
                if (data !== null && !lookingAt &&
                    boundingBox.left - OFFSET.x <= data.x && data.x <= boundingBox.right + OFFSET.x &&
                    boundingBox.bottom - OFFSET.y <= data.y && data.y <= boundingBox.top + OFFSET.y
                ) {
                    setLookingAt(true);
                } else if (lookingAt) {
                    setLookingAt(false);
                }
            }
        };
        subscribe(listener);
        return () => {unsubscribe(listener)};
    }, deps);
    /* eslint-enable react-hooks/exhaustive-deps */
    return [elementOfInterest, lookingAt]
};
