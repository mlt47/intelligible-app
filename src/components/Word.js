import React, {useEffect, useRef} from "react";
import * as gazer from "../services/webgazer";

const OFFSET = 20;

export const Word = ({word}) => {
    const wordRef = useRef(null);
    useEffect(() => {
        const listener = (data, elapsedTime) => {
            if (wordRef.current) {
                const element =  wordRef.current;
                if (data !== null) {
                    const wordBox = element.getBoundingClientRect();
                    if (wordBox.left - OFFSET <= data.x && data.x <= wordBox.right + OFFSET &&
                        wordBox.bottom - OFFSET <= data.y && data.y <= wordBox.top + OFFSET
                    ) {
                        console.log(`${word} (${data.x}, ${data.y})`);
                        element.setAttribute("class", "highlight");
                    }
                } else {
                    element.setAttribute("class", "");
                }
            }
        };
        gazer.subscribe(listener);
        return () => {gazer.unsubscribe(listener)};
    }, [word]);

    console.log(`Render word [${word}]`);
    return <span ref={wordRef}>
        {word}
    </span>
};