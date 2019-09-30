import React, {useState, useRef, useMemo} from "react";
import {LOG_RENDER} from "../../services/constants";
import {useAreaOfInterest} from "../../services/webgazer";

const descendingByDifficulty = (a, b) => a.difficulty < b.difficulty ? 1 : a.difficulty > b.difficulty ? -1 : 0;

export const Word = ({word, rest, difficultyThreshold, eyeTracking}) => {
    const [areaOfInterestRef, lookingAt] = useAreaOfInterest([word.word]);
    const wordHistory = useRef(word.word);
    const [localDifficulty, setLocalDifficulty] = useState(difficultyThreshold + 0.01);
    useMemo(() => {setLocalDifficulty(difficultyThreshold + 0.01)}, [difficultyThreshold]);

    let wordToDisplay = word;
    if (word.difficulty > localDifficulty && word.synonyms.length !== 0) {
        const sortedSynonyms = word.synonyms.sort(descendingByDifficulty);
        const filteredSynonyms = sortedSynonyms.filter((a) => a.difficulty < localDifficulty);
        wordToDisplay = filteredSynonyms.length !== 0 ? filteredSynonyms[0] : sortedSynonyms[sortedSynonyms.length - 1];
    }

    const wordChange = wordHistory.current !== wordToDisplay.word;
    if (wordChange) {
        wordHistory.current = wordToDisplay.word;
    }

    const [nextWord, ...nextRest] = rest;
    LOG_RENDER && console.log(`Render word [${word.word}]`);
    return <span>
        {nextWord ?
            <span style={{cursor: "pointer"}}>
                <span className={eyeTracking && lookingAt ? "underline" : ""}>
                    {![".", ",", ":", ";"].includes(word.word) && " "}
                    <span
                        className={wordChange ? "highlighted" : "not-highlighted"} title="Click to simplify" ref={areaOfInterestRef}
                        onClick={() => setLocalDifficulty(wordToDisplay.difficulty - 0.1)}
                    >
                        {wordToDisplay.word}
                    </span>
                </span>
                <Word word={nextWord} rest={nextRest} difficultyThreshold={localDifficulty} eyeTracking={eyeTracking} />
            </span>
            :
            <></>
        }
    </span>
};
