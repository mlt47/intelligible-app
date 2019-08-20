import React, {useEffect} from "react";
import * as gazer from "../services/webgazer";

export const Word = ({word}) => {
    useEffect(() => {
        const listener = (data, elapsedTime) => {
            if (data !== null) {
                console.log(`${word} (${data.x}, ${data.y})`);
            }
        };
        gazer.subscribe(listener);
        return () => {gazer.unsubscribe(listener)};
    }, [word]);

    console.log(`Render word [${word}]`);
    return <span>
        {word}
    </span>
};