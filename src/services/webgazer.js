import {useRef, useEffect, useState} from "react";

const OFFSET = {x:20, y:20};
// window.webgazer.setGazeListener(async (data, elapsedTime) => {
//     subscribers.map(subscriber => subscriber(data, elapsedTime));
// }).begin().showVideo(0).showFaceOverlay(0).showFaceFeedbackBox(0);

export const showEyeTracker = (webgazer) => {
    webgazer.showPredictionPoints(1).showVideo(1).showFaceOverlay(1).showFaceFeedbackBox(1).setVideoViewerSize(200, 150);
};
export const hideEyeTracker = (webgazer) => {
    if (webgazer) {
        webgazer.showPredictionPoints(0).showVideo(0).showFaceOverlay(0).showFaceFeedbackBox(0);
    }
};

const subscribers = [];

export const subscribe = (callback) => {
    subscribers.push(callback);
};

export const unsubscribe = (callback) => {
    const callbackIndex = subscribers.indexOf(callback);
    subscribers.splice(callbackIndex, 1);
};

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
                } else {
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
