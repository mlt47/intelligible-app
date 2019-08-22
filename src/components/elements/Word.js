import React, {useRef, useEffect, useState} from "react";
import {LOG_RENDER} from "../../services/constants";
import * as gazer from "../../services/webgazer";

const descendingByDifficulty = (a, b) => a.difficulty < b.difficulty ? 1 : a.difficulty > b.difficulty ? -1 : 0;
const OFFSET = {x:20, y:20};

export const Word = ({word, difficultyThreshold, setDifficultyThreshold}) => {
    const wordRef = useRef(null);
    const [lookingAt, setLookingAt] = useState(false);
    useEffect(() => {
        const listener = (data, elapsedTime) => {
            if (wordRef.current) {
                const element =  wordRef.current;
                const wordBox = element && element.getBoundingClientRect();
                if (data !== null && !lookingAt &&
                    wordBox.left - OFFSET.x <= data.x && data.x <= wordBox.right + OFFSET.x &&
                    wordBox.bottom - OFFSET.y <= data.y && data.y <= wordBox.top + OFFSET.y
                ) {
                    setLookingAt(true);
                } else if (lookingAt) {
                    setLookingAt(false);
                }
            }
        };
        gazer.subscribe(listener);
        return () => {gazer.unsubscribe(listener)};
    }, [word]);


    const wordHistory = useRef(word.word);

    let wordToDisplay = word;
    if (word.difficulty > parseFloat(difficultyThreshold) && word.synonyms.length !== 0) {
        const sortedSynonyms = word.synonyms.sort(descendingByDifficulty);
        const filteredSynonyms = sortedSynonyms.filter((a) => a.difficulty < parseFloat(difficultyThreshold));
        wordToDisplay = filteredSynonyms.length !== 0 ? filteredSynonyms[0] : sortedSynonyms[sortedSynonyms.length - 1];
    }

    const wordChange = wordHistory.current !== wordToDisplay.word;
    if (wordChange) {
        wordHistory.current = wordToDisplay.word;
    }

    LOG_RENDER && console.log(`Render word [${word.word}]`);
    return <span className={lookingAt ? "bg-warning" : ""}>
        <span
            className={wordChange ? "highlight" : ""} title="Click to simplify" ref={wordRef}
            onClick={() => setDifficultyThreshold(wordToDisplay.difficulty - 0.1)}
        >
            {wordToDisplay.word}
        </span>
    </span>
};
