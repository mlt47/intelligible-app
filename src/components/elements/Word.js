import React, {useRef} from "react";
import {LOG_RENDER} from "../../services/constants";

const descendingByDifficulty = (a, b) => a.difficulty < b.difficulty ? 1 : a.difficulty > b.difficulty ? -1 : 0;

export const Word = ({word, difficultyThreshold, setDifficultyThreshold}) => {
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
    return <React.Fragment>
        <span
            className={wordChange ? "highlight" : ""} title="Click to simplify"
            onClick={() => setDifficultyThreshold(wordToDisplay.difficulty - 0.1)}
        >
            {wordToDisplay.word}
        </span>
    </React.Fragment>
};
